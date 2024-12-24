import { useState } from "react";
import { fetchUserAttributes, fetchAuthSession, signIn, signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { generateClient } from "@aws-amplify/api";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";

import { listDealerships, listSalespeople } from "../../graphql/queries";

import { authAction } from "../../store/user";
import { salesAction } from "../../store/salesMan";
import { dealerShipAction } from "../../store/dealerShip";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.verdecertified.com/">
        Verdefy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const client = generateClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signOut();
      const res = await signIn({
        username: email,
        password,
      });

      if (res.nextStep.signInStep && res.nextStep.signInStep == "DONE") {
        const fetchAttrRes = await fetchUserAttributes();
        dispatch(authAction.addUser(fetchAttrRes));

        const userSession = await fetchAuthSession();

        console.log(
          "userSession", userSession, 
          userSession.tokens.accessToken.payload["cognito:groups"]
        );

        const userGroups = userSession.tokens.accessToken.payload["cognito:groups"];

        if (userGroups.includes("admins") && userGroups.includes("mgmt")) {
            // User is part of both admins and mgmt groups
            dispatch(authAction.setIsAdmin(true));
            dispatch(authAction.setIsDealer(true)); // Or some other logic
        } else if (userGroups.includes("admins")) {
            // User is part of only admins group
            dispatch(authAction.setIsAdmin(true));
        } else if (userGroups.includes("mgmt")) {
            // User is part of only mgmt group
            dispatch(authAction.setIsDealer(true));
        }

        const res_listDealerShips = await client.graphql({
          query: listDealerships,
        });

        dispatch(dealerShipAction.getDealershipLists(res_listDealerShips.data.listDealerships.items));

        try {
          const salesPeopleList = await client.graphql({ query: listSalespeople });
          if (
            salesPeopleList.data.listSalespeople.items.some(
              (item) => item.email === fetchAttrRes.email
            )
          ) {
            dispatch(salesAction.getSalesPeople(salesPeopleList.data.listSalespeople.items));

            const foundSalesperson = salesPeopleList.data.listSalespeople.items.find(item => item.email === fetchAttrRes.email);
            dispatch(salesAction.setSalesMan(foundSalesperson));

            if (foundSalesperson) {
              // console.log('Salesperson found. Dealership ID:', foundSalesperson.dealershipID);
              const associatedDealership = res_listDealerShips.data.listDealerships.items.find(item => item.id === foundSalesperson.dealershipID);
              dispatch(dealerShipAction.setDealerShip(associatedDealership));
              console.log(associatedDealership ? 'Dealership set successfully' : 'Associated dealership not found');
            } else {
              console.log('No salesperson found with the email:', email);
            }

          }
        } catch (error) {
          // Handle any errors that occur during the GraphQL operations
          console.error('An error occurred while fetching salespeople:', error);
        }

        if (res.isSignedIn) {
          navigate("/");
        }
      } else if (res.nextStep.signInStep && res.nextStep.signInStep == "CONFIRM_SIGN_UP") {
        navigate("/verifyemail");
      } else {
        console.log("It seems there are some errors")
      }
    } catch (error) {
      console.log("error signing in", error);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
              {loading && <CircularProgress size={24} color="primary" sx={{
                'position': 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }} />}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              {/* <Grid item xs>
                <Link to="/signup" variant="body2">
                  Sign Up
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

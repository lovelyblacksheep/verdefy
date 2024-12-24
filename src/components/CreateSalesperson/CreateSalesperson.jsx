import { generateClient } from "@aws-amplify/api";
import { signUp } from "aws-amplify/auth";
import { createSalesperson } from "../../graphql/mutations";
import { listDealerships } from "../../graphql/queries";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import { salesAction } from "../../store/salesMan";

const CreateSalespersonForm = ({ dealership, userID }) => {
  const client = generateClient();
  const [dealerList, setDealerList] = useState([]);
  const navigate = useNavigate();

  // const {
  //   setLigUserId,
  //   ligEmail,
  //   setLigEmail,
  //   ligGivenName,
  //   setLigGivenName,
  //   ligFamilyName,
  //   setLigFamilyName,
  //   setGetSalesmanObj
  // } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [salespersonID, setLigUserId] = useState('');
  const [salespersonEmail, setSalespersonEmail] = useState('');
  const [salespersonGivenName, setSalespersonGivenName] = useState('');
  const [salespersonFamilyName, setSalespersonFamilyName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const client = generateClient();
      const response = await client.graphql({ query: listDealerships });
      setDealerList(response.data.listDealerships.items);

      setLigUserId(userID);
      setSalespersonEmail('');
      setSalespersonGivenName('');
      setSalespersonFamilyName('');
      setLoading(false);
    };

    fetchData();
  }, []);

  const salespersonObject = {
    dealershipID: dealership.id,
    firstName: salespersonGivenName,
    lastName: salespersonFamilyName,
    email: salespersonEmail,
    userId: salespersonID,
  };

  const createFunction = async () => {
    setLoading(true);
    try {
      const res = await signUp({
        username: salespersonEmail,
        password: '123456@ABC',
        options: {
          userAttributes: {
            given_name: salespersonGivenName,
            family_name: salespersonFamilyName,
            'custom:usergroup': 'sales'
          },
          autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        },
      });

      if (res && res.userId) {

        const response = await client.graphql({
          query: createSalesperson,
          variables: { input: salespersonObject },
        });

        if (response && response.data && response.data.createSalesperson) {
          dispatch(salesAction.updateSalesPeople(response.data.createSalesperson));
          setLoading(false);
          navigate('/');
        } else {
          // Handle case where GraphQL response is not valid
          console.error('Failed to create salesperson');
          setLoading(false);
        }
      }
    } catch (error) {
      console.log("error signing up:", error);
      navigate('/');
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        {/* <h1 onClick={() => createFunction()}>Create Salesperson</h1> */}
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Create Salesperson
            </Typography>
            <Grid item xs={6}>
              <TextField
                required
                id="dealership"
                name="dealership"
                label="Dealership"
                value={dealership.name}
                disabled
                fullWidth
                autoComplete="dealership"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="Firstname"
                value={salespersonGivenName}
                onChange={(e) => setSalespersonGivenName(e.target.value)}
                fullWidth
                autoComplete="FirstName"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Lastname"
                value={salespersonFamilyName}
                onChange={(e) => setSalespersonFamilyName(e.target.value)}
                fullWidth
                autoComplete="LastName"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                value={salespersonEmail}
                onChange={(e) => setSalespersonEmail(e.target.value)}
                label="Email"
                fullWidth
                autoComplete="email"
                variant="standard"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => createFunction()}
              disabled={loading}
            >
              Submit
              {loading && <CircularProgress size={24} color="primary" sx={{
                'position': 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }} />}
            </Button>
          </Paper>
        </Container>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  dealership: state.dealership.dealership,
  userID: state.auth.user.sub,
})

export default connect(mapStateToProps)(CreateSalespersonForm);
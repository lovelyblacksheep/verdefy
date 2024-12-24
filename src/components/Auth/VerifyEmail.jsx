import { confirmSignUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

import {  useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function VerifyEmail() {

  const dispatch = useDispatch();

  //change this email below to the loggedInUsermeail from the signup page. Save it and transfer it over.
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await confirmSignUp({ username: email, confirmationCode, });
      // await autoSignIn();
      console.log("verify res: ", res.isSignUpComplete);
      // dispatch(authAction.updateUser({ isSignUpComplete: res.isSignUpComplete }));
      setStatus("Email verified successfully!");

      navigate("/forcechange")

      // redirect them to sign in, and then when they sign in, find a way to get dealercode if they don't have one, etc. Maybe dealer code will be special user attr or find a way to do what we can in one page?

      // await updpateDealerOrSalesApiCall here
      // createSalesman (add in all relevant info from context from other page, and the dealerId just got). then submit it and our first salesperson will be created

      // const cognito id sub = ligUserId

      alert("Verified");
    } catch (error) {
      console.error("Error confirming sign-up:", error);
      setStatus("Verification failed. Please check the code and try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Verify Your Email</h1>
      <p>If you do not see the email? Check your spam folder.</p>
      <p>Enter the verification code sent to your email:</p>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="input-with-sx"
            label="Email"
            variant="standard"
            value={email}
            onChange={(res) => setEmail(res.target.value)}
          />
          <br />
          <TextField
            id="standard-basic"
            label="Code"
            variant="standard"
            multiline
            value={confirmationCode}
            onChange={(res) => setConfirmationCode(res.target.value)}
          />
        </div>
        {/* <Grid item xs={12}>
          <TextField
            value={dealerCode}
            label="Dealership"
            fullWidth
            select
            onChange={(e) => setDealerCode(e.target.value)}
          >
            {dealerList.map((dealer) => (
              <MenuItem key={dealer.id} value={dealer.id}>
                {dealer.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid> */}
      </Box>
      <div>
        <Button
          style={{ marginTop: "20px" }}
          variant="contained"
          endIcon={<SendIcon />}
          disabled={loading}
          onClick={handleVerify}
        >
          Verify
          {loading && <CircularProgress size={24} color="primary" sx={{
            'position': 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }} />}
        </Button>
      </div>
      <p>{status}</p>
    </div>
  );
}

export default VerifyEmail;

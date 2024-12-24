import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import PersonalInfoForm from "./PersonalInfoForm";
import AddressForm from "./AddressForm";
import Review from "./Review";
import { generateClient } from "@aws-amplify/api";
import { createCustomer } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import CustomerInfoContext from "../../context/customerInfoContext";
import { CircularProgress } from "@mui/material";
import { connect, useDispatch } from "react-redux";
import { customerAction } from "../../store/customer";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.verdecertified.com/">
        Verdefy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Personal information", "Address", "Review"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalInfoForm />;
    case 1:
      return <AddressForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const CreateCustomer = ({ dealershipItem }) => {
  const client = generateClient();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleNext = async () => {
    if (activeStep < steps.length - 1) {

      setActiveStep(activeStep + 1);
    } else {
      setLoading(true);
      try {
        const response = await client.graphql({
          query: createCustomer,
          variables: {
            input: {
              firstName,
              lastName,
              email,
              phone,
              address1,
              address2,
              city,
              state,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              dealershipID: dealershipItem?.id || null 
            }
          },
        });

        // dispatch(customerAction.updateCustomersLists(response))

        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setAddress1('');
        setAddress2('');
        setCity('');
        setState('');
        setZipCode('');
        setCountry('');
        setYearOfBirth('');
        setMonthOfBirth('');
        setDayOfBirth('');

        console.log('create customer res', response);
        dispatch(customerAction.updateCustomersLists(response.data.createCustomer))
        alert('Created');
        navigate('/dashboard');
      } catch (e) {
        console.error('error is ', e);
      }
      setLoading(false);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleBackPage = () => {
    navigate(-1);
  }

  return (
    <CustomerInfoContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        phone,
        setPhone,
        address1,
        setAddress1,
        address2,
        setAddress2,
        city,
        setCity,
        state,
        setState,
        zipCode,
        setZipCode,
        country,
        setCountry,
        yearOfBirth,
        setYearOfBirth,
        monthOfBirth,
        setMonthOfBirth,
        dayOfBirth,
        setDayOfBirth
      }}
    >
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" color="inherit" noWrap>
            Verdefy
          </Typography>
          <Button
            variant="contained"
            onClick={handleBackPage}
          >
            Back
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Customer Information
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                // disabled={loading}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  {loading && <CircularProgress size={24} color="primary" sx={{
                    'position': 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }} />}
                </Button>
              </Box>
            </>
          )}
        </Paper>
        <Copyright />
      </Container>
    </CustomerInfoContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  dealershipItem: state.dealership.dealership,

})

export default connect(mapStateToProps)(CreateCustomer);
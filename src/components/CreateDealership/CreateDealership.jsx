import { useState } from "react";
import { generateClient } from "@aws-amplify/api";
import { signUp } from "aws-amplify/auth";
import { connect, useDispatch } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import DetailInfoForm from "./DetailInfoForm";
import BasicInfoForm from "./BasicInfoForm";
import Review from "./Review";
import { createDealership } from "../../graphql/mutations";
import CreateDealerContext from "../../context/createDealershipContext";

import { dealerShipAction } from "../../store/dealerShip";

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

const steps = ["Basic Information", "Detail", "Review"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicInfoForm />;
    case 1:
      return <DetailInfoForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const CreateDealerShip = ({ profitPercent }) => {
  const client = generateClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [dealerName, setDealerName] = useState("");
  const [dealerEmail, setDealerEmail] = useState("");
  const [dealerPhone, setDealerPhone] = useState("");
  const [dealerAddress1, setDealerAddress1] = useState("");
  const [dealerAddress2, setDealerAddress2] = useState("");
  const [dealerCity, setDealerCity] = useState("");
  const [dealerState, setDealerState] = useState("");
  const [dealerZipCode, setDealerZipCode] = useState("");
  const [dealerContact, setDealerContact] = useState("");
  const [dealerBalance, setDealerBalance] = useState("");
  const [dealerGrossSales, setDealerGrossSales] = useState(0);
  const [dealerGrossProfits, setDealerGrossProfits] = useState(0);
  const [dealerOurProfit, setDealerOurProfit] = useState(0);
  const [dealerProfitDollars, setDealerProfitDollars] = useState(0);
  const [dealerProfitPercent, setDealerProfitPercent] = useState(0);
  const [dealerTotalTransactions, setDealerTotalTransactions] = useState(0);

  const handleNext = async () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    } else {
      setLoading(true);
      console.log('Final step');
      try {
        const res = await signUp({
          username: dealerEmail,
          password: '123456@ABC',
          options: {
            userAttributes: {
              given_name: dealerName,
              'custom:usergroup' : 'mgmt',
            },
            autoSignIn: true, // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
          },
        });

        if (res && res.userId) {
          const response = await client.graphql({
            query: createDealership,
            variables: {
              input: {
                name: dealerName,
                address1: dealerAddress1,
                address2: dealerAddress2,
                city: dealerCity,
                state: dealerState,
                zip: dealerZipCode,
                phone: dealerPhone,
                email: dealerEmail,
                contactPerson: dealerContact,
                outstandingBalance: 0,
                grossSalesToCustomers: 0,
                grossProfits: 0,
                ourProfitFromThem: 0,
                theirProfitMarginDollars: 0,
                theirProfitMarginPercent: profitPercent,
                lifetimeTotalTransactions: 0
              }
            },
          });
          dispatch(dealerShipAction.updateDealershipLists(response.data.createDealership));
        }

        setDealerName('');
        setDealerAddress1('');
        setDealerAddress2('');
        setDealerCity('');
        setDealerState('');
        setDealerZipCode('');
        setDealerPhone('');
        setDealerEmail('');
        setDealerContact('');
        setDealerBalance('');
        setDealerGrossSales('');
        setDealerGrossProfits('');
        setDealerProfitDollars('');
        setDealerProfitPercent('');
        setDealerGrossProfits('');
        setDealerOurProfit('');
        setDealerTotalTransactions('');


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

  const handleSubmitDone = () => {
    navigate('/');
  }

  return (
    <CreateDealerContext.Provider
      value={{
        dealerName,
        setDealerName,
        dealerAddress1,
        setDealerAddress1,
        dealerAddress2,
        setDealerAddress2,
        dealerCity,
        setDealerCity,
        dealerState,
        setDealerState,
        dealerZipCode,
        setDealerZipCode,
        dealerPhone,
        setDealerPhone,
        dealerEmail,
        setDealerEmail,
        dealerContact,
        setDealerContact,
        dealerBalance,
        setDealerBalance,
        dealerGrossSales,
        setDealerGrossSales,
        dealerGrossProfits,
        setDealerGrossProfits,
        dealerOurProfit,
        setDealerOurProfit,
        dealerProfitDollars,
        setDealerProfitDollars,
        dealerProfitPercent,
        setDealerProfitPercent,
        dealerTotalTransactions,
        setDealerTotalTransactions,
      }}
    >
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
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
            Dealer Information
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
                New Dealeship is created successfully.
              </Typography>
              <Button onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                Done
              </Button>
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
                  disabled={loading}
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
    </CreateDealerContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  profitPercent: state.profit.profitPercent,
});

export default connect(mapStateToProps)(CreateDealerShip);
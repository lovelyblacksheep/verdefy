import { useState } from "react"
import { generateClient } from "@aws-amplify/api";
import { useNavigate } from "react-router-dom";
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
import CircularProgress from '@mui/material/CircularProgress';
import Review from "./Review";
import CustomerInfo from "./CustomerInfo";
import DealerInfo from "./DealerInfo";
import { connect, useDispatch } from "react-redux";

import CheckoutContext from '../../context/checkoutContext';
import { createTransaction } from "../../graphql/mutations";
import { transactionAction } from "../../store/transaction";

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

const steps = ["Customer information", "Dealer information", "Review"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CustomerInfo />;
    case 1:
      return <DealerInfo />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const Checkout = ({ getSalesmanObj, userDetail, dealership }) => {
  const client = generateClient();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const [customerID, setCustomerID] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [VIN, setVIN] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [isDiesel, setIsDiesel] = useState(false);
  const [averageMPG, setAverageMPG] = useState("");
  const [offsetCost, setOffsetCost] = useState("");
  const [ourMarkup, setOurMarkup] = useState("");
  const [dealerMarkup, setDealerMarkup] = useState("");
  const [MSRP, setMSRP] = useState("");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleNext = async () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      try {
        setLoading(true);
        const res = await client.graphql({
          query: createTransaction,
          variables: {
            input: {
              customerID,
              vehicleMake,
              vehicleModel,
              vehicleYear,
              VIN,
              vehicleType,
              isDiesel,
              averageMPG,
              offsetCost,
              ourMarkup,
              dealerMarkup: dealership.theirProfitMarginPercent,
              MSRP,
              salespersonID: getSalesmanObj.filter(item => item.email == userDetail.email)[0].id
            }
          }
        });
        console.log('create transaction res', res);
        dispatch(transactionAction.updateTransactions(res.data.createTransaction));
        alert('Created');
        navigate('/dashboard');

        setCustomerID('');
        setVehicleMake('');
        setVehicleModel('');
        setVehicleYear('');
        setVIN('');
        setVehicleType('');
        setIsDiesel(false);
        setAverageMPG('');
        setOffsetCost('');
        setOurMarkup('');
        setDealerMarkup('');
        setMSRP('');
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
    <CheckoutContext.Provider
      value={{
        customerID,
        setCustomerID,
        vehicleMake,
        setVehicleMake,
        vehicleModel,
        setVehicleModel,
        vehicleYear,
        setVehicleYear,
        VIN,
        setVIN,
        vehicleType,
        setVehicleType,
        isDiesel,
        setIsDiesel,
        averageMPG,
        setAverageMPG,
        offsetCost,
        setOffsetCost,
        ourMarkup,
        setOurMarkup,
        dealerMarkup,
        setDealerMarkup,
        MSRP,
        setMSRP,
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
            Transaction
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
                Customer Created
              </Typography>
              <Typography variant="subtitle1">
                Now you should be able to find them in create transaction.
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

    </CheckoutContext.Provider>
  );
}

const mapStateToProps = (state) => ({
  getSalesmanObj: state.sales.salesPeople,
  userDetail: state.auth.user,
  dealership: state.dealership.dealership,
})

export default connect(mapStateToProps)(Checkout);
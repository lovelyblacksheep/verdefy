import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import SwitchAccessShortcutAddIcon from '@mui/icons-material/SwitchAccessShortcutAdd';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Title from "./../Title"; // Ensure the path to Title component is correct

function preventDefault(event) {
  event.preventDefault();
}

const Analytic_Profits = ({ isDealerAccount, isAdmin, dealership, transactionsList }) => {
  const vehiclePrices = {
    Car: 50,
    SUV: 75,
    Truck: 75,
  };

  let totalProfit = 0;

  transactionsList.forEach(transaction => {
    const { dealerMarkup, VIN } = transaction;
    const price = vehiclePrices[VIN] || 0; // Default to 0 if VIN doesn't match Car, SUV, or Truck
    const profit = (dealerMarkup / 100) * price;
    totalProfit += profit;
  });

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <SwitchAccessShortcutAddIcon sx={{ fontSize: 40, marginRight: 2, color: 'primary.main' }} />
        <Box>
          <Title>Profits</Title>
          <Typography component="p" variant="h4">
            ${totalProfit.toFixed(2)} {/* Display total profit formatted as currency */}
          </Typography>
        </Box>
      </Box>
      {/* Uncomment and customize the link if needed */}
      {/* <Box mt={2}>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Details
        </Link>
      </Box> */}
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  isDealerAccount: state.auth.isDealer,
  transactionsList: state.transaction.transactionsList,
  dealership: state.dealership.dealership,
});

export default connect(mapStateToProps)(Analytic_Profits);

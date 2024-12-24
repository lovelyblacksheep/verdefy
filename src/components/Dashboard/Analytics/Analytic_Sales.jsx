import * as React from "react";
import Link from "@mui/material/Link";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Title from "./../Title"; // Ensure the path to Title component is correct

function preventDefault(event) {
  event.preventDefault();
}

const Analytic_Sales = ({ isDealerAccount, isAdmin, dealership, salesPeople }) => {
  // const salesCount = isAdmin ? salesPeople?.length : salesPeople?.filter(salesperson => salesperson.dealershipID === dealership.id).length;
  const salesCount = salesPeople?.filter(salesperson => salesperson.dealershipID === dealership.id).length;

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <AttachMoneyIcon sx={{ fontSize: 40, marginRight: 2, color: 'primary.main' }} />
        <Box>
          <Title>Salespeople</Title>
          <Typography component="p" variant="h4">
            {salesCount}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  isDealerAccount: state.auth.isDealer,
  transactionsList: state.transaction.transactionsList,
  dealership: state.dealership.dealership,
  salesPeople: state.sales.salesPeople,
});

export default connect(mapStateToProps)(Analytic_Sales);

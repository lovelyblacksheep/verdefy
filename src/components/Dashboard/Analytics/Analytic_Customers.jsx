import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Title from "./../Title"; // Ensure the path to Title component is correct

function preventDefault(event) {
  event.preventDefault();
}

const Analytic_Customers = ({ isDealerAccount, isAdmin, salesperson, customerList }) => {
  const customerCount = isAdmin 
    ? customerList?.length 
    : customerList?.filter(item => item.dealershipID === salesperson.dealershipID).length;

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <PeopleAltIcon sx={{ fontSize: 40, marginRight: 2, color: 'primary.main' }} />
        <Box>
          <Title>Customers</Title>
          <Typography component="p" variant="h4">
            {customerCount}
          </Typography>
        </Box>
      </Box>
      {/* <Box mt={2}>
        <Link color="primary" href="#customers" onClick={preventDefault}>
          View Details
        </Link>
      </Box> */}
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  isDealerAccount: state.auth.isDealer,
  salesperson: state.sales.salesMan,
  customerList: state.customers.customerLists,
});

export default connect(mapStateToProps)(Analytic_Customers);

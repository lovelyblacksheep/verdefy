import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Title from "./../Title"; // Ensure the path to Title component is correct

function preventDefault(event) {
  event.preventDefault();
}

const Analytic_Transactions = ({ ligEmail, transactionsList }) => {
  const transactionCount = transactionsList.filter(
    item => item.Salesperson && item.Salesperson.email === ligEmail
  ).length;

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <ReceiptLongIcon sx={{ fontSize: 40, marginRight: 2, color: 'primary.main' }} />
        <Box>
          <Title>Transactions</Title>
          <Typography component="p" variant="h4">
            {transactionCount}
          </Typography>
        </Box>
      </Box>
      {/* <Box mt={2}>
        <Link color="primary" href="#transactions" onClick={preventDefault}>
          View Details
        </Link>
      </Box> */}
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  transactionsList: state.transaction.transactionsList,
  ligEmail: state.auth.user.email,
});

export default connect(mapStateToProps)(Analytic_Transactions);

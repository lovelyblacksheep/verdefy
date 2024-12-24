import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { connect } from "react-redux";

function preventDefault(event) {
  event.preventDefault();
}

const Deposits = ({ isDealerAccount, isAdmin, dealership, transactionsList }) => {

  return (
    <React.Fragment>
      <Title>Total Sales</Title>
      <Typography component="p" variant="h4" style={{ flex: 1, paddingTop: '20%' }}>
        {isAdmin && transactionsList && transactionsList.length}
        {isDealerAccount && dealership && dealership.Salespeople && dealership.Salespeople.items && dealership.Salespeople.items.length}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  isDealerAccount: state.auth.isDealer,
  transactionsList: state.transaction.transactionsList,
  dealership: state.dealership.dealership,
});

export default connect(mapStateToProps)(Deposits);
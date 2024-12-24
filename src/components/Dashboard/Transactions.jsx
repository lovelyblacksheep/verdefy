import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from '@mui/material/CircularProgress';
import Title from "./Title";
import { Box, Paper, TableContainer } from "@mui/material";
import { FilePresent } from "@mui/icons-material";
import { connect } from "react-redux";

const Transactions = ({ transactionsList, ligEmail, isAdmin }) => {
  const [showAll, setShowAll] = React.useState(false);

  const sortTransactionsByDate = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // Sort by descending order (latest first)
  };

  const handleShowMoreClick = (event) => {
    event.preventDefault();
    setShowAll(prevShowAll => !prevShowAll);
  };

  // Create a copy of transactionsList to avoid mutating the original
  const sortedTransactions = [...transactionsList].sort(sortTransactionsByDate);

  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      {
        !ligEmail ?
          (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <CircularProgress />
            </Box>
          ) :
          (
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>No</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Vehicle Manufacturer</TableCell>
                      <TableCell>Vehicle Model</TableCell>
                      <TableCell>Vehicle Year</TableCell>
                      <TableCell>Vehicle Type</TableCell>
                      <TableCell>Fuel Type</TableCell>
                      <TableCell>Average MPG</TableCell>
                      <TableCell>Dealer Markup</TableCell>
                      <TableCell>File</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { isAdmin ?
                    (showAll ? sortedTransactions : sortedTransactions.slice(0, 5)).map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.Customer ? row.Customer.firstName : ''} {row.Customer ? row.Customer.lastName : ''}</TableCell>
                        <TableCell>{row.vehicleMake}</TableCell>
                        <TableCell>{row.vehicleModel}</TableCell>
                        <TableCell>{row.vehicleYear}</TableCell>
                        <TableCell>{row.vehicleType}</TableCell>
                        <TableCell>{row.isDiesel ? 'Gas' : 'Diesel'}</TableCell>
                        <TableCell>{row.averageMPG}</TableCell>
                        <TableCell>{row.dealerMarkup}</TableCell>
                        <TableCell>{row.s3Link && <a href={row.s3Link} download="attachment" target="_blank" rel="noreferrer"><FilePresent /></a>}</TableCell>
                      </TableRow>
                    ))
                    : 
                    (showAll ? sortedTransactions.filter(item => item.Salesperson && item.Salesperson.email === ligEmail) : transactionsList.filter(item => item.Salesperson && item.Salesperson.email === ligEmail).slice(0, 5)).map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.Customer ? row.Customer.firstName : ''} {row.Customer ? row.Customer.lastName : ''}</TableCell>
                        <TableCell>{row.vehicleMake}</TableCell>
                        <TableCell>{row.vehicleModel}</TableCell>
                        <TableCell>{row.vehicleYear}</TableCell>
                        <TableCell>{row.vehicleType}</TableCell>
                        <TableCell>{row.isDiesel ? 'Gas' : 'Diesel'}</TableCell>
                        <TableCell>{row.averageMPG}</TableCell>
                        <TableCell>{row.dealerMarkup}</TableCell>
                        <TableCell>{row.s3Link && <a href={row.s3Link} download="attachment" target="_blank" rel="noreferrer"><FilePresent /></a>}</TableCell>
                      </TableRow>
                    ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )
      }

      <Link color="primary" href="#" onClick={handleShowMoreClick} sx={{ mt: 3 }}>
        {showAll ? "See fewer Transactions" : "See more Transactions"}
      </Link>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  transactionsList: state.transaction.transactionsList,
  ligEmail: state.auth.user.email,
  isAdmin: state.auth.isAdmin
});

export default connect(mapStateToProps)(Transactions);

import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from '@mui/material/CircularProgress';
import Title from "./Title";
import { Box, TableContainer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Dealerships = ({ dealershipsList }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);

  const handleShowMoreClick = (event) => {
    event.preventDefault();
    setShowAll(prevShowAll => !prevShowAll); // Toggle to show all dealerships when link is clicked
  };

  return (
    <React.Fragment>
      <Title>Recent Dealerships</Title>
      {
        loading ?
          (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <CircularProgress />
            </Box>
          ) :
          (
            <Box>
              <Box sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell sx={{ minWidth: '200px' }}>Address</TableCell>
                        <TableCell>Contact</TableCell>
                        {/* <TableCell>Balance</TableCell>
                        <TableCell>Gross Sales</TableCell>
                        <TableCell>Gross Profits</TableCell>
                        <TableCell>Our Profit</TableCell>
                        <TableCell>Profit Margin Dollars</TableCell> */}
                        <TableCell>Profit Margin Percent</TableCell>
                        {/* <TableCell>Total Transactions</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(showAll ? dealershipsList : dealershipsList.slice(0, 5)).map((row, index) => (
                        <TableRow key={row.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell><Link href="#" onClick={() => navigate('/dealership/' + row.id)}>{row.name}</Link></TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>{row.phone}</TableCell>
                          <TableCell>{(row.address2 ? [row.address1, row.address2, row.city, row.state, row.zip] : [row.address1, row.city, row.state, row.zip]).join(', ')}</TableCell>
                          <TableCell>{row.contactPerson}</TableCell>
                          {/* <TableCell>{row.outstandingBalance}</TableCell>
                          <TableCell>{row.grossSalesToCustomers}</TableCell>
                          <TableCell>{row.grossProfits}</TableCell>
                          <TableCell>{row.ourProfitFromThem}</TableCell>
                          <TableCell>{row.theirProfitMarginDollars}</TableCell> */}
                          <TableCell>{row.theirProfitMarginPercent}</TableCell>
                          {/* <TableCell>{row.lifetimeTotalTransactions}</TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Link color="primary" href="#" onClick={handleShowMoreClick} sx={{ mt: 3 }}>
                {showAll ? "See fewer Dealerships" : "See more Dealerships"}
              </Link>
            </Box>
          )
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  dealershipsList: state.dealership.dealershipLists,
})

export default connect(mapStateToProps)(Dealerships);
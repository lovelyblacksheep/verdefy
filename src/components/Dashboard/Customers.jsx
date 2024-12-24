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
import { connect } from "react-redux";

const sortCustomersByLastName = (list) => {
  return [...list].sort((a, b) => a.lastName.localeCompare(b.lastName));
}

const Customers = ({ isAdmin, salesperson, customerList }) => {
  const [showAll, setShowAll] = React.useState(false);

  const handleShowMoreClick = (event) => {
    event.preventDefault();
    setShowAll(prevShowAll => !prevShowAll); // Toggle to show all dealerships when link is clicked
  };

  const sortedCustomerList = sortCustomersByLastName(customerList);

  return (
    <React.Fragment>
      <Title>Recent Customers</Title>
      {false ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  isAdmin ?

                    (showAll ? sortedCustomerList : sortedCustomerList.slice(0, 5)).map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.firstName} {row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.monthOfBirth}/{row.dayOfBirth}/{row.yearOfBirth}</TableCell>
                        <TableCell>{(row.address2 ? [row.address1, row.address2, row.city, row.state, row.zipCode, row.country] : [row.address1, row.city, row.state, row.zipCode, row.country]).join(', ')}</TableCell>
                      </TableRow>
                    ))

                    :

                    (showAll ? sortedCustomerList.filter(item => item.dealershipID === salesperson.dealershipID) : sortedCustomerList.filter(item => item.dealershipID === salesperson.dealershipID).slice(0, 5)).map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.firstName} {row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.monthOfBirth}/{row.dayOfBirth}/{row.yearOfBirth}</TableCell>
                        <TableCell>{(row.address2 ? [row.address1, row.address2, row.city, row.state, row.zipCode, row.country] : [row.address1, row.city, row.state, row.zipCode, row.country]).join(', ')}</TableCell>
                      </TableRow>
                    ))

                }

              </TableBody>
            </Table>
          </TableContainer>
          <Link color="primary" href="#" onClick={handleShowMoreClick} sx={{ mt: 3 }}>
            {showAll ? "See fewer Customers" : "See more Customers"}
          </Link>
        </Box>
      )}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  salesperson: state.sales.salesMan,
  customerList: state.customers.customerLists,
})

export default connect(mapStateToProps)(Customers);

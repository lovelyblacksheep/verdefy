import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

import CreateDealerContext from "../../context/createDealershipContext";
import { connect } from 'react-redux';

const Review = ({profitPercent}) => {
  const {
    dealerName,
    dealerAddress1,
    dealerAddress2,
    dealerCity,
    dealerState,
    dealerZipCode,
    dealerPhone,
    dealerEmail,
    dealerContact,
    dealerProfitPercent,
    dealerTotalTransactions
  } = React.useContext(CreateDealerContext);

  const addresses = dealerAddress2 ? [dealerAddress1, dealerAddress2, dealerCity, dealerState, dealerZipCode] : [dealerAddress1, dealerCity, dealerState, dealerZipCode];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Dealership Summary
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Name:
            </TableCell>
            <TableCell>{dealerName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Email:
            </TableCell>
            <TableCell>{dealerEmail}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Phone:
            </TableCell>
            <TableCell>{dealerPhone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Contact:
            </TableCell>
            <TableCell>{dealerContact}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Profit Percent:
            </TableCell>
            <TableCell>{profitPercent}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Total Transactions:
            </TableCell>
            <TableCell>{dealerTotalTransactions}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  profitPercent: state.profit.profitPercent,
});

export default connect(mapStateToProps)(Review);
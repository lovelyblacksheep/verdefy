import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

import CheckoutContext from "../../context/checkoutContext";
import { connect } from 'react-redux';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const Review = ({ customerList, dealership }) => {
  const {
    customerID,
    vehicleMake,
    vehicleModel,
    vehicleYear,
    VIN,
    vehicleType,
    isDiesel,
  } = React.useContext(CheckoutContext);

  const customer = customerList.find((user) => user.id == customerID);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Transaction summary
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Customer:
            </TableCell>
            <TableCell>{customer ? `${customer.firstName} ${customer.lastName}` : ''} { }</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Vehicle Manufacturer:
            </TableCell>
            <TableCell>{vehicleMake}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Vehicle Model:
            </TableCell>
            <TableCell>{vehicleModel}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Vehicle Year:
            </TableCell>
            <TableCell>{vehicleYear}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              VIN:
            </TableCell>
            <TableCell>{VIN}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Vehicle Type:
            </TableCell>
            <TableCell>{vehicleType}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Fuel Type:
            </TableCell>
            <TableCell>{isDiesel ? 'Diesel' : 'Gas'}</TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell component={'th'} sx={{fontWeight: 'bold'}}>
              Offset Cost:
            </TableCell>
            <TableCell>{ offsetCost }</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{fontWeight: 'bold'}}>
              Verdefy Markup:
            </TableCell>
            <TableCell>{ ourMarkup }</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Dealer Markup:
            </TableCell>
            <TableCell>{dealership.theirProfitMarginPercent}</TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell component={'th'} sx={{fontWeight: 'bold'}}>
              MSRP:
            </TableCell>
            <TableCell>{ MSRP }</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  customerList: state.customers.customerLists,
  dealership: state.dealership.dealership,
});

export default connect(mapStateToProps)(Review);
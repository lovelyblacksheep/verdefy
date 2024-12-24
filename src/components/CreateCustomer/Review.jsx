import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

import CustomerInfoContext from "../../context/customerInfoContext";

export default function Review() {
  const { firstName, lastName, email, phone, address1, address2, city, state, zipCode, country, yearOfBirth, monthOfBirth, dayOfBirth } = useContext(CustomerInfoContext);

  const addresses = address2 ? [address1, address2, city, state, zipCode, country] : [address1, city, state, zipCode, country];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Customer Summary
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Name:
            </TableCell>
            <TableCell>{firstName} {lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Email:
            </TableCell>
            <TableCell>{email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Phone:
            </TableCell>
            <TableCell>{phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              DOB:
            </TableCell>
            <TableCell>{monthOfBirth}/{dayOfBirth}/{yearOfBirth}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component={'th'} sx={{ fontWeight: 'bold' }}>
              Address:
            </TableCell>
            <TableCell>{addresses.join(', ')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
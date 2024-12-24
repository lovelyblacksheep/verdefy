import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import CustomerInfoContext from "../../context/customerInfoContext";

export default function AddressForm() {
  const { address1, setAddress1, address2, setAddress2, city, setCity, state, setState, zipCode, setZipCode, country, setCountry } = useContext(CustomerInfoContext);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            type="number"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={zipCode}
            onChange={(e) => {
              // Prevent non-positive values
              const value = e.target.value;
              if (value === "" || Number(value) >= 0) {
                setZipCode(value);
              }
            }}
            onKeyDown={(e) => {
              // Prevent the user from entering a minus sign
              if (e.key === "-" || e.key === "e") {
                e.preventDefault();
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

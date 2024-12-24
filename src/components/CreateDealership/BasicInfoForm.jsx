import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import CreateDealerContext from "../../context/createDealershipContext";
import { connect } from "react-redux";

const BasicInfoForm = ({ ligEmail }) => {
  const {
    dealerName,
    setDealerName,
    dealerAddress1,
    setDealerAddress1,
    dealerAddress2,
    setDealerAddress2,
    dealerCity,
    setDealerCity,
    dealerState,
    setDealerState,
    dealerZipCode,
    setDealerZipCode,
    dealerPhone,
    setDealerPhone,
    dealerEmail,
    setDealerEmail,
    dealerContact,
    setDealerContact
  } = React.useContext(CreateDealerContext);

  // React.useEffect(() => {
  //   if (ligEmail) {
  //     setDealerEmail(ligEmail);
  //   }
  // }, [ligEmail, setDealerEmail]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="full-name"
            variant="standard"
            value={dealerName}
            onChange={(e) => setDealerName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            type="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={dealerEmail}
            onChange={(e) => setDealerEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={dealerAddress1}
            onChange={(e) => setDealerAddress1(e.target.value)}
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
            value={dealerAddress2}
            onChange={(e) => setDealerAddress2(e.target.value)}
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
            value={dealerCity}
            onChange={(e) => setDealerCity(e.target.value)}
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
            value={dealerState}
            onChange={(e) => setDealerState(e.target.value)}
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
            value={dealerZipCode}
            onChange={(e) => {
              // Prevent non-positive values
              const value = e.target.value;
              if (value === "" || Number(value) >= 0) {
                setDealerZipCode(value);
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
            id="phone"
            type="tel"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="phone"
            variant="standard"
            value={dealerPhone}
            onChange={(e) => setDealerPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="contact"
            name="contact"
            label="Contact"
            fullWidth
            autoComplete="contact"
            variant="standard"
            value={dealerContact}
            onChange={(e) => setDealerContact(e.target.value)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  ligEmail: state.auth.user.email,
})

export default connect(mapStateToProps)(BasicInfoForm);
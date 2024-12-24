import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import CheckoutContext from "../../context/checkoutContext";
import { connect } from "react-redux";

const DealerInfo = ({dealership}) => {

  return (
    <React.Fragment>
      {/* <Typography variant="h6" gutterBottom>
        Dealer information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="dealerMarkup"
            label="Dealer Markup"
            fullWidth
            autoComplete="dealerMarkup"
            variant="standard"
            type="number"
            value={dealership.theirProfitMarginPercent}
            InputLabelProps={{
              shrink: true, // Ensures the label doesn't overlap with the value
            }}
            disabled
          />
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  dealership: state.dealership.dealership,
});

export default connect(mapStateToProps)(DealerInfo);
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // Make sure you have React Router set up
import { connect, useDispatch } from "react-redux";

import { profitPercentAction } from "../../store/profitPercent";

const DealerSetting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profitPercent, setProfitPercent] = React.useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(profitPercentAction.setProfitPercent(profitPercent));
    alert("Profit Percentage Saved");
    // Handle the form submission logic here
    console.log("Submitted Profit Margin Percent:", profitPercent);
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate('/dashboard'); // Replace with your actual dashboard route
  };

  return (
    <React.Fragment>
      <Box 
        sx={{ 
          border: '1px solid #ddd', 
          padding: 2, 
          borderRadius: 2, 
          maxWidth: 600, 
          margin: '0 auto', 
          boxShadow: 1 
        }}
      >
        <Typography variant="h5" gutterBottom align="center" sx={{ marginBottom: 2 }}>
          Dealer Setting
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item md={3} xs={12}>
              <Typography variant="h6" gutterBottom>
                Detail
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth variant="standard">
                <TextField
                  required
                  id="profit-percent"
                  name="profit-percent"
                  type="number"
                  autoComplete="profit-percent"
                  variant="standard"
                  placeholder="Profit Margin Percent (%)"
                  inputProps={{ max: 100 }}
                  value={profitPercent}
                  onChange={(e) => setProfitPercent(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3} xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
            <Grid item md={12} xs={12} sx={{ marginTop: 2 }}>
              <Button variant="outlined" color="primary" onClick={handleBack} fullWidth>
                Back to Dashboard
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </React.Fragment>
  );
}

export default DealerSetting;
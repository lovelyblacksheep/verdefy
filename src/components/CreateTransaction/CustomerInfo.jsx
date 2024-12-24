
import * as React from "react";
import { connect } from "react-redux";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from '@mui/material/Autocomplete';

import CheckoutContext from '../../context/checkoutContext';

const CustomerInfo = ({ customerList, salesperson }) => {
  const {
    customerID,
    setCustomerID,
    vehicleMake,
    setVehicleMake,
    vehicleModel,
    setVehicleModel,
    vehicleYear,
    setVehicleYear,
    VIN,
    setVIN,
    vehicleType,
    setVehicleType,
    averageMPG,
    setAverageMPG,
    isDiesel,
    setIsDiesel
  } = React.useContext(CheckoutContext);

  const sortCustomersByDate = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // Sort by descending order (latest first)
  };

  // retrieve();
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            value={customerList.find(customer => customer.id === customerID)}
            onChange={(event, newValue) => {
              setCustomerID(newValue ? newValue.id : '');
            }}
            options={customerList.filter(item => item.dealershipID === salesperson?.dealershipID).sort(sortCustomersByDate)}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Customer"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="vehicleMake"
            name="vehicleMake"
            label="Vehicle Manufacturer"
            fullWidth
            autoComplete="vehicleMake"
            variant="standard"
            value={vehicleMake}
            onChange={(e) => setVehicleMake(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="vehicleModel"
            name="vehicleModel"
            label="Vehicle Model"
            fullWidth
            autoComplete="vehicleModel"
            variant="standard"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="vehicleYear"
            name="vehicleYear"
            label="Vehicle Year"
            fullWidth
            type="number"
            autoComplete="vehicleYear"
            variant="standard"
            value={vehicleYear}
            onChange={(e) => {
              // Prevent non-positive values
              const value = e.target.value;
              if (value === "" || Number(value) >= 0) {
                setVehicleYear(value);
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
            id="averageMPG"
            name="averageMPG"
            label="Average MPG"
            fullWidth
            type="number"
            autoComplete="averageMPG"
            variant="standard"
            value={averageMPG}
            onChange={(e) => {
              // Prevent non-positive values
              const value = e.target.value;
              if (value === "" || Number(value) >= 0) {
                setAverageMPG(value);
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
            id="vin"
            name="vin"
            label="VIN"
            fullWidth
            autoComplete="vehicleModel"
            variant="standard"
            value={VIN}
            onChange={(e) => setVIN(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          
        </Grid>
        <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Vehicle type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <FormControlLabel
                value="Car"
                control={<Radio />}
                label="Car"
              />
              <FormControlLabel
                value="SUV"
                control={<Radio />}
                label="SUV"
              />
              <FormControlLabel
                value="TRUCK"
                control={<Radio />}
                label="TRUCK"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} style={{ textAlign: "left" }}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Fuel Type
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value={false}
                control={<Radio />}
                checked={!isDiesel}
                label="Gas"
                onChange={(e) => setIsDiesel(false)}
              />
              <FormControlLabel
                value={true}
                control={<Radio />}
                checked={isDiesel}
                label="Diesel"
                onChange={(e) => setIsDiesel(true)}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  salesperson: state.sales.salesMan,
  customerList: state.customers.customerLists,
});

export default connect(mapStateToProps)(CustomerInfo);
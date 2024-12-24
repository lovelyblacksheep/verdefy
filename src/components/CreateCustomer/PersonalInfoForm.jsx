import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import CustomerInfoContext from "../../context/customerInfoContext";

export default function PersonalInfoForm() {
  const { firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone, yearOfBirth, setYearOfBirth, monthOfBirth, setMonthOfBirth, dayOfBirth, setDayOfBirth } = useContext(CustomerInfoContext);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="phone"
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="monthOfBirth"
            name="monthOfBirth"
            label="Birth Month"
            type="number"
            fullWidth
            autoComplete="monthOfBirth"
            variant="standard"
            value={monthOfBirth}
            onChange={(e) => {
              const value = e.target.value;
              // Ensure the value is a non-negative number and does not exceed 12
              if (value === "" || (Number(value) >= 0 && Number(value) <= 12)) {
                setMonthOfBirth(value);
              }
            }}
            onKeyDown={(e) => {
              // Prevent the user from entering a minus sign or 'e'
              if (e.key === "-" || e.key === "e") {
                e.preventDefault();
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="dayOfBirth"
            name="dayOfBirth"
            label="Birth Day"
            type="number"
            fullWidth
            autoComplete="dayOfBirth"
            variant="standard"
            value={dayOfBirth}
            onChange={(e) => {
              const value = e.target.value;
              // Ensure the value is a non-negative number and does not exceed 12
              if (value === "" || (Number(value) >= 0 && Number(value) <= 31)) {
                setDayOfBirth(value);
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
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="yearOfBirth"
            name="yearOfBirth"
            label="Birth Year"
            type="number"
            fullWidth
            autoComplete="yearOfBirth"
            variant="standard"
            value={yearOfBirth}
            onChange={(e) => {
              // Prevent non-positive values
              const value = e.target.value;
              if (value === "" || Number(value) >= 0) {
                setYearOfBirth(value);
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
      </Grid>
    </React.Fragment>
  );
}

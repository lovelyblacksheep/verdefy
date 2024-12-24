import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Diversity2Icon from '@mui/icons-material/Diversity2';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Title from "./../Title"; // Ensure the path to Title component is correct

function preventDefault(event) {
  event.preventDefault();
}

const Analytic_Dealerships = ({ dealershipsList }) => {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Diversity2Icon sx={{ fontSize: 40, marginRight: 2, color: 'primary.main' }} />
        <Box>
          <Title>Dealerships</Title>
          <Typography component="p" variant="h4">
            {dealershipsList.length}
          </Typography>
        </Box>
      </Box>
      {/* <Box mt={2}>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Details
        </Link>
      </Box> */}
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  dealershipsList: state.dealership.dealershipLists,
});

export default connect(mapStateToProps)(Analytic_Dealerships);

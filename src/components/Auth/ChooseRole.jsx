import { useNavigate, Link as RouterLink } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ChooseRole() {

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Choose your role
          </Typography>
          <Box
            sx={{ mt: 4 }}
          >
            <Button
              type="button"
              variant="contained"
              sx={{ mr: 2 }}
              onClick={() => {
                navigate('/createsalesperson');
              }}
            >
              SalesMan
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                navigate('/createdealer');
              }}
            >
              Dealer
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

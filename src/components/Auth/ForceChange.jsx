import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForcePassword() {

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
                        Please change your password
                    </Typography>
                    <Typography component="h4" variant="h5">
                        Now you are using the default password. It's not good for security. Please set your own password.
                    </Typography>
                    <Box
                        sx={{ mt: 4 }}
                    >
                        <Button
                            type="button"
                            variant="contained"
                            sx={{ mr: 2 }}
                            onClick={() => {
                                navigate('/forgotpassword');
                            }}
                        >
                            Reset
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            onClick={() => {
                                navigate('/signin');
                            }}
                        >
                            Skip
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

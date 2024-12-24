import { generateClient } from "@aws-amplify/api";
import { getDealership, getSalesperson, listSalespeople } from "../../graphql/queries";

import { useState, useContext, useEffect } from "react";
import Context from "../../Context";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { secondaryListItems } from "../listItems";
import { signOut } from "aws-amplify/auth";
import { useNavigate, useParams } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import SettingsIcon from '@mui/icons-material/Settings';
import { AddCard, FilePresent, Handshake, PersonAdd, Receipt, Title } from "@mui/icons-material";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { connect } from "react-redux";
// import Transactions from "./Transactions";
// import Customers from "./Customers";
// import Dealerships from "./Dealerships";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://www.verdecertified.com/">
                Verdefy
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Salespeople = ({ isAdminAccount, isDealerAccount, salesPeople }) => {

    const { dealershipId } = useParams();
    const [dealership, setDealership] = useState();
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    const handleShowMoreClick = (event) => {
        event.preventDefault();
        setShowAll(prevShowAll => !prevShowAll); // Toggle to show all dealerships when link is clicked
    };

    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const client = generateClient();
            const response = await client.graphql({
                query: getDealership,
                variables: {
                    id: dealershipId,
                },
            });

            setDealership(response.data.getDealership);
            setLoading(false);
        };

        if (dealershipId) {
            fetchData();
        }
    }, [dealershipId]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: "24px", // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {dealership ? dealership.name : "Loading dealership..."}
                        </Typography>
                        <button
                            onClick={() => {
                                navigate("/createsalesperson");
                            }}
                            style={{ marginRight: '10px' }}
                        >
                            Create
                        </button>
                        <button
                            onClick={() => {
                                signOut();
                                navigate("/signin");
                            }}
                        >
                            Log Out
                        </button>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <ListItemButton onClick={() => navigate("/")}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => {
                                navigate("/dashboard");
                            }}
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>

                        {(isAdminAccount || isDealerAccount) && (
                            <ListItemButton
                                onClick={() => {
                                    navigate("/dealerships");
                                }}
                            >
                                <ListItemIcon>
                                    <Handshake />
                                </ListItemIcon>
                                <ListItemText primary="Invite Dealership" />
                            </ListItemButton>
                        )}

                        {(isAdminAccount || isDealerAccount) && (
                            <ListItemButton
                                onClick={() => {
                                    const path = dealership && `/salespeople/${dealership.id}`;
                                    navigate(path);
                                }}
                            >
                                <ListItemIcon>
                                    <Diversity3Icon />
                                </ListItemIcon>
                                <ListItemText primary="Salespople" />
                            </ListItemButton>
                        )}


                        {isAdminAccount && (
                            <ListItemButton
                                onClick={() => {
                                    navigate("/invoice");
                                }}
                            >
                                <ListItemIcon>
                                    <Receipt />
                                </ListItemIcon>
                                <ListItemText primary="Invoice" />
                            </ListItemButton>
                        )}

                        {!isAdminAccount && !isDealerAccount && (
                            <>
                                <ListItemButton
                                    onClick={() => {
                                        navigate("/createcustomer");
                                    }}
                                >
                                    <ListItemIcon>
                                        <PersonAdd />
                                    </ListItemIcon>
                                    <ListItemText primary="Customer" />
                                </ListItemButton>

                            </>
                        )}

                        <ListItemButton
                            onClick={() => {
                                navigate("/createtransaction");
                            }}
                        >
                            <ListItemIcon>
                                <AddCard />
                            </ListItemIcon>
                            <ListItemText primary="Transaction" />
                        </ListItemButton>
                        {
                            isDealerAccount && (
                                <ListItemButton
                                onClick={() => {
                                    navigate("/dealersetting");
                                }}
                                >
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Settings" />
                                </ListItemButton>
                            )
                        }

                        <ListItemButton>
                            <ListItemIcon>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Reports" />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemIcon>
                                <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary="Integrations" />
                        </ListItemButton>

                        <Divider sx={{ my: 1 }} />
                        {/* {secondaryListItems} */}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        minHeight: "100vh",
                        overflow: "auto",
                        position: 'relative'
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        {loading && <CircularProgress size={24} color="primary" />}
                        {!loading && dealership && <>
                            {/* <div style={{ marginBottom: '2px' }}>{dealership.name}</div> */}
                            <Grid container spacing={3}>
                                {/* Chart */}
                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <>
                                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                                Salespeople
                                            </Typography>
                                            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                                                <TableContainer>
                                                    <Table stickyHeader size="small">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>No</TableCell>
                                                                <TableCell>Name</TableCell>
                                                                <TableCell>Email</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                        {showAll ? salesPeople
                                                                .filter(
                                                                (row) => row.dealershipID === dealership.id
                                                                ).map(
                                                                (row, index) => (
                                                                <TableRow key={row.id}>
                                                                    <TableCell>{index + 1}</TableCell>
                                                                    <TableCell>
                                                                    <Link
                                                                        href="#"
                                                                        onClick={() =>
                                                                        navigate("/salesperson/" + row.id)
                                                                        }
                                                                    >
                                                                        {row.firstName} {row.lastName}
                                                                    </Link>
                                                                    </TableCell>
                                                                    <TableCell>{row.email}</TableCell>
                                                                </TableRow>
                                                                )
                                                            ) :
                                                            salesPeople
                                                                .filter(
                                                                (row) => row.dealershipID === dealership.id
                                                                ).slice(0, 5).map(
                                                                (row, index) => (
                                                                <TableRow key={row.id}>
                                                                    <TableCell>{index + 1}</TableCell>
                                                                    <TableCell>
                                                                    <Link
                                                                        href="#"
                                                                        onClick={() =>
                                                                        navigate("/salesperson/" + row.id)
                                                                        }
                                                                    >
                                                                        {row.firstName} {row.lastName}
                                                                    </Link>
                                                                    </TableCell>
                                                                    <TableCell>{row.email}</TableCell>
                                                                </TableRow>
                                                                )
                                                            )
                                                            }
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Box>
                                            <Link color="primary" href="#" onClick={handleShowMoreClick} sx={{ mt: 3 }}>
                                                {showAll ? "See fewer Salespeople" : "See more Salespeople"}
                                            </Link>
                                        </>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </>
                        }
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

const mapStateToProps = (state) => ({
    isAdminAccount: state.auth.isAdmin,
    isDealerAccount: state.auth.isDealer,
    salesPeople: state.sales.salesPeople,
});

export default connect(mapStateToProps)(Salespeople);
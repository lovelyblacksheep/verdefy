import { generateClient } from "@aws-amplify/api";
import { listTransactions, listCustomers, listInvoices } from "../../graphql/queries";

import { useState, useEffect } from "react";

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
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SettingsIcon from '@mui/icons-material/Settings';
import { secondaryListItems } from "../listItems";
import Analytic_Sales from "./Analytics/Analytic_Sales";
import Analytic_Customers from "./Analytics/Analytic_Customers";
import Analytic_Dealerships from "./Analytics/Analytic_Dealerships";
import Analytic_Profits from "./Analytics/Analytic_Profits";
import Analytic_Transactions from "./Analytics/Analytic_Transactions";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import CircularProgress from '@mui/material/CircularProgress';
import LayersIcon from "@mui/icons-material/Layers";
import { AddCard, Handshake, PersonAdd, Receipt } from "@mui/icons-material";
import Transactions from "./Transactions";
import Customers from "./Customers";
import Dealerships from "./Dealerships";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { connect, useDispatch } from "react-redux";
import { authAction } from "../../store/user";
import { transactionAction } from "../../store/transaction";
import { customerAction } from "../../store/customer";
import { invoiceAction } from "../../store/invoice";
import { profitPercentAction } from "../../store/profitPercent";

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

const Dashboard = ({ isAdmin, isDealer, dealership, salesPeople }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [showAll, setShowAll] = useState(false);

  const handleShowMoreClick = (event) => {
      event.preventDefault();
      setShowAll(prevShowAll => !prevShowAll); // Toggle to show all dealerships when link is clicked
  };

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const client = generateClient(); // Ensure this function exists and is imported properly
        const res_listTransactions = await client.graphql({
          query: listTransactions,
        });
        dispatch(transactionAction.getTransactions(res_listTransactions.data.listTransactions.items));
      } catch (error) {
        console.error('An error occurred while fetching transactions:', error);
      }
    }

    fetchTransactions();

    async function fetchCustomers() {
      const client = generateClient();
      try {
        const res_listCustomers = await client.graphql({
          query: listCustomers,
        });
        dispatch(customerAction.getCustomersLists(res_listCustomers.data.listCustomers.items));
      } catch (error) {
        console.error('An error occurred while fetching customers:', error);
      }
    };

    fetchCustomers();
    
    async function fetchInvoices() {
      const client = generateClient();
      try {
        const res_listInvoices = await client.graphql({
          query: listInvoices,
        });
        dispatch(invoiceAction.getInvoiceLists(res_listInvoices.data.listInvoices.items));
      } catch (error) {
        console.error('An error occurred while fetching customers:', error);
      }
    };

    fetchInvoices();

    setLoading(false); // Assuming we want to set loading to false after fetching
  }, [dispatch]);

  const handleSignOut = () => {
    signOut();
    dispatch(authAction.removeUser());
    dispatch(profitPercentAction.removeProfitPercent());
  }

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
              {loading ? (
                <CircularProgress color="inherit" />
              ) : (
                dealership?.name || "Loading dealership..." // Only try to access name if dealership object is not undefined
              )}
            </Typography>
            <button
              onClick={() => {
                handleSignOut();
                navigate("/signin");
              }}
            >
              Log Out
            </button>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
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

            {(isAdmin || isDealer) && (
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

            {(isAdmin || isDealer) && (
              <ListItemButton
                onClick={() => {
                  const path = dealership && `/salespeople/${dealership.id}`;
                  console.log(path);
                  // : `/salespeople/${getSalesmanObj && getSalesmanObj.Dealership.id}`;
                  navigate(path);
                }}
              >
                <ListItemIcon>
                  <Diversity3Icon />
                </ListItemIcon>
                <ListItemText primary="Salespople" />
              </ListItemButton>
            )}


            {isAdmin && (
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

            {!isAdmin && !isDealer && (
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
              isDealer && (
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
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Anaylitics */}
              { 
                isAdmin && (
                  <>
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Analytic_Sales />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Analytic_Profits />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Analytic_Dealerships />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Analytic_Customers />
                      </Paper>
                    </Grid>
                  </>
                )
              }
              {
                !isAdmin && isDealer && (
                  <>
                    <Grid item xs={12} md={6} lg={6}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Analytic_Sales />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Analytic_Transactions />
                      </Paper>
                    </Grid>
                  </>
                )
              }
              {
                !isAdmin && !isDealer && (
                  <>
                    <Grid item xs={12} md={6} lg={6}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Analytic_Customers />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Analytic_Transactions />
                      </Paper>
                    </Grid>
                  </>
                )
              }
              {/* Recent Orders */}
              { !isDealer && (
                <Grid item xs={12} id="customers">
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Customers />
                  </Paper>
                </Grid>
              )}
              {isAdmin && (
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Dealerships />
                  </Paper>
                </Grid>
              )}
              {isDealer && (
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <>
                      <Typography
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                      >
                        Salespeople
                      </Typography>
                      <Box sx={{ width: "100%", overflow: "hidden" }}>
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
              )}
              {isAdmin && (
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Transactions />
                  </Paper>
                </Grid>
              )}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  isDealer: state.auth.isDealer,
  dealership: state.dealership.dealership,
  salesMan: state.sales.salesMan,
  salesPeople: state.sales.salesPeople,
  // ...add other state properties if needed
});

export default connect(mapStateToProps)(Dashboard);
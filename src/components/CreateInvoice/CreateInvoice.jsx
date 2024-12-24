import * as React from "react";
import { generateClient } from "@aws-amplify/api";
import { createInvoice, updateInvoice, updateTransaction } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  Button,
  Checkbox,
  CircularProgress,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { FilePresent } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateInvoiceForm = ({ dealerList, transactionsList, customersList }) => {
  const client = generateClient();
  const [transactions, setTransactionsList] = useState(transactionsList);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // State to track select all
  const [dealerCode, setDealerCode] = useState(""); // Initialize to empty string
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const filteredTransactions = useMemo(() => {
    if (!dealerCode) {
      return [];
    }
    // Filter customers based on dealership ID
    const filteredCustomers = customersList.filter(
      (customer) => customer.dealershipID === dealerCode
    );
    const customerIDs = new Set(filteredCustomers.map((customer) => customer.id));
    // Filter transactions based on the filtered customers and non-null invoiceID
    return transactions.filter(
      (transaction) => customerIDs.has(transaction.customerID) && transaction.invoiceID === null
    );
  }, [dealerCode, transactions, customersList]);

  
  console.log("filteredTransactions: ", filteredTransactions);

  const createFunction = async () => {
    setLoading(true);
    const response = await client.graphql({
      query: createInvoice,
      variables: {
        input: {
          dealershipID: dealerCode,
        },
      },
    });

    const invoice = response.data.createInvoice;
    for (let i = 0; i < selectedTransactions.length; i++) {
      console.log("selectedTransactions: ", selectedTransactions);
      const transaction = selectedTransactions[i];
      const trans_response = await client.graphql({
        query: updateTransaction,
        variables: {
          input: {
            id: transaction,
            invoiceID: invoice.id,
          },
        },
      });

      await client.graphql({
        query: updateInvoice,
        variables: {
          input: {
            id: invoice.id,
            s3Link: trans_response.data.updateTransaction.s3Link,
          },
        },
      });
    }

    // Additional logic for generating invoice PDF omitted for brevity

    alert("Created");
    setLoading(false);
    navigate("/dashboard");
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (event.target.checked) {
      setSelectedTransactions([...selectedTransactions, value]);
    } else {
      setSelectedTransactions(
        selectedTransactions.filter((item) => item !== value)
      );
    }
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      const allTransactionIds = filteredTransactions.map(
        (transaction) => transaction.id
      );
      setSelectedTransactions(allTransactionIds);
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleBackPage = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" color="inherit" noWrap>
            Verdefy
          </Typography>
          <Button
            variant="contained"
            onClick={handleBackPage}
          >
            Back
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              value={dealerCode}
              label="Dealership"
              fullWidth
              select
              onChange={(e) => setDealerCode(e.target.value)}
            >
              {dealerList.map((dealership) => (
                <MenuItem key={dealership.id} value={dealership.id}>
                  {dealership.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TableContainer>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox checked={selectAll} onChange={handleSelectAll} />
                      </TableCell>
                      {/* <TableCell>No</TableCell> */}
                      <TableCell>Customer</TableCell>
                      <TableCell>Vehicle Manufacturer</TableCell>
                      <TableCell>Vehicle Model</TableCell>
                      {/* <TableCell>Vehicle Year</TableCell> */}
                      <TableCell>Vehicle Type</TableCell>
                      <TableCell>Fuel Type</TableCell>
                      {/* <TableCell>Average MPG</TableCell> */}
                      <TableCell>Dealer Markup</TableCell>
                      <TableCell>File</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTransactions.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Checkbox
                            value={row.id}
                            onChange={handleChange}
                            checked={
                              selectedTransactions.indexOf(row.id) > -1
                            }
                          />
                        </TableCell>
                        {/* <TableCell>{index + 1}</TableCell> */}
                        <TableCell>{`${row.Customer?.firstName} ${row.Customer?.lastName}`}</TableCell>
                        <TableCell>{row.vehicleMake}</TableCell>
                        <TableCell>{row.vehicleModel}</TableCell>
                        {/* <TableCell>{row.vehicleYear}</TableCell> */}
                        <TableCell>{row.vehicleType}</TableCell>
                        <TableCell>{row.isDiesel ? "Gas" : "Diesel"}</TableCell>
                        {/* <TableCell>{row.averageMPG}</TableCell> */}
                        <TableCell>{row.dealerMarkup}</TableCell>
                        <TableCell>
                          {row.s3Link && (
                            <a
                              href={row.s3Link}
                              download="attachment"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FilePresent />
                            </a>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={createFunction}
            disabled={
              loading || !(dealerCode && selectedTransactions.length)
            }
          >
            Submit
            {loading && (
              <CircularProgress
                size={24}
                color="primary"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Button>
          <Button variant="contained" fullWidth onClick={handleBackPage}>
            Back
          </Button>
        </Grid>
      </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  dealerList: state.dealership.dealershipLists,
  transactionsList: state.transaction.transactionsList,
  customersList: state.customers.customerLists,
});

export default connect(mapStateToProps)(CreateInvoiceForm);

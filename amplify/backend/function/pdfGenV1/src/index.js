/* Amplify Params - DO NOT EDIT
  API_VERDEFYVITE_GRAPHQLAPIENDPOINTOUTPUT
  API_VERDEFYVITE_GRAPHQLAPIIDOUTPUT
  ENV
  REGION
  STORAGE_VERDEFY_BUCKETNAME
Amplify Params - DO NOT EDIT */

import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';
import PDFDocumentWithTables from 'pdfkit-table';
import AWS from "aws-sdk";

const GRAPHQL_ENDPOINT = process.env.API_VERDEFYVITE_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const { Sha256 } = crypto;
const AWS_BUCKET = process.env.STORAGE_VERDEFY_BUCKETNAME;

const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      firstName
      lastName
      email
      phone
      address1
      address2
      city
      state
      zipCode
      country
      yearOfBirth
      monthOfBirth
      dayOfBirth
      gender
    }
  }
`;

const listSalespeople = /* GraphQL */ `
  query ListSalespeople(
    $filter: ModelSalespersonFilterInput
  ) {
    listSalespeople(filter: $filter) {
      items {
        id
        firstName
        lastName
        address1
        address2
        city
        state
        phone
        email
      }
    }
  }
`;

const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
      id
      s3Link
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { variables, ctx } = event;
  const { customerID, salespersonID, ...transaction } = variables.input;
  let customer, salesPerson;

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const customerRequestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({
      query: getCustomer,
      variables: {
        id: customerID
      }
    }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(customerRequestToBeSigned);
  const customerRequest = new Request(endpoint, signed);

  try {
    let response = await fetch(customerRequest);
    let body = await response.json();
    if (body.errors) {
      console.log(body.errors);
      return;
    }
    customer = body.data.getCustomer;
  } catch (error) {
    console.log({
      message: error.message
    });
    return;
  }

  const salesPersonRequestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({
      query: listSalespeople,
      variables: {
        filter: {
          userId: {
            eq: salespersonID
          }
        }
      }
    }),
    path: endpoint.pathname
  });

  const salesPersonSigned = await signer.sign(salesPersonRequestToBeSigned);
  const salesPersonRequest = new Request(endpoint, salesPersonSigned);

  try {
    let response = await fetch(salesPersonRequest);
    let body = await response.json();
    if (body.errors) {
      console.log(body.errors);
      return;
    }
    salesPerson = body.data.listSalespeople.items.length > 0 ? body.data.listSalespeople.items[0] : null;
  } catch (error) {
    console.log({
      message: error.message
    });
    return;
  }

  console.log(customer, salesPerson);

  const s3 = new AWS.S3();
  let doc = new PDFDocumentWithTables({ margin: 30, size: 'A4' });
  const timestamp = Date.now();

  await doc.table({
    title: "Transaction",
    headers: ["Vehicle Manufacturer", "Vehicle Model", "Vehicle Year", "VIN", "Fuel TYpe", "Average MPG", "Offset Cost", "Verdefy Markup", "Dealer Markup", "MSRP"],
    rows: [
      [transaction.vehicleMake, transaction.vehicleModel, transaction.vehicleYear, transaction.VIN, transaction.isDiesel ? 'Diesel' : 'Gas', transaction.averageMPG, transaction.offsetCost, transaction.ourMarkup, transaction.dealerMarkup, transaction.MSRP],
    ],
  });

  if (customer) {
    await doc.table({
      title: "Customer",
      headers: ["Name", "Email", "Phone", "DOB", "Address"],
      rows: [
        [`${customer.firstName} ${customer.lastName}`, customer.email, customer.phone, `${customer.monthOfBirth}/${customer.dayOfBirth}/${customer.yearOfBirth}`, (customer.address2 ? [customer.address1, customer.address2, customer.city, customer.state, customer.zipCode, customer.country] : [customer.address1, customer.city, customer.state, customer.zipCode, customer.country]).join(', ')],
      ],
    });
  }

  if (salesPerson) {
    await doc.table({
      title: "SalesPerson",
      headers: ["Name", "Email", "Phone"],
      rows: [
        [`${salesPerson.firstName} ${salesPerson.lastName}`, salesPerson.email, salesPerson.phone ? salesPerson.phone : ''],
      ],
    });
  }

  doc.end();

  var params = {
    Key: `${timestamp}.pdf`,
    Body: doc,
    Bucket: AWS_BUCKET,
    ContentType: "application/pdf",
  };

  let uploadRes = await s3.upload(params).promise();
  const link = `https://${AWS_BUCKET}.s3.amazonaws.com/${timestamp}.pdf`;

  console.log("uploadRes", uploadRes);
  console.log(
    "PDF uploaded to S3 successfully.",
    link
  );

  const transactionPersonRequestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({
      query: updateTransaction,
      variables: {
        input: {
          id: ctx.stash.defaultValues.id,
          s3Link: link
        }
      }
    }),
    path: endpoint.pathname
  });

  const transactionSigned = await signer.sign(transactionPersonRequestToBeSigned);
  const transactionRequest = new Request(endpoint, transactionSigned);

  try {
    let response = await fetch(transactionRequest);
    let body = await response.json();
    if (body.errors) {
      console.log(body.errors);
      return;
    }
    salesPerson = body.data.ListSalespeople.length > 0 ? body.data.listSalespeople[0] : null;
  } catch (error) {
    console.log({
      message: error.message
    });
    return;
  }
};
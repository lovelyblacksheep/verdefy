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

const query = /* GraphQL */ `
  mutation UpdateInvoice(
    $input: UpdateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    updateInvoice(input: $input, condition: $condition) {
      id
      isPaid
      Transactions {
        nextToken
        __typename
      }
      s3Link
      dueDate
      pastDue
      dealershipID
      createdAt
      updatedAt
      __typename
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const { invoice, dealership, transactions } = event.arguments;

  const s3 = new AWS.S3();
  let doc = new PDFDocumentWithTables({ margin: 30, size: 'A4' });
  const timestamp = Date.now();

  doc.text('Invoice #' + invoice);

  if (dealership) {
    await doc.table({
      title: "Dealership",
      headers: ["Name", "Email", "Phone", "Address", "Contact", "Outstanding Balance", "Gross Sales", "Gross Profits", "Our Profit", "Profit Margin Dollars", "Profit Margin Percent", "Total Transactions"],
      rows: [
        [dealership.name, dealership.email, dealership.phone, (dealership.address2 ? [dealership.address1, dealership.address2, dealership.city, dealership.state, dealership.zip] : [dealership.address1, dealership.city, dealership.state, dealership.zip]).join(', '), dealership.contactPerson ?? '', dealership.outstandingBalance ?? '', dealership.grossSalesToCustomers ?? '', dealership.grossProfits ?? '', dealership.ourProfitFromThem ?? '', dealership.theirProfitMarginDollars ?? '', dealership.theirProfitMarginPercent ?? '', dealership.lifetimeTotalTransactions ?? ''],
      ],
    });
  }

  await doc.table({
    title: "Transaction",
    headers: ["Customer", "Salesperson", "Vehicle Manufacturer", "Vehicle Model", "Vehicle Year", "VIN", "Fuel TYpe", "Average MPG", "Offset Cost", "Verdefy Markup", "Dealer Markup", "MSRP"],
    rows: transactions.map(transaction =>
      [transaction.Customer.firstName + ' ' + transaction.Customer.lastName, transaction.Salesperson ? transaction.Salesperson.firstName + ' ' + transaction.Salesperson.lastName : '', transaction.vehicleMake, transaction.vehicleModel, transaction.vehicleYear, transaction.VIN, transaction.isDiesel ? 'Diesel' : 'Gas', transaction.averageMPG, transaction.offsetCost, transaction.ourMarkup, transaction.dealerMarkup, transaction.MSRP],
    ),
  });

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

  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  const requestToBeSigned = new HttpRequest({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      host: endpoint.host
    },
    hostname: endpoint.host,
    body: JSON.stringify({
      query,
      variables: {
        input: {
          id: invoice,
          s3Link: link
        }
      }
    }),
    path: endpoint.pathname
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }

  return link;
};
// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Salesperson, Dealership, Invoice, Transaction, Customer } = initSchema(schema);

export {
  Salesperson,
  Dealership,
  Invoice,
  Transaction,
  Customer
};
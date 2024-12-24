import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerSalesperson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Salesperson, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly grossSalesToCustomers?: number | null;
  readonly grossProfitForDealership?: number | null;
  readonly ourProfitFromThem?: number | null;
  readonly lifetimeTotalTransactions?: number | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly address1?: string | null;
  readonly address2?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
  readonly Transactions?: (Transaction | null)[] | null;
  readonly dealershipID: string;
  readonly userId?: string | null;
  readonly Dealership?: Dealership | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySalesperson = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Salesperson, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly grossSalesToCustomers?: number | null;
  readonly grossProfitForDealership?: number | null;
  readonly ourProfitFromThem?: number | null;
  readonly lifetimeTotalTransactions?: number | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly address1?: string | null;
  readonly address2?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
  readonly Transactions: AsyncCollection<Transaction>;
  readonly dealershipID: string;
  readonly userId?: string | null;
  readonly Dealership: AsyncItem<Dealership | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Salesperson = LazyLoading extends LazyLoadingDisabled ? EagerSalesperson : LazySalesperson

export declare const Salesperson: (new (init: ModelInit<Salesperson>) => Salesperson) & {
  copyOf(source: Salesperson, mutator: (draft: MutableModel<Salesperson>) => MutableModel<Salesperson> | void): Salesperson;
}

type EagerDealership = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Dealership, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly outstandingBalance?: number | null;
  readonly grossSalesToCustomers?: number | null;
  readonly grossProfits?: number | null;
  readonly ourProfitFromThem?: number | null;
  readonly theirProfitMarginDollars?: number | null;
  readonly theirProfitMarginPercent?: number | null;
  readonly lifetimeTotalTransactions?: number | null;
  readonly Invoices?: (Invoice | null)[] | null;
  readonly name?: string | null;
  readonly address1?: string | null;
  readonly address2?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zip?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
  readonly contactPerson?: string | null;
  readonly Salespeople?: (Salesperson | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDealership = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Dealership, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly outstandingBalance?: number | null;
  readonly grossSalesToCustomers?: number | null;
  readonly grossProfits?: number | null;
  readonly ourProfitFromThem?: number | null;
  readonly theirProfitMarginDollars?: number | null;
  readonly theirProfitMarginPercent?: number | null;
  readonly lifetimeTotalTransactions?: number | null;
  readonly Invoices: AsyncCollection<Invoice>;
  readonly name?: string | null;
  readonly address1?: string | null;
  readonly address2?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zip?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
  readonly contactPerson?: string | null;
  readonly Salespeople: AsyncCollection<Salesperson>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Dealership = LazyLoading extends LazyLoadingDisabled ? EagerDealership : LazyDealership

export declare const Dealership: (new (init: ModelInit<Dealership>) => Dealership) & {
  copyOf(source: Dealership, mutator: (draft: MutableModel<Dealership>) => MutableModel<Dealership> | void): Dealership;
}

type EagerInvoice = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Invoice, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly isPaid?: boolean | null;
  readonly Transactions?: (Transaction | null)[] | null;
  readonly s3Link: string;
  readonly dueDate?: string | null;
  readonly pastDue?: boolean | null;
  readonly dealershipID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInvoice = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Invoice, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly isPaid?: boolean | null;
  readonly Transactions: AsyncCollection<Transaction>;
  readonly s3Link: string;
  readonly dueDate?: string | null;
  readonly pastDue?: boolean | null;
  readonly dealershipID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Invoice = LazyLoading extends LazyLoadingDisabled ? EagerInvoice : LazyInvoice

export declare const Invoice: (new (init: ModelInit<Invoice>) => Invoice) & {
  copyOf(source: Invoice, mutator: (draft: MutableModel<Invoice>) => MutableModel<Invoice> | void): Invoice;
}

type EagerTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Transaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly customerID: string;
  readonly vehicleMake: string;
  readonly vehicleModel: string;
  readonly vehicleYear: number;
  readonly VIN: string;
  readonly isDiesel: boolean;
  readonly averageMPG: number;
  readonly offsetCost?: string | null;
  readonly ourMarkup?: string | null;
  readonly dealerMarkup?: string | null;
  readonly MSRP?: string | null;
  readonly s3Link?: string | null;
  readonly invoiceID?: string | null;
  readonly salespersonID: string;
  readonly Customer?: Customer | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTransaction = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Transaction, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly customerID: string;
  readonly vehicleMake: string;
  readonly vehicleModel: string;
  readonly vehicleYear: number;
  readonly VIN: string;
  readonly isDiesel: boolean;
  readonly averageMPG: number;
  readonly offsetCost?: string | null;
  readonly ourMarkup?: string | null;
  readonly dealerMarkup?: string | null;
  readonly MSRP?: string | null;
  readonly s3Link?: string | null;
  readonly invoiceID?: string | null;
  readonly salespersonID: string;
  readonly Customer: AsyncItem<Customer | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Transaction = LazyLoading extends LazyLoadingDisabled ? EagerTransaction : LazyTransaction

export declare const Transaction: (new (init: ModelInit<Transaction>) => Transaction) & {
  copyOf(source: Transaction, mutator: (draft: MutableModel<Transaction>) => MutableModel<Transaction> | void): Transaction;
}

type EagerCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone?: string | null;
  readonly address1?: string | null;
  readonly address2?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zipCode?: string | null;
  readonly country?: string | null;
  readonly yearOfBirth?: number | null;
  readonly monthOfBirth?: number | null;
  readonly dayOfBirth?: number | null;
  readonly gender?: string | null;
  readonly Transactions?: (Transaction | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCustomer = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Customer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone?: string | null;
  readonly address1?: string | null;
  readonly address2?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zipCode?: string | null;
  readonly country?: string | null;
  readonly yearOfBirth?: number | null;
  readonly monthOfBirth?: number | null;
  readonly dayOfBirth?: number | null;
  readonly gender?: string | null;
  readonly Transactions: AsyncCollection<Transaction>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Customer = LazyLoading extends LazyLoadingDisabled ? EagerCustomer : LazyCustomer

export declare const Customer: (new (init: ModelInit<Customer>) => Customer) & {
  copyOf(source: Customer, mutator: (draft: MutableModel<Customer>) => MutableModel<Customer> | void): Customer;
}
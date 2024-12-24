/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSalesperson = /* GraphQL */ `
  query GetSalesperson($id: ID!) {
    getSalesperson(id: $id) {
      id
      grossSalesToCustomers
      grossProfitForDealership
      ourProfitFromThem
      lifetimeTotalTransactions
      firstName
      lastName
      address1
      address2
      city
      state
      phone
      email
      Transactions {
        nextToken
        __typename
      }
      dealershipID
      userId
      Dealership {
        id
        outstandingBalance
        grossSalesToCustomers
        grossProfits
        ourProfitFromThem
        theirProfitMarginDollars
        theirProfitMarginPercent
        lifetimeTotalTransactions
        name
        address1
        address2
        city
        state
        zip
        phone
        email
        contactPerson
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSalespeople = /* GraphQL */ `
  query ListSalespeople(
    $filter: ModelSalespersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSalespeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        grossSalesToCustomers
        grossProfitForDealership
        ourProfitFromThem
        lifetimeTotalTransactions
        firstName
        lastName
        address1
        address2
        city
        state
        phone
        email
        dealershipID
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const salespeopleByDealershipID = /* GraphQL */ `
  query SalespeopleByDealershipID(
    $dealershipID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSalespersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    salespeopleByDealershipID(
      dealershipID: $dealershipID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        grossSalesToCustomers
        grossProfitForDealership
        ourProfitFromThem
        lifetimeTotalTransactions
        firstName
        lastName
        address1
        address2
        city
        state
        phone
        email
        dealershipID
        userId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getDealership = /* GraphQL */ `
  query GetDealership($id: ID!) {
    getDealership(id: $id) {
      id
      outstandingBalance
      grossSalesToCustomers
      grossProfits
      ourProfitFromThem
      theirProfitMarginDollars
      theirProfitMarginPercent
      lifetimeTotalTransactions
      Invoices {
        nextToken
        __typename
      }
      name
      address1
      address2
      city
      state
      zip
      phone
      email
      contactPerson
      Salespeople {
        nextToken
        __typename
      }
      Customer {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listDealerships = /* GraphQL */ `
  query ListDealerships(
    $filter: ModelDealershipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDealerships(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        outstandingBalance
        grossSalesToCustomers
        grossProfits
        ourProfitFromThem
        theirProfitMarginDollars
        theirProfitMarginPercent
        lifetimeTotalTransactions
        name
        address1
        address2
        city
        state
        zip
        phone
        email
        contactPerson
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getInvoice = /* GraphQL */ `
  query GetInvoice($id: ID!) {
    getInvoice(id: $id) {
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
export const listInvoices = /* GraphQL */ `
  query ListInvoices(
    $filter: ModelInvoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        isPaid
        s3Link
        dueDate
        pastDue
        dealershipID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const invoicesByDealershipID = /* GraphQL */ `
  query InvoicesByDealershipID(
    $dealershipID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelInvoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    invoicesByDealershipID(
      dealershipID: $dealershipID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        isPaid
        s3Link
        dueDate
        pastDue
        dealershipID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      customerID
      vehicleMake
      vehicleModel
      vehicleYear
      VIN
      vehicleType
      isDiesel
      averageMPG
      offsetCost
      ourMarkup
      dealerMarkup
      MSRP
      s3Link
      invoiceID
      salespersonID
      Customer {
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
        dealershipID
        createdAt
        updatedAt
        __typename
      }
      Salesperson {
        id
        grossSalesToCustomers
        grossProfitForDealership
        ourProfitFromThem
        lifetimeTotalTransactions
        firstName
        lastName
        address1
        address2
        city
        state
        phone
        email
        dealershipID
        userId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customerID
        vehicleMake
        vehicleModel
        vehicleYear
        VIN
        vehicleType
        isDiesel
        averageMPG
        offsetCost
        ourMarkup
        dealerMarkup
        MSRP
        s3Link
        invoiceID
        salespersonID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const transactionsByCustomerID = /* GraphQL */ `
  query TransactionsByCustomerID(
    $customerID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionsByCustomerID(
      customerID: $customerID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customerID
        vehicleMake
        vehicleModel
        vehicleYear
        VIN
        vehicleType
        isDiesel
        averageMPG
        offsetCost
        ourMarkup
        dealerMarkup
        MSRP
        s3Link
        invoiceID
        salespersonID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const transactionsByInvoiceID = /* GraphQL */ `
  query TransactionsByInvoiceID(
    $invoiceID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionsByInvoiceID(
      invoiceID: $invoiceID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customerID
        vehicleMake
        vehicleModel
        vehicleYear
        VIN
        vehicleType
        isDiesel
        averageMPG
        offsetCost
        ourMarkup
        dealerMarkup
        MSRP
        s3Link
        invoiceID
        salespersonID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const transactionsBySalespersonID = /* GraphQL */ `
  query TransactionsBySalespersonID(
    $salespersonID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionsBySalespersonID(
      salespersonID: $salespersonID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customerID
        vehicleMake
        vehicleModel
        vehicleYear
        VIN
        vehicleType
        isDiesel
        averageMPG
        offsetCost
        ourMarkup
        dealerMarkup
        MSRP
        s3Link
        invoiceID
        salespersonID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCustomer = /* GraphQL */ `
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
      Transactions {
        nextToken
        __typename
      }
      dealershipID
      Dealership {
        id
        outstandingBalance
        grossSalesToCustomers
        grossProfits
        ourProfitFromThem
        theirProfitMarginDollars
        theirProfitMarginPercent
        lifetimeTotalTransactions
        name
        address1
        address2
        city
        state
        zip
        phone
        email
        contactPerson
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        dealershipID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const customersByDealershipID = /* GraphQL */ `
  query CustomersByDealershipID(
    $dealershipID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    customersByDealershipID(
      dealershipID: $dealershipID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        dealershipID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSalesperson = /* GraphQL */ `
  mutation CreateSalesperson(
    $input: CreateSalespersonInput!
    $condition: ModelSalespersonConditionInput
  ) {
    createSalesperson(input: $input, condition: $condition) {
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
export const updateSalesperson = /* GraphQL */ `
  mutation UpdateSalesperson(
    $input: UpdateSalespersonInput!
    $condition: ModelSalespersonConditionInput
  ) {
    updateSalesperson(input: $input, condition: $condition) {
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
export const deleteSalesperson = /* GraphQL */ `
  mutation DeleteSalesperson(
    $input: DeleteSalespersonInput!
    $condition: ModelSalespersonConditionInput
  ) {
    deleteSalesperson(input: $input, condition: $condition) {
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
export const createDealership = /* GraphQL */ `
  mutation CreateDealership(
    $input: CreateDealershipInput!
    $condition: ModelDealershipConditionInput
  ) {
    createDealership(input: $input, condition: $condition) {
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
export const updateDealership = /* GraphQL */ `
  mutation UpdateDealership(
    $input: UpdateDealershipInput!
    $condition: ModelDealershipConditionInput
  ) {
    updateDealership(input: $input, condition: $condition) {
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
export const deleteDealership = /* GraphQL */ `
  mutation DeleteDealership(
    $input: DeleteDealershipInput!
    $condition: ModelDealershipConditionInput
  ) {
    deleteDealership(input: $input, condition: $condition) {
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
export const createInvoice = /* GraphQL */ `
  mutation CreateInvoice(
    $input: CreateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    createInvoice(input: $input, condition: $condition) {
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
export const updateInvoice = /* GraphQL */ `
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
export const deleteInvoice = /* GraphQL */ `
  mutation DeleteInvoice(
    $input: DeleteInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    deleteInvoice(input: $input, condition: $condition) {
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
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
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
export const generateInvoicePDF = /* GraphQL */ `
  mutation GenerateInvoicePDF(
    $invoice: String
    $dealership: DealershipInput
    $transactions: [GenerateInvoicePDFTransationInput]
  ) {
    generateInvoicePDF(
      invoice: $invoice
      dealership: $dealership
      transactions: $transactions
    )
  }
`;

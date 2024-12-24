/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSalesperson = /* GraphQL */ `
  subscription OnCreateSalesperson(
    $filter: ModelSubscriptionSalespersonFilterInput
  ) {
    onCreateSalesperson(filter: $filter) {
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
export const onUpdateSalesperson = /* GraphQL */ `
  subscription OnUpdateSalesperson(
    $filter: ModelSubscriptionSalespersonFilterInput
  ) {
    onUpdateSalesperson(filter: $filter) {
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
export const onDeleteSalesperson = /* GraphQL */ `
  subscription OnDeleteSalesperson(
    $filter: ModelSubscriptionSalespersonFilterInput
  ) {
    onDeleteSalesperson(filter: $filter) {
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
export const onCreateDealership = /* GraphQL */ `
  subscription OnCreateDealership(
    $filter: ModelSubscriptionDealershipFilterInput
  ) {
    onCreateDealership(filter: $filter) {
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
export const onUpdateDealership = /* GraphQL */ `
  subscription OnUpdateDealership(
    $filter: ModelSubscriptionDealershipFilterInput
  ) {
    onUpdateDealership(filter: $filter) {
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
export const onDeleteDealership = /* GraphQL */ `
  subscription OnDeleteDealership(
    $filter: ModelSubscriptionDealershipFilterInput
  ) {
    onDeleteDealership(filter: $filter) {
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
export const onCreateInvoice = /* GraphQL */ `
  subscription OnCreateInvoice($filter: ModelSubscriptionInvoiceFilterInput) {
    onCreateInvoice(filter: $filter) {
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
export const onUpdateInvoice = /* GraphQL */ `
  subscription OnUpdateInvoice($filter: ModelSubscriptionInvoiceFilterInput) {
    onUpdateInvoice(filter: $filter) {
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
export const onDeleteInvoice = /* GraphQL */ `
  subscription OnDeleteInvoice($filter: ModelSubscriptionInvoiceFilterInput) {
    onDeleteInvoice(filter: $filter) {
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
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onCreateTransaction(filter: $filter) {
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onUpdateTransaction(filter: $filter) {
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction(
    $filter: ModelSubscriptionTransactionFilterInput
  ) {
    onDeleteTransaction(filter: $filter) {
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
export const onCreateCustomer = /* GraphQL */ `
  subscription OnCreateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onCreateCustomer(filter: $filter) {
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
export const onUpdateCustomer = /* GraphQL */ `
  subscription OnUpdateCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onUpdateCustomer(filter: $filter) {
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
export const onDeleteCustomer = /* GraphQL */ `
  subscription OnDeleteCustomer($filter: ModelSubscriptionCustomerFilterInput) {
    onDeleteCustomer(filter: $filter) {
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

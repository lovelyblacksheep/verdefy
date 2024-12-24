/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getDealership } from "../graphql/queries";
import { updateDealership } from "../graphql/mutations";
const client = generateClient();
export default function DealershipUpdateForm(props) {
  const {
    id: idProp,
    dealership: dealershipModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    outstandingBalance: "",
    grossSalesToCustomers: "",
    grossProfits: "",
    ourProfitFromThem: "",
    theirProfitMarginDollars: "",
    theirProfitMarginPercent: "",
    lifetimeTotalTransactions: "",
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    contactPerson: "",
  };
  const [outstandingBalance, setOutstandingBalance] = React.useState(
    initialValues.outstandingBalance
  );
  const [grossSalesToCustomers, setGrossSalesToCustomers] = React.useState(
    initialValues.grossSalesToCustomers
  );
  const [grossProfits, setGrossProfits] = React.useState(
    initialValues.grossProfits
  );
  const [ourProfitFromThem, setOurProfitFromThem] = React.useState(
    initialValues.ourProfitFromThem
  );
  const [theirProfitMarginDollars, setTheirProfitMarginDollars] =
    React.useState(initialValues.theirProfitMarginDollars);
  const [theirProfitMarginPercent, setTheirProfitMarginPercent] =
    React.useState(initialValues.theirProfitMarginPercent);
  const [lifetimeTotalTransactions, setLifetimeTotalTransactions] =
    React.useState(initialValues.lifetimeTotalTransactions);
  const [name, setName] = React.useState(initialValues.name);
  const [address1, setAddress1] = React.useState(initialValues.address1);
  const [address2, setAddress2] = React.useState(initialValues.address2);
  const [city, setCity] = React.useState(initialValues.city);
  const [state, setState] = React.useState(initialValues.state);
  const [zip, setZip] = React.useState(initialValues.zip);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [email, setEmail] = React.useState(initialValues.email);
  const [contactPerson, setContactPerson] = React.useState(
    initialValues.contactPerson
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = dealershipRecord
      ? { ...initialValues, ...dealershipRecord }
      : initialValues;
    setOutstandingBalance(cleanValues.outstandingBalance);
    setGrossSalesToCustomers(cleanValues.grossSalesToCustomers);
    setGrossProfits(cleanValues.grossProfits);
    setOurProfitFromThem(cleanValues.ourProfitFromThem);
    setTheirProfitMarginDollars(cleanValues.theirProfitMarginDollars);
    setTheirProfitMarginPercent(cleanValues.theirProfitMarginPercent);
    setLifetimeTotalTransactions(cleanValues.lifetimeTotalTransactions);
    setName(cleanValues.name);
    setAddress1(cleanValues.address1);
    setAddress2(cleanValues.address2);
    setCity(cleanValues.city);
    setState(cleanValues.state);
    setZip(cleanValues.zip);
    setPhone(cleanValues.phone);
    setEmail(cleanValues.email);
    setContactPerson(cleanValues.contactPerson);
    setErrors({});
  };
  const [dealershipRecord, setDealershipRecord] =
    React.useState(dealershipModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getDealership.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getDealership
        : dealershipModelProp;
      setDealershipRecord(record);
    };
    queryData();
  }, [idProp, dealershipModelProp]);
  React.useEffect(resetStateValues, [dealershipRecord]);
  const validations = {
    outstandingBalance: [],
    grossSalesToCustomers: [],
    grossProfits: [],
    ourProfitFromThem: [],
    theirProfitMarginDollars: [],
    theirProfitMarginPercent: [],
    lifetimeTotalTransactions: [],
    name: [],
    address1: [],
    address2: [],
    city: [],
    state: [],
    zip: [],
    phone: [],
    email: [],
    contactPerson: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          outstandingBalance: outstandingBalance ?? null,
          grossSalesToCustomers: grossSalesToCustomers ?? null,
          grossProfits: grossProfits ?? null,
          ourProfitFromThem: ourProfitFromThem ?? null,
          theirProfitMarginDollars: theirProfitMarginDollars ?? null,
          theirProfitMarginPercent: theirProfitMarginPercent ?? null,
          lifetimeTotalTransactions: lifetimeTotalTransactions ?? null,
          name: name ?? null,
          address1: address1 ?? null,
          address2: address2 ?? null,
          city: city ?? null,
          state: state ?? null,
          zip: zip ?? null,
          phone: phone ?? null,
          email: email ?? null,
          contactPerson: contactPerson ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateDealership.replaceAll("__typename", ""),
            variables: {
              input: {
                id: dealershipRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "DealershipUpdateForm")}
      {...rest}
    >
      <TextField
        label="Outstanding balance"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={outstandingBalance}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              outstandingBalance: value,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city,
              state,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.outstandingBalance ?? value;
          }
          if (errors.outstandingBalance?.hasError) {
            runValidationTasks("outstandingBalance", value);
          }
          setOutstandingBalance(value);
        }}
        onBlur={() =>
          runValidationTasks("outstandingBalance", outstandingBalance)
        }
        errorMessage={errors.outstandingBalance?.errorMessage}
        hasError={errors.outstandingBalance?.hasError}
        {...getOverrideProps(overrides, "outstandingBalance")}
      ></TextField>
      <TextField
        label="Gross sales to customers"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={grossSalesToCustomers}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers: value,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city,
              state,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.grossSalesToCustomers ?? value;
          }
          if (errors.grossSalesToCustomers?.hasError) {
            runValidationTasks("grossSalesToCustomers", value);
          }
          setGrossSalesToCustomers(value);
        }}
        onBlur={() =>
          runValidationTasks("grossSalesToCustomers", grossSalesToCustomers)
        }
        errorMessage={errors.grossSalesToCustomers?.errorMessage}
        hasError={errors.grossSalesToCustomers?.hasError}
        {...getOverrideProps(overrides, "grossSalesToCustomers")}
      ></TextField>
      <TextField
        label="Gross profits"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={grossProfits}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits: value,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city,
              state,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.grossProfits ?? value;
          }
          if (errors.grossProfits?.hasError) {
            runValidationTasks("grossProfits", value);
          }
          setGrossProfits(value);
        }}
        onBlur={() => runValidationTasks("grossProfits", grossProfits)}
        errorMessage={errors.grossProfits?.errorMessage}
        hasError={errors.grossProfits?.hasError}
        {...getOverrideProps(overrides, "grossProfits")}
      ></TextField>
      <TextField
        label="Our profit from them"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={ourProfitFromThem}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem: value,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city,
              state,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.ourProfitFromThem ?? value;
          }
          if (errors.ourProfitFromThem?.hasError) {
            runValidationTasks("ourProfitFromThem", value);
          }
          setOurProfitFromThem(value);
        }}
        onBlur={() =>
          runValidationTasks("ourProfitFromThem", ourProfitFromThem)
        }
        errorMessage={errors.ourProfitFromThem?.errorMessage}
        hasError={errors.ourProfitFromThem?.hasError}
        {...getOverrideProps(overrides, "ourProfitFromThem")}
      ></TextField>
      <TextField
        label="Their profit margin dollars"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={theirProfitMarginDollars}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars: value,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city,
              state,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.theirProfitMarginDollars ?? value;
          }
          if (errors.theirProfitMarginDollars?.hasError) {
            runValidationTasks("theirProfitMarginDollars", value);
          }
          setTheirProfitMarginDollars(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "theirProfitMarginDollars",
            theirProfitMarginDollars
          )
        }
        errorMessage={errors.theirProfitMarginDollars?.errorMessage}
        hasError={errors.theirProfitMarginDollars?.hasError}
        {...getOverrideProps(overrides, "theirProfitMarginDollars")}
      ></TextField>
      <TextField
        label="Their profit margin percent"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={theirProfitMarginPercent}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent: value,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city,
              state,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.theirProfitMarginPercent ?? value;
          }
          if (errors.theirProfitMarginPercent?.hasError) {
            runValidationTasks("theirProfitMarginPercent", value);
          }
          setTheirProfitMarginPercent(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "theirProfitMarginPercent",
            theirProfitMarginPercent
          )
        }
        errorMessage={errors.theirProfitMarginPercent?.errorMessage}
        hasError={errors.theirProfitMarginPercent?.hasError}
        {...getOverrideProps(overrides, "theirProfitMarginPercent")}
      ></TextField>
      <TextField
        label="Lifetime total transactions"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={lifetimeTotalTransactions}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions: value,
              name,
              address1,
              address2,
              city,
              state,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.lifetimeTotalTransactions ?? value;
          }
          if (errors.lifetimeTotalTransactions?.hasError) {
            runValidationTasks("lifetimeTotalTransactions", value);
          }
          setLifetimeTotalTransactions(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "lifetimeTotalTransactions",
            lifetimeTotalTransactions
          )
        }
        errorMessage={errors.lifetimeTotalTransactions?.errorMessage}
        hasError={errors.lifetimeTotalTransactions?.hasError}
        {...getOverrideProps(overrides, "lifetimeTotalTransactions")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name: value,
              address1,
              address2,
              city,
              state,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Address1"
        isRequired={false}
        isReadOnly={false}
        value={address1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1: value,
              address2,
              city,
              state,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.address1 ?? value;
          }
          if (errors.address1?.hasError) {
            runValidationTasks("address1", value);
          }
          setAddress1(value);
        }}
        onBlur={() => runValidationTasks("address1", address1)}
        errorMessage={errors.address1?.errorMessage}
        hasError={errors.address1?.hasError}
        {...getOverrideProps(overrides, "address1")}
      ></TextField>
      <TextField
        label="Address2"
        isRequired={false}
        isReadOnly={false}
        value={address2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2: value,
              city,
              state,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.address2 ?? value;
          }
          if (errors.address2?.hasError) {
            runValidationTasks("address2", value);
          }
          setAddress2(value);
        }}
        onBlur={() => runValidationTasks("address2", address2)}
        errorMessage={errors.address2?.errorMessage}
        hasError={errors.address2?.hasError}
        {...getOverrideProps(overrides, "address2")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city: value,
              state,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="State"
        isRequired={false}
        isReadOnly={false}
        value={state}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city,
              state: value,
              zip,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.state ?? value;
          }
          if (errors.state?.hasError) {
            runValidationTasks("state", value);
          }
          setState(value);
        }}
        onBlur={() => runValidationTasks("state", state)}
        errorMessage={errors.state?.errorMessage}
        hasError={errors.state?.hasError}
        {...getOverrideProps(overrides, "state")}
      ></TextField>
      <TextField
        label="Zip"
        isRequired={false}
        isReadOnly={false}
        value={zip}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city,
              state,
              zip: value,
              phone,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.zip ?? value;
          }
          if (errors.zip?.hasError) {
            runValidationTasks("zip", value);
          }
          setZip(value);
        }}
        onBlur={() => runValidationTasks("zip", zip)}
        errorMessage={errors.zip?.errorMessage}
        hasError={errors.zip?.hasError}
        {...getOverrideProps(overrides, "zip")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city,
              state,
              zip,
              phone: value,
              email,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city,
              state,
              zip,
              phone,
              email: value,
              contactPerson,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Contact person"
        isRequired={false}
        isReadOnly={false}
        value={contactPerson}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              outstandingBalance,
              grossSalesToCustomers,
              grossProfits,
              ourProfitFromThem,
              theirProfitMarginDollars,
              theirProfitMarginPercent,
              lifetimeTotalTransactions,
              name,
              address1,
              address2,
              city,
              state,
              zip,
              phone,
              email,
              contactPerson: value,
            };
            const result = onChange(modelFields);
            value = result?.contactPerson ?? value;
          }
          if (errors.contactPerson?.hasError) {
            runValidationTasks("contactPerson", value);
          }
          setContactPerson(value);
        }}
        onBlur={() => runValidationTasks("contactPerson", contactPerson)}
        errorMessage={errors.contactPerson?.errorMessage}
        hasError={errors.contactPerson?.hasError}
        {...getOverrideProps(overrides, "contactPerson")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || dealershipModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || dealershipModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

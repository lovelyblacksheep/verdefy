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
import { getCustomer } from "../graphql/queries";
import { updateCustomer } from "../graphql/mutations";
const client = generateClient();
export default function CustomerUpdateForm(props) {
  const {
    id: idProp,
    customer: customerModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    yearOfBirth: "",
    monthOfBirth: "",
    dayOfBirth: "",
    gender: "",
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [address1, setAddress1] = React.useState(initialValues.address1);
  const [address2, setAddress2] = React.useState(initialValues.address2);
  const [city, setCity] = React.useState(initialValues.city);
  const [state, setState] = React.useState(initialValues.state);
  const [zipCode, setZipCode] = React.useState(initialValues.zipCode);
  const [country, setCountry] = React.useState(initialValues.country);
  const [yearOfBirth, setYearOfBirth] = React.useState(
    initialValues.yearOfBirth
  );
  const [monthOfBirth, setMonthOfBirth] = React.useState(
    initialValues.monthOfBirth
  );
  const [dayOfBirth, setDayOfBirth] = React.useState(initialValues.dayOfBirth);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = customerRecord
      ? { ...initialValues, ...customerRecord }
      : initialValues;
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setAddress1(cleanValues.address1);
    setAddress2(cleanValues.address2);
    setCity(cleanValues.city);
    setState(cleanValues.state);
    setZipCode(cleanValues.zipCode);
    setCountry(cleanValues.country);
    setYearOfBirth(cleanValues.yearOfBirth);
    setMonthOfBirth(cleanValues.monthOfBirth);
    setDayOfBirth(cleanValues.dayOfBirth);
    setGender(cleanValues.gender);
    setErrors({});
  };
  const [customerRecord, setCustomerRecord] = React.useState(customerModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getCustomer.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getCustomer
        : customerModelProp;
      setCustomerRecord(record);
    };
    queryData();
  }, [idProp, customerModelProp]);
  React.useEffect(resetStateValues, [customerRecord]);
  const validations = {
    firstName: [{ type: "Required" }],
    lastName: [{ type: "Required" }],
    email: [{ type: "Required" }],
    phone: [],
    address1: [],
    address2: [],
    city: [],
    state: [],
    zipCode: [],
    country: [],
    yearOfBirth: [],
    monthOfBirth: [],
    dayOfBirth: [],
    gender: [],
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
          firstName,
          lastName,
          email,
          phone: phone ?? null,
          address1: address1 ?? null,
          address2: address2 ?? null,
          city: city ?? null,
          state: state ?? null,
          zipCode: zipCode ?? null,
          country: country ?? null,
          yearOfBirth: yearOfBirth ?? null,
          monthOfBirth: monthOfBirth ?? null,
          dayOfBirth: dayOfBirth ?? null,
          gender: gender ?? null,
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
            query: updateCustomer.replaceAll("__typename", ""),
            variables: {
              input: {
                id: customerRecord.id,
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
      {...getOverrideProps(overrides, "CustomerUpdateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              email,
              phone,
              address1,
              address2,
              city,
              state,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              gender,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={true}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName: value,
              email,
              phone,
              address1,
              address2,
              city,
              state,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              gender,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email: value,
              phone,
              address1,
              address2,
              city,
              state,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              gender,
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
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone: value,
              address1,
              address2,
              city,
              state,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              gender,
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
        label="Address1"
        isRequired={false}
        isReadOnly={false}
        value={address1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              address1: value,
              address2,
              city,
              state,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              gender,
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
              firstName,
              lastName,
              email,
              phone,
              address1,
              address2: value,
              city,
              state,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              gender,
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
              firstName,
              lastName,
              email,
              phone,
              address1,
              address2,
              city: value,
              state,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              gender,
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
              firstName,
              lastName,
              email,
              phone,
              address1,
              address2,
              city,
              state: value,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              gender,
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
        label="Zip code"
        isRequired={false}
        isReadOnly={false}
        value={zipCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              address1,
              address2,
              city,
              state,
              zipCode: value,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              gender,
            };
            const result = onChange(modelFields);
            value = result?.zipCode ?? value;
          }
          if (errors.zipCode?.hasError) {
            runValidationTasks("zipCode", value);
          }
          setZipCode(value);
        }}
        onBlur={() => runValidationTasks("zipCode", zipCode)}
        errorMessage={errors.zipCode?.errorMessage}
        hasError={errors.zipCode?.hasError}
        {...getOverrideProps(overrides, "zipCode")}
      ></TextField>
      <TextField
        label="Country"
        isRequired={false}
        isReadOnly={false}
        value={country}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              address1,
              address2,
              city,
              state,
              zipCode,
              country: value,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              gender,
            };
            const result = onChange(modelFields);
            value = result?.country ?? value;
          }
          if (errors.country?.hasError) {
            runValidationTasks("country", value);
          }
          setCountry(value);
        }}
        onBlur={() => runValidationTasks("country", country)}
        errorMessage={errors.country?.errorMessage}
        hasError={errors.country?.hasError}
        {...getOverrideProps(overrides, "country")}
      ></TextField>
      <TextField
        label="Year of birth"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={yearOfBirth}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              address1,
              address2,
              city,
              state,
              zipCode,
              country,
              yearOfBirth: value,
              monthOfBirth,
              dayOfBirth,
              gender,
            };
            const result = onChange(modelFields);
            value = result?.yearOfBirth ?? value;
          }
          if (errors.yearOfBirth?.hasError) {
            runValidationTasks("yearOfBirth", value);
          }
          setYearOfBirth(value);
        }}
        onBlur={() => runValidationTasks("yearOfBirth", yearOfBirth)}
        errorMessage={errors.yearOfBirth?.errorMessage}
        hasError={errors.yearOfBirth?.hasError}
        {...getOverrideProps(overrides, "yearOfBirth")}
      ></TextField>
      <TextField
        label="Month of birth"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={monthOfBirth}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              address1,
              address2,
              city,
              state,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth: value,
              dayOfBirth,
              gender,
            };
            const result = onChange(modelFields);
            value = result?.monthOfBirth ?? value;
          }
          if (errors.monthOfBirth?.hasError) {
            runValidationTasks("monthOfBirth", value);
          }
          setMonthOfBirth(value);
        }}
        onBlur={() => runValidationTasks("monthOfBirth", monthOfBirth)}
        errorMessage={errors.monthOfBirth?.errorMessage}
        hasError={errors.monthOfBirth?.hasError}
        {...getOverrideProps(overrides, "monthOfBirth")}
      ></TextField>
      <TextField
        label="Day of birth"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={dayOfBirth}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              address1,
              address2,
              city,
              state,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth: value,
              gender,
            };
            const result = onChange(modelFields);
            value = result?.dayOfBirth ?? value;
          }
          if (errors.dayOfBirth?.hasError) {
            runValidationTasks("dayOfBirth", value);
          }
          setDayOfBirth(value);
        }}
        onBlur={() => runValidationTasks("dayOfBirth", dayOfBirth)}
        errorMessage={errors.dayOfBirth?.errorMessage}
        hasError={errors.dayOfBirth?.hasError}
        {...getOverrideProps(overrides, "dayOfBirth")}
      ></TextField>
      <TextField
        label="Gender"
        isRequired={false}
        isReadOnly={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              email,
              phone,
              address1,
              address2,
              city,
              state,
              zipCode,
              country,
              yearOfBirth,
              monthOfBirth,
              dayOfBirth,
              gender: value,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
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
          isDisabled={!(idProp || customerModelProp)}
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
              !(idProp || customerModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

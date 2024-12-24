/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CustomerCreateFormInputValues = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    yearOfBirth?: number;
    monthOfBirth?: number;
    dayOfBirth?: number;
    gender?: string;
};
export declare type CustomerCreateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    address1?: ValidationFunction<string>;
    address2?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    zipCode?: ValidationFunction<string>;
    country?: ValidationFunction<string>;
    yearOfBirth?: ValidationFunction<number>;
    monthOfBirth?: ValidationFunction<number>;
    dayOfBirth?: ValidationFunction<number>;
    gender?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CustomerCreateFormOverridesProps = {
    CustomerCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    address1?: PrimitiveOverrideProps<TextFieldProps>;
    address2?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    zipCode?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
    yearOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    monthOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    dayOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CustomerCreateFormProps = React.PropsWithChildren<{
    overrides?: CustomerCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CustomerCreateFormInputValues) => CustomerCreateFormInputValues;
    onSuccess?: (fields: CustomerCreateFormInputValues) => void;
    onError?: (fields: CustomerCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CustomerCreateFormInputValues) => CustomerCreateFormInputValues;
    onValidate?: CustomerCreateFormValidationValues;
} & React.CSSProperties>;
export default function CustomerCreateForm(props: CustomerCreateFormProps): React.ReactElement;

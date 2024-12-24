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
export declare type DealershipCreateFormInputValues = {
    outstandingBalance?: number;
    grossSalesToCustomers?: number;
    grossProfits?: number;
    ourProfitFromThem?: number;
    theirProfitMarginDollars?: number;
    theirProfitMarginPercent?: number;
    lifetimeTotalTransactions?: number;
    name?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    email?: string;
    contactPerson?: string;
};
export declare type DealershipCreateFormValidationValues = {
    outstandingBalance?: ValidationFunction<number>;
    grossSalesToCustomers?: ValidationFunction<number>;
    grossProfits?: ValidationFunction<number>;
    ourProfitFromThem?: ValidationFunction<number>;
    theirProfitMarginDollars?: ValidationFunction<number>;
    theirProfitMarginPercent?: ValidationFunction<number>;
    lifetimeTotalTransactions?: ValidationFunction<number>;
    name?: ValidationFunction<string>;
    address1?: ValidationFunction<string>;
    address2?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    zip?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    contactPerson?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DealershipCreateFormOverridesProps = {
    DealershipCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    outstandingBalance?: PrimitiveOverrideProps<TextFieldProps>;
    grossSalesToCustomers?: PrimitiveOverrideProps<TextFieldProps>;
    grossProfits?: PrimitiveOverrideProps<TextFieldProps>;
    ourProfitFromThem?: PrimitiveOverrideProps<TextFieldProps>;
    theirProfitMarginDollars?: PrimitiveOverrideProps<TextFieldProps>;
    theirProfitMarginPercent?: PrimitiveOverrideProps<TextFieldProps>;
    lifetimeTotalTransactions?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    address1?: PrimitiveOverrideProps<TextFieldProps>;
    address2?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    zip?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    contactPerson?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DealershipCreateFormProps = React.PropsWithChildren<{
    overrides?: DealershipCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DealershipCreateFormInputValues) => DealershipCreateFormInputValues;
    onSuccess?: (fields: DealershipCreateFormInputValues) => void;
    onError?: (fields: DealershipCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DealershipCreateFormInputValues) => DealershipCreateFormInputValues;
    onValidate?: DealershipCreateFormValidationValues;
} & React.CSSProperties>;
export default function DealershipCreateForm(props: DealershipCreateFormProps): React.ReactElement;

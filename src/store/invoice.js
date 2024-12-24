import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoiceLists: []
}

const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {
        getInvoiceLists: (state, { payload }) => {
            if (payload) {
                state.invoiceLists = payload;
            }
        },
        updateInvoiceLists: (state, { payload }) => {
            if (payload) {
                state.invoiceLists = [
                    ...state.invoiceLists,
                    payload
                ];
            }
        },
    },
});

export const invoiceAction = invoiceSlice.actions

export default invoiceSlice
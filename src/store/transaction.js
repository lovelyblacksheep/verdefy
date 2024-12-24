import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    transactionsList: [],
}

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        getTransactions: (state, { payload }) => {
            if (payload) {
                state.transactionsList = payload;
            }
        },
        updateTransactions: (state, { payload }) => {
            if (payload) {
                state.transactionsList = [
                    ...state.transactionsList,
                    payload
                ];
            }
        },
    },
});

export const transactionAction = transactionSlice.actions

export default transactionSlice
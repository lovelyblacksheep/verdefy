import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    salesMan: {},
    salesPeople: [],
}

const salesManSlice = createSlice({
    name: "salesman",
    initialState,
    reducers: {
        setSalesMan: (state, { payload }) => {
            if (payload) {
                state.salesMan = payload;
            }
        },
        getSalesPeople: (state, { payload }) => {
            if (payload) {
                state.salesPeople = payload;
            }
        },
        updateSalesPeople: (state, { payload }) => {
            if (payload) {
                state.salesPeople = [
                    ...state.salesPeople,
                    payload
                ];
            }
        },
    },
});

export const salesAction = salesManSlice.actions

export default salesManSlice
import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    customerLists: []
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        // setDealerShip: (state, { payload }) => {
        //     if (payload) {
        //         state.dealership = payload;
        //     }
        // },
        getCustomersLists: (state, { payload }) => {
            if (payload) {
                state.customerLists = payload;
            }
        },
        updateCustomersLists: (state, { payload }) => {
            if (payload) {
                state.customerLists = [
                    ...state.customerLists,
                    payload
                ];
            }
        },
    },
});

export const customerAction = customerSlice.actions

export default customerSlice
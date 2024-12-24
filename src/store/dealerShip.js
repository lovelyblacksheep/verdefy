import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    dealership: {},
    dealershipLists: []
}

const dealerShipSlice = createSlice({
    name: "dealership",
    initialState,
    reducers: {
        setDealerShip: (state, { payload }) => {
            if (payload) {
                state.dealership = payload;
            }
        },
        getDealershipLists: (state, { payload }) => {
            if (payload) {
                state.dealershipLists = payload;
            }
        },
        updateDealershipLists: (state, { payload }) => {
            if (payload) {
                state.dealershipLists = [
                    ...state.dealershipLists,
                    payload
                ];
            }
        },
    },
});

export const dealerShipAction = dealerShipSlice.actions

export default dealerShipSlice
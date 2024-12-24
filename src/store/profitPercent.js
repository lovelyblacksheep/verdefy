import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    profitPercent: 0,
}

const profitPercentSlice = createSlice({
    name: "profitpercent",
    initialState,
    reducers: {
        setProfitPercent: (state, { payload }) => {
            if (payload) {
                state.profitPercent = payload;
            }
        },
        removeProfitPercent: () => initialState,
    },
});

export const profitPercentAction = profitPercentSlice.actions;

export default profitPercentSlice;
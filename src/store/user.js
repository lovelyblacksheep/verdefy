import { createAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAdmin: false,
    isDealer: false,
    user: {
        email: '',
        email_verified: '',
        family_name: '',
        given_name: '',
        sub: '',
    }
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsDealer: (state, { payload }) => {
            if (payload) {
                state.isDealer = payload;
            }
        },
        setIsAdmin: (state, { payload }) => {
            if (payload) {
                state.isAdmin = payload;
            }
        },
        addUser: (state, { payload }) => {
            if (payload) {
                state.user = payload;
            }
        },
        removeUser: () => initialState,
        // updateUser: (state, { payload }) => {
        //     if (payload) {
        //         state.plots = [
        //             ...state.plots,
        //             payload
        //         ];
        //     }
        // },
        // removeUser: (state, { payload }) => {
        //     if (payload) {
        //         state.plots = state.plots.filter((plot) => plot._id !== payload);
        //     }
        // },
    },
});

export const authAction = authSlice.actions

export default authSlice
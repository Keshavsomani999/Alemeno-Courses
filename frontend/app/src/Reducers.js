import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    isAuth: false,
    user: {}
}

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('login_Request', (state) => {
            state.isAuth = false;
            state.isLoading = true;
        })
        .addCase('login_Success', (state, action) => {
            state.isAuth = true;
            state.user = action.payload;
            state.isLoading = false;
        })
        .addCase('logout', (state) => {
            state.user = null;
            state.isAuth = false;
            state.isLoading = false;
        });
});

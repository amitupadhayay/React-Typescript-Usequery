import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    commonError: "",
    dialogState: false,
    authenticated: false,
}

export const CommonReducer: any = createSlice({
    name: "common",
    initialState: initialState,
    reducers: {
        setCommonError: (state: any) => {
            state.loading = false;
        },
        setDialogState: (state: any, action: any) => {
            state.dialogState = action?.payload;
        },
        authentication: (state: any, action: any) => {
            state.authenticated = false;
        },
        authenticationSuccess: (state: any, action: any) => {
            state.authenticated = true;
        },
        setAuthentication: (state: any, action: any) => {
            state.authenticated = action.payload;
        },
    },
    extraReducers: {

    }
});

export const {
    setCommonError, setDialogState, authentication, authenticationSuccess, setAuthentication
} = CommonReducer.actions;

export const getAuthentication = ((state: any) => state.CommonReducer.authenticated);
export const getCommonError = ((state: any) => state.CommonReducer.commonError);
export const getDialogState = ((state: any) => state.CommonReducer.dialogState);
export default CommonReducer.reducer;
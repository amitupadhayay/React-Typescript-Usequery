import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authenticated: false,
    loading: false,
    dialogLoading: false,
    allEmployee: [] as any[],
    selectedEmployee: {},
}

export const EmployeeReducer = createSlice({
    name: "employee",
    initialState: initialState,
    reducers: {
        setAuthentication: (state: any, action: any) => {
            state.authenticated = action.payload;
        },
        fetchAllEmployee: (state: any, action: any) => {
            state.loading = true;
        },
        fetchAllEmployeeSuccess: (state: any, action: any) => {
            state.loading = false;
            state.allEmployee = action.payload;
        },
        fetchSelectedEmployee: (state: any, action: any) => {
            state.loading = true;
        },
        fetchSelectedEmployeeSuccess: (state: any, action: any) => {
            state.loading = false;
            state.selectedEmployee = action.payload;
        },
        modifyEmployeeData: (state: any, action: any) => {
            let employeeList = JSON.parse(JSON.stringify(state.allEmployee));
            //employeeList = employeeList.filter(x => x.Id !== action.payload?.Id);
            state.allEmployee = [action.payload, ...employeeList];
        },
        setCommonError: (state: any) => {
            state.dialogState ? state.dialogLoading = false : state.loading = false;
        },
        deleteEmployee: (state: any) => {
            state.loading = true;
        },
        deleteEmployeeSuceess: (state: any) => {
            state.loading = false;
        },
        removeEmployeeData: (state: any, action: any) => {
            let employeeList = JSON.parse(JSON.stringify(state.allEmployee));
            //employeeList = employeeList.filter(x => x.EmployeeId !== action?.payload);
            state.allEmployee = [...employeeList];
        },
    },
    extraReducers: {

    }
});

export const {
    setAuthentication,
    fetchAllEmployee, fetchAllEmployeeSuccess, fetchSelectedEmployee, fetchSelectedEmployeeSuccess,
    setCommonError, modifyEmployeeData,
    deleteEmployee, deleteEmployeeSuceess, removeEmployeeData,
} = EmployeeReducer.actions;

export const getAuthentication = ((state: any) => state.EmployeeReducer.authenticated);
export const getLoading = ((state: any) => state.EmployeeReducer.loading);
export const getDialogLoading = ((state: any) => state.EmployeeReducer.dialogLoading);
export const getAllEmployee = ((state: any) => state.EmployeeReducer.allEmployee);
export const getSelectedEmployee = ((state: any) => state.EmployeeReducer.selectedEmployee);
export const getCommonError = ((state: any) => state.EmployeeReducer.commonError);
export const getApiTransaction = ((state: any) => state.EmployeeReducer.apiTransaction);

export default EmployeeReducer.reducer;
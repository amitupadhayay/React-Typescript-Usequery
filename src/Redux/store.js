import { createStore, applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import EmployeeReducer from './Reducer/EmployeeReducer';
import CommonReducer from './Reducer/CommonReducer';



const store = configureStore({
    reducer: {
        CommonReducer: CommonReducer,
        EmployeeReducer: EmployeeReducer,
    },
    middleware: [],
});


export default store;
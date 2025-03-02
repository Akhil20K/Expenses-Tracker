import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
// Stores the state of Authentication of user on frontend
export const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})
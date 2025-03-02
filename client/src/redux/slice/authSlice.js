// UI State management - Has the reducers which have actions to manage global state
import { createSlice } from '@reduxjs/toolkit';

// Initial State
const authSlice = createSlice({
    name: 'auth', // Type of action u want to take
    initialState: {
        user: null,
    },
    reducers: {
        loginAction: (state, action) => {
            state.user = action.payload;
        },
        logoutAction: (state, action) => {
            state.user = null;
        }
    }
});

// Export Actions
export const { loginAction, logoutAction } = authSlice.actions;
// Export Reducers
const authReducer = authSlice.reducer;
export default authReducer;
import {createSlice} from '@reduxjs/toolkit';

import jwt from 'jwt-decode';

const initialState = {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    currentUser: {
        email: 'mail@example.com',
        picture: null
    },
    user: []
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, {payload}) => {
            console.log('reducer: ',payload);
            localStorage.setItem('token', payload);
            state.isLoggedIn = true;
            state.token = payload;
        },
        logoutUser: (state) => {
            localStorage.removeItem('token');
            state.currentUser = {};
            state.isLoggedIn = false;
            state.token = null;
        },
        loadUser: (state, {payload}) => {
            state.user = payload;
        }
    }
});

export const {loginUser, logoutUser, loadUser} = authSlice.actions;

export default authSlice.reducer;

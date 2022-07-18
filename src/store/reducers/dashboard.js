import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dashboard: []
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setDashboard: (state, {payload}) => {
            state.dashboard = payload;
        }
    }
});

export const {setDashboard} = dashboardSlice.actions;

export default dashboardSlice.reducer;
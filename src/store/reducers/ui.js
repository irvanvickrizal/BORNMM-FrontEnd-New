import {createSlice} from '@reduxjs/toolkit';
import {calculateWindowSize} from '@app/utils/helpers';

const initialState = {
    isSidebarMenuCollapsed: false,
    screenSize: calculateWindowSize(window.innerWidth),
    isLoading: false
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebarMenu: (state) => {
            state.isSidebarMenuCollapsed = !state.isSidebarMenuCollapsed;
        },
        setWindowSize: (state, {payload}) => {
            state.screenSize = payload;
        },
        setIsLoading: (state, {payload}) => {
            state.isLoading = payload;
        }
    }
});

export const {toggleSidebarMenu, setWindowSize, setIsLoading} = uiSlice.actions;

export default uiSlice.reducer;

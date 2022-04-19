import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    menu: []
};

export const menuSlice = createSlice({
    name: 'pagetext',
    initialState,
    reducers: {
        setMenu: (state, {payload}) => {
            state.menu = payload;
        }
    }
});

export const {setMenu} = menuSlice.actions;

export default menuSlice.reducer;
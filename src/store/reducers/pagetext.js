import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cardHeader: ""
};

export const pagetextSlice = createSlice({
    name: 'pagetext',
    initialState,
    reducers: {
        setCardTitle: (state, {payload}) => {
            state.cardHeader = payload;
        }
    }
});

export const {setCardTitle} = pagetextSlice.actions;

export default pagetextSlice.reducer;
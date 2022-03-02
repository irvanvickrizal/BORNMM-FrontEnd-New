import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isNew: false,
    isEdit: false
};

export const scopeSlice = createSlice({
    name: 'scope',
    initialState,
    reducers: {
        setIsNew: (state, {payload}) => {
            state.isNew = payload;
        },
        setIsEdit:(state, {payload}) => {
            state.isEdit = payload;
        }
        
    }
});

export const {setIsNew, setIsEdit} = scopeSlice.actions;

export default scopeSlice.reducer;
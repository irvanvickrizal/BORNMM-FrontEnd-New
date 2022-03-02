import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isNew: false,
    isEdit: false,
    // dop:[]
};

export const dopSlice = createSlice({
    name: 'dop',
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

export const {setIsNew, setIsEdit} = dopSlice.actions;

export default dopSlice.reducer;
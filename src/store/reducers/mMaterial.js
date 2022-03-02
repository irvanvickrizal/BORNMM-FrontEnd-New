import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isNew: false,
    isEdit: false,
    material: []
};

export const mMaterialSlice = createSlice({
    name: 'mMaterial',
    initialState,
    reducers: {
        setIsNew: (state, {payload}) => {
            state.isNew = payload;
        },
        setIsEdit:(state, {payload}) => {
            state.isEdit = payload;
        },
        setMaterial:(state,{payload}) =>{
            state.material = payload;
        }
        
    }
});

export const {setIsNew,setIsEdit,setMaterial} = mMaterialSlice.actions;

export default mMaterialSlice.reducer;
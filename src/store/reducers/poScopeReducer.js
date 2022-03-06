const initialState = {
    dataPOScope: [],
    isLoading: false,
};
  
// eslint-disable-next-line default-param-last
export const poScopeReducer = (state = initialState, action) => {
    switch (action.type) {
    case "GET_DATA_POSCOPE":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_DATA_POSCOPE":
        return {
            ...state,
            dataPOScope:action.payload,
            isLoading: false,
        };
  
    default:
        return state;
    }
};
  
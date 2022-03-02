const initialState = {
    dataScope: [],
    isLoading: false,
};
  
// eslint-disable-next-line default-param-last
export const scopeReducer = (state = initialState, action) => {
    switch (action.type) {
    case "GET_DATA_SCOPE":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_DATA_SCOPE":
        return {
            ...state,
            dataScope:action.payload,
            isLoading: false,
        };
  
    default:
        return state;
    }
};
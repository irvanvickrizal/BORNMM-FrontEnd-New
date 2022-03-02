const initialState = {
    dataDop: [],
    isLoading: false,
};
  
// eslint-disable-next-line default-param-last
export const dopReducer = (state = initialState, action) => {
    switch (action.type) {
    case "GET_DATA_DOP":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_DATA_DOP":
        return {
            ...state,
            dataDop:action.payload,
            isLoading: false,
        };
  
    default:
        return state;
    }
};
  
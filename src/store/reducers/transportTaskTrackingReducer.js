const initialState = {
    dataLonglat: [],
    isLoading: false,
};
  
// eslint-disable-next-line default-param-last
export const transportTaskTrackingReducer = (state = initialState, action) => {
    switch (action.type) {
    case "GET_DATA_LONGLAT":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_DATA_LONGLAT":
        return {
            ...state,
            dataLonglat:action.payload,
            isLoading: false,
        };
  
    default:
        return state;
    }
};
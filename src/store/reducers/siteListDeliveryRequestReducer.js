const initialState = {
    data: [],
    isLoading: false,
    wpId:''
};
  
// eslint-disable-next-line default-param-last
export const siteListDeliveryRequestReducer = (state = initialState, action) => {
    switch (action.type) {
    case "GET_DATA_SITE_LIST":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_DATA_SITE_LIST":
        return {
            ...state,
            data:action.payload,
            isLoading: false,
        };

    case "GET_WP_ID":
        return {
            ...state,
            wpId:action.payload,
            isLoading: false,
        };
      
    default:
        return state;
    }
};
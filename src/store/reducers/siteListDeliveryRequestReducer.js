const initialState = {
    data: [],
    dataOrderRejection:[],
    isLoading: false,
    wpId:'',
    odi:"",
    orderList:[],
    orderTypeId:''
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
    case "GET_ORDER_REJECTION_PENDING":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_ORDER_REJECTION_PENDING":
        return {
            ...state,
            dataOrderRejection:action.payload,
            isLoading: false,
        };

    case "GET_WP_ID":
        return {
            ...state,
            wpId:action.payload,
            isLoading: false,
        };
      
    case "GET_ODI":
        return {
            ...state,
            odi:action.payload,
            isLoading: false,
        };
      
    case "GET_ORDER_TYPE":
        return {
            ...state,
            orderList:action.payload,
            isLoading: false,
        };
    case "GET_ORDER_TYPE_ID":
        return {
            ...state,
            orderTypeId:action.payload,
            isLoading: false,
        };
    default:
        return state;
    }
};
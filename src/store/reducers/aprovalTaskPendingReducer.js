/* eslint-disable default-param-last */
const initialState = {
    dataAprovalPending: [],
    dataOrderRequestDetail:[],
    odi:"",
    sno:"",
    isLoading: false,
    
};

export const aprovalTaskPendingReducer = (state = initialState, action) => {
    switch (action.type) {

    case "GET_APROVAL_PENDING":
        return {
            ...state,
                   
            isLoading: true,
        };
              
    case "SET_APROVAL_PENDING":
        return {
            ...state,
            dataAprovalPending:action.payload,
            isLoading: false,
        };
    
    case "GET_ORDER_REQUEST_DETAIL":
        return {
            ...state,
                   
            isLoading: true,
        };
              
    case "SET_ORDER_REQUEST_DETAIL":
        return {
            ...state,
            dataOrderRequestDetail:action.payload,
            isLoading: false,
        };
    case "GET_ODI":
        return {
            ...state,
            odi:action.payload,
            isLoading: false,
        };
    
    case "GET_SNO":
        return {
            ...state,
            sno:action.payload,
            isLoading: false,
        };
    

    

    

    default:
        return state;
    }
};
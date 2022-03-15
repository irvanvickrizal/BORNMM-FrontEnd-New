/* eslint-disable default-param-last */
const initialState = {
    dataAprovalPending: [],
    dataOrderRequestDetail:[],
    dataMaterial:[],
    dataLog:[],
    stats:[],
    statsReject:[],
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
    case "GET_MATERIAL":
        return {
            ...state,
                   
            isLoading: true,
        };
              
    case "SET_MATERIAL":
        return {
            ...state,
            dataMaterial:action.payload,
            isLoading: false,
        };
    case "GET_LOG":
        return {
            ...state,
                   
            isLoading: true,
        };
              
    case "SET_LOG":
        return {
            ...state,
            dataLog:action.payload,
            isLoading: false,
        };
    case "POST_APROVE":
        return {
            ...state,
                   
            isLoading: true,
        };
              
    case "POST_APROVE_SUCCESS":
        return {
            ...state,
            stats:action.payload,
            isLoading: false,
        };
    case "POST_REJECT":
        return {
            ...state,
                   
            isLoading: true,
        };
              
    case "POST_REJECT_SUCCESS":
        return {
            ...state,
            statsReject:action.payload,
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
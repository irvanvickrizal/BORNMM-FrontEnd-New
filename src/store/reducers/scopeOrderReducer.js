/* eslint-disable no-duplicate-case */
const initialState = {
    dataScopeOrderType: [],
    dataOrderType:[],
    isLoading: false,
    scopeOrderId:'',
    activestatus:''
    
};
  
// eslint-disable-next-line default-param-last
export const scopeOrderReducer = (state = initialState, action) => {
    switch (action.type) {
    case "GET_DATA_SCOPE_ORDER":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_DATA_SCOPE_ORDER":
        return {
            ...state,
            dataScopeOrderType:action.payload,
            isLoading: false,
        };
    case "POST_DATA_SCOPE":
        return {
            ...state,
            isLoading: true,
        };
    case "POST_DATA_SCOPE_SUCCESS":
        return {
            ...state,
            isLoading: false,
        };
        
    case "GET_SITE_ID":
        return {
            ...state,
            isLoading: false,
            siteConditionId:action.payload
        };
    case "EDIT_DATA_SCOPE":
        return {
            ...state,
            isLoading: true,
        };
    case "EDIT_DATA_SCOPE_SUCCESS":
        return {
            ...state,
            isLoading: false,
        };
    case "GET_DATA_ORDER":
        return {
            ...state,
      
            isLoading: true,
        };
    case "SET_DATA_ORDER":
        return {
            ...state,
            dataOrderType:action.payload,
            isLoading: true,
        };
    case "GET_SCOPE_ID":
        return {
            ...state,
            scopeOrderId:action.payload,
            
        };

    case "GET_ACTIVE_STATUS":
        return {
            ...state,
            activestatus:action.payload,
            
        };
    case "EDIT_SCOPE":
        return {
            ...state,
            isLoading: true,
        };
    case "EDIT_SCOPE_SUCCESS":
        return {
            ...state,
            isLoading: false,
        };
    case "GET_SCOPE_ORDER_ID":
        return {
            ...state,
            isLoading: false,
            scopeOrderId:action.payload
        };
            
        
            
  
    default:
        return state;
    }
};
/* eslint-disable no-duplicate-case */
const initialState = {
    dataSiteCondition: [],
    isLoading: false,
    siteName:'',
    isActive : '',
    siteConditionId:'',
    activestatus: '',
    id:''
};
  
// eslint-disable-next-line default-param-last
export const siteConditionReducer = (state = initialState, action) => {
    switch (action.type) {
    case "GET_DATA_SITE":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_DATA_SITE":
        return {
            ...state,
            dataSiteCondition:action.payload,
            isLoading: false,
        };
    case "POST_DATA_SITE":
        return {
            ...state,
            isLoading: true,
        };
    case "POST_DATA_SITE_SUCCESS":
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
    case "EDIT_DATA_SITE":
        return {
            ...state,
            isLoading: true,
        };
    case "EDIT_DATA_SITE_SUCCESS":
        return {
            ...state,
            isLoading: false,
        };
    case "EDIT_ACTIVATION_SITE":
        return {
            ...state,
            isLoading: true,
        };
    case "EDIT_ACTIVATION_SITE_SUCCESS":
        return {
            ...state,
            isLoading: false,
        };
    case "GET_ACTIVE_STATUS":
        return {
            ...state,
            activestatus:!action.payload,
                
        };
    case "GET_ID":
        return {
            ...state,
            id:action.payload,
                    
        };
                
            
  
    default:
        return state;
    }
};
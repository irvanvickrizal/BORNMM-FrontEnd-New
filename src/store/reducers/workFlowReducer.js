/* eslint-disable default-param-last */
const initialState = {
    dataWorkFlow: [],
    isLoading: false,
    
};

export const workFlowReducer = (state = initialState, action) => {
    switch (action.type) {
    case "GET_DATA_WORKFLOW":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_DATA_WORKFLOW":
        return {
            ...state,
            dataWorkFlow:action.payload,
            isLoading: false,
        };
    case "POST_DATA_WORKFLOW":
        return {
            ...state,
            isLoading: true,
        };
    case "POST_DATA_WORKFLOW_SUCCESS":
        return {
            ...state,
            isLoading: false,
        };
        
    case "GET_WORKFLOW_ID":
        return {
            ...state,
            isLoading: false,
            siteConditionId:action.payload
        };
    case "EDIT_DATA_WORKFLOW":
        return {
            ...state,
            isLoading: true,
        };
    case "EDIT_DATA_WORKFLOW_SUCCESS":
        return {
            ...state,
            isLoading: false,
        };
        
            
  
    default:
        return state;
    }
};
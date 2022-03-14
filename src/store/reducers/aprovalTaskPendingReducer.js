/* eslint-disable default-param-last */
const initialState = {
    dataAprovalPending: [],
  
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

    

    default:
        return state;
    }
};
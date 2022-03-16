const initialState = {
    dataPending: [],
    dataOnProgress:[],
    dataDone:[],
 
    orderTypeId:''
};
  
// eslint-disable-next-line default-param-last
export const taskAssignmentSummaryReducer = (state = initialState, action) => {
    switch (action.type) {
    case "GET_TASK_PENDING":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_TASK_PENDING":
        return {
            ...state,
            dataPending:action.payload,
            isLoading: false,
        };
    case "GET_TASK_ON_PROGRESS":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_TASK_ON_PROGRESS":
        return {
            ...state,
            dataOnProgress:action.payload,
            isLoading: false,
        };

    case "GET_TASK_DONE":
        return {
            ...state,
         
            isLoading: false,
        };
      
    case "SET_TASK_DONE":
        return {
            ...state,
            dataDone:action.payload,
            isLoading: false,
        };
      
   
    default:
        return state;
    }
};
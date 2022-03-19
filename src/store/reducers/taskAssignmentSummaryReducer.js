const initialState = {
    dataPending: [],
    dataOnProgress:[],
    dataDone:[],
    odi:'',
    lsp:'',
    pud:'',
    dataSubcon:[],
 
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
        
    case "GET_ODI":
        return {
            ...state,
            odi:action.payload,
            isLoading: false,
        };
    case "GET_LSP":
        return {
            ...state,
            lsp:action.payload,
            isLoading: false,
        };
    case "GET_PUD":
        return {
            ...state,
            pud:action.payload,
            isLoading: false,
        };
    case "GET_SUBCON":
        return {
            ...state,
           
            isLoading: true,
        };
    case "SET_SUBCON":
        return {
            ...state,
            dataSubcon:action.payload,
            isLoading: false,
        };

      
   
    default:
        return state;
    }
};
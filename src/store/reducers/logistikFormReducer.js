const initialState = {
    dataSiteInfo: [],
    dataOrderDetail:[],
    detaDeliveryList:[],
    dataDeliveryMode:[],
    dataLsp:[],
    isLoading: false,
    
};
  
// eslint-disable-next-line default-param-last
export const logistikFormReducer = (state = initialState, action) => {
    switch (action.type) {
    case "GET_DATA_SITE_INFO":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_DATA_SITE_INFO":
        return {
            ...state,
            dataSiteInfo:action.payload,
            isLoading: false,
        };

    case "GET_MATERIAL_ORDER_DETAIL":
        return {
            ...state,
           
            isLoading: false,
        };
      
    case "SET_MATERIAL_ORDER_DETAIL":
        return {
            ...state,
            dataOrderDetail:action.payload,
            isLoading: false,
        };
    case "GET_LSP":
        return {
            ...state,
               
            isLoading: false,
        };
          
    case "SET_LSP":
        return {
            ...state,
            dataLsp:action.payload,
            isLoading: false,
        };
    case "GET_DELIVERY_LIST":
        return {
            ...state,
                   
            isLoading: false,
        };
              
    case "SET_DELIVERY_LIST":
        return {
            ...state,
            detaDeliveryList:action.payload,
            isLoading: false,
        };
    case "GET_DELIVERY_MODE":
        return {
            ...state,
                       
            isLoading: false,
        };
                  
    case "SET_DELIVERY_MODE":
        return {
            ...state,
            detaDeliveryMode:action.payload,
            isLoading: false,
        };
        
    

    default:
        return state;
    }
};
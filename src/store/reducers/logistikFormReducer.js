/* eslint-disable no-duplicate-case */
const initialState = {
    dataSiteInfo: [],
    dataSiteInfoLogistik: [],
    dataOrderDetail:[],
    detaDeliveryList:[],
    dataDeliveryMode:[],
    dataLogisticPending:[],
    dataDeliveryTransport:[],
    dataLsp:[],
    idDelivery:'',
    idTaskPending:'',
    odi:'',
    odiLogistik:'',
    stats:[],
    statsDraft:[],
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
    case "GET_DATA_SITE_INFO_LOGISTIK":
        return {
            ...state,
  
            isLoading: true,
        };
    case "SET_DATA_SITE_INFO_LOGISTIK":
        return {
            ...state,
            dataSiteInfoLogistik:action.payload,
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
    case "GET_DELIVERY_TRANSPORT":
        return {
            ...state,
                   
            isLoading: false,
        };
              
    case "SET_DELIVERY_TRANSPORT":
        return {
            ...state,
            detaDeliveryTransport:action.payload,
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
            dataDeliveryMode:action.payload,
            isLoading: false,
        };
    case "POST_LOGISTIK_FORM":
        return {
            ...state,
            
            isLoading: true,
        };
        
    case "POST_LOGISTIK_FORM_SUCCESS":
        return {
            ...state,
            stats:action.payload,
            
            isLoading: false,
        };
    case "PUT_LOGISTIK_FORM":
        return {
            ...state,
            
            isLoading: true,
        };
        
    case "PUT_LOGISTIK_FORM_SUCCESS":
        return {
            ...state,
            stats:action.payload,
            
            isLoading: false,
        };
        
    case "POST_AS_DRAFT":
        return {
            ...state,
            
            isLoading: true,
        };
        
    case "POST_AS_DRAFT_SUCCESS":
        return {
            ...state,
            statsDraft:action.payload,
            isLoading: false,
        };
        
    case "GET_ID_DELIVERY":
        return {
            ...state,
            idDelivery:action.payload,
            isLoading: false,
        };
    case "GET_ODI":
        return {
            ...state,
            odi:action.payload,
            isLoading: false,
        };
    case "GET_ODI_LOGISTIK":
        return {
            ...state,
            odiLogistik:action.payload,
            isLoading: false,
        };
    case "GET_LOGISTIK_PENDING":
        return {
            ...state,
                   
            isLoading: false,
        };
              
    case "SET_LOGISTIK_PENDING":
        return {
            ...state,
            dataLogisticPending:action.payload,
            isLoading: false,
        };
    case "GET_ID_TASK_PENDING":
        return {
            ...state,
            idTaskPending:action.payload,
            isLoading: false,
        };
            
    

    default:
        return state;
    }
};
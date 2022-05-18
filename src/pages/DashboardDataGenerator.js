
const dataGraphNotCompleteHo = (LSPHOPPending,LSPTotalHOPending,Total) => {
    const datas = {
        LSP_HOPending:LSPHOPPending,
        LSP_TotalHOPending:LSPTotalHOPending,
        
    }
    
    return datas;
}


const dataGraphNotCompleteRfp = (LSPRFPPending,LSPTotalRFPPending) => {
    const datas = {
        LSP_RFPPending:LSPRFPPending,
        LSP_TotalRFPPending:LSPTotalRFPPending
    }
    
    return datas;
}
const dataGraphNotCompleteLogistic = (LogisticRevPending,ROOrderReq) => {
    const datas = {
        Logistic_RevPending:LogisticRevPending,
        RO_OrderReq:ROOrderReq
    }
    
    return datas;
}
const dataGraphNotCompletePmApproval = (PMRevPending,TotalOrderReq) => {
    const datas = {
        PM_RevPending:PMRevPending,
        Total_OrderReq:TotalOrderReq,
       
    }
    
    return datas;
}

const CreateDataGraphNotComplete = {
    dataGraphNotCompleteRfp,
    dataGraphNotCompleteHo,
    dataGraphNotCompleteLogistic,
    dataGraphNotCompletePmApproval,
  
}

export default CreateDataGraphNotComplete;
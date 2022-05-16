
const dataGraphNotCompleteHo = (LSPHOPPending,LSPTotalHOPending) => {
    const datas = {
        LSP_HOPending:LSPHOPPending,
        LSP_TotalHOPending:LSPTotalHOPending
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

const CreateDataGraphNotComplete = {
    dataGraphNotCompleteRfp,
    dataGraphNotCompleteHo,
    dataGraphNotCompleteLogistic,
  
  
}

export default CreateDataGraphNotComplete;
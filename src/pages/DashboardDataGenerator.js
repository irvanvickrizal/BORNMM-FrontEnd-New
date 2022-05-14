
const dataGraphNotCompleteHo = (LSPHOPPending,total) => {
    const datas = {
        LSP_HOPending:LSPHOPPending,
        total:total
    }
    
    return datas;
}


const dataGraphNotCompleteRfp = (LSPRFPPending,total) => {
    const datas = {
        LSP_RFPPending:LSPRFPPending,
        total:total
    }
    
    return datas;
}
const dataGraphNotCompleteLogistic = (LogisticRevPending,total) => {
    const datas = {
        Logistic_RevPending:LogisticRevPending,
        total:total
    }
    
    return datas;
}
const dataGraphNotCompleteOrderReq = (ROOrderReq,total) => {
    const datas = {
        RO_OrderReq:ROOrderReq,
        total:total
    }
    
    return datas;
}

const CreateDataGraphNotComplete = {
    dataGraphNotCompleteRfp,
    dataGraphNotCompleteHo,
    dataGraphNotCompleteLogistic,
    dataGraphNotCompleteOrderReq
  
}

export default CreateDataGraphNotComplete;
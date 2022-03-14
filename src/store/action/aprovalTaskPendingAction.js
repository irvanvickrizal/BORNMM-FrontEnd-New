

export const getAprovalPending = (payload) => {
    return {
        type: "GET_APROVAL_PENDING",
        payload,
    };
};
export const setAprovalPending = (payload) => {
    return {
        type: "SET_APROVAL_PENDING",
        payload,
    };
};
export const getOrderDetail = (payload) => {
    return {
        type: "GET_ORDER_REQUEST_DETAIL",
        payload,
    };
};
export const setOrderDetail = (payload) => {
    return {
        type: "SET_ORDER_REQUEST_DETAIL",
        payload,
    };
};
export const getOdi = (payload) => {
    return {
        type: "GET_ODI",
        payload,
    };
};
export const getSno = (payload) => {
    return {
        type: "GET_SNO",
        payload,
    };
};
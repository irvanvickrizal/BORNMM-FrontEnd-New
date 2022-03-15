

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
export const getMaterial = (payload) => {
    return {
        type: "GET_MATERIAL",
        payload,
    };
};
export const setMaterial = (payload) => {
    return {
        type: "SET_MATERIAL",
        payload,
    };
};
export const getLog = (payload) => {
    return {
        type: "GET_LOG",
        payload,
    };
};
export const setLog = (payload) => {
    return {
        type: "SET_LOG",
        payload,
    };
};
export const postAprove = (payload) => {
    return {
        type: "POST_APROVE",
        payload,
    };
};
export const postAproveSuccess = (payload) => {
    return {
        type: "POST_APROVE_SUCCESS",
        payload,
    };
};
export const postReject = (payload) => {
    return {
        type: "POST_REJECT",
        payload,
    };
};
export const postRejectSuccess = (payload) => {
    return {
        type: "POST_REJECT_SUCCESS",
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
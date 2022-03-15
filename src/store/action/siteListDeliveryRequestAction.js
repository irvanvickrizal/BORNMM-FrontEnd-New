export const getDataSiteList = (payload) => {
    return {
        type: "GET_DATA_SITE_LIST",
        payload,
    };
};

export const setDataSiteList = (payload) => {
    return {
        type: "SET_DATA_SITE_LIST",
        payload,
    };
};
  
export const getWpId = (payload) => {
    return {
        type: "SET_WP_ID",
        payload,
    };
};
export const getOdi = (payload) => {
    return {
        type: "GET_ODI",
        payload,
    };
};
export const getOrderType = (payload) => {
    return {
        type: "GET_ORDER_TYPE",
        payload,
    };
};
export const getOrderTypeId = (payload) => {
    return {
        type: "GET_ORDER_TYPE_ID",
        payload,
    };
};
export const getOrderRejectionPending = (payload) => {
    return {
        type: "GET_ORDER_REJECTION_PENDING",
        payload,
    };
};
export const setOrderRejectionPending = (payload) => {
    return {
        type: "SET_ORDER_REJECTION_PENDING",
        payload,
    };
};


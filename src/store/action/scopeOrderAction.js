export const setDataScopeOrder = (payload) => {
    return {
        type: "SET_DATA_SCOPE_ORDER",
        payload,
    };
};
export const getDataScopeOrder = (payload) => {
    return {
        type: "GET_DATA_SCOPE_ORDER",
        payload,
    };
};
  
export const postDataScope = (payload) => {
    return {
        type: "POST_DATA_SCOPE",
        payload,
    };
};
  
export const postDataScopeSuccess = (payload) => {
    return {
        type: "POST_DATA_SCOPE_SUCCESS",
        payload,
    };
};

export const getSiteId = (payload) => {
    return {
        type: "GET_SITE_ID",
        payload,
    };
};
export const editDataScope = (payload) => {
    return {
        type: "EDIT_DATA_SCOPE",
        payload,
    };
};
export const editDataScopeSuccess = (payload) => {
    return {
        type: "EDIT_DATA_SCOPE_SUCCESS",
        payload,
    };
};
export const getOrderType = (payload) => {
    return {
        type:"GET_DATA_ORDER",
        payload,
    };
};

export const setOrderType = (payload) => {
    return {
        type:"SET_DATA_ORDER",
        payload,
    };
};

export const getScopeId = (payload) => {
    return {
        type:"GET_SCOPE_ID",
        payload,
    };
};

export const getActiveStatus = (payload) => {
    return {
        type:"GET_ACTIVE_STATUS",
        payload,
    };
};
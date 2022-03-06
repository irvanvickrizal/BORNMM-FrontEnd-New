export const setDataSite = (payload) => {
    return {
        type: "SET_DATA_SITE",
        payload,
    };
};
export const getDataSite = (payload) => {
    return {
        type: "GET_DATA_SITE",
        payload,
    };
};
  
export const postDataSite = (payload) => {
    return {
        type: "POST_DATA_SITE",
        payload,
    };
};
  
export const postDataSiteSuccess = (payload) => {
    return {
        type: "POST_DATA_SITE_SUCCESS",
        payload,
    };
};

export const getSiteId = (payload) => {
    return {
        type: "GET_SITE_ID",
        payload,
    };
};
export const editDataSite = (payload) => {
    return {
        type: "EDIT_DATA_SITE",
        payload,
    };
};
export const editDataSiteSuccess = (payload) => {
    return {
        type: "EDIT_DATA_SITE_SUCCESS",
        payload,
    };
};
  
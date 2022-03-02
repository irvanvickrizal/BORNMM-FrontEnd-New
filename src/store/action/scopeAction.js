export const setDataScope = (payload) => {
    return {
        type: "SET_DATA_SCOPE",
        payload,
    };
};
export const getDataScope = (payload) => {
    return {
        type: "GET_DATA_SCOPE",
        payload,
    };
};
  
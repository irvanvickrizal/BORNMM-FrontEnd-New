

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
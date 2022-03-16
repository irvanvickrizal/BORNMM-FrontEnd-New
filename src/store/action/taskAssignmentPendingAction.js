export const getDataPending = (payload) => {
    return {
        type: "GET_TASK_PENDING",
        payload,
    };
};

export const setDataPending = (payload) => {
    return {
        type: "SET_TASK_PENDING",
        payload,
    };
};
  
export const getDataOnProgress = (payload) => {
    return {
        type: "GET_TASK_ON_PROGRESS",
        payload,
    };
};
export const setDataOnProgress = (payload) => {
    return {
        type: "SET_TASK_ON_PROGRESS",
        payload,
    };
};
export const getDataDone = (payload) => {
    return {
        type: "GET_TASK_DONE",
        payload,
    };
};
export const setDataDone = (payload) => {
    return {
        type: "SET_TASK_DONE",
        payload,
    };
};




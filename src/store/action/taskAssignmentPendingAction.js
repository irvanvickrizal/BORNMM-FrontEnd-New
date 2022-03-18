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
export const getOdi = (payload) => {
    return {
        type: "GET_ODI",
        payload,
    };
};
export const getLsp = (payload) => {
    return {
        type: "GET_LSP",
        payload,
    };
};
export const getPud = (payload) => {
    return {
        type: "GET_PUD",
        payload,
    };
};
export const getSubcon = (payload) => {
    return {
        type: "GET_SUBCON",
        payload,
    };
};
export const setSubcon = (payload) => {
    return {
        type: "SET_SUBCON",
        payload,
    };
};





export const setDataWorkFlow = (payload) => {
    return {
        type: "SET_DATA_WORKFLOW",
        payload,
    };
};
export const getDataWorkFlow = (payload) => {
    return {
        type: "GET_DATA_WORKFLOW",
        payload,
    };
};
  
export const postDataWorkFlow = (payload) => {
    return {
        type: "POST_DATA_WORKFLOW",
        payload,
    };
};
  
export const postDataWorkFlowSuccess = (payload) => {
    return {
        type: "POST_DATA_WORKFLOWE_SUCCESS",
        payload,
    };
};

export const getWorkFlowId = (payload) => {
    return {
        type: "GET_WORKFLOW_ID",
        payload,
    };
};
export const editDataWorkFlow = (payload) => {
    return {
        type: "EDIT_DATA_WORKFLOW",
        payload,
    };
};
export const editDataWorkFlowSuccess = (payload) => {
    return {
        type: "EDIT_DATA_WORKFLOW_SUCCESS",
        payload,
    };
};
  
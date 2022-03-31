import axios from "axios";

import { put, takeLatest, select } from "redux-saga/effects";
import { API } from "@app/Variables";

import { setDataDone, setDataOnProgress, setDataPending,setSubcon } from "@app/store/action/taskAssignmentPendingAction";
//action


function* sagaGetTaskPending(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}taskassignment/taskAssignmentSubconPending`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result")
        yield put (setDataPending(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetTaskOnProgress(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}taskassignment/taskAssignmentSubconOnProgress`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result")
        yield put (setDataOnProgress(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetTaskDone(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}taskassignment/taskAssignmentSubconDone`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setDataDone(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaSubcon(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}subcon/getFieldSubcontractorEngineer/{subconid}/{workpackageid}
        `,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setSubcon(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}

export function* SagaTaskAssignmentSummaryWorker() {
    yield takeLatest("GET_TASK_PENDING", sagaGetTaskPending);
    yield takeLatest("GET_TASK_ON_PROGRESS", sagaGetTaskOnProgress);
    yield takeLatest("GET_TASK_DONE", sagaGetTaskDone);
    yield takeLatest("GET_SUBCON", sagaSubcon);

    
}

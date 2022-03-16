import axios from "axios";

import { put, takeLatest, select } from "redux-saga/effects";


import { setDataDone, setDataOnProgress, setDataPending } from "@app/store/action/taskAssignmentPendingAction";
//action


function* sagaGetTaskPending(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/taskassignment/taskAssignmentSubconPending`,{headers: {
            Authorization: `Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9oYW1tYWQgQXprYSIsImVtYWlsIjoibWF6a2FyMjdAZ21haWwuY29tIiwicHJvdmlkZXIiOiJCb3JuIHdlYiIsImlkIjoiZWZhYzllNDAtZjcxYS00ZmM3LWE3OTktZDM5NzcwYTAxYTBiIiwidWlkIjozNDIxLCJleHAiOjE2NDk5NjU0NjQsImlzTW9iaWxlIjpmYWxzZSwiaW5zdGFsbGF0aW9uSWQiOiIiLCJyb2xlQ29kZSI6IlNQIiwicm9sZUlkIjoxNjMsInVzZXJUeXBlIjoiUyJ9.x-xipW8e_fY2JkLQ8b1DMkoI8ZwYIDRm-AzytXDCgTevUC6M5sVgt8B85LGPWobfowJxj7WKUzRrLqc2zJxOrQ` 
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
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/taskassignment/taskAssignmentSubconOnProgress`,{headers: {
            Authorization: `Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9oYW1tYWQgQXprYSIsImVtYWlsIjoibWF6a2FyMjdAZ21haWwuY29tIiwicHJvdmlkZXIiOiJCb3JuIHdlYiIsImlkIjoiZWZhYzllNDAtZjcxYS00ZmM3LWE3OTktZDM5NzcwYTAxYTBiIiwidWlkIjozNDIxLCJleHAiOjE2NDk5NjU0NjQsImlzTW9iaWxlIjpmYWxzZSwiaW5zdGFsbGF0aW9uSWQiOiIiLCJyb2xlQ29kZSI6IlNQIiwicm9sZUlkIjoxNjMsInVzZXJUeXBlIjoiUyJ9.x-xipW8e_fY2JkLQ8b1DMkoI8ZwYIDRm-AzytXDCgTevUC6M5sVgt8B85LGPWobfowJxj7WKUzRrLqc2zJxOrQ` 
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
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/taskassignment/taskAssignmentSubconDone`,{headers: {
            Authorization: `Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTW9oYW1tYWQgQXprYSIsImVtYWlsIjoibWF6a2FyMjdAZ21haWwuY29tIiwicHJvdmlkZXIiOiJCb3JuIHdlYiIsImlkIjoiZWZhYzllNDAtZjcxYS00ZmM3LWE3OTktZDM5NzcwYTAxYTBiIiwidWlkIjozNDIxLCJleHAiOjE2NDk5NjU0NjQsImlzTW9iaWxlIjpmYWxzZSwiaW5zdGFsbGF0aW9uSWQiOiIiLCJyb2xlQ29kZSI6IlNQIiwicm9sZUlkIjoxNjMsInVzZXJUeXBlIjoiUyJ9.x-xipW8e_fY2JkLQ8b1DMkoI8ZwYIDRm-AzytXDCgTevUC6M5sVgt8B85LGPWobfowJxj7WKUzRrLqc2zJxOrQ` 
        }});
        console.log(res,"result get site condition")
        yield put (setDataDone(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}

export function* SagaTaskAssignmentSummaryWorker() {
    yield takeLatest("GET_TASK_PENDING", sagaGetTaskPending);
    yield takeLatest("GET_TASK_ON_PROGRESS", sagaGetTaskOnProgress);
    yield takeLatest("GET_TASK_DONE", sagaGetTaskDone);

    
}

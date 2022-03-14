import axios from "axios";
import { API } from "@app/Variables";
import {Alert} from 'antd'
import { put, takeLatest, select } from "redux-saga/effects";


//action
import {setAprovalPending} from '../action/aprovalTaskPendingAction'

function* sagaGetAprovalTaskPending(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/wftransaction/orderRequestGetApprovalPendingList`,{headers: {
            Authorization: `Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV2lkeWFrYSBQYW1iYWplbmciLCJlbWFpbCI6IndpZHlha2EucGFtYmFqZW5nQG5va2lhLmNvbSIsInByb3ZpZGVyIjoiQm9ybiB3ZWIiLCJpZCI6IjUwNmQ4NTU2LWVmM2MtNDY4Ny04MTI4LWEwZWNlYzE2ZjRhZiIsInVpZCI6MzgxNiwiZXhwIjoxNjQ5NzU1OTU2LCJpc01vYmlsZSI6ZmFsc2UsImluc3RhbGxhdGlvbklkIjoiIiwicm9sZUNvZGUiOiJBRiIsInJvbGVJZCI6MTg2LCJ1c2VyVHlwZSI6Ik4ifQ.A_db8HHaNikh9p9dakmN8_W4RZ1JIGYoZ7Bt1LzAaeb0aSMH89fbPCG7NRuIMZF8QjgGIe_L2539ZWt_kFAN6g` 
        }});
        console.log(res,"result get site condition")
        yield put (setAprovalPending(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}

export function* SagaAprovalTaskPendingWorker() {
    yield takeLatest("GET_APROVAL_PENDING", sagaGetAprovalTaskPending);

    
    
    
}
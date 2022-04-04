import axios from "axios";
import { variables } from "@app/Variables";

import { put, takeLatest, select } from "redux-saga/effects";
import {setDataScope} from '../action/scopeAction'
//action

const API = variables.API_URL;
function* sagaGetDataScope(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}/poscope`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get scope")
        yield put (setDataScope(res.data))
    } catch (error) {
        console.log(error,'error get data scope')
    }
}

export function* SagaScopeWorker() {
    yield takeLatest("GET_DATA_SCOPE", sagaGetDataScope);
}

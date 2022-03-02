import axios from "axios";
import { API } from "@app/Variables";

import { put, takeLatest, select } from "redux-saga/effects";
import {setDataScope} from '../action/scopeAction'
//action


function* sagaGetDataScope(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/poscope`,{headers: {
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

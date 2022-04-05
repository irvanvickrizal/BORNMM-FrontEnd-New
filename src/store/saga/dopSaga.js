import axios from "axios";
import { variables } from "@app/Variables";

import { put, takeLatest, select } from "redux-saga/effects";
import { setDataDop } from "@app/store/action/dopAction";
//action
const API = variables.API_URL;

function* sagaGetDataDop(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}masterdop`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res.data, "result get data");
        yield put (setDataDop(res.data))
    } catch (error) {
        console.log(error, "eroor get data dop");
    }
}

export function* SagaDopWorker() {
    yield takeLatest("GET_DATA_DOP", sagaGetDataDop);
}

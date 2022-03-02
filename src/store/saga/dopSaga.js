import axios from "axios";
import { API } from "@app/Variables";

import { put, takeLatest, select } from "redux-saga/effects";
import { setDataDop } from "@app/store/action/dopAction";
//action


function* sagaGetDataDop(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/masterdop`,{headers: {
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

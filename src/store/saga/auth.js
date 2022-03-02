import axios from "axios";

import { put, takeLatest, select } from "redux-saga/effects";
//action


function* sagaGetData(action) {
    try {
        const res = yield axios.get("https://jsonplaceholder.typicode.com/posts/1/comments");
        console.log(res, "result get data");

    } catch (error) {
        console.log(error, "eroor get data");
    }
}

export function* SagaAuthWorker() {
    yield takeLatest("GET_DATA", sagaGetData);
}

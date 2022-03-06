import axios from "axios";
import { variables } from "@app/Variables";

import { put, takeLatest, select } from "redux-saga/effects";
import {setDataScope} from '../action/scopeAction'
//action


const baseURL = variables.API_URL;
const token = localStorage.getItem('token'); 

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const headers = { 
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${token}`
};

const GET = (path)  => {
    const res = axios.get(`${baseURL}${path}`
        ,config
    );
    return res.data;
}

function* sagaGetDataScope(action) {
    try {
        const data = GET("getdata");
        yield put (setDataScope(data))
    } catch (error) {
        console.log(error,'error get data scope')
    }
}

export function* SagaScopeWorker() {
    yield takeLatest("GET_DATA_SCOPE", sagaGetDataScope);
}

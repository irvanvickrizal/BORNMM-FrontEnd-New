import axios from "axios";
import { API } from "@app/Variables";
import {Alert} from 'antd'
import { put, takeLatest, select } from "redux-saga/effects";
import {setDataSite,getDataSite,postDataSite,postDataSiteSuccess,editDataSiteSuccess,editActivationSiteSuccess} from '../action/siteConditionAction'
//action


function* sagaGetDataSite(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}sitecondition`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setDataSite(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}

function* sagaPostDataSite(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.post(`${API}sitecondition`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result psot site condition")
        yield put (postDataSiteSuccess())
        yield put(getDataSite())
    } catch (error) {
        console.log(error,'error post data site condition')
    }
}
function* sagaPutDataSite(action) {
    const token = yield select(state=>state.auth.token)
    
    try {
        const res = yield axios.put(`${API}sitecondition`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result edit site condition")
        yield put (editDataSiteSuccess())
        yield put(getDataSite())
    } catch (error) {
        console.log(error,'error post data site condition')
    }
}
function* sagaPutActivationSite(action) {
    const token = yield select(state=>state.auth.token)
    
    try {
        const res = yield axios.put(`${API}sitecondition/setactivationstatus`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result edit site condition")
        yield put (editActivationSiteSuccess())
        yield put(getDataSite())
    } catch (error) {
        console.log(error,'error post data site condition')
    }
}



export function* SagaSiteConditionWorker() {
    yield takeLatest("GET_DATA_SITE", sagaGetDataSite);
    yield takeLatest("POST_DATA_SITE",sagaPostDataSite)
    yield takeLatest("EDIT_DATA_SITE",sagaPutDataSite)
    yield takeLatest("EDIT_ACTIVATION_SITE",sagaPutActivationSite)
}

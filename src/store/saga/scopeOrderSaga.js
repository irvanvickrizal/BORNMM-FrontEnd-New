import axios from "axios";
import { variables } from "@app/Variables";
import {Alert} from 'antd'
import { put, takeLatest, select } from "redux-saga/effects";
import {setDataSite,getDataSite,postDataSite,postDataSiteSuccess,editDataSiteSuccess} from '../action/siteConditionAction'

import { editDataScopeSuccess, getDataScopeOrder, postDataScope, postDataScopeSuccess, setDataScopeOrder,setOrderType } from "@app/store/action/scopeOrderAction";
//action

const API = variables.API_URL;
function* sagaGetScopeOrder(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}masterscopeordertype`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setDataScopeOrder(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}

function* sagaPostScopeOrderType(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.post(`${API}masterscopeordertype`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` ,
                'Content-Type': 'application/json'
            }});
        console.log(res,"result psot site condition")
        yield put (postDataScopeSuccess())
        yield put(getDataScopeOrder())
    } catch (error) {
        console.log(error,'error post data site condition')
    }
}
function* sagaPutScopetype(action) {
    const token = yield select(state=>state.auth.token)
    
    try {
        const res = yield axios.put(`${API}masterscopeordertype/SetActivationStatus`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result edit site condition")
        yield put (editDataScopeSuccess())
        yield put(getDataScopeOrder())
    } catch (error) {
        console.log(error,'error post data site condition')
    }
}

function* sagaGetOrder(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}masterordertype`,{headers: {
            Authorization: `Bearer ${token}` ,
            
        }});
        console.log(res,"result get order")
        yield put (setOrderType(res.data))
    } catch (error) {
        console.log(error,'error get order')
    }
}

function* sagaPutDataScopetype(action) {
    const token = yield select(state=>state.auth.token)
    
    try {
        const res = yield axios.put(`${API}masterscopeordertype`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result edit site condition")
        yield put (editDataScopeSuccess())
        yield put(getDataScopeOrder())
    } catch (error) {
        console.log(error,'error post data site condition')
    }
}

export function* SagaScopeOrderWorker() {
    yield takeLatest("GET_DATA_SCOPE_ORDER", sagaGetScopeOrder);
    yield takeLatest("GET_DATA_ORDER", sagaGetOrder);
    yield takeLatest("POST_DATA_SCOPE",sagaPostScopeOrderType)   
    yield takeLatest("EDIT_DATA_SCOPE",sagaPutScopetype) 
    yield takeLatest("EDIT_SCOPE",sagaPutDataScopetype) 
    
}

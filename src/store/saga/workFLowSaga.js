import axios from "axios";
import { variables } from "@app/Variables";
import {Alert} from 'antd'
import { put, takeLatest, select } from "redux-saga/effects";
import {setDataSite,getDataSite,postDataSite,postDataSiteSuccess,editDataSiteSuccess} from '../action/siteConditionAction'
import { setDataWorkFlow,postDataWorkFlow, getDataWorkFlow,postDataWorkFlowSuccess, editDataWorkFlowSuccess } from "@app/store/action/workFlowAction";
//action

const API = variables.API_URL;
function* sagaGetDataWorkFlow(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}workflow`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setDataWorkFlow(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}

function* sagaPostDataWorkFLow(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.post(`${API}workflow`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result psot workflow")
        yield put (postDataWorkFlowSuccess())
        yield put(getDataWorkFlow())
    } catch (error) {
        console.log(error,'error post data workflow')
    }
}
function* sagaPutDataWorkFlow(action) {
    const token = yield select(state=>state.auth.token)
    
    try {
        const res = yield axios.put(`${API}workflow`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result edit site condition")
        yield put (editDataWorkFlowSuccess())
        yield put(getDataWorkFlow())
    } catch (error) {
        console.log(error,'error post data site condition')
    }
}

export function* SagaWorFlowWorker() {
    yield takeLatest("GET_DATA_WORKFLOW", sagaGetDataWorkFlow);
    yield takeLatest("POST_DATA_WORKFLOW",sagaPostDataWorkFLow)
    yield takeLatest("EDIT_DATA_WORKFLOW",sagaPutDataWorkFlow)
}

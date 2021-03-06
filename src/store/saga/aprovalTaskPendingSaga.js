import axios from "axios";

import { variables } from "@app/Variables";

import {Alert} from 'antd'
import { put, takeLatest, select } from "redux-saga/effects";
import { toast } from 'react-toastify';


//action
import {setAprovalPending,setOrderDetail,setMaterial,setLog,postAproveSuccess,getOrderDetail,postRejectSuccess} from '../action/aprovalTaskPendingAction'

const API = variables.API_URL;

function* sagaGetAprovalTaskPending(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}wftransaction/orderRequestGetApprovalPendingList`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setAprovalPending(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetOrderRequesDetail(action) {
    const token = yield select(state=>state.auth.token)
    const dataOdi = yield select(state=>state.aprovalTaskPendingReducer.odi)
    try {
        const res = yield axios.get(`${API}materialmanagement/OrderDetailRequestGetDetail/${dataOdi}`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setOrderDetail(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetMaterial(action) {
    const token = yield select(state=>state.auth.token)
    const dataOdi = yield select(state=>state.aprovalTaskPendingReducer.odi)
    try {
        const res = yield axios.get(`${API}materialmanagement/orderRequestMaterialGetDetailBasedOnOrderRequest/${dataOdi}`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setMaterial(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetLog(action) {
    const token = yield select(state=>state.auth.token)
    const dataOdi = yield select(state=>state.aprovalTaskPendingReducer.odi)
    try {
        const res = yield axios.get(`${API}audittrail/auditTrailOrderRequestGetList/${dataOdi}`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setLog(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}

function* sagaPostAproval(action) {
    const token = yield select(state=>state.auth.token)
    const dataOdi = yield select(state=>state.aprovalTaskPendingReducer.odi)
    try {
        const res = yield axios.post(`${API}wftransaction/orderRequestApprove`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result get site condition")
        yield put (postAproveSuccess(res.data))
        yield put (getOrderDetail())
        yield toast.success("Order request approved successfully");
    } catch (error) {
        console.log(error,'error get data site condition')
        yield toast.error("error");
    }
}
function* sagaPostReject(action) {
    const token = yield select(state=>state.auth.token)
    const dataOdi = yield select(state=>state.aprovalTaskPendingReducer.odi)
    try {
        const res = yield axios.post(`${API}wftransaction/orderRequestReject`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result get site condition")
        yield put (postRejectSuccess(res.data))
        yield put (getOrderDetail())
        yield toast.success("Order request rejected successfully");
    } catch (error) {
        console.log(error,'error get data site condition')
        yield toast.error("error");
    }
}

export function* SagaAprovalTaskPendingWorker() {
    yield takeLatest("GET_APROVAL_PENDING", sagaGetAprovalTaskPending);
    yield takeLatest("GET_ORDER_REQUEST_DETAIL", sagaGetOrderRequesDetail);
    yield takeLatest("GET_MATERIAL", sagaGetMaterial);
    yield takeLatest("GET_LOG", sagaGetLog);
    yield takeLatest("POST_APROVE", sagaPostAproval);
    yield takeLatest("POST_REJECT", sagaPostReject);

    
    
    
}
import axios from "axios";
import { API } from "@app/Variables";
import {Alert} from 'antd'
import { put, takeLatest, select } from "redux-saga/effects";

import {setDataSiteInfo,setMaterialOrderDetail,setLsp,setDeliveryList,setDeliveryMode} from "../action/logistikFormAction"
//action


function* sagaGetSiteInfo(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/materialmanagement/OrderDetailRequestGetDetail/13`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setDataSiteInfo(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetMaterialOrder(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/materialmanagement/orderRequestMaterialGetDetailBasedOnOrderRequest/13`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setMaterialOrderDetail(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetLsp(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/subcon/GetLSP`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setLsp(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetDeliveryList(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/cdmr/getListIncludeTransportMode`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setDeliveryList(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetDeliveryMode(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/deliveryMode/getListBasedonOrderRequest/13`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setDeliveryMode(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}



export function* SagaLogistikFormWorker() {
    yield takeLatest("GET_DATA_SITE_INFO", sagaGetSiteInfo);
    yield takeLatest("GET_MATERIAL_ORDER_DETAIL", sagaGetMaterialOrder);
    yield takeLatest("GET_LSP", sagaGetLsp);
    yield takeLatest("GET_DELIVERY_LIST", sagaGetDeliveryList);
    yield takeLatest("GET_DELIVERY_MODE", sagaGetDeliveryMode);
    
    
    
}

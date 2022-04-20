import axios from "axios";
import { variables } from "@app/Variables";
import { put, takeLatest, select,call } from "redux-saga/effects";
import { toast } from 'react-toastify';

import {putLogistikFormSuccess,setDataSiteInfoLogistik,getLogisticPending,postAsDraftSuccess,setDeliveryTransport,setDataSiteInfo,setMaterialOrderDetail,setLsp,setDeliveryList,setDeliveryMode,postLogistikFormSuccess,setLogistikPending} from "../action/logistikFormAction"


const API = variables.API_URL;

function* sagaGetSiteInfo(action) {
    const token = yield select(state=>state.auth.token)
    const dataOdi = yield select(state=>state.logistikFormReducer.odi)
    try {
        const res = yield axios.get(`${API}materialmanagement/OrderDetailRequestGetDetail/${dataOdi}`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setDataSiteInfo(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetSiteInfoLogistik(action) {
    const token = yield select(state=>state.auth.token)
    const dataOdi = yield select(state=>state.logistikFormReducer.odi)
    const dataOdiLogistik = yield select(state=>state.logistikFormReducer.odiLogistik)
    try {
        const res = yield axios.get(`${API}materialmanagement/orderRequestLogisticGetDetail/${dataOdiLogistik}`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get Logistik Info")
        yield put (setDataSiteInfoLogistik(res.data))
    } catch (error) {
        console.log(error,'error get logistik info')
    }
}
function* sagaGetMaterialOrder(action) {
    const token = yield select(state=>state.auth.token)
    const dataOdi = yield select(state=>state.logistikFormReducer.odi)
    const parentOrderDetailId = yield select(
        (state) => state.logistikFormReducer.dataSiteInfo[0].parentOrderDetailId
    )
    try {

        if(parentOrderDetailId>0)
        {
            const res = yield axios.get(`${API}materialmanagement/orderRequestMaterialGetDetailBasedOnOrderRequest/${parentOrderDetailId}`,{headers: {
                Authorization: `Bearer ${token}` 
            }});
            console.log(res,"result get site condition")
            yield put (setMaterialOrderDetail(res.data))
        }
        else{
            const res = yield axios.get(`${API}materialmanagement/orderRequestMaterialGetDetailBasedOnOrderRequest/${dataOdi}`,{headers: {
                Authorization: `Bearer ${token}` 
            }});
            console.log(res,"result get site condition")
            yield put (setMaterialOrderDetail(res.data))
        }

        // const res = yield axios.get(`${API}materialmanagement/orderRequestMaterialGetDetailBasedOnOrderRequest/${dataOdi}`,{headers: {
        //     Authorization: `Bearer ${token}` 
        // }});
        // console.log(res,"result get site condition")
        // yield put (setMaterialOrderDetail(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetLsp(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}subcon/GetLSP`,{headers: {
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
        const res = yield axios.get(`${API}cdmr/getListIncludeTransportMode`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setDeliveryList(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetDeliveryTransport(action) {
    const token = yield select(state=>state.auth.token)
    const deliveryId = yield select(state=>state.logistikFormReducer.idDelivery)
    try {
        const res = yield axios.get(`${API}cdmr/getTransportModeBasedOnCDMR/${deliveryId}`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get transport")
        yield put (setDeliveryTransport(res.data))
       
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetDeliveryMode(action) {
    const token = yield select(state=>state.auth.token)
    const dataOdi = yield select(state=>state.logistikFormReducer.odi)
    try {
        const res = yield axios.get(`${API}deliveryMode/getListBasedonOrderRequest/${dataOdi}`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get selivery mode")
        yield put (setDeliveryMode(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaPostLogistikForm(action) {
    const token = yield select(state=>state.auth.token)
    const message = yield select(state=>state.logistikFormReducer.stats.data.message)
   
    try {
        const res = yield axios.post(`${API}materialmanagement/orderRequestDetailFormLogisticSubmit`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result get site condition")
        yield put (postLogistikFormSuccess(res))
        yield toast.success(message);
        yield put (getLogisticPending())
        return res
        
    } catch (error) {
        console.log(error,'error put')
        yield toast.error(message);
        return "error"
       
    }
}
function* sagaPutLogistikForm(action) {
    const token = yield select(state=>state.auth.token)
    const message = yield select(state=>state.logistikFormReducer.stats.data.message)
   
    try {
        const res = yield axios.put(`${API}materialmanagement/orderRequestDetailFormLogisticUpdate`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result get site condition")
        yield put (putLogistikFormSuccess(res))
        yield toast.success(message);
        yield put (getLogisticPending())
        return res
        
    } catch (error) {

        console.log(error,'error get data site condition')
        yield toast.error("error");
        return "error"
       
    }
}
function* sagaPostAsDraft(action) {
    const token = yield select(state=>state.auth.token)
    const message = yield select(state=>state.logistikFormReducer.stats.data.message)
    try {
        const res = yield axios.post(`${API}materialmanagement/orderRequestDetailFormLogisticSubmit`,action.payload
            ,{headers: {
                Authorization: `Bearer ${token}` 
            }});
        console.log(res,"result get site condition")
        yield put (postAsDraftSuccess(res))
        yield put (getLogisticPending())
        yield toast.success(message);
    } catch (error) {
        yield toast.error(message);
        console.log(error,'error get data site condition')
    }
}
function* sagaGetLogistikPending(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}materialmanagement/orderRequestLogisticAssignmentPending`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setLogistikPending(res.data))
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
    yield takeLatest("POST_LOGISTIK_FORM", sagaPostLogistikForm);
    yield takeLatest("POST_AS_DRAFT", sagaPostAsDraft);
    yield takeLatest("GET_LOGISTIK_PENDING", sagaGetLogistikPending);
    yield takeLatest("GET_DELIVERY_TRANSPORT", sagaGetDeliveryTransport);
    yield takeLatest("GET_DATA_SITE_INFO_LOGISTIK", sagaGetSiteInfoLogistik);
    yield takeLatest("PUT_LOGISTIK_FORM", sagaPutLogistikForm);
    
    
    
}

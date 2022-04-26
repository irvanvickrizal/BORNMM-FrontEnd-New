import axios from "axios";
import { variables } from "@app/Variables";
import {Alert} from 'antd'
import { put, takeLatest, select } from "redux-saga/effects";
import {useDispatch, useSelector} from 'react-redux';
import { setDataSiteList,setOrderRejectionPending } from "@app/store/action/siteListDeliveryRequestAction";
//action

const API = variables.API_URL;
function* sagaGetSiteList(action) {
    const user = yield select((state) => state.auth.user);
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}sitelist/SitelistRequireDeliveryReq/${user.uid}`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setDataSiteList(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}
function* sagaGetOrderRejectionPending(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`${API}wftransaction/orderRequestGetRejectionPendingList`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setOrderRejectionPending(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}

export function* SagaSiteListDeliveryWorker() {
    yield takeLatest("GET_DATA_SITE_LIST", sagaGetSiteList);
    yield takeLatest("GET_ORDER_REJECTION_PENDING", sagaGetOrderRejectionPending);

    
}

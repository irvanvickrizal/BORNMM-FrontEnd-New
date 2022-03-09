import axios from "axios";
import { API } from "@app/Variables";
import {Alert} from 'antd'
import { put, takeLatest, select } from "redux-saga/effects";

import { setDataSiteList } from "@app/store/action/siteListDeliveryRequestAction";
//action


function* sagaGetSiteList(action) {
    const token = yield select(state=>state.auth.token)
    try {
        const res = yield axios.get(`https://bornxldemo-api.nsnebast.com/sitelist/SitelistRequireDeliveryReq`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get site condition")
        yield put (setDataSiteList(res.data))
    } catch (error) {
        console.log(error,'error get data site condition')
    }
}

export function* SagaSiteListDeliveryWorker() {
    yield takeLatest("GET_DATA_SITE_LIST", sagaGetSiteList);

    
}

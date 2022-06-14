import axios from "axios";
import { variables } from "@app/Variables";
import { put, takeLatest, select,call } from "redux-saga/effects";
import { toast } from 'react-toastify';
import { setDataLongLat } from "@app/store/action/transportTaskTrackingAction";




const API = variables.API_URL;

function* sagaGetLongLat(odi) {
    const token = yield select(state=>state.auth.token)
    console.log(odi,"<= odi")
    try {
        const res = yield axios.get(`${API}lspassignment/getCurrentVehicleLocation/${odi.payload}`,{headers: {
            Authorization: `Bearer ${token}` 
        }});
        console.log(res,"result get Longlat")
        yield put (setDataLongLat(res.data))
    } catch (error) {
        console.log(error,'error get Longlat')
        console.log(odi,"<= odi")
    }
}


export function* SagaTransportTaskTrackingWorker() {
    yield takeLatest("GET_DATA_LONGLAT", sagaGetLongLat);
    
    
    
    
}

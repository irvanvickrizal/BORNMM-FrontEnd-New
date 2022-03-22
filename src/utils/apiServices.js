/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {variables} from '../Variables';
import { toast } from 'react-toastify';

import {useDispatch,useSelector} from 'react-redux';

import {setIsLoading} from '@store/reducers/ui';
import stores from '@store/stores';

// const tokens = useSelector((state) => state.aurh.cardHeader);
const baseURL = variables.API_URL;
const tokenGlobal = localStorage.getItem('token'); 
// const token = stores.getState().auth.token;
const config = {
    headers: { Authorization: `Bearer ${tokenGlobal}` },
};


const headers = { 
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${tokenGlobal}`
};

const headersfile ={
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${tokenGlobal}`

}

//auth api
const Login = (path) => (data) => {

    const promise = new Promise((resolve, reject) => {
        axios.get(`${baseURL}${path}`, {
            auth:{
                username : data.username,
                password : data.password
            }
        })
            .then((result)=> {
                //console.log('i am api :',result);
                resolve(result);
            },(err)=>{
                //console.log('i am api error:',err,'data :', data);
                reject(err);
            })
    })
    return promise;
}

//common api with token
const GET = (path)  => {
    const promise = new Promise((resolve, reject) => {
        const token = localStorage.getItem('token'); 
        axios.get(`${baseURL}${path}`
            ,{headers: { Authorization: `Bearer ${token}` }},
        )
            .then((result)=> {
                console.log('i am get :',result.data);
                resolve(result.data);
            },(err)=>{
                console.log("err",err);
                reject(err);
            })
    })
    return promise;
}

const GETParam = (path,id)  => {
    const promise = new Promise((resolve, reject) => {
        const token = localStorage.getItem('token'); 
        axios.get(`${baseURL}${path}/${id}`
            ,{headers: { Authorization: `Bearer ${token}` }},
        )
            .then((result)=> {
                console.log('i am get :',result.data);
                resolve(result.data);
            },(err)=>{
                console.log("error get",err);
                reject(err);
            })
    })
    return promise;
}

const GetMenu = (path,id,tokens)  => {

    const promise = new Promise((resolve, reject) => {
        axios.get(`${baseURL}${path}/${id}`
            ,{headers: { Authorization: `Bearer ${tokens}` }},
        )
            .then((result)=> {
                console.log('i am get :',result.data);
                resolve(result.data);
            },(err)=>{
                console.log("error get",err);
                reject(err);
            })
    })
    return promise;
}

const GETParam2 = (path,param1,param2)  => {
    const promise = new Promise((resolve, reject) => {
        const token = localStorage.getItem('token'); 
        axios.get(`${baseURL}${path}/${param1}/${param2}`
            ,{headers: { Authorization: `Bearer ${token}` }},
        )
            .then((result)=> {
                console.log('i am get :',result.data);
                resolve(result.data);
            },(err)=>{
                console.log(err);
                reject(err);
            })
    })
    return promise;
}

const POST = (path,body)  => {
    const promise = new Promise((resolve, reject) => {
        axios.post(`${baseURL}${path}`
            ,body
            ,{headers}
        ).then((result)=> {
            console.log('i am post :',result.data);
            resolve(result.data);
        },(err)=>{
            console.log('config',err);
            toast.error(err);
            reject(err);
        })
    })
    return promise;
}
const POSTParam = (path,body,param)  => {
    const promise = new Promise((resolve, reject) => {
        axios.post(`${baseURL}${path}/${param}`
            ,body
            ,{headers}
        ).then((result)=> {
            console.log('i am post :',result.data);
            resolve(result.data);
        },(err)=>{
            console.log('config',headers);
            toast.error(err);
            reject(err);
        })
    })
    return promise;
}

const POSTFile = (path,id,file)  => {
    var formdata = new FormData();
    formdata.append("fileupload",file);

    const promise = new Promise((resolve, reject) => {
        axios.post(`${baseURL}${path}/${id}`
            ,formdata
            ,{headers}
        ).then((result)=> {
            console.log('i am post :',result.data);
            resolve(result.data);
        },(err)=>{
            console.log('config',headers);
            toast.error(err);
            reject(err);
        })
    })
    return promise;
}
const POSTFiled = (path,file)  => {
    var formdata = new FormData();
    formdata.append("fileupload",file);

    const promise = new Promise((resolve, reject) => {
        axios.post(`${baseURL}${path}`
            ,formdata
            ,{headers}
        ).then((result)=> {
            console.log('i am post :',result.data);
            resolve(result.data);
        },(err)=>{
            console.log('config',headers);
            toast.error(err);
            reject(err);
        })
    })
    return promise;
}

const PUTFile = (path,id)  => {
    var formdata = new FormData();
    // formdata.append("fileupload",file);
    const promise = new Promise((resolve, reject) => {
        axios.put(`${baseURL}${path}/${id}`
            ,formdata
            ,{headers}
        ).then((result)=> {
            console.log('i am PUTFILE :',result.data);
            resolve(result.data);
        },(err)=>{
            toast.error(err);
            reject(err);
        })
    })
    return promise;
}

const PUT = (path,body)  => {
    const promise = new Promise((resolve, reject) => {
        axios.put(`${baseURL}${path}`
            ,body
            ,{headers}
        ).then((result)=> {
            console.log('i am put :',result.data);
            resolve(result.data);
        },(err)=>{
            console.log(err);
            reject(err);
        })
    })
    return promise;
}

const PUTParam = (path,id)  => {
    const promise = new Promise((resolve, reject) => {
        axios.put(`${baseURL}${path}/${id}`
            ,config
        )
            .then((result)=> {
                console.log('i am get :',result.data);
                resolve(result.data);
            },(err)=>{
                console.log(config);
                reject(err);
            })
    })
    return promise;
}

const DELETE = (path,param)  => {
    const promise = new Promise((resolve, reject) => {
        axios.delete(`${baseURL}${path}/${param}`
            ,{headers}
        ).then((result)=> {
            console.log('i am put :',result.data);
            resolve(result.data);
        },(err)=>{
            console.log(config);
            reject(err);
        })
    })
    return promise;
}

const DELETEParam = (path,body,param)  => {
    const promise = new Promise((resolve, reject) => {
        axios.delete(`${baseURL}${path}/${param}`
            ,body
            ,{headers}
        ).then((result)=> {
            console.log('i am post :',result.data);
            resolve(result.data);
        },(err)=>{
            console.log('config',headers);
            toast.error(err);
            reject(err);
        })
    })
    return promise;
}


const getMenu = (id,tokens) => GetMenu('menu',id,tokens);

const getMaterialCategory = () => GET('mastermaterialcategory');
const postMaterialCategory = (body) => POST('mastermaterialcategory',body);
const deleteMaterialCategory = (param) => DELETE('mastermaterialcategory',param);
const putmMaterialActiveStatus = (body) => PUT('mastermaterialcategory/setactivationstatus',body);
const getUOM = () => GET('mastermaterial/UomGetList');
const getItemLevel = () => GET('mastermaterial/ItemLevelGetList');

const getSubMaterialCategory = () => GET('mastermaterialsubcategory');
const postSubMaterialCategory = (body) => POST('mastermaterialsubcategory', body);
const putSubMaterialCategory = (body) => PUT('mastermaterialsubcategory', body);
const putSubCategoryStatus = (body) => PUT('mastermaterialsubcategory/setactivationstatus', body);

const getmDOPList = () => GET('masterdop');
const postDOPData= (body) => POST('masterdop',body);
const putActiveStatus= (body) => PUT('masterdop/SetActivationStatusU',body);
const putDOPData = (body)=> PUT('masterdop',body)

const getmDeliveryType = () => GET('masterdeliverytype');

const getmMaterialList = () => GET('mastermaterial');
const putMaterial = (body) => PUT('mastermaterial',body);
const putMaterialActivation = (body) => PUT('mastermaterial/setactivationstatus',body);
const getUomList = () => GET('mastermaterial/UomGetList');

const getmScope = () => GET('poscope');
const postmScope = (body) => POST('poscope', body);
const putmScope = (body) => PUT('poscope', body);
const putmScopeActivation = (body) => PUT('poscope/SetActivationStatus', body);

const getmOrderType = () => GET('masterordertype');

const getmSubcon = () => GET('subcon/getlsp');

const getPOList = () => GET('customerpo');
const postPOData = (body) => POST('customerpo', body);
const putPOActivation = () => PUT('customerpo/SetActivationStatusU');

const getPOScopeList = () => GET('poscope/getposcopelist');
const getPOScopeListFile = (id) => GETParam('positelist/GetUploadedSitelistFile',id);
const getErrorList = (id) => GETParam('positelist/GetUploadedSitelistErr',id);
const deleteFileUpload = (id) => PUTFile('positelist/UploadedSitelistDeletedTemp',id);
const postPOScope = (body) => POST('poscope/poscopeadd',body);
const postPOFile = (id,file) => POSTFile('positelist/uploadSiteList',id,file);
const postRevisePOFile = (id,file) => POSTFile('positelist/UploadReviseSiteList',id,file);


const getSiteInfo = (wpid) => GETParam('sitelist/siteDetail',wpid);
const getInventoryActiveList = () => GET('minventory/inventoryCodeGetActiveList');
const getSiteLocation = () => GET('netype/netypegetlist');
const getRequestBase = (ordertypeid) => GETParam('deliveryreqtype/RequestTypeGetListBasedOnOrderType',ordertypeid);
const getCTName = (invcodeid) => GETParam('materialmanagement/GetMasterCTBasedInvCodeId',invcodeid);
const getOrigin = (wpid,ordertypeid) => GETParam2('dopordertype/doporigingetlist',wpid,ordertypeid);
const getDestination = (wpid,ordertypeid) => GETParam2('dopordertype/dopdestinationgetlist',wpid,ordertypeid);
const getPacketType = (ordertypeid) => GETParam('materialmanagement/GetPacketTypeBasedOnOrderType',ordertypeid);
const getDismantledBy = () => GET('subcon/GetFieldSubcontractor');
const getSiteCondition = () => GET('sitecondition');
const getSubcon = () => GET('subcon/GetFieldSubcontractor');
const postDismantleForm = (body) => POST('materialmanagement/OrderDetailAdd',body);
const getTeamCoordinator= (subconid,workpackageid) => GETParam2('subcon/getCoordinatorSubcontractorEngineer',subconid,workpackageid);
const getHasExpressDelivery= (ordertypeid) => GETParam('masterordertype/orderTypeHasExpressDelivery',ordertypeid);

const getOrderRequestDraft = () => GET('mmReport/OrderRequestGetListDraft');

const getOrderDetailForm = (odi) => GETParam('materialmanagement/OrderDetailRequestGetDetail',odi);
const getOrderDetailMaterial = (odi) => GETParam('materialmanagement/orderRequestMaterialGetDetail',odi);
const getBOQRefGetList = (odi) => GETParam('materialmanagement/boqRefGetList',odi);
const getMaterialListExcludeOrdered = (odi) => GETParam('materialmanagement/masterMaterialGetListExcludeOrdered',odi);
const postMaterialOrderDirectSubmit = (odi) => POSTParam('materialmanagement/materialOrderDirectSubmit',"",odi);
const postMaterialOrderBookSubmit = (odi) => POSTParam('materialmanagement/materialOrderBookSubmit',"",odi);
const postAddMaterial = (body) => POST("materialmanagement/orderRequestMaterialAddItem",body);
const putEditQtyMaterial = (body) => PUT('materialmanagement/OrderRequestMaterialChangeQty',body);
const putMaterialOrderDraft = (body) => PUT('materialmanagement/materialOrderRequestSaveDraft',body);
const deleteMaterialOrderRequest = (param) => DELETE('materialmanagement/orderRequestMaterialDelItem',param);

const getOrderDetailEdit =  (odi) => GETParam('materialmanagement/OrderDetailRequestGetDetail',odi);

const getSconTaskPending = () => GET('taskassignment/taskAssignmentSubconPending');
const getSconEngineer = (sconid,wpid) => GETParam2('subcon/getFieldSubcontractorEngineer',sconid,wpid)
const postAssignEngineer = (body) => POST("taskassignment/taskAssignmentToEngineer",body);
const postCancelTask = (body) => POST("taskassignment/taskAssignmentCanceled",body);
const putRequestReschedule = (body) => PUT("scheduleassignment/taskScheduleProposeNewDate",body);

const getInventoryReport = () => GET('inventory/getInventoryReport');
const getInboundUploadFile = () => GET('inventory/inboundFileUploadGetList');
const getInboundErrorList = (id) => GETParam('inventory/inboundFileUploadGetErrLogList',id);
const postReviseInboundFile = (id,file) => POSTFile('inventory/UploadReviseSiteList',id,file);
const postInboundFile = (file) => POSTFiled('inventory/inboundFileUpload',file);
const deleteInboundFile = (id) => PUTParam('inventory/inboundFileDelete',id);

const getOutboundUploadFile = () => GET('inventory/outboundFileUploadGetList');
const getOutboundErrorList = (id) => GETParam('inventory/outboundFileUploadGetErrLogList',id);
const postReviseOutboundFile = (id,file) => POSTFile('inventory/outboundFileRevisionUpload',id,file);
const postOutboundFile = (file) => POSTFiled('inventory/outboundFileUpload',file);
const deleteOutboundFile = (id) => PUTParam('inventory/outboundFileDelete',id);

const getSconTaskOnProgress = () => GET('taskassignment/taskAssignmentSubconOnProgress');
const postReAssignmentEngineer = (body) => POST("taskassignment/taskReAssignmentToEngineer",body);

const getBoqList = () => GET("boqref/boqPOListReference")


    
const getWaitingRFP = () => GET('lspassignment/lspAssignmentRFPPending');
const postWaitingRFP = (body) => POST('lspassignment/lspAssignmentRFPConfirm',body);

const getTransportAssignment = () => GET('lspassignment/lspAssignmentTransportAssignmentPending');


const getTransportPickupPending = () => GET('lspassignment/lspAssignmentTransportAssignmentPickupPending');
const postTransportAssignTo = (body) => POST('taskassignment/lspAssignmentToTransport',body);

const getDDLTransportAssignTo = (subconid,wpid) => GETParam2('subcon/getLSPTransportTeam',subconid,wpid)

const putReAssignTransportTeam = (body) => PUT('taskassignment/taskReAssignmentToEngineer',body);
const postCancelRFP = (body) => POST('taskassignment/lspAssignmentRFPDoneCanceled',body);
const postAssitgnTransportTeam = (body) => POST('taskassignment/lspAssignmentToTransport ',body);

const getBOQSiteListReference = (bid) => GETParam('boqref/boqSiteListReference',bid);

const API ={
    getBOQSiteListReference,
  
    postAssitgnTransportTeam,
    postCancelRFP,
    putReAssignTransportTeam,
    getDDLTransportAssignTo,
    postTransportAssignTo,
    getTransportPickupPending,
    getTransportAssignment,
    postWaitingRFP,
    getWaitingRFP,
    getOutboundUploadFile, 
    getOutboundErrorList,
    postReviseOutboundFile,
    postOutboundFile,
    deleteOutboundFile,
    postInboundFile,
    deleteInboundFile,
    postReviseInboundFile,
    getInboundErrorList,
    getInboundUploadFile,
    getInventoryReport,
    postCancelTask,
    putRequestReschedule,
    postAssignEngineer,
    getSconEngineer,
    getSconTaskPending,
    getPOScopeListFile,
    getOrderDetailEdit,
    putMaterialOrderDraft,
    getOrderRequestDraft,
    deleteMaterialOrderRequest,
    putEditQtyMaterial,
    postAddMaterial,
    postMaterialOrderBookSubmit,
    postMaterialOrderDirectSubmit,
    getMaterialListExcludeOrdered,
    getBOQRefGetList,
    getOrderDetailMaterial,
    getOrderDetailForm,
    getSubcon
    ,getSiteCondition
    ,getPacketType
    ,getSiteLocation
    ,getRequestBase 
    ,getCTName 
    ,getOrigin 
    ,getDestination 
    ,getDismantledBy
    ,getmDOPList
    ,postDOPData
    ,putDOPData
    ,getmSubcon
    ,getmMaterialList
    ,getmOrderType
    ,Login
    ,putActiveStatus
    ,getmDeliveryType
    ,getUomList
    ,putmScopeActivation
    ,putmScope
    ,postmScope
    ,getmScope
    ,getPOList
    ,postPOData
    ,putPOActivation
    ,getMaterialCategory
    ,postMaterialCategory
    ,deleteMaterialCategory
    ,getPOScopeList
    ,putmMaterialActiveStatus
    ,getSubMaterialCategory
    ,postSubMaterialCategory
    ,putSubMaterialCategory
    ,putSubCategoryStatus
    ,getUOM
    ,getItemLevel
    ,putMaterial
    ,postPOScope
    ,putMaterialActivation
    ,postPOFile
    ,getMenu
    ,getErrorList
    ,deleteFileUpload
    ,postRevisePOFile
    ,getSiteInfo
    ,getInventoryActiveList
    ,postDismantleForm
    ,getSconTaskOnProgress
    ,postReAssignmentEngineer
    ,getTeamCoordinator,
    getHasExpressDelivery,
    getBoqList,
}

export default API;
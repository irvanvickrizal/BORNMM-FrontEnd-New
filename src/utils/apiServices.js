/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {variables} from '../Variables';
import { toast } from 'react-toastify';

import {useDispatch,useSelector} from 'react-redux';

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
        const token = localStorage.getItem('token'); 
        axios.post(`${baseURL}${path}`
            ,body
            ,{
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                    
                }
            },
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
        const token = localStorage.getItem('token'); 
        axios.post(`${baseURL}${path}/${param}`
            ,body
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
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


const POSTParam2 = (path,body,param,param2)  => {
    const promise = new Promise((resolve, reject) => {
        const token = localStorage.getItem('token'); 
        axios.post(`${baseURL}${path}/${param}/${param2}`
            ,body
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
        ).then((result)=> {
            console.log('i am post Param2:',result.data);
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
        const token = localStorage.getItem('token'); 
        axios.post(`${baseURL}${path}/${id}`
            ,formdata
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
        ).then((result)=> {
            console.log('i am post :',result.data);
            resolve(result.data);
        },(err)=>{
            console.log('config errer',err.response.status);
            resolve(err.response.status);
            
        })
    })
    return promise;
}
const POSTFileParam3 = (path,param1,param2,param3,file)  => {
    var formdata = new FormData();
    formdata.append("fileupload",file);

    const promise = new Promise((resolve, reject) => {
        const token = localStorage.getItem('token'); 
        axios.post(`${baseURL}${path}/${param1}/${param2}/${param3}`
            ,formdata
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
        ).then((result)=> {
            console.log('i am post :',result.data);
            resolve(result.data);
        },(err)=>{
            console.log('config errer',err.response.status);
            resolve(err.response.status);
            
        })
    })
    return promise;
}
const POSTFiled = (path,file)  => {
    var formdata = new FormData();
    formdata.append("fileupload",file);
    
    const promise = new Promise((resolve, reject) => {
        const token = localStorage.getItem('token'); 
        axios.post(`${baseURL}${path}`
            ,formdata
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
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

const POSTFileParam1 = (path,file,param1)  => {
    var formdata = new FormData();
    formdata.append("fileupload",file);

    const promise = new Promise((resolve, reject) => {
        const token = localStorage.getItem('token'); 
        axios.post(`${baseURL}${path}/${param1}`
            ,formdata
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
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
const POSTFileParam2 = (path,param1,param2,file)  => {
    var formdata = new FormData();
    formdata.append("fileupload",file);

    const promise = new Promise((resolve, reject) => {
        const token = localStorage.getItem('token'); 
        axios.post(`${baseURL}${path}/${param1}/${param2}`
            ,formdata
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
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
        const token = localStorage.getItem('token'); 
        axios.put(`${baseURL}${path}/${id}`
            ,formdata
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
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
        const token = localStorage.getItem('token'); 
        axios.put(`${baseURL}${path}`
            ,body
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
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

const PUTParam = (path,body,id)  => {
    const promise = new Promise((resolve, reject) => {
        const token = localStorage.getItem('token'); 
        axios.put(`${baseURL}${path}/${id}`
            ,body
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
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
const PUTParam2 = (path,body,param1,param2)  => {
    const promise = new Promise((resolve, reject) => {
        const token = localStorage.getItem('token'); 
        axios.put(`${baseURL}${path}/${param1}/${param2}`
            ,body
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
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
        const token = localStorage.getItem('token'); 
        axios.delete(`${baseURL}${path}/${param}`
            ,{
                headers: { 
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${token}` 
                }
            },
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
const postmMaterial = (body) => POST('mastermaterial',body);

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
const postFileHOConfirm = (orderdetailid,param2,lmby,file) => POSTFileParam3('logevidence/orderRequestEvidenceAdd',orderdetailid,param2,lmby,file);
const postRevisePOFile = (id,file) => POSTFile('positelist/UploadReviseSiteList',id,file);


const getSiteInfo = (wpid) => GETParam('sitelist/siteDetail',wpid);
const getInventoryActiveList = () => GET('minventory/inventoryCodeGetActiveList');
const getSiteLocation = () => GET('netype/netypegetlist');
const getRequestBase = (ordertypeid) => GETParam('deliveryreqtype/RequestTypeGetListBasedOnOrderType',ordertypeid);
const getRequestBase2 = (ordertypeid,wpid) => GETParam2('deliveryreqtype/RequestTypeGetListBasedOnOrderTypeAndWPID',ordertypeid,wpid);
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

const getOrderRequestDraft = (uid) => GETParam('mmReport/OrderRequestGetListDraft',uid);

const getOrderDetailForm = (odi) => GETParam('materialmanagement/OrderDetailRequestGetDetail',odi);
const getMaterialOrderLog = (odi) => GETParam('audittrail/auditTrailOrderRequestGetList',odi);
const getOrderDetailMaterial = (odi) => GETParam('materialmanagement/orderRequestMaterialGetDetail',odi);
const getBOQRefGetList = (odi) => GETParam('materialmanagement/boqRefGetList',odi);
const getMaterialListExcludeOrdered = (odi) => GETParam('materialmanagement/masterMaterialGetListExcludeOrdered',odi);
const postMaterialOrderDirectSubmit = (body,odi) => POSTParam('materialmanagement/materialOrderDirectSubmit',body,odi);
const postMaterialOrderBookSubmit = (body,odi) => POSTParam('materialmanagement/materialOrderBookAndSubmit',body,odi);
const postMaterialOrderDirectSubmit2 = (body) => POST('materialmanagement/materialOrderDirectSubmit',body);
const postMaterialOrderBookSubmit2 = (body) => POST('materialmanagement/materialOrderBookAndSubmit',body);
const postAddMaterial = (body) => POST("materialmanagement/orderRequestMaterialAddItem",body);
const putEditQtyMaterial = (body) => PUT('materialmanagement/OrderRequestMaterialChangeQty',body);
const putMaterialOrderDraft = (body) => PUT('materialmanagement/materialOrderRequestSaveDraft',body);
const deleteMaterialOrderRequest = (param) => DELETE('materialmanagement/orderRequestMaterialDelItem',param);

const getOrderDetailEdit =  (odi) => GETParam('materialmanagement/OrderDetailRequestGetDetail',odi);

const getSconTaskPending = (uid) => GETParam('taskassignment/taskAssignmentSubconPending',uid);
const getSconEngineer = (sconid,wpid) => GETParam2('subcon/getFieldSubcontractorEngineer',sconid,wpid)
const postAssignEngineer = (body) => POST("taskassignment/taskAssignmentToEngineer",body);
const postCancelTask = (body) => POST("taskassignment/taskAssignmentCanceled",body);
const putRequestReschedule = (body) => PUT("scheduleassignment/taskScheduleProposeNewDate",body);

const getInventoryReport = () => GET('inventory/getInventoryReport');
const getInboundSuccessLog = () => GET('inventory/inboundSuccessLogList');
const getInboundUploadFile = () => GET('inventory/inboundFileUploadGetList');
const getInboundErrorList = (id) => GETParam('inventory/inboundFileUploadGetErrLogList',id);
const postReviseInboundFile = (id,file) => POSTFile('inventory/inboundFileRevisionUpload',id,file);
const postReviseInboundFile2 = (id,userid,file) => POSTFileParam2('inventory/inboundFileRevisionUpload',id,userid,file);
const postInboundFile = (file) => POSTFiled('inventory/inboundFileUpload',file);
const postInboundFile2 = (userid,file) => POSTFile('inventory/inboundFileUpload',userid,file);
const deleteInboundFile = (body,id) => PUTParam('inventory/inboundFileDelete',body,id);
const deleteInboundFile2 = (body,id,userid) => PUTParam2('inventory/inboundFileDelete',body,id,userid);

const getOutboundUploadFile = () => GET('inventory/outboundFileUploadGetList');
const getOutboundSuccessLog = () => GET('inventory/outboundSuccessLogList');
const getOutboundErrorList = (id) => GETParam('inventory/outboundFileUploadGetErrLogList',id);
const postReviseOutboundFile = (id,file) => POSTFile('inventory/outboundFileRevisionUpload',id,file);
const postReviseOutboundFile2 = (id,userid,file) => POSTFileParam2('inventory/outboundFileRevisionUpload',id,userid,file);
const postOutboundFile = (file) => POSTFiled('inventory/outboundFileUpload',file);
const postOutboundFile2 = (file,userid) => POSTFile('inventory/outboundFileUpload',userid,file);
const deleteOutboundFile = (body,id) => PUTParam('inventory/outboundFileDelete',body,id);
const deleteOutboundFile2 = (body,id,userid) => PUTParam2('inventory/outboundFileDelete',body,id,userid);

const getSconTaskOnProgress = (uid) => GETParam('taskassignment/taskAssignmentSubconOnProgress',uid);
const getSconTaskOnDone = (uid) => GETParam('taskassignment/taskAssignmentSubconDone',uid);
const postReAssignmentEngineer = (body) => POST("taskassignment/taskReAssignmentToEngineer",body);

const getWaitingRFP = (userid) => GETParam('lspassignment/lspAssignmentRFPPending',userid);
const postWaitingRFP = (body) => POST('lspassignment/lspAssignmentRFPConfirm',body);

const getTransportAssignment = (userid) => GETParam('lspassignment/lspAssignmentTransportAssignmentPending',userid);


const getTransportPickupPending = () => GET('lspassignment/lspAssignmentTransportAssignmentPickupPending');
const postTransportAssignTo = (body) => POST('taskassignment/lspAssignmentToTransport',body);

const getDDLTransportAssignTo = (subconid,wpid) => GETParam2('subcon/getLSPTransportTeam',subconid,wpid)
const getDDLTransportAssignTo2 = (subconid) => GETParam('subcon/getLSPTransportTeam',subconid)

const putReAssignTransportTeam = (body) => PUT('taskassignment/taskReAssignmentToEngineer',body);
const putCancelRFP = (body) => PUT('lspassignment/lspAssignmentRFPDoneCanceled',body);
const postAssitgnTransportTeam = (body) => POST('taskassignment/lspAssignmentToTransport',body);
const postAssitgnTransportTeam2 = (body) => POST('lspassignment/lspAssignmentToTransport',body);

const getBoqSummaryAsPoBoq = (boqid) => GETParam('boqref/boqGetSummaryAsPOBOQCompletion',boqid)
const getListBoqAsPo = (boqid) => GETParam('boqref/boqGetListAsPOBOQ',boqid)
const getDownloadPoBoqCompletion = (boqid,poscopeid) => GETParam2('boqref/boqGetListAsPOBOQCompletion',boqid,poscopeid)

   
const getDownloadPoBoqList = (workpackageid,boqRefCode) => GETParam2('boqref/boqAsPOSitebasedGetList',workpackageid,boqRefCode)
const getDownloadPoBoqListDeleted = (workpackageid) => DELETE('boqref/boqAsPOBOQSiteBasedDeleted',workpackageid)

const getBoqList = () => GET("boqref/boqPOListReference");
const getBOQSiteListReference = (bid) => GETParam('boqref/boqSiteListReference',bid);
const getLatestCheckPoint = (bid) => GETParam('boqref/boqUploadDataCheckHasCleared',bid);


const postBOQASPOFile = (id,file) => POSTFile('boqref/boqAsPOUploadBulk',id,file);
const getInventoryDetail = () => GET("inventory/getInventoryDetail");



const getBoqSummaryAsPlanBoq = (bid) => GETParam('boqref/boqGetSummaryAsPlanBOQCompletion',bid)
const getListBoqAsPlan = (boqid) => GETParam('boqref/boqGetListAsPlanBOQ',boqid)
const getDownloadPlanBoqCompletion = (boqid,poscopeid) => GETParam2('boqref/boqGetListAsPlanBOQCompletion',boqid,poscopeid)
const getDownloadPlanBoqList = (workpackageid,boqRefCode) => GETParam2('boqref/boqAsPlanSitebasedGetList',workpackageid,boqRefCode)
const getDownloadPlanBoqListDeleted = (workpackageid) => DELETE('boqref/boqAsPlanBOQSiteBasedDeleted',workpackageid)

const postBOQASPlanFile = (id,file) => POSTFile('boqref/boqAsPlanUploadBulk',id,file)

// as PO

const postBoqUploadProceed = (body,bid,uid) => POSTParam2('boqref/boqUploadedProceed',body,bid,uid)
const postResetUploadedBoq = (body,bid) => POSTParam('boqref/boqUploadedReset',body,bid)
const getDownloadedUloaded = (bid) => GETParam('boqref/boqAsPODataCheckGetList',bid)
const getDownloadUploadedBoq = (bid) => GETParam('boqref/boqAsPODataCheckSummary',bid)

// As Plan
const getLatestAsPlanCheckPoint = (bid) => GETParam('boqref/boqAsPlanUploadDataCheckHasCleared',bid);
const getDownloadUploadedAsPlanBoq = (bid) => GETParam('boqref/boqAsPlanDataCheckGetList',bid)
const getDownloadUploadedBoqSummaryAsPlan = (bid) => GETParam('boqref/boqAsPlanDataCheckSummary',bid)
const postBoqAsPlanUploadProceed = (body,bid,uid) => POSTParam2('boqref/boqAsPlanUploadedProceed',body,bid,uid)
const postResetUploadedBoqAsPlan = (body,bid) => POSTParam('boqref/boqAsPlanUploadedReset',body,bid)


// Order Rejection Pending List
const getOrderRejectionPendigList = () => GET('wftransaction/orderRequestGetRejectionPendingList')
// const deleteOrderDetail = (odi) => POST('materialmanagement/OrderDetailDeleteTemp',odi)

// material management orderList
const getOrderList = (wpid,ordertypeid) => GETParam2('materialmanagement/orderRequestGetOrderedList',wpid,ordertypeid);
const postDeleteOrderList = (body,odi) => PUTParam('materialmanagement/OrderDetailDeleteTemp',body,odi)
const getOrderRequest = (odi) => GETParam('materialmanagement/OrderDetailRequestGetDetail',odi)
const getMaterial = (odi) => GETParam('materialmanagement/orderRequestMaterialGetDetail',odi)
const getLog = (odi) => GETParam('audittrail/auditTrailOrderRequestGetList',odi)

const getEvidence = (odi) => GETParam('logevidence/orderRequestEvidenceGetAllList',odi)
const deleteEvidene = (evidenceId) => DELETE('logevidence/orderRequestEvidenceDelete',evidenceId)
const postLSPDirectToComplete = (body) => POST('lspassignment/lspAssignmentDirectToComplete',body)

const deleteOrderDetail = (body,odi) => PUTParam('materialmanagement/OrderDetailDeleteTemp',body,odi);

// Pickup Complletion

const getPickUpCompletion = (uid) => GETParam('lspassignment/lspAssignmentTransportAssignmentPickupPending',uid);
const getPickUpCompletion2 = (uid) => GETParam('lspassignment/lspAssignmentTransportAssignmentPickupPending',uid);
const getDdlTransportTeam = (tid,wpid) => GETParam2('subcon/getLSPTransportTeam',tid,wpid);
const postPickUpCompletion = (body) => POST('lspassignment/lspAssignmentToChangePIC',body);

const getMultiDeliveryCompletion = (uid) => GETParam('multidelivery/multiDeliveryGetAssignedList',uid);
const getMultiDeliveryAssigned = (mdid) => GETParam('multidelivery/multiDeliveryGetDetailAssignedList',mdid);
const postMultiDeliveryCancelAssigned = (body) => POST('multidelivery/multiDeliveryAssignedTaskCanceled',body);

const getDdlDeliveryDate = (ot) => GETParam('deliverymode/getListBasedOnOrderType',ot);
const getLogLogistic = (odi) => GETParam('audittrail/auditTrailOrderRequestGetList',odi);

const getMultiDeliveryConfirmation = (userid) => GETParam('multidelivery/multiDeliveryGetPendingList',userid);
const getMultiDeliveryRequest = (userid) => GETParam('multidelivery/multiDeliveryGetPendingOrderRequestList',userid);
const getMultiDeliveryDetail = (mdid) => GETParam('multidelivery/multiDeliveryGetDetail',mdid);
const getMultiDeliveryRequestList = (mdid) => GETParam('multidelivery/multiDeliveryGetOrderRequestList',mdid);
const postMultiDelivery = (body) => POST('multidelivery/multiDeliveryAddGroup',body)
const postMultiDeliveryArrangement = (body) => POST('multidelivery/multiDeliveryAddOrderRequest',body)
const assignMultiDelivery = (body) => POST('multidelivery/multiDeliveryAssignTaskToTransport',body)
const deleteMultiDeliveryRequest = (mdid) => DELETE('multidelivery/multiDeliveryDeleteOrderRequest',mdid)
const putDeleteMultiDeliveryRequest = (body) => PUT('multidelivery/multiDeliveryDeleteGroup',body)



const getOrderRequestTracking =(odi) => GETParam('rpt/orderRequestProgressTracking',odi);
const deleteWaitingRfp = (body) => PUT('materialmanagement/orderRequestLogisticTransportReject',body);

// Logistic Task Rejection
const getLogisticRejectionList = (uid) => GETParam("materialmanagement/orderRequestLogisticAssignmentReject",uid);
const putLogisticRejection = (body) => POST("materialmanagement/orderRequestDetailFormLogisticUpdate",body);
const postLogisticCancel = (body) => POST("materialmanagement/orderRequestDetailCancellation",body);

// 
const postLogisticForm = (body) => POST("materialmanagement/orderRequestDetailFormLogisticSubmit",body);
const postLogisticCancelForm = (body) => POST("materialmanagement/orderRequestDetailCancellation",body);


const checkAddButtonOrderList = (wpid,ot) => GETParam2("materialmanagement/orderRequestGetOrderedListViewToAdd",wpid,ot);

// Approval 
const postApprovalConfirm = (body) => POST("wftransaction/orderRequestApprove",body);
const postRejectAproval = (body) => POST("wftransaction/orderRequestReject",body);

const getAddress = (siteNo,ddlDestination) => GETParam2('materialmanagement/orderRequestGetDestinationAddress',siteNo,ddlDestination)
const orderRequestDraft = (body) => PUT("materialManagement/orderRequestChangeExpectedDeliveryDate",body)


// scon Task Summary cancel

const postSconTaskCancel = (body) => POST("taskassignment/taskOrderRequestAssignmentCancelled",body);
const postSconTaskReassignment = (body) => POST("taskassignment/taskOrderRequestReAssignmentToSubcon",body);

const getSconTaskCancel = (uid) => GETParam("materialmanagement/orderRequestSubconTaskAssignmentCancelled",uid);

const API ={
    postmMaterial,
    getAddress,
    deleteOutboundFile2,
    postOutboundFile2,
    postReviseOutboundFile2,
    deleteInboundFile2,
    postInboundFile2,
    postReviseInboundFile2,
    postSconTaskCancel,
    checkAddButtonOrderList,
    postSconTaskReassignment,
    putDeleteMultiDeliveryRequest,
    postMultiDeliveryCancelAssigned,
    postLogisticForm,
    getSconTaskCancel,
    postApprovalConfirm,
    orderRequestDraft,
    postRejectAproval,
    postLogisticCancelForm,
    getMultiDeliveryAssigned,
    getMultiDeliveryCompletion,
    getRequestBase2,
    postLogisticCancel,
    putLogisticRejection,
    assignMultiDelivery,
    deleteMultiDeliveryRequest,
    getDDLTransportAssignTo2,
    postMultiDeliveryArrangement,
    getMultiDeliveryRequestList,
    getMultiDeliveryDetail,
    getMultiDeliveryRequest,
    postMultiDelivery,
    postAssitgnTransportTeam2,
    getMultiDeliveryConfirmation,
    deleteWaitingRfp,
    getOrderRequestTracking,
    postPickUpCompletion,
    postLSPDirectToComplete,
    deleteEvidene,
    getLogisticRejectionList,
    getEvidence,
    postFileHOConfirm,
    getLogLogistic,
    getDdlDeliveryDate,
    getDdlTransportTeam,
    getPickUpCompletion,
    getMaterialOrderLog,
    deleteOrderDetail,
    getOutboundSuccessLog,
    getInboundSuccessLog,
    getLog,
    getMaterial,
    getOrderRequest,
    postDeleteOrderList,
    getOrderList,
    getOrderRejectionPendigList,
    postResetUploadedBoqAsPlan,
    postBoqAsPlanUploadProceed,
    getDownloadUploadedBoqSummaryAsPlan,
    getDownloadUploadedAsPlanBoq,
    getLatestAsPlanCheckPoint,
    getDownloadedUloaded,
    postResetUploadedBoq,
    postBoqUploadProceed,
    getDownloadUploadedBoq,
    getSconTaskOnDone,
    postBOQASPlanFile,
    getDownloadPlanBoqListDeleted,
    getDownloadPlanBoqList,
    getDownloadPlanBoqCompletion,
    getListBoqAsPlan,
    getBoqSummaryAsPlanBoq,
    getInventoryDetail,
    postBOQASPOFile,
    getLatestCheckPoint,
    getDownloadPoBoqListDeleted,
    getDownloadPoBoqList,
    getBOQSiteListReference,
    getDownloadPoBoqCompletion,
    getListBoqAsPo,
    getBoqSummaryAsPoBoq,
    postAssitgnTransportTeam,
    putCancelRFP,
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
    postMaterialOrderBookSubmit2,
    postMaterialOrderDirectSubmit2,
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
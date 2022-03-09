import axios from 'axios';
import {variables} from '../Variables';
import { toast } from 'react-toastify';

import {useDispatch} from 'react-redux';

import {setIsLoading} from '@store/reducers/ui';

const baseURL = variables.API_URL;
const token = localStorage.getItem('token'); 

const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const headers = { 
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${token}`
};

const headersfile ={
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`

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
        axios.get(`${baseURL}${path}`
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

const GETParam = (path,id)  => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${baseURL}${path}/${id}`
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

const POST = (path,body)  => {
    const promise = new Promise((resolve, reject) => {
        axios.post(`${baseURL}${path}`
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
            console.log(config);
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


const getMenu = (id) => GETParam('menu',id);

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
const getErrorList = (id) => GETParam('positelist/GetUploadedSitelistErr',id);
const deleteFileUpload = (id) => PUTFile('positelist/UploadedSitelistDeletedTemp',id);
const postPOScope = (body) => POST('poscope/poscopeadd',body);
const postPOFile = (id,file) => POSTFile('positelist/uploadSiteList',id,file);
const postRevisePOFile = (id,file) => POSTFile('positelist/UploadReviseSiteList',id,file);

const API ={
    getmDOPList
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
}

export default API;
import React, {Component,useState,useEffect} from 'react';

import API  from '../../utils/apiServices';

import {useDispatch,useSelector} from 'react-redux';


const errorLog = (WPID , Phase, PackageName, Region, DataStatus)=>{
    const datas = {
        WPID: WPID,
        Phase: Phase,
        PackageName: PackageName,
        Region: Region,
        DataStatus: DataStatus
    }
    return datas;
}

const poScopeData = (poScopeId,totalSites,cpoId,cpoNo,cpoNoOriginal,projectName,scopeId,scopeName,lmdt) =>{
    const datas = {
        poScopeId: poScopeId,
        totalSites: totalSites,
        cpoId: cpoId,
        cpoNo: cpoNo,
        cpoNoOriginal: cpoNoOriginal,
        projectName: projectName,
        scopeId: scopeId,
        scopeName: scopeName,
        lmdt: lmdt
        // "poDetail": {
        //     "cpoId": 1,
        //     "cpoNo": "XL-0001",
        //     "cpoNoOriginal": "XL-001 Batch 01",
        //     "projectName": "XL Dismantle Batch 1 2022",
        //     "cminfo": {}
        // },
        // "scopeDetail": {
        //     "scopeId": 1,
        //     "scopeName": "Dismantle",
        //     "cminfo": {}
        // },
        // "getFileUploadList": [],
        // "lmby": 1,
        // "lmdt": "2022-02-18T11:42:43.35",
        // "modifiedUser": "Administrator"
    }
    
    return datas;
}

const fileListData = (poScopeId,poSitelistId,filePath,fullFilePath,uploadStatus,uploadDate,rowCount) => {
    const datas = {
        poScopeId
        ,poSitelistId
        ,filePath
        ,fullFilePath
        ,uploadStatus
        ,uploadDate
        ,rowCount
    }
    
    return datas;
}

const CreateDataPOScope = {
    errorLog
    ,poScopeData
    ,fileListData
}

export default CreateDataPOScope;
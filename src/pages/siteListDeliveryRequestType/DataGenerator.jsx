import React, {Component,useState,useEffect} from 'react';

import API  from '../../utils/apiServices';

import {useDispatch,useSelector} from 'react-redux';

const siteInfo = (cpoNo , scopeName, siteNo, siteName, packageName, projectContract, region) => {
    const datas = {
        cpoNo: cpoNo,
        scopeName: scopeName,
        siteNo: siteNo,
        siteName: siteName,
        packageName: packageName,
        projectContract: projectContract,
        region: region
    }
    return datas;
}

const fileListData = (poScopeId,poSitelistId,filePath,fullFilePath,uploadStatus,rowCount) => {
    const datas = {
        poScopeId
        ,poSitelistId
        ,filePath
        ,fullFilePath
        ,uploadStatus
        ,rowCount
    }
    
    return datas;
}

const CreateDataDismantleForm = {
    siteInfo
}

export default CreateDataDismantleForm;
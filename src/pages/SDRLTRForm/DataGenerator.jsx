import React, {Component,useState,useEffect} from 'react';

import API  from '../../utils/apiServices';

import {useDispatch,useSelector} from 'react-redux';

const siteInfo = (cpoNo , scopeName, siteNo, siteName, packageName, projectContract, region,wpid) => {
    const datas = {
        cpoNo: cpoNo,
        scopeName: scopeName,
        siteNo: siteNo,
        siteName: siteName,
        packageName: packageName,
        projectContract: projectContract,
        region: region,
        workpackageId: wpid
    }
    return datas;
}

const boqRef = (workpackageId , materialCode, materialDesc, refQTY) => {
    const datas = {
        workpackageId :  workpackageId ,
        materialCode :  materialCode ,
        materialDesc :  materialDesc ,
        refQTY : refQTY
    }
    return datas;
}

const siteInfoMO = (siteNo 
    , siteName
    , region
    , zone
    , workpackageId
    , packageName
    , cpoNo
    , projectName) => {
    const datas = {
        siteNo: siteNo,
        siteName: siteName,
        region: region,
        zone: zone,
        workpackageId: workpackageId,
        packageName: packageName,
        cpoNo: cpoNo,
        projectName: projectName
    }
    return datas;
}

const orderDetail = (
    orderDetailId
    ,inventoryCode
    ,ordertype
    ,requestTypeName
    ,boqCheck
    ,stockCheck
    ,standardWFID
    ,boqDeltaWFID
    ,formPath
    ,ctName
    ,siteCondition
    ,deliveryType
    ,packetType
    ,recipientOrDismantledBy 
    ,requesterName
    ,requestDate
    ,expectedDeliveryDate) =>{
    const datas ={
        orderDetailId  :    orderDetailId
        ,inventoryCode  :    inventoryCode
        ,ordertype  :    ordertype
        ,requestTypeName  :    requestTypeName
        ,boqCheck  :    boqCheck
        ,stockCheck  :    stockCheck
        ,standardWFID  :    standardWFID
        ,boqDeltaWFID  :    boqDeltaWFID
        ,formPath  :    formPath
        ,ctName  :    ctName
        ,siteCondition  :    siteCondition
        ,deliveryType  :    deliveryType
        ,packetType  :    packetType
        ,recipientOrDismantledBy   :    recipientOrDismantledBy 
        ,requesterName  :    requesterName
        ,requestDate  :    requestDate
        ,expectedDeliveryDate  :    expectedDeliveryDate
    }
    return datas;
}

const CreateDataDismantleForm = {
    siteInfo
    ,orderDetail
    ,siteInfoMO
    ,boqRef
}

export default CreateDataDismantleForm;
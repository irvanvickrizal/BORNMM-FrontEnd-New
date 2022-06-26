import React, {Component,useState,useEffect} from 'react';

const masterDop = (dopId,dopName,dopDesc,dopCode,dopAddress,dopType,dopDestName,isActive,isCWH,isMainCWH,isSite,subconName,orderTypeName,orderTypeId,subconId) => {
    const datas = {
        dopId: dopId,
        dopName: dopName,
        dopDesc: dopDesc,
        dopCode: dopCode,
        dopAddress: dopAddress,
        dopType: dopType,
        dopDestName: dopDestName,
        isActive: isActive,
        isCWH: isCWH,
        isMainCWH: isMainCWH,
        isSite: isSite,
        subconName:subconName,
        orderTypeName:orderTypeName,
        orderTypeId:orderTypeId,
        subconId:subconId
      
    }
    return datas;
}


const DGMasterDop = {
    masterDop
}

export default DGMasterDop;
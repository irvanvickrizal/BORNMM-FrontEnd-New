import React, {Component,useState,useEffect} from 'react';

const poList = (cpoId , cpoNo, cpoNoOriginal, cpoDate, cpoDatestr, projectName, contractName, isActive) => {
    const datas = {
        cpoId: cpoId,
        cpoNo: cpoNo,
        cpoNoOriginal: cpoNoOriginal,
        cpoDate: cpoDate,
        cpoDatestr: cpoDatestr,
        projectName: projectName,
        contractName: contractName,
        isActive: isActive
    }
    return datas;
}


const DGPOCreation = {
    poList
}

export default DGPOCreation;
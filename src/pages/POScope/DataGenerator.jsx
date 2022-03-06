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

export default errorLog;
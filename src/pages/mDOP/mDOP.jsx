/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import DOPList from './mDOPList';
import DOPPanel from './mDOPPanel';
import {useSelector} from 'react-redux';

//action
import { getDataDop } from '@app/store/action/dopAction';

const mDOP = (props) => {
    const isNew = useSelector((state) => state.dop.isNew);
    const isEdit = useSelector((state) => state.dop.isEdit);

    const getDOP = () =>{
        API.getmDOPList().then(
            result=>{
                return result;
            }
        )
    } 

    useEffect(() => {
        getDOP();
        getDataDop()
    })

    return (
        <div>
            <HeaderChanger title="Master DOP"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            <DOPList />
        </div>
    );
};

export default mDOP;

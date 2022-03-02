/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import CustomerPOList from './CustomerPOList';
import CustomerPOPanel from './CustomerPOPanel';
import {useSelector} from 'react-redux';


const mDOP = (props) => {
    const isNew = useSelector((state) => state.dop.isNew);
    const isEdit = useSelector((state) => state.dop.isEdit);

    const getDOP = ()=>{
        API.getDOPList().then(
            result=>{
                return result;
            }
        )
    } 

    useEffect(() => {
        getDOP();
    })

    return (
        <div>
            <HeaderChanger title="Customer PO"/>
            {isEdit || isNew ? <CustomerPOPanel/> : null}
            <CustomerPOList />
        </div>
    );
};

export default mDOP;

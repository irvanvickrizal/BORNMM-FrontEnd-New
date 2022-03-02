/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import POScopeList from './POScopeList';
import {useSelector} from 'react-redux';


const POCreation = () => {

    useEffect(() => {
        //getDOP();
    })

    return (
        <div>
            <HeaderChanger title="PO Scope"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            <POScopeList />
        </div>
    );
};

export default POCreation;

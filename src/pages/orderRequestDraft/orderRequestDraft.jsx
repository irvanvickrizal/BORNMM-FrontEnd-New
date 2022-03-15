/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import {useSelector} from 'react-redux';
import TableOrderRequestDraft from './table' ;

const POCreation = () => {

    useEffect(() => {
        //getDOP();
    })

    return (
        <div>
            <HeaderChanger title="Order Request Draft"/>
            <TableOrderRequestDraft/>
        </div>
    );
};

export default POCreation;

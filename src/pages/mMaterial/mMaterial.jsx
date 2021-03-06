/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TableMaterial from './Table'

const mMaterial = () => {
    
    return (
        <div>
            <HeaderChanger title="Master Material"/>
            <TableMaterial/>
        </div>
    );
};

export default mMaterial;
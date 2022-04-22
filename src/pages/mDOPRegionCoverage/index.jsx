/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TableDOPRegionCoverage from './Table'

const indexDOPRegionCoverage = () => {
    
    return (
        <div>
            <HeaderChanger title="DOP Region Coverage"/>
            <TableDOPRegionCoverage/>
        </div>
    );
};

export default indexDOPRegionCoverage;
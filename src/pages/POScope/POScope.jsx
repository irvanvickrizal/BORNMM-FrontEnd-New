/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import POScopeList from './POScopeList';
import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const POCreation = () => {
    
    const isLoading = useSelector((state) => state.ui.isLoading);
    useEffect(() => {
        //getDOP();
    })

    return (
        <div>
            <HeaderChanger title="PO Scope"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            <p>is loading :{isLoading}</p>
            {isLoading ? <Box sx={{ display: 'flex',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </Box> : <POScopeList />
            }
            
            {/* <POScopeList /> */}
        </div>
    );
};

export default POCreation;

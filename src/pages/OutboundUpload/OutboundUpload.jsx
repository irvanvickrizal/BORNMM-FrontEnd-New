/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TableOutboundUpload from './Table'

const OutboundUpload = () => {
    
    const isLoading = useSelector((state) => state.ui.isLoading);
    useEffect(() => {
        //getDOP();
    },[])

    return (
        <div>
            <HeaderChanger title="Outbound Upload"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            {isLoading ? <Box sx={{ display: 'flex',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </Box> : 
                <TableOutboundUpload/>
            }
            
            {/* <POScopeList /> */}
        </div>
    );
};

export default OutboundUpload;
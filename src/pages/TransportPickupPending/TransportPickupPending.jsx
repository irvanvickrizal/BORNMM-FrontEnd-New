/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';

import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TransportPickupTable from './Table'

const TransportPickupPending = () => {
    
    const isLoading = useSelector((state) => state.ui.isLoading);
    useEffect(() => {
        //getDOP();
    },[])

    return (
        <div>
            <HeaderChanger title="Transport Pickup Pending"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            {isLoading ? <Box sx={{ display: 'flex',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </Box> : 
                <TransportPickupTable/>
            }
        </div>
    );
};

export default TransportPickupPending;
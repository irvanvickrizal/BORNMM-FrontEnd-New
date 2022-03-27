/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';

import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import WaitingRFPTable from './Table'

const WaitingRFP = () => {
    
    const isLoading = useSelector((state) => state.ui.isLoading);
    useEffect(() => {
        //getDOP();
    },[])

    return (
        <div>
            <HeaderChanger title="Waiting Ready for Pickup Confirmation"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            {isLoading ? <Box sx={{ display: 'flex',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </Box> : 
                <WaitingRFPTable/>
            }
        </div>
    );
};

export default WaitingRFP;
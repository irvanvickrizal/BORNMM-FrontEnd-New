/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TaskPendingTable from './Table'

const SconTaskPending = () => {
    
    const isLoading = useSelector((state) => state.ui.isLoading);
    useEffect(() => {
        //getDOP();
    })

    return (
        <div>
            <HeaderChanger title="Subcon Task Pending"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            {isLoading ? <Box sx={{ display: 'flex',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </Box> : 
                <TaskPendingTable/>
            }
            
            {/* <POScopeList /> */}
        </div>
    );
};

export default SconTaskPending;
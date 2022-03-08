
import TableScopeOrder from '@app/pages/mScopeOrderType/table'
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Table from './table'

const Workflow = () => {
    
    const isLoading = useSelector((state) => state.ui.isLoading);
 

    return (
        <div>
            <HeaderChanger title="Workflow"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            {/* <p>is loading :{isLoading}</p> */}
            {isLoading ? <Box sx={{ display: 'flex',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </Box> : <Table />
            }
            
            {/* <POScopeList /> */}
        </div>
    );
};

export default Workflow;




import TableScopeOrder from '@app/pages/mScopeOrderType/table'
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import mSiteCondition from '@app/pages/mSiteCondition/index';
import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Table from './table'

const ScopeOrderType = () => {
    
    const isLoading = useSelector((state) => state.ui.isLoading);
    useEffect(() => {
        //getDOP();
    })

    return (
        <div>
            <HeaderChanger title="Scope Order Type"/>
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

export default ScopeOrderType;



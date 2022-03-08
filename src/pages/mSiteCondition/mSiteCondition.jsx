import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import mSiteCondition from '@app/pages/mSiteCondition/index';
import {useSelector} from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TableSiteCondition from '@app/components/mSiteCondition/tableSiteCondition/index';

const siteCondition = () => {
    
    const isLoading = useSelector((state) => state.ui.isLoading);
    useEffect(() => {
        //getDOP();
    })

    return (
        <div>
            <HeaderChanger title="Site Condition"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            {/* <p>is loading :{isLoading}</p> */}
            {isLoading ? <Box sx={{ display: 'flex',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </Box> : <TableSiteCondition />
            }
            
            {/* <POScopeList /> */}
        </div>
    );
};

export default siteCondition;

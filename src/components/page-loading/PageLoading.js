import React from 'react';
import classes from './PageLoading.module.scss';
import CircularProgress from '@mui/material/CircularProgress';

const PageLoading = () => {
    return (
        // <div className={classes.loading}>
        //     <span>B</span>
        //     <span>O</span>
        //     <span>R</span>
        //     <span>N</span>
        // </div>
        <CircularProgress />
    );
};

export default PageLoading;

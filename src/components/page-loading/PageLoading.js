import React from 'react';
import classes from './PageLoading.module.scss';
import CircularProgress from '@mui/material/CircularProgress';

const PageLoading = () => {
    return (
        <div className={classes.loading}>
            <CircularProgress />
        </div>
    );
};

export default PageLoading;

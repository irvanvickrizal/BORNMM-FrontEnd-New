/* eslint-disable no-unused-expressions */
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import {variables} from '../Variables';
import { toast } from 'react-toastify';
import axiosRetry from 'axios-retry';
import {useDispatch,useSelector} from 'react-redux';

import {setIsLoading} from '@store/reducers/ui';

const getToken = () =>{
    const tokens = useSelector((state) => state.auth.token);
    return tokens
}

export default getToken;
import React from 'react'
import {Gatekeeper} from 'gatekeeper-client-sdk';
import API  from '../utils/apiServices';


export const apiToken = async (username, password) => {
    const userdata = {
        username : username
        ,password : password
    }
    const token = API.Login('auth')(userdata).then( 
        result=>{
            console.log("i am auth :",result.data.message);
            return result.data.message;
        })
    return token;
};

export const loginAPI = async (username, password) => {
    const token = await apiToken(username, password);
    console.log("i am loginbyauth :",token);
    localStorage.setItem('token', token);
    document.getElementById('root').classList.remove('login-page');
    document.getElementById('root').classList.remove('hold-transition');
    return token;
};

export const loginByAuth = async (email, password) => {
    const token = await Gatekeeper.loginByAuth(email, password);
    console.log("i am loginbyauth :",token);
    localStorage.setItem('token', token);
    document.getElementById('root').classList.remove('login-page');
    document.getElementById('root').classList.remove('hold-transition');
    return token;
};

export const registerByAuth = async (email, password) => {
    const token = await Gatekeeper.registerByAuth(email, password);
    localStorage.setItem('token', token);
    document.getElementById('root').classList.remove('register-page');
    document.getElementById('root').classList.remove('hold-transition');
    return token;
};

export const loginByGoogle = async () => {
    const token = await Gatekeeper.loginByGoogle();
    localStorage.setItem('token', token);
    document.getElementById('root').classList.remove('login-page');
    document.getElementById('root').classList.remove('hold-transition');
    return token;
};

export const registerByGoogle = async () => {
    const token = await Gatekeeper.registerByGoogle();
    localStorage.setItem('token', token);
    document.getElementById('root').classList.remove('register-page');
    document.getElementById('root').classList.remove('hold-transition');
    return token;
};

export const loginByFacebook = async () => {
    const token = await Gatekeeper.loginByFacebook();
    localStorage.setItem('token', token);
    document.getElementById('root').classList.remove('login-page');
    document.getElementById('root').classList.remove('hold-transition');
    return token;
};

export const registerByFacebook = async () => {
    const token = await Gatekeeper.registerByFacebook();
    localStorage.setItem('token', token);
    document.getElementById('root').classList.remove('register-page');
    document.getElementById('root').classList.remove('hold-transition');
    return token;
};

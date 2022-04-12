import React, { useEffect,useRef } from 'react'
import IdleTimer from 'react-idle-timer'
import { logoutUser } from '@app/store/reducers/auth'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Modal, Button, Space } from 'antd';

export default function SetTime() {
    const idleTimerRef = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()

    function info() {
        Modal.info({
            title: 'Idle message',
            content: (
                <div>
                    <p>You are Being Idle for 30 Minutes.</p>
                    <p>Your login session timed out</p>
                </div>
            ),
            onOk() {
                
                dispatch(logoutUser());
                history.push('/login');
            },
        });
    }

    const onIdle = ()=> {
        //if (window.confirm('You are Being Idle for 30 Minutes,Are you want to Logout ?')){
        info()
        
        //}
        
    }
    const set = () => {
        console.log("ini set tmeout")
    }

   
    return (
        <div>
            <IdleTimer ref={idleTimerRef} timeout={1800*1000} onIdle={onIdle}></IdleTimer>
        </div>
    )
}

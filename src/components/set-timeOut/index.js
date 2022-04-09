import React, { useEffect,useRef } from 'react'
import IdleTimer from 'react-idle-timer'
import { logoutUser } from '@app/store/reducers/auth'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function SetTime() {
    const idleTimerRef = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()

    const onIdle = ()=> {
        if (window.confirm('You are Being Idle for 30 Minutes,Are you want to Logout ?')){
            dispatch(logoutUser());
            history.push('/login');
        }
        
    }
    const set = () => {
        console.log("ini set tmeout")
    }

   
    return (
        <div>
            <IdleTimer ref={idleTimerRef} timeout={5*1000} onIdle={onIdle}></IdleTimer>
        </div>
    )
}

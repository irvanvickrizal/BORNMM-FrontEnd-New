import { getAprovalPending } from '@app/store/action/aprovalTaskPendingAction'
import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'

export default function TableAproval() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAprovalPending())
    },[]) 


    return (
        <div>T</div>
    )
}

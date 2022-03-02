/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import ScopeList from './mScopeList';
import {useSelector} from 'react-redux';


const mScope = () => {
    const isNew = useSelector((state) => state.dop.isNew);
    const isEdit = useSelector((state) => state.dop.isEdit);

    const getDOP = () =>{
        API.getmDOPList().then(
            result=>{
                return result;
            }
        )
    } 

    useEffect(() => {
        //getDOP();
    })

    return (
        <div>
            <HeaderChanger title="Master Scope"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            <ScopeList />
        </div>
    );
};

export default mScope;

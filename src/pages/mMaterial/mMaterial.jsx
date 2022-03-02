/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import MaterialList from './mMaterialList';
import {useSelector} from 'react-redux';


const mMaterial = () => {

    return (
        <div>
            <HeaderChanger title="Master Material"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            <MaterialList />
        </div>
    );
};

export default mMaterial;

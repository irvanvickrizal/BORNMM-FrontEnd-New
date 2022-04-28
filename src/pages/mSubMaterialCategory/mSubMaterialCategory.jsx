/* eslint-disable import/named */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from 'react';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API  from '../../utils/apiServices';
import SubMateialCategoryTable from './mSubMaterialCategoryList';
import {useSelector} from 'react-redux';


const mSubMaterialCategory = () => {
    const isNew = useSelector((state) => state.dop.isNew);
    const isEdit = useSelector((state) => state.dop.isEdit);

 

    useEffect(() => {
        //getDOP();
    })

    return (
        <div>
            <HeaderChanger title="Master Sub Material Category"/>
            {/* {isEdit || isNew ? <DOPPanel/> : null} */}
            <SubMateialCategoryTable />
        </div>
    );
};

export default mSubMaterialCategory;

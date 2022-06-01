import React,{useEffect,useState} from 'react'
import TableVehicle from '@app/pages/mVehicle/TableVehicle';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';

export default function masterVehicle() {
    return (
        <div>
            <HeaderChanger title="Master Vehicle"/>
            <TableVehicle/>
        </div>
    )
}

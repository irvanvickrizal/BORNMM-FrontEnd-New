import React,{useEffect,useState} from 'react'
import TablePhoto from '@app/pages/mPhoto/TablePhoto';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';

export default function masterPhoto() {
    return (
        <div>
            <HeaderChanger title="Master Photo Label"/>
            <TablePhoto/>
        </div>
    )
}

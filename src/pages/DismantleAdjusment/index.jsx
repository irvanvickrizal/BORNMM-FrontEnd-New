import React,{useState,useEffect} from 'react'
import TableDismantleAdjusment from '@app/pages/DismantleAdjusment/Table'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'

export default function DismantleAdjusment
() {
    return (
        <div>
            <HeaderChanger title="Dismantle on Progress Adjusmnet"/>
            <TableDismantleAdjusment/>
        
        </div>
    )
}

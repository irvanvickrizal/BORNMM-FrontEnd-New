import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableDopOrderType from '@app/pages/mDopOrderType/TableDopOrderType'


export default function mDopOrderType() {
    return (
        <div>
            <HeaderChanger title="Master DOP Based On Order Type"/>
            <TableDopOrderType/>
        </div>
    )
}

import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableDeliveryType from '@app/pages/mDeliveryType/Table'


export default function masterDeliveryType() {
    return (
        <div>
            <HeaderChanger title="Delivery Type"/>
            <TableDeliveryType/>
        </div>
    )
}

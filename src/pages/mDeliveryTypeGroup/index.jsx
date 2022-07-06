import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableDeliveryTypeGroup from '@app/pages/mDeliveryTypeGroup/Table'


export default function masterDeliveryTypeGroup() {
    return (
        <div>
            <HeaderChanger title="Delivery Type Group"/>
            <TableDeliveryTypeGroup/>
        </div>
    )
}

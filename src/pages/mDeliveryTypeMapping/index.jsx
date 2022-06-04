import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableDeliveryTypeMapping from '@app/pages/mDeliveryTypeMapping/Table'


export default function masterDeliveryTypeMapping() {
    return (
        <div>
            <HeaderChanger title="Delivery Type and Origin Mapping"/>
            <TableDeliveryTypeMapping/>
        </div>
    )
}

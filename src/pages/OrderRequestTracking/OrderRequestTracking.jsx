import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableOrderRequestTracking from '@app/pages/OrderRequestTracking/TableOrderRequestTracking'

export default function OrderRequestTracking() {
    return (
        <div>
            <HeaderChanger title="Order Request Tracking"/>
            <TableOrderRequestTracking/>
        </div>
    )
}

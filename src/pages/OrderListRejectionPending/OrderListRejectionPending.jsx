import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableOrderRejection from '@app/pages/OrderListRejectionPending/TableOrderRejection'

export default function OrderListRejectionPending() {
    return (
        <div>
            <HeaderChanger title="Order Request Rejection Pending List "/>

            <TableOrderRejection/>
        </div>
    )
}

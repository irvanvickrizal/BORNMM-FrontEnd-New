import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableOrderList from '@app/pages/OrderList/TableOrderList'

export default function OrderList() {
    return (
        <div>
            <HeaderChanger title="Order List"/>
            <TableOrderList/>
        </div>
    )
}

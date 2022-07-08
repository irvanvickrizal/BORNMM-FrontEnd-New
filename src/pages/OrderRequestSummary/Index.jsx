import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import Table from '@app/pages/OrderRequestSummary/Table'

export default function OrderRequestSummary() {
    return (
        <div>
            <HeaderChanger title="Order Request Summary"/>
            <Table/>
        </div>
    )
}

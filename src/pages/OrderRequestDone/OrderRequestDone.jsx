import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import Table from '@app/pages/OrderRequestDone/Table'

export default function OutboundStatusReport() {
    return (
        <div>
            <HeaderChanger title="Order Request Done"/>
            <Table/>
        </div>
    )
}

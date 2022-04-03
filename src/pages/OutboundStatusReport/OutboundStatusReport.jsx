import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import Table from '@app/pages/OutboundStatusReport/Table'

export default function OutboundStatusReport() {
    return (
        <div>
            <HeaderChanger title="Outbound Status Report"/>
            <Table/>
        </div>
    )
}

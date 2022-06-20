import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableXDock from '@app/pages/xDockInbound/table'

export default function XDockInbound() {
    return (
        <div>
            <HeaderChanger title="xDock Inbound"/>
            <TableXDock/>
        </div>
    )
}

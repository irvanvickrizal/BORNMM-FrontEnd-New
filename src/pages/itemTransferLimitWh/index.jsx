import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableItemTransferLimitWh from '@app/pages/itemTransferLimitWh/TableItemTransferLimitWh'

export default function itemTransferLimitWh() {
    return (
        <div>
            <HeaderChanger title="WH Item Transfer Limit"/>
            <TableItemTransferLimitWh/>
        </div>
    )
}

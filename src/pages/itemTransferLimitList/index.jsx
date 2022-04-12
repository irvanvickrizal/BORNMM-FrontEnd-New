import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableTransferLimitList from '@app/pages/itemTransferLimitList/TableTransferLimitList'

export default function itemTransferLimitList() {
    return (
        <div>
            <HeaderChanger title="Item Transfer Limit"/>
            <TableTransferLimitList/>
        </div>
    )
}

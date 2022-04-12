import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableTransferAsserRequest from '@app/pages/TransferAssetRequest/TableTransferAsserRequest'

export default function TransferAsserRequest() {
    return (
        <div>
            <HeaderChanger title="Transfer Request"/>
            <TableTransferAsserRequest/>
        </div>
    )
}

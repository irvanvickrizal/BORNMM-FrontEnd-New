import React from 'react'

import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableTransport from "./Table"

export default function TransportAssignmentPending() {
    return (
        <div>
            <HeaderChanger title="Transport Assignment Task Pending"/>
            <TableTransport/>
        </div>
    )
}

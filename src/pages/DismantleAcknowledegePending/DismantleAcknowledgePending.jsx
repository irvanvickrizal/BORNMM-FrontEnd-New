import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableDismantlePending from "./Table"


export default function DismantleAcknowledgePending() {
    return (
        <div>
            <HeaderChanger title="Dismantle Acknowledge Pending"/>
            <TableDismantlePending/>
        </div>
    )
}

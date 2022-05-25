import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableDismantleAckTracking from '@app/pages/DismantleAckTracking/TableDismantleAckTracking'

export default function DismantleAckTracking() {
    return (
        <div>
            <HeaderChanger title="Dismantle ACK Done"/>
            <TableDismantleAckTracking/>
        </div>
    )
}

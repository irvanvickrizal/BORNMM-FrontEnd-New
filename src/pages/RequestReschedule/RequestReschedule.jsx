import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableRequestReschedule from "./TableRequestReschedule"

export default function RequestReschedule() {
    return (
        <div>
            <HeaderChanger title="Reschedule Request"/>
            <TableRequestReschedule/>
        </div>
    )
}

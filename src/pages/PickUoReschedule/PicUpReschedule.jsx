import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TablePickUpReschedule from '@app/pages/PickUoReschedule/TablePickUpReschedule'

export default function PicUpReschedule() {
    return (
        <div>
            <HeaderChanger title="Pick Up Reschedule"/>
            <TablePickUpReschedule/>
        </div>
    )
}

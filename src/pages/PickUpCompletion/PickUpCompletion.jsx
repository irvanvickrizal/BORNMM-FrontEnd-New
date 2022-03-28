import React from 'react'

import TablePickup from '@app/pages/PickUpCompletion/TablePickup'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'

export default function PickUpCompletion() {
    return (
        <div>
            <HeaderChanger title="Pickup Completion"/>
            <TablePickup/>
        </div>
    )
}

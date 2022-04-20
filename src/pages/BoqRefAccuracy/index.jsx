import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableBoqAccuracy from '@app/pages/BoqRefAccuracy/TableBoqAccuracy'

export default function BoqRefAccuracy() {
    return (
        <div>
            <HeaderChanger title="BOQ Accuracy"/>
            <TableBoqAccuracy/>
        </div>
    )
}

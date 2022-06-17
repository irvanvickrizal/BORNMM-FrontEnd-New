import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableSubcon from '@app/pages/ChanheSubconAssigment/TableSubcon'

export default function changeSubcon() {
    return (
        <div>
            <HeaderChanger title="Change Subcon Assignment"/>
            <TableSubcon/>
        </div>
    )
}

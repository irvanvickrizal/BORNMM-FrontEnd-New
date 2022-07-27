import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableFormChecklist from "./Table"

export default function mFormChecklist() {
    return (
        <div>
            <HeaderChanger title="Master Form Cheklist"/>
            <TableFormChecklist/>
        </div>
    )
}

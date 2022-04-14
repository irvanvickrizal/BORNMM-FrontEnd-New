import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableMOrderType from "./Table"

export default function MOrderType() {
    return (
        <div>
            <HeaderChanger title="Master order Type"/>
            <TableMOrderType/>
        </div>
    )
}

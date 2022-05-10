import React from 'react'
import TablePmrInventory from '@app/pages/PmrInventory/TablePmrInventory'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'

export default function PmrInventory() {
    return (
        <div>
            <HeaderChanger title="PMR Inventory"/>
            <TablePmrInventory/>
        </div>
    )
}

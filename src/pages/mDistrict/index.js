import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableMasterDistrict from '@app/pages/mDistrict/Table'

export default function masterDistrict() {
    return (
        <div>
            <HeaderChanger title="Master District"/>
            <TableMasterDistrict/>
        </div>
    )
}

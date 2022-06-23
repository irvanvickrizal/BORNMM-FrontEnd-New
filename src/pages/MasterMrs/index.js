import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableMasterMrs from '@app/pages/MasterMrs/TableMasterMrs'

export default function masterMrs() {
    return (
        <div>
            <HeaderChanger  title="Master MRS"/>
            <TableMasterMrs/>
        </div>
    )
}

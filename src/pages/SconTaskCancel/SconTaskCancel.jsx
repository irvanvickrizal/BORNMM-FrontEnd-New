import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableSubconCancelation from '@app/pages/SconTaskCancel/TableSubconCancelation'

export default function SconTaskCancel() {
    return (
        <div>
            <HeaderChanger title="Subcon Task Cancelation"/>
            <TableSubconCancelation/>
        </div>
    )
}

import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableAtpTemplate from '@app/pages/mAtpTemplate/TableAtpTemplate'

export default function atpTemplate() {
    return (
        <div>
            <HeaderChanger title="ATP Template List"/>
            <TableAtpTemplate/>
        </div>
    )
}

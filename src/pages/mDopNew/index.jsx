import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableDop from '@app/pages/mDopNew/TableDop'

export default function MDopNew() {
    return (
        <div>
            <HeaderChanger title="Master DOP"/>
            <TableDop/>
        </div>
    )
}

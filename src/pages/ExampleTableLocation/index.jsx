import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableSite from "./Table"

export default function SiteLocation() {
    return (
        <div>
            <HeaderChanger title="Site Location Map"/>
            <TableSite/>
        </div>
    )
}

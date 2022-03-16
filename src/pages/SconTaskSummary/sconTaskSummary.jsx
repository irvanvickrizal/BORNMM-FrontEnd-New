import React from 'react'

import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableTaskSummary from '@app/pages/SconTaskSummary/table'

export default function SconTaskSummary() {
    return (
        <div>
            <HeaderChanger title="Subcon Coordinator - Task Assigment Summary"/>
            <TableTaskSummary/>
        </div>
    )
}

import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableLogisticRejectionTask from '@app/pages/LogisticTaskRejection/TableLogisticRejectionTask'

export default function LogisticTaskRejection() {
    return (
        <div>
            <HeaderChanger title="Logistic Task Rejection List"/>
            <TableLogisticRejectionTask/>
        </div>
    )
}

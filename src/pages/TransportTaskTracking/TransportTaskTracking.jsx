import React from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import TableTransportTaskTracking from '@app/pages/TransportTaskTracking/TableTransportTaskTracking'



export default function TransportTaskTracking() {
    return (
        <div>
            <HeaderChanger title="Transport Task Tracking"/>
            <TableTransportTaskTracking/>

        </div>
    )
}

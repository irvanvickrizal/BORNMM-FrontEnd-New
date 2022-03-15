import React from 'react'
import TableSite from './table'
import HeaderChanger from '@app/components/cardheader/HeaderChanger';

export default function SiteListDeliveryRequestType() {
    return (
        <div>
            <HeaderChanger title="Sitelist Delivery Request"/>
            <TableSite/>
        </div>
    )
}

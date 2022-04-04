import React,{useEffect,useState} from 'react'
import {Table,Tooltip,Space,Row} from "antd"
import Search from '@app/components/searchcolumn/SearchColumn'


export default function TableSite() {
    const page=1
    
    const Data = [
        {
            site:"DOP",
            category:"SDR",
            materialCode:"MM-XLMN-01",
            materialDesc:"Item Based",
            origin:"Site",
            location:"Semarang"




        }
    ]

    const columns = [
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Category",
            dataIndex: "site",
            ...Search("site")
        },
        {
            title: "Item Code",
            dataIndex: "materialCode",
            ...Search("materialCode")
        },

        {
            title: "Item Desc",
            dataIndex: "materialDesc",
            ...Search("materialDesc")
        },
        {
            title: "Site Location",
            dataIndex: "location"
        },
    ]
   
    return (
        <div>
            <Table
                columns={columns}
                dataSource={Data}
                
            />
        </div>
    )
}

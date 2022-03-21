import {getAprovalPending, getSno,getOdi} from "@app/store/action/aprovalTaskPendingAction"
import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Table} from "antd"
import {EditOutlined} from "@ant-design/icons"
import {useHistory} from "react-router-dom"
import HeaderChanger from "@app/components/cardheader/HeaderChanger"
import Search from "@app/components/searchcolumn/SearchColumn"


export default function TableAproval() {
    const dispatch = useDispatch()

    const history = useHistory()
    const [page, setPage] = useState(1)
    const [odi, setOdi] = useState("")
    const [sno, setSno] = useState("")

    useEffect(() => {
        dispatch(getAprovalPending())
    }, [])

    const navigateTo = () => {
        history.push(`/sitelist/aprovaltaskpendingform`)
    }

    const handleEdit = (record, e) => {
        setOdi(record)
        setSno(e)
        dispatch(getOdi(record))
        dispatch(getSno(e))
        navigateTo()
    }

    const dataAproval = useSelector(
        (state) => state.aprovalTaskPendingReducer.dataAprovalPending
    )

    const columns = [
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Request No",
            dataIndex: "requestNo",
            ...Search("requestNo")
        },
        {
            title: "Order Type",
            dataIndex: "orderType",
            ...Search("orderType")
        },
        {
            title: "Site No",
            dataIndex: "siteNo",
            ...Search("siteNo")
        },
        {
            title: "Origin",
            dataIndex: "originName",
            ...Search("originName")
            
        },
        {
            title: "Destination",
            dataIndex: "destinationName",
            ...Search("destinationName")
           
            
            
        },
        {
            title: "Site Name",
            dataIndex: "siteName",
            ...Search("siteName")
        },
        {
            title: "Region",
            dataIndex: "region",
            ...Search("region")
        },
        {
            title: "Scope Name",
            dataIndex: "scopeName",
            ...Search("scopeName")
        },
        {
            title: "Scope Detail",
            dataIndex: "scopeDetail",
            ...Search("scopeDetail")
        },
        {
            title: "Delivery Type",
            dataIndex: "deliveryType",
            ...Search("deliveryType")
        },
        {
            title: "Action",
            render: (record, e) => {
                return (
                    <EditOutlined
                        onClick={() => handleEdit(record.orderDetailId, e.sno)}
                    />
                )
            }
        }
    ]

    return (
        <div>
           
            <HeaderChanger title="Approval Task Pending"/>
            <Table
                columns={columns}
                dataSource={dataAproval}
                scroll={{x: "100%"}}
                pagination={{
                    pageSizeOptions: ["5", "10", "20", "30", "40"],
                    showSizeChanger: true,
                    position: ["bottomLeft"]
                }}
                style={{marginTop: 36}}
                size="small"
                bordered
            />
            
        </div>
    )
}

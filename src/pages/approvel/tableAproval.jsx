import {getAprovalPending, getSno} from "@app/store/action/aprovalTaskPendingAction"
import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Table} from "antd"
import {EditOutlined} from "@ant-design/icons"
import {useHistory} from "react-router-dom"
import { getOdi } from "@app/store/action/logistikFormAction"

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
        history.push(`/sitelist/aprovaltaskpendingform?odi=${odi}&sno=${sno}`)
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
            dataIndex: "requestNo"
        },
        {
            title: "Order Type",
            dataIndex: "orderType"
        },
        {
            title: "Site No",
            dataIndex: "siteNo"
        },
        {
            title: "Origin",
            dataIndex: "originName"
        },
        {
            title: "Destination",
            dataIndex: "destinationName"
        },
        {
            title: "Site Name",
            dataIndex: "siteName"
        },
        {
            title: "Region",
            dataIndex: "region"
        },
        {
            title: "Scope Name",
            dataIndex: "scopeName"
        },
        {
            title: "Scope Detail",
            dataIndex: "scopeDetail"
        },
        {
            title: "Delivery Type",
            dataIndex: "deliveryType"
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
            <div className="card card-primary">
                <div className="card-header align-middle">
                    <h3 className="card-title">
                        Order Request Logistic Assignment Pending
                    </h3>
                </div>
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
        </div>
    )
}

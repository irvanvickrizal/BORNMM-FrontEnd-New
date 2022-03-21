import React,{useState,useEffect} from 'react'
import {Table,Modal,Typography,Tooltip,Space} from "antd"
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import API from '@app/utils/apiServices'
import {RedoOutlined,ShoppingCartOutlined } from "@ant-design/icons"


export default function TableTransport() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [page, setPage] = useState(1)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {Title} = Typography

    const [sconTaskPending,setSconTaskPending] = useState([]);

    const getSconTaskPending = () => {
        API.getSconTaskPending().then(
            result=>{
                setSconTaskPending(result);
                console.log("scontaskpendnig",result);
            }
        )
    }

    useEffect(() => {
        getSconTaskPending()
       
    }, [])

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
            title: "Work Package ID",
            dataIndex: "workpackageid"
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
            title: "Assigned By",
            dataIndex: "assignedBy"
        },
        {
            title: "Expected Delivery Date",
            dataIndex: "pickupOrDeliveryDate"
        },
        {
            title: "Incoming Date",
            dataIndex: "incomingDate"
        },
        {
            title: "Action",
            render: (record, e) => {
                return (
                    <Space>
                        <Tooltip title="Assign Transport Team">
                            <ShoppingCartOutlined />
                        </Tooltip>
                        <Tooltip title="Cancel RFP ">
                            <RedoOutlined />
                        </Tooltip>
                      
                    </Space>

                )
            }
        },
    ]

    return (
        <div>
            <Table
                columns={columns}
                dataSource={sconTaskPending}
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

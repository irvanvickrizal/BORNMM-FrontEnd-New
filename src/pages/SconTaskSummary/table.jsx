/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect, useState} from 'react'
import {
    Table,
    Row,
    Col,
    Card,
    Space,
    Typography,
    Form,
    Input,
    Select,
    Tabs,
    Button,
    Switch,
    Modal
} from "antd"
import {useDispatch, useSelector} from "react-redux"
import { getDataDone, getDataOnProgress, getDataPending } from '@app/store/action/taskAssignmentPendingAction'
import {CalendarOutlined,UsergroupAddOutlined,CloseSquareOutlined} from "@ant-design/icons"

export default function TableTaskSummary() {
    const dispatch = useDispatch()
    const {TabPane} = Tabs
    const {Title} = Typography
    const [page,setPage] = useState(1)

    useEffect(() => {
        dispatch(getDataPending())
        dispatch(getDataOnProgress())
        dispatch(getDataDone())
    }, [])
    const stateDataPending =  useSelector(state=>state.taskAssignmentSummaryReducer.dataPending) 
    const stateDataOnProgress =  useSelector(state=>state.taskAssignmentSummaryReducer.dataOnProgress) 
    const stateDataDone =  useSelector(state=>state.taskAssignmentSummaryReducer.dataDone) 
   

    const columnsAssigmentPending = [
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
            dataIndex: "packageName"
        },
        {
            title: "Destination",
            dataIndex: "projectName"
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
            title: "Work Pakgae ID",
            dataIndex: "workpackageid"
        },
        {
            title: "Scope Name",
            dataIndex: "scopeName"
        },
        {
            title: "Pickup Date",
            dataIndex: "pickupOrDeliveryDate"
        },
        {
            title: "Assign To",
            dataIndex: "assignedTo"
        },
        {
            title: "Assign Date",
            dataIndex: "region"
        },
        {
            title: "Task Status",
            dataIndex: "taskStatus"
        },
        {
            title: "Action",
            dataIndex: "",
            render : ()=>{return(
                <Col span={4} md={8} sm={24}> <UsergroupAddOutlined style={{fontSize:"22px"}} /><CalendarOutlined style={{fontSize:"22px"}} /><CloseSquareOutlined  style={{fontSize:"22px",color:"red"}}/></Col>
            )}
        },
    ]
    const columnsAssigmentOnProgress = [
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
            dataIndex: "packageName"
        },
        {
            title: "Destination",
            dataIndex: "projectName"
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
            title: "Work Pakgae ID",
            dataIndex: "workpackageid"
        },
        {
            title: "Scope Name",
            dataIndex: "scopeName"
        },
        {
            title: "Pickup Date",
            dataIndex: "pickupOrDeliveryDate"
        },
        {
            title: "Assign To",
            dataIndex: "assignedTo"
        },
        {
            title: "Assign Date",
            dataIndex: "region"
        },
        {
            title: "Task Status",
            dataIndex: "taskStatus"
        },
        {
            title: "Action",
            dataIndex: ""
        },
    ]
    const columnsAssigmentOnDone = [
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Request No",
            dataIndex: "cpoNo"
        },
        {
            title: "Order Type",
            dataIndex: "requestTypeName"
        },
        {
            title: "Site No",
            dataIndex: "siteNo"
        },

        {
            title: "Origin",
            dataIndex: "packageName"
        },
        {
            title: "Destination",
            dataIndex: "projectName"
        },
        {
            title: "Site Name",
            dataIndex: "region"
        },
        {
            title: "Region",
            dataIndex: "region"
        },
        {
            title: "Work Pakgae ID",
            dataIndex: "region"
        },
        {
            title: "Scope Name",
            dataIndex: "region"
        },
        {
            title: "Pickup Date",
            dataIndex: "region"
        },
        {
            title: "Assign To",
            dataIndex: "region"
        },
        {
            title: "Assign Date",
            dataIndex: "region"
        },
        {
            title: "Task Status",
            dataIndex: "region"
        },
        {
            title: "Task Complete Date",
            dataIndex: "region"
        },
    ]
    const CardTitle = (title) => <Title level={5}>{title}</Title>
    return (
        <div>
            <Tabs defaultActiveKey="1" centered={false}>
                <TabPane tab="Assignment Pending" key="1">
                    <Card title={CardTitle("Assignment Pending")}>
                        <div >
                            <Table
                                columns={columnsAssigmentPending}
                                pagination={false}
                                dataSource={stateDataPending}
                                scroll={{x: "100%"}}
                            />
                        </div>
                    </Card>
                </TabPane>
                <TabPane tab="Assignment On Progress" key="2">
                    <Card title={CardTitle("Assignment On Progress")}>
                        <div >
                            <Table
                                columns={columnsAssigmentOnProgress}
                                pagination={false}
                                dataSource={stateDataOnProgress}
                                scroll={{x: "100%"}}
                            />
                        </div>
                    </Card>
                </TabPane>
                <TabPane tab="Assignment Done" key="3">
                    <Card title={CardTitle("Assignment Done")}>
                        <div >
                            <Table
                                columns={columnsAssigmentOnDone}
                                pagination={false}
                                dataSource={stateDataDone}
                                scroll={{x: "100%"}}
                            />
                        </div>
                    </Card>
                </TabPane>
            </Tabs>
        </div>
    )
}

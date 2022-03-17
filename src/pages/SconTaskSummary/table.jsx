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
    Modal,
    Tooltip
} from "antd"
import {useDispatch, useSelector} from "react-redux"
import { getDataDone, getDataOnProgress, getDataPending } from '@app/store/action/taskAssignmentPendingAction'
import moment from "moment"

import { CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'

export default function TableTaskSummary() {
    const dispatch = useDispatch()
    const {TabPane} = Tabs
    const {Title} = Typography
    const [page,setPage] = useState(1)
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [isModalCancelVisible,setIsModalCancelVisible] = useState(false)


    const showModal = () => {
        setIsModalVisible(true)
    }
    const hideModal = () => {
        setIsModalVisible(false)
    }
    const showModalCancel = () => {
        setIsModalCancelVisible(true)
    }
    const hideModalCancel = () => {
        setIsModalCancelVisible(false)
    }
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
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="Assign Task">
                            <UserAddOutlined style={{fontSize:"16px"}} onClick={showModal} />
                        </Tooltip>
                  
                          
                        <Tooltip title="Request Reschedule">
                            <CalendarTwoTone  style={{fontSize:"16px"}}/>
                        </Tooltip>
                        
                        <Tooltip title="Cancel Task">
                            <CloseSquareTwoTone twoToneColor="#FF0000" style={{fontSize:"16px"}} onClick={showModalCancel}/>
                        </Tooltip>
                    </Space>
                )
            }
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
            dataIndex: "pickupOrDeliveryDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.pickupOrDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
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
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="Assign Task">
                            <UserAddOutlined style={{fontSize:"16px"}} onClick={showModal}/>
                        </Tooltip>
                  
                          
                        <Tooltip title="Request Reschedule">
                            <CalendarTwoTone  style={{fontSize:"16px"}}/>
                        </Tooltip>
                        
                        <Tooltip title="Cancel Task">
                            <CloseSquareTwoTone twoToneColor="#FF0000" style={{fontSize:"16px"}} />
                        </Tooltip>
                    </Space>
                )
            }
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
            <Modal visible={isModalVisible} onCancel={hideModal}
                footer={[
                    <Button key="back"  onClick={hideModal}>
                Cancel
                    </Button>,
                    <Button key="submit" type="primary"  >
                Assign
                    </Button>,
                
                ]}
            >
                <div> <Card  title={CardTitle("Assign Task Form")}>
                    <Form
                        labelCol={{span: 9}}
                        wrapperCol={{span: 13}}
                        layout="horizontal"
                    >
                        <Form.Item label="LSP Name">
                            <Typography>Agility</Typography>
                        </Form.Item>
                        <Form.Item label=" Pick Up Date">
                            <Typography>2022-03-12</Typography>
                        </Form.Item>
                        <Form.Item label="WH Team">
                            <Select
                                
                                placeholder="Select an option"
                            >
                              
                                <Select.Option >
                                    <p>cek</p>
                                </Select.Option>
                              
                            </Select>
                        </Form.Item>
                    </Form>
                </Card>
                </div>
            </Modal>
            <Modal visible={isModalCancelVisible} onCancel={hideModalCancel}
                footer={[
                    <Button key="back"  onClick={hideModalCancel}>
                Close
                    </Button>,
                    <Button key="submit"  >
                Cancel
                    </Button>,
                
                ]}
            >
                <div> <Card  title={CardTitle("Cancel Task")}>
                    <Form
                        labelCol={{span: 9}}
                        wrapperCol={{span: 13}}
                        layout="horizontal"
                    >
                        <Typography>
                        Are you sure you want to Cancel this task? 
(task will be no longer available once it canceled)

                        </Typography>
                    </Form>
                </Card>
                </div>
            </Modal>
        </div>
    )
}

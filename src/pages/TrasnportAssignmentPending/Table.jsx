/* eslint-disable react/jsx-boolean-value */
import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import API from '@app/utils/apiServices'
import {Tabs,InputNumber, Select,Form, Input,Menu, Dropdown, Button,  Spin, Row, Col, Table,Modal,Typography,Tooltip,Space} from 'antd'
import {RedoOutlined,ShoppingCartOutlined,UserSwitchOutlined, CheckCircleTwoTone,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import moment from 'moment';

import { toast } from 'react-toastify';


export default function TableTransport() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [page, setPage] = useState(1)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {Title} = Typography

    const [assignmentTaskPending,setAssignmentTaskPending] = useState([]);
    const [ddlAssignTo,setDDLAssignTo] = useState([]);
    const [isFormAssignment,setIsFormAssignment] = useState(false);
    const [selectedOrderDetailId, setSelectedOrderDetailId]  = useState('')
    const [selectedRequestNo, setSelectedRequestNo]  = useState('')
    const [selectedRFPDate, setSelectedRFPDate]  = useState('')
    const [selectedAssignTo, setSelectedAssignTo]  = useState('')
    const user = useSelector((state) => state.auth.user);
    const [isCancelTask,setIsCancelTask] = useState(false);
    const [cancelLoading,setCancelLoading] = useState(false);
    const [selectedRFPID,setSelectedRFPID] = useState('');
    
    const getSconTaskPending = () => {
        API.getTransportAssignment().then(
            result=>{
                setAssignmentTaskPending(result);
                console.log("scontaskpendnig",result);
            }
        )
    }

    const handleOkCancelTask =() =>{
        setCancelLoading(true)
        const body = ({
            "rfpId":selectedRFPID,
            "orderdetailId": selectedOrderDetailId,
            "LMBY": user.uid   
        })
        console.log(body,"bodycancel")
        API.postCancelRFP(body).then(
            result=>{
                console.log(result,"cancelrfp");
                toast.success(result.message)
                getSconTaskPending();
                setCancelLoading(false)
            }
        )
    }

    const handleCancelCancelTask =() =>{
        setIsCancelTask(false)
    }   

    const getAssignTo = (subconid,wpid) => {
        API.getDDLTransportAssignTo(subconid,wpid).then(
            result=>{
                setDDLAssignTo(result);
                console.log("assignto",result);
            }
        )
    }

    const handleAssign = (data) =>
    {
        console.log(data,"assign transport")
        setSelectedOrderDetailId(data.orderDetailId)
        setSelectedRFPDate(data.rfpDate)
        setSelectedRequestNo(data.requestNo)
        getAssignTo(data.subconId,data.workpackageid);
        setIsFormAssignment(true);
    }

    const handleOKForm = () =>
    {
        const body = ({
            "orderdetailId":selectedOrderDetailId,
            "transferBy": user.uid,
            "transferTo": selectedAssignTo  
        })
        API.postAssitgnTransportTeam(body).then(
            result=>{
                getSconTaskPending();
                setIsFormAssignment(false);
                toast.success(result.message);
                console.log(result,"postassignment")
            }
        )
    }

    const handleCancelRFP = (data) =>
    {
        setIsCancelTask(true)
        setSelectedRFPID(data.rfpId)
        setSelectedOrderDetailId(data.orderDetailId)
    }
    const handleCancelForm = () =>
    {
        setIsFormAssignment(false);
    }
    const handleFailedForm = () =>
    {

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
                            <IconButton
                                size="small"
                                onClick={() => handleAssign(record)}
                                color="primary"
                            >
                                <ShoppingCartOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel RFP ">
                            <IconButton
                                size="small"
                                onClick={() => handleCancelRFP(record)}
                                color="error"
                            >
                                <RedoOutlined />
                            </IconButton>
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
                dataSource={assignmentTaskPending}
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
            <Modal title="Assign Transport Team"
                visible={isFormAssignment}
                destroyOnClose={true}
                footer={null}
                
                onCancel={handleCancelForm}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{
                        'orderDetailId' : selectedOrderDetailId,
                        'requestNo': selectedRequestNo,
                        'rfpDate' : moment(selectedRFPDate).format("YYYY-MM-DD"),
                        // 'taskScheduleId': props.taskScheduleId,
                        // 'subconId': props.subconId,
                        //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                        // remember: true
                    }}
                    onFinish={handleOKForm}
                    onFinishFailed={handleFailedForm}
                    autoComplete="off"
                >
                    <Form.Item
                        // hidden
                        label="Trans Delegate ID"
                        name="transDelegateId"
                        hidden
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        // hidden
                        label="Request No"
                        name="requestNo"
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        // hidden
                        label="RFP Date"
                        name="rfpDate"
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name="assignTo" label="Assign To" 
                        rules={[{ required: true, message: 'Please input Assign To!' }]}
                    >
                        <Select
                            onChange={(e) => setSelectedAssignTo(e)} 
                            placeholder="Select an option">
                            {
                                ddlAssignTo.map(rbs =>  <Select.Option value={rbs.requestTypeId}> 
                                    {rbs.requestTypeName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                            Confirm
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="Cancel Task"
                visible={isCancelTask}
                onOk={handleOkCancelTask}
                onCancel={handleCancelCancelTask}
                confirmLoading={cancelLoading}
                destroyOnClose={true}
            >
                <p>
                Are you sure you want to Cancel RFP Done? 
                </p>
                <p>
                (RFP  Date will be no longer available once it canceled)
                </p>
            </Modal>
        </div>
    )
}

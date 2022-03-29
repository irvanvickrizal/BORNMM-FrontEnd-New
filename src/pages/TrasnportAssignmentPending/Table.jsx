/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-boolean-value */
import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import API from '@app/utils/apiServices'
import {Upload,Tabs,InputNumber, Select,Form, Input,Menu, Dropdown, Button,  Spin, Row, Col, Table,Modal,Typography,Tooltip,Space} from 'antd'
import {EyeOutlined,UploadOutlined,RedoOutlined,ShoppingCartOutlined,UserSwitchOutlined, CheckCircleTwoTone,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import HandshakeIcon from '@mui/icons-material/Handshake';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import moment from 'moment';
import Search from '@app/components/searchcolumn/SearchColumn'
import { toast } from 'react-toastify';


export default function TableTransport() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [page, setPage] = useState(1)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {Title} = Typography

    const [assignmentTaskPending,setAssignmentTaskPending] = useState([]);
    const [evidenceList,setEvidenceList] = useState([]);
    const [ddlAssignTo,setDDLAssignTo] = useState([]);
    const [isFormAssignment,setIsFormAssignment] = useState(false);
    const [selectedOrderDetailId, setSelectedOrderDetailId]  = useState('')
    const [selectedRequestNo, setSelectedRequestNo]  = useState('')
    const [selectedRFPDate, setSelectedRFPDate]  = useState('')
    const [selectedAssignTo, setSelectedAssignTo]  = useState('')
    const user = useSelector((state) => state.auth.user);
    const [isCancelTask,setIsCancelTask] = useState(false);
    const [isHOConfirmation,setIsHOConfirmation] = useState(false);
    const [cancelLoading,setCancelLoading] = useState(false);
    const [selectedRFPID,setSelectedRFPID] = useState('');
    const [selectedCDMRType,setSelectedCDMRType] = useState('');
    
    const [fileUpload, setFileUpload] = useState(null);
    const [uploading, setUploading] = useState(false);

    const props = {
        onRemove: () => {
            setFileUpload(null);
            return fileUpload
        },
        beforeUpload: file => {
            setFileUpload(file);
            return false;
        },
        fileUpload,
    };


    const getSconTaskPending = () => {
        API.getTransportAssignment(user.uid).then(
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
        API.putCancelRFP(body).then(
            result=>{
                console.log(result,"cancelrfp");
                toast.success(result.message)
                getSconTaskPending();
                setCancelLoading(false)
                setIsCancelTask(false)
            }
        )
    }

    const handleCancelCancelTask =() =>{
        setIsCancelTask(false)
    }   
    const handleCancelHOConfirmation =() =>{
        setIsHOConfirmation(false)
    }   

    const getAssignTo = (subconid,wpid) => {
        API.getDDLTransportAssignTo(subconid,wpid).then(
            result=>{
                setDDLAssignTo(result);
                console.log("assignto",result);
            }
        )
    }
    const getEvidenceList = (odi) => {
        API.getEvidence(odi).then(
            result=>{
                setEvidenceList(result);
                console.log("evidence",result);
            }
        )
    }
    const handleDeleteEvidence = (record) => {
        console.log(record,"deleteevi")
        API.deleteEvidene(record.deliveryEvidenceId).then(
            result=>{
                if(result.message=="success"){
                    toast.success(result.message)
                    getEvidenceList(record.orderDetailId)
                }
                else{
                    toast.error(result.message)
                    getEvidenceList(record.orderDetailId)
                }

            }
        )
    }

    const handleAssign = (data) =>
    {
        console.log(data,"assign transport")
        setSelectedOrderDetailId(data.orderDetailId)
        setSelectedRFPDate(data.rfpDate)
        setSelectedRequestNo(data.requestNo)
        getAssignTo(data.transportTeamId,data.workpackageid);
        setIsFormAssignment(true);
    }

    const handleHOConfirmation = (data) =>
    {
        console.log(data,"HO Confirmation")
        setSelectedOrderDetailId(data.orderDetailId)
        setSelectedRFPDate(data.rfpDate)
        setSelectedRequestNo(data.requestNo)
        setSelectedCDMRType(data.cdmrType)
        getEvidenceList(data.orderDetailId);
        setIsHOConfirmation(true);
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
    const handleOKHOForm = () =>
    {
        const body = ({
            "orderdetailId":selectedOrderDetailId,
            "transferBy": user.uid,
            "transferTo": user.uid
        })
        API.postLSPDirectToComplete(body).then(
            result=>{
                getSconTaskPending();
                setIsHOConfirmation(false);
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
            width: 50,
            render: (value, item, index) => page + index
        },
        {
            title: "Request No",
            dataIndex: "requestNo",
            ...Search('requestNo'),
        },
        {
            title: "Order Type",
            dataIndex: "orderType",
            ...Search('orderType'),
        },
        {
            title: "Site No",
            dataIndex: "siteNo",
            ...Search('siteNo'),
        },
        {
            title: "Origin",
            dataIndex: "originName",
            ...Search('originName'),
        },
        {
            title: "Destination",
            dataIndex: "destinationName",
            ...Search('destinationName'),
        },
        {
            title: "cdmrType",
            dataIndex: "cdmrType",
            ...Search('cdmrType'),
        },
        {
            title: "Site Name",
            dataIndex: "siteName",
            ...Search('siteName'),
        },
        {
            title: "Region",
            dataIndex: "region",
            ...Search('region'),
        },
        {
            title: "Work Package ID",
            dataIndex: "workpackageid",
            ...Search('workpackageid'),
        },
        {
            title: "Scope Name",
            dataIndex: "scopeName",
            ...Search('scopeName'),
        },
        {
            title: "Scope Detail",
            dataIndex: "scopeDetail",
            ...Search('scopeDetail'),
        },
        {
            title: "Assigned By",
            dataIndex: "assignedBy",
            ...Search('assignedBy'),
        },
        {
            title: "Expected Delivery Date",
            dataIndex: "pickupOrDeliveryDate",
            ...Search('pickupOrDeliveryDate'),
        },
        {
            title: "Incoming Date",
            dataIndex: "incomingDate",
            ...Search('incomingDate'),
        },
        {
            title: "Action",
            fixed: "right",
            align: "center",
            width: 120,
            render: (record, e) => {
                return (
                    <Space>
                        {
                            record.hoInWH ? <Tooltip title="HO Complete">
                                <IconButton
                                    size="small"
                                    onClick={() => handleHOConfirmation(record)}
                                    color="primary"
                                >
                                    <HandshakeIcon  />
                                </IconButton>
                            </Tooltip> :
                                <></>
                        }
                        {
                            record.hoInField ? <Tooltip title="Assign Transport Team">
                                <IconButton
                                    size="small"
                                    onClick={() => handleAssign(record)}
                                    color="primary"
                                >
                                    <ShoppingCartOutlined />
                                </IconButton>
                            </Tooltip> :
                                <></>
                        }
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
    const columnsModal = [
        {
            title: "No",
            key: "index",
            width: 50,
            render: (value, item, index) => page + index
        },
        {
            title: "File Name",
            dataIndex: "evidencePath",
            ...Search('evidencePath'),
        },
        {
            title: "Action",
            fixed: "right",
            align: "center",
            width: 100,
            render: (record, e) => {
                return (
                    <Space>
                        <Tooltip title="View Document ">
                            <IconButton
                                size="small"
                                onClick={() => handleCancelRFP(record)}
                                color="primary"
                            >
                                <EyeOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Evidence ">
                            <IconButton
                                size="small"
                                onClick={() => handleDeleteEvidence(record)}
                                color="error"
                            >
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                      
                    </Space>

                )
            }
        },
    ]

    const handleUpload = () => {
        setUploading(true)
        
        API.postFileHOConfirm(selectedOrderDetailId,0,user.uid,fileUpload).then(
            result=>{
                if(result.status=="success"){
                    setFileUpload(null);
                    setUploading(false);
                    getEvidenceList(selectedOrderDetailId)
                    props.onRemove();
                    toast.success('upload successfully.');
                    // setIsHOConfirmation(false)
                }
                else{
                    setFileUpload(null);
                    setUploading(false);
                    props.onRemove();
                    // setIsHOConfirmation(false)
                }

                console.log('i am PO upload xx',result)
            }
        );
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={assignmentTaskPending}
                scroll={{x: "200%"}}
                pagination={{
                    pageSizeOptions: ["5", "10", "20", "30", "40"],
                    showSizeChanger: true,
                    position: ["bottomLeft"]
                }}
                style={{marginTop: 36}}
                size="small"
                bordered
            />
            <Modal title="HO Confirmation"
                visible={isHOConfirmation}
                destroyOnClose={true}
                footer={null}
                onCancel={handleCancelHOConfirmation}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{
                        'orderDetailId' : selectedOrderDetailId,
                        'requestNo': selectedRequestNo,
                        'rfpDate' : moment(selectedRFPDate).format("YYYY-MM-DD"),
                        'deliveryType' : selectedCDMRType,
                        // 'taskScheduleId': props.taskScheduleId,
                        // 'subconId': props.subconId,
                        //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                        // remember: true
                    }}
                    onFinish={handleOKHOForm}
                    onFinishFailed={handleFailedForm}
                    autoComplete="off"
                >
                    <Form.Item
                        // hidden
                        label="orderDetailId"
                        name="orderDetailId"
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
                    <Form.Item
                        // hidden
                        label="Delivery Type"
                        name="deliveryType"
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name="uploadFile" label="DN Upload" 
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={fileUpload == null}
                            loading={uploading}
                            style={{ marginTop: 16 }}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </Form.Item>

                    <Table
                        columns={columnsModal}
                        dataSource={evidenceList}
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
                    
                    <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                            Confirm
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
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
                                ddlAssignTo.map(rbs =>  <Select.Option value={rbs.userId}> 
                                    {rbs.fullname}</Select.Option>)
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

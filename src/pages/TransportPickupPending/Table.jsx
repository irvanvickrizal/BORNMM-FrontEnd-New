/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Tabs,InputNumber, Select,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {UserSwitchOutlined, CheckCircleTwoTone,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import API from '@app/utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import { toast } from 'react-toastify';



const TransportPickupTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [pickupPendingList,setPickupPendingList] = useState([]);
    const [isFormPickup,setIsFormPickup] = useState(false);
    const [formLoading,setFormLoading] = useState(false);
    const [transDelegateId,setTransDelegateId] = useState('');
    const [selectedRequestNo,setRequestNo] = useState('');
    const [selectedAssignBy,setSelectedAssignBy] = useState('');
    const [selectedAssignTo,setSelectedAssignTo] = useState('');
    const [selectedRFPDate,setSelectedRFPDate] = useState('');
    const [ddlAssignTo,setDDLAssignTo] = useState([]);
    const { TabPane } = Tabs;
    const user = useSelector((state) => state.auth.user);

    
    const getPickupPending = () => {
        setIsLoading(true);
        API.getTransportPickupPending().then(
            result=>{
                setPickupPendingList(result);
                setIsLoading(false);
                console.log("waiting pickup pending",result);
            }
        )
    }

    const handleOKForm = (record) =>{
        console.log(record,"ok form RFP")
        setIsLoading(true);
        const body = ({
            "transDelegateId":record.transDelegateId,
            "transferBy": user.uid,
            "transferTo": selectedAssignTo   
        })
        console.log(body,"body")
        API.putReAssignTransportTeam(body).then(
            result=>{
                setIsLoading(false);
                getPickupPending();
                console.log("waiting post rfp",result);
            }
        )
    }

    const getAssignTo = (subconid,wpid) => {
        API.getDDLTransportAssignTo(subconid,wpid).then(
            result=>{
                setDDLAssignTo(result);
                console.log("assignto",result);
            }
        )
    }
    const handleCancelForm = () =>{
        setIsFormPickup(false);
    }

    const handleFailedForm = () =>{
        
    }

    const handleRFPForm = (record) => {
        setTransDelegateId(record.transDelegateId);
        setRequestNo(record.requestNo);
        setSelectedRFPDate(record.rfpDate);
        getAssignTo(record.subconId,record.workpackageid);
        setSelectedAssignBy(record.assignedBy);
        setIsFormPickup(true);
        console.log("pickup form",record);
    }


    const columns = [
        {
            title : "No",
            render: (value, item, index) => 1 + index
        },
        {
            title : "Request No",
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            title : "Order Type",
            dataIndex:'orderType',
            ...Search('orderType'),
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Origin",
            dataIndex:'originName',
            ...Search('originName'),
        },
        {
            title : "Destination",
            dataIndex:'destinationName',
            ...Search('destinationName'),
        },
        {
            title : "Site Name",
            dataIndex:'siteName',
            ...Search('siteName'),
        },
        {
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            title : "WorkpackageId",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
        },
        {
            title : "Scope Name",
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title : "Scope Detail",
            dataIndex:'scopeDetail',
            ...Search('scopeDetail'),
        },
        {
            title : "Expected Delivery Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.pickupOrDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('pickupOrDeliveryDate'),
        },
        {
            title : "Assign By",
            dataIndex:'assignedBy',
            ...Search('assignBy'),
        },
        {
            title : "Assign To",
            dataIndex:'assignBy',
            ...Search('assignBy'),
        },
        {
            title:"Incoming Date",
            dataIndex:'incomingDate',
            ...Search('incomingDate'),
            
        },
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed:'right',
            render:(record)=>{
                return (
                    <div>
                        {record.scheduleStatus=="newpropose" ? <p style={{ color:'red' }}>Propose New Schedule Request</p>
                            :
                            <Space>
                                <IconButton
                                    size="small"
                                    onClick={() => handleRFPForm(record)}
                                    color="primary"
                                >
                                    <UserSwitchOutlined twoToneColor="#52c41a" />
                                </IconButton>
                            </Space>
                        }
                    </div>
                    
                   
                )
            }
            
        },
        
    
    ]

    useEffect(() => {
        getPickupPending();
    },[])

    return(
        isLoading ?   
            <Row justify="center">
                <Col span={1}>    
                    <Spin />
                </Col>
            </Row>  
            :
            <>
                <Table
                    // scroll={{ x: '100%' }}
                    scroll={{ x: 1500, y: 300 }}
                    // size="small"
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={pickupPendingList}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />
                <Modal title="ReAssignment Task"
                    visible={isFormPickup}
                    destroyOnClose={true}
                    footer={null}
                
                    onCancel={handleCancelForm}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        initialValues={{
                            'transDelegateId' : transDelegateId,
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
                </Modal></>

            
    )
}

export default TransportPickupTable;
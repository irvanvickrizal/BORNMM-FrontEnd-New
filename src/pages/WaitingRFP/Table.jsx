/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Tabs,InputNumber, Select,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import { CheckCircleTwoTone,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import API from '@app/utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';

import { toast } from 'react-toastify';


const WaitingRFPTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [waitingRFP,setWaitingRFP] = useState([]);
    const [isFormRFP,setIsFormRFP] = useState(false);
    const [formLoading,setFormLoading] = useState(false);
    const [orderDetailId,setOrderDetailId] = useState('');
    const [selectedRequestNo,setRequestNo] = useState('');
    const [selectedOrderRequestNo,setOrderRequestNo] = useState('');
    const [selectedOrderType,setOrderType] = useState('');
    const [selectedPickuporDeliveryDate,setPickuporDeliveryDate] = useState('');
    const { TabPane } = Tabs;
    const user = useSelector((state) => state.auth.user);

    
    const getWaitingRFP = () => {
        setIsLoading(true);
        API.getWaitingRFP(user.uid).then(
            result=>{
                setWaitingRFP(result);
                setIsLoading(false);
                console.log("waiting rfp",result);
            }
        )
    }

    const handleOKForm = (record) =>{
        console.log(record,"ok form RFP")
        setIsLoading(true);
        const body = ({
            "orderdetailId":record.orderDetailId,
            "totalCollies":record.totalCollies,
            "totalVolume":record.totalVolume,
            "LMBY": user.uid    
        })
        console.log(body,"body")
        API.postWaitingRFP(body).then(
            result=>{
                setIsLoading(false);
                getWaitingRFP();
                setIsFormRFP(false);
                toast.success(result.message)
                console.log("waiting post rfp",result);
            }
        )
    }

    const handleCancelForm = () =>{
        setIsFormRFP(false);
    }

    const handleFailedForm = () =>{
        
    }

    const handleRFPForm = (record) => {
        setOrderDetailId(record.orderDetailId);
        setRequestNo(record.requestNo);
        setOrderType(record.orderType);
        setOrderRequestNo(record.orderRquestNo)
        setPickuporDeliveryDate(record.pickupOrDeliveryDate);

        setIsFormRFP(true);
        console.log("rfp form",record);
    }


    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Request No",
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            title : "Order No",
            dataIndex:'orderRequestNo',
            ...Search('orderRequestNo'),
        },
        {
            title : "Order Type",
            dataIndex:'orderType',
            ...Search('orderType'),
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
            title : "Site ID",
            dataIndex:'siteNo',
            ...Search('siteNo'),
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
            title : "Scope Detail",
            dataIndex:'scopeDetail',
            ...Search('scopeDetail'),
        },
        {
            title : "Requested By",
            dataIndex:'requestedBy',
            ...Search('requestedBy'),
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
            title:"Incoming Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.incomingDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </Space>
                )
            },
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
                                <Tooltip title="RFP Done">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRFPForm(record)}
                                    >
                                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    </IconButton>
                                </Tooltip>
                                
                            </Space>
                        }
                    </div>
                    
                   
                )
            }
            
        },
        
    
    ]

    useEffect(() => {
        getWaitingRFP();
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
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Delivery Request" key="1">
                        <Table
                            // scroll={{ x: '100%' }}
                            scroll={{ x: 1500, y: 300 }}
                            // size="small"
                            // expandable={{ expandedRowRender }}
                            columns={columns}
                            dataSource={waitingRFP}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            bordered />
                    </TabPane>
                    <TabPane tab="Return Pickup Request" key="2">
                        Return Pickup Request
                    </TabPane>
                </Tabs>
                <Modal title="Cancel Task"
                    visible={isFormRFP}
                    confirmLoading={formLoading}
                    destroyOnClose={true}
                    footer={null}
                
                    onCancel={handleCancelForm}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        initialValues={{
                            'orderDetailId' : orderDetailId,
                            'requestNo': selectedRequestNo,
                            'orderRequestNo': selectedOrderRequestNo,
                            'orderType': selectedOrderType,
                            'pickupOrDeliveryDate' : moment(selectedPickuporDeliveryDate).format("YYYY-MM-DD"),
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
                            label="Order Detail ID"
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
                            label="Order Req No"
                            name="orderReqNo"
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                        // hidden
                            label="Order Type"
                            name="orderType"
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                        // hidden
                            label="Expected Delivery Date"
                            name="pickupOrDeliveryDate"
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                        // hidden
                            label="Total Collies"
                            name="totalCollies"
                            rules={[{ required: true, message: 'Please input Total Collies!' }]}
                        >
                            <InputNumber
                                style={{ width: 200 }}
                                defaultValue="0"
                                min="0"
                                step="0.01"
                                // onChange={onChange}
                                stringMode
                            />
                        </Form.Item>
                        <Form.Item
                        // hidden
                            label="Total Volume"
                            name="totalVolume"
                            rules={[{ required: true, message: 'Please input Total Volume!' }]}
                        >
                            <InputNumber
                                style={{ width: 200 }}
                                defaultValue="0"
                                min="0"
                                step="0.01"
                                // onChange={onChange}
                                stringMode
                            />
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

export default WaitingRFPTable;
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Tabs,InputNumber,Typography, Card,Select,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import { CheckCircleTwoTone,EyeFilled ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import API from '@app/utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import BackspaceIcon from '@mui/icons-material/Backspace';

import { toast } from 'react-toastify';


const WaitingRFPTable = () => {
    const [page,setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true);
    const [waitingRFP,setWaitingRFP] = useState([]);
    const [isFormRFP,setIsFormRFP] = useState(false);
    const [formLoading,setFormLoading] = useState(false);
    const [orderDetailId,setOrderDetailId] = useState('');
    const [selectedRequestNo,setRequestNo] = useState('');
    const [selectedOrderRequestNo,setOrderRequestNo] = useState('');
    const [selectedOrderType,setOrderType] = useState('');
    const [selectedPickuporDeliveryDate,setPickuporDeliveryDate] = useState('');
    const [isModalResetVisible,setIsModalResetVisible] = useState(false)
    const [remarks,setRemarks] = useState("")
    const { TabPane } = Tabs;
    const user = useSelector((state) => state.auth.user);
    const [logisticOrderDetailId,setLogisticOrderDetailId] = useState("")
    const { TextArea } = Input;
    const[parentOdi,setParentOdi] = useState("")
    const[parentRequestNo,setParentRequestNo] = useState("")
    const [dataOrderDetail,setDataOrderDetail] = useState([])
    const [dataMaterial,setDataMaterial] = useState([])
    const [dataLog,setDataLog] = useState([])
    const [isModalTabVisible,setIsModalTabVisible] = useState(false)
    const [isPickupRequest,setIsPickupRequest] = useState(false)
    const {Title,Link} = Typography
    
    const CardTitle = (title) => {
        return (
            <Row>
                <Space align="center">
                    <Title style={{ align:'center' }} level={5}>{title}</Title> 
                </Space>
            </Row>
        )
    }

    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window
        return { width, height }
    }

    const useWindowDimensions = () => {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
 
        useEffect(() => {
            const handleResize = () => setWindowDimensions(getWindowDimensions())
 
            window.addEventListener('resize', handleResize)
 
            return () => window.removeEventListener('resize', handleResize)
 
        }, [])
 
        return windowDimensions
    }

    const { width } = useWindowDimensions();


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

    function getOrderDetail(data) {
        //setIsLoading(true);
        API.getOrderRequest(data).then(
            result=>{
                setDataOrderDetail(result);
                setParentOdi(result[0]?.parentOrderDetailId)
                setParentRequestNo(result[0]?.parentRequestNo)
                //setIsLoading(false);
                console.log("data order detail =>",result);
            }
        )
    }
    function getMaterial(data) {
        console.log(parentOdi,"parent Odi")
        console.log(parentRequestNo,"parent request")
        if(parentOdi>0){
            API.getMaterial(parentOdi).then(
                result=>{
                    setDataMaterial(result);
                    //setIsLoading(false);
                    console.log("data order Material parent odi =>",result);
                }
            )
        } else {
            API.getMaterial(orderDetailId).then(
                result=>{
                    setDataMaterial(result);
                    //setIsLoading(false);
                    console.log("data order Material =>",result);
                }
            )
        }
    }
    function getLog(data) {
        //setIsLoading(true);
        API.getLog(orderDetailId).then(
            result=>{
                setDataLog(result);
                //setIsLoading(false);
                console.log("data order Material =>",result);
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

    const hideModalTab = () => {
        setIsModalTabVisible(false)
        setDataOrderDetail([])
    }
    const showModalTab = (data) => {
      
        setIsModalTabVisible(true)
        setOrderDetailId(data)
        getOrderDetail(data)
    }

    const handleRFPForm = (record) => {
        setOrderDetailId(record.orderDetailId);
        setRequestNo(record.requestNo);
        setOrderType(record.orderType);
        setOrderRequestNo(record.orderRequestNo)
        setPickuporDeliveryDate(record.pickupOrDeliveryDate);
        setIsPickupRequest(record.isPickupRequest)
        setIsFormRFP(true);
        console.log("rfp form",record);
    }

    const showModalReset = (record) => {
        setIsModalResetVisible(true)
        setLogisticOrderDetailId(record.logisticOrderDetailId)
    }
    const hideModalReset = () => {
        setIsModalResetVisible(false)
    }

    const handleDelete = (record) =>{
        console.log(record,"ok form delete")
        setIsLoading(true);
        const body = ({
            "logisticOrderDetailId":logisticOrderDetailId,
            "transportRejectedBy":user.uid ,
            "reasonOfRejection":remarks,
             
        })
        console.log(body,"body")
        API.deleteWaitingRfp(body).then(
            result=>{
            
                if(result.status=="success")
                {
                    setIsLoading(false);
                    toast.success(result.message);
                    getWaitingRFP();
                    setIsModalResetVisible(false)
                }
                else{
                    toast.error(result.message)
                }
            }
        )
    }
    

    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Order Request No",
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
            title : "CDMR Type",
            dataIndex:'cdmrType',
            ...Search('cdmrType'),
        },
        {
            title : "Delivery Mode",
            dataIndex:'deliveryMode',
            ...Search('deliveryMode'),
        },
        {
            title : "Request Delivery / pickup Date",
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
            title : "Logistic Note",
            dataIndex:'logisticNote',
            ...Search('requestedBy'),
        },
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed:'right',
            render:(record)=>{
                return (
                    <div>
                        <Space>
                            {record.isPickupRequest ? 
                                record.dayToGo <= 1 ?
                                    <Tooltip title="RFP Done">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleRFPForm(record)}
                                        >
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                        </IconButton>
                                    </Tooltip>

                                    :

                                    <Tooltip title="rfp for pickup req should be h-1" color="#ff0000">
                                        <IconButton
                                            size="small"
                                            
                                        >
                                            <CheckCircleTwoTone twoToneColor="#777772" />
                                        </IconButton>
                                    </Tooltip>
                                :
                            
                                record.scheduleStatus=="newpropose" ? <p style={{ color:'red' }}>Propose New Schedule Request</p>
                                    :

                                    <Tooltip title="RFP Done">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleRFPForm(record)}
                                        >
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                        </IconButton>
                                    </Tooltip>
                            
                            }
                            <Tooltip title="Order Request Rejection">
                                <IconButton
                                    size="small"
                                    onClick={() => showModalReset(record)}
                                >
                                    <BackspaceIcon style={{color:'#e84141'}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="View Detail">
                                <EyeFilled style={{fontSize:20, color:'#008de3'}} onClick={()=>showModalTab(record.orderDetailId)}/>  
                            </Tooltip>
                        </Space>
                    </div>
                )
            }
            
        },
        
    
    ]

    useEffect(() => {
        getWaitingRFP();
    },[])

    const columnsOrder = [
   
        {
            title : "CPO No",
            dataIndex:'cpoNo',
         
        },
        {
            title : "CT Name",
            dataIndex:'ctName',
         
        },
        {
            title : "Inventory Code",
            dataIndex:'inventoryCode',
         
        },
  
        {
            title : "Order Type",
            dataIndex:'orderType',
     
        },
        {
            title : "Request No",
            dataIndex:'requestNo',
      
        },
        {
            title : "Package Name",
            dataIndex:'packageName',
   
        },
        {
            title : "Project Name",
            dataIndex:'projectName',
   
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
      
        },
        {
            title : "Zone",
            dataIndex:'zone',
    
        },
        {
            title : "Region",
            dataIndex:'region',
        
        },
           
        {
            title : "Workpackage Id",
            dataIndex:'workpackageId',
      
        },
 
   
 
       
        {
            title : "Site Name",
            dataIndex:'siteName',
            responsive: ['md'],
     
        },
        {
            title : "Requester",
            dataIndex:'requesterName',
            responsive: ['md'],
   
        },
        {
            title : "Dismantle By",
            dataIndex:'recipientOrDismantledBy',
            responsive: ['md'],
   
        },

 
        {
            title : "Request Date",
            render:(record)=>{
                return (
                    <Space>
                        <Typography>{moment(record.requestDate).format("YYYY-MM-DD hh:mm:ss")}</Typography>
                    </Space>
                )
            },
            responsive: ['md'],
    
        },
        {
            title : "Incoming Date",
            render:(record)=>{
                return (
                    <Space>
                        <Typography>{moment(record.incomingDate).format("YYYY-MM-DD")}</Typography>
                    </Space>
                )
            },
            responsive: ['md'],
      
        },
        {
            title : "Expected Delivery Date",
            render:(record)=>{
                return (
                    <Space>
                        <Typography>{moment(record.expectedDeliveryDate).format("YYYY-MM-DD")}</Typography>
                    </Space>
                )
            },
            responsive: ['md'],
   
        },

    ]

    const columnsMaterial = [
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
            title: "BOQ Ref QTY",
            dataIndex: "refQTY"
        },
        {
            title: "Current Req QTY",
            dataIndex: "reqQTY"
        },
   
        {
            title: "Total BOQ Req QTY",
            dataIndex: "totalReqQTY"
        },
        {
            title: "Delta QTY",
   
            render:(record)=>{
                return (
                    <div>
                        {record?.deltaBOQRefQTY < 0 ? ( <Typography style={{color:"red"}}>
                            {record.deltaBOQRefQTY}
                        </Typography>):( <Typography >
                            {record.deltaBOQRefQTY}
                        </Typography>)}
                       
                    </div>
                )
            },
        }
    ]

    const columnsLog = [
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Incoming Date",
            dataIndex: "incomingDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.incomingDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
        },
        {
            title: "Execute Date",
            dataIndex: "executeDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.executeDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
        },

        {
            title: "Execute By",
            dataIndex: "executedBy",
        },
        {
            title: "Event Desc",
            dataIndex: "taskName"
        },
        {
            title: "Remarks",
            dataIndex: "remarks"
        }
    ]

    function callback(key) {
        if(key==1){
            getOrderDetail(orderDetailId)
        }
        else if(key==2){
            getMaterial()
        }
        else if(key==3){
            getLog()
        }
        console.log("keytabs",key);
    }

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
                    scroll={{ x: 2500, y: 300 }}
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
                <Modal title="RFP Confirmation"
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
                            label="Order Req No"
                            name="orderRequestNo"
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

                        {isPickupRequest ? 
                            <Form.Item
                                // hidden
                                label="Total Collies"
                                name="totalCollies"
                                // rules={[{ required: true, message: 'Please input Total Collies!' }]}
                            >
                                <InputNumber
                                    style={{ width: 200 }}
                                    defaultValue="0"
                                    min="0"
                                    step="0.01"
                                    // onChange={onChange}
                                    stringMode
                                    disabled
                                />
                            </Form.Item> :
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
                        }
                        {isPickupRequest ? 
                            <Form.Item
                                // hidden
                                label="Total Volume (CBM)"
                                name="totalVolume"
                                // rules={[{ required: true, message: 'Please input Total Volume!' }]}
                            >
                                <InputNumber
                                    style={{ width: 200 }}
                                    defaultValue="0"
                                    min="0"
                                    step="0.01"
                                    // onChange={onChange}
                                    stringMode
                                    disabled
                                />
                            </Form.Item> 
                            :
                            <Form.Item
                                // hidden
                                label="Total Volume (CBM)"
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
                        }
                        
                        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                            Confirm
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="Material List" visible={isModalResetVisible}  onCancel={hideModalReset} 
                    footer={
                        remarks.length <= 10 ? ( [
                    
                            <Button disabled key="back" type="danger" onClick={handleDelete} >
                    Reject
                            </Button>,
                            <Button key="submit"  onClick={hideModalReset} >
                    Close
                            </Button>,
                    
                        ]):( [
                    
                            <Button key="back" type="danger" onClick={handleDelete} >
                    Reject
                            </Button>,
                            <Button key="submit"  onClick={hideModalReset} >
                    Close
                            </Button>,
                       
                    
                        ])}
                >
                    <Typography>Remarks Of Rejection :
                    </Typography>
                    <TextArea rows={4} onChange={(e) => setRemarks(e.target.value)} placeHolder="Min 10 Characters"/>
      
                </Modal>

                {/*  Modal getData */}
                <Modal visible={isModalTabVisible}  onCancel={hideModalTab} 
                    footer={[
          
                    ]} 
                    style={{ width: (80 * width / 100), minWidth: (80 * width / 100) }}
                    zIndex={9999}    
                >
                    <Tabs defaultActiveKey="1" centered={false}  onChange={callback}>
                        <TabPane tab="Order Request Detail" key="1">
                            {dataOrderDetail?.length == 0 ? (<></>):(
                                <Card title={CardTitle("Order Request Detail")}>
                                    <div style={{display:"flex",flexDirection:"row"}}>
                                        <Col span={12}>
                              
                                            <Form
                                                labelCol={{span: 8}}
                                                wrapperCol={{span: 14}}
                                                layout="horizontal"
                                                initialValues={{
                                                    "orderType":dataOrderDetail[0].orderType,
                                        
                                                    "ctName":dataOrderDetail[0].ctName,
                                                    "invCode":dataOrderDetail[0].inventoryCode,
                                                    "requestNo":dataOrderDetail[0].requestNo,
                                                    "packageName":dataOrderDetail[0].packageName,
                                                    "projectName":dataOrderDetail[0].projectName,
                                            
                                                    "requesterName":dataOrderDetail[0].requesterName,

                                                }}
                                    
                                            >
                                                <Form.Item label="Package Name" name="packageName">
                                                    <Input
                                                        disabled style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}/>
                                                </Form.Item>

                                                <Form.Item label="CT Name"  name="ctName"
                                                    value={
                                                        dataOrderDetail[0]?.ctName 
                                                    }
                                                >
                                                    <Input
                                                        disabled  style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}/>
                                                </Form.Item><Form.Item label="Inventory Code" name="invCode">
                                                    <Input
                                                        disabled  style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}/>
                                                </Form.Item><Form.Item
                                                    label="Order Type"
                                                    name="orderType"
    
                                                >
                                                    <Input disabled style={{backgroundColor:"white",color:"#000",fontWeight:"500"}} />
                                                </Form.Item><Form.Item label="Request No" name="requestNo">
                                                    <Input
                                                        disabled  style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}/>
                                                </Form.Item>
                                       
                                                <Form.Item label="Project Name" name="projectName">
                                                    <Input disabled  style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}/>
                                                </Form.Item>
                                                <Form.Item label="Requester" name="requesterName">
                                                    <Input
                                                        disabled
                                                        style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}
                                                    />
                                                </Form.Item>
                                           
                                            
                                         
                                            </Form>
                              
                                        </Col>
                                        <Col span={12}>
                           
                                            <Form
                                                labelCol={{span: 8}}
                                                wrapperCol={{span: 14}}
                                                layout="horizontal"
                                                initialValues={{
                                                    "wpId":dataOrderDetail[0].workpackageId,
                                                    "region":dataOrderDetail[0].region,
                                                    "siteName":dataOrderDetail[0].siteName,
                                                    "siteNo":dataOrderDetail[0].siteNo,
                                                    "cpoNo":dataOrderDetail[0].cpoNo,
                                                    "recipientOrDismantledBy":dataOrderDetail[0].recipientOrDismantledBy,
                                                    "requestDate":moment(dataOrderDetail[0].requestDate).format("YYYY-MM-DD,hh:mm:ss"),
                                                    "incomingDate":moment(dataOrderDetail[0].incomingDate).format("YYYY-MM-DD,hh:mm:ss"),
                                                    "expectedDate":moment(dataOrderDetail[0].expectedDeliveryDate).format("YYYY-MM-DD"),
                                                    "zone":dataOrderDetail[0].zone,

                                                }}
                                            >
                                                <Form.Item label="CPO No" name="cpoNo"
                                             
                                                >
                                                    <Input
                                                        disabled  style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}/>
                                                </Form.Item>

                                                <Form.Item label="Site No" name="siteNo">
                                                    <Input
                                                        disabled  style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}/>
                                                </Form.Item>
                                                <Form.Item label="Zone" name="zone">
                                                    <Input
                                                        disabled style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}/>
                                                </Form.Item>
                                           
                                                <Form.Item label="Region" name="region">
                                                    <Input
                                                        disabled
                                                        style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}
                                                    />
                                                </Form.Item>
                                                <Form.Item label="WorkPackage ID" name="wpId">
                                                    <Input
                                                        disabled
                                                        style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}
                                                    />
                                                </Form.Item>
                                                <Form.Item label="Site Name" name="siteName">
                                                    <Input
                                                        disabled
                                                        style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}
                                                    />
                                                </Form.Item>
                                      
                                                <Form.Item label="Dismantle By" name="recipientOrDismantledBy">
                                                    <Input
                                                        disabled
                                                        style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}
                                                    />
                                                </Form.Item>
                                                <Form.Item label="Request Date" name="requestDate">
                                                    <Input
                                                        disabled
                                                        style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}
                                                    />
                                                </Form.Item>
                                                <Form.Item label="Incoming Date" name="incomingDate">
                                                    <Input
                                                        disabled
                                                        style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}
                                                    />
                                                </Form.Item>
                                                <Form.Item label="Expected Delivery Date" name="expectedDate">
                                                    <Input
                                                        disabled
                                                        style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}
                                                    />
                                                </Form.Item>
                                      
                          
                                               
                                                {/* <Form.Item>
                                        <Button type="primary" htmlType="submit">Confirm</Button>
                                        <Button type="danger">Cancel</Button>
                                    </Form.Item> */}
                                            </Form>
                             
                                        </Col>
                             
                                    </div>
                                </Card>
                           
                            )}
                    
                        </TabPane>
                        <TabPane tab="Material Order" key="2">
                            <Card>
                                {parentOdi ? parentOdi>0 ? 
                                    <b>Parent Request No : {parentRequestNo}</b>
                                    : null
                                    :
                                    null
                                }
                                <div >
                                    { isLoading ?   
                                        <Row justify="center">
                                            <Col span={1}>    
                                                <Spin />
                                            </Col>
                                        </Row>  
                                        :
                                        <Table
                                            columns={columnsMaterial}
                                            pagination={false}
                                            // pagination={{
                                            //     pageSizeOptions: ['5', '10', '20', '30', '40'],
                                            //     showSizeChanger: true,
                                            //     position: ["bottomLeft"],
                                            // }}
                                            dataSource={dataMaterial}
                                            scroll={{ x: '100%' ,y: 240  }} 
                                            footer={null}
                                            size="medium"
                                        />
                                    }
                                </div>
                            </Card>
                        </TabPane>
                        <TabPane tab="Log" key="3">
                            <Card>
                                <div >
                                    { isLoading ?   
                                        <Row justify="center">
                                            <Col span={1}>    
                                                <Spin />
                                            </Col>
                                        </Row>  
                                        :
                                        <Table
                                            columns={columnsLog}
                                            scroll={{x: "100%"}}
                                            pagination={{
                                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                                showSizeChanger: true,
                                                position: ["bottomLeft"],
                                            }}
                                            dataSource={dataLog}
                                
                                        />
                                    }
                                </div>
                            </Card>
                        </TabPane>
                    </Tabs>
      
                </Modal>
            </>

            
    )
}
//test
export default WaitingRFPTable;
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
import React,{useState,useEffect} from 'react'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import {CheckCircleTwoTone, EditOutlined,DeleteFilled,EyeFilled,DeleteOutlined   } from '@ant-design/icons'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { toast } from 'react-toastify'

import { useHistory } from 'react-router-dom';
import {Table,Modal,Space,Col,Typography,Row,Spin,Tooltip,Button, Tabs,Card,Form,Select,Input,InputNumber} from "antd"
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux'
import {IconButton, TextField}  from '@mui/material/';

export default function TablePickup() {
    const [dataPickUp,setDataPickup] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [isModalVisibleReaasignment,setIsModalVisibleReaasignment] = useState(false)
    const [transDelegateId,setTransDelegateId] = useState(false)
    const [selectedRequestNo,setRequestNo] = useState('');
    const [selectedRFPDate,setSelectedRFPDate] = useState('');
    const [selectedTransportTeam,setSelectedTransportTeam] = useState('');
    const [selectedWpid,setSelectedWpid] = useState('');
    const [ddl,setDdl] = useState([])
    const [selectedAssignTo,setSelectedAssignTo] = useState('');
    const [page,setPage] = useState(1)
    const {TabPane} = Tabs
    const [dataOrderList,setDataOrderList] = useState([])
    const [dataOrderDetail,setDataOrderDetail] = useState([])
    const [dataMaterial,setDataMaterial] = useState([])
    const [dataLog,setDataLog] = useState([])
    const [isModalTabVisible,setIsModalTabVisible] = useState(false)
    const [odi,setOdi] = useState("")
    const [multiDeliveryList,setMultiDelivery] = useState([])
    const [multiDeliveryRequestPendingList,setMultiDeliveryRequestPendingList] = useState([])
    const [isManageMulti,setIsManageMulti] = useState(false);
    const [isModalMaterialArrive, setIsModalMaterialArrive] = useState(false);
    // const [requestNo, setRequestNo] = useState('');

    const [currentAssignTo,setCurrentAssignTo] = useState('')
    const history = useHistory()
    const {Title} = Typography

    const CardTitle = (title) => <Title level={5}>{title}</Title>
    const userId = useSelector(state=>state.auth.user.uid)

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

    function getPickUpCompletion() {
        setIsLoading(true);
        API.getPickUpCompletion(userId).then(
            result=>{
                setDataPickup(result);
                setIsLoading(false);
                console.log("completion =>",result);
            }
        )
    }

    const getMultideliveryCompletion =(uid)=>{
        setIsLoading(true)
        API.getMultiDeliveryCompletion(uid).then(
            result=>{
                setIsLoading(false);
                setMultiDelivery(result);
                console.log(result,"multi delivery completion")
            }
        )
    }

    const getMultiDeliveryAssigned =(mdid)=>{
        API.getMultiDeliveryAssigned(mdid).then(
            result=>{
                setMultiDeliveryRequestPendingList(result);
                console.log(result,"multi delivery Assigned")
            }
        )
    }

    const handleMaterialArrived =(data)=>{
        setIsModalMaterialArrive(true)
        setRequestNo(data.requestNo)
        setOdi(data.orderDetailId)
    }

    const handleCancelMaterialArrive =(data)=>{
        setIsModalMaterialArrive(false)
    }

    const handleFailedMaterialArrivedForm =()=>{
       
    }

    const handleFinishMaterialArrivedForm =(data)=>{
        console.log(data,"onfinsih material arrived")
        const body = {
            'OrderDetailId' : data.orderDetailId,
            'totalCollies' : data.totalCollies,
            'totalVolume': data.totalVolume,
            'LMBY' : userId
        }
        API.postMaterialArriveWH(body).then(
            result=>{
                if(result.status=="success"){
                    toast.success(result.message)
                    getPickUpCompletion();
                    setIsModalMaterialArrive(false)
                }
                else if(result.status=="warning"){
                    toast.success(result.message)
                }
                else{
                    toast.error(result.message)
                }
            }
        )
        console.log(body,"body material arrived")
    }

    function getOrderDetail(odis) {
        setIsLoading(true);
        API.getOrderRequest(odis).then(
            result=>{
                setDataOrderDetail(result);
                setIsLoading(false);
                console.log("data order detail =>",result);
            }
        )
    }

    function getMaterial(data) {
        setIsLoading(true);
        API.getMaterial(odi).then(
            result=>{
                setDataMaterial(result);
                setIsLoading(false);
                console.log("data order Material =>",result);
            }
        )
    }

    function getLog(data) {
        setIsLoading(true);
        API.getLog(odi).then(
            result=>{
                setDataLog(result);
                setIsLoading(false);
                console.log("data order Material =>",result);
            }
        )
    }

    const ddlTransporTeam = (transportTeamId,workpackageid) => {
        API.getDdlTransportTeam(transportTeamId,workpackageid).then(
            result=>{
                setDdl(result);
                console.log("ddl =>",result);
            }
        )
    }

    const showModal = (record) => {
        setTransDelegateId(record.transDelegateId)
        setRequestNo(record.requestNo)
        setCurrentAssignTo(record.currentAssignToId)
        setSelectedRFPDate(record.rfpDate);
        setSelectedTransportTeam(record.transportTeamId)
        setSelectedWpid(record.workpackageid)
        setIsModalVisibleReaasignment(true)
        ddlTransporTeam(record.transportTeamId,record.workpackageid)
        console.log(record.transportTeamId)
    }

    const hideModal = () => {
        setIsModalVisibleReaasignment(false)
    }

    const showModalTab = (record) => {
        setIsModalTabVisible(true)
        console.log(record,"modaltab")
        setOdi(record)
        getOrderDetail(record)
    }

    const hideModalTab = () => {
        setIsModalTabVisible(false)
        setDataOrderDetail([])
    }
    const handlePost = () => {
        const body = {
            "transDelegateId":transDelegateId,
            "transferTo":selectedAssignTo,
            "transferBy":userId,
            "currentAssignTo":currentAssignTo
        }
        API.postPickUpCompletion(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getPickUpCompletion()
                    setIsModalVisibleReaasignment(false)
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
            title : "Request No",
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            title : "Order Type",
            dataIndex:'orderType',
            ...Search('requestNo'),
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Origin",
            dataIndex:'originName',
            ...Search(''),
        },
        {
            title : "Destination",
            dataIndex:'destinationName',
            ...Search('destinationName'),
        },
        {
            title : "Site Name",
            dataIndex:'siteName',
            responsive: ['md'],
            ...Search('siteName'),
        },
        {
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            title : "Workpackage Id",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
        },
        {
            title : "Scope Name",
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title : "CDMR Req",
            dataIndex:'cdmrType',
            ...Search('cdmrType'),
        },
        {
            title : "RFP Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.rfpDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('incomingDate'),
        },
        {
            title : "Assigned By",
            dataIndex:'assignBy',
            ...Search('assignBy'),
        },
        {
            title : "Assigned To",
            dataIndex:'assignTo',
            ...Search('assignTo'),
        },
        {
            title : "Assign Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.assignDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('assignDate'),
        },
        {
            title : "Assign Status",
            dataIndex:'assignStatus',
            ...Search('assignStatus'),
        },
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed:'right',
            render:(record)=>{
                return (
                    <div>
                        <Space size={20}>
                            {
                                record.confirmTaskComplete=="yes" ?
                                
                                    <Tooltip title="Material Arrived at Warehouse">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleMaterialArrived(record)}
                                        >
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip title="Re-Assign Transport team Form">
                                        <LocalShippingIcon style={{fontSize:24,color:'#008de3'}} onClick={()=>showModal(record)}/>  
                                    </Tooltip>
                            }
                           
                            <Tooltip title="View Detail">
                                <EyeFilled style={{fontSize:20 ,color:'#008de3'}} onClick={()=>showModalTab(record.orderDetailId)}/>  
                            </Tooltip>

                            {/*                                                          
                            <Tooltip title=" Delete Order Request">
                                <EyeFilled style={{fontSize:20}} />
                            </Tooltip> */}
                        </Space>
                        
                    </div>
                    
                   
                )
            }
            
        },
    ]

    const handleManageMultiDelivery = (record) =>{
        setIsManageMulti(true);
        getMultiDeliveryAssigned(record.multiDeliveryId)

    }
    const handleCloseManage = () =>{
        setIsManageMulti(false);
        getMultideliveryCompletion(userId)
    }
    const handleCancelAssignmentOK = (record) =>{
        // setIsManageMulti(true);
        console.log(record,"sinidong")
        const body = {
            "multiDeliveryOrderDetailId":record.multiDeliveryOrderDetailId,
            "multiDeliveryId":record.multiDeliveryId,
            "transDelegateId":record.transDelegateId,
            "transportPICId":record.transferTo,
            "LMBY":userId

        }
        console.log(body,"body cancel")
        API.postMultiDeliveryCancelAssigned(body).then(
            result=>{
                if(result.status=='success')
                {
                    toast.success(result.message);
                    getMultiDeliveryAssigned(record.multiDeliveryId)
                }
            }
        )
    }

    function handleCancelAssignment(record) {
        console.log(record,"handlecancel")
        Modal.confirm({
            title: 'Warning Message',
            content: (
                <div>
                    <p>Are yousure want to cancel this assignment ?</p>
                    <p>it will release order request in this multi delivery group as well</p>
                </div>
            ),
            cancelText: 'Cancel',
            onOk() {handleCancelAssignmentOK(record)}
            ,onCancel() {}
        });
    }

    const columnsMulti = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Multi Delivery No",
            dataIndex:'multiDeliveryNo',
            ...Search('multiDeliveryNo'),
        },
        {
            title : "WH Team",
            dataIndex:'lspName',
            ...Search('lspName'),
        },
        {
            title : "Transport Team",
            dataIndex:'transportTeam',
            ...Search('transportTeam'),
        },
        {
            title : "Total Order Request",
            dataIndex:'totalOrderRequestGroup',
            ...Search('totalOrderRequestGroup'),
        },
        {
            title : "Total Collies (Coll)",
            dataIndex:'totalCollies',
            ...Search('totalCollies'),
        },
        {
            title : "Total Volume (CBM)",
            dataIndex:'totalVolume',
            ...Search('totalVolume'),
        },
        {
            title : "Total Pickup Completed",
            dataIndex:'totalPickupComplete',
            ...Search('totalPickupComplete'),
        },  
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed:'right',
            width: 70,
            render:(record)=>{
                return (
                    <div>
                        <Tooltip title="View Detail">
                            <IconButton size="small" color="primary" onClick={()=>handleManageMultiDelivery(record)}>
                                <EditOutlined style={{fontSize:20}} />  
                            </IconButton>
                        </Tooltip>
                    </div>
                )
            }
            
        },
    ]
    

    const columnsDeliveryRequestPendingList = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Multi Delivery No",
            dataIndex:'multiDeliveryNo',
            ...Search('multiDeliveryNo'),
        },
        {
            title : "Multi Delivery Status",
            dataIndex:'multiDeliveryStatus',
            ...Search('multiDeliveryStatus'),
        },
        {
            title : "Order Request Number",
            dataIndex:'orderReqNo',
            ...Search('orderReqNo'),
        },
        {
            title : "Transport Team",
            dataIndex:'transportTeam',
            ...Search('transportTeam'),
        },
        {
            title : "PIC Name",
            dataIndex:'picName',
            ...Search('picName'),
        },
        {
            title : "note",
            dataIndex:'note',
            ...Search('note'),
        },        
        {
            title : "Task Status",
            dataIndex:'taskStatus',
            ...Search('taskStatus'),
        },
        {
            title : "Total Collies",
            dataIndex:'totalCollies',
            ...Search('totalCollies'),
        },
        {
            title : "Total Volume",
            dataIndex:'totalVolume',
            ...Search('totalVolume'),
        },
        {
            title:"Action",
            // key:"orderDetailId",
            align:'center',
            fixed:'right',
            width: 60,
            render:(record)=>{
                return (
                    <div>  
                        <Space>
                            <Tooltip title="Cancel Assignment task">
                                <IconButton size="small" color="error" onClick={()=>handleCancelAssignment(record)}>
                                    <DeleteOutlined />
                                </IconButton>
                            </Tooltip>
                        </Space>
                    </div>
                )
            }
        },
    ]

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
                        <p>{moment(record.requestDate).format("YYYY-MM-DD")}</p>
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
                        <p>{moment(record.incomingDate).format("YYYY-MM-DD")}</p>
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
                        <p>{moment(record.expectedDeliveryDate).format("YYYY-MM-DD")}</p>
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
            
            getOrderDetail(odi)
            // getPickUpCompletion();
        }
        else if(key==2){
            getMaterial()
        }
        else if(key==3){
            getLog()
        }
        console.log("keytabs",key);
    }
   
    function callbackMain(key) {
     
        if(key==1){
            getPickUpCompletion()
        }
        else if(key==2){
            getMultideliveryCompletion(userId);
        }
        console.log("keytabs",key);
    }
   
    useEffect(() => {
        getPickUpCompletion();
        console.log(userId,"asdasd")
    },[])

    return (
        <div>
            <Tabs defaultActiveKey="1" centered={false} onChange={callbackMain}>
                <TabPane tab="Single Delivery Progress" key="1">
                    { isLoading ?   
                        <Row justify="center">
                            <Col span={1}>    
                                <Spin />
                            </Col>
                        </Row>  
                        :
                        <Table
                            scroll={{ x: '250%' }}

                            // expandable={{ expandedRowRender }}
                            columns={columns}
                            dataSource={dataPickUp}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            bordered />
                    }
                </TabPane>
                <TabPane tab="Multi Delivery Progress" key="2">
                    { isLoading ?   
                        <Row justify="center">
                            <Col span={1}>    
                                <Spin />
                            </Col>
                        </Row>  
                        :
                        <Table
                            scroll={{ x: '150%' }}
                            columns={columnsMulti}
                            dataSource={multiDeliveryList}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            bordered />
                    }
                </TabPane>
            </Tabs>

            <Modal title="ReAssignment Task"
                visible={isModalVisibleReaasignment}
                destroyOnClose
                footer={null}
                
                onCancel={hideModal}
            >
                <div>
        
                    <Form
                        name="basic"
                        style={{marginRight:96}}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        initialValues={{
                            'transDelegateId' : transDelegateId,
                            'requestNo': selectedRequestNo,
                            'rfpDate' : moment(selectedRFPDate).format("YYYY-MM-DD"),
                         
                        }}
                        // onFinish={handleOKForm}
                        // onFinishFailed={handleFailedForm}
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
                                    ddl.map(rbs =>  <Select.Option value={rbs.userId}> 
                                        {rbs.fullname}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                      
                            <div className='float-right'>
                                <Button type="primary" htmlType="submit" onClick={handlePost}>
                            Confirm
                                </Button>
                            </div>
                            

                        </Form.Item>
                    </Form>

                </div>
                
            </Modal>

            <Modal visible={isModalTabVisible}  onCancel={hideModalTab} 
                footer={[
          
                ]} 
                style={{ width: (80 * width / 100), minWidth: (80 * width / 100) }}
                zIndex={9999}
            >
                <Tabs defaultActiveKey="1" centered={false}  onChange={callback} destroyOnClose>
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
                                                <Input disabled style={{backgroundColor:"white",color:"#000",fontWeight:"500"}}/>
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

            <Modal title="Manage Order Request Pending List"
                visible={isManageMulti}
                destroyOnClose={true}
                footer={
                    <Button key="back" onClick={handleCloseManage}>
                        close
                    </Button>}
                onCancel={handleCloseManage}
                centered
                maskClosable={false}
                closable={false}
                width={700}
            >
                <Table
                    scroll={{ x: '200%' }}
                    size="small"
                    columns={columnsDeliveryRequestPendingList}
                    dataSource={multiDeliveryRequestPendingList}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["none"],
                    }}
                    bordered />
            </Modal>

            <Modal title="Material Arrive at WH"
                visible={isModalMaterialArrive}
                destroyOnClose={true}
                footer={null}
                
                onCancel={handleCancelMaterialArrive}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{
                        'requestNo' : selectedRequestNo,
                        'orderDetailId': odi
                    }}
                    onFinish={handleFinishMaterialArrivedForm}
                    onFinishFailed={handleFailedMaterialArrivedForm}
                    autoComplete="off"
                >
                    <Form.Item
                        // hidden
                        label="Request No"
                        name="requestNo"
                        
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        // hidden
                        label="Order Detail Id"
                        name="orderDetailId"
                        
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
                        
                    <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                            Confirm
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            
        </div>
    )
}

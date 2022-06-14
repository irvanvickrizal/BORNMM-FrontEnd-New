/* eslint-disable no-const-assign */
/* eslint-disable no-nested-ternary */
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
    const [selectedVehicle,setSelectedVehicle] = useState('');
    const [defaultVehicle,setDefaultVehicle] = useState('');
    const [defaultVehicleMulti,setDefaultVehicleMulti] = useState('');
    const [selectedRFPDate,setSelectedRFPDate] = useState('');
    const [selectedTransportTeam,setSelectedTransportTeam] = useState('');
    const [selectedWpid,setSelectedWpid] = useState('');
    const[parentOdi,setParentOdi] = useState("")
    const[parentRequestNo,setParentRequestNo] = useState("")
    const [ddl,setDdl] = useState([])
    const [selectedAssignTo,setSelectedAssignTo] = useState('');
    const [page,setPage] = useState(1)
    const {TabPane} = Tabs
    const [dataOrderList,setDataOrderList] = useState([])
    const [dataOrderDetail,setDataOrderDetail] = useState([])
    const [dataMaterial,setDataMaterial] = useState([])
    const [dataMasterVehicle,setDataMasterVehicle] = useState([])
    const [dataLog,setDataLog] = useState([])
    const [isModalTabVisible,setIsModalTabVisible] = useState(false)
    const [odi,setOdi] = useState("")
    const [multiDeliveryList,setMultiDelivery] = useState([])
    const [multiDeliveryRequestPendingList,setMultiDeliveryRequestPendingList] = useState([])
    const [isManageMulti,setIsManageMulti] = useState(false);
    const [isModalMaterialArrive, setIsModalMaterialArrive] = useState(false);
    const [isMulti, setIsMulti] = useState(false);
    const [selectedMultiDeliveryId, setSelectedMultiDeliveryId] = useState('');
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

    const getVehicle = (tmid) =>{
        console.log(tmid,"transportmodeid")
        API.getMasterVevicle().then(
            result=>{
                
                const filtered = result.filter( (auto) => auto.transportModeID==tmid)
                console.log('data master Vehicle',filtered)
                setDataMasterVehicle(filtered)
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

    const handleMaterialArrived =(data,multi)=>{
        setIsMulti(multi)
    
        setIsModalMaterialArrive(true)
        if(multi==true){
            setRequestNo(data.orderReqNo)
        }else{
            setRequestNo(data.requestNo)
        }        
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
                    if(isMulti==true){
                        getMultiDeliveryAssigned(selectedMultiDeliveryId)
                    }else{
                        getPickUpCompletion();
                    }
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
                setParentOdi(result[0]?.parentOrderDetailId)
                setParentRequestNo(result[0]?.parentRequestNo)
                console.log("data order detail =>",result);
            }
        )
    }

    function getMaterial(data) {
        // setIsLoading(true);
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
            API.getMaterial(odi).then(
                result=>{
                    setDataMaterial(result);
                    //setIsLoading(false);
                    console.log("data order Material =>",result);
                }
            )
        }
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
        getVehicle(record.transportModeID)
        setDefaultVehicle(record.vehicleId)
        console.log(record,"record ")
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
    const handleFailedForm = () => {
      
    }
    const handlePost = () => {
        const body = {
            "transDelegateId":transDelegateId,
            "transferTo":selectedAssignTo,
            "transferBy":userId,
            "currentAssignTo":currentAssignTo,
            "vehicleID":selectedVehicle==0?defaultVehicle:selectedVehicle
        }
        console.log(body,"body")
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
            width:150,
            title : "Request No",
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            width:150,
            title : "Order Type",
            dataIndex:'orderType',
            ...Search('requestNo'),
        },
        {
            width:150,
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            width:150,
            title : "Origin",
            dataIndex:'originName',
            ...Search(''),
        },
        {
            width:150,
            title : "Destination",
            dataIndex:'destinationName',
            ...Search('destinationName'),
        },
        {
            width:150,
            title : "Vehicle",
            dataIndex:'vehicleName',
            ...Search('vehicleName'),
        },
        {
            width:150,
            title : "Site Name",
            dataIndex:'siteName',
            responsive: ['md'],
            ...Search('siteName'),
        },
        {
            width:150,
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            width:150,
            title : "Workpackage Id",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
        },
        {
            width:150,
            title : "Scope Name",
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            width:150,
            title : "CDMR Req",
            dataIndex:'cdmrType',
            ...Search('cdmrType'),
        },
        {
            width:150,
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
            width:150,
            title : "Assigned By",
            dataIndex:'assignBy',
            ...Search('assignBy'),
        },
        {
            width:150,
            title : "Assigned To",
            dataIndex:'assignTo',
            ...Search('assignTo'),
        },
        {
            width:150,
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
            width:150,
            title : "Assign Status",
            dataIndex:'assignStatus',
            ...Search('assignStatus'),
        },
        {
            width:80,
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
                                            onClick={() => handleMaterialArrived(record,false)}
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
        console.log(record,"recordss")
        setIsManageMulti(true);
        getVehicle(record.transportModeID)
        setSelectedMultiDeliveryId(record.multiDeliveryId)
        getMultiDeliveryAssigned(record.multiDeliveryId)
        setDefaultVehicleMulti(record.vehicleID)

    }
    const handleCloseManage = () =>{
        setIsManageMulti(false);
        getMultideliveryCompletion(userId)
    }
    const handleConfirmMultiVehicle = () =>{
        const body = {
            "multiDeliveryID":selectedMultiDeliveryId,
            "vehicleID":selectedVehicle==0?defaultVehicle:selectedVehicle,
            "LMBY":userId
        }
        console.log(body,"body change vehicle")
        API.putChangeVehicleMultiDelivery(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    setIsManageMulti(false);
                    getMultideliveryCompletion(userId);
                }
                else{
                    toast.error(result.message)
                }
            }
        )
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
            width:150,
            title : "Request Type",
            dataIndex:'orderRequestType',
            ...Search('orderRequestType'),
        },
        {
            width:150,
            title : "Multi Delivery No",
            dataIndex:'multiDeliveryNo',
            ...Search('multiDeliveryNo'),
        },
        {
            width:150,
            title : "Note",
            dataIndex:'note',
            ...Search('note'),
        },
        {
            width:150,
            title : "WH Team",
            dataIndex:'lspName',
            ...Search('lspName'),
        },
        {
            width:150,
            title : "Vehicle",
            dataIndex:'vehicleName',
            ...Search('vehicleName'),
        },
        {
            width:150,
            title : "Total HO Complete",
            dataIndex:'totalHOComplete',
            ...Search('totalHOComplete'),
        },
        {
            width:150,
            title : "Total Order Complete",
            dataIndex:'totalOrderComplete',
            ...Search('totalOrderComplete'),
        },
        {
            width:150,
            title : "Transport Team",
            dataIndex:'transportTeam',
            ...Search('transportTeam'),
        },
        {
            width:150,
            title : "Total Order Request",
            dataIndex:'totalOrderRequestGroup',
            ...Search('totalOrderRequestGroup'),
        },
        {
            width:150,
            title : "Total Collies (Coll)",
            dataIndex:'totalCollies',
            ...Search('totalCollies'),
        },
        {
            width:150,
            title : "Total Volume (CBM)",
            dataIndex:'totalVolume',
            ...Search('totalVolume'),
        },
        {
            width:150,
            title : "Total Pickup Completed",
            dataIndex:'totalPickupComplete',
            ...Search('totalPickupComplete'),
        },  
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed:'right',
            width: 120,
            render:(record)=>{
                return (
                    <div>
                        <Space size={5}>
                            {record.orderCompleteStatus == "notCompleteYet"?
                                <Tooltip title="View Detail">
                                    <IconButton size="small" color="primary" onClick={()=>handleManageMultiDelivery(record)}>
                                        <EditOutlined style={{fontSize:20}} />  
                                    </IconButton>
                                </Tooltip>
                                :
                                record.orderCompleteStatus== "partialOrderComplete" ?
                                    <Tooltip title="Confirm Partial Complete HO">
                                        <IconButton size="small" color="primary" onClick={()=>handleManageMultiDelivery(record)}>
                                            <CheckCircleTwoTone style={{fontSize:20}} />  
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip title="Confirm Complete HO">
                                        <IconButton size="small" color="success" onClick={()=>handleManageMultiDelivery(record)}>
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />  
                                        </IconButton>
                                    </Tooltip>
                            
                            }
                        </Space>
                        
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
            width:150,
            title : "Multi Delivery No",
            dataIndex:'multiDeliveryNo',
            ...Search('multiDeliveryNo'),
        },
        {
            width:150,
            title : "Multi Delivery Status",
            dataIndex:'multiDeliveryStatus',
            ...Search('multiDeliveryStatus'),
        },
        {
            width:150,
            title : "Order Request Number",
            dataIndex:'orderReqNo',
            ...Search('orderReqNo'),
        },
        {
            width:150,
            title : "Transport Team",
            dataIndex:'transportTeam',
            ...Search('transportTeam'),
        },
        {
            width:150,
            title : "PIC Name",
            dataIndex:'picName',
            ...Search('picName'),
        },
        {
            width:150,
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
            width:150,
            title : "note",
            dataIndex:'note',
            ...Search('note'),
        },        
        {
            width:150,
            title : "Task Status",
            dataIndex:'taskStatus',
            ...Search('taskStatus'),
        },
        {
            width:150,
            title : "Total Collies",
            dataIndex:'totalCollies',
            ...Search('totalCollies'),
        },
        {
            width:150,
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
                            {record.orderRequestStatus == "OrderCompleted"?
                                null 
                                :
                                record.orderRequestStatus == "OrderNotCompletedYet" ?
                                    <Tooltip title="Cancel Assignment task">
                                        <IconButton size="small" color="error" onClick={()=>handleCancelAssignment(record)}>
                                            <DeleteOutlined />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip title="Material Arrived at Warehouse">
                                        <IconButton size="small" color="error" onClick={() => handleMaterialArrived(record,true)}>
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                        </IconButton>
                                    </Tooltip>
                            }
                            
                        </Space>
                    </div>
                )
            }
        },
    ]

    const columnsOrder = [
   
        {
            width:150,
            title : "CPO No",
            dataIndex:'cpoNo',
         
        },
        {
            width:150,
            title : "CT Name",
            dataIndex:'ctName',
         
        },
        {
            width:150,
            title : "Inventory Code",
            dataIndex:'inventoryCode',
         
        },
  
        {
            width:150,
            title : "Order Type",
            dataIndex:'orderType',
     
        },
        {
            width:150,
            title : "Request No",
            dataIndex:'requestNo',
      
        },
        {
            width:150,
            title : "Package Name",
            dataIndex:'packageName',
   
        },
        {
            width:150,
            title : "Project Name",
            dataIndex:'projectName',
   
        },
        {
            width:150,
            title : "Site No",
            dataIndex:'siteNo',
      
        },
        {
            width:150,
            title : "Zone",
            dataIndex:'zone',
    
        },
        {
            width:150,
            title : "Region",
            dataIndex:'region',
        
        },
           
        {
            width:150,
            title : "Workpackage Id",
            dataIndex:'workpackageId',
      
        },
        {
            width:150,
            title : "Site Name",
            dataIndex:'siteName',
            responsive: ['md'],
     
        },
        {
            width:150,
            title : "Requester",
            dataIndex:'requesterName',
            responsive: ['md'],
   
        },
        {
            width:150,
            title : "Dismantle By",
            dataIndex:'recipientOrDismantledBy',
            responsive: ['md'],
   
        },

 
        {
            width:150,
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
            width:150,
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
            width:150,
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
            width:50,
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            width:150,
            title: "Category",
            dataIndex: "site",
            ...Search("site")
        },
        {
            width:150,
            title: "Item Code",
            dataIndex: "materialCode",
            ...Search("materialCode")
        },

        {
            width:150,
            title: "Item Desc",
            dataIndex: "materialDesc",
            ...Search("materialDesc")
        },
        {
            width:150,
            title: "BOQ Ref QTY",
            dataIndex: "refQTY"
        },
        {
            width:150,
            title: "Current Req QTY",
            dataIndex: "reqQTY"
        },
   
        {
            width:150,
            title: "Total BOQ Req QTY",
            dataIndex: "totalReqQTY"
        },
        {
            width:150,
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
            width:150,
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            width:150,
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
            width:150,
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
            width:150,
            title: "Execute By",
            dataIndex: "executedBy",
        },
        {
            width:150,
            title: "Event Desc",
            dataIndex: "taskName"
        },
        {
            width:150,
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
                            'vehicle' : defaultVehicle == 0 ? null : defaultVehicle 
                        }}
                        onFinish={handlePost}
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
                        <Form.Item label="Vehicle"
                            name="vehicle"
                            rules={[{ required: true, message: 'Please Select Transport Team!'}]}
                        >
                            <Select 
                                onChange={(e) => setSelectedVehicle(e)}
                                placeholder="Select an option"
                            >
                                {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                {
                                    dataMasterVehicle.map(inv =>  <Select.Option value={inv.vehicleId}> 
                                        {inv.vehicleName}</Select.Option>)
                                }
                            </Select>
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
                                <Button type="primary" htmlType="submit">
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

            <Modal title="Manage Order Request Pending List"
                visible={isManageMulti}
                destroyOnClose={true}
                footer={
                    <><Button key="back" onClick={handleCloseManage}>
                        close
                    </Button><Button type="primary" key="back" onClick={handleConfirmMultiVehicle}>
                            Confirm
                    </Button></>    
                }
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
                
                <Form.Item label="Vehicle"
                    name="vehicle"
                    style={{marginTop:20}}
                    rules={[{ required: true, message: 'Please Select Transport Team!'}]}
                >
                    <Select 
                        onChange={(e) => setSelectedVehicle(e)}
                        placeholder="Select an option"
                        defaultValue={defaultVehicleMulti==0?null:defaultVehicleMulti}
                    >
                        {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                        {
                            dataMasterVehicle.map(inv =>  <Select.Option value={inv.vehicleId}> 
                                {inv.vehicleName}</Select.Option>)
                        }
                    </Select>
                </Form.Item>

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
                        hidden
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

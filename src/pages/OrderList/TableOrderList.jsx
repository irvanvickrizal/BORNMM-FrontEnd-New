/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
import React,{useState,useEffect} from 'react'
import {Table,Modal,Space,Col,Typography,Row,Spin,Tooltip,Button, Tabs,Card,Form,Input} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import { toast } from 'react-toastify'
import {DeleteFilled,EyeFilled,PlusOutlined,FileExcelOutlined, CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined,DeleteTwoTone,UploadOutlined } from '@ant-design/icons'

import {IconButton, TextField}  from '@mui/material/';
import { useHistory } from 'react-router-dom';


export default function TableOrderList() {
    const {TabPane} = Tabs
    const [dataOrderList,setDataOrderList] = useState([])
    const [dataOrderDetail,setDataOrderDetail] = useState([])
    const [dataMaterial,setDataMaterial] = useState([])
    const [dataLog,setDataLog] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()
    const [modalDeleteVisible,setModalDeleteVisible] = useState(false)
    const [isAddButton,setIsAddButton] = useState(false)
    const [formPath,setFormPath] = useState('')
    const [odi,setOdi] = useState("")
    const[parentOdi,setParentOdi] = useState("")
    const[parentRequestNo,setParentRequestNo] = useState("")
    const [isTransferAsset,setIsTransferAsset] = useState('')
    const [isModalVisible,setIsModalVisible] = useState(false)
    const {Title} = Typography
    const [page,setPage] = useState(1)
    const CardTitle = (title) => <Title level={5}>{title}</Title>

    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const wpid = params.get('wpid');
    const ot = params.get('ot');
    const ddid = params.get('ddid');

    
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

    

    function getOrderList() {
        setIsLoading(true);
        API.getOrderList(wpid,ot).then(
            result=>{
                setDataOrderList(result);
                setIsLoading(false);
                console.log("data order list =>",result);
            }
        )
    }

    function getOrderDetail(data) {
        setIsLoading(true);
        API.getOrderRequest(data).then(
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

    
    const hideModalDelete = () => {
        setModalDeleteVisible(false)
    }
    const showModalDelete = (data) => {
        setModalDeleteVisible(true)
        setOdi(data)
    }

    const hideModal = () => {
        setIsModalVisible(false)
        setDataOrderDetail([])
    }
    const showModal = (data) => {
        setIsModalVisible(true)
        getOrderDetail(data)
        setOdi(data)
     
    }

    const consoleTest = (record) => {
        console.log("cosnoel",record)
    }

    const checkPlusButton = (wpids,ots) => {
        API.checkAddButtonOrderList(wpids,ots).then(
            result=>{
                console.log(result,"viewto add")
                setIsAddButton(result[0].viewToAdd)
                setFormPath(result[0].formPath)
                setIsTransferAsset(result[0].isTransferAsset)
            }
        )
    }

    const navigateToMaterialOrderForm = (record) => {
        history.push(record.materialOrderFormPath)
    }
    const navigateTo = (path) => {
        history.push(path)
    }
    const handleAddButton = () =>{
        if(isTransferAsset){
            navigateTo(`${formPath}&ddid=${ddid}`)
        }
        else{
            navigateTo(formPath)
        }

    }

    
    const handleDeleteOrdrList = () => {
        setIsLoading(true);
        API.postDeleteOrderList("",odi).then(
            result=>{
                try{
                    if(result.status=="success"){
                        setIsLoading(false)
                        toast.success(result.message)
                        getOrderList()
                        checkPlusButton(wpid,ot);     
                    }
              
                }
                catch(e){
                    toast.error(result.message)
                    setIsLoading(false)
                    console.log(e,"error catch")
                }
            }
  
        )
        setModalDeleteVisible(false)
    }

    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Order Type",
            dataIndex:'orderType',
            width : 150,
            ...Search('orderType'),
        },
        {
            title : "Request No",
            dataIndex:'requestNo',
            width : 150,
            ...Search('requestNo'),
        },
        {
            title : "Parent Request No",
            dataIndex:'parentRequestNo',
            width : 150,
            ...Search('parentRequestNo'),
        },
        {
            title : "Origin",
            width : 150,
            dataIndex:'originName',
            ...Search(''),
        },
        {
            title : "Destination",
            width : 150,
            dataIndex:'destinationName',
            ...Search(''),
        },
        {
            title : "Site No",
            width : 150,
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Zone",
            width : 150,
            dataIndex:'zone',
            ...Search('zone'),
        },
        {
            title : "Region",
            width : 150,
            dataIndex:'region',
            ...Search('region'),
        },
           
        {
            title : "Workpackage Id",
            width : 150,
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
        },
 
   
 
        {
            title : "Scope Name",
            width : 150,
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title : "Scope Detail",
            width : 150,
            dataIndex:'scopeDetail',
            ...Search('scopeDetail'),
        },
        {
            title : "Site Name",
            width : 150,
            dataIndex:'siteName',
            responsive: ['md'],
            ...Search('siteName'),
        },

 
        {
            title : "Request Date",
            width : 150,
            render:(record)=>{
                return (
                    <div>
                        {record.requestDate !== null ? (<> <Space>
                            <p>{moment(record.requestDate).format("YYYY-MM-DD")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('incomingDate'),
        },
        {
            title : "Order Status",
            width : 100,
            dataIndex:'orderStatus',
            responsive: ['md'],
            ...Search('orderStatus'),
        },
        {
            title:"Action",
            align:'center',
            width : 80,
            fixed:'right',
            render:(record)=>{
                return (
                    <div>  
                        {record.allowToView=="true" ? <Space size={20}>
                            <Tooltip title="View Detail">
                                <IconButton
                                    size='small'
                                    color="primary"
                                    aria-label="upload file"
                                    component="span"
                                    onClick={()=>showModal(record.orderDetailId)}>
                                    <EyeFilled />
                                </IconButton>
                            </Tooltip>
                            {record.allowToDelete=="true" ?  <>
                                <Tooltip title="Edit Order Request ">
                                    <IconButton
                                        size='small'
                                        color="primary"
                                        aria-label="upload file"
                                        component="span"
                                        onClick={()=>navigateToMaterialOrderForm(record)}>
                                        <EditOutlined />
                                    </IconButton>
                                    
                                </Tooltip><Tooltip title=" Delete Order Request">
                                    <DeleteFilled style={{ fontSize: 20, color: 'red' }} onClick={()=>showModalDelete(record.orderDetailId)} />
                                </Tooltip>
                            </> : null }
                        </Space>
                            :
                            <><Space size={20}>
                                {record.allowToDelete == "true" ? <Tooltip title=" Delete Order Request">
                                    <DeleteFilled style={{ fontSize: 20, color: 'red' }} onClick={() => showModalDelete(record.orderDetailId)} />
                                </Tooltip> : null}
                            </Space>
                            <Space size={20}>

                                {record.allowToEdit == "true" ? <Tooltip title="Edit Order Request ">
                                    <IconButton
                                        size='small'
                                        color="primary"
                                        aria-label="upload file"
                                        component="span"
                                        onClick={() => navigateToMaterialOrderForm(record)}>
                                        <EditOutlined  />
                                    </IconButton>
                                </Tooltip> : null}
                            </Space></>
                        }
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
                        <p>{moment(record.requestDate).format("YYYY-MM-DD hh:mm:ss")}</p>
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
    const columnsOrderTAR = [
   
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Order Type",
            dataIndex:'orderType',
            width : 150,
            ...Search('orderType'),
        },
        {
            title : "Request No",
            dataIndex:'requestNo',
            width : 150,
            ...Search('requestNo'),
        },
        {
            title : "Origin",
            width : 150,
            dataIndex:'originName',
            ...Search(''),
        },
        {
            title : "Destination",
            width : 150,
            dataIndex:'destinationName',
            ...Search(''),
        },
        {
            title : "WH Code",
            width : 150,
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Zone",
            width : 150,
            dataIndex:'zone',
            ...Search('zone'),
        },
        {
            title : "Region",
            width : 150,
            dataIndex:'region',
            ...Search('region'),
        },
           
        {
            title : "Workpackage Id",
            width : 150,
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
        }, 
        {
            title : "Scope Name",
            width : 150,
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title : "Scope Detail",
            width : 150,
            dataIndex:'scopeDetail',
            ...Search('scopeDetail'),
        },
        {
            title : "WH Name",
            width : 150,
            dataIndex:'siteName',
            responsive: ['md'],
            ...Search('siteName'),
        },

 
        {
            title : "Request Date",
            width : 150,
            render:(record)=>{
                return (
                    <div>
                        {record.requestDate !== null ? (<> <Space>
                            <p>{moment(record.requestDate).format("YYYY-MM-DD")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('incomingDate'),
        },
        {
            title : "Order Status",
            width : 100,
            dataIndex:'orderStatus',
            responsive: ['md'],
            ...Search('orderStatus'),
        },
        {
            title:"Action",
            align:'center',
            width : 70,
            fixed:'right',
            render:(record)=>{
                return (
                    <div>  
                        {record.allowToView=="true" ? <Space size={20}>
                            <Tooltip title="View Detail">
                                <EyeFilled style={{fontSize:20}} onClick={()=>showModal(record.orderDetailId)}/>  
                            </Tooltip>
                            {record.allowToDelete=="true" ?  <>
                                <Tooltip title="Edit Order Request ">
                                    <EditOutlined style={{ fontSize: 20 }} onClick={()=>navigateToMaterialOrderForm(record)}/>
                                </Tooltip><Tooltip title=" Delete Order Request">
                                    <DeleteFilled style={{ fontSize: 20, color: 'red' }} onClick={()=>showModalDelete(record.orderDetailId)} />
                                </Tooltip>
                            </> : null }
                        </Space>
                            :
                            <><Space size={20}>
                                {record.allowToDelete == "true" ? <Tooltip title=" Delete Order Request">
                                    <DeleteFilled style={{ fontSize: 20, color: 'red' }} onClick={() => showModalDelete(record.orderDetailId)} />
                                </Tooltip> : null}
                            </Space>
                            <Space size={20}>

                                {record.allowToEdit == "true" ? <Tooltip title="Edit Order Request ">
                                    <EditOutlined style={{ fontSize: 20 }} onClick={() => navigateToMaterialOrderForm(record)} />
                                </Tooltip> : null}
                            </Space></>
                        }
                    </div>
                )
            }
            
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
     
        if(key==2){
            getMaterial()
        }
        else if(key==3){
            getLog()
        }
        console.log("keytabs",key);
    }
    useEffect(() => {
        getOrderList();
        checkPlusButton(wpid,ot);
    },[])
 

    return (
        <div>
            { isLoading ?   
                <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  
                :
                <>
                    {isAddButton ? <div className='float-right'>
                        <Tooltip title="Add Order Request">
                            <IconButton size="small" color="success" onClick={handleAddButton}>
                                <PlusOutlined />
                            </IconButton>
                            {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                        </Tooltip>
                    </div>: isAddButton}
                    <Table
                        scroll={{ x: '150%' }}

                        // expandable={{ expandedRowRender }}
                        columns={
                            isTransferAsset ?
                                columnsOrderTAR
                                :
                                columns
                        }
                        dataSource={
                            dataOrderList
                        }
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                            showSizeChanger: true,
                            position: ["bottomLeft"],
                        }}
                        bordered /></>}
         
                     
            {/*  Modal Delete */}
            <Modal title="Delete Order Rejection Pending" visible={modalDeleteVisible}  onCancel={hideModalDelete} 
                footer={[
                    <Button key="back" onClick={hideModalDelete} >
                Cancel
                    </Button>,
                    <Button key="submit" type="danger" onClick={()=>handleDeleteOrdrList()} >
                Delete
                    </Button>,
                
                ]} >
                <Typography>Are You Sure You Want to Proceed  ?
                </Typography>
      
            </Modal>

            {/*  Modal getData */}
            <Modal visible={isModalVisible}  onCancel={hideModal} 
                footer={[
          
                ]} 
                style={{ width: (80 * width / 100), minWidth: (80 * width / 100) }}
                zIndex={9999}
                destroyOnClose
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
        </div>
    )
}

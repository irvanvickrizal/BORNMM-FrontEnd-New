/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import API from '@app/utils/apiServices';
import {Table,Modal,Space,Col,Typography,Row,Spin,Tooltip,Button, Tabs,Card,Form,Select,Input,InputNumber} from "antd"
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import {IconButton, TextField}  from '@mui/material/';
import {CheckCircleTwoTone, EditOutlined,DeleteFilled,EyeFilled,DeleteOutlined   } from '@ant-design/icons'
import { toast } from 'react-toastify';

export default function TableXDock() {
    const {TabPane} = Tabs
    const [dataXDock,setDataXDock] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isModalTabVisible,setIsModalTabVisible] = useState(false)
    const [isModalPostVisible,setIsModalPostVisible] = useState(false)
    const [page,setPage] = useState(1)

    const userId = useSelector(state=>state.auth.user.uid)
    const[parentOdi,setParentOdi] = useState("")
    const [dataOrderDetail,setDataOrderDetail] = useState([])
    const[parentRequestNo,setParentRequestNo] = useState("")
    const [dataMaterial,setDataMaterial] = useState([])
    const [dataLog,setDataLog] = useState([])
    const [odi,setOdi] = useState("")
    const [selectedDop,setSelectedDop] = useState("")
    const [selectedOrderRequestNo,setSelectedOrderRequestNo] = useState("")


    const {Title} = Typography

    const CardTitle = (title) => <Title level={5}>{title}</Title>

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
    



    function getXdock() {
        setIsLoading(true);
        API.getXDockInbound(userId).then(
            result=>{
                setDataXDock(result);
                setIsLoading(false);
                console.log("xDock =>",result);
            }
        )
    }
    
    function refreshData(){
        getXdock();
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
           
                console.log("data order Material =>",result);
            }
        )
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

    const handlePost =(data)=>{
        setIsModalPostVisible(true)
        setSelectedDop(data.dopName)
        setOdi(data.orderDetailId)
        setSelectedOrderRequestNo(data.orderRequestNo)
    }
    const hideModalPost =(data)=>{
        setIsModalPostVisible(false)

    }
    const postxDock =(data)=>{
        // console.log(odi,"odi")
        const body = {
            "orderDetailId" : odi,
            "LMBY":userId
        }
     
        API.postXDockConfirmation(body).then(
            result=>{
                console.log(body,"body request")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    refreshData()
                    setIsModalPostVisible(false)
                
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
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
            width:200,
            title : "Order Request No",
            dataIndex:'orderRequestNo',
            ...Search('orderRequestNo'),
        },
        {
            width:150,
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            width:150,
            title : "Site Name",
            dataIndex:'siteName',
            ...Search('siteName'),
        },
        {
            width:150,
            title : "Workpackage ID",
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            width:150,
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            width:150,
            title : "Zone",
            dataIndex:'zone',
            ...Search('zone'),
        },
        {
            width:150,
            title : "RFP Date",
            render:(record)=>{
                return (
                    <Space>
                   
                        <Typography>{moment(record.rfpDate).format("YYYY-MM-DD")}</Typography>
                    </Space>
                )
            },
            ...Search('incomingDate'),
        },
        {
            width:100,
            title : "#Item Booked",
            dataIndex:'itemBookedCount',
            responsive: ['md'],
            ...Search('itemBookedCount'),
        },
        {
            width:120,
            title : "#Item Outbound",
            dataIndex:'itemOutBoundCount',
            ...Search('itemOutBoundCount'),
        },
        {
            width:150,
            title : "Outbound Status",
            dataIndex:'outboundStatus',
            ...Search('outboundStatus'),
        },
        {
            width:150,
            title : "HO Complete Date",
            render:(record)=>{
                return (
                    <Space>
                        {record.hoCompleteDate === null ? (<Typography style={{fontSize:20}}>-</Typography>):(
                            <Typography>{moment(record.hoCompleteDate).format("YYYY-MM-DD hh:mm:ss")}</Typography>
                        )}
                      
                    </Space>
                )
            },
            ...Search('hoCompleteDate'),
         
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
                                record.inboundStatus!=="NotReadyYet" ?
                                
                                    <Tooltip title="Inbound Status">
                                        <IconButton
                                            size="small"
                                            onClick={() => handlePost(record)}
                                        >
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                        </IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip title="Inbound Status Not Ready Yet">
                                        <IconButton
                                            size="small"
                                     
                                          
                                        >
                                            <CheckCircleTwoTone twoToneColor="#9e9e9e" />
                                        </IconButton>
                                    </Tooltip>
                            }
                           
                            <Tooltip title="View Detail">
                                <EyeFilled style={{fontSize:20 ,color:'#008de3'}} 
                                    onClick={()=>showModalTab(record.orderDetailId)}
                                />  
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
                        <Typography>{moment(record.incomingDate).format("YYYY-MM-DD")}</Typography>
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
                        <Typography>{moment(record.executeDate).format("YYYY-MM-DD")}</Typography>
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
   
    
    useEffect(() => {
        getXdock();

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
                <Table
                    scroll={{ x: '150%' }}

                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataXDock}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />
            }

            <Modal title="xDock Inbound Confirmation"
                visible={isModalPostVisible}
                destroyOnClose
                footer={null}
                
             
                onCancel={hideModalPost}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{
                        'dop' : selectedDop,
                        'orderRequestNo': selectedOrderRequestNo
                    }}
                    // onFinish={handleFinishMaterialArrivedForm}
                    // onFinishFailed={handleFailedMaterialArrivedForm}
                    autoComplete="off"
                >
                    <Form.Item
                        // hidden
                        label="xDock Name"
                        name="dop"
                        
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                  
                        label="Order Request No"
                        name="orderRequestNo"
                        
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Row align="middle" justify="end">
                        <Space>
                            <Button  style={{backgroundColor:"#3057bf",color:"white"}} htmlType="submit" onClick={postxDock}>
                                Confirm
                            </Button>
                            <Button htmlType="submit" onClick={hideModalPost}>
                                Cancel
                            </Button>
                        </Space>
             
                 
                    </Row>
                
                  
                        
               
                </Form>
            </Modal>

       
            <Modal visible={isModalTabVisible}  onCancel={hideModalTab} 
                footer={[
          
                ]} 
                style={{ width: (80 * width / 100), minWidth: (80 * width / 100) }}
                zIndex={9999}
                destroyOnClose
        
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
        </div>
    )
}

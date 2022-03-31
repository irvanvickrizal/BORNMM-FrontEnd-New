/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
import React,{useState,useEffect} from 'react'
import {Table,Modal,Space,Col,Typography,Row,Spin,Tooltip,Button, Tabs,Card} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import { EditOutlined,DeleteFilled,EyeFilled   } from '@ant-design/icons'
import { toast } from 'react-toastify'

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
    const [odi,setOdi] = useState("")
    const [isModalVisible,setIsModalVisible] = useState(false)
    const {Title} = Typography
    const [page,setPage] = useState(1)
    const CardTitle = (title) => <Title level={5}>{title}</Title>

    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const wpid = params.get('wpid');
    const ot = params.get('ot');

    
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

    useEffect(() => {
        getOrderList();
    },[])
 
    const hideModalDelete = () => {
        setModalDeleteVisible(false)
    }
    const showModalDelete = (data) => {
        setModalDeleteVisible(true)
        setOdi(data)
    }

    const hideModal = () => {
        setIsModalVisible(false)
    }
    const showModal = (data) => {
        setIsModalVisible(true)
        getOrderDetail(data)
        setOdi(data)
     
    }

    const consoleTest = (record) => {
        console.log("cosnoel",record)
    }

    const navigateToMaterialOrderForm = (record) => {
        history.push(`materialorder?odi=${record}`)
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
                     
                    }
              
                }
                catch(e){
                    toast.error(result.message)
                    setIsLoading(false)
                    console.log(e,"error catch")
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
            title : "Sys Request No",
            dataIndex:'requestSysNo',
            ...Search('requestSysNo'),
        },
  
        {
            title : "Order Type",
            dataIndex:'orderType',
            ...Search('orderType'),
        },
        {
            title : "Request No",
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            title : "Origin",
            dataIndex:'originName',
            ...Search(''),
        },
        {
            title : "Destination",
            dataIndex:'destinationName',
            ...Search(''),
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Zone",
            dataIndex:'zone',
            ...Search('zone'),
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
            title : "Scope Detail",
            dataIndex:'scopeDetail',
            ...Search('scopeDetail'),
        },
        {
            title : "Site Name",
            dataIndex:'siteName',
            responsive: ['md'],
            ...Search('siteName'),
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
            ...Search('incomingDate'),
        },
        {
            title : "Order Status",
            dataIndex:'orderStatus',
            responsive: ['md'],
            ...Search('orderStatus'),
        },
        {
            title:"Action",
            // key:"orderDetailId",
            align:'center',
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
                                    <EditOutlined style={{ fontSize: 20 }} onClick={()=>navigateToMaterialOrderForm(record.orderDetailId)}/>
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
                                    <EditOutlined style={{ fontSize: 20 }} onClick={() => navigateToMaterialOrderForm(record.orderDetailId)} />
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
            title: "Delta QTY",
            dataIndex: "reqQTY"
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
                    dataSource={dataOrderList}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />}
         
                     
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
                style={{ width: (80 * width / 100), minWidth: (80 * width / 100) }}>
                <Tabs defaultActiveKey="1" centered={false}  onChange={callback}>
                    <TabPane tab="Order Request Detail" key="1">
                        <Card >
                            <div >
                                { isLoading ?   
                                    <Row justify="center">
                                        <Col span={1}>    
                                            <Spin />
                                        </Col>
                                    </Row>  
                                    :
                                    <Table
                                        columns={columnsOrder}
                           
                                        dataSource={dataOrderDetail}
                                        scroll={{x: "200%"}}
                                        size="medium"
                                        pagination={false}
                                        
                                    />
                                }
                            </div>
                        </Card>
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
                                        pagination={{
                                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                                            showSizeChanger: true,
                                            position: ["bottomLeft"],
                                        }}
                                        dataSource={dataMaterial}
                                        scroll={{x: "100%"}}
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

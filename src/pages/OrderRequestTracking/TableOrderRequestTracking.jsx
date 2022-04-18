/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import React,{useState,useEffect} from 'react'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import API from '@app/utils/apiServices'
import {Tabs,Card,Typography,Popconfirm,Select,Upload,message,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {EyeFilled, FileExcelOutlined,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined,DeleteTwoTone,UploadOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import { useSelector } from 'react-redux'
import exportFromJSON from 'export-from-json'

export default function TableOrderRequestTracking() {
    const { TabPane } = Tabs;
    const {Title,Link} = Typography
    const [page,setPage] = useState(1)
    const[dataOrder,setDataOrder] = useState([])
    const[orderDetailId,setDataOrderDetailId] = useState("")
    const[dataOrderDetail,setDataOrderDetail] = useState([])
    const[dataMaterial,setDataMaterial] = useState([])
    const[dataLog,setDataLog] = useState([])
    const[sownloadData,setDownloadData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [modalDetailVisible,setModalDetailVisible] = useState(false)
    const userId = useSelector(state=>state.auth.user.uid)


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



    function getPickUpCompletion() {
        setIsLoading(true);
        API.getOrderRequestTracking(userId).then(
            result=>{
                setDataOrder(result);
                setIsLoading(false);
                console.log("completion order =>",result);
            }
        )
    }

    const getDownloadPoBoqList = () => {
        API.getOrderRequestTracking(userId).then(
            result=>{
                setDownloadData(result);
                console.log("data  Download :",result);
               
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `Order Request Tracking`;
                exportFromJSON({ data, fileName, exportType });
               
            }
        )
    }

    function getOrderDetail(data) {
        //setIsLoading(true);
        console.log(data,"data")
        API.getOrderRequest(data).then(
            result=>{
                setDataOrderDetail(result);
                //setIsLoading(false);
                console.log("data order detail =>",result);
            }
        )
    }
    function getMaterial(data) {
        //setIsLoading(true);
        API.getMaterial(orderDetailId).then(
            result=>{
                setDataMaterial(result);
                //setIsLoading(false);
                console.log("data order Material =>",result);
            }
        )
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

    const showModalDetail = (data) => {
        setModalDetailVisible(true)
        setDataOrderDetailId(data.orderDetailId)
        getOrderDetail(data.orderDetailId)
    }

    const hideModalDetail = () => {
        setModalDetailVisible(false)
        setDataOrderDetail([])
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
            ...Search('orderType'),
        },
        {
            title : "Request Type Name",
            dataIndex:'requestTypeName',
            ...Search('requestTypeName'),
        },
        {
            title : "CT Name",
            dataIndex:'ctName',
            ...Search('ctName'),
        },
        {
            title : "Site Condition",
            dataIndex:'siteCondition',
            ...Search('siteCondition'),
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
            title : "Delivery Type",
            dataIndex:'deliveryType',
            ...Search('deliveryType'),
        },
        {
            title :  "Packet Type",
            dataIndex:'packetType',
            ...Search('packetType'),
        },
        {
            title :  "Location Address",
            dataIndex:'locationAddress',
            ...Search('locationAddress'),
        },
        {
            title :  "PIC on Site",
            dataIndex:'picOnSite',
            ...Search('picOnSite'),
        },
        {
            title :  "Subcon Name",
            dataIndex:'subconName',
            ...Search('subconName'),
        },
        {
            title : "Requester",
            dataIndex:'requesterName',
            ...Search('requesterName'),
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
            ...Search('requestDate'),
        },
        {
            title : "Logistic Completed Date",
            render:(record)=>{
                return (
                    <div>
                        {record.logisticCompletedDate !== null ? (<> <Space>
                            <p>{moment(record.logisticCompletedDate).format("YYYY-MM-DD")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('logisticCompletedDate'),
        },

      
        {
            title : "Approve Date",
         
            responsive: ['md'],
            render:(record)=>{
                return (
                    <div>
                        {record.approveDate !== null ? (<> <Space>
                            <p>{moment(record.approveDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('approveDate'),
        },
        {
            title : "Approve By",
            dataIndex:'approvedBy',
            responsive: ['md'],
            ...Search('approvedBy'),
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            responsive: ['md'],
            ...Search('siteNo'),
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
            title : "Zone",
            dataIndex:'zone',
            ...Search('zone'),
        },
        {
            title : "Workpackage Id",
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            title : "Package Name",
            dataIndex:'packageName',
            ...Search('packageName'),
        },
     
    
        {
            title : "Logistic Completed By ",
            dataIndex:'logisticCompletedBy',
            ...Search('logisticCompletedBy'),
        },
    

        {
            title : "LSP Name",
            dataIndex:'lspName',
            ...Search('lspName'),
        },
        {
            title : "RFP Date",
            render:(record)=>{
                return (
                    <div>
                        {record.rfpDate !== null ? (<Space>
                            <p>{moment(record.rfpDate).format("YYYY-MM-DD")}</p>
                        </Space>):(<></>)}
                        
                    </div>
                   
                )
            },
            ...Search('rfpDate'),
        },
        

        {
            title : "Total Volume",
            dataIndex:'totalCollies',
            ...Search('totalCollies'),
        },
        
        {
            title : "Total ",
            dataIndex:'total',
            ...Search('total'),
        },
        
        {
            title : "RFP Confirmed By",
            dataIndex:'rfpConfirmedBy',
            ...Search('rfpConfirmedBy'),
        },
        {
            title : "Pick Up Date",
            render:(record)=>{
                return (
                    <div>
                        {record.pickupDate !== null ? (  <Space>
                            <p>{moment(record.pickupDate).format("YYYY-MM-DD")}</p>
                        </Space>):(<></>)}
                      
                    </div>
                  
                )
            },
            ...Search('rfpDpickupDateate'),
        },
        
        {
            title : "Delivery Complete Date",
            render:(record)=>{
                return (
                    <div>
                        {record.deliveredCompletedDate !== null ? (  <Space>
                            <p>{moment(record.deliveredCompletedDate).format("YYYY-MM-DD")}</p>
                        </Space>):(<></>)}
                    </div>
                    
                
                  
                )
            },
            ...Search('deliveredCompletedDate'),
        },
        
        

    

        {
            title : " Order Status",
            dataIndex:'orderStatus',
            ...Search('orderStatus'),
        },
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed:'right',
            width:75,
            render:(record)=>{
                return (
                    <div>
                        <Space>
                         
                            <Tooltip title="View Detail">
                                <EyeFilled style={{fontSize:20, color:'#008de3'}} onClick={()=>showModalDetail(record)}/>  
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
            title: "BOQ Req QTY",
            dataIndex: "reqQTY"
        },
        {
            title: "BOQ Ref QTY",
            dataIndex: "refQTY"
        },
        {
            title: "Total Req QTY",
            dataIndex: "totalReqQTY"
        },
        {
            title: "Delta QTY",
            dataIndex: "deltaBOQRefQTY"
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



    useEffect(() => {
        getPickUpCompletion();

        console.log(userId,"asdasd")
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
                <><Row>
                    <Col md={24} sm={24}>
                        <div className='float-right'>
                         
                            <Tooltip title="Download Template">
                                <IconButton size="medium" color="success" onClick={getDownloadPoBoqList}>
                                    
                                    <FileExcelOutlined />
                  
                                </IconButton>
                                {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                            </Tooltip>
                        </div>
                    </Col>
                </Row>
                <Table
                    scroll={{ x: '300%' }}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataOrder}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>}
            <Modal visible={modalDetailVisible}  onCancel={hideModalDetail} 
             
                footer={[
          
                ]} 
                style={{ width: (90 * width / 100), minWidth: (90 * width / 100) }}
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

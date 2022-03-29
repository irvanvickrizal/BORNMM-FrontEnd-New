/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
import React,{useState,useEffect} from 'react'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import { EditOutlined,DeleteFilled,EyeFilled   } from '@ant-design/icons'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { toast } from 'react-toastify'

import { useHistory } from 'react-router-dom';
import {Table,Modal,Space,Col,Typography,Row,Spin,Tooltip,Button, Tabs,Card,Form,Select,Input} from "antd"
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux'

export default function TablePickup() {
    const [dataPickUp,setDataPickup] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible,setIsModalVisible] = useState(false)
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
        getPickUpCompletion();
        console.log(userId,"asdasd")
    },[])
    const ddlTransporTeam = (transportTeamId,workpackageid) => {
        setIsLoading(true);
        API.getDdlTransportTeam(transportTeamId,workpackageid).then(
            result=>{
                setDdl(result);
                setIsLoading(false);
                console.log("ddl =>",result);
            }
        )
    }


    const showModal = (record) => {
        setTransDelegateId(record.transDelegateId)
        setRequestNo(record.requestNo)
        setSelectedRFPDate(record.rfpDate);
        setSelectedTransportTeam(record.transportTeamId)
        setSelectedWpid(record.workpackageid)
        setIsModalVisible(true)
        ddlTransporTeam(record.transportTeamId,record.workpackageid)
        console.log(record.transportTeamId)
    }

    const hideModal = () => {
        setIsModalVisible(false)
    }
    const showModalTab = (record) => {
        setIsModalTabVisible(true)
        setOdi(record)
    }

    const hideModalTab = () => {
        setIsModalVisible(false)
    }
    const handlePost = () => {
        setIsLoading(true);
        const body = {
            "transDelegateId":transDelegateId,
            "transferTo":selectedAssignTo,
            "transferBy":userId
        }
        API.postPickUpCompletion(body).then(
            result=>{
              
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getPickUpCompletion()
                    setIsModalVisible(false)
                }
                else{
                    toast.error(result.message)
                }
            })
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
                      
                            <Tooltip title="Re-Assign Transport team Form">
                                <LocalShippingIcon style={{fontSize:24,color:"#2886b8"}} onClick={()=>showModal(record)}/>  
                            </Tooltip>
                             
                    
                                                         
                            <Tooltip title=" Delete Order Request">
                                <EyeFilled style={{fontSize:20}} />
                            </Tooltip>
                        </Space>
                        <Tooltip title="View Detail">
                            <EyeFilled style={{fontSize:20}} onClick={()=>showModalTab(record.orderDetailId)}/>  
                        </Tooltip>
                        
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
                    dataSource={dataPickUp}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />}
            <Modal title="ReAssignment Task"
                visible={isModalVisible}
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
                                    ddl?.map(rbs =>  <Select.Option value={rbs.requestTypeId}> 
                                        {rbs.requestTypeName}</Select.Option>)
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
         \
                </div>
                
            </Modal>

            <Modal visible={isModalVisible}  onCancel={hideModalTab} 
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

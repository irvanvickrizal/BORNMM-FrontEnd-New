/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import moment from 'moment'
import {Table,Modal,Form,Typography,Select,Button,Col,Row,Space,Spin,Tooltip,Input,Card,Tabs} from "antd"
import GroupIcon from '@mui/icons-material/Group';
import API from '@app/utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import {EyeFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'

export default function TableSubconCancelation() {
    const [isModalViseble,setIsModalVisible] = useState(false)
    const [isModalTabViseble,setIsModalTabVisible] = useState(false)
    const [dataTaskCancel,setDataTaskCancel] = useState([])
    const [dataSubcon,setDataSubcon] = useState([])
    const [dataOrderDetail,setDataOrderDetail] = useState([])
    const [dataMaterial,setDataMaterial] = useState([])
    const [dataLog,setDataLog] = useState([])
    const [dataCoordinator,setDataCoordinator] = useState([])
    const [ddlSubcon,setDdlSubcon] = useState("")
    const [ddlCoordinator,setDdlCoordinator] = useState("")
    const [selectedTaskId,setSelectedTaskId] = useState("")
    const [wpId,setWpId] = useState("")
    const [odi,setOdi] = useState("")

    const {Title} = Typography
    const { TabPane } = Tabs;
    const [isLoading,setIsLoading] = useState(false)
    const page =1
    const CardTitle = (title) => <Title level={5}>{title}</Title>
    const dataUser = useSelector(state=>state.auth.user.uid)

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

 

    
    const getApiTaskSconCancel = () => {
        setIsLoading(true);
        API.getSconTaskCancel(dataUser).then(
            result=>{
                setDataTaskCancel(result);
                setIsLoading(false);
                console.log("data Task Cancelation =>",result);
            }
        )
      
    }
    const getDdlSubcon = () => {
   
        API.getDismantledBy(dataUser).then(
            result=>{
                setDataSubcon(result);
          
                console.log("data Subcon =>",result);
            }
        )
      
    }
    const getDdlCoordinator = (selectedSubcon) => {
   
        API.getTeamCoordinator(selectedSubcon,wpId).then(
            result=>{
                setDataCoordinator(result);
          
                console.log("data Subcon =>",result);
            }
        )
      
    }
    function getOrderDetail(data) {
        //setIsLoading(true);
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
        API.getMaterial(odi).then(
            result=>{
                setDataMaterial(result);
                //setIsLoading(false);
                console.log("data order Material =>",result);
            }
        )
    }
    function getLog(data) {
        //setIsLoading(true);
        API.getLog(odi).then(
            result=>{
                setDataLog(result);
                //setIsLoading(false);
                console.log("data order Material =>",result);
            }
        )
    }

    const handlePostReassignment = (data) => {
        const body = {
            "subconTaskCancellationId":selectedTaskId,
            "orderDetailId":odi,
            "transferTo":data.coordinator,
            "transferBy": dataUser,
            "newSubconId":data.subconList
        }
        console.log(body,"this is body")
            
        setIsLoading(true);
        API.postSconTaskReassignment(body).then(
            result=>{
                try{
                    if(result.status=="success"){
                        getApiTaskSconCancel()
                        setIsLoading(false)
                        toast.success(result.message)
                  
                           
                    }
              
                }
                catch(e){
                    toast.error(result.message)
                    setIsLoading(false)
                    console.log(e,"error catch")
                }
            }
  
        )
      
        setIsModalVisible(false)
    }

    const handleDropdownCoordinator = (data) => {
        setDdlSubcon(data.subconList)
        getDdlCoordinator(data)
  
    }

    const showModal = (data) => {
        setIsModalVisible(true)
        getDdlSubcon()
        setSelectedTaskId(data.subconTaskCancellationId)
        setWpId(data.workpackageId)
        setOdi(data.orderDetailId)
    }
    const showModalTab = (data) => {
        setIsModalTabVisible(true)
        setOdi(data)
        getOrderDetail(data)
    }

    const hideModal = () => {
        setIsModalVisible(false)
    }
    const hideModalTab = () => {
        setIsModalTabVisible(false)
    }


    const columns = [
        
        {
            title: "No",
            key: "index",
            width:"2%",
            render: (value, item, index) => page + index
        },
        {
            title: "Request No",
            dataIndex: "orderReqNo",
            ...Search("orderReqNo")
        },
        {
            title: "Order Type",
            dataIndex: "orderType",
            ...Search("orderType")
        },
        {
            title: "Site No",
            dataIndex: "siteNo",
            ...Search("siteNo")
        },
    
        {
            title: "Origin",
            dataIndex: "originName",
            ...Search("originName")
        },
        {
            title: "Destination",
            dataIndex: "destinationName",
            ...Search("destinationName")
        },
        {
            title: "Site Name",
            dataIndex: "siteName",
            ...Search("siteName")
        },
        {
            title: "Region",
            dataIndex: "region",
            ...Search("region")
        },
  
        {
            title: "Scope Name",
            dataIndex: "scopeName",
            ...Search("scopeName")
        },
        {
            title: "Scope Detail",
            dataIndex: "scopeDetail",
            ...Search("scopeDetail")
        },
        {
            title: "Delivery Mode",
            dataIndex: "deliveryMode",
            ...Search("deliveryMode")
        },
        {
            title: "Workpackage ID",
            dataIndex: "workpackageId",
            ...Search("workpackageId")
        },
        
        {
            title: "Rejected By",
            dataIndex: "taskCancelledBy",
            ...Search("taskCancelledBy")
        },
        {
            title: "Subcon Name",
            dataIndex: "subconName",
            ...Search("subconName")
        },
  
        {
            title: "Rejected Date",
                
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(dataTaskCancel.taskCancelledDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                    </Space>
                )
            },
            ...Search("pickupOrDeliveryDate")
        },
        {
            title: "Reason of Cancelation",
            dataIndex: "reasonOfCancelledTask",
            ...Search("reasonOfCancelledTask")
        },
        // {
        //     title: "Assign To",
        //     dataIndex: "assignedTo",
        //     ...Search("assignedTo")
        // },
        {
            title: "Action",
            align:'center',
            fixed:'right',
            width:90,
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            <Tooltip title="Re-Assign Task">
                                <GroupIcon  style={{fontSize:20,color:"#008de3"}} onClick={()=>showModal(record)}/>
                            </Tooltip>
                            <Tooltip title="View Detail">
                                <EyeFilled  style={{fontSize:20,color:"#008de3"}} onClick={()=>showModalTab(record.orderDetailId)}/>
                            </Tooltip>
                        </Space>
                    </div>
                )
            },
          
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
            ...Search("incomingDate")
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
            ...Search("executeDate")
        },

        {
            title: "Execute By",
            dataIndex: "executedBy",
            ...Search("executedBy")
        },
        {
            title: "Event Desc",
            dataIndex: "taskName",
            ...Search("taskName")
        },
        {
            title: "Remarks",
            dataIndex: "remarks",
            ...Search("remarks")
        }
    ]

    function callback(key) {
        if(key==1){
            getOrderDetail()
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
        getApiTaskSconCancel()
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
                    columns={columns}
                    scroll={{ x: '200%' }}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    // expandable={{ expandedRowRender }}
                    dataSource={dataTaskCancel}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered 
                />
            }
            <Modal visible={isModalViseble} onCancel={hideModal}
                footer={null}
                destroyOnClose
            >
                <div> <Card  title={CardTitle("Re-Assign Task Subcontractor")}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{
                         
                        //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                        // remember: true
                        }}
                        onFinish={handlePostReassignment}
                   
                   
                        autoComplete="off"
                    >
                        <Form.Item
                        // hidden
                            label="Subcon List"
                            name="subconList"
                            rules={[{ required: true, message: 'Please Select Subcon!' }]}
                        >
                            <Select
                                onChange={(e) => handleDropdownCoordinator(e)}
                                placeholder="Select an option"
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                     
                                    
                            >
                                {dataSubcon?.length == 0 ? (<></>):( dataSubcon?.map((inv) => (
                                    <Select.Option value={inv.subconId}>
                                        {inv.subconName}
                                    </Select.Option>
                                )))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                        // hidden
                            label="Project Coordinator"
                            name="coordinator"
                            rules={[{ required: true, message: 'Please Select Project Coordinator!' }]}
                        >
                            <Select
                                onChange={(e) => setDdlCoordinator(e)}
                                placeholder="Select an option"
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                         
                            >

                                {dataCoordinator?.length == 0 ? (<></>):( dataCoordinator?.map((inv) => (
                                    <Select.Option value={inv.userId}>
                                        {inv.fullname}
                                    </Select.Option>
                                )))
                                }
                            </Select>
                        </Form.Item>
                        <div className="float-right">
                            <Col span={4} md={8} sm={24} >
                                <Space direction="horizontal">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                       
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            hideModal()
                                        }
                                    >
                                        Cancel
                                    </Button>
                                 
                             
                                </Space>
                            </Col>
                        </div>
            
                     

                  
                    </Form>
                </Card>
                </div>
            </Modal>

            {/* Modal Tab */}
            <Modal visible={isModalTabViseble}  onCancel={hideModalTab} 
                footer={[
          
                ]} 
                style={{ width: (80 * width / 100), minWidth: (80 * width / 100) }}
                zIndex={9999}
            >
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

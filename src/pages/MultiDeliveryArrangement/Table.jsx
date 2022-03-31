/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {IconButton, TextField}  from '@mui/material/';
import API  from '../../utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import exportFromJSON from 'export-from-json'
import {RedoOutlined, CloudUploadOutlined, UploadOutlined,DownloadOutlined,PlusOutlined,FileExcelOutlined,CloseOutlined, EditOutlined,DeleteOutlined,CheckOutlined  } from '@ant-design/icons';
import { Tabs,Table, Row, Col,Card, Typography, Input, Space,Spin,
    Form,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    message,
    Tooltip,
    Checkbox,
    Modal } from 'antd';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
// import { RedoOutlined } from 'node_modules/@mui/icons-material/index';

const MultiDeliveryArrangementPanel = () => {
    const { TabPane } = Tabs;
    const user = useSelector((state) => state.auth.user);
    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const { Title } = Typography;
    const mdid = params.get('mdid');
    const history = useHistory();
    const [isLoadingPage, setIsLoadingPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [multiDeliveryDetail,setMultiDeliveryDetail] = useState([]);
    const [multiDeliveryRequestList,setMultiDeliveryRequestList] = useState([]);
    const [multiDeliveryRequestPendingList,setMultiDeliveryRequestPendingList] = useState([]);
    const [isAddOrderRequest, setIsAddOrderRequest] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [ddlTransportTeam, setDdlTransportTeam] = useState([]);
    const [transportTeamId, setTransportTeamId] = useState('');
    const [selectedAssignTo, setselectedeAssignTo] = useState('');

    const navigateTo = (path) => {
        history.push(path)
    }

    const getMultiDeliveryDetail = (id) =>{
        setIsLoadingPage(true)
        API.getMultiDeliveryDetail(id).then(
            result=>{
                console.log("multidetail", result)
                setIsLoadingPage(false);
                setTransportTeamId(result[0].transportTeamId)
                setMultiDeliveryDetail(result)
            }
        )
    }

    const getMultiDeliveryRequestPending = () => {
        API.getMultiDeliveryRequest(user.uid).then(
            result=>{
                setMultiDeliveryRequestPendingList(result);
                console.log("request",result);
            }
        )
    }

    const getMultiDeliveryRequestList = (id) =>{
        setIsLoading(false)
        API.getMultiDeliveryRequestList(id).then(
            result=>{
                console.log("multidetailorder", result)
                setMultiDeliveryRequestList(result)
                
            }
        )
    }

    const handleDeleteRequestList = (data) =>{
        console.log("reqlist",data.multiDeliveryOrderDetailId)
        if (window.confirm('Are you sure you want to process this action ?')) {
            API.deleteMultiDeliveryRequest(data.multiDeliveryOrderDetailId).then(
                result=>{
                    if(result.status=="success")
                    {
                        toast.success(result.message)
                        getMultiDeliveryDetail(mdid)
                        getMultiDeliveryRequestList(mdid)
                    }
                }
            )
        }
        
    }

    const handleSubmit = () =>{
        setIsSubmit(true)
        console.log("ddl assign", transportTeamId)
        API.getDDLTransportAssignTo2(transportTeamId).then(
            result=>{
                setDdlTransportTeam(result);
                console.log("ddl assign", result)
            }
        )
    }
    const handleOKSubmit = (data) =>{
        setIsSubmit(true)
        console.log("submited",data)
        const body = (
            {
                "multiDeliveryId":mdid,
                "transferTo":data.transportTeam,
                "transferBy": user.uid
            }
        )
        API.assignMultiDelivery(body).then(
            result=>{
                if(result.status=="success"){
                    toast.success(result.message)
                    navigateTo('/task/mdarrangement')
                }
                else{
                    toast.error(result.message)
                }
            }
        )


    }
    const handleFailedSubmit = () =>{
        setIsSubmit(true)
        console.log("submited")
    }


    const handleAddRequestList = () =>{
        setIsAddOrderRequest(true)
        getMultiDeliveryRequestPending()
    }
    const handleCancelAdd = () =>{
        setIsAddOrderRequest(false)
        setIsSubmit(false)
    }
    const handleCloseAdd = () =>{
        getMultiDeliveryRequestList(mdid)
        console.log("closeadd")
        setIsAddOrderRequest(false)
    }
    const handleAddOrderRequests = (data) =>{
        console.log("add",data)
        const body = {
            "multiDeliveryId":mdid,
            "orderDetailId": data.orderDetailId,
            "LMBY": user.uid    
        }
        API.postMultiDeliveryArrangement(body).then(
            result =>{
                console.log(result,"rst add")
                toast.success(result.message)
                getMultiDeliveryRequestPending()
                // getMultiDeliveryDetail(mdid)
                // getMultiDeliveryRequestList(mdid)
            }
        )
    }

    const columns = [
        {
            title : "Multi Delivery No",
            dataIndex:'multiDeliveryNo',
        },
        {
            title : "Created By",
            dataIndex:'createdBy',
        },
        {
            title : "Created Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.cdt).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </Space>
                )
            },
        },
        {
            title : "WH Team",
            dataIndex:'lspName',
        },
        {
            title : "Total Order Req Group",
            dataIndex:'totalOrderRequestGroup',
        },
        {
            title : "Total Collies",
            dataIndex:'totalCollies',
        },
        {
            title : "Total Volume",
            dataIndex:'totalVolume',
        },
        {
            title : "Transport Team",
            dataIndex:'transportTeam',
        },
        {
            title : "Status",
            width: 100,
            dataIndex:'multiDeliveryStatus',
        },
        
    ]


    const columnsDeliveryRequestPending = [
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
            title : "Site No",
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
                        <p>{moment(record.rfpDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </Space>
                )
            },
            ...Search('rfpDate'),
        },
        {
            title : "Total Volume",
            dataIndex:'totalVolume',
            ...Search('totalVolume'),
        },
        {
            title : "Request Delivery Mode",
            dataIndex:'deliveryMode',
            ...Search('deliveryMode'),
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
                            <Tooltip title="Delete Order Request">
                                <IconButton size="small" color="error" onClick={()=>handleDeleteRequestList(record)}>
                                    <DeleteOutlined />
                                </IconButton>
                            </Tooltip>
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
            title : "Request No",
            dataIndex:'requestNo',
            ...Search('requestNo'),
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
            title : "Site No",
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
            ...Search('rfpDate'),
        },
        {
            title : "Total Volume",
            dataIndex:'totalVolume',
            ...Search('totalVolume'),
        },
        {
            title : "Request Delivery Mode",
            dataIndex:'deliveryMode',
            ...Search('deliveryMode'),
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
                            <Tooltip title="Add Order Request">
                                <IconButton size="small" color="primary" onClick={()=>handleAddOrderRequests(record)}>
                                    <PlusOutlined />
                                </IconButton>
                            </Tooltip>
                        </Space>
                    </div>
                )
            }
            
        },
    ]

    useEffect(() => {
        getMultiDeliveryDetail(mdid)
        getMultiDeliveryRequestList(mdid)
    },[])

    return(
        <div>
            { isLoadingPage ? <Row justify="center">
                <Col span={1}>
                    <Spin />
                </Col>
            </Row>
                :
                <Space direction="vertical">
                    <Table
                        scroll={{ x: '100%' }}
                        size="small"
                        // expandable={{ expandedRowRender }}
                        columns={columns}
                        dataSource={multiDeliveryDetail}
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                            showSizeChanger: true,
                            position: ["none"],
                        }}
                        bordered />
                    {isLoading ? <Row justify="center">
                        <Col span={1}>
                            <Spin />
                        </Col>
                    </Row>: 
                        <><Row>
                            <Col md={16} sm={24}>
                                <Title level={5}>List of Order Request</Title>
                            </Col>
                            <Col md={8} sm={24}>
                                <div className='float-right'>
                                    <Tooltip title="Add Request List">
                                        <IconButton size="small" color="primary" onClick={handleAddRequestList}>
                                            <PlusOutlined />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </Col>
                        </Row><Table
                            scroll={{ x: '200%' }}
                            size="small"
                            // expandable={{ expandedRowRender }}
                            columns={columnsDeliveryRequestPending}
                            dataSource={multiDeliveryRequestList}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["none"],
                            }}
                            bordered />
                        <Row>
                            <Col md={24} sm={24}>
                                <div className='float-right'>
                                    {multiDeliveryRequestList=='' ? 
                                        <Tooltip title="Add Request List">
                                            <Button type="primary" disabled onClick={handleSubmit}>Submit</Button>

                                        </Tooltip> :
                                        <Tooltip title="Add Request List">
                                            <Button type="primary" onClick={handleSubmit}>Submit</Button>

                                        </Tooltip>
                                    }
                                    
                                </div>
                            </Col>
                        </Row>  
                        
                        </>

                    }
                    <Modal title="Add Order Request Pending List"
                        visible={isAddOrderRequest}
                        destroyOnClose={true}
                        footer={
                            <Button key="back" onClick={handleCloseAdd}>
                                close
                            </Button>}
                        onCancel={handleCancelAdd}
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
                    
                    <Modal title="Assign to Transport Team"
                        visible={isSubmit}
                        destroyOnClose={true}
                        footer={null}
                        onCancel={handleCancelAdd}
                    >
                        <Form
                            name="basic"
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            initialValues={{
                                // 'orderDetailId': selectedOrderDetailId,
                                // 'requestNo': selectedRequestNo,
                                // 'rfpDate': moment(selectedRFPDate).format("YYYY-MM-DD"),
                                // 'deliveryType': selectedCDMRType,
                                // // 'taskScheduleId': props.taskScheduleId,
                                // // 'subconId': props.subconId,
                                // //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                                // // remember: true
                            }}
                            onFinish={handleOKSubmit}
                            onFinishFailed={handleFailedSubmit}
                            autoComplete="off"
                        >
                            <Form.Item label="Transport Team"
                                name="transportTeam"
                                rules={[{ required: true, message: 'Please Select Transport Team!'}]}
                            >
                                <Select 
                                    onChange={(e) => setselectedeAssignTo(e)}
                                    placeholder="Select an option"
                                >
                                    {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                    {
                                        ddlTransportTeam.map(inv =>  <Select.Option value={inv.userId}> 
                                            {inv.fullname}</Select.Option>)
                                    }
                                </Select>
                            </Form.Item>
                            
                            <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                                <Space>
                                    <Button type="primary" htmlType="submit">
                                Assign
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </Modal>

                </Space>
            }
        </div> 
    )
}

export default MultiDeliveryArrangementPanel;
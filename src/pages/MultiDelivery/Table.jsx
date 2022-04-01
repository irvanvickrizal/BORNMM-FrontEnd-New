/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Select,Form,Modal,Table,Tabs, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {IconButton, TextField}  from '@mui/material/';
import API  from '../../utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import exportFromJSON from 'export-from-json'
import {RedoOutlined, CloudUploadOutlined, UploadOutlined,DownloadOutlined,PlusOutlined,FileExcelOutlined,CloseOutlined, EditOutlined,DeleteOutlined,CheckOutlined  } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { RedoOutlined } from 'node_modules/@mui/icons-material/index';

const TableMultiDeliveryConfirmation = () => {
    const { TabPane } = Tabs;
    const [isLoading, setIsLoading] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [multiDeliveryConfirmationList,setMultiDeliveryConfirmationList] = useState([]);
    const [multiDeliveryRequestList,setMultiDeliveryRequestList] = useState([]);
    const [selectedOrderDetailId,setSelectedOrderDetailId] = useState('');
    const [selectedRFPId,setSelectedRFPId] = useState('');
    const [isAddMultiDelivery,setIsAddMultiDelivery] = useState(false);
    const [isCancelRFPDone,setIsCancelRFPDone] = useState(false);
    const [ddlSubcon,setDDLSubcon] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const history = useHistory();
    const navigateTo = (path) => {
        history.push(path)
    }
    const getMultiDeliveryConfirmation = () => {
        setIsLoading(true);
        API.getMultiDeliveryConfirmation(user.uid).then(
            result=>{
                setMultiDeliveryConfirmationList(result);
                setIsLoading(false);
                console.log("confirmation",result);
            }
        )
    }
    const getMultiDeliveryRequest = () => {
        setIsLoading(true);
        API.getMultiDeliveryRequest(user.uid).then(
            result=>{
                setMultiDeliveryRequestList(result);
                setIsLoading(false);
                console.log("request",result);
            }
        )
    }
    const getDDLSubcon = () => {
        API.getmSubcon(user.uid).then(
            result=>{
                setDDLSubcon(result);
                console.log("inventory",result);
            }
        )
    }
    const handleOKCancelRFPDone =(data) =>{
        setCancelLoading(true)
        const body = ({
            "rfpId":selectedRFPId,
            "orderdetailId": selectedOrderDetailId,
            "LMBY": user.uid   
        })
        console.log(body,"bodycancel")
        API.putCancelRFP(body).then(
            result=>{
                console.log(result,"cancelrfp");
                toast.success(result.message)
                getMultiDeliveryRequest()
                // getSconTaskPending();
                setCancelLoading(false)
                setIsCancelRFPDone(false)
            }
        )
    }

    const showAddMultiDelivery = () =>
    {
        getDDLSubcon()
        setIsAddMultiDelivery(true);
    }
    const showCancelRFPDone = (record) =>
    {
        setIsCancelRFPDone(true);
        setSelectedOrderDetailId(record.orderDetailId);
        setSelectedRFPId(record.rfpId)
        console.log(record,'rfp')
    }
    const handleCancelAdd = () =>
    {
        setIsAddMultiDelivery(false);
    }
    const handleCancelCancelRFPDone = () =>
    {
        
        setIsCancelRFPDone(false);
    }

    const handleFailedForm = () =>{
        
    }
    const handleEditMultiDelivery = (id) =>{
        navigateTo(`/task/mdarrangementform?mdid=${id}`)
    }
    const handleDeleteMultiDelivery = (id) =>{
        if (window.confirm('Are you sure you want to process this action ?')) {
            console.log(id)
            const body = (
                {
                    "multiDeliveryId":id,
                    "LMBY": user.uid
                }
            )
            console.log(body,"body")
            API.putDeleteMultiDeliveryRequest(body).then(
                result=>{
                    console.log(result);
                    toast.success(result.message)
                    getMultiDeliveryConfirmation()
                }
            )
        }
    }

    const handleDDLSubconChange = (data) =>{
        console.log("ddlsubcon", data)
    }
    const handleOKForm = (record) =>{
        console.log(record,"ok form")
        const body = (
            {
                "cby":user.uid,
                "notes": record.notes,
                "transportTeamId": record.transportTeam
            }
        )
        console.log(body,"body")
        API.postMultiDelivery(body).then(
            result=>{
                console.log(result);
                toast.success(result.message)
                getMultiDeliveryConfirmation()
                setIsAddMultiDelivery(false);
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
            title : "Multi Delivery No",
            dataIndex:'multiDeliveryNo',
            ...Search('multiDeliveryNo'),
        },
        {
            title : "Multi Delivery Note",
            dataIndex:'multideliveryNote',
            ...Search('multideliveryNote'),
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
            title : "Created By",
            dataIndex:'createdBy',
            ...Search('createdBy'),
        },
        {
            title : "Created Date",
            ...Search('createdDate'),
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.cdt).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </Space>
                )
            },
        },
        {
            title : "Status",
            width: 100,
            dataIndex:'multiDeliveryStatus',
            ...Search('multiDeliveryStatus'),
        },
        {
            title:"Action",
            // key:"orderDetailId",
            align:'center',
            width: 80,
            fixed:'right',
            render:(record)=>{
                return (
                    <div>  
                        <Space>
                            <Tooltip title="Edit Multi Delivery">
                                <IconButton size="small" color="primary" onClick={()=>handleEditMultiDelivery(record.multiDeliveryId)}>
                                    <EditOutlined />
                                </IconButton>
                            </Tooltip>
                            {record.viewToDelete ? 
                                <Tooltip title="Delete Multi Delivery">
                                    <IconButton size="small" color="error" onClick={()=>handleDeleteMultiDelivery(record.multiDeliveryId)}>
                                        <DeleteOutlined />
                                    </IconButton>
                                </Tooltip>
                                :null
                            }
                        </Space>
                    </div>
                )
            }
            
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
                            <Tooltip title="Cancel Task">
                                <IconButton size="small" color="error" onClick={()=>showCancelRFPDone(record)}>
                                    <RedoOutlined />
                                </IconButton>
                            </Tooltip>
                        </Space>
                    </div>
                )
            }
            
        },
    ]

    function callback(key) {
        if(key==1){
            //getInventoryReport();
            getMultiDeliveryConfirmation()
        }
        else if(key==2){
            getMultiDeliveryRequest()
        }

        console.log("keytabs",key);
    }


    useEffect(() => {
        getMultiDeliveryConfirmation();
    },[selectedOrderDetailId,selectedRFPId])

    return(
        <><Tabs onChange={callback} type="card">
            <TabPane tab="Multi Delivery Confirmation Pending" key="1">
                {isLoading ? <Row justify="center">
                    <Col span={1}>
                        <Spin />
                    </Col>
                </Row> :
                    <>
                        <div className='float-right'>
                            <Tooltip title="Add Multi Delivery Group">
                                <IconButton size="small" color="success" onClick={showAddMultiDelivery}>
                                    <PlusOutlined />
                                </IconButton>
                                {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                            </Tooltip>
                        </div><Table
                            scroll={{ x: '150%' }}
                            size="small"
                            // expandable={{ expandedRowRender }}
                            columns={columns}
                            dataSource={multiDeliveryConfirmationList}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            bordered /></>}
            </TabPane>
            <TabPane tab="Multi delivery Order Request Pending" key="2">
                {isLoading ? <Row justify="center">
                    <Col span={1}>
                        <Spin />
                    </Col>
                </Row> :
                    <Table
                        scroll={{ x: '200%' }}
                        size="small"
                        // expandable={{ expandedRowRender }}
                        columns={columnsDeliveryRequestPending}
                        dataSource={multiDeliveryRequestList}
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                            showSizeChanger: true,
                            position: ["bottomLeft"],
                        }}
                        bordered />}
            </TabPane>
        </Tabs>
        <Modal title="Add Multi Delivery Group"
            visible={isAddMultiDelivery}
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
                onFinish={handleOKForm}
                onFinishFailed={handleFailedForm}
                autoComplete="off"
            >
                <Form.Item label="Transport Team"
                    name="transportTeam"
                    rules={[{ required: true, message: 'Please Select Transport Team!'}]}
                >
                    <Select 
                        onChange={(e) => handleDDLSubconChange(e)}
                        placeholder="Select an option"
                    >
                        {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                        {
                            ddlSubcon.map(inv =>  <Select.Option value={inv.subconId}> 
                                {inv.subconName}</Select.Option>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    // hidden
                    label="Notes"
                    name="notes"
                >
                    <Input.TextArea/>
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
        <Modal title="RFP Done Cancel"
            visible={isCancelRFPDone}
            onOk={handleOKCancelRFPDone}
            onCancel={handleCancelCancelRFPDone}
            confirmLoading={cancelLoading}
            destroyOnClose={true}
        >
            <p>
                Are you sure you want to Cancel RFP Done? 
            </p>
            <p>
                (RFP  Date will be no longer available once it canceled)
            </p>
        </Modal>
        </>
    )
}

export default TableMultiDeliveryConfirmation;
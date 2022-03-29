/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import {toast} from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux'
import {Tabs,Tag,Typography,Popconfirm,Select,Upload,message,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {PlusOutlined,FileExcelOutlined, CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined,DeleteTwoTone,UploadOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import API from '@app/utils/apiServices';
import {IconButton, TextField}  from '@mui/material/';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import exportFromJSON from 'export-from-json'

const TableOutboundUpload = () => {
    const { Option } = Select;
    const [isLoading, setIsLoading] = useState(true);
    const [outboundUploadFile,setOutboundUploadFile] = useState([]);
    const [isReviseFile, setIsReviseFile] = useState(false);
    const [isUploadFile, setIsUploadFile] = useState(false);
    const [errorLog,setErrorLog] = useState([])
    const [fileUpload, setFileUpload] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [inbFileId, setInbFileId] = useState(0);
    const [fileName, setFileName] = useState('');
    const [outboundSuccessLog, setOutboundSuccessLog] = useState('');
    const { Title } = Typography;
    const { TabPane } = Tabs;

    const props = {
        onRemove: () => {
            setFileUpload(null);
            return fileUpload
        },
        beforeUpload: file => {
            setFileUpload(file);
            return false;
        },
        fileUpload,
    };

    const columsOutboundSuccessLog = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Warehouse",
            dataIndex:'warehouse',
            ...Search('warehouse'),
        },
        {
            title : "Warehouse Description",
            dataIndex:'warehouseDescr',
            ...Search('warehouseDescr'),
        },
        {
            title : "DN",
            dataIndex:'dnDoc',
            ...Search('dnDoc'),
        },
        {
            title : "SDR LTR No",
            dataIndex:'sdrLtr',
            ...Search('sdrLtr'),
        },
        {
            title : "Customer PO",
            dataIndex:'customerPo',
            ...Search('customerPo'),
        },
        {
            title : "Material Code",
            dataIndex:'materialCode',
            ...Search('materialCode'),
        },
        {
            title : "Packing List",
            dataIndex:'packingList',
            ...Search('packingList'),
        },
        {
            title : "Out QTY",
            dataIndex:'qtyOut',
            ...Search('qtyOut'),
        },
        {
            title : "UOM",
            dataIndex:'uom',
            ...Search('uom'),
        },
        {
            title : "Delivery Type",
            dataIndex:'deliveryType',
            ...Search('deliveryType'),
        },
        {
            title : "Request Date",
            width: 120,
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.requestDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('uploadedDate'),
        },        
        {
            title : "Area",
            dataIndex:'area',
            ...Search('area'),
        },
        {
            title : "Record Date",
            width: 120,
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.recordDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('uploadedDate'),
        },        
    ]
    const getOutboundUploadFileList = () => {
        setIsLoading(true);
        API.getOutboundUploadFile().then(
            result=>{
                
                console.log("scontaskpendnig",result);
                setOutboundUploadFile(result)
                setIsLoading(false);
            }
        )
    }
    const getOutboundSuccessLog = () => {
        setIsLoading(true);
        API.getOutboundSuccessLog().then(
            result=>{
                
                console.log("scontaskpendnig",result);
                setOutboundSuccessLog(result)
                setIsLoading(false);
            }
        )
    }

    function getErrorLog(id,fileNames){

        API.getOutboundErrorList(id).then(
            result=>{
                console.log('i am error log Scope',result)
                
                setErrorLog(result);
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileNameDownload = `errorlog_${fileNames}`;
                exportFromJSON({ data, fileNameDownload, exportType });
            }
        )
    }

    const handleUploadFile = (id,filenameparam) =>
    {
        setInbFileId(id);
        setFileName(filenameparam);
        console.log("inbfileid: ", filenameparam);
        setIsReviseFile(true);
    }
    const handleDeleteFile = (id) =>
    {
        if (window.confirm('Are you sure you want to delete this file ?')) {
            console.log(id)
            API.deleteOutboundFile("",id).then(
                result=>{
                    console.log("handledelete",result)
                    if(result.status=="success"){
                        getOutboundUploadFileList();
                        message.success(result.message)
                    }
                    else{
                        getOutboundUploadFileList();
                        message.error(result.message)
                    }
                }
            )
        }
        // API.deleteInboundFile(id).then(
        //     result=>{
        //         console.log("handledelete",result)
        //         if(result.status=="success"){
        //             message.success("Delete Success")
        //         }
        //     }
        // )
    }
    const handleOkReviseFile = () =>
    {
        setIsReviseFile(false);
    }
    const handleCancelReviseFile = () =>
    {
        
        setIsReviseFile(false);
    }
    const handleOkFile = () =>
    {
        setIsUploadFile(false);
    }
    const handleCancelFile = () =>
    {
        setIsUploadFile(false);
    }

    const colorTag = (status) => {
        if(status=="Success"){
            return "green"
        }
        if(status=="Failed"){
            return "red"
        }
        if(status=="Pending"){
            return "blue"
        }
        return "";
    }

    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "File Name",
            dataIndex:'fileName',
            ...Search('fileName'),
        },
        {
            title : "Upload Date",
            dataIndex:'uploadedDate',
            width: 120,
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.uploadedDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </Space>
                )
            },
            ...Search('uploadedDate'),
        },
        {
            title : "Upload By",
            dataIndex:'uploadedBy',
            width: 150,
            ...Search('uploadedBy'),
        },
        {
            title : "Status",
            render:(record)=>{
                return (
                    <Space>
                        <Tag color={colorTag(record.executeStatus)}>{record.executeStatus}</Tag>
                    </Space>
                )
            },
            width: 100,
            ...Search('executeStatus'),
        },
        {
            title : "System Execeute Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.systemExecuteDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </Space>
                )
            },
            width: 150,
            ...Search('systemExecuteDate'),
        },
        {
            title:"Err Message",
            key:"orderMaterialId",
            align:'center',
            ellipsis: true,
            render:(record)=>{
                return (
                    <Space>
                        {!record.rowLogCount > 0 ?
                            <p style={{ color:"red" }}>{record.errMessage}</p>
                            :
                            <Tooltip title="Download Log">
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    color="error"
                                    onClick={() => getErrorLog(record.inbFileId,record.fileName)}
                                >
                                    <SimCardDownloadIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    </Space>
                )
            }
            
        },
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed: 'right',
            width: 100,
            render:(record)=>{
                return (
                    <Space>
                        {record.executeStatus=="Failed" ? 
                            <><Tooltip title="Upload File">
                                <IconButton
                                    size='small'
                                    color="primary"
                                    aria-label="upload file"
                                    component="span"
                                    onClick={() => handleUploadFile(record.inbFileId, record.fileName)}>
                                    <UploadOutlined />
                                </IconButton>
                            </Tooltip><Tooltip title="Delete File">
                                <DeleteTwoTone twoToneColor="#FF0000" onClick={() => handleDeleteFile(record.inbFileId)} />
                            </Tooltip></>:null
                        }
                    </Space>
                )
            }
            
        },
        
    
    ]

    const handleUpload = () => {
        setUploading(true)
        
        API.postReviseOutboundFile(inbFileId,fileUpload).then(
            result=>{
                if(result.value.status=="success"){
                    setFileUpload(null);
                    setUploading(false);
                    getOutboundUploadFileList()
                    setIsReviseFile(false);
                    // window.location.reload()
                    message.success('upload successfully.');
                }
                else{
                    setFileUpload(null);
                    setUploading(false);
                    props.onRemove();
                    setIsReviseFile(false);
                    getOutboundUploadFileList()
                    message.error(result.value.message);
                }

                console.log('i am PO upload xx',result)
            }
        );
    }
    const handleUploadFileNew = () => {
        setUploading(true)
        API.postOutboundFile(fileUpload).then(
            result=>{
                if(result.value.status=="success"){
                    setFileUpload(null);
                    setUploading(false);
                    getOutboundUploadFileList()
                    setIsUploadFile(false);
                    // window.location.reload()
                    toast.success('upload successfully.');
                }
                else{
                    setFileUpload(null);
                    setUploading(false);
                    props.onRemove();
                    setIsUploadFile(false);
                    getOutboundUploadFileList()
                    toast.error(result.value.message);
                }

                console.log('i am PO upload xx',result)
            }
        );
    }

    function callback(key) {
        if(key==1){
            getOutboundUploadFileList();
        }
        else if(key==2){
            getOutboundSuccessLog();
        }
        console.log("keytabs",key);
    }

    const handleShowAdd = () =>{
        setIsUploadFile(true);
    }

    useEffect(() => {
        getOutboundUploadFileList();
    },[])

    return(
        <>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Outbound File List" key="1">
                    {isLoading ?   
                        <Row justify="center">
                            <Col span={1}>    
                                <Spin />
                            </Col>
                        </Row>  
                        :
                        <>
                            <Row>
                                <Col md={24} sm={24} >
                                    <div className='float-right'>
                                        <Tooltip title="Upload File">
                                            <IconButton size="small" color="primary" onClick={handleShowAdd}>
                                                <PlusOutlined />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Download Template">
                                            <IconButton size="small" color="secondary">
                                                <a href='/file/Outbound.xlsx' download="[ProjectCode]_SHPCON_[YYYMMDD]_[HHMMSS]_[RunningNo]">
                                                    <FileExcelOutlined />
                                                </a>
                                            </IconButton>
                                            {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                                        </Tooltip>
                                    </div>
                                </Col>
                            </Row>
                            <Table
                                scroll={{ x: '100%' }}
                                size="small"
                                // expandable={{ expandedRowRender }}
                                columns={columns}
                                dataSource={outboundUploadFile}
                                pagination={{
                                    pageSizeOptions: ['5', '10', '20', '30', '40'],
                                    showSizeChanger: true,
                                    position: ["bottomLeft"],
                                }}
                                bordered />
                        </>
                    }
                </TabPane>
                <TabPane tab="Outbound Success Log" key="2">
                    {isLoading ?   
                        <Row justify="center">
                            <Col span={1}>    
                                <Spin />
                            </Col>
                        </Row>  
                        :
                
                        <Table
                            scroll={{ x: '150%' }}
                            size="small"
                            // expandable={{ expandedRowRender }}
                            columns={columsOutboundSuccessLog}
                            dataSource={outboundSuccessLog}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            bordered />
                    }
                </TabPane>
            </Tabs>
            <Modal title="Upload Revise File"
                visible={isReviseFile}
                onOk={handleOkReviseFile}
                onCancel={handleCancelReviseFile}
                footer={null}
                destroyOnClose={true}
            >
                <div>
                    <p>Existing File Name : {fileName}</p>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    <Button
                        type="primary"
                        onClick={handleUpload}
                        disabled={fileUpload == null}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                    >
                        {uploading ? 'Uploading' : 'Start Upload'}
                    </Button>
                </div>
            </Modal>
            <Modal title="Upload Outbound File"
                visible={isUploadFile}
                onOk={handleOkFile}
                onCancel={handleCancelFile}
                footer={null}
                destroyOnClose={true}
            >
                <div>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    <Button
                        type="primary"
                        onClick={handleUploadFileNew}
                        disabled={fileUpload == null}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                    >
                        {uploading ? 'Uploading' : 'Start Upload'}
                    </Button>
                </div>
            </Modal>
        </>
            
    )
}

export default TableOutboundUpload;
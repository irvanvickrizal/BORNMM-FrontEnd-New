/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Tabs,InputNumber, Select,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {StepBackwardOutlined,FileExcelTwoTone,UploadOutlined, CheckCircleTwoTone,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import API from '@app/utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import exportFromJSON from 'export-from-json'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const BOQReferenceDetail = () => {
    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const bid = params.get('bid');
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [boqReference,setBOQReference] = useState([]);
    const [isFormRFP,setIsFormRFP] = useState(false);
    const [formLoading,setFormLoading] = useState(false);
    const [orderDetailId,setOrderDetailId] = useState('');
    const [selectedRequestNo,setRequestNo] = useState('');
    const [selectedOrderRequestNo,setOrderRequestNo] = useState('');
    const [selectedOrderType,setOrderType] = useState('');
    const [selectedPickuporDeliveryDate,setPickuporDeliveryDate] = useState('');
    const { TabPane } = Tabs;
    const user = useSelector((state) => state.auth.user);
    const navigateTo = (path) => {
        history.push(path)
    }
    
    const getBOQRefList = (boqid) => {
        setIsLoading(true);
        API.getBOQSiteListReference(boqid).then(
            result=>{
                setBOQReference(result);
                setIsLoading(false);
                console.log("waiting rfp",result);
            }
        )
    }

    const handleOKForm = (record) =>{
        console.log(record,"ok form RFP")
        setIsLoading(true);
        const body = ({
            "orderdetailId":record.orderDetailId,
            "totalCollies":record.totalCollies,
            "LMBY": user.uid    
        })
        console.log(body,"body")
        API.postWaitingRFP(body).then(
            result=>{
                setIsLoading(false);
                getBOQRefList();
                setIsFormRFP(false);
                console.log("waiting post rfp",result);
            }
        )
    }

    const handleCancelForm = () =>{
        setIsFormRFP(false);
    }

    const handleFailedForm = () =>{
        
    }

    const handleRFPForm = (record) => {
        setOrderDetailId(record.orderDetailId);
        setRequestNo(record.requestNo);
        setOrderType(record.orderType);
        setOrderRequestNo(record.orderRquestNo)
        setPickuporDeliveryDate(record.pickupOrDeliveryDate);

        setIsFormRFP(true);
        console.log("rfp form",record);
    }


    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "CPO No",
            dataIndex:'cpoNo',
            ...Search('cpoNo'),
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
            title : "Scope",
            dataIndex:'scope_name',
            ...Search('scope_name'),
        },
        {
            title : "Package Name",
            dataIndex:'package_name',
            ...Search('package_name'),
        },
        {
            title : "Workpackage ID",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
        },
        {
            title : "Total Item AS PO BOQ",
            dataIndex:'totalItemAsPO',
            ...Search('totalItemAsPO'),
        },
        {
            title : "Total Item AS Plan BOQ",
            dataIndex:'totalItemAsPlan',
            ...Search('totalItemAsPlan'),
        }
    
    ]

    const handleAsPOBulkUpload = () =>{
        navigateTo(`/boq/boqpoupload?bid=${bid}`)
    }

  
    const handleAsPlanBulkUpload = () =>{
        navigateTo(`/boq/boqasplanupload?bid=${bid}`)
    }

    const handleDownloadSitelist = () =>{
        API.getBOQSiteListReference(bid).then(
            result=>{
                console.log('i am error log Scope',result)
                
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `sitelist_${bid}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }
  

    useEffect(() => {
        getBOQRefList(bid);
    },[])

    return(
        isLoading ?   
            <Row justify="center">
                <Col span={1}>    
                    <Spin />
                </Col>
            </Row>  
            :
            <>
                <Row>
                    <Col md={16} sm={24} >
                        <Tooltip title="Back to BOQ Ref List">
                            <IconButton size="small" color="primary" onClick={()=>history.push(`/boq/boqreference`)}>
                                <StepBackwardOutlined />
                            </IconButton>
                        </Tooltip>
                    </Col>
                    <Col md={8} sm={24} >
                        <div className='float-right'>
                            <Tooltip title="As PO BOQ Bulk Upload">
                                <IconButton size="small" color="primary" onClick={handleAsPOBulkUpload}>
                                    <UploadOutlined />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="As Plan BOQ Bulk Upload">
                                <IconButton size="small" color="primary" onClick={handleAsPlanBulkUpload}>
                                    <UploadOutlined />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Download Sitelist">
                                <IconButton size="small" color="success" onClick={handleDownloadSitelist}>
                                    <FileExcelTwoTone twoToneColor="#52c41a" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Col>
                </Row>
                <Table
                    // scroll={{ x: '100%' }}
                    scroll={{ x: 1500, y: 300 }}
                    // size="small"
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={boqReference}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />
                <Modal title="Cancel Task"
                    visible={isFormRFP}
                    confirmLoading={formLoading}
                    destroyOnClose={true}
                    footer={null}
                
                    onCancel={handleCancelForm}
                >
                    
                </Modal></>

            
    )
}

export default BOQReferenceDetail;
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import React,{useState,useEffect} from 'react'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import API from '@app/utils/apiServices'
import {Tabs,Tag,Typography,Popconfirm,Select,Upload,message,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {PlusOutlined, FileExcelOutlined,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined,DeleteTwoTone,UploadOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import { useSelector } from 'react-redux'
import exportFromJSON from 'export-from-json'

export default function TableOrderRequestDone() {
    const[dataOrderRequestDone,setDataOrderRequestDone] = useState([])
    const[sownloadData,setDownloadData] = useState([])
    const[outboundSuccessLog,setOutboundSuccessLog] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { TabPane } = Tabs;
    const userId = useSelector(state=>state.auth.user.uid)

    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const ordertype = params.get('ot');


    function getOrderRequestDone(uid,ordertypeid) {
        setIsLoading(true);
        API.getOrderRequestDone(uid,ordertypeid).then(
            result=>{
                setDataOrderRequestDone(result);
                setIsLoading(false);
                console.log("prderrequestdone status order =>",result);
            }
        )
    }

    const handleDownloadItemOrdered = (record) => {
        API.getItemBookedList2(record.orderDetailId).then(
            result=>{
                setDownloadData(result);
                console.log("data  Download :",result);
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `${record.orderReqNo}_ItemOrderedList_${moment().format("DDMMYYYY hhmmss")}`;
                exportFromJSON({ data, fileName, exportType });
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
            width:150,
            title : "Request No",
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            width:150,
            title : "Site No",
            dataIndex:'siteNo',
            responsive: ['md'],
            ...Search('siteNo'),
        },
        {
            width:150,
            title : "Site Name",
            dataIndex:'siteName',
            responsive: ['md'],
            ...Search('siteName'),
        },
        {
            width:150,
            title : "Workpackage Id",
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            width:150,
            title : "Order Type",
            dataIndex:'orderType',
            ...Search('orderType'),
        },
        {
            width:150,
            title : "Request Type Name",
            dataIndex:'requestTypeName',
            ...Search('requestTypeName'),
        },
        {
            width:150,
            title : "CT Name",
            dataIndex:'ctName',
            ...Search('ctName'),
        },
        {
            width:150,
            title : "Site Condition",
            dataIndex:'siteCondition',
            ...Search('siteCondition'),
        },
        {
            width:150,
            title : "Origin",
            dataIndex:'originName',
            ...Search('originName'),
        },
        {
            width:150,
            title : "Destination",
            dataIndex:'destinationName',
            ...Search('destinationName'),
        },
        {
            width:150,
            title : "Delivery Type",
            dataIndex:'deliveryType',
            ...Search('deliveryType'),
        },
        {
            width:150,
            title :  "Packet Type",
            dataIndex:'packetType',
            ...Search('packetType'),
        },
        {
            width:150,
            title :  "Location Address",
            dataIndex:'locationAddress',
            ...Search('locationAddress'),
        },
        {
            width:150,
            title :  "PIC on Site",
            dataIndex:'picOnSite',
            ...Search('picOnSite'),
        },
        {
            width:150,
            title :  "Subcon Name",
            dataIndex:'subconName',
            ...Search('subconName'),
        },
        {
            width:150,
            title : "Requester",
            dataIndex:'requesterName',
            ...Search('requesterName'),
        },
        {
            width:150,
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
            width:150,
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
            width:150,
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
            width:150,
            title : "Approve By",
            dataIndex:'approvedBy',
            responsive: ['md'],
            ...Search('approvedBy'),
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
            title : "Package Name",
            dataIndex:'packageName',
            ...Search('packageName'),
        },
     
    
        {
            width:150,
            title : "Logistic Completed By ",
            dataIndex:'logisticCompletedBy',
            ...Search('logisticCompletedBy'),
        },
    

        {
            width:150,
            title : "LSP Name",
            dataIndex:'lspName',
            ...Search('lspName'),
        },
        {
            width:150,
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
            width:150,
            title : "Total Volume",
            dataIndex:'totalCollies',
            ...Search('totalCollies'),
        },
        
        {
            width:150,
            title : "Total ",
            dataIndex:'total',
            ...Search('total'),
        },
        
        {
            width:150,
            title : "RFP Confirmed By",
            dataIndex:'rfpConfirmedBy',
            ...Search('rfpConfirmedBy'),
        },
        {
            width:150,
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
        
        {width:150,
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
        {width:150,
            title : " Order Status",
            dataIndex:'orderStatus',
            ...Search('orderStatus'),
        }
  
   
    ]

    const columns2 = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Request No",
            width:150,
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            title : "Site No",
            width:150,
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "CT Name",
            width:150,
            dataIndex:'ctName',
            ...Search('ctName'),
        },
        {
            title : "WorkpackageId",
            width:150,
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            title : "CPO No",
            width:150,
            dataIndex:'cpoNo',
            ...Search('cpoNo'),
        },
        {
            title : "Delivery Type",
            width:150,
            dataIndex:'deliveryType',
            ...Search('deliveryType'),
        },
        {
            title :  "RFP Date",
            width:150,
            ...Search('rfpDate'),
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.rfpDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
        },
        {
            title :  "Request Date",
            width:150,
            ...Search('requestDate'),
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.requestDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
        },
        {
            title :  "Approve Date",
            width:150,
            ...Search('approveDate'),
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.approveDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
        },
    ]

    useEffect(() => {
        getOrderRequestDone(userId,ordertype);
        // getOutboundSuccessLog()
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
                    <Table
                        scroll={{ x: '200%',y:500 }}
                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                        size='small'
                        columns={columns}
                        dataSource={dataOrderRequestDone}
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                            showSizeChanger: true,
                            position: ["bottomLeft"],
                        }}
                        bordered /></>}
        </div>
    )
}

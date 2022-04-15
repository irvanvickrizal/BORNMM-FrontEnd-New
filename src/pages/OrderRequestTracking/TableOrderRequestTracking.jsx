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

export default function TableOrderRequestTracking() {
    const[dataOrder,setDataOrder] = useState([])
    const[sownloadData,setDownloadData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector(state=>state.auth.user.uid)

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
  
   
    ]


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
        </div>
    )
}

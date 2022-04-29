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

export default function TableOutboundStatusReport() {
    const[dataOutboundStatus,setDataOutboundStatus] = useState([])
    const[sownloadData,setDownloadData] = useState([])
    const[outboundSuccessLog,setOutboundSuccessLog] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { TabPane } = Tabs;
    const userId = useSelector(state=>state.auth.user.uid)

    function getOutboundStatusReport() {
        setIsLoading(true);
        API.getOutboundStatusReport(userId).then(
            result=>{
                setDataOutboundStatus(result);
                setIsLoading(false);
                console.log("outbound status order =>",result);
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
    const getDownloadDataDetail = () => {
        API.getOutboundStatusReport(userId).then(
            result=>{
                const data = result//result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `OutboundStatusReport_${moment().format("DD-MM-YYYY hh:mm:ss")}`;
                exportFromJSON({ data, fileName, exportType });
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
    const getDownloadSuccesLog = () => {
        API.getOutboundSuccessLog().then(
            result=>{
                const data = result//result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `InventoryOutbound_successlog_${moment().format("DD-MM-YYYY hh:mm:ss")}`;
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
            title : "Site No",
            width:150,
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Region",
            width:150,
            dataIndex:'region',
            ...Search('region'),
        },
        {
            title : "Zone",
            width:150,
            dataIndex:'zone',
            ...Search('zone'),
        },
        {
            title : "WorkpackageId",
            width:150,
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            title : "CDMR Type",
            width:150,
            dataIndex:'cdmrType',
            ...Search('cdmrType'),
        },
        {
            title : "Delivery Type",
            width:150,
            dataIndex:'deliveryType',
            ...Search('deliveryType'),
        },
        {
            title : "Delivery Mode",
            width:150,
            dataIndex:'deliveryMode',
            ...Search('deliveryMode'),
        },
        {
            title :  "RFP Date",
            width:150,
            ...Search('rdpDate'),
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.rfpDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
        },
        {
            title :  "Order Request No",
            width:150,
            dataIndex:'orderReqNo',
            ...Search('orderReqNo'),
        },
        {
            title : "Total Request QTY",
            width:150,
            dataIndex:'totalReqQTY',
            ...Search('totalReqQTY'),
        },
        {
            title : "Total Booked QTY",
            width:150,
            dataIndex:'bookedQTY',
            ...Search('bookedQTY'),
        },
        {
            title : "Total Outbound QTY",
            width:150,
            dataIndex:'outQTY',
            ...Search('outQTY'),
        },
        {
            title : "Outbound Status",
            width:150,
            dataIndex:'outboundStatus',
            ...Search('outboundStatus'),
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
                        <Tooltip title="Download Item Ordered List">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span"
                                onClick={() => handleDownloadItemOrdered(record)}>
                                <FileExcelOutlined />
                            </IconButton>
                        </Tooltip>
                    </Space>
                )
            }
        }
   
    ]

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
                        <p>{moment(record.recordDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </Space>
                )
            },
            ...Search('uploadedDate'),
        },
        {
            title : "File Name",
            dataIndex:'fileName',
            ...Search('fileName'),
        },
        {
            title : "Uploaded By",
            dataIndex:'uploadedBy',
            ...Search('uploadedBy'),
        },             
    ]

    function callback(key) {
        if(key==1){
            getOutboundStatusReport();
        }
        else if(key==2){
            getOutboundSuccessLog();
        }
        console.log("keytabs",key);
    }

    useEffect(() => {
        getOutboundStatusReport();
        // getOutboundSuccessLog()
        console.log(userId,"asdasd")
    },[])

    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Outbound Site List" key="1">
                    { isLoading ?   
                        <Row justify="center">
                            <Col span={1}>    
                                <Spin />
                            </Col>
                        </Row>  
                        :
                        <><div className='float-right'>
                            <Tooltip title="Download Outbound Status Report">
                                <IconButton size="small" color="success" onClick={getDownloadDataDetail}>
                                    <FileExcelOutlined />
                                </IconButton>
                                {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                            </Tooltip>
                        </div><Table
                            scroll={{ x: '200%',y:500 }}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                            size='small'
                            columns={columns}
                            dataSource={dataOutboundStatus}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            bordered /></>}
                </TabPane>
                <TabPane tab="Outbound Success Log" key="2">
                    { isLoading ?   
                        <Row justify="center">
                            <Col span={1}>    
                                <Spin />
                            </Col>
                        </Row>  
                        :
                        <><div className='float-right'>
                            <Tooltip title="Download Outbound Status Report">
                                <IconButton size="small" color="success" onClick={getDownloadSuccesLog}>
                                    <FileExcelOutlined />
                                </IconButton>
                                {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                            </Tooltip>
                        </div><Table
                            scroll={{ x: '200%',y:500 }}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                            columns={columsOutboundSuccessLog}
                            size="small"
                            dataSource={outboundSuccessLog}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            bordered /></>}
                </TabPane>
            </Tabs>

          
           
        </div>
    )
}

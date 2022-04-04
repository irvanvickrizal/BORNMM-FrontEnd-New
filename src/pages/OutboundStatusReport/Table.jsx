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
    const [isLoading, setIsLoading] = useState(true);
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

    const handleDownloadItemOrdered = (odi) => {
        API.getItemBookedList2(odi).then(
            result=>{
                setDownloadData(result);
                console.log("data  Download :",result);
               
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `ItemBookedList_${moment().format("DD-MM-YYYY hh:mm:ss")}`;
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
            dataIndex:'siteNo',
            ...Search('siteNo'),
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
            title : "WorkpackageId",
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            title : "CDMR Type",
            dataIndex:'cdmrType',
            ...Search('cdmrType'),
        },
        {
            title : "Delivery Type",
            dataIndex:'deliveryType',
            ...Search('deliveryType'),
        },
        {
            title : "Delivery Mode",
            dataIndex:'deliveryMode',
            ...Search('deliveryMode'),
        },
        {
            title :  "RFP Date",
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
            dataIndex:'orderReqNo',
            ...Search('orderReqNo'),
        },
        {
            title : "Total Request QTY",
            dataIndex:'totalReqQTY',
            ...Search('totalReqQTY'),
        },
        {
            title : "Total Booked QTY",
            dataIndex:'bookedQTY',
            ...Search('bookedQTY'),
        },
        {
            title : "Total Outbound QTY",
            dataIndex:'outQTY',
            ...Search('outQTY'),
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
                                onClick={() => handleDownloadItemOrdered(record.orderDetailId)}>
                                <FileExcelOutlined />
                            </IconButton>
                        </Tooltip>
                    </Space>
                )
            }
        }
   
    ]


    useEffect(() => {
        getOutboundStatusReport();
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
                <Table
                    scroll={{ x: '200%' }}
                    columns={columns}
                    dataSource={dataOutboundStatus}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />}
        </div>
    )
}

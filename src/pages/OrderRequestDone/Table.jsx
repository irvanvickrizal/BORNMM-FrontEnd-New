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
        }
   
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

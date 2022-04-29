/* eslint-disable react/jsx-no-useless-fragment */
import React,{useState,useEffect} from 'react'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import API from '@app/utils/apiServices'
import {Tabs,Tag,Typography,Popconfirm,Select,Upload,message,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {EyeFilled,PlusOutlined, FileExcelOutlined,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined,DeleteTwoTone,UploadOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import { useSelector } from 'react-redux'
import exportFromJSON from 'export-from-json'
import { useHistory } from 'react-router-dom';


export default function TableHODoneReport() {
    const[dataHODone,setDataHODone] = useState([])
    const[downloadData,setDownloadData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector(state=>state.auth.user.uid)
    const history = useHistory();
    function getHODoneReport() {
        setIsLoading(true);
        API.getHODoneReport(userId).then(
            result=>{
                setDataHODone(result);
                setIsLoading(false);
                console.log("HO Done order =>",result);
            }
        )
    }

    const navigateTo = (path) => {
        history.push(path);
        //ordetTypeIds == 'SDR' ? (history.push(`/sitelist/sdrform?wpid=${wpIds}&ot=${ordetTypeIdhook}`)):( history.push(`/sitelist/siteDetail?wpid=${wpIds}&ot=${ordetTypeIdhook}`))
    }

    const handleViewDetail = (odi) => {
        navigateTo(`/rpt/orderrequestdetailview?odi=${odi}`)   
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

    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {width:150,
            title :  "Order Request No",
            dataIndex:'orderReqNo',
            ...Search('orderReqNo'),
        },
        {width:150,
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {width:150,
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {width:150,
            title : "Zone",
            dataIndex:'zone',
            ...Search('zone'),
        },
        {width:150,
            title : "WorkpackageId",
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {width:150,
            title : "CDMR Type",
            dataIndex:'cdmrType',
            ...Search('cdmrType'),
        },
        {width:150,
            title : "Delivery Type",
            dataIndex:'deliveryType',
            ...Search('deliveryType'),
        },
        {width:150,
            title : "Delivery Mode",
            dataIndex:'deliveryMode',
            ...Search('deliveryMode'),
        },
        {width:150,
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
        {width:150,
            title :  "Order Request No",
            dataIndex:'orderReqNo',
            ...Search('orderReqNo'),
        },
        {width:150,
            title : "Total Request QTY",
            dataIndex:'totalReqQTY',
            ...Search('totalReqQTY'),
        },
        {width:150,
            title : "Total Booked QTY",
            dataIndex:'bookedQTY',
            ...Search('bookedQTY'),
        },
        {width:150,
            title : "Total Outbound QTY",
            dataIndex:'outQTY',
            ...Search('outQTY'),
        },
        {width:150,
            title : "Outbound Status",
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
                        <Tooltip title="View Detail">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span"
                                onClick={() => handleViewDetail(record.orderDetailId)}>
                                <EyeFilled />
                            </IconButton>
                        </Tooltip>
                    </Space>
                )
            }
        }
   
    ]


    useEffect(() => {
        getHODoneReport();
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
                <><div className='float-right'>
                    <Tooltip title="Download As Excell File">
                        <IconButton size="small" color="success" onClick={getDownloadDataDetail}>
                            <FileExcelOutlined />
                        </IconButton>
                        {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                    </Tooltip>
                </div><Table
                    scroll={{ x: '200%',y:500 }}
                    columns={columns}
                    dataSource={dataHODone}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>}
        </div>
    )
}

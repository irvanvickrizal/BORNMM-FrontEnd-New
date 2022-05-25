/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import React,{useState,useEffect} from 'react'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import API from '@app/utils/apiServices'
import {Tabs,Card,Typography,Popconfirm,Select,Upload,message,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {EyeFilled, FileExcelOutlined,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined,DeleteTwoTone,UploadOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import { useSelector } from 'react-redux'
import exportFromJSON from 'export-from-json'

export default function TableDismantleAckTracking() {
    const { TabPane } = Tabs;
    const {Title,Link} = Typography
    const [page,setPage] = useState(1)
    const[dataApproval,setDataApproval] = useState([])
    const[downloadData,setDownloadData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [modalDetailVisible,setModalDetailVisible] = useState(false)
    const userId = useSelector(state=>state.auth.user.uid)


    const CardTitle = (title) => {
        return (
            <Row>
                <Space align="center">
                    <Title style={{ align:'center' }} level={5}>{title}</Title> 
                </Space>
            </Row>
        )
    }
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window
        return { width, height }
    }

    const useWindowDimensions = () => {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
 
        useEffect(() => {
            const handleResize = () => setWindowDimensions(getWindowDimensions())
 
            window.addEventListener('resize', handleResize)
 
            return () => window.removeEventListener('resize', handleResize)
 
        }, [])
 
        return windowDimensions
    }

    const { width } = useWindowDimensions();

    function getApprovalTrackingList(userids) {
        setIsLoading(true);
        API.getRPTAPPTracking(userids).then(
            result=>{
                setDataApproval(result);
                setIsLoading(false);
                console.log("completion order =>",result);
            }
        )
    }

    const getDownloadPoBoqList = () => {
        API.getRPTAPPTracking(userId).then(
            result=>{
                setDownloadData(result);
                console.log("data  Download :",result);
               
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `DismantleACKTracking_${moment().format("DD-MM-YYYY hh:mm:ss")}`;
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
            title : "CPO No",
            dataIndex:'cpoNo',
            ...Search('cpoNo'),
        },
        {
            width:150,
            title : "Project Name",
            dataIndex:'projectName',
            ...Search('projectName'),
        },
        {
            width:150,
            title : "Order Request No",
            dataIndex:'orderRequestNo',
            fixed:'left',
            ...Search('orderRequestNo'),
        },
        {
            width:150,
            title : "Site No",
            dataIndex:'siteNo',
            responsive: ['md'],
            fixed:'left',
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
            title : "Site Address",
            dataIndex:'siteAddress',
            ...Search('siteAddress'),
        },
        {
            width:150,
            title : "Request Type Name",
            dataIndex:'requestTypeName',
            ...Search('requestTypeName'),
        },
        {
            width:150,
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            width:150,
            title : "Requested By",
            dataIndex:'requestedBy',
            ...Search('requestedBy'),
        },
        {
            width:150,
            title : "Request Date",
            dataIndex:'requestDate',
            ...Search('requestDate'),
        },
        {
            width:150,
            title : "PIC",
            dataIndex:'pic',
            ...Search('pic'),
        },
        {
            width:150,
            title : "Lead Time",
            dataIndex:'leadTime',
            ...Search('leadTime'),
        }
   
    ]

    
    useEffect(() => {
        getApprovalTrackingList(userId);

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
                         
                            <Tooltip title="Download Dismantle Ack Tracking">
                                <IconButton size="medium" color="success" onClick={getDownloadPoBoqList}>
                                    
                                    <FileExcelOutlined />
                  
                                </IconButton>
                                {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                            </Tooltip>
                        </div>
                    </Col>
                </Row>
                <Table
                    scroll={{ x: '300%' ,y:600}}
                    
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataApproval}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    size='small'
                    bordered /></>}
        </div>
    )
}

/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import React,{useState,useEffect} from 'react'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import API from '@app/utils/apiServices'
import {Progress,Tabs,Card,Tag,Typography,Popconfirm,Select,Upload,message,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {PlusOutlined, FileExcelOutlined,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined,DeleteTwoTone,UploadOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import { useSelector } from 'react-redux'
import exportFromJSON from 'export-from-json'
import "./OrderReqSummary.css"

export default function TableOrderRequestSummary() {
    const[dataOutboundStatus,setDataOutboundStatus] = useState([])
    const[dataOrderRequestSummary,setDataOrderRequestSummary] = useState([])
    const[sownloadData,setDownloadData] = useState([])
    const[outboundSuccessLog,setOutboundSuccessLog] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { TabPane } = Tabs;
    const userId = useSelector(state=>state.auth.user.uid)

    const { Title } = Typography;
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

    function getOrderRequestSummary() {
        setIsLoading(true);
        API.getOrderRequestSummary(userId).then(
            result=>{
                setDataOrderRequestSummary(result);
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
            width : 30,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Phase",
            width:150,
            dataIndex:'phase',
            ...Search('phase'),
        },
        {
            title : "Total Scopes",
            width:30,
            dataIndex:'ScopeTotal',
            ...Search('ScopeTotal'),
        },
        {
            title : "SDR Req",
            width:30,
            dataIndex:'SDRSubmission',
            ...Search('SDRSubmission'),
        },
        {
            title : "RFP Done",
            width:30,
            dataIndex:'rfpDone',
            ...Search('rfpDone'),
        },
        {
            title : "Dispatch Done",
            width:30,
            dataIndex:'DispatchDone',
            ...Search('DispatchDone'),
        },
        {
            title : "MOH Done",
            width:30,
            dataIndex:'MOHDone',
            ...Search('MOHDone'),
        },
        {
            title : "MOD Done",
            width:30,
            dataIndex:'MODDone',
            ...Search('MODDone'),
        },
        {
            title : "MOS Done",
            width:30,
            dataIndex:'MOSDone',
            ...Search('MOSDone'),
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
        // getOutboundStatusReport();
        getOrderRequestSummary();
        // getOutboundSuccessLog()
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
                <Row>
                    <Col span={20}>
                        <Table
                            scroll={{ x: '100%',y:500 }}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                            size='small'
                            columns={columns}
                            dataSource={dataOrderRequestSummary}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            bordered />
                    </Col>
                    <Col span={4}>
                        <Row>
                            <Col span={24}>
                                <Card 
                                    // title="RFP Done" 
                                    // bordered={true} 
                                    style={{ width: "100%"
                                        ,marginLeft:10
                                        ,marginRight:10
                                        ,borderRadius: 5
                                        ,background: "#ED4C67"
                                
                                    }}>
                                    <Title 
                                        style={{color:"white" 
                                        }}
                                        level={5}>
                                RFP Done
                                    </Title>
                                    <Title 
                                        style={{color:"white" 
                                            ,   marginTop:5}}
                                        level={4}>1,000/2,000
                                    </Title>
                                    <Progress 
                                        strokeLinecap="square"
                                        status="active"
                                        percent={30} 
                                        className="white-text"
                                        trailColor="red"
                                    />
                                
                                    {/* <div class="card-icon card-icon-large"><i class="fas fa-cogs"></i></div> */}
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Card 
                                    // title="RFP Done" 
                                    // bordered={true} 
                                    style={{ width: "100%"
                                        ,marginLeft:10
                                        ,marginRight:10
                                        ,borderRadius: 5
                                        ,background: "linear-gradient(0.25turn,#021B79, #0575E6)"  
                                
                                    }}>
                                    <Title 
                                        style={{color:"white" 
                                        }}
                                        level={5}>
                                RFP Done
                                    </Title>
                                    <Title 
                                        style={{color:"white" 
                                            ,   marginTop:5}}
                                        level={4}>1,000/2,000
                                    </Title>
                                    <Progress 
                                        strokeLinecap="square"
                                        status="active"
                                        percent={100} 
                                        className="white-text"
                                        trailColor="red"
                                        type="circle"
                                    />
                                
                                    {/* <div class="card-icon card-icon-large"><i class="ion-ios-list"></i></div> */}
                                </Card>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col span={12}>
                                <Card 
                                    // title="RFP Done" 
                                    // bordered={true} 
                                    style={{ width: "100%"
                                        ,marginLeft:10
                                        ,marginRight:10
                                        ,borderRadius: 5
                                        ,background: "linear-gradient(0.25turn,#021B79, #0575E6)"  
                                
                                    }}>
                                    <Title 
                                        style={{color:"white" 
                                        }}
                                        level={5}>
                                RFP Done
                                    </Title>
                                    <Title 
                                        style={{color:"white" 
                                            ,   marginTop:5}}
                                        level={4}>1,000/2,000
                                    </Title>
                                    <Progress 
                                        strokeLinecap="square"
                                        type="circle"
                                        status="active"
                                        percent={30} 
                                        className="white-text"
                                        trailColor="red"
                                    />
                                
                                    <div class="card-icon card-icon-large"><i class="fas ion-ios-list"></i></div>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card 
                                    // title="RFP Done" 
                                    // bordered={true} 
                                    style={{ width: "100%"
                                        ,marginLeft:10
                                        ,marginRight:10
                                        ,borderRadius: 5
                                        ,background: "linear-gradient(0.25turn,#021B79, #0575E6)"  
                                
                                    }}>
                                    <Title 
                                        style={{color:"white" 
                                        }}
                                        level={5}>
                                RFP Done
                                    </Title>
                                    <Title 
                                        style={{color:"white" 
                                            ,   marginTop:5}}
                                        level={4}>1,000/2,000
                                    </Title>
                                    <Progress 
                                        strokeLinecap="square"
                                        type="circle"
                                        status="active"
                                        percent={100} 
                                        className="white-text"
                                        trailColor="red"
                                    />
                                
                                    <div class="card-icon card-icon-large"><i class="fas fa-list"></i></div>
                                </Card>
                            </Col>
                        </Row> */}
                    </Col>
                   
                </Row>
            }
        </div>
    )
}

/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-empty */
/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {BackTop ,Image,Table,InputNumber ,Tabs,Space,Row,Col,Spin,Tooltip,Modal,Upload,Button,Form,Input,Typography,Card,DatePicker} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { FileExcelOutlined,StepBackwardOutlined,EyeFilled,DeleteOutlined ,UploadOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';
import {IconButton, TextField}  from '@mui/material/';
import RoomIcon from '@mui/icons-material/Room';
import { useHistory } from 'react-router-dom';
import exportFromJSON from 'export-from-json'
import L, { divIcon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup,useMapEvent } from 'react-leaflet'

export default function TableDismantleActForm() {
    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const [dataTableAtas,setDataTableAtas] = useState([])
    const [dataDismantleList,setDataDismantleList] = useState([])
    const [dataDismantlePhotoList,setDataDismantlePhotoList] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingTab, setIsLoadingTab] = useState(false);
    const { TabPane } = Tabs;
    const [mapLocation,setMapLocation] = useState([])
    const [isModalLocationVisible,setIsModalLocationVisible] = useState(false)
    const [isModalReject,setIsModalReject] = useState(false)
    const [remarks,setRemarks] = useState(false)
    const { TextArea } = Input;
    const [zoom, setZoom] = useState("");
    const user = useSelector((state) => state.auth.user);
    const history = useHistory();
    const odi = params.get('odi');
    const tdg = params.get('tdg');
    const pg = params.get('pg');
    const rbid = params.get('rbid');

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
    const dummiesData = [
        {
            'materialCode':'Test123',   
            'materialDesc':'Desc123',   
            'confirmQTY':2,
            'photoList':[
                {
                    'photoURL' : 'https://picsum.photos/200/300?random=1',
                    'remarks'  : 'Test Remarks 1'
                },
                {
                    'photoURL' : 'https://picsum.photos/200/300?random=2',
                    'remarks'  : 'Test Remarks 1'
                },
                {
                    'photoURL' : 'https://picsum.photos/200/300?random=3',
                    'remarks'  : 'Test Remarks 1'
                },
            ]  
        },
        {
            'materialCode':'Test123',   
            'materialDesc':'Desc123',   
            'confirmQTY':3,
            'photoList':[
                {
                    'photoURL' : 'https://picsum.photos/200/300?random=4',
                    'remarks'  : 'Test Remarks 1'
                },
                {
                    'photoURL' : 'https://picsum.photos/200/300?random=5',
                    'remarks'  : 'Test Remarks 1'
                },
                {
                    'photoURL' : 'https://picsum.photos/200/300?random=6',
                    'remarks'  : 'Test Remarks 1'
                },
            ]  
        },
        {
            'materialCode':'Test123',   
            'materialDesc':'Desc123',   
            'confirmQTY':4,
            'photoList':[
                {
                    'photoURL' : 'https://picsum.photos/200/300?random=7',
                    'remarks'  : 'Test Remarks 1'
                },
                {
                    'photoURL' : 'https://picsum.photos/200/300?random=8',
                    'remarks'  : 'Test Remarks 1'
                },
                {
                    'photoURL' : 'https://picsum.photos/200/300?random=9',
                    'remarks'  : 'Test Remarks 1'
                },
                {
                    'photoURL' : 'https://picsum.photos/200/300?random=10',
                    'remarks'  : 'Test Remarks 1'
                },
               
            ]  
        },
    ]
    
    const CardTitleDismantlePhotolist = (data) => (
        <Title level={5}>
            {data.materialCode} ( {data.materialDesc} ) QTY: {data.itemQty}
        </Title>
    )

    const DismantlePhotoList = ({data}) =>{

        console.log("photolost",data)
        return(
            <Card 
                title={CardTitleDismantlePhotolist(data)}
                hoverable
                bodyStyle={{'margin-top':'5px','padding-top':'5px'}}>
                <Row  gutter={16}>
                    <Image.PreviewGroup>
                        {data.getDismantleImages?.map((pht)=>
                            <Col className="gutter-row" style={{ 'margin-top': '10px' }} span={4}>
                                <Image
                                    width={100}
                                    src={pht.photoImage}
                                    fallback="data:image/png;base64,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"
                                />
                                <p>{pht.remarks}</p>
                            </Col>
                        )}
                    </Image.PreviewGroup>
                </Row>
                
            </Card>

        )
    }
    
    const { Title } = Typography;
    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )

    function getDataSiteInfo() {
        setIsLoading(true);
        API.getDismantleSiteInfo(odi).then(
            result=>{
                setDataTableAtas(result);
                setIsLoading(false);
                console.log("data Site Indfo =>",result);
            }
        )
    }
    
    function getDismantlePhotoList() {
        API.getDismantlePhotoList(tdg).then(
            result=>{
                setDataDismantlePhotoList(result);
                console.log("dismantle photo list =>",result);
            }
        )
    }

    function getDismantleList() {
        API.getDismantleList(tdg).then(
            result=>{
                setDataDismantleList(result);
                console.log("tdg =>",result);
            }
        )
    }

    const handleDownloadData = () =>{
        API.getDismantleList(tdg).then(
            result=>{
                const data = result//result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `DismantleList_ItemBookedList_${moment().format("DD-MM-YYYY hh:mm:ss")}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }

    const handleConfirm = () =>
    {
        if (window.confirm('Are you sure you want to confirm ?')) {
            
            const body = {
                'orderDetailId':odi,
                'transDelegateId' :tdg,
                'confirmedBy':user.uid,
                'requestedBy':rbid
            }

            API.postDismantleAck(body).then(
                result=>{
                    toast.success("Confirm Successfull")
                    history.push("/task/ackdismantlepending")
                    console.log("post dismantle", result)
                }
            )

        }
    }
    const handleReject = () =>
    {
        setIsModalReject(true)
        // if (window.confirm('Are you sure you want to reject ?')) {
            
        //     const body = {
        //         'orderDetailId':odi,
        //         'transDelegateId' :tdg,
        //         'confirmedBy':user.uid,
        //         'requestedBy':rbid
        //     }

        //     API.postDismantleAck(body).then(
        //         result=>{
        //             toast.success("Confirm Successfull")
        //             history.push("/task/ackdismantlepending")
        //             console.log("post dismantle", result)
        //         }
        //     )

        // }
    }
    const okReject = () =>
    {
        if (window.confirm('Are you sure you want to reject ?')) {
            
            const body = {
                'orderDetailId':odi,
                'confirmedBy':user.uid,
                'transDelegateId' :tdg,
                'reasonOfRejection': remarks,
                'requestedBy':rbid
            }

            console.log(body,"body rejection ")
            API.postRejectDismantleAck(body).then(
                result=>{
                    if(result.status=="success")
                    {
                        toast.success(result.message)
                        history.push("/task/ackdismantlepending")
                    }
                    else if(result.status=="warning")
                    {
                        toast.warning(result.message)
                        history.push("/task/ackdismantlepending")
                    }
                    else{
                        toast.error(result.message)
                    }
                    console.log("post dismantle", result)
                }
            )

        }
    }
    const handleBack = () =>
    {
        if(pg == "pending"){
            history.push("/task/ackdismantlepending")
        }
        if(pg == "done"){
            history.push("/rpt/ackdismantledone")
        }
    }

    useEffect(() => {
        getDataSiteInfo();
        getDismantleList()
    },[])

    function callback(key) {
        if(key==1){
            getDismantleList()
            console.log(key)
        }
        else if(key==2){
            getDismantlePhotoList()
        }
        console.log("keytabs",key);
    }

    const showLocation = (data) =>
    {   
        if(data.latitude != null || data.longitude != null)
        {
            const longlat = [parseFloat(data.latitude),parseFloat(data.longitude)];
            setMapLocation(longlat)
            setIsModalLocationVisible(true)
            setZoom(8)
        }
        else{
            toast.error("location data not available")
        }
        console.log(data,"datalocation")
        console.log([parseFloat(data.latitude),parseFloat(data.longitude)],"<= this is data parsing")
    }
    const hideModal = () => {
        setIsModalLocationVisible(false)
    }
    const cancelModalReject = () => {
        setIsModalReject(false)
    }

    const columnSiteInfo = [ 
      
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
            title : "Zone",
            dataIndex:'zone',
            ...Search('zone'),
        },
        {
            title : "Workpackage ID",
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
   
        {
            title : "Site Address",
            dataIndex:'siteAddress',
            ...Search('siteAddress'),
        },
        {
            title : "Scope Name",
            dataIndex:'scopeName',
            width:150,
            ...Search('scopeName'),
        },
        {
            title : "Package Name",
            dataIndex:'projectName',
            width:150,
            ...Search('projectName'),
        },
        {
            title:"Action",
            align:'center',
            fixed:'right',
            width:70,
            render:(record)=>{
                return (
                    <Space>
                        {record.longitude == null || record.latitude == null ?
                            <Tooltip title="Location data not available" color="red">
                                <IconButton
                                    size='small'
                                    aria-label="upload file"
                                    component="span">
                                    <RoomIcon style={{color:"grey"}} disabled />
                                </IconButton>
                            </Tooltip>
                            :
                            <Tooltip title="View Map">
                                <IconButton
                                    size='small'
                                    color="primary"
                                    aria-label="upload file"
                                    component="span"
                                    onClick={()=>{showLocation(record)}}
                                >
                                    <RoomIcon style={{color:"red"}}/>
                                </IconButton>
                            </Tooltip>
                        }
                    </Space>
                )
            }
        }

    ]
    const handleClick = (record) => {
        setZoom(10);
    
        console.log(zoom, "Sasd");
    };

    const columnDismantleList = [ 
      
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
   
        {
            title : "Item Code",
            dataIndex:'materialCode',
            ...Search('materialCode'),
        },
        {
            title : "Item Description",
            dataIndex:'materialDesc',
            ...Search('materialDesc'),
        },
        {
            title : "QTY",
            dataIndex:'itemQty',
            ...Search('itemQty'),
        },
        {
            title : "Serial No",
            dataIndex:'serialNo',
            ...Search('serialNo'),
        },
        {
            title : "Remarks",
            dataIndex:'remarks',
            ...Search('remarks'),
        },
   
    ]
    return (
        <div>
            <BackTop />
            <Space direction="vertical" size={15} style={{width:"100%"}}>
                { isLoading ?   
                    <Row justify="center">
                        <Col span={1}>    
                            <Spin />
                        </Col>
                    </Row>  
                    :
                    <><Row>
                        <Col span={24}>
                            <div className='float-right'>
                                <Space direction="horizhontal">
                                    {pg == "pending" ?
                                        <Button
                                            type="primary"
                                            onClick={() => handleConfirm()}
                                        >
                                            Accept
                                        </Button>
                                        :
                                        <></>}
                                    
                                    <Button
                                        type="danger"
                                        onClick={() => handleReject()}
                                    >
                                            Reject
                                    </Button>
                                    <Button
                                        type="secondary"
                                        onClick={() => handleBack()}
                                    >
                                            Back
                                    </Button>
                                    
                                </Space>
                            </div>
                        </Col>
                    </Row><Card hoverable
                        title={CardTitle("Site Info")}
                        headStyle={{ 'color': 'blue' }}
                    >
                        <Table
                            scroll={{ x: '130%' }}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                            // expandable={{ expandedRowRender }}
                            columns={columnSiteInfo}
                            dataSource={dataTableAtas}
                            pagination={false}
                            bordered />
                    </Card></>
                }

                <Col span={24}>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Dismantle List" key="1">
                            <Row>
                                <Col md={24} sm={24}>
                                    <div className='float-right'>
                                        <Tooltip title="Download Data">
                                            <IconButton size="small" color="success" onClick={handleDownloadData}>
                                                <FileExcelOutlined />
                                            </IconButton>
                                            {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                                        </Tooltip>
                                    </div>
                                </Col>
                            </Row>
                            <Table
                                scroll={{ x: '100%' }}
                                //rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                                // expandable={{ expandedRowRender }}
                                columns={columnDismantleList}
                                dataSource={dataDismantleList}
                                pagination={false}
                                bordered />
                        </TabPane>
                        <TabPane tab="Dismantle Photo List" key="2">
                            {dataDismantlePhotoList?.map((dt)=>
                                <DismantlePhotoList data={dt}/>
                            )}
                        </TabPane>
                    </Tabs>
                </Col>
            </Space>

            <Modal visible={isModalLocationVisible} onCancel={hideModal}
                style={{ width: (90 * width / 100), minWidth: (80 * width / 100) }}
                footer={false}
                zIndex={99999}
            >
                <MapContainer center={mapLocation} zoom={zoom} style={{width:"75vw",height:"80vh"}}
                    scrollWheelZoom={true}
                   
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                 
                       
                    {dataTableAtas.map((e,idx)=> 
                        <Marker position={[e.latitude,e.longitude]}
                                
                            eventHandlers={{
                                click: (record) => {
                                    handleClick(record)
                                },}}
                                
                            
                            key={idx}
                        >
                            <Popup>
                                <Typography>
                                    <ul>
                                        <li>Site No : {e.siteNo}</li>
                                        <li>Scope Name : {e.scopeName}</li>
                                    </ul>
                                </Typography>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </Modal>           
                    
            <Modal title="Reject Dismantle Permit" visible={isModalReject}  onCancel={cancelModalReject} 
                footer={
                    remarks.length <= 10 ? ( [
                
                
                        <Button disabled key="back" type="danger" onClick={okReject}>
                Reject
                        </Button>,
                        <Button key="submit"  onClick={cancelModalReject} >
                Close
                        </Button>,
                    
                    ]):( [
                
                
                        <Button key="back" type="danger" onClick={okReject}>
                Reject
                        </Button>,
                        <Button key="submit"  onClick={cancelModalReject} >
                Close
                        </Button>,
                    
                    ])
                } >
                <Typography>Reason Of Cancelation :
                </Typography>
                <TextArea rows={4} onChange={(e) => setRemarks(e.target.value)}/>
      
            </Modal>

        </div>
    )
}

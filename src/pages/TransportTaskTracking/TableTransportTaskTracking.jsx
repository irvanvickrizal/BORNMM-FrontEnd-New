/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import API from '@app/utils/apiServices'
import { useSelector ,useDispatch} from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {Image,Table,InputNumber ,Space,Row,Col,Spin,Tooltip,Modal,Upload,Button,Form,Input,Typography,Card,DatePicker} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { EyeFilled,DeleteOutlined ,UploadOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';
import {IconButton, TextField}  from '@mui/material/';
import RoomIcon from '@mui/icons-material/Room';
import L, { divIcon, Routing } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup,useMapEvent } from 'react-leaflet'
import { createControlComponent } from "@react-leaflet/core";
import RoutingMachine from '@app/pages/TransportTaskTracking/RoutingMap';
import { getDataLongLat } from '@app/store/action/transportTaskTrackingAction';



export default function TableTransportTaskTracking() {
    const [dataTransportTask,setDataTransportTask] = useState([])
    const [dataTransportTaskLongLat,setDataTransportTaskLongLat] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [isModalMapVisible,setIsModalMapVisible] = useState(false)
    const [odiParam,setOdiParam] = useState(false)
    const userId = useSelector(state=>state.auth.user.uid)
    const[dataPhotoSender,setDataPhotoSender] = useState([])
    const[dataPhotoRecipient,setDataPhotoRecipient] = useState([])
    const[selectedDN,setSelectedDN] = useState('')
    const[showDN,setShowDN] = useState(false)
    const[dataDeliveryNote,setDataDeliveryNote] = useState([])
    const [mapLocation,setMapLocation] = useState([])
    const [zoom, setZoom] = useState("");
    const dispatch = useDispatch()
    const Loading = useSelector(state=>state.transportTaskTrackingReducer?.isLoading)
    const dataLocation = useSelector(state=>state.transportTaskTrackingReducer?.dataLonglat)
    const currentLat = useSelector(state=>state.transportTaskTrackingReducer?.dataLonglat[0]?.currLatitude)
    const currentLong = useSelector(state=>state.transportTaskTrackingReducer?.dataLonglat[0]?.currLongitude)









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


    const { Title } = Typography;
    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )


   
    const handleClick = (record) => {
        setZoom(10);
    
        console.log(zoom, "Sasd");
    };

    const dataDummy = [{
        long:106.816666,
        lat:-6.200000,
        sdrNumber: "121",
        siteNo:"XL-123",

    }]



    function getTransportTask() {
        setIsLoading(true);
        API.getTransportTaskTracking(userId).then(
            result=>{
                setDataTransportTask(result);
                setIsLoading(false);
                console.log("data Transport Task =>",result);
            }
        )
    }

  

    
    const BuildPhotoSender = ({data}) =>{
        console.log("senderphoto",data)
        //const dataPhotoSenders = data.map((rs)=>
        //) 
        return (
            data?.map((dt)=>
                <Col className="gutter-row" style={{ 'margin-top': '10px' }} span={8}>
                    <Image
                        alt={dt.evidenceFilename}
                        src={dt.evidencePath}
                    />
                </Col>
            )

        )

    }

    const BuildPhotoRecipient = ({data}) =>{
        console.log("recipientphoto",data)
        return (
            data?.map((dt)=>
                <Col className="gutter-row" style={{ 'margin-top': '10px' }} span={8}>
                    <Image
                        alt={dt.evidenceFilename}
                        src={dt.evidencePath}
                    />
                </Col>
            )

        )
    }


    function getPhotoSender(odi) {
        API.getPhotoSender(odi).then(
            result=>{
                setDataPhotoSender(result);
                // buildSenderPhotoCard(result)
                console.log("senderss",result);
            }
        )
    }
    function getPhotoRecipient(odi) {
        API.getPhotoRecipient(odi).then(
            result=>{
                setDataPhotoRecipient(result);
                console.log("recipient",result);
            }
        )
    }
    function getDeliveryNote(odi) {
        API.getDeliveryNote(odi).then(
            result=>{
                setDataDeliveryNote(result);
                console.log("dn",result);
            }
        )
    }

    const showModal= (data) => {
        setIsModalVisible(true)
        console.log(currentLong,"long")
        setOdiParam(data.orderDetailId)
        getPhotoRecipient(data.orderDetailId)
        getPhotoSender(data.orderDetailId)
        getDeliveryNote(data.orderDetailId)
    }

    function getTransportTaskLongLat(odi) {
        setIsLoading(true);
        API.getTransportTaskTrackingLongLat(odi).then(
            result=>{
                setDataTransportTaskLongLat(result);
                setIsLoading(false);
                console.log("data longLata =>",result);
            }
        )
        dispatch(getDataLongLat(odi))
    }
    console.log(dataDummy,"ini")

    const showModalMap= (data) => {
        console.log(data,"data nih")
        setIsModalMapVisible(true)
        getTransportTaskLongLat(data)
       
      
    }

    const hideModalMap = () => {
        setIsModalMapVisible(false)
    }
    const hideModal = () => {
        setIsModalVisible(false)
    }

    const handleShowDN = (record) => {
        setShowDN(true)
        console.log(record,"showdeen")
        setSelectedDN(record.evidencePath)
    }
    const handleCancelView = () => {
        setShowDN(false)
    }

    const columnsDN = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            width:150,
            title : "File Name",
            dataIndex:'evidenceFilename',
            ...Search('evidenceFilename'),
        },
        {
            
            title:"Action",
            align:'center',
            fixed: 'right',
            width: 80,
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="View Doc">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span"
                                onClick={() => handleShowDN(record)}>
                                <EyeFilled />
                            </IconButton>
                        </Tooltip>
                    </Space>
                )
            }
        }
   
    ]
    

    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            width:150,
            title : " LSP Transport",
            dataIndex:'lspTransport',
            ...Search('lspTransport'),
        },
        // {
        //     width:150,
        //     title : " ODI",
        //     dataIndex:'orderDetailId',
        //     ...Search('orderDetailId'),
        // },
        {
            width:150,
            title : "Request No",
            dataIndex:'orderRequestNo',
            ...Search('orderRequestNo'),
        },
        {
            width:150,
            title : "Multi Delivery No",
            dataIndex:'multiDeliveryNo',
            ...Search('multiDeliveryNo'),
        },
        {
            width:150,
            title : "Delivery No",
            dataIndex:'deliveryMode',
      
            ...Search('deliveryMode'),
        },
        {
            width:150,
            title : "CDMR Req",
            dataIndex:'cdmrType',
            ...Search('cdmrType'),
        },
        {
            width:150,
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            width:150,
            title : "Site Name",
            dataIndex:'siteName',
            ...Search('siteName'),
        },
        {
            width:150,
            title : "Workpackage ID",
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            title : "Region",
            dataIndex:'region',
            width:150,
            ...Search('region'),
        },
        {
            width:150,
            title : "Zone",
            dataIndex:'zone',
            ...Search('zone'),
        },
    
        {
            title : "location Address",
            dataIndex:'locationAddress',
            width:350,
            ...Search('locationAddress'),
        },
    
        {
            width:150,
            title : "Total Collies",
            dataIndex:'totalCollies',
            ...Search('totalCollies'),
        },
    
        {
            width:150,
            title : "Total Volume",
            dataIndex:'totalVolume',
            ...Search('totalVolume'),
        },
    
        {
            width:150,
            title : "Assign By",
            dataIndex:'assignBy',
            ...Search('assignBy'),
        },
        {
            width:150,
            title : "Assign Date",
            render:(record)=>{
                return (
                    <div>
                        {record.assignedDate !== null ? (<> <Space>
                            <p>{moment(record.assignDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('logisticCompletedDate'),
        },
    
        {
            width:150,
            title : "Assign To",
            dataIndex:'assignTo',
            ...Search('assignTo'),
        },
    
        {
            width:150,
            title : "Confirm Status",
            dataIndex:'confirmStatus',
            ...Search('confirmStatus'),
        },
    
        {
            width:150,
            title : "RFP Date",
            render:(record)=>{
                return (
                  
                    <div>
                        {record.rfpDate !== null ? (<> <Space>
                            <p>{moment(record.rfpDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                )
            },
            ...Search('rfpDate'),
        },
    
        {
            width:150,
            title : " Confirm Date",
            render:(record)=>{
                return (

                    <div>
                        {record.confirmDate !== null ? (<> <Space>
                            <p>{moment(record.confirmDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>

                )
            },
            ...Search('confirmDate'),
        },
        {width:150,
            title : "Pickup Date",
            render:(record)=>{
                return (

                    <div>
                        {record.pickupDate !== null ? (<> <Space>
                            <p>{moment(record.pickupDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                )
            },
            ...Search('pickupDate'),
        },

        {width:150,
            title : "Task Complete Date",
            render:(record)=>{
                return (
                  
                    <div>
                        {record.taskCompleteDate !== null ? (<> <Space>
                            <p>{moment(record.taskCompleteDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                )
            },
            ...Search('taskCompleteDate'),
        },
        {
            title:"Action",
           
            align:'center',
            fixed:'right',
            width:90,
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            {record.taskCompleteDate == null ? (<></>):(
                                <Tooltip title="View HO Document">
                                    <EyeFilled style={{fontSize:20,color:"#0332c3"}}
                                        onClick={()=>showModal(record)}
                                    />
                                </Tooltip>)}
                            {record.confirmStatus === "Confirmed" ? ( 
                                <Tooltip title="View Map">
                                    <IconButton
                                        size='small'
                                        color="primary"
                                        aria-label="upload file"
                                        component="span"
                                        onClick={()=>{showModalMap(record.orderDetailId)}}>
                                        <RoomIcon style={{color:"red"}}  />
                                    </IconButton>
                                </Tooltip>):(<></>)}
                        </Space>
                       
                    </div>
                )
            },
        }
    ]






    useEffect(() => {
        getTransportTask();
        setZoom(6);
      
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
                    scroll={{ x: '400%',y:500 }}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataTransportTask}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />}

            {/* Modal HO Document */}
                    
            <Modal
                visible={isModalVisible}
                onCancel={hideModal}
                footer={null}
                destroyOnClose
                // zIndex={9999}
                width={750}
            >
                <Col span={24}>
                    <Card title={CardTitle("HO Document")}>

                        <Row gutter={16}>
                            <Col className="gutter-row" span={12}>
                                <Card title={<Title level={5}>Photo Documentation</Title>}>
                                        
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                            
                                        <Card title={<Title level={5}>Photo Sender</Title>}>
                                            <div>
                                                <Row  gutter={16}>
                                                    <Image.PreviewGroup>
                                                        <BuildPhotoSender data={dataPhotoSender}/> 
                                                    </Image.PreviewGroup>
                                                </Row>
                                            </div>
                                        </Card>
                                        <Card title={<Title level={5}>Photo Recipient</Title>}>
                                            <Row  gutter={16}>
                                                <Image.PreviewGroup>
                                                    <BuildPhotoRecipient data={dataPhotoRecipient}/> 
                                                </Image.PreviewGroup>
                                            </Row>
                                        </Card>
                                    </Space>
                                </Card>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Card
                                    title={<Title level={5}>Delivery Note</Title>}
                                >
                                    <Table
                                        scroll={{ x: '100%' }}
                                        columns={columnsDN}
                                        dataSource={dataDeliveryNote}
                                        pagination={{
                                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                                            showSizeChanger: true,
                                            position: ["bottomLeft"],
                                        }}
                                        bordered />
                                        
                                </Card>
                            </Col>
                        </Row>

                    </Card>
                </Col>
            </Modal>

            <Modal title="View Doc"
                visible={showDN}
                onCancel={handleCancelView}
                footer={null}
                destroyOnClose={true}
                width={1000}
                zIndex={9999}
                bodyStyle={{height: 1000}}
            >
                <embed src={selectedDN}  style={{ width: '100%' ,height: '100%' }}></embed>
                {/* <img alt="example" style={{ width: '100%' }} src={previewDoc} /> */}
            </Modal>

            <Modal title={dataLocation[0]?.orderRequestNo !== undefined ? (`Order Request No : ${dataLocation[0]?.orderRequestNo}`):(`Order Request No : -`) } visible={isModalMapVisible} onCancel={hideModalMap}
                style={{ width: (90 * width / 100), minWidth: (80 * width / 100) }}
                footer={false}
                zIndex={99999}
            >
                {Loading ? (    <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  ):(  
                    dataLocation.length !== 0 ? 
                        (<MapContainer center={[currentLat,currentLong]} zoom={8} style={{width:"75vw",height:"80vh"}}
                            scrollWheelZoom={true}
                          
               
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
             
           

                            {/* {dataDummy.map((e,idx)=> 
                    <Marker position={[-6.200000,106.816666]}
                        icon={ iconPerson }
                        eventHandlers={{
                            click: (record) => {
                                handleClick(record)
                            },}}
                            
                        
                    // key={idx}
                    >
                        <Popup>
                            <Typography>
                                <ul>
                                    <li>Site No : {e.siteNo}</li>
                                    <li>Scope Name : {e.sdrNumber}</li>
                                </ul>
                            </Typography>
                        </Popup>
                    </Marker>
                )} */}
                            <RoutingMachine
                
                            />
                        </MapContainer>):(<></>)
                )}
                
               
         
            </Modal>

            
        
        </div>
    )
}

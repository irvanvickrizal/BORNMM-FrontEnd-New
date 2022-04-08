/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import React,{useState,useEffect,useRef} from 'react'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import API from '@app/utils/apiServices'
import {Layout,Carousel ,Image,Card,Tabs,Tag,Typography,Popconfirm,Select,Upload,message,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {EyeFilled,PlusOutlined, FileExcelOutlined,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined,DeleteTwoTone,UploadOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import { useSelector } from 'react-redux'
import exportFromJSON from 'export-from-json'
import RoomIcon from '@mui/icons-material/Room';
import L, { divIcon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup,useMapEvent } from 'react-leaflet'

const markerIcon = new L.Icon({

    iconUrl: require("../../assets/marker/iconMarker1.png"),
    iconSize: [65,75]
})

export default function HODonePanel() {
    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const odiParam = params.get('odi');
    const[dataHODone,setDataHODone] = useState([])
    const[dataMaterialOrder,setDataMaterialOrder] = useState([])
    const[downloadData,setDownloadData] = useState([])
    const[hoDoneLog,setHODoneLog] = useState([])
    const[dataPhotoSender,setDataPhotoSender] = useState([])
    const[dataPhotoRecipient,setDataPhotoRecipient] = useState([])
    const[dataDeliveryNote,setDataDeliveryNote] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state=>state.auth.user.uid)
    const [selectedDN,setSelectedDN] = useState('')
    const [showDN,setShowDN] = useState(false)
    const [mapLocation,setMapLocation] = useState([])
    const [isModalLocationVisible,setIsModalLocationVisible] = useState(false)
    const [isPickup,setIsPickup] = useState(false)

    const [zoom, setZoom] = useState("");
    
    const { Title } = Typography;
    const { TabPane } = Tabs;

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

    const handleClick = (record) => {
        setZoom(10);
    
        console.log(zoom, "Sasd");
    };

    const animateRef = useRef(false)

    const showModal = (data) => {
        const longlat = [parseFloat(data.latitude),parseFloat(data.longitude)];
        setMapLocation(longlat)
        setIsModalLocationVisible(true)
        setZoom(8)
        console.log([parseFloat(data.latitude),parseFloat(data.longitude)],"<= this is data parsing")
    }

    const hideModal = () => {
        setIsModalLocationVisible(false)
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


    function getHODoneReport(odi) {
        setIsLoading(true);
        API.getHODoneReportDetail(odi).then(
            result=>{
                setDataHODone(result);
                setIsPickup(result.isPickupRequest)
                setIsLoading(false);
                console.log("HO Done order =>",result);
            }
        )
    }

    function getMaterialOrderHODone(odi) {
        setIsLoading(true);
        API.getMaterialOrderHODetail(odi).then(
            result=>{
                setDataMaterialOrder(result);
                setIsLoading(false);
                console.log("HO Done order =>",result);
            }
        )
    }
    function getHODoneLog(odi) {
        setIsLoading(true);
        API.getHODoneLog(odi).then(
            result=>{
                setHODoneLog(result);
                setIsLoading(false);
                console.log("log",result);
            }
        )
    }
    function getPhotoSender(odi) {
        setIsLoading(true);
        API.getPhotoSender(odi).then(
            result=>{
                setDataPhotoSender(result);
                setIsLoading(false);
                // buildSenderPhotoCard(result)
                console.log("senderss",result);
            }
        )
    }
    function getPhotoRecipient(odi) {
        setIsLoading(true);
        API.getPhotoRecipient(odi).then(
            result=>{
                setDataPhotoRecipient(result);
                setIsLoading(false);
                console.log("recipient",result);
            }
        )
    }
    function getDeliveryNote(odi) {
        setIsLoading(true);
        API.getDeliveryNote(odi).then(
            result=>{
                setDataDeliveryNote(result);
                setIsLoading(false);
                console.log("dn",result);
            }
        )
    }

    
    const handleShowDN = (record) => {
        setShowDN(true)
        console.log(record,"showdeen")
        setSelectedDN(record.evidencePath)
    }
    const handleCancelView = () => {
        setShowDN(false)
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
            title : "WorkpackageId",
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            title : "Scope Name",
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title : "Scope Detail",
            dataIndex:'packageName',
            ...Search('packageName'),
        },
        {
            title : "Address",
            dataIndex:'siteAddress',
            ...Search('siteAddress'),
        },
        {
            title:"Action",
            align:'center',
            fixed:'right',
            width:70,
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="View Map">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span"
                                onClick={()=>{showModal(record)}}>
                                <RoomIcon style={{color:"red"}}  />
                            </IconButton>
                        </Tooltip>
                    </Space>
                )
            }
        }
   
    ]
    const columnsmaterialorder = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Material Code",
            dataIndex:'materialCode',
            ...Search('materialCode'),
        },
        {
            title : "Material Desc",
            dataIndex:'materialDesc',
            ...Search('materialDesc'),
        },
        {
            title : "UOM",
            dataIndex:'uom',
            ...Search('uom'),
        },
        {
            title : "Req QTY",
            dataIndex:'reqQTY',
            ...Search('reqQTY'),
        },
        {
            title : "Site",
            dataIndex:'site',
            ...Search('site'),
        },
    ]

    const columslog = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Incoming Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.incomingDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </Space>
                )
            },
            ...Search('incomingDate'),
        },
        {
            title : "Execute Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.executeDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </Space>
                )
            },
            ...Search('executeDate'),
        },
        {
            title : "Execute By",
            dataIndex:'executeBy',
            ...Search('executeBy'),
        },
        {
            title : "Event Desc",
            dataIndex:'taskEventDesc',
            ...Search('taskEventDesc'),
        },
        {
            title : "Activity",
            dataIndex:'activityDesc',
            ...Search('activityDesc'),
        },
        {
            title : "Remarks",
            dataIndex:'remarks',
            ...Search('remarks'),
        },   
    ]
    const columnsdn = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
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

    function onChange(a, b, c) {
        console.log(a, b, c);
    }

    function callback(key) {
        if(key==1){
            getHODoneReport(odiParam)
        }
        else if(key==2){
            getMaterialOrderHODone(odiParam)
            // getOutboundSuccessLog();
        }
        else if(key==3){
            getPhotoSender(odiParam)
            getPhotoRecipient(odiParam)
            getDeliveryNote(odiParam)
        }
        else if(key==4){
            getHODoneLog(odiParam);
            //getMaterialOrderLog(odiParam);
        }
        console.log("keytabs",key);
    }
    
    useEffect(() => {
        getHODoneReport(odiParam);
        setZoom(4);
        console.log(userId,"asdasd")
    },[zoom])

    const { Content } = Layout;

    return (
        <div>
           
            <Space direction="vertical">
                <Card hoverable>
                    <Table
                        scroll={{ x: '200%' }}
                        columns={columns}
                        dataSource={dataHODone}
                        pagination={
                            false
                        }
                        bordered />
                </Card>
                <Card hoverable>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Order Request" key="1">
                            {
                                isLoading ?   
                                    <Row justify="center">
                                        <Col span={1}>    
                                            <Spin />
                                        </Col>
                                    </Row>  
                                    :
                                    <Row gutter={16}>
                                        <Col className="gutter-row" span={12}>
                                            <Card
                                                title="Order Request Detail"
                                            >
                                                <Form
                                                    name="basic"
                                                    labelCol={{ span: 10 }}
                                                    wrapperCol={{ span: 14 }}
                                                    initialValues={{
                                                        "requestNo"               :dataHODone[0]?.requestNo,
                                                        "orderType"               :dataHODone[0]?.orderType,
                                                        "requestTypeName"         :dataHODone[0]?.requestTypeName        
                                                        ,"neType"                 :dataHODone[0]?.neType                 
                                                        ,"ctName"                 :dataHODone[0]?.ctName                 
                                                        ,"siteCondition"          :dataHODone[0]?.siteCondition          
                                                        ,"deliveryType"           :dataHODone[0]?.deliveryType           
                                                        ,"packetType"             :dataHODone[0]?.packetType             
                                                        ,"originName"             :dataHODone[0]?.originName             
                                                        ,"destinationName"        :dataHODone[0]?.destinationName        
                                                        ,"recipientOrDismantledBy":dataHODone[0]?.recipientOrDismantledBy
                                                        ,"requesterName"          :dataHODone[0]?.requesterName          
                                                        ,"requestDate"            :dataHODone[0]?.requestDate            
                                                        ,"orderRequestApprovedBy" :dataHODone[0]?.orderRequestApprovedBy 
                                                        ,"approveDate"            :moment(dataHODone[0]?.approveDate).format("YYYY-MM-DD hh:mm:ss")               
                                                        ,"proposeDeliveryMode"    :dataHODone[0]?.proposeDeliveryMode    

                                                    }}
                                                    autoComplete="off"
                                                >
                                                    <Form.Item
                                                        label="Request No"
                                                        name="requestNo"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Order Type"
                                                        name="orderType"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Request Type"
                                                        name="requestTypeName"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="NE Type"
                                                        name="neType"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="CT Name"
                                                        name="ctName"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Site Condition"
                                                        name="siteCondition"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Delivery Type"
                                                        name="deliveryType"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Packet Type"
                                                        name="packetType"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Origin Name"
                                                        name="originName"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Destination"
                                                        name="destinationName"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Recipient or Dismantle By"
                                                        name="recipientOrDismantledBy"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="requesterName"
                                                        name="requesterName"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="requestDate"
                                                        name="requestDate"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Approved By"
                                                        name="orderRequestApprovedBy"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Approved Date"
                                                        name="approveDate"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Propose Delivery Mode"
                                                        name="proposeDeliveryMode"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                </Form>
                                            </Card>
                                        </Col>
                                        <Col className="gutter-row" span={12}>
                                            <Card
                                                title="Logistic Detail"
                                            >
                                                <Form
                                                    name="basic"
                                                    labelCol={{ span: 10 }}
                                                    wrapperCol={{ span: 14 }}
                                                    initialValues={{
                                                        "logisticCompletedBy"    : dataHODone[0]?.logisticCompletedBy
                                                        ,"logisticCompleteDate"  : moment(dataHODone[0]?.logisticCompleteDate).format("YYYY-MM-DD hh:mm:ss")  
                                                        ,"expectedDeliveryDate"  : moment(dataHODone[0]?.expectedDeliveryDate).format("YYYY-MM-DD")  
                                                        ,"whTeam"                : dataHODone[0]?.whTeam      
                                                        ,"rfpDate"               : moment(dataHODone[0]?.rfpDate).format("YYYY-MM-DD hh:mm:ss")            
                                                        ,"totalCollies"          : dataHODone[0]?.totalCollies       
                                                        ,"totalVolume"           : dataHODone[0]?.totalVolumn        
                                                        ,"pickupDate"            : moment(dataHODone[0]?.pickupDate).format("YYYY-MM-DD hh:mm:ss")     
                                                        ,"orderCompleteDate"     : moment(dataHODone[0]?.orderCompleteDate).format("YYYY-MM-DD hh:mm:ss") 
                                                    }}
                                                    autoComplete="off"
                                                >
                                                    <Form.Item
                                                        label="Completed By"
                                                        name="logisticCompletedBy"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Complete Date"
                                                        name="logisticCompleteDate"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    {isPickup ? 
                                                        <Form.Item
                                                            label="Expected Pickup Date"
                                                            name="expectedDeliveryDate"
                                                        >
                                                            <Input disabled/>
                                                        </Form.Item>
                                                        : 
                                                        <Form.Item
                                                            label="Expected Delivery Date"
                                                            name="expectedDeliveryDate"
                                                        >
                                                            <Input disabled/>
                                                        </Form.Item>
                                                    }
                                                    
                                                    <Form.Item
                                                        label="WH Team"
                                                        name="whTeam"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="RFP Date"
                                                        name="rfpDate"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Total Collies"
                                                        name="totalCollies"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Total Volume (CBM)"
                                                        name="totalVolume"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Pickup Date"
                                                        name="pickupDate"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Order Complete Date"
                                                        name="orderCompleteDate"
                                                    >
                                                        <Input disabled/>
                                                    </Form.Item>
                                                </Form>
                                            </Card>
                                        </Col>
                                    </Row>

                            }                            
                        </TabPane>
                        <TabPane tab="Material Order" key="2">
                            {isLoading ?   
                                <Row justify="center">
                                    <Col span={1}>    
                                        <Spin />
                                    </Col>
                                </Row>  
                                :
                                <Table
                                    scroll={{ x: '200%' }}
                                    columns={columnsmaterialorder}
                                    dataSource={dataMaterialOrder}
                                    pagination={
                                        false
                                    }
                                    bordered />
                            }
                            
                            
                        </TabPane>
                        <TabPane tab="HO Document" key="3">
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
                                            columns={columnsdn}
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
                            
                        </TabPane>
                        <TabPane tab="Log" key="4">
                            {isLoading ?   
                                <Row justify="center">
                                    <Col span={1}>    
                                        <Spin />
                                    </Col>
                                </Row>  
                                :
                                <Table
                                    scroll={{ x: '100%' }}
                                    columns={columslog}
                                    dataSource={hoDoneLog}
                                    pagination={
                                        false
                                    }
                                    bordered />
                            }          
                        </TabPane>
                    </Tabs>    
                </Card>
            </Space>
            
            <Modal title="View Doc"
                visible={showDN}
                onCancel={handleCancelView}
                footer={null}
                destroyOnClose={true}
                width={1000}
                zIndex={99999}
                bodyStyle={{height: 1000}}
            >
                <embed src={selectedDN}  style={{ width: '100%' ,height: '100%' }}></embed>
                {/* <img alt="example" style={{ width: '100%' }} src={previewDoc} /> */}
            </Modal>
              
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
                 
                       
                    {dataHODone.map((e,idx)=> 
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
        </div>
    )
}

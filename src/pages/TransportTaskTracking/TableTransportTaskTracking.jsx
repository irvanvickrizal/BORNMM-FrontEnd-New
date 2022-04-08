/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {Image,Table,InputNumber ,Space,Row,Col,Spin,Tooltip,Modal,Upload,Button,Form,Input,Typography,Card,DatePicker} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { EyeFilled,DeleteOutlined ,UploadOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';
import {IconButton, TextField}  from '@mui/material/';

export default function TableTransportTaskTracking() {
    const [dataTransportTask,setDataTransportTask] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [odiParam,setOdiParam] = useState(false)
    const userId = useSelector(state=>state.auth.user.uid)
    const[dataPhotoSender,setDataPhotoSender] = useState([])
    const[dataPhotoRecipient,setDataPhotoRecipient] = useState([])
    const[selectedDN,setSelectedDN] = useState('')
    const[showDN,setShowDN] = useState(false)
    const[dataDeliveryNote,setDataDeliveryNote] = useState([])


    const { Title } = Typography;
    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )

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
        setOdiParam(data.orderDetailId)
        getPhotoRecipient(data.orderDetailId)
        getPhotoSender(data.orderDetailId)
        getDeliveryNote(data.orderDetailId)
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
            title : " LSP Transport",
            dataIndex:'lspTransport',
            ...Search('lspTransport'),
        },
        {
            title : "Request No",
            dataIndex:'orderRequestNo',
            ...Search('orderRequestNo'),
        },
        {
            title : "Multi Delivery No",
            dataIndex:'multiDeliveryNo',
            ...Search('multiDeliveryNo'),
        },
        {
            title : "Delivery No",
            dataIndex:'deliveryMode',
      
            ...Search('deliveryMode'),
        },
        {
            title : "CDMR Req",
            dataIndex:'cdmrType',
            ...Search('cdmrType'),
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
            title : "Total Collies",
            dataIndex:'totalCollies',
            ...Search('totalCollies'),
        },
    
        {
            title : "Total Volume",
            dataIndex:'totalVolume',
            ...Search('totalVolume'),
        },
    
        {
            title : "Assign By",
            dataIndex:'assignBy',
            ...Search('assignBy'),
        },
        {
            title : "Assign Date",
            render:(record)=>{
                return (
                    <div>
                        {record.assignedDate !== null ? (<> <Space>
                            <p>{moment(record.assignedDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('logisticCompletedDate'),
        },
    
        {
            title : "Assign To",
            dataIndex:'assignTo',
            ...Search('assignTo'),
        },
    
        {
            title : "Confirm Status",
            dataIndex:'confirmStatus',
            ...Search('confirmStatus'),
        },
    
        {
            title : "RFP Date",
            render:(record)=>{
                return (
                  
                    <div>
                        {record.rfpDate !== null ? (<> <Space>
                            <p>{moment(record.rfpDate).format("YYYY-MM-DD")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                )
            },
            ...Search('rfpDate'),
        },
    
        {
            title : " Confirm Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.confirmDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('confirmDate'),
        },
        {
            title : "Pickup Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.pickupDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('pickupDate'),
        },

        {
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
                            <Tooltip title="View HO Document">
                                <EyeFilled style={{fontSize:20,color:"#0332c3"}}
                                    onClick={()=>showModal(record)}
                                />
                            </Tooltip>
                            

                        </Space>
                    </div>
                )
            },
        }
    ]

    useEffect(() => {
        getTransportTask();
      
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
                    scroll={{ x: '400%' }}
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
        
        </div>
    )
}

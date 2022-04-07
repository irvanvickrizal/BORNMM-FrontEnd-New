/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {Table,InputNumber ,Space,Row,Col,Spin,Tooltip,Modal,Upload,Button,Form,Input,Typography,Card,DatePicker} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { EyeFilled,DeleteOutlined ,UploadOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';

export default function TableTransportTaskTracking() {
    const [dataTransportTask,setDataTransportTask] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [odi,setOdi] = useState(false)
    const userId = useSelector(state=>state.auth.user.uid)


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

    const showModal= (data) => {
        setIsModalVisible(true)
        setOdi(data.orderDetailId)
    }

    const hideModal = () => {
        setIsModalVisible(false)
    }

    
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
                    scroll={{ x: '200%' }}
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
                zIndex={1000}
            >
                <Col span={24}>
                    <Card title={CardTitle("HO Document")}>

                        <Typography>
                            ee
                        </Typography>
                    </Card>
                </Col>
            </Modal>
        
        </div>
    )
}

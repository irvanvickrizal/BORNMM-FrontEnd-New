/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-unstable-nested-components */
import React,{useState,useEffect} from 'react'
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {Table,Space,Row,Col,Spin,Tooltip,Modal,Select,Button,Form,Input,Typography,Card,DatePicker} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { EyeFilled,DeleteOutlined  } from '@ant-design/icons'
import { toast } from 'react-toastify';

export default function TablePickUpReschedule() {
    const [dataSchedule,setDataSchedule] = useState([])
    const [pickUpDate,setPickUpDate] = useState("")
    const [taskId,setTaskId] = useState("")
    const [rfpDate,setRfpDate] = useState("")
    const [requestNo,setRequestNo] = useState("")
    const [proposeRescheduleDate,setProposeRescheduleDate] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector(state=>state.auth.user.uid)
    const [isModalApproveVisible,setIsModalApproveVisible] = useState(false)
    const [isModalFeeVisible,setIsModalFeeVisible] = useState(false)
    const { Title } = Typography;

    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )

    function getRequestRescheduleList() {
        setIsLoading(true);
        API.getScheduleAssignment(userId).then(
            result=>{
                setDataSchedule(result);
                setIsLoading(false);
                console.log("data Schedule Request =>",result);
            }
        )
    }

    const showModalApprove = (data) => {
        setIsModalApproveVisible(true)
        setProposeRescheduleDate(data.rfpDate)
        setPickUpDate(data.pickupDate)
        setTaskId(data.taskScheduleId)
    }

    const hideModalApprove = (data) => {
        setIsModalApproveVisible(false)
    }

    const showModalFee = (data) => {
        setIsModalFeeVisible(true)
        setRequestNo(data.requestNo)
        setRfpDate(data.rfpDate)
        setPickUpDate(data.pickupDate)
    }

    const hideModalFee = (data) => {
        setIsModalFeeVisible(false)
    }

    const postApproveReschedule  = () => {
        
        const body = {
            "taskScheduleId":taskId,
            "approvedProposedBy":userId
        }
        console.log(body,"body")
        API.postApproveReschedule(body).then(
            result=>{
                try{
                    if(result.status=="success"){
                        setIsLoading(false)
                        getRequestRescheduleList()
                        toast.success(result.message)
                 
                    }else {
                        toast.error(result.message)
                        setIsLoading(false)
                    }
          
                }
                catch(e){
                  
                    setIsLoading(false)
                    console.log(e,"error catch")
                }
            }
        )
        setIsModalApproveVisible(false)
    }

    
    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Request No",
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            title : "Origin",
            dataIndex:'originName',
            ...Search('originName'),
        },
        {
            title : "Destination",
            dataIndex:'destinationName',
            ...Search('destinationName'),
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            responsive: ['md'],
            ...Search('siteNo'),
        },
        {
            title : "Workpackage Id",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
        },
        {
            title : "Address",
            dataIndex:'locationAddress',
            ...Search('locationAddress'),
        },
        {
            title : "Scope Name",
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title : "CDMR Req",
            dataIndex:'cdmrType',
            ...Search('cdmrType'),
        },
        {
            title : "Request Delivery Mode",
            dataIndex:'deliveryMode',
            ...Search('deliveryMode'),
        },
        {
            title : "LSP Name",
            dataIndex:'lspName',
            ...Search('lspName'),
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
            title : "Asign To",
            dataIndex:'assignTo',
            ...Search('assignTo'),
        },
        {
            title : "Day To Go",
            dataIndex:'dayToGo',
            ...Search('dayToGo'),
        },
        {
            title: "Action",
            align:'center',
            fixed:'right',
            width:130,
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            <Tooltip title="Approve Reschedule">
                                <CheckCircleIcon style={{color:"#1b9a0c",fontSize:28}}
                                    onClick={()=>showModalApprove(record)}
                                />
                            </Tooltip>
                            <Tooltip title="Cancellation Fee Request">
                                <MonetizationOnIcon style={{color:"#cf4646",fontSize:28}}
                                    onClick={()=>showModalFee(record)}
                                />
                            </Tooltip>

                        </Space>
                    </div>
                )
            },
          
        },
    
    ]

    const columnDataEvidence=[
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "File Name",
            dataIndex:'assignTo',
            width:280,
            ...Search('fileName'),
        },
        {
            title:"Action",
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            <Tooltip title="Review Document">
                                <EyeFilled style={{fontSize:18}}/>
                            </Tooltip>
                            <Tooltip title="Delete Document">
                                <DeleteOutlined style={{fontSize:18,color:"red"}}/>
                            </Tooltip>

                        </Space>
                    </div>
                )
            },
        }
    ]







    
    useEffect(() => {
        getRequestRescheduleList();
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
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataSchedule}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />}

            {/* Modak Approve */}

            
            <Modal
                visible={isModalApproveVisible}
                onCancel={hideModalApprove}
      
                destroyOnClose
                footer={[
                    <Button key="submit" type="primary" onClick={postApproveReschedule}>
                    Approve
                    </Button>,
                    <Button key="back"  onClick={hideModalApprove}>
                Close
                    </Button>,
                
                
                ]}
            >
                <Col span={24}>
                    <Card title={CardTitle("Approve Reschedule Date")}>
                        <Typography style={{fontSize:18,fontWeight:"500"}}>
                            {`Are you sure you want to approve Reschedule Date from ${moment(pickUpDate).format("YYYY-MM-DD")} to ${moment(proposeRescheduleDate).format("YYYY-MM-DD")}` }
                        </Typography>
                    </Card>
                </Col>
            </Modal>

            {/* Modal dayToGo <= 0 */}
            

            <Modal
                visible={isModalFeeVisible}
                onCancel={hideModalFee}
                footer={null}
                destroyOnClose
            >
                <Col span={24}>
                    <Card title={CardTitle("Cancellation Fee Form")}>
                        <Form
                            labelCol={{span: 6}}
                            wrapperCol={{span: 16}}
                            layout="horizontal"
                            // onFinish={postInDirect}
                    
                            initialValues={{
                               
                            }}
                         
                        >
                            <Form.Item label="Req Number" >
                                <Input disabled value={requestNo} />
                            </Form.Item>
                            <Form.Item  label="RFP Date" >
                                <Input disabled value={rfpDate !== null ? moment(rfpDate).format("YYYY-MM-DD") : null} />
                            </Form.Item>
                            <Form.Item  label="Current Pickup" >
                                <Input disabled value={pickUpDate !== null ? moment(pickUpDate).format("YYYY-MM-DD") : null} />
                            </Form.Item>
                        
                            <Row gutter={24}>
                                <Col span={16}>
                                    <Form.Item label="Evidence:" name="remark" 
                                        labelCol={{span: 9}}
                                        wrapperCol={{span:19}}
                                        rules={[{ required: true, message: 'Please Upload The Evidence' }]}
                                    >
                                    
                                        <Input
                                          
                                        />
                                            
                                     
                                     
                                    </Form.Item> 
                                </Col>
                                <Col span={8}>     
                                    <Button style={{width:90}}>Upload</Button>
                                </Col>
                            </Row>  
                            <Table
                                columns={columnDataEvidence}
                            
                               
                            />               
                 
                            <Form.Item wrapperCol={{ offset: 0, span: 24 }} style={{marginTop:6,marginLeft:128}}>
                                <div className="float-right">
                                    <Col span={4} md={8} sm={24} >
                                        <Space direction="horizontal">
                                
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                       
                                            >
                                        Confirm
                                            </Button>
                                            <Button
                                                // onClick={hideModalIndirect}
                                                htmlType="submit"
                                       
                                            >
                                        Back
                                            </Button>
                                        </Space>
                                    </Col>
                                </div>
                          
                            </Form.Item>
                        </Form>     
                    </Card>
                </Col>
              
              
            </Modal>

        </div>
    )
}

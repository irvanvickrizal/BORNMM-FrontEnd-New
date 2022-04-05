/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
import React,{useState,useEffect} from 'react'
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux';
import {Table,Space,Row,Col,Spin,Tooltip,Modal,Select,Button,Form,Input,Typography,Card,DatePicker} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { CalendarFilled } from '@ant-design/icons'
import { toast } from 'react-toastify';

const { TextArea } = Input;

export default function TablePickUpReschedule() {
    const [dataScheduleAssignment,setDataScheduleAssignment] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector(state=>state.auth.user.uid)
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [isModalIndirectVisible,setIsModalIndirectVisible] = useState(false)
    const [orderRequestNo,setOrderRequestNo] = useState("")
    const [pickUpDate,setPickUpDate] = useState("")
    const [taskId,setTaskId] = useState("")
    const [date,setDate] = useState("")
    const [remark,setRemark] = useState("")
    const { Title } = Typography;

    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )
    function disabledDate(current) {
        // Can not select days before today and today
        return current < moment().add(2,'d');
    }

    function getPickUpCompletion() {
        setIsLoading(true);
        API.getScheduleAssignment(userId).then(
            result=>{
                setDataScheduleAssignment(result);
                setIsLoading(false);
                console.log("data Schedule assinment =>",result);
            }
        )
    }

    const showModal = (data) => {
        setIsModalVisible(true)
        setOrderRequestNo(data.orderRequestNo)
        setPickUpDate(data.pickupDate)
        setTaskId(data.taskScheduleId)

    }

    const hideModal = () => {
        setIsModalVisible(false)
    }
    const showModalIndirect = (data) => {
        setIsModalIndirectVisible(true)
        setOrderRequestNo(data.orderRequestNo)
        setPickUpDate(data.pickupDate)
        setTaskId(data.taskScheduleId)
    }

    const hideModalIndirect = () => {
        setIsModalIndirectVisible(false)
    }

    const postDirect  = () => {
        
        const body = {
            "taskScheduleId":taskId,
            "proposedBy":userId,
            "proposeReason":remark,
            "proposeScheduleDate":date
        }
        console.log(body,"This is Body")

        API.postRescheduleDirect(body).then(
            result=>{
                try{
                    if(result.status=="success"){
                        setIsLoading(false)
                    
                        toast.success(result.message)
                     
                    }
              
                }
                catch(e){
                    toast.error(result.message)
                    setIsLoading(false)
                    console.log(e,"error catch")
                }
            }
        )
    }

    const postInDirect  = () => {
        
        const body = {
            "taskScheduleId":taskId,
            "proposedBy":userId,
            "proposeReason":remark,
            "proposeScheduleDate":date
        }
        console.log(body,"This is Body")

        API.postRescheduleIndirect(body).then(
            result=>{
                try{
                    if(result.status=="success"){
                        setIsLoading(false)
                    
                        toast.success(result.message)
                     
                    }
              
                }
                catch(e){
                    toast.error(result.message)
                    setIsLoading(false)
                    console.log(e,"error catch")
                }
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
            title : "RFP Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.rfpDate).format("YYYY-MM-DD")}</p>
                    </Space>
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
            width:90,
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        {record.dayToGo > 1 ?  <Space size={20}>
                         
                            <Tooltip title="Reschedule Pick up Date">
                                <CalendarFilled  style={{fontSize:20,color:"#008de3"}} onClick={()=>showModal(record)} />
                            </Tooltip>
                        </Space>:
                            record.dayToGo <= 0 ? <Space size={20}>
                                <Tooltip title="Reschedule Pick up Date">
                                    <CalendarFilled  style={{fontSize:20,color:'red'}}  onClick={()=>showModalIndirect(record)} />
                                </Tooltip>
                                
                            </Space> : null }
                       
                    </div>
                )
            },
          
        },
    
    ]




    useEffect(() => {
        getPickUpCompletion();
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
                    dataSource={dataScheduleAssignment}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />}

            {/* Modal dayToGo > 1 */}

            <Modal
                visible={isModalVisible}
                onCancel={hideModal}
                footer={null}
                destroyOnClose
            >
                <Col span={24}>
                    <Card title={CardTitle("Change Pickup Schedule")}>
                        <Form
                            labelCol={{span: 10}}
                            wrapperCol={{span: 16}}
                            layout="horizontal"
                            onFinish={postDirect}
                           
                            initialValues={{
                               
                            }}
                         
                        >
                            <Form.Item label="Req Number" >
                                <Input disabled value={orderRequestNo} />
                            </Form.Item>
                            <Form.Item  label="Current Pickup Schedule" >
                                <Input disabled value={moment(pickUpDate).format("YYYY-MM-DD")} />
                            </Form.Item>
                            <Form.Item label="Change Pickup Schedule" 
                                name="pickUpSchedule"
                                wrapperCol={{span: 18}}
                                rules={[{ required: true, message: 'Please Choose Pickup Schedule' }]}>
                                <DatePicker 
                                    format="YYYY-MM-DD"
                                    disabledDate={disabledDate}
                                    onChange={(e) => setDate(moment(e).format("YYYY-MM-DD"))} 
                                    // disabledDate={current && current < moment().endOf('day')}
                                    // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                />
                                 
                            </Form.Item>
                            <Row >
                                <Col span={24}>
                                    <Form.Item label="Reason Of Change Schedule:" name="remark" 
                                        labelCol={{span: 24}}
                                        wrapperCol={{span:24}}
                                        rules={[{ required: true, message: 'Please Fill Reason of Change Schedule' }]}
                                    >
                                        <TextArea rows={4} onChange={(e) => setRemark(e.target.value)}/>
                                    </Form.Item> 
                                </Col>
                            </Row>                 
                 
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
                                                onClick={hideModal}
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

            {/* Modal dayToGo <= 0 */}
            

            <Modal
                visible={isModalIndirectVisible}
                onCancel={hideModalIndirect}
                footer={null}
                destroyOnClose
            >
                <Col span={24}>
                    <Card title={CardTitle("Change Pickup Schedule")}>
                        <Form
                            labelCol={{span: 10}}
                            wrapperCol={{span: 16}}
                            layout="horizontal"
                            onFinish={postInDirect}
                    
                            initialValues={{
                               
                            }}
                         
                        >
                            <Form.Item label="Req Number" >
                                <Input disabled value={orderRequestNo} />
                            </Form.Item>
                            <Form.Item  label="Current Pickup Schedule" >
                                <Input disabled value={moment(pickUpDate).format("YYYY-MM-DD")} />
                            </Form.Item>
                            <Form.Item label="Change Pickup Schedule" 
                                name="pickUpSchedule"
                                wrapperCol={{span: 18}}
                                rules={[{ required: true, message: 'Please Choose Pickup Schedule' }]}>
                                <DatePicker 
                                    format="YYYY-MM-DD"
                                    disabledDate={disabledDate}
                                    onChange={(e) => setDate(moment(e).format("YYYY-MM-DD"))} 
                                    // disabledDate={current && current < moment().endOf('day')}
                                    // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                />
                                 
                            </Form.Item>
                            <Row >
                                <Col span={24}>
                                    <Form.Item label="Reason Of Change Schedule:" name="remark" 
                                        labelCol={{span: 24}}
                                        wrapperCol={{span:24}}
                                        rules={[{ required: true, message: 'Please Fill Reason of Change Schedule' }]}
                                    >
                                        <TextArea rows={4} onChange={(e) => setRemark(e.target.value)}/>
                                    </Form.Item> 
                                </Col>
                            </Row>                 
                 
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
                                                onClick={hideModalIndirect}
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

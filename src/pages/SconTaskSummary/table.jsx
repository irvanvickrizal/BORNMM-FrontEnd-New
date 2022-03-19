/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect, useState} from 'react'
import {
    Table,
    Row,
    Col,
    Card,
    Space,
    Typography,
    Form,
    Input,
    Select,
    Tabs,
    Button,
    Switch,
    Modal,
    Tooltip,
    DatePicker
} from "antd"
import {useDispatch, useSelector} from "react-redux"
import { getDataDone, getDataOnProgress, getDataPending,getLsp,getOdi,getPud } from '@app/store/action/taskAssignmentPendingAction'
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn'
import API from "../../utils/apiServices"
import { CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';


export default function TableTaskSummary(props) {
    const dispatch = useDispatch()
    const {TabPane} = Tabs
    const {Title} = Typography
    const [page,setPage] = useState(1)
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [isModalOnProgressVisible,setIsModalonProgressVisible] = useState(false)
    const [isModalRescheduleVisible,setIsModalRescheduleVisible] = useState(false)
    const [isModalCancelVisible,setIsModalCancelVisible] = useState(false)
    const [selectedOdi,setSelectedOdi] = useState("")
    const [selectedLsp,setSelectedLsp]= useState("")
    const [selectedPd,setSelectedPd]= useState("")
    const [sconTaskPending,setSconTaskPending] = useState([]);
    const [subcon,setSubcon]= useState([])
    const [taskOnProgress,setTaskOnProgress] = useState([])
    const [selecteSconId,setSelectedSconId] = useState("")
    const [selectedEngineer,setSelectedEngineer] = useState("")
    const [selectedReAssignedEngineer,setSelectedReAssignedEngineer] = useState("")
    const [selectedWpId,setSelectedWpId] = useState("")
    const user = useSelector((state) => state.auth.user);
    const [rescheduleDate,setRescheduleDate] = useState('');
    const [selectedTaskSchedule,setSelectedTaskSchedule] = useState("")
    const [selectedTransDelegateId,setSelectedtransDelegateId] = useState("")
   
    function disabledDate(current) {
        // Can not select days before today and today
        return current < moment().add(2,'d');
    }
    
    const getSconTaskPending = () => {
     
        API.getSconTaskPending().then(
            result=>{
              
                setSconTaskPending(result);
                console.log("scontaskpendnig",result);
            }
        )
    }
    const getSconEngineer = (sconid, wpid) => {
     
        API.getSconEngineer(sconid, wpid).then(
            result=>{
              
                setSubcon(result);
                console.log("getScon",result);
            }
        )
    }
    const getSconOnProgress = () => {
     
        API.getSconTaskOnProgress().then(
            result=>{
              
                setTaskOnProgress(result);
                console.log("getTaskOnProgress",result);
            }
        )
    }
    
        
    const onFinishAssigntask = (data) => {
        console.log("datasubmitassign", data)
        const body = (
            {
                "orderdetailId": selectedOdi,
                "transferTo": selectedEngineer,
                "transferBy": user.uid  
            }
        )
        console.log(body,"body")
        API.postAssignEngineer(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    window.location.reload();
                }
                else{
                    toast.error(result.message)
                }
                // TaskPendingTable(false);
                // 
            }
        )
    }
    const onFinishReAssigntask = (data) => {
        console.log("datasubmitRessign", data)
        const body = (
            {
                "transDelegateId": selectedTransDelegateId,
                "transferTo": selectedReAssignedEngineer,
                "transferBy": user.uid  
            }
        )
        console.log(body,"body")
        API.postReAssignmentEngineer(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    window.location.reload();
                }
                else{
                    toast.error(result.message)
                }
            }
        )
    }
    const onFinishRequestReschedule = (data) => {
        // console.log("datasubmitreschedule", rescheduleDate)
        const body = (
            {
                "taskScheduleId":selectedTaskSchedule,
                "proposeScheduleDate": rescheduleDate,
                "proposedBy":user.uid,
                "subconId":selecteSconId,
                "proposeReason":data.reason
            }
        )
        API.putRequestReschedule(body).then(
            result=>{
                console.log('reqres', result)
                // TaskPendingTable(false);
                window.location.reload();
            }
        )
    }
    const onFinishCancelTask = (data) => {
        // console.log("datasubmitreschedule", rescheduleDate)
        const body = (
            {
                "transDelegateId":selectedTransDelegateId,
                "orderdetailId":selectedOdi,
                "transferBy":user.uid

            }
        )
        API.postCancelTask(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    window.location.reload();
                }
                else{
                    toast.error(result.message)
                }
            }
        )
    }



    const showModal = (data) => {
        setIsModalVisible(true)
        setSelectedOdi(data.orderDetailId)
        setSelectedLsp(data.lspName)
        setSelectedPd(data.pickupOrDeliveryDate)
        setSelectedSconId(data.subconId)
        setSelectedWpId(data.workpackageid)
        getSconEngineer(data.subconId,data.workpackageid)
        setSelectedtransDelegateId(data.transDelegateId)
      
        
    }
    const showModalOnProgress = (data) => {
        setIsModalonProgressVisible(true)
        setSelectedEngineer(data.assignedTo)
        getSconEngineer(data.subconId,data.workpackageid)
        setSelectedtransDelegateId(data.transDelegateId)
        setSelectedOdi(data.orderDetailId)
      
        
    }
   
    const showModalReschedule = (data) => {
        setIsModalRescheduleVisible(true)
        
        setSelectedTaskSchedule(data.taskScheduleId)
        setSelectedSconId(data.subconId)
    }
    const hideModal = () => {
        setIsModalVisible(false)
    }
    const hideModalonProgress = () => {
        setIsModalonProgressVisible(false)
    }
    const hideModalReschedule = () => {
        setIsModalRescheduleVisible(false)
    }
    const showModalCancel = (data) => {
        setIsModalCancelVisible(true)
        setSelectedtransDelegateId(data.transDelegateId)
        setSelectedOdi(data.orderdetailId)
    }
    const hideModalCancel = () => {
        setIsModalCancelVisible(false)
    }
    const stateDataPending =  useSelector(state=>state.taskAssignmentSummaryReducer.dataPending) 
    const stateDataOnProgress =  useSelector(state=>state.taskAssignmentSummaryReducer.dataOnProgress) 
  
   
    useEffect(() => {
       
        getSconTaskPending()
        getSconOnProgress()
       
    }, [])
    const scheduleStatuss = sconTaskPending.map(e=>e.scheduleStatus)
    const cobaConsole = ()=>{
        console.log(scheduleStatuss,'coba fata')
    }

    const columnsAssigmentPending = [
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Request No",
            dataIndex: "requestNo",
            ...Search("requestNo")
        },
        {
            title: "Order Type",
            dataIndex: "orderType",
            ...Search("orderType")
        },
        {
            title: "Site No",
            dataIndex: "siteNo",
            ...Search("siteNo")
        },

        {
            title: "Origin",
            dataIndex: "originName",
            ...Search("originName")
        },
        {
            title: "Destination",
            dataIndex: "destinationName",
            ...Search("destinationName")
        },
        {
            title: "Site Name",
            dataIndex: "siteName",
            ...Search("siteName")
        },
        {
            title: "Region",
            dataIndex: "region",
            ...Search("region")
        },
        {
            title: "Work Pakgae ID",
            dataIndex: "workpackageid",
            ...Search("workpackageid")
        },
        {
            title: "Scope Name",
            dataIndex: "scopeName",
            ...Search("scopeName")
        },
        {
            title: "Pickup Date",
         
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.pickupOrDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search("pickupOrDeliveryDate")
        },
        // {
        //     title: "Assign To",
        //     dataIndex: "assignedTo",
        //     ...Search("assignedTo")
        // },
        {
            title: "Incoming Date",
            dataIndex: "incomingDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(stateDataPending.incomingDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search("incomingDate")
        },
        // {
        //     title: "Task Status",
        //     dataIndex: "taskStatus",
        //     ...Search("taskStatus")
        // },
        
        {
            title: "Action",
            dataIndex: "",
            render:(record)=>{
               
                return (
                    scheduleStatuss ? (
                        <Space>
                            <Tooltip title="Assign Task">
                                <UserAddOutlined style={{fontSize:"16px"}} onClick={()=>showModal(record)} />
                            </Tooltip>
              
                      
                            {!record.requestReschedule?
                                null
                                :
                                record.dayToGo <= -2 ?
                    
                                    <Tooltip title="Request Reschedule" style={{fontSize:"16px"}} onClick={()=>showModalReschedule(record)}>
                                        <CalendarTwoTone style={{fontSize:"16px"}} />
                                    </Tooltip>:
                                    <Tooltip color='#f50' title="Cannot request reschedule, day to go h-1 or higher">
                                        <IconButton color="#0000">
                                            <CalendarTwoTone style={{fontSize:16}} />
                                        </IconButton>
                                        <CalendarTwoTone style={{fontSize:16}} />
                                    </Tooltip>
                            }
                    
                            <Tooltip title="Cancel Task">
                                <CloseSquareTwoTone twoToneColor="#FF0000" style={{fontSize:"16px"}} onClick={()=>showModalCancel(record)}/>
                            </Tooltip>
                        </Space>):(<><Button onClick={cobaConsole}>sa</Button></>)

                  
                )
            }
        },
    ]
    const columnsAssigmentOnProgress = [
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Request No",
            dataIndex: "requestNo",
            ...Search("requestNo")
        },
        {
            title: "Order Type",
            dataIndex: "orderType",
            ...Search("orderType")
        },
        {
            title: "Site No",
            dataIndex: "siteNo",
            ...Search("siteNo")
        },

        {
            title: "Origin",
            dataIndex: "originName",
            ...Search("originName")
        },
        {
            title: "Destination",
            dataIndex: "destinationName",
            ...Search("destinationName")
        },
        {
            title: "Site Name",
            dataIndex: "siteName",
            ...Search("siteName")
        },
        {
            title: "Region",
            dataIndex: "region",
            ...Search("region")
        },
        {
            title: "Work Pakgae ID",
            dataIndex: "workpackageid",
            ...Search("workpackageid")
        },
        {
            title: "Scope Name",
            dataIndex: "scopeName",
            ...Search("scopeName")
        },
        {
            title: "Pickup Date",
            dataIndex: "pickupOrDeliveryDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(stateDataOnProgress.pickupOrDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search("pickupOrDeliveryDate")
        },
        {
            title: "Assign To",
            dataIndex: "assignedTo",
            ...Search("assignedTo")
        },
        {
            title: "Incoming Date",
            dataIndex: "incomingDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(stateDataOnProgress.incomingDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search("incomingDate")
        },
        {
            title: "Task Status",
            dataIndex: "taskStatus",
            ...Search("taskStatus")
        },
        
        {
            title: "Action",
            dataIndex: "",
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="Assign Task">
                            <UserAddOutlined style={{fontSize:"16px"}} onClick={()=> showModalOnProgress(record)}  />
                        </Tooltip>
                  
                          
                      
                        <Tooltip title="Cancel Task">
                            <CloseSquareTwoTone twoToneColor="#FF0000" style={{fontSize:"16px"}} onClick={()=>showModalCancel(record)}/>
                        </Tooltip>
                    </Space>
                )
            }
        },
    ]
    const columnsAssigmentOnDone = [
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Request No",
            dataIndex: "cpoNo"
        },
        {
            title: "Order Type",
            dataIndex: "requestTypeName"
        },
        {
            title: "Site No",
            dataIndex: "siteNo"
        },

        {
            title: "Origin",
            dataIndex: "originName"
        },
        {
            title: "Destination",
            dataIndex: "destinationName"
        },
        {
            title: "Site Name",
            dataIndex: "region"
        },
        {
            title: "Region",
            dataIndex: "region"
        },
        {
            title: "Work Pakgae ID",
            dataIndex: "region"
        },
        {
            title: "Scope Name",
            dataIndex: "region"
        },
        {
            title: "Pickup Date",
            dataIndex: "region"
        },
        {
            title: "Assign To",
            dataIndex: "region"
        },
        {
            title: "Assign Date",
            dataIndex: "region"
        },
        {
            title: "Task Status",
            dataIndex: "region"
        },
        {
            title: "Task Complete Date",
            dataIndex: "region"
        },
    ]
    const CardTitle = (title) => <Title level={5}>{title}</Title>

   
    return (
        <div>
            <Tabs defaultActiveKey="1" centered={false}>
                <TabPane tab="Assignment Pending" key="1">
                    <Card title={CardTitle("Assignment Pending")}>
                        <div >
                            <Table
                                columns={columnsAssigmentPending}
                           
                                dataSource={sconTaskPending}
                                scroll={{x: "100%"}}
                                size="large"
                                pagination={{
                                    pageSizeOptions: ['5', '10', '20', '30', '40'],
                                    showSizeChanger: true,
                                    position: ["bottomLeft"],
                                }}
                            />
                        </div>
                    </Card>
                </TabPane>
                <TabPane tab="Assignment On Progress" key="2">
                    <Card title={CardTitle("Assignment On Progress")}>
                        <div >
                            <Table
                                columns={columnsAssigmentOnProgress}
                                pagination={{
                                    pageSizeOptions: ['5', '10', '20', '30', '40'],
                                    showSizeChanger: true,
                                    position: ["bottomLeft"],
                                }}
                                dataSource={taskOnProgress}
                                scroll={{x: "100%"}}
                            />
                        </div>
                    </Card>
                </TabPane>
                <TabPane tab="Assignment Done" key="3">
                    <Card title={CardTitle("Assignment Done")}>
                        <div >
                            <Table
                                columns={columnsAssigmentOnDone}
                                pagination={{
                                    pageSizeOptions: ['5', '10', '20', '30', '40'],
                                    showSizeChanger: true,
                                    position: ["bottomLeft"],
                                }}
                                dataSource={taskOnProgress}
                                scroll={{x: "100%"}}
                            />
                        </div>
                    </Card>
                </TabPane>
            </Tabs>
            <Modal visible={isModalVisible} onCancel={hideModal}
                footer={[
                    <Button key="back"  onClick={hideModal}>
                Cancel
                    </Button>,
                    <Button key="submit" type="primary"  onClick={onFinishAssigntask}>
                Assign
                    </Button>,
                
                ]}
            >
                <div> <Card  title={CardTitle("Assign Task Form")}>
                    <Form
                        labelCol={{span: 9}}
                        wrapperCol={{span: 13}}
                        layout="horizontal"
                    >
                        <Form.Item label="LSP Name">
                            <Typography>{selectedLsp}</Typography>
                        </Form.Item>
                        <Form.Item label=" Pick Up Date">
                            <Typography>{moment(selectedPd).format("YYYY-MM-DD")}</Typography>
                        </Form.Item>
                        <Form.Item label="WH Team">
                            <Select
                                onChange={(e)=>setSelectedEngineer(e)}
                                placeholder="Select an option"
                            >
                                {subcon.length == undefined ? (<></>):(
                                    subcon.map(e=><Select.Option value={e.userId}  >{e.fullname}</Select.Option>) 
                            
                                )}
                               
                              
                            </Select>
                        </Form.Item>
                    </Form>
                </Card>
                </div>
            </Modal>
            <Modal visible={isModalOnProgressVisible} onCancel={hideModalonProgress}
                footer={[
                    <Button key="back"  onClick={hideModalonProgress}>
                Close
                    </Button>,
                    <Button key="submit" type="primary" onClick={onFinishReAssigntask}>
                Assign
                    </Button>,
                
                ]}
            >
                <div> <Card  title={CardTitle("Re-Assign Task Form")}>
                    <Form
                        labelCol={{span: 9}}
                        wrapperCol={{span: 13}}
                        layout="horizontal"
                    >
                        <Form.Item label="Current PIC">
                            <Typography>{selectedEngineer}</Typography>
                        </Form.Item>
                       
                        <Form.Item label="Re-Assign To">
                            <Select
                                onChange={(e)=>setSelectedReAssignedEngineer(e)}
                                placeholder="Select an option"
                            >
                                {subcon.length == undefined ? (<></>):(
                                    subcon.map(e=><Select.Option value={e.userId}  >{e.fullname}</Select.Option>) 
                            
                                )}
                               
                              
                            </Select>
                        </Form.Item>
                    </Form>
                </Card>
                </div>
            </Modal>
            <Modal visible={isModalRescheduleVisible} onCancel={hideModalReschedule}
                footer={[
                    <Button key="back"  onClick={hideModalReschedule}>
            Cancel
                    </Button>,
                    <Button key="submit" type="primary"  onClick={onFinishRequestReschedule}>
            Submit
                    </Button>,
            
                ]}>
                <div> <Card  title={CardTitle("Assign Task Form")}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{
                            'taskScheduleId': selectedTaskSchedule,
                            'subconId': selecteSconId,
                        //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                        // remember: true
                        }}
                   
                   
                        autoComplete="off"
                    >
                        <Form.Item
                        // hidden
                            label="taskScheduleId"
                            name="taskScheduleId"
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                        // hidden
                            label="subconId"
                            name="subconId"
                        >
                            <Input disabled/>
                        </Form.Item>
            
                        <Form.Item
                            label="Propose Date"
                            name="proposeDate"
                            rules={[{ required: true, message: 'Please input Propose Date!' }]}
                        >
                            <DatePicker
                                format="YYYY-MM-DD"
                                disabledDate={disabledDate}
                                onChange={(e) => setRescheduleDate(moment(e).format("YYYY-MM-DD"))} 
                            // disabledDate={current && current < moment().endOf('day')}
                            // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Reason"
                            name="reason"
                            rules={[{ required: true, message: 'Please Input Reason!' }]}
                        >
                            <Input />
                        </Form.Item>

                  
                    </Form>
                </Card>
                </div>
            </Modal>
            <Modal visible={isModalCancelVisible} onCancel={hideModalCancel}
                footer={[
                    <Button key="back"  onClick={hideModalCancel}>
            Cancel
                    </Button>,
                    <Button key="submit" type="primary"  onClick={onFinishCancelTask}>
            Submit
                    </Button>,
            
                ]}>
                <div> <Card  title={CardTitle("Assign Task Form")}>
                    <p>
                Are you sure you want to Cancel this task? 
                    </p>
                    <p>
                (task will be no longer available once it canceled)
                    </p>
                </Card>
                </div>
            </Modal>
        </div>
    )
}

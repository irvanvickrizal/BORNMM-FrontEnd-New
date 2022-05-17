/* eslint-disable react/jsx-no-duplicate-props */
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
import { CloseSquareTwoTone,CalendarFilled ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined ,UserSwitchOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';
import {IconButton, TextField}  from '@mui/material/';


const { TextArea } = Input;
export default function TableTaskSummary(props) {
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(false)
    const {TabPane} = Tabs
    const {Title} = Typography
    const [page,setPage] = useState(1)
    const [remarks, setRemarks] = useState("")
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
    const [taskDone,setTaskDone] = useState([])
    const [selecteSconId,setSelectedSconId] = useState("")
    const [transferBy,setTransferBy] = useState("")
    const [currentAssignTo,setCurrentAssignTo] = useState("")
    const [selectedEngineer,setSelectedEngineer] = useState("")
    const [selectedReAssignedEngineer,setSelectedReAssignedEngineer] = useState("")
    const [selectedWpId,setSelectedWpId] = useState("")
    const user = useSelector((state) => state.auth.user);
    const [rescheduleDate,setRescheduleDate] = useState('');
    const [selectedTaskSchedule,setSelectedTaskSchedule] = useState("")
    const [selectedTransDelegateId,setSelectedtransDelegateId] = useState("")
    const [isPickupRequest,setIsPickupRequest] = useState("")

    const dataUid = useSelector(state=>state.auth.user.uid)
   
    function disabledDate(current) {
        // Can not select days before today and today
        return current < moment().add(2,'d');
    }
    // task assigment pending = uid
    // task assgnment on progress = uid
    // task assigment done = uid
    
    const getSconTaskPending = () => {
        API.getSconTaskPending(dataUid).then(
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
     
        API.getSconTaskOnProgress(dataUid).then(
            result=>{
              
                setTaskOnProgress(result);
                console.log("getTaskOnProgress",result);
            }
        )
    }
    
    const getSconTaskOnDone = () => {
     
        API.getSconTaskOnDone(dataUid).then(
            result=>{
              
                setTaskDone(result);
                console.log("getTaskDone :",result);
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

    const cancelTaskConfirm = (data) => {
        // console.log("datasubmitreschedule", rescheduleDate)
        const body = (
            {
                "transDelegateId":selectedTransDelegateId,
                "orderdetailId":selectedOdi,
                "transferBy":user.uid,
                "currentAssignTo":currentAssignTo,
                "reasonOfCancellation":remarks

            }
        )
        API.postSconTaskCancel(body).then(
          
            result=>{
                setIsLoading(true)
                if(result.status=="success")
                {
                    toast.success(result.message);
                    setIsLoading(false)
                    window.location.reload();
                }
                else{
                    toast.error(result.message)
                    setIsLoading(false)
                }
            }
        )
        console.log(body,"body cancel")
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
        setIsPickupRequest(data.isPickupRequest)
      
        
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
        setSelectedOdi(data.orderDetailId)
        setTransferBy(data.assignedBy)
        setCurrentAssignTo(data.currentAssignTo)
        
    }
    const hideModalCancel = () => {
        setIsModalCancelVisible(false)
    }
    const stateDataPending =  useSelector(state=>state.taskAssignmentSummaryReducer.dataPending) 
    const stateDataOnProgress =  useSelector(state=>state.taskAssignmentSummaryReducer.dataOnProgress) 
  
    const scheduleStatuss = sconTaskPending.map(e=>e.scheduleStatus)
    const cobaConsole = ()=>{
        console.log(scheduleStatuss,'coba fata')
    }

    useEffect(() => {
        getSconTaskPending()
       
    }, [])
 

    const columnsAssigmentPending = [
        {
            title: "No",
            width:50,
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Request No",
            width:150,
            dataIndex: "requestNo",
            ...Search("requestNo")
        },
        {
            title: "Order Type",
            width:150,
            dataIndex: "orderType",
            ...Search("orderType")
        },
        {
            title: "Site No",
            dataIndex: "siteNo",
            width:150,
            ...Search("siteNo")
        },

        {
            title: "Origin",
            dataIndex: "originName",
            width:150,
            ...Search("originName")
        },
        {
            title: "Destination",
            dataIndex: "destinationName",
            width:150,
            ...Search("destinationName")
        },
        {
            title: "Site Name",
            dataIndex: "siteName",
            width:150,
            ...Search("siteName")
        },
        {
            title: "Region",
            width:150,
            dataIndex: "region",
            ...Search("region")
        },
        {
            title: "WorkpackageID",
            width:150,
            dataIndex: "workpackageid",
            
            ...Search("workpackageid")
        },
        {
            title: "Scope Name",
            width:150,
            dataIndex: "scopeName",
            ...Search("scopeName")
        },
        {
            title: "Pickup Date",
            width:150,
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
            width:150,
            dataIndex: "incomingDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(stateDataPending.incomingDate).format("YYYY-MM-DD hh:mm:ss")}</p>
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
            width:80,
            fixed: 'right',
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        {record.scheduleStatus=="newpropose" ? <p style={{ color:'red' }}>Propose New Schedule Request</p>
                            :
                            <Space size={16}>
                                <Tooltip title="Assign Task">
                                    <UserAddOutlined  onClick={() => showModal(record)} style={{fontSize:18}}/>
                                </Tooltip>
                                {!record.requestReschedule?
                                    null
                                    :
                                    record.dayToGo < -2 ?
                                        <Tooltip title="Request Reschedule">
                                            <CalendarTwoTone onClick={() => showModalReschedule(record)} style={{fontSize:18}}/>
                                        </Tooltip> :
                                        <Tooltip color='#f50' title="Cannot request reschedule,Max. day to go h-1">
                                            <CalendarFilled  style={{color:"red",fontSize:18}} />
                                        </Tooltip>
                                }
                                <Tooltip title="Cancel Task">
                                    <CloseSquareTwoTone twoToneColor="#FF0000" onClick={() => showModalCancel(record)} style={{fontSize:18}} />
                                </Tooltip>
                            </Space>
                        }
                    </div>
                    
                   
                )
            }
            
            // render:(record)=>{
               
            //     return (
            //         <Space>
            //             {
            //                 record.scheduleStatus == "newpropose" ? <p style={{ color:'red' }}>waiting new propose schedule approval</p>
            //                 :
                            
            //             }
            //             <Tooltip title="Assign Task">
            //                 <UserAddOutlined style={{fontSize:"16px"}} onClick={()=>showModal(record)} />
            //             </Tooltip>
              
                      
            //             {!record.requestReschedule?
            //                 null
            //                 :
            //                 record.dayToGo <= -2 ?
                    
            //                     <Tooltip title="Request Reschedule" style={{fontSize:"16px"}} onClick={()=>showModalReschedule(record)}>
            //                         <CalendarTwoTone style={{fontSize:"16px"}} />
            //                     </Tooltip>:
            //                     <Tooltip color='#f50' title="Cannot request reschedule, day to go h-1 or higher">
            //                         <IconButton color="#0000">
            //                             <CalendarTwoTone style={{fontSize:16}} />
            //                         </IconButton>
            //                         <CalendarTwoTone style={{fontSize:16}} />
            //                     </Tooltip>
            //             }
                    
            //             <Tooltip title="Cancel Task">
            //                 <CloseSquareTwoTone twoToneColor="#FF0000" style={{fontSize:"16px"}} onClick={()=>showModalCancel(record)}/>
            //             </Tooltip>
            //         </Space>

                  
            //     )
            // }
        },
    ]
    const columnsAssigmentOnProgress = [
        {
            title: "No",
            key: "index",
            width:50,
            render: (value, item, index) => page + index
        },
        {
            title: "Request No",
            dataIndex: "requestNo",
            width:150,
            ...Search("requestNo")
        },
        {
            title: "Order Type",
            dataIndex: "orderType",
            ...Search("orderType"),
            width:150,
        },
        {
            title: "Site No",
            width:150,
            dataIndex: "siteNo",
            ...Search("siteNo")
        },

        {
            title: "Origin",
            width:150,
            dataIndex: "originName",
            ...Search("originName")
        },
        {
            title: "Destination",
            width:150,
            dataIndex: "destinationName",
            ...Search("destinationName")
        },
        {
            title: "Site Name",
            width:150,
            dataIndex: "siteName",
            ...Search("siteName")
        },
        {
            title: "Region",
            width:150,
            dataIndex: "region",
            ...Search("region")
        },
        {
            title: "WorkPackgae ID",
            width:150,
            dataIndex: "workpackageid",
            ...Search("workpackageid")
        },
        {
            title: "Scope Name",
            width:150,
            dataIndex: "scopeName",
            ...Search("scopeName")
        },
        {
            title: "Pickup Date",
            width:150,
            // dataIndex: "pickupOrDeliveryDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.pickupOrDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search("pickupOrDeliveryDate")
        },
        {
            title: "Assign To",
            width:150,
            dataIndex: "assignedTo",
            ...Search("assignedTo")
        },
        {
            title: "Incoming Date",
            // dataIndex: "incomingDate",
            width:150,
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.incomingDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                    </Space>
                )
            },
            ...Search("incomingDate")
        },
        {
            title: "Task Status",
            dataIndex: "taskStatus",
            width:150,
            ...Search("taskStatus")
        },
        
        {
            title: "Action",
            width:150,
            fixed: 'right',
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        {
                            record.ackOnProgress == "yes" ?
                                <p style={{'color':'red'}}>
                                Dismantle ACK on Progress
                                </p>
                                :
                                <Space size={16} >
                                    <Tooltip title="Re-Assign Task">
                                        <UserSwitchOutlined style={{fontSize:"18px"}} onClick={()=> showModalOnProgress(record)}  />
                                    </Tooltip>
                  
                          
                      
                                    <Tooltip title="Cancel Task">
                                        <CloseSquareTwoTone twoToneColor="#FF0000" style={{fontSize:"18px"}} onClick={()=>showModalCancel(record)}/>
                                    </Tooltip>
                                </Space>
                        }
                        
                    </div>
                   
                )
            }
        },
    ]
    const columnsAssigmentOnDone = [
        {
            title: "No",
            key: "index",
            width:50,
            render: (value, item, index) => page + index
        },
        {
            title: "Request No",
            dataIndex: "requestNo",
            width:150,
        },
        {
            title: "Order Type",
            width:150,
            dataIndex: "orderType"
        },
        {
            title: "Site No",
            width:150,
            dataIndex: "siteNo"
        },

        {
            title: "Origin",
            width:150,
            dataIndex: "originName"
        },
        {
            title: "Destination",
            width:150,
            dataIndex: "destinationName"
        },
        {
            title: "Site Name",
            width:150,
            dataIndex: "siteName"
        },
        {
            title: "Region",
            width:150,
            dataIndex: "region"
        },
        {
            title: "Workpackage ID",
            width:150,
            dataIndex: "workpackageid"
        },
        {
            title: "Scope Name",
            width:150,
            dataIndex: "scopeName"
        },
        {
            title: "Pickup Date",
            width:150,
            dataIndex: "pickupOrDeliveryDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(columnsAssigmentOnDone.pickupOrDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
        },
        {
            title: "Assign To",
            width:150,
            dataIndex: "assignedTo"
        },
        {
            title: "Assign Date",
            dataIndex: "assignedDate",
            width:150,
        },
        {
            title: "Task Status",
            width:150,
            dataIndex: "taskStatus"
        },
        {
            title: "Task Complete Date",
            width:150,
            dataIndex: "incomingDate",
            render:(record)=>{
                return (
                    
                    <Space>
                        <p>{moment(columnsAssigmentOnDone.incomingDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
        },
    ]
    const CardTitle = (title) => <Title level={5}>{title}</Title>

   

    function callback(key) {
     
        if(key==2){
            getSconOnProgress()
        }
        else if(key==3){
            getSconTaskOnDone()
        }
        console.log("keytabs",key);
    }
   
    return (
        <div>
            <Tabs defaultActiveKey="1" centered={false} onChange={callback}>
                <TabPane tab="Assignment Pending" key="1" onChange={getSconTaskPending}>
                    <Card >
                        <div >
                            <Table
                                columns={columnsAssigmentPending}
                           
                                dataSource={sconTaskPending}
                                scroll={{x: "150%"}}
                                size="small"
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
                    <Card>
                        <div >
                            <Table
                                columns={columnsAssigmentOnProgress}
                                size="small"
                                pagination={{
                                    pageSizeOptions: ['5', '10', '20', '30', '40'],
                                    showSizeChanger: true,
                                    position: ["bottomLeft"],
                                }}
                                dataSource={taskOnProgress}
                                scroll={{x: "150%"}}
                            />
                        </div>
                    </Card>
                </TabPane>
                <TabPane tab="Task Complete" key="3">
                    <Card>
                        <div >
                            <Table
                                columns={columnsAssigmentOnDone}
                                scroll={{x: "150%"}}
                                size="small"
                                pagination={{
                                    pageSizeOptions: ['5', '10', '20', '30', '40'],
                                    showSizeChanger: true,
                                    position: ["bottomLeft"],
                                }}
                                dataSource={taskDone}
                                
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
                        {isPickupRequest == true ? (<Form.Item label=" Pick Up Date">
                            <Typography>{moment(selectedPd).format("YYYY-MM-DD")}</Typography>
                        </Form.Item>):(<Form.Item label=" Expected Delivery Date">
                            <Typography>{moment(selectedPd).format("YYYY-MM-DD")}</Typography>
                        </Form.Item>)}
                        
                        <Form.Item label="Assign To">
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
                footer={
                    remarks.length <= 10 ? ( [
            
            
                        <Button disabled key="back" type="danger" >
            Confirm
                        </Button>,
                        <Button key="submit"  onClick={hideModalCancel} >
            Close
                        </Button>,
                
                    ]):( [
            
            
                        <Button key="back" type="danger" onClick={cancelTaskConfirm}>
            Confirm
                        </Button>,
                        <Button key="submit" onClick={hideModalCancel} >
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

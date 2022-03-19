/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Select,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import { CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import API  from '../../utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import ModalTaskAssignment from './ModalAssignTask'
import ModalRequestReschedule from './ModalRequestReschedule'

const TaskPendingTable = ({isAssignTaskModal}) => {
    const { Option } = Select;
    const [isLoading, setIsLoading] = useState(true);
    const [sconTaskPending,setSconTaskPending] = useState([]);
    const [isAssignTask, setIsAssignTask] = useState(false);
    const [isReschedule, setIsReschedule] = useState(false);
    const [isCancelTask, setIsCancelTask] = useState(false);
    const [selectedSconId, setSelectedSconId] = useState('');
    const [selectedWPID, setSelectedWPID] = useState('');
    const [lspName, setLspName] = useState('');
    const [selectedOrderDetailId, setSelectedOrderDetailId] = useState('');
    const [selectedTaskScheduleId, setSelectedTaskScheduleId] = useState('');
    const [selectedTransDelegateId, setSelectedTransDelegateId] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [cancelLoading, setCancelLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const getSconTaskPending = () => {
        setIsLoading(true);
        API.getSconTaskPending().then(
            result=>{
                setSconTaskPending(result);
                setIsLoading(false);
                console.log("scontaskpendnig",result);
            }
        )
    }

    const handleAssignTask = (data) =>{
        console.log("assign data:",data);
        setSelectedWPID(data.workpackageid);
        setSelectedSconId(data.subconId);
        setLspName(data.subconName);
        setPickupDate(data.pickupOrDeliveryDate);
        setSelectedOrderDetailId(data.orderDetailId);
        
        // getSubconEngineer(data.subconId,data.workpackageid);
        setIsAssignTask(true);
    }

    const handleOkAssignTask = () =>{
        setIsAssignTask(false);
    }
    const handleCancelAssignTask = () =>{
        setIsAssignTask(false);
    }
    
    const handleCancelCancelTask = () =>{
        setIsCancelTask(false);
    }
    const handleOkRequestReschedule = () =>{
        setIsReschedule(false);
    }
    const handleCancelRequestReschedule = () =>{
        setIsReschedule(false);
    }

    const handleRequestSchedule = (data) =>{
        setIsReschedule(true);
        setSelectedSconId(data.subconId);
        setSelectedTaskScheduleId(data.taskScheduleId);
        console.log(data);
    }
    const handleCancelTask = (data) =>{
        setIsCancelTask(true);
        setSelectedTransDelegateId(data.transDelegateId);
        setSelectedOrderDetailId(data.orderDetailId);
        console.log(data);
    }

    const handleOKCancelTask = () =>{
        setCancelLoading(true);
        const body = (
            {
                "transDelegateId":selectedTransDelegateId,
                "orderdetailId":selectedOrderDetailId,
                "transferBy": user.uid  
            }
        )
        // console.log("okcancel:",body)
        API.postCancelTask(body).then(
            result=>{
                setCancelLoading(false);
                setIsCancelTask(false);
                getSconTaskPending();
                console.log(result)
            }
        )

        // setIsCancelTask(false);
    }

    const columns = [
        {
            title : "No",
            render: (value, item, index) => 1 + index
        },
        {
            title : "Request No",
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            title : "Order Type",
            dataIndex:'orderType',
            ...Search('requestNo'),
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Origin",
            dataIndex:'originName',
            ...Search(''),
        },
        {
            title : "Destination",
            dataIndex:'destinationName',
            ...Search(''),
        },
        {
            title : "Site Name",
            dataIndex:'siteName',
            responsive: ['md'],
            ...Search('siteName'),
        },
        {
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            title : "Workpackage Id",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
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
            title : "Assigned By",
            dataIndex:'assignedBy',
            ...Search('assignedBy'),
        },
        {
            title : "Pickup Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.pickupOrDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('pickupOrDeliveryDate'),
        },
        {
            title : "Incoming Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.incomingDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('incomingDate'),
        },
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed:'right',
            render:(record)=>{
                return (
                    <div>
                        {record.scheduleStatus=="newpropose" ? <p style={{ color:'red' }}>Propose New Schedule Request</p>
                            :
                            <Space>
                                <Tooltip title="Assign Task">
                                    <UserAddOutlined  onClick={() => handleAssignTask(record)} />
                                </Tooltip>
                                {!record.requestReschedule?
                                    null
                                    :
                                    record.dayToGo <= -2 ?
                                        <Tooltip title="Request Reschedule">
                                            <CalendarTwoTone onClick={() => handleRequestSchedule(record)} />
                                        </Tooltip> :
                                        <Tooltip color='#f50' title="Cannot request reschedule, day to go h-1 or higher">
                                            <CalendarTwoTone />
                                        </Tooltip>
                                }
                                <Tooltip title="Cancel Task">
                                    <CloseSquareTwoTone twoToneColor="#FF0000" onClick={() => handleCancelTask(record)} />
                                </Tooltip>
                            </Space>
                        }
                    </div>
                    
                   
                )
            }
            
        },
        
    
    ]

    useEffect(() => {
        getSconTaskPending();
    },[])

    return(
        isLoading ?   
            <Row justify="center">
                <Col span={1}>    
                    <Spin />
                </Col>
            </Row>  
            :
            <><Table
                scroll={{ x: '100%' }}
                size="small"
                // expandable={{ expandedRowRender }}
                columns={columns}
                dataSource={sconTaskPending}
                pagination={{
                    pageSizeOptions: ['5', '10', '20', '30', '40'],
                    showSizeChanger: true,
                    position: ["bottomLeft"],
                }}
                bordered />
            <Modal title="Assign Task"
                visible={isAssignTask}
                onOk={handleOkAssignTask}
                onCancel={handleCancelAssignTask}
                footer={null}
                destroyOnClose={true}
            >
                <ModalTaskAssignment orderdetailid={selectedOrderDetailId} wpid={selectedWPID} sconid={selectedSconId} lspName={lspName} pickupDate={pickupDate} />
            </Modal>
            <Modal title="Request Reschedule"
                visible={isReschedule}
                onOk={handleOkRequestReschedule}
                onCancel={handleCancelRequestReschedule}
                footer={null}
                destroyOnClose={true}
            >
                <ModalRequestReschedule subconId={selectedSconId} taskScheduleId={selectedTaskScheduleId} />

            </Modal>
            <Modal title="Cancel Task"
                visible={isCancelTask}
                onOk={handleOKCancelTask}
                onCancel={handleCancelCancelTask}
                confirmLoading={cancelLoading}
                destroyOnClose={true}
            >
                <p>
                Are you sure you want to Cancel this task? 
                </p>
                <p>
                (task will be no longer available once it canceled)
                </p>

            </Modal>
            </>
            
    )
}

export default TaskPendingTable;
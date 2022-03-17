/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import { CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import API  from '../../utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import ModalTaskAssignment from './ModalAssignTask'

const TaskPendingTable = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [sconTaskPending,setSconTaskPending] = useState([]);
    const [isAssignTask, setIsAssignTask] = useState(false);
    const [isReschedule, setIsReschedule] = useState(false);
    const [isCancelTask, setIsCancelTask] = useState(false);
    const [selectedSconId, setSelectedSconId] = useState('');
    const [selectedWPID, setSelectedWPID] = useState('');

    const getSconTaskPending = () => {
        setIsLoading(true);
        API.getSconTaskPending().then(
            result=>{
                setIsLoading(false);
                setSconTaskPending(result);
                console.log("scontaskpendnig",result);
            }
        )
    }

    const getSubconEngineer = (sconid, wpid) => {
        API.getSconEngineer(sconid,wpid).then(
            result=>{
                console.log('sconEngineer', result)
            }
            
        )
    }

    const handleAssignTask = (data) =>{
        console.log("assign data:",data);
        setSelectedWPID(data.workpackageid);
        setSelectedSconId(data.subconId);
        getSubconEngineer(data.sconid,data.workpackageid);
        setIsAssignTask(true);
    }

    const handleOkAssignTask = () =>{
        setIsAssignTask(false);
    }
    const handleCancelAssignTask = () =>{
        setIsAssignTask(false);
    }

    const handleRequestSchedule = (data) =>{
        console.log(data);
    }
    const handleCancelTask = (data) =>{
        console.log(data);
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
            dataIndex:'',
            ...Search(''),
        },
        {
            title : "Destination",
            dataIndex:'',
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
            dataIndex:'scopeDetail',
            ...Search('scopeDetail'),
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
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="Assign Task">
                            <UserAddOutlined onClick={() => handleAssignTask(record)} />
                        </Tooltip>
                        {!record.requestReschedule?
                            null
                            :
                            <Tooltip title="Request Reschedule">
                                <CalendarTwoTone onClick={() => handleRequestSchedule(record)} />
                            </Tooltip>
                        }
                        <Tooltip title="Cancel Task">
                            <CloseSquareTwoTone twoToneColor="#FF0000" onClick={() => handleCancelTask(record)} />
                        </Tooltip>
                    </Space>
                )
            }
            
        },
        
    
    ]

    useEffect(() => {
        getSconTaskPending()
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
                <ModalTaskAssignment />

            </Modal>
            <Modal title="Request Reschedule"
                visible={isReschedule}
                onOk={handleOkAssignTask}
                onCancel={handleCancelAssignTask}
                footer={null}
                destroyOnClose={true}
            >
                <ModalTaskAssignment />

            </Modal>
            <Modal title="Cancel Task"
                visible={isAssignTask}
                onOk={handleOkAssignTask}
                onCancel={handleCancelAssignTask}
                footer={null}
                destroyOnClose={true}
            >
                <ModalTaskAssignment sconid={selectedSconId} wpid={selectedWPID}/>

            </Modal>
            </>
            
    )
}

export default TaskPendingTable;
/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {DatePicker,Select,Modal,Form,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import { CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import API  from '../../utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import TaskPendingTable from './Table';

const ModalRequestReschedule = (props) => {
    const { Option } = Select;
    const [subconEngineer, setSubconEngineer] = useState('');
    const [selectedEngineer, setSelectedEngineer] = useState(0);
    const user = useSelector((state) => state.auth.user);
    const [isAssignTask, setIsAssigntask] = useState(false)
    const [rescheduleDate,setRescheduleDate] = useState('');
   
    function disabledDate(current) {
        // Can not select days before today and today
        return current < moment().add(2,'d');
    }
    const onFinishRequestReschedule = (data) => {
        // console.log("datasubmitreschedule", rescheduleDate)
        const body = (
            {
                "taskScheduleId":data.taskScheduleId,
                "proposeScheduleDate": rescheduleDate,
                "proposedBy":user.uid,
                "subconId":data.subconId,
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

    const handleOkAssignTask = () => {
        
    }

    const handleCancelAssignTask = () => {
        
    }

    const onFinishFailedRequestReschedule = () =>{

    }

    const handleChangeEngineer = (data) =>{
        setSelectedEngineer(data);
        console.log(data);
    }

    useEffect(() => {
        console.log(props)
    },[props.subconId,props.taskScheduleId])

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
                'taskScheduleId': props.taskScheduleId,
                'subconId': props.subconId,
            //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
            // remember: true
            }}
            onFinish={onFinishRequestReschedule}
            onFinishFailed={onFinishFailedRequestReschedule}
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

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
        // <p>Hello Task Assignment sconid : {props.subconId}|wpid : {props.taskScheduleId}</p>
    )

}

export default ModalRequestReschedule
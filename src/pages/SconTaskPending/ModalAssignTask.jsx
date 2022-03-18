/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Select,Modal,Form,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import { CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import API  from '../../utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import TaskPendingTable from './Table';

const ModalAssigntask = (props) => {
    const { Option } = Select;
    const [subconEngineer, setSubconEngineer] = useState('');
    const [selectedEngineer, setSelectedEngineer] = useState(0);
    const user = useSelector((state) => state.auth.user);
    const [isAssignTask, setIsAssigntask] = useState(false)

    const getSubconEngineer = (sconid, wpid) => {
        API.getSconEngineer(sconid,wpid).then(
            result=>{
                console.log('sconEngineermodal', result)
                setSubconEngineer(result);
            }
        )
    }
    
    const onFinishAssigntask = (data) => {
        console.log("datasubmitassign", data)
        const body = (
            {
                "orderdetailId": props.orderdetailid,
                "transferTo": data.assignTo,
                "transferBy": user.uid  
            }
        )
        API.postAssignEngineer(body).then(
            result=>{
                console.log('sconpost', result)
                // TaskPendingTable(false);
                window.location.reload();
            }
        )
    }

    const handleOkAssignTask = () => {
        
    }

    const handleCancelAssignTask = () => {
        
    }

    const onFinishFailedAssigntask = () =>{

    }
    const handleChangeEngineer = (data) =>{
        setSelectedEngineer(data);
        console.log(data);
    }

    useEffect(() => {
        console.log("sini")
        getSubconEngineer(props.sconid,props.wpid)
        setIsAssigntask(props.isAssignTask)
    },[props.sconid,props.wpid,props.lspName,props.orderdetailid,props.isassigntask])

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
                'orderDetailId': props.orderdetailid,
                'lspName': props.lspName,
                'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                // remember: true
            }}
            onFinish={onFinishAssigntask}
            onFinishFailed={onFinishFailedAssigntask}
            autoComplete="off"
        >
            <Form.Item
                hidden
                label="orderDetailId"
                name="orderDetailId"
            >
                <Input disabled/>
            </Form.Item>
            
            <Form.Item
                label="LSP Name"
                name="lspName"
                
            >
                <Input disabled/>
            </Form.Item>
            <Form.Item
                label="Pickup Date"
                name="pickupDate"
                
            >
                <Input disabled/>
            </Form.Item>

            <Form.Item label="Assign To" name="assignTo">
                <Select 
                    onChange={(e) => handleChangeEngineer(e)}
                    placeholder="Select Engineer"
                >
                    { subconEngineer.length==0 ? <Select.Option > 
                    </Select.Option>:
                        subconEngineer.map(eng =>  <Select.Option value={eng.userId}> 
                            {eng.fullname}</Select.Option>)
                    }
                </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>
        // <p>Hello Task Assignment sconid : {props.sconid}|wpid : {props.wpid}</p>
    )

}

export default ModalAssigntask
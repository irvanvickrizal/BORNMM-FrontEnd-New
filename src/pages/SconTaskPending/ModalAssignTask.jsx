import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Modal,Form,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import { CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import API  from '../../utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';

const ModalAssigntask = (props) => {

    const [subconEngineer, setSubconEngineer] = useState('');

    const getSubconEngineer = (sconid, wpid) => {
        API.getSconEngineer(sconid,wpid).then(
            result=>{
                console.log('sconEngineer', result)
            }
            
        )
    }

    const handleOk = () => {
        
    }

    useEffect(() => {
        getSubconEngineer(props.sconid,props.wpid)
    },[])

    return (
    // <Form
    //     name="basic"
    //     labelCol={{ span: 8 }}
    //     wrapperCol={{ span: 16 }}
    //     initialValues={{
    //         'orderMaterialId': selectedMaterialId,
    //         'materialCode': selectedMaterialCode,
    //         'materialDesc': selectedMaterialDesc,
    //     }}
    //     onFinish={onFinishEditMaterial}
    //     onFinishFailed={onFinishFailedEditMaterial}
    //     autoComplete="off"
    // >
    //     <Form.Item
    //         hidden
    //         label="Material Code"
    //         name="orderMaterialId"
                
    //     >
    //         <Input disabled/>
    //     </Form.Item>
    //     <Form.Item
    //         label="Material Code"
    //         name="materialCode"
                
    //     >
    //         <Input disabled/>
    //     </Form.Item>
      
    //     <Form.Item
    //         label="Material Desc"
    //         name="materialDesc"
                
    //     >
    //         <Input disabled/>
    //     </Form.Item>
      
    //     <Form.Item
    //         label="UOM"
    //         name="uOM"
                
    //     >
    //         <Input disabled/>
    //     </Form.Item>
    //     <Form.Item
    //         label="QTY Ref"
    //         name="qtyRef"
    //     >
    //         <Input disabled/>
    //     </Form.Item>
    //     <Form.Item
    //         label="Balance"
    //         name="balance"
                
    //     >
    //         <Input disabled/>
    //     </Form.Item>
      
    //     <Form.Item 
    //         label="Site"
    //         name="neType"
    //     >
    //         <Select style={{ width: 120 }} onChange={handleChangeNeType} disabled>
    //             <Option value="NE">NE</Option>
    //             <Option value="FE">FE</Option>
    //         </Select>
    //     </Form.Item>

    //     <Form.Item
    //         label="Order Status"
    //         name="orderStatus"
                
    //     >
    //         <Input disabled/>
    //     </Form.Item>

    //     <Form.Item 
    //         label="Req QTY"
    //         name="reqQTY"
    //         rules={[{ required: true, message: 'Please input req qty!' }]}
    //     >
    //         <InputNumber />
    //     </Form.Item>

    //     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    //         <Space>
                    
        //             <Button type="primary" htmlType="submit">
        //         Submit
        //             </Button>
        //         </Space>
        //     </Form.Item>
        // </Form>
        <p>Hello Task Assignment wpId : {props.sconid}| sconid : {props.wpid}</p>
    )

}

export default ModalAssigntask
/* eslint-disable react/jsx-boolean-value */
import React, {useState,useEffect} from 'react';
import API  from '../../utils/apiServices';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Search from '@app/components/searchcolumn/SearchColumn';
import {Switch ,Form,Modal,Table, Input, Button, Space, Spin, Row, Col,Tooltip,Select  } from 'antd'
import {CheckOutlined,CloseOutlined,PlusOutlined, EditOutlined } from '@ant-design/icons'
import {IconButton}  from '@mui/material/';


export default function TableMOrderType() {
    const [dataOrdetType,setDataOrderType] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)
    const [orderTypeCode,setOrderTypeCode] = useState("")
    const [ddlFormDeliveryReq,setDDLFormDeliveryReq] = useState([])
    const [editData,setEditData] = useState([])
    const user = useSelector((state) => state.auth.user);
    const [form] = Form.useForm();

    function getOrderType(){
        setIsLoading(true)
        API.getmOrderTypeNew().then(
            result=>{
                setDataOrderType(result);
                setIsLoading(false)
            }
        )
    } 
    function getDDLFormReqType(){
        API.getmFormReqType().then(
            result=>{
                setDDLFormDeliveryReq(result);
            }
        )
    } 

    const handleIsActive = (status,data) =>{
        console.log(data,"data pass")
        console.log(status,data,"isActive")
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "id" : data.orderTypeId,
                "actStatus" : status,
                "lmby" : user.uid
            }
            console.log("activa:",body);
            API.putActivationmOrderType(body).then(
                result=>{
                    console.log("put material: ", result);
                    if(result.status=="success")
                    {
                        toast.success(result.message);
                        //refreshData();
                        //window.location.reload();
                    }
                    else{
                        toast.error(result.message);
                    }
                }
            )
        }
    }

    const showModalEdit = (data) => {
        console.log(data,"edit data")
        setIsModalEditVisible(true)
        setEditData(data)
        form.setFieldsValue({
            orderTypeCode: data.ordertype_code,
            orderTypeName: data.order_type,
            formCode: data.form_code,
            boqRefCode: data.boqref_code,
            orderTypeQString: data.ordertype_qstring,
            formDeliveryReqID: data.form_deliveryReqID
        })
    }

    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }
    const hideModalAdd = () => {
        setIsModalAddVisible(false)
    }

    const showModalAdd = () => {
        setIsModalAddVisible(true)
        getDDLFormReqType()
    }

    const failedAddForm = () => {
        setIsModalAddVisible(false)
    }

    const confirmAddForm = (data) => {
        console.log(data,"inputed data")
        const body = 
        {
            "OrderTypeId":0,
            "OrderTypeName":data.orderTypeName,
            "isTransferAsset":data.isTransferAsset,
            "isPickupRequest":data.isPickupRequest,
            "isBOQRefRequired":data.isBOQRefRequired,
            "isBOQRefParent":data.isBOQRefParent,
            "orderTypeCode":data.orderTypeCode,
            "formCode":data.formCode,
            "boqRefCode":data.boqRefCode,
            "orderTypeQString":data.orderTypeQString,
            "formDeliveryReqID":1,//data.formDeliveryReqID,
            "isRequestReschedule":data.isRequestReschedule,
            "isHasExpressDelivery":data.isHasExpressDelivery,
            "isTransportAssignedRequired":data.isTransportAssignedRequired,
            "isSubconAsssignedRequired":data.isSubconAsssignedRequired,
            "IsActive":data.isActive,
            "LMBY": user.uid
        }
        
        console.log(body,"body");
        console.log(data,"data");
        API.postOrderType(body).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getOrderType()
                    setIsModalAddVisible(false)
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )     
    }

    const column = [
        {
            title : "No",
            width : 30,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Order Type Code",
            width: 70,
            dataIndex:'ordertype_code',
            ...Search('ordertype_code'),
        },
        {
            title : "Order Type Name",
            width: 70,
            dataIndex:'order_type',
            ...Search('order_type'),
        },
        {
            title : "Order Type QString",
            width: 70,
            dataIndex:'ordertype_qstring',
            ...Search('ordertype_qstring'),
        },
        {
            title : "Form Code",
            width: 70,
            dataIndex:'form_code',
            ...Search('form_code'),
        },
        {
            title : "BOQ Ref Code",
            width: 70,
            dataIndex:'boqref_code',
            ...Search('boqref_code'),
        },
        {
            title : "Is Transfer Asset",
            width: 30,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.is_transfer_asset}
                        // onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
        },
        {
            title : "Is Pickup Request",
            width: 30,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.is_pickup_request}
                        // onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
        },
        {
            title : "BOQ Ref Req",
            width: 30,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.boqref_required}
                        // onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
        },
        {
            title : "BOQ Ref Parent",
            width: 30,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.boqref_parent}
                        // onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
        },
        {
            title : "Request Reschedule",
            width: 30,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.request_reschedule}
                        // onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
        },
        {
            title : "Has Express Delivery",
            width: 30,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.has_express_delivery}
                        // onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
        },
        {
            title : "Transport Assigned Required",
            width: 30,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.transport_assigned_required}
                        // onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
        },
        {
            title : "Subcon Assigned Required",
            width: 30,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.subcon_assigned_required}
                        // onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
        },
        {
            title : "isActive",
            width: 30,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.isactive}
                        onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
        },
        {
            title : "Options",
            width: 35,
            key:"orderMaterialId",
            align:'center',
            fixed: 'right',

            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="Edit Order Type">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="Edit Data"
                                component="span" 
                                // onClick={() => handleEdit(record)}
                            >
                                <EditOutlined onClick={()=>showModalEdit(record)}/>
                            </IconButton>
                        </Tooltip>
                    </Space>
                )
  
            },
        }

    ]

    useEffect(() => {
        getOrderType()
    
    },[])
    
    return (
        <div>
            {isLoading ? 
                <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  
                :
                <>
                    <div className='float-right'>
                        <Tooltip title="Add DOP Order Type">
                            <IconButton size="small" color="primary" >
                                <PlusOutlined onClick={showModalAdd}/>
                            </IconButton>
                        </Tooltip>

                    </div>
                    <Table
                        
                        scroll={{ x: '200%',y:500 }}
                        size="medium"
                        // expandable={{ expandedRowRender }}
                        columns={column}
                        dataSource={[...dataOrdetType]}
                        rowKey={record => record.materialId}
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                            showSizeChanger: true,
                            position: ["bottomLeft"],
                        }}
                        bordered /></>}

            <Modal title="Edit Order Type"

                visible={isModalEditVisible}
                destroyOnClose
                onCancel={hideModalEdit}
                centered
                maskClosable={false}
                closable
                footer={null}
                width={800}
                zIndex={1000}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 17 }}
                    wrapperCol={{ span: 7 }}
              
                    // onFinish={handleEditAddForm}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                    // initialValues={{
                    //     'scopeName': scopeName,
                    //     'scopeDesc': scopeDesc,
                       
                    // }}
                >
           
            
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Order Type Name" 
                                name="orderTypeName"
                                rules={[{ required: true, message: 'Please input Order Type Name Field!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Order Type Code"
                                name="orderTypeCode"
                       
                                rules={[{ required: true, message: 'Please input Order Type Code Field!' },
                                    { max:1, message : 'order type code length cannot more than 1'}
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Form Code"
                                name="formCode"
                                rules={[{ required: true, message: 'Please input Form Code Field!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="BOQ Ref Code"
                                name="boqRefCode"
                                rules={[{ required: true, message: 'Please input BOQ Ref Code Field!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Order Type QString"
                                name="orderTypeQString"
                                rules={[{ required: true, message: 'Please input Order Type QString Field!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Form Delivery Req"
                                name="formDeliveryReqID"
                                // rules={[{ required: true, message: 'Please Select Delivery Req Type!'}]}
                            >
                                <Select 
                                    // onChange={(e) => handleDDLSubconChange(e)}
                                    placeholder="Select an option"
                                >
                                    {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                    {
                                        ddlFormDeliveryReq.map(inv =>  <Select.Option value={inv.formDeliveryReqID}> 
                                            {inv.formName}</Select.Option>)
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Is Transfer Asset"
                                name="isTransferAsset"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is Active"
                                name="isActive"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={true}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                        </Col>
                    
                        <Col span={12}>
                            <Form.Item label="Is Pickup Request"
                                name="isPickupRequest"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is BOQ Ref Required"
                                name="isBOQRefRequired"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is BOQ Ref Parent"
                                name="isBOQRefParent"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is Request Reschedule"
                                name="isRequestReschedule"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is Has Express Delivery"
                                name="isHasExpressDelivery"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is Transport Assigned Req"
                                name="isTransportAssignedRequired"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is Subcon Assigned Req"
                                name="isSubconAsssignedRequired"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            
                    
                        </Col>
                    </Row>
                 
                    <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Confirm
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="ADD Order Type"
                visible={isModalAddVisible}
                destroyOnClose
                onCancel={hideModalAdd}
                centered
                maskClosable={false}
                closable
                footer={null}
                width={800}
                zIndex={1000}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 17 }}
                    wrapperCol={{ span: 7 }}
              
                    onFinish={confirmAddForm}
                    onFinishFailed={failedAddForm}
                    autoComplete="off"
                    initialValues={{
                        // "orderTypeName":"Test2Name",
                        "isTransferAsset":false,
                        "isPickupRequest":false,
                        "isBOQRefRequired":false,
                        "isBOQRefParent":false,
                        // "orderTypeCode":"t",
                        // "formCode":"fc",
                        // "boqRefCode":"rc",
                        // "orderTypeQString":"rc",
                        // "formDeliveryReqID":1,
                        "isRequestReschedule":false,
                        "isHasExpressDelivery":false,
                        "isTransportAssignedRequired":false,
                        "isSubconAsssignedRequired":false,
                        "isActive":true,
                    }}
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Order Type Name"
                                name="orderTypeName"
                                rules={[{ required: true, message: 'Please input Order Type Name Field!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Order Type Code"
                                name="orderTypeCode"
                       
                                rules={[{ required: true, message: 'Please input Order Type Code Field!' },
                                    { max:1, message : 'order type code length cannot more than 1'}
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Form Code"
                                name="formCode"
                                rules={[{ required: true, message: 'Please input Form Code Field!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="BOQ Ref Code"
                                name="boqRefCode"
                                rules={[{ required: true, message: 'Please input BOQ Ref Code Field!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Order Type QString"
                                name="orderTypeQString"
                                rules={[{ required: true, message: 'Please input Order Type QString Field!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Form Delivery Req"
                                name="formDeliveryReqID"
                                // rules={[{ required: true, message: 'Please Select Delivery Req Type!'}]}
                            >
                                <Select 
                                    // onChange={(e) => handleDDLSubconChange(e)}
                                    placeholder="Select an option"
                                >
                                    {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                    {
                                        ddlFormDeliveryReq.map(inv =>  <Select.Option value={inv.formDeliveryReqID}> 
                                            {inv.formName}</Select.Option>)
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Is Transfer Asset"
                                name="isTransferAsset"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is Active"
                                name="isActive"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={true}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                        </Col>
                    
                        <Col span={12}>
                            <Form.Item label="Is Pickup Request"
                                name="isPickupRequest"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is BOQ Ref Required"
                                name="isBOQRefRequired"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is BOQ Ref Parent"
                                name="isBOQRefParent"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is Request Reschedule"
                                name="isRequestReschedule"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is Has Express Delivery"
                                name="isHasExpressDelivery"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is Transport Assigned Req"
                                name="isTransportAssignedRequired"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            <Form.Item label="Is Subcon Assigned Req"
                                name="isSubconAsssignedRequired"
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={false}
                                    // checked={record.isActive}
                                />
                            </Form.Item>
                            
                    
                        </Col>
                    </Row>
                    
                    <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Confirm
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}

/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-no-comment-textnodes */
import React,{useEffect,useState} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button,Select,Typography} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {PlusOutlined,CheckOutlined,CloseOutlined,EditOutlined,CloseSquareOutlined,FormOutlined }from '@ant-design/icons'
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';

const { TextArea } = Input;


export default function TableMasterMrs() {
    const [dataMrs,setDataMrs] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [ddlSubcon,setDdlSubconw] = useState([])
    const [ddlDeliveryType,setDdlDeliveryType] = useState([])
    const [ddlDestination,setDdlDestiantion] = useState([])
    const [ddlVehicle,setDdlVehicle] = useState([])
    const [ddlDeliveryOrigin,setDdlDeliveryOrigin] = useState([])
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)
    const [isModalDelete,setIsModalDeleteVisible] = useState(false)
    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [selectedSubcon,setSelectedSubcon] = useState("")
    const [selectedDeliveryType,setSelectedDeliveryType] = useState("")
    const [selectedOrigin,setSelectedOrigin] = useState("")
    const [selectedDestination,setSelectedDestination] = useState("")
    const [selectedVehicle,setSelectedVehicle] = useState("")
    const [price,setPrice] = useState("")
    const [form] = Form.useForm();


    const userId = useSelector(state=>state.auth.user.uid)
    const [mrsId,setMrsId] = useState(null)


    const getDataMRS = () =>{
        setIsLoading(true)

        API.getMasterMrs().then(
            result=>{
                setDataMrs(result)
                setIsLoading(false)
              

                console.log('data MRS==',result)
                
            }
        )
    } 
    const refreshData =()=>{
        getDataMRS()
    }

    const getDdlSucon = () =>{

        API.getSubcon().then(
            result=>{
                setDdlSubconw(result)
              

                console.log('ddl Subcon',result)
                
            }
        )
    } 
    const getDdlDeliveryType = () =>{

        API.getmDeliveryType().then(
            result=>{
                setDdlDeliveryType(result)
              

                console.log('ddl DeliveryType',result)
                
            }
        )
    } 
    const getDdlOrigin = () =>{

        API.getDdlOridgin(selectedDeliveryType).then(
            result=>{
                setDdlDeliveryOrigin(result)
              

                console.log('ddl origin',result)
                
            }
        )
    } 
    const getDdlDestination = () =>{

        API.getDdlDestination(selectedDeliveryType).then(
            result=>{
                setDdlDestiantion(result)
              

                console.log('ddl destination',result)
                
            }
        )
    } 
    const getDdlVehicle = () =>{

        API.getMasterVevicle().then(
            result=>{
                setDdlVehicle(result)
              

                console.log('ddl vehicle',result)
                
            }
        )
    } 

    const showModalAdd = () => {
        setIsModalAddVisible(true)
    }
    const hideModalAdd = () => {
        setIsModalAddVisible(false)
        setSelectedDeliveryType("")
    }

    const showModalDelete = (data) => {
        setIsModalDeleteVisible(true)
        setMrsId(data)
    }
    const hideModalDelete = () => {
        setIsModalDeleteVisible(false)
    }
    const showModalEdit = (data) => {
        setIsModalEditVisible(true)
        setPrice(data.price) 
        setSelectedVehicle(data.vehicleName)
        setSelectedSubcon(data.subconName)
        setSelectedDestination(data.districtDestination)
        setSelectedOrigin(data.dopOrigin)
        setMrsId(data.MRSID)

    }
    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }

    const onChnageDdlDeliveryType = (data) => {
        setSelectedDeliveryType(data)
        form.setFieldsValue({
            destination: "",
            origin:""
        })
        // getDdlDestination()
        // getDdlOrigin()
    }
   


  

    const handlePostAdd = (data) => {
        const body = 
            {
                "deliveryTypeMappingOrigin":selectedOrigin,
                "deliveryTypeMappingDestination":selectedDestination,
                "subconID":selectedSubcon,
                "vehicleID":selectedVehicle,
                "price":price,
                "lmby":userId
                
             
            }
        
        console.log(body,"body");
        console.log(data,"data");
        API.postMasterMrs(body).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    refreshData()
                    setIsModalAddVisible(false)
                
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )              
    }
    const handlePutPriceMRS = (data) => {
        const body = 
            {
                "mrsID":mrsId,
                "price":price,
                "lmby":userId
                
             
            }
        
        console.log(body,"body");
        console.log(data,"data");
        API.PutPriceMRS(body).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    refreshData()
                    setIsModalAddVisible(false)
                
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )              
    }


    const handleDelete = () => {
     
            
        
        console.log(mrsId)

        API.deleteMrs(mrsId).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    refreshData()
                    setIsModalDeleteVisible(false)
                
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        
        )              
    }

    const columns = [
        {
            title : "No",
            width : 5,
            align:'center',
            render: (value, item, index) => 1 + index,
         
        },
        {
            title : "Vehicle Name",
            width : 250,
            dataIndex:'vehicleName',
         
            ...Search('vehicleName'),
        },        
        {
            title : "Subcon Name",
            width : 250,
            dataIndex:'subconName',
            ...Search('subconName'),
        },
        {
            title : "DOP Origin",
            width : 250,
            dataIndex:'dopOrigin',
            ...Search('districtName'),
        },
        // {
        //     title : "District Origin",
        //     width : 250,
        //     dataIndex:'districtOrigin',
         
        //     ...Search('districtOrigin'),
        // },
        {
            title : "DOP Destination",
            width : 250,
            dataIndex:'dopDestination',
         
            ...Search('dopDestination'),
        },
        {
            title : "District Destination",
            width : 250,
            dataIndex:'districtDestination',
         
            ...Search('districtDestination'),
        },
      
        {
            title : "Price",
            width : 250,
            dataIndex:'price',
         
            ...Search('price'),
        },
      
        
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed: 'right',
            width: 70,
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="Edit MRS">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                // onClick={() => showModalEdit(record)}
                            >
                                <FormOutlined style={{color:"black"}} onClick={()=>showModalEdit(record)}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete MRS">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                // onClick={() => showModalEdit(record)}
                            >
                                <CloseSquareOutlined style={{color:"red"}} onClick={()=>showModalDelete(record.MRSID)}/>
                            </IconButton>
                        </Tooltip>
                        
                    </Space>
                )
            }
            
        },
    ]
    useEffect(() => {
        getDdlSucon()
        getDdlDeliveryType()
        getDdlOrigin()
        getDdlDestination()
        getDdlVehicle()
        getDataMRS()
        
    },[selectedDeliveryType])



    return (
        <div>
            {isLoading ? 
                <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  
                :
                <><div className='float-right'>



                    <Tooltip title="Add MRS">
                        <IconButton size="small" color="primary" onClick={showModalAdd}>
                            <PlusOutlined />
                        </IconButton>
                    </Tooltip>

                </div><Table

                    size="small"
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataMrs}
                    rowKey={record => record.vehicleId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>
            }
            <Modal title="Add Master MRS"
                visible={isModalAddVisible}
                destroyOnClose
                onCancel={hideModalAdd}
                centered
                maskClosable={false}
                closable
                footer={null}
            >
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
                    initialValues={{
                        // 'orderDetailId': selectedOrderDetailId,
                        // 'requestNo': selectedRequestNo,
                        // 'rfpDate': moment(selectedRFPDate).format("YYYY-MM-DD"),
                        // 'deliveryType': selectedCDMRType,
                        // // 'taskScheduleId': props.taskScheduleId,
                        // // 'subconId': props.subconId,
                        // //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                        // // remember: true
                    }}
                    onFinish={handlePostAdd}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    <Form.Item name="subcon" label="Subcon Name"
                        wrapperCol={{  span: 14 }}
                                   
                        rules={[{ required: true, message: 'Please Select Subcon Name!' }]}
                    >
                        <Select 
                            placeholder="Select Your Group"
                            onChange={(e) => setSelectedSubcon(e)}
                        >
                            {
                                ddlSubcon.map(inv =>  <Select.Option  value={inv.subconId}> 
                                    {inv.subconName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="deliveryType" label="Delivery Type"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Select Delivery Type!' }]}
                    >
                        <Select 
                            placeholder="Select Your Group"
                            onChange={(e) => onChnageDdlDeliveryType(e)}
                        >
                            {
                                ddlDeliveryType.map(inv =>  <Select.Option  value={inv.deliveryTypeId}> 
                                    {inv.deliveryTypeName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="origin" label="Origin"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Select Origin!' }]}
                    >
                        <Select 
                            disabled={selectedDeliveryType === "" ? (true):(false)}
                            placeholder="Select Your Group"
                            onChange={(e) => setSelectedOrigin(e)}
                        >
                            {
                                ddlDeliveryOrigin.map(inv =>  <Select.Option  value={inv.DeliveryTypeMappingID}> 
                                    {inv.dopName}</Select.Option>)
                            }
                        </Select>
                        
                    </Form.Item>
              
                    <Form.Item name="destination" label="Destination"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Select Destination!' }]}
                    >
                        
                        <Select 
                            placeholder="Select Your Group"
                            onChange={(e) => setSelectedDestination(e)}
                            disabled={selectedDeliveryType === "" ? (true):(false)}
                        >
                            {
                                ddlDestination.map(inv =>  <Select.Option  value={inv.DeliveryTypeMappingID}> 
                                    {inv.districtName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="vehicle" label="Vehicle"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Select Vehicle!' }]}
                    >
                        <Select 
                            placeholder="Select Your Group"
                            onChange={(e) => setSelectedVehicle(e)}
                        >
                            {
                                ddlVehicle.map(inv =>  <Select.Option  value={inv.vehicleId}> 
                                    {inv.vehicleName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Price" name="price" 
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Fill Price Field!' }]}
                    >
                        <Input rows={2} onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Item>
              
                
            
                      
                   
                    
                      
                
                   
             
                    <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Confirm
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Edit Master MRS"
                visible={isModalEditVisible}
                destroyOnClose
                onCancel={hideModalEdit}
                centered
                maskClosable={false}
                closable
                footer={null}
            >
                <Form
                    name="basic"
           
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
                    initialValues={{
                        // 'orderDetailId': selectedOrderDetailId,
                        // 'requestNo': selectedRequestNo,
                        // 'rfpDate': moment(selectedRFPDate).format("YYYY-MM-DD"),
                        // 'deliveryType': selectedCDMRType,
                        "subcon" :selectedSubcon,
                        "origin":selectedOrigin,
                        "destination":selectedDestination,
                        "vehicle":selectedVehicle,
                        "price":price
                    }}
                    onFinish={handlePutPriceMRS}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    <Form.Item name="subcon" label="Subcon Name"
                        wrapperCol={{  span: 14 }}
                         
                        rules={[{ required: true, message: 'Please Select Subcon Name!' }]}
                    >
                        <Select 
                            placeholder="Select Your Group"
                            disabled   
                            onChange={(e) => setSelectedSubcon(e)}
                        >
                            {
                                ddlSubcon.map(inv =>  <Select.Option  value={inv.subconId}> 
                                    {inv.subconName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                  
                    <Form.Item name="origin" label="Origin"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Select Origin!' }]}
                    >
                        <Select 
                            disabled
                            placeholder="Select Your Group"
                            onChange={(e) => setSelectedOrigin(e)}
                        >
                            {
                                ddlDeliveryOrigin.map(inv =>  <Select.Option  value={inv.DeliveryTypeMappingID}> 
                                    {inv.dopName}</Select.Option>)
                            }
                        </Select>
                        
                    </Form.Item>
              
                    <Form.Item name="destination" label="Destination"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Select Destination!' }]}
                    >
                        
                        <Select 
                            placeholder="Select Your Group"
                            onChange={(e) => setSelectedDestination(e)}
                            disabled
                        >
                            {
                                ddlDestination.map(inv =>  <Select.Option  value={inv.DeliveryTypeMappingID}> 
                                    {inv.districtName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="vehicle" label="Vehicle"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Select Vehicle!' }]}
                    >
                        <Select 
                            disabled
                            placeholder="Select Your Group"
                            onChange={(e) => setSelectedVehicle(e)}
                        >
                            {
                                ddlVehicle.map(inv =>  <Select.Option  value={inv.vehicleId}> 
                                    {inv.vehicleName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Price" name="price" 
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Fill Price Field!' }]}
                    >
                        <Input rows={2} onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Confirm
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>


            <Modal 
                visible={isModalDelete}
                destroyOnClose
                onCancel={hideModalDelete}
                centered
                maskClosable={false}
                closable
                footer={null}
            >
                <div style={{height: 70,}}>
                    <Typography>Are You Sure to Delete This Delivery Type Destination Mapping ?</Typography>
                </div>
                <Row align="middle" justify="end">
                    <Space>
                        <Button  htmlType="submit" onClick={hideModalDelete}>
                                Cancel
                        </Button>
                        <Button type="danger" htmlType="submit" onClick={handleDelete}>
                                Delete
                        </Button>
                    </Space>
             
                 
                </Row>
           
             
                 
         
            
            </Modal> 
        </div>
    )
}

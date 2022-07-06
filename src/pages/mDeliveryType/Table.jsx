/* eslint-disable no-unneeded-ternary */
import React,{useEffect,useState} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button,Select,Typography} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {PlusOutlined,CheckOutlined,CloseOutlined,EditOutlined,CloseSquareOutlined}from '@ant-design/icons'
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';


export default function TableDeliveryType() {
    const [dataDeliveryTypeGroup,setDataDeliveryTypeGroup] = useState([])
    const [ddlDeliveryType,setDdlDeliveryType] = useState([])
    const [ddlDop,setDdlDop] = useState([])
    const [ddlDistrict,setDdlDistrict] = useState([])
    const [selectedDeliveryType,setSlectedDeliveryType] = useState('')
    const [selectedId,setSlectedId] = useState('')
    const [selectedDop,setSlectedDop] = useState('')
    const [selectedDistrict,setSlectedDistrict] = useState('')
    const [selectedGroup,setSlectedGroup] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)
    const [isModalDeleteVisible,setIsModalDeleteVisible] = useState(false)
    // const [selectedVehicleName,setSelectedVehicleName] = useState("")
    // const [selectedVehicleId,setSelectedVehicleId] = useState("")

    const userId = useSelector(state=>state.auth.user.uid)

    const getDeliveryType = () =>{
        setIsLoading(true)
        API.getDeliveryTypeGroup().then(
            result=>{
                setDataDeliveryTypeGroup(result)
                setIsLoading(false)
                console.log('data master DeliveryType',result)
                
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
    const getDdlDistrict = () =>{

        API.getMasterDistrict().then(
            result=>{
                setDdlDistrict(result)
              

                console.log('ddl District',result)
                
            }
        )
    } 
    const getDdlDop = () =>{

        API.getmDOPList().then(
            result=>{
                setDdlDop(result)
                console.log('ddl DOP',result)
                
            }
        )
    } 
    function refreshData(){
        getDeliveryType();
    }

    const handlePostDestinationTypeMapping = (data) => {
        const body = 
            {
                "DeliveryTypeID":data.deliveryType, 
                "OriginID": data.origin,
                "DestinationID":data.destination,
                "lmby":userId
            }
        
        console.log(body,"body");
        console.log(data,"data");
        API.postDeliveryTypeGroup(body).then(
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
        API.deleteteDeliveryTypeGroup(selectedId).then(
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


    function handleDeliveryTypeDDLChange(e){
        console.log("handleInvDDLChange",e); 
        setSlectedDeliveryType(e);
    
    }
    function handleDopDDLChange(e){
        console.log("handleInvDDLChange",e); 
        setSlectedDop(e);
    
    }
    function handleGroupDDLChange(e){
        console.log("handleInvDDLChange",e); 
        setSlectedGroup(e);
    
    }
    function handleDistrictChange(e){
        console.log("handleInvDDLChange",e); 
        setSlectedDistrict(e);
    
    }

    const showModalDelete = (data) => {
        console.log(data,"data pass")
        setIsModalDeleteVisible(true)
        setSlectedId(data.DeliveryTypeMappingID)
    }

    const showModalAdd = () => {
        setIsModalAddVisible(true)
    }

    const hideModalAdd = () => {
        setIsModalAddVisible(false)
    }

    const hideModalDelete = () => {
        setIsModalDeleteVisible(false)
    }

    const dataGroup = [
        {
            name:"Origin"
        },
        {
            name:"Destination"
        }
    ]

    const columns = [
        {
            title : "No",
            width : 5,
            align:'center',
            render: (value, item, index) => 1 + index,
         
        },
        {
            title : "Delivery Type",
            width : 250,
            dataIndex:'deliveryType',
         
            ...Search('deliveryType'),
        },        
        {
            title : "Origin Name",
            width : 250,
            dataIndex:'originName',
            ...Search('originName'),
        },
        {
            title : "Destination Name",
            width : 250,
            dataIndex:'destinationName',
            ...Search('destinationName'),
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
                        <Tooltip title="Delete Delivery Type Mapping">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                // onClick={() => showModalEdit(record)}
                            >
                                <CloseSquareOutlined style={{color:"red"}} onClick={()=>showModalDelete(record)}/>
                            </IconButton>
                        </Tooltip>
                    </Space>
                )
            }
            
        },
    ]


    useEffect(() => {
        getDeliveryType()
        getDdlDeliveryType()
        getDdlDop()
        getDdlDistrict()
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
                <><div className='float-right'>



                    <Tooltip title="Add Material">
                        <IconButton size="small" color="primary" onClick={showModalAdd}>
                            <PlusOutlined />
                        </IconButton>
                    </Tooltip>

                </div><Table

                    size="small"
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataDeliveryTypeGroup}
                    rowKey={record => record.vehicleId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>
            }
            <Modal title="Add Destination Type Mapping"
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
                    onFinish={handlePostDestinationTypeMapping}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    <Form.Item name="deliveryType" label="Delivery Type" placeholder="Select Ypur Delivery Type"
                        wrapperCol={{  span: 14 }}
                                   
                        rules={[{ required: true, message: 'Please Select Destination Type!' }]}
                    >
                        <Select 
                            placeholder="Select Your Delivery Type"
                            onChange={(e) => handleDeliveryTypeDDLChange(e)}
                        >
                            {
                                ddlDeliveryType.map(inv =>  <Select.Option  value={inv.deliveryTypeId}> 
                                    {inv.deliveryTypeName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                
                    <Form.Item name="origin" label="Origin"
                        wrapperCol={{  span: 14 }}
                                   
                        rules={[{ required: true, message: 'Please Select End Point!' }]}
                    >
                        <Select 
                            placeholder="Select Your DOP"
                            onChange={(e) => handleDopDDLChange(e)}
                        >
                            {
                                ddlDop.map(inv =>  <Select.Option  value={inv.dopId}> 
                                    {inv.dopName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="destination" label="Destination"
                        wrapperCol={{  span: 14 }}
                                   
                        rules={[{ required: true, message: 'Please Select End Point!' }]}
                    >
                        <Select 
                            placeholder="Select Your DOP"
                            onChange={(e) => handleDopDDLChange(e)}
                        >
                            {
                                ddlDop.map(inv =>  <Select.Option  value={inv.dopId}> 
                                    {inv.dopName}</Select.Option>)
                            }
                        </Select>
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
                visible={isModalDeleteVisible}
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

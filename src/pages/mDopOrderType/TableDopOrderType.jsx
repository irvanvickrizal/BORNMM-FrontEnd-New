import React,{useEffect,useState} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button,Select,Typography} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {PlusOutlined,CheckOutlined,CloseOutlined,EditOutlined,CloseSquareOutlined}from '@ant-design/icons'
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux'

export default function TableDopOrderType() {
    const [dataDopOrderType,setDataDopOrderRype] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isModalDeleteVisible,setIsModalDeleteVisible] = useState(false)
    const [isModalAddVisible,setIsModaAddVisible] = useState(false)
    const [selectedId,setSlectedId] = useState('')
    const [selectedDopName,setSelectedDopName] = useState('')
    const [selectedOrderType,setSelectedOrderType] = useState('')
    const [selectedGroup,setSelectedGroup] = useState('')
    const [ddlDop,setDdlDop] = useState([])
    const [ddlOrderType,setDdlOrderType] = useState([])

    const ddlGroup = [
        {
            name:"Origin"
        },
        {
            name:"Destination"
        }
    ]


    const uId = useSelector(state=>state.auth.user.uid)

    const getDataDopOrderType = () =>{
        setIsLoading(true)
        API.getDataDopOrderType().then(
            result=>{
                setDataDopOrderRype(result)
              

                setIsLoading(false)
                console.log('data master DOP Order Type',result)
                
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
    const getDdlOrderType = () =>{

        API.getmOrderType().then(
            result=>{
                setDdlOrderType(result)
              

                console.log('ddl od',result)
                
            }
        )
    }

    
    const showModalDelete = (data) => {
        console.log(data,"data pass")
        setIsModalDeleteVisible(true)
        setSlectedId(data.dop_ordertype_id)
    }

    const hideModalDelete = () => {
        setIsModalDeleteVisible(false)
    }
    const showModalAdd = (data) => {
        console.log(data,"data pass")
        setIsModaAddVisible(true)
        
    }

    const hideModalAdd = () => {
        setIsModaAddVisible(false)
    }

    
    const handleIsActive = (data) =>{
        console.log(data,"isActive")
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "Id":data.dopId,
                "ActStatus":!data.isActive,
                "LMBY":  uId
            }
            console.log("activa:",body);
            API.putActiveStatus(body).then(
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

    const handlePostDopOrderType = (data) => {
        const body = 
            {
                DOPID:selectedDopName, 
                OrderTypeID:selectedOrderType,
                GroupType:selectedGroup,
          
                LMBY:uId
             
            }
        
        console.log(body,"body");
        console.log(data,"data");
        API.postDeliveryTypeMapping(body).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    // refreshData()
                    setIsModaAddVisible(false)
                
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )              
    }

    const handleDelete = () => {
     
            
        
     

        API.deleteDataDopOrderType(selectedId).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    // refreshData()
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
            title : "DOP Name",
            width : 250,
            dataIndex:'dop_name',
         
            ...Search('dop_name'),
        },        
        {
            title : "Order Type",
            width : 250,
            dataIndex:'order_type',
            ...Search('order_type'),
        },
        {
            title : "Group",
            width : 250,
            dataIndex:'group_type',
            ...Search('group_type'),
        },
        {
            title : "isActive",
            width: 50,
            align:'center',
            fixed: 'right',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.is_active}
                        onClick={()=>handleIsActive(record)}
                        // checked={record.isActive}
                    />
                )
            },
  
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
        getDataDopOrderType()
        getDdlOrderType()
        getDdlDop()     
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



                    <Tooltip title="Add DOP Order Type">
                        <IconButton size="small" color="primary" >
                            <PlusOutlined onClick={showModalAdd}/>
                        </IconButton>
                    </Tooltip>

                </div><Table

                    size="small"
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataDopOrderType}
                    rowKey={record => record.vehicleId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>
            }
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
                    <Typography>Are You Sure to Delete This DOP Based on Order Type?</Typography>
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
            <Modal title="Add DOP Order Type"
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
                    onFinish={handlePostDopOrderType}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    <Form.Item name="dopName" label="DOP Name"
                        wrapperCol={{  span: 14 }}
                                   
                        rules={[{ required: true, message: 'Please Select DOP!' }]}
                    >
                        <Select 
                            placeholder="Select Your DOP"
                            onChange={(e) => setSelectedDopName(e)}
                        >
                            {
                                ddlDop.map(inv =>  <Select.Option  value={inv.dopId}> 
                                    {inv.dopName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    
                    <Form.Item name="orderType" label="Order Type" placeholder="Select Your Order Type"
                        wrapperCol={{  span: 14 }}
                                   
                        rules={[{ required: true, message: 'Please Select Destination Type!' }]}
                    >
                        <Select 
                            placeholder="Select Your Order Type"
                            onChange={(e) => setSelectedOrderType(e)}
                        >
                            {
                                ddlOrderType.map(inv =>  <Select.Option  value={inv.orderTypeId}> 
                                    {inv.orderTypeName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                
                    <Form.Item name="group" label="Group"
                        wrapperCol={{  span: 14 }}
                                   
                        rules={[{ required: true, message: 'Please Select Group!' }]}
                    >
                        <Select 
                            placeholder="Select Your Group"
                            onChange={(e) => setSelectedGroup(e)}
                        >
                            {
                                ddlGroup.map(inv =>  <Select.Option  value={inv.name}> 
                                    {inv.name}</Select.Option>)
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
        </div>
    )
}

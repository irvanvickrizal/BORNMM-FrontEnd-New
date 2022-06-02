import React,{useEffect,useState} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {PlusOutlined,CheckOutlined,CloseOutlined,EditOutlined}from '@ant-design/icons'
import {toast} from 'react-toastify';

export default function TableVehicle() {
    const [dataMasterVehicle,setDataMasterVehicle] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)
    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [selectedVehicleName,setSelectedVehicleName] = useState("")
    const [selectedVehicleId,setSelectedVehicleId] = useState("")

    
    const getVehicle = () =>{
        setIsLoading(true)
        API.getMasterVevicle().then(
            result=>{
                setDataMasterVehicle(result)
              

                setIsLoading(false)
                console.log('data master Vehicle',result)
                
            }
        )
    } 


    const showModalAdd = () =>{
        setIsModalAddVisible(true)
    }

    const hideModalAdd = () =>{
        setIsModalAddVisible(false)
    }

    function refreshData(){
        getVehicle();
    }

    const handlePostVehicle = (data) => {
        const body = 
            {
                "vehicleId":0, 
                "vehicleName": data.vehicleName,
             
            }
        
        console.log(body,"body");
        console.log(data,"data");
        API.PostMasterVehicle(body).then(
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


    const showModalEdit = (data) => {
        setIsModalEditVisible(true)
        setSelectedVehicleName(data.vehicleName)
        setSelectedVehicleId(data.vehicleId)
    }

    const hideModalEdit = () => {
        setIsModalEditVisible(false)
      
    }

    const handleEditVehicle = (data) => {
        const body = 
            {
                "vehicleId":selectedVehicleId, 
                "vehicleName": data.vehicleName,
             
            }
        
        console.log(body,"body");
        console.log(data,"data");
        API.PutMasterVehicle(body).then(
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
            title : "Is Active",
            width : 80,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.isActive}
                     
                        // checked={record.isActive}
                    />
                )
            },
     
            ...Search('boqRefCheck'),
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
                        <Tooltip title="Edit Material">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                onClick={() => showModalEdit(record)}
                            >
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                    </Space>
                )
            }
            
        },
        
    
    
        
        
    
    ]


    useEffect(() => {
        getVehicle()
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
                    dataSource={dataMasterVehicle}
                    rowKey={record => record.vehicleId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>
            }
            <Modal title="Add New Vehicle"
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
                    onFinish={handlePostVehicle}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Vehicle Name"
                        name="vehicleName"
                        rules={[{ required: true, message: 'Please input your Vehicle Name!' }]}
                    >
                        <Input />
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
            <Modal title="Edit New Vehicle"
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
                        'vehicleName': selectedVehicleName,
                        // 'requestNo': selectedRequestNo,
                        // 'rfpDate': moment(selectedRFPDate).format("YYYY-MM-DD"),
                        // 'deliveryType': selectedCDMRType,
                        // // 'taskScheduleId': props.taskScheduleId,
                        // // 'subconId': props.subconId,
                        // //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                        // // remember: true
                    }}
                    onFinish={handleEditVehicle}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Vehicle Name"
                        name="vehicleName"
                        rules={[{ required: true, message: 'Please input your Vehicle Name!' }]}
                    >
                        <Input />
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

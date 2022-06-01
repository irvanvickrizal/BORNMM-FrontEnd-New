import React,{useEffect,useState} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {PlusOutlined,CheckOutlined,CloseOutlined,EditOutlined}from '@ant-design/icons'

export default function TableMasterDistrict() {
    const [dataMasterDistrct,setDataMasterDistrict] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)
    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [districName,setDistrictName] = useState("")
    const [region,setRegion] = useState("")
    const [isActive,setIsActive] = useState(false)



    const getDistrict = () =>{
        setIsLoading(true)
        API.getMasterDistrict().then(
            result=>{
                setDataMasterDistrict(result)
              

                setIsLoading(false)
                console.log('data master district',result)
                
            }
        )
    } 



    const showModalAdd = ()=>{
        setIsModalAddVisible(true)
    }

    const hideModal = ()=>{
        setIsModalAddVisible(false)
    }
    
    const handlePost = ()=>{
        setIsModalAddVisible(false)
    }

    const showModalEdit = (data) => {
        setIsModalEditVisible(true)
        console.log(data,"data pass")
        setIsModalAddVisible(false)
        setDistrictName(data.districName)
        setRegion(data.region)
        setIsActive(data.isActive)
    }
    
    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }

    
    const handleEdit = (data)=>{
        console.log(data,"data pass")
        setIsModalAddVisible(false)
        setDistrictName(data.districName)
        setRegion(data.region)
        setIsActive(data.isActive)
    }

    const Data = [
        {
            districName:"Bandung",
            region:"Jawa Barat",
            isActive:true
        },
        {
            districName:"Jakarta",
            region:"Jawa Barat",
            isActive:false
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
            title : "District Name",
            width : 250,
            dataIndex:'districtName',
         
            ...Search('boqRefCheck'),
        },
        {
            title : "Region Name",
            width : 250,
            dataIndex:'regionName',

            ...Search('boqRefCheck'),
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
        getDistrict()
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

                </div>
                <Table
                
                    size="small"
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataMasterDistrct}
                    rowKey={record => record.materialId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />
                <Modal title="Add New District"
                    visible={isModalAddVisible}
                    destroyOnClose
                    onCancel={hideModal}
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
                        onFinish={handlePost}
                        // onFinishFailed={handleFailedAddForm}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="District Name"
                            name="districtName"
                            rules={[{ required: true, message: 'Please input your District Name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Region"
                            name="regionName"
                            rules={[{ required: true, message: 'Please input your Region!' }]}
                        >
                            <Input />
                        </Form.Item>
                      
                   
                    
                      
                
                   
                        <Form.Item label="Is Active"
                            name="isActive"
                        
                        >
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                             
                                // checked={record.isActive}
                            />
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
                <Modal title="Edit District"
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
                            "districtName":districName,
                            "regionName":region,
                            "isActive":isActive
                            // 'orderDetailId': selectedOrderDetailId,
                            // 'requestNo': selectedRequestNo,
                            // 'rfpDate': moment(selectedRFPDate).format("YYYY-MM-DD"),
                            // 'deliveryType': selectedCDMRType,
                            // // 'taskScheduleId': props.taskScheduleId,
                            // // 'subconId': props.subconId,
                            // //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                            // // remember: true
                        }}
                        onFinish={handleEdit}
                        // onFinishFailed={handleFailedAddForm}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="District Name"
                            name="districtName"
                            rules={[{ required: true, message: 'Please input your District Name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Region"
                            name="regionName"
                            rules={[{ required: true, message: 'Please input your Region!' }]}
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
                </>
            }
        </div>
    )
            
}

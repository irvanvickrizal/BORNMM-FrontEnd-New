import React,{useState,useEffect} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button,Select,Typography} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {EditFilled, FileExcelOutlined,CloseOutlined,CheckOutlined,PlusOutlined }from '@ant-design/icons'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux'

export default function TableMasterPhotoGroup() {
    const [dataFromFetch,setDataFromFetch] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)

    //? Fetch Data

    const getMasterPhotoGroup = () => {
        setIsLoading(true)
        API.getMasterPhotoGroup().then(
            result=>{
                setDataFromFetch(result)
                  
    
                setIsLoading(false)
                console.log('data photogroup',result)
                    
            }
        )

    }


    //? selected from dropdown for body request

    const [selectedGroup,setSelectedGroup] = useState("")
    const [selectedCategoryGroupId,setSelectedCategoryGroupId] = useState("")
    const [selectedParent,setSelectedParent] = useState("")
    const [status,setStatus] = useState(false)
    const uId = useSelector(state=>state.auth.user.uid)
  

    //? submit add form

    const body = {
        CategoryGroupId:0,
        ParentId:selectedParent,
        GroupName: selectedGroup,
        LMBY:uId
    }

    const postMasterPhotoGroup = () => {
        API.addMasterPhotoGroup(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getMasterPhotoGroup()
                    setIsModalAddVisible(false)
                    
                }
                else{
                    toast.error(result.message);
                    setIsModalAddVisible(false)
                }
            }
        )
    }

    const handleSubmitAdd = () => {
        postMasterPhotoGroup()
        console.log(body)
 
    }


    //? submit edit form

    const bodyEdit = {
        CategoryGroupID:selectedCategoryGroupId,
        ParentId:selectedParent,
        Status: status,
        LMBY:uId
    }
    
    const putMasterPhotoGroup = () => {
        API.editMasterPhotoGroup(bodyEdit).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getMasterPhotoGroup()
                    setIsModalEditVisible(false)
                    
                }
                else{
                    toast.error(result.message);
                    setIsModalEditVisible(false)
                }
            }
        )
    }

    const handleEditForm =()=>{
        putMasterPhotoGroup()
        console.log(bodyEdit)
    }

    

    //? Modal Handle

    const showModalEdit = (data) => {
        setIsModalEditVisible(true)
        setStatus(data.IsActive)
        setSelectedParent(data.Parent)
      
        console.log(data,"ini")
    }
    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }
    const showModalAdd = (data) => {
        setIsModalAddVisible(true)
      
        console.log(data,"ini")
    }
    const hideModalAdd = () => {
        setIsModalAddVisible(false)
    }


    const columns = [
        {
            title : "No",
            width : 50,
            align:'center',
            render: (value, item, index) => 1 + index,
         
        },
        {
            title : "Group",
            width : 250,
            dataIndex:'Group',
         
            ...Search('Group'),
        },        
        {
            title : "Parent",
            width : 150,
            dataIndex:'Parent',
            ...Search('Parent'),
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
                        defaultChecked={record.IsActive}
                        // onClick={()=>handleIsActive(record)}
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
            width: 50,
            render:(record)=>{
                return (
                    <Space>
                     
                        <Tooltip title="Edit Master Photo Group">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                onClick={() => showModalEdit(record)}
                            >
                                <EditFilled  style={{color:"#1b72d5"}} />
                            </IconButton>
                        </Tooltip>
                        
                    </Space>
                )
            }
            
        },
    ]  


    
    useEffect(()=>{
        getMasterPhotoGroup()
        
    }
    ,[])



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



                    <Tooltip title="">
                        <IconButton size="small" color="primary" >
                            <PlusOutlined style={{color:"#1b72d5",fontSize:20}} onClick={showModalAdd}/>
                        </IconButton>
                    </Tooltip>

                </div><Table

                    size="small"
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataFromFetch}
                    rowKey={record => record.vehicleId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                   
                    bordered /></>
            }
            <Modal title="Edit Master Photo Group"
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
                 
                        // // 'taskScheduleId': props.taskScheduleId,
                        // // 'subconId': props.subconId,
                        // //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                        // // remember: true
                    }}
                    onFinish={handleEditForm}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    
                         
                    <Form.Item name="group" label="Group"
                        wrapperCol={{  span: 12 }}
                        rules={[{ required: true, message: 'Please Select Group!' }]}
                    >
                        <Select 
                            placeholder="Select Your Group"
                          
                            onChange={(e) => setSelectedCategoryGroupId(e)}
                        >
                            {
                                dataFromFetch.map(inv =>  <Select.Option  value={inv.CategoryGroupID}> 
                                    {inv.Group}</Select.Option>)
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
            <Modal title="Add Master Photo Group"
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
                    onFinish={handleSubmitAdd}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    
                    <Form.Item name="group" label="Group"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: true, message: 'Please Select Group!' }]}
                    >
                        <Input  onChange={(e) => setSelectedGroup(e.target.value)} placeholder="Please Input Your Group"/>           
                    </Form.Item>             
                    <Form.Item name="parent" label="Parent"
                        wrapperCol={{  span: 12 }}
                        rules={[{ required: true, message: 'Please Select Parent!' }]}
                    >
                        <Select 
                            placeholder="Select Parent"
                          
                            onChange={(e) => setSelectedParent(e)}
                        >
                            {
                                dataFromFetch.map(inv =>  <Select.Option  value={inv.CategoryGroupID}> 
                                    {inv.Parent}</Select.Option>)
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

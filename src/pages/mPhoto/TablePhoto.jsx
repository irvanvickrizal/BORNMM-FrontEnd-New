import React,{useEffect,useState} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button,Select} from "antd"
import API from '@app/utils/apiServices'
import {useSelector} from 'react-redux';
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {PlusOutlined,CheckOutlined,CloseOutlined,EditOutlined,DeleteOutlined}from '@ant-design/icons'
import {toast} from 'react-toastify';

export default function TablePhoto() {
    const [dataMasterPhoto,setDataMasterPhoto] = useState([])
    //const [dataTransportMode,setDataTransportMode] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)
    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [selectedVehicleName,setSelectedVehicleName] = useState("")
    const [selectedCategoryID,setSelectedCategoryID] = useState("")
    const [dataGroup,setDataGroup] = useState([])
    const user = useSelector((state) => state.auth.user);
    const [form] = Form.useForm();
    const getMasterPhoto = () =>{
        setIsLoading(true)
        API.getMasterPhoto().then(
            result=>{
                setDataMasterPhoto(result)
                setIsLoading(false)
                console.log('data master Vehicle',result)
                
            }
        )
    } 

    const getMasterPhotoGroup = () => {
        API.getMasterPhotoGroup().then(
            result=>{
                setDataGroup(result)
                console.log('data photogroup',result)
                    
            }
        )

    }

    const showModalAdd = () =>{
        setIsModalAddVisible(true)
        getMasterPhotoGroup()
    }

    const hideModalAdd = () =>{
        setIsModalAddVisible(false)
    }

    function refreshData(){
        getMasterPhoto();
    }

    const handleAddMasterPhoto = (data) => {
        const body = 
        {
            "CategoryID":0
            ,"CategoryName":data.categoryName
            ,"CategoryDesc":data.categoryDesc
            ,"CategoryNo":data.categoryNo
            ,"GroupID":data.categoryGroup
            ,"CategoryChecklist":data.categoryChecklist
            ,"LMBY":user.uid
        }
            
        console.log(body,"body");
        console.log(data,"data");
        API.insertupdateMasterPhoto(body).then(
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
        console.log("selecteddata",data)
        setIsModalEditVisible(true)
        getMasterPhotoGroup()
        setSelectedCategoryID(data.atp_category_id)
        form.setFieldsValue({
            categoryName: data.category_name,
            categoryDesc: data.category_desc,
            categoryNo: data.category_number,
            categoryChecklist: data.cat_checklist,
            categoryGroup:data.category_group_id
        })
    }

    const hideModalEdit = () => {
        setIsModalEditVisible(false)
      
    }

    const handleEditMasterPhoto = (data) => {
        const body = 
        {
            "CategoryID":selectedCategoryID
            ,"CategoryName":data.categoryName
            ,"CategoryDesc":data.categoryDesc
            ,"CategoryNo":data.categoryNo
            ,"GroupID":data.categoryGroup
            ,"CategoryChecklist":data.categoryChecklist
            ,"LMBY":user.uid
        }
        console.log(body,"body");
        console.log(data,"data");
        API.insertupdateMasterPhoto(body).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    refreshData()
                    setIsModalEditVisible(false)
                
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )              
    }

    const handleDelete = (catID) =>{
        if (window.confirm('Are you sure you want to process this action ?')) {

            API.deleteMasterPhoto(catID).then(
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
    }

    const columns = [
        {
            title : "No",
            width : 5,
            align:'center',
            render: (value, item, index) => 1 + index,
         
        },
        {
            title : "Label Name",
            width : 250,
            dataIndex:'category_name',
         
            ...Search('category_name'),
        },
      
    
        {
            title : "Group",
            width : 250,
            dataIndex:'CategoryGroupName',
            ...Search('CategoryGroupName'),
        },
      
    
        {
            title : "Label No",
            width : 250,
            dataIndex:'category_number',
         
            ...Search('category_number'),
        },
        {
            title : "Description",
            width : 250,
            dataIndex:'category_desc',
            ...Search('category_desc'),
        }, 
        {
            title : "Category",
            width : 250,
            dataIndex:'cat_checklist',
            ...Search('cat_checklist'),
        },
        {
            title : "Template in Used",
            width : 250,
            dataIndex:'templatelist',
            ...Search('templatelist'),
        },
        {
            title : "Modified Date",
            width : 250,
            dataIndex:'lmdt',
            ...Search('lmdt'),
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
                        <Tooltip title="Delete Data">
                            <IconButton
                                size='small'
                                color='error'
                                aria-label="upload file"
                                component="span" 
                                onClick={() => handleDelete(record.atp_category_id)}
                            >
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                    </Space>
                )
            }
            
        },
        
    
    ]


    useEffect(() => {
        refreshData()
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
                    <Tooltip title="Add Data">
                        <IconButton size="small" color="primary" onClick={showModalAdd}>
                            <PlusOutlined />
                        </IconButton>
                    </Tooltip>

                </div><Table

                    size="small"
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataMasterPhoto}
                    rowKey={record => record.vehicleId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>
            }
            <Modal title="Add New Photo Label"
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
                    onFinish={handleAddMasterPhoto}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Label Name"
                        name="categoryName"
                        rules={[{ required: true, message: 'Please input your Label Name!' }]}
                    >
                        <Input />
                    </Form.Item>               
                    <Form.Item
                        label="Label Desc"
                        name="categoryDesc"
                        rules={[{ required: true, message: 'Please input your label desc!' }]}
                    >
                        <Input />
                    </Form.Item>               
                    <Form.Item
                        label="Label No."
                        name="categoryNo"
                        rules={[{ required: true, message: 'Please input your label no!' }]}
                    >
                        <Input />
                    </Form.Item>               
                    
                    <Form.Item label="Category Checklist"
                        name="categoryChecklist"
                        rules={[{ required: true, message: 'Please Select Category Checkist!'}]}
                    >
                        <Select 
                            // onChange={(e) => handleDDLSubconChange(e)}
                            placeholder="Select an option"
                        >
                            {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                            <Select.Option value="RAN">RAN/MW</Select.Option>
                            <Select.Option value="PS">POWER</Select.Option>
                            
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category Group"
                        name="categoryGroup"
                        rules={[{ required: true, message: 'Please Select Category Group!'}]}
                    >
                        <Select 
                                
                            placeholder="Select an option"
                        >
                            {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                            {
                                dataGroup.map(inv =>  <Select.Option value={inv.CategoryGroupID}> 
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
            <Modal title="Edit data"
                visible={isModalEditVisible}
                destroyOnClose
                onCancel={hideModalEdit}
                centered
                maskClosable={false}
                closable
                footer={null}
            >
                <Form
                    form={form}
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
                    onFinish={handleEditMasterPhoto}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Label Name"
                        name="categoryName"
                        rules={[{ required: true, message: 'Please input your Label Name!' }]}
                    >
                        <Input />
                    </Form.Item>               
                    <Form.Item
                        label="Label Desc"
                        name="categoryDesc"
                        rules={[{ required: true, message: 'Please input your label desc!' }]}
                    >
                        <Input />
                    </Form.Item>               
                    <Form.Item
                        label="Label No."
                        name="categoryNo"
                        rules={[{ required: true, message: 'Please input your label no!' }]}
                    >
                        <Input />
                    </Form.Item>               
                    
                    <Form.Item label="Category Checklist"
                        name="categoryChecklist"
                        rules={[{ required: true, message: 'Please Select Category Checkist!'}]}
                    >
                        <Select 
                            // onChange={(e) => handleDDLSubconChange(e)}
                            placeholder="Select an option"
                        >
                            {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                            <Select.Option value="RAN">RAN/MW</Select.Option>
                            <Select.Option value="PS">POWER</Select.Option>
                            
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category Group"
                        name="categoryGroup"
                        rules={[{ required: true, message: 'Please Select Category Group!'}]}
                    >
                        <Select 
                                
                            placeholder="Select an option"
                        >
                            {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                            {
                                dataGroup.map(inv =>  <Select.Option value={inv.CategoryGroupID}> 
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
        </div>
    )
}

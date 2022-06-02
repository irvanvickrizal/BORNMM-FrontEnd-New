import React,{useEffect,useState} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button,Select} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {PlusOutlined,CheckOutlined,CloseOutlined,EditOutlined}from '@ant-design/icons'
import {toast} from 'react-toastify';

import {useSelector} from 'react-redux';

export default function TableMasterDistrict() {
    const [dataMasterDistrct,setDataMasterDistrict] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)
    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [districName,setDistrictName] = useState("")
    const [districtID,setDistrictID] = useState("")
    const [ddlRegion,setDDLRegion] = useState([])
    const [region,setRegion] = useState("")
    const [isActive,setIsActive] = useState(false)
    const user = useSelector((state) => state.auth.user);



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
    const getRegion = () =>{
        API.getRegion().then(
            result=>{
                setDDLRegion(result)
                console.log('data region',result)
                
            }
        )
    } 

    const postData = (data) => {
        const body = 
            {
                "districtName": data.districtName,
                "regionID":data.region,
                "lmby": user.uid  
            }
        console.log(body,"body");
        console.log(data,"data");
        API.PostMasterDistrict(body).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getDistrict()
                    setIsModalAddVisible(false)
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )              
    }
    const putData = (data) => {
        const body = 
        {
            "districtID": districtID,
            "districtName": data.districtName,
            "regionID":data.region,
            "lmby": user.uid
        }
        console.log(body,"body");
        console.log(data,"data");
        API.PutMasterDistrict(body).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getDistrict()
                    setIsModalEditVisible(false)
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )              
    }


    const showModalAdd = ()=>{
        setIsModalAddVisible(true)
        getRegion();
    }

    const hideModal = ()=>{
        setIsModalAddVisible(false)
    }
    
    const handlePost = (data)=>{
        setIsModalAddVisible(false)
        postData(data)
    }

    const showModalEdit = (data) => {
        getRegion()
        setIsModalEditVisible(true)
        console.log(data,"data pass")
        setIsModalAddVisible(false)
        setDistrictName(data.districtName)
        setDistrictID(data.districtID)
        setRegion(data.regionID)
        setIsActive(data.isActive)
    }
    
    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }

    
    const handleEdit = (data)=>{
        console.log(data,"data pass")
        putData(data)
    }

    const handleIsActive = (status,data) =>{
        console.log(status,data,"isActive")
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "districtID": data.districtID,
                "lmby": user.uid,
                "isActive" : status     
            }
            console.log("activa:",body);
            API.PutMasterDistrictStatus(body).then(
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
                        onClick={(e)=>handleIsActive(e,record)}
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
                        <Tooltip title="Edit District">
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
                        <Form.Item label="Region"
                            name="region"
                            rules={[{ required: true, message: 'Please Select Region!'}]}
                        >
                            <Select 
                            // onChange={(e) => handleDDLSubconChange(e)}
                                placeholder="Select an option"
                            >
                                {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                {
                                    ddlRegion.map(inv =>  <Select.Option value={inv.RegionID}> 
                                        {inv.RegionName}</Select.Option>)
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
                            "region":region
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
                        {/* <Form.Item
                            label="Region"
                            name="regionName"
                            rules={[{ required: true, message: 'Please input your Region!' }]}
                        >
                            <Input />
                        </Form.Item> */}
                        <Form.Item label="Region"
                            name="region"
                            rules={[{ required: true, message: 'Please Select Region!'}]}
                        >
                            <Select 
                            // onChange={(e) => handleDDLSubconChange(e)}
                                placeholder="Select an option"
                            >
                                {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                {
                                    ddlRegion.map(inv =>  <Select.Option value={inv.RegionID}> 
                                        {inv.RegionName}</Select.Option>)
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
                </>
            }
        </div>
    )
            
}

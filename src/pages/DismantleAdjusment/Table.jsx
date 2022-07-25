import React,{useState,useEffect} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button,Select,Typography} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {EditFilled, FileExcelOutlined }from '@ant-design/icons'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux'


export default function TableDismantleAdjusment() {
    const [dataFromFetch,setDataFromFetch] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [currentPIC,setCurrentPIC] = useState("")

    const uId = useSelector(state=>state.auth.user.uid)

    //? Fetch Data

    const getDataDismantleAdjusment = () =>{
        setIsLoading(true)
        API.getDismantleAdjusment(uId).then(
            result=>{
                setDataFromFetch(result)
              

                setIsLoading(false)
                console.log('data Dismantle Adjusment',result)
                
            }
        )
    }

    //? Modal Handle

    const showModalEdit = (data) => {
        setIsModalEditVisible(true)
        setCurrentPIC(data.pic)
        console.log(data,"ini")
    }
    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }

    //! Column Table

    const columns = [
        {
            title : "No",
            width : 50,
            align:'center',
            render: (value, item, index) => 1 + index,
         
        },
        {
            title : "Order Request No",
            width : 250,
            dataIndex:'orderRequestNo',
         
            ...Search('orderRequestNo'),
        },        
        {
            title : "Site No",
            width : 150,
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "CPO No",
            width : 250,
            dataIndex:'cpoNo',
            ...Search('cpoNo'),
        },
        {
            title : "Project Name",
            width : 250,
            dataIndex:'projectName',
            ...Search('projectName'),
        },
        {
            title : "Site Name",
            width : 200,
            dataIndex:'siteName',
            ...Search('siteName'),
        },
        {
            title : "Work Package ID",
            width : 150,
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
  
        {
            title : "Site Address",
            width : 250,
            dataIndex:'siteAddress',
            ...Search('siteAddress'),
        },
  
    
      
        
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed: 'right',
            width: 100,
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="Change PIC Aproval">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                             
                                onClick={() => showModalEdit(record)}
                            >
                                <SupervisorAccountIcon  style={{color:"#1b72d5"}} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Adjust Dismantle">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                // onClick={() => showModalEdit(record)}
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
        getDataDismantleAdjusment()
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



                    <Tooltip title="">
                        <IconButton size="small" color="primary" >
                            <FileExcelOutlined style={{color:"#009027",fontSize:20}}/>
                        </IconButton>
                    </Tooltip>

                </div><Table

                    size="small"
                    // expandable={{ expandedRowRender }}
                    scroll={{ x: '50%' }}
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
            <Modal title="Change Approval"
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
                        currentPIC:currentPIC
                        // // 'taskScheduleId': props.taskScheduleId,
                        // // 'subconId': props.subconId,
                        // //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                        // // remember: true
                    }}
                    // onFinish={handlePostDopOrderType}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    
                    <Form.Item name="currentPIC" label="Current PIC"
                        wrapperCol={{  span: 12 }}
                                   
                        rules={[{ required: false, message: 'Please Select DOP!' }]}
                    >
                        <Input 
                            value={currentPIC}
                            disabled
                            
                            // onChange={(e) => setSelectedDopName(e)}
                        />                  
                    </Form.Item>             
                    <Form.Item name="PIC" label="Change MS PIC"
                        wrapperCol={{  span: 12 }}
                        rules={[{ required: true, message: 'Please Select DOP!' }]}
                    >
                        <Select 
                            placeholder="Select Your PIC"
                          
                            // onChange={(e) => setSelectedDopName(e)}
                        >
                            {/* {
                                ddlDop.map(inv =>  <Select.Option  value={inv.dopId}> 
                                    {inv.dopName}</Select.Option>)
                            } */}
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

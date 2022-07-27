/* eslint-disable radix */
import React,{useState,useEffect} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button,Select,Typography} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {EditFilled,CloseOutlined,CheckOutlined,PlusOutlined }from '@ant-design/icons'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux'

const ddlCatCheklist = [
    {
        value:"RAN",
    },
    {
        value:"PS",
    },
    {
        value:"MW",
    }
]
const ddlAttachmentType = [
    {
        value:"DOC",
    },
    {
        value:"OL",
    },
   
]

export default function TableTest() {
    const [dataFromFetch,setDataFromFetch] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)
    const uId = useSelector(state=>state.auth.user.uid)

    //? data pass for body

    const [valueAttDocID,setValueAttDocID] = useState(0)
    const [valueAttachmentName,setValueAttachmentName] = useState("")
    const [valueSeqNo,setValueSeqNo] = useState("")
    const [valueCatChecklist,setValueCatChecklist] = useState("")
    const [valueAttachmentType,setValueAttachmentType] = useState("")
    const [valueOnlineForm,setValueOnlineForm] = useState("")

    const bodyForPost = {
        AttDocID:valueAttDocID,
        AttachmentName:valueAttachmentName,
        SeqNo:parseInt(valueSeqNo),
        CatChecklist:valueCatChecklist,
        AttachmentType:valueAttachmentType,
        OnlineForm:valueOnlineForm,
        LMBY:uId
    }
    
    //? Fetch Data

    const getMasterAttachmentDoc = () => {
        setIsLoading(true)
        API.getMasterAttachmentDoc().then(
            result=>{
                setDataFromFetch(result)
                  
    
                setIsLoading(false)
                console.log('data photogroup',result)
                    
            }
        )

    }

    //? handle Post

    const postMasterAttachmentDoc = () => {
        console.log(bodyForPost,"body")
        API.postUpdateMasterAttachmentDoc(bodyForPost).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getMasterAttachmentDoc()
                    setIsModalAddVisible(false)
                    setIsModalEditVisible(false)
                }
                else{
                    toast.error(result.message);
                    setIsModalAddVisible(false)
                    setIsModalEditVisible(false)
                }
            }
        )
    }


    //? Handle Change Status

   

    const handleIsActive =(data) => {
     
        console.log(data,"isActive")
        if (window.confirm('Are you sure you want to process this action ?')) {
            const bodyIsActive={
                AttDocID:data.AttDocID,
                IsActive:!data.IsActive,
                LMBY:uId
            }
            console.log("activa:",bodyIsActive);
            API.editMasterAttachmentDoc(bodyIsActive).then(
                result=>{
                    // console.log(": ", result);
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



    //? Modal Handle

    const showModalEdit = (data) => {
        setIsModalEditVisible(true)
        setValueAttachmentName(data.AttachmentName)
        setValueAttDocID(data.AttDocID)
        setValueAttachmentType(data.AttachmentType)
        setValueCatChecklist(data.CatChecklist)
        setValueOnlineForm(data.OnlineForm)
        setValueSeqNo(data.SeqNo)
    
      
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
            title : "Attachment Name",
            width : 200,
         
            render:(record)=>{
                return (
                    record.AttachmentName !== null ? (<Typography>{record.AttachmentName}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('field_name'),
        },
        {
            title : "Attachment Type",
            width : 150,
         
            render:(record)=>{
                return (
                    record.AttachmentType !== null ? (<Typography>{record.AttachmentType}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('AttachmentType'),
        },
        {
            title : "Cat Checklist",
            width : 150,
         
            render:(record)=>{
                return (
                    record.CatChecklist !== null ? (<Typography>{record.CatChecklist}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('CatChecklist'),
        },
        {
            title : "Online Form",
            width : 150,
         
            render:(record)=>{
                return (
                    record.OnlineForm !== null ? (<Typography>{record.OnlineForm}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('OnlineForm'),
        },
  
        {
            title : "Seq No",
            width : 100,
         
            render:(record)=>{
                return (
                    record.SeqNo !== null ? (<Typography>{record.SeqNo}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('SeqNo'),
        },
  
     
        {
            title : "Is Active",
            width: 50,
            align:'center',
            fixed: 'right',
            render:(record)=>{
                return (
                    <Switch
                        key={record.AttDocID}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.IsActive}
                        onClick={()=>handleIsActive(record)}
                      
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
        getMasterAttachmentDoc()
        
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

            {/* Modal Add */}
            <Modal title="Add Attachment Doc"
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
                    onFinish={postMasterAttachmentDoc}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                > 
                    <Form.Item name="attachmentName" label="Attachment Name"
                        wrapperCol={{  span: 14 }}         
                        rules={[{ required: true, message: 'Please Select Attachment Name!' }]}
                    >
                        <Input  onChange={(e) => setValueAttachmentName(e.target.value)} placeholder="Please Input Your Attachment Name"/>           
                    </Form.Item>             
                    <Form.Item name="catChecklist" label="CAT Checklist"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Select CAT Checklist!' }]}
                    >
                        <Select 
                            placeholder="Select CAT Checklist"
                          
                            onChange={(e) => setValueCatChecklist(e)}
                        >
                            {
                                ddlCatCheklist.map(inv =>  <Select.Option  value={inv.value}> 
                                    {inv.value}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>             
                    <Form.Item name="attachmentType" label="Attachment Type"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Select Attachment Type!' }]}
                    >
                        <Select 
                            placeholder="Select Attachment Type"
                          
                            onChange={(e) => setValueAttachmentType(e)}
                        >
                            {
                                ddlAttachmentType.map(inv =>  <Select.Option  value={inv.value}> 
                                    {inv.value}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>  
                    <Form.Item name="seqNo" label="Seq No"
                        wrapperCol={{  span: 14 }}         
                        rules={[{ required: true, message: 'Please Input Seq No!' }]}
                    >
                        <Input  onChange={(e) => setValueSeqNo(e.target.value)} placeholder="Input Your Seq No wit Number Format"/>           
                    </Form.Item>             
                    <Form.Item name="onlineForm" label="Online Form"
                        wrapperCol={{  span: 14 }}         
                        rules={[{ required: true, message: 'Please Input Online Form!' }]}
                    >
                        <Input  onChange={(e) => setValueOnlineForm(e.target.value)} placeholder="Please Input Your Online Form"/>           
                    </Form.Item>             
                    <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Add
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal> 

            {/* Modal Edit */}
            <Modal title="Edit Attachment Doc"
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
                        "attachmentName":valueAttachmentName,
                        "catChecklist":valueCatChecklist,
                        "attachmentType":valueAttachmentType,
                        "seqNo":valueSeqNo,
                        "onlineForm":valueOnlineForm
                    }}
                    onFinish={postMasterAttachmentDoc}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                > 
                    <Form.Item name="attachmentName" label="Attachment Name"
                        wrapperCol={{  span: 14 }}         
                        rules={[{ required: true, message: 'Please Select Attachment Name!' }]}
                    >
                        <Input  onChange={(e) => setValueAttachmentName(e.target.value)} placeholder="Please Input Your Attachment Name"/>           
                    </Form.Item>             
                    <Form.Item name="catChecklist" label="CAT Checklist"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Select CAT Checklist!' }]}
                    >
                        <Select 
                            placeholder="Select CAT Checklist"
                          
                            onChange={(e) => setValueCatChecklist(e)}
                        >
                            {
                                ddlCatCheklist.map(inv =>  <Select.Option  value={inv.value}> 
                                    {inv.value}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>             
                    <Form.Item name="attachmentType" label="Attachment Type"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Select Attachment Type!' }]}
                    >
                        <Select 
                            placeholder="Select Attachment Type"
                          
                            onChange={(e) => setValueAttachmentType(e)}
                        >
                            {
                                ddlAttachmentType.map(inv =>  <Select.Option  value={inv.value}> 
                                    {inv.value}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>  
                    <Form.Item name="seqNo" label="Seq No"
                        wrapperCol={{  span: 14 }}         
                        rules={[{ required: true, message: 'Please Input Seq No!' }]}
                    >
                        <Input  onChange={(e) => setValueSeqNo(e.target.value)} placeholder="Input Your Seq No wit Number Format"/>           
                    </Form.Item>             
                    <Form.Item name="onlineForm" label="Online Form"
                        wrapperCol={{  span: 14 }}         
                        rules={[{ required: true, message: 'Please Input Online Form!' }]}
                    >
                        <Input  onChange={(e) => setValueOnlineForm(e.target.value)} placeholder="Please Input Your Online Form"/>           
                    </Form.Item>             
                    <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Edit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal> 

           
        </div>
    )
}

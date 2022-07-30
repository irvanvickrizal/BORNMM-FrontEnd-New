/* eslint-disable react/jsx-no-useless-fragment */
import React,{useState,useEffect} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button,Select,Typography,Checkbox} from "antd"
import API from '@app/utils/apiServices'
import { useHistory } from 'react-router-dom'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {EditFilled,CloseOutlined,CheckOutlined,PlusOutlined,EyeFilled }from '@ant-design/icons'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import moment from 'moment'

// moc api

const data1 =[
    {
        "template_id": 3,
        "doc_title": "Installation Acceptance",
        "header_doc_title": "MPR / FPMR",
        "sac_id": null,
        "lmdt": "2022-02-27",
        "lmby": 3379,
        "is_active": false,
        "template_name": "Swap Upgrade / Redeploy",
        "is_publish": false,
        "alias_scope": "Swap Upgrade / Redeploy",
        "wf_id": 4,
        "is_offline": true,
        "form_type_id": null,
        "form_type_name": null,
        "PhotoCountGroup": 0,
        "SIRPhotoCount": 0,
        "ATPPhotoCount": 0,
        "SupportingDocCount": 0,
        "wf_name": "Dismantle Review Flow"
    },
    {
        "template_id": 2,
        "doc_title": "Installation, Commissioning, and Integration Acceptance",
        "header_doc_title": "Microwave",
        "sac_id": 1,
        "lmdt": null,
        "lmby": 3379,
        "is_active": false,
        "template_name": "Microwave",
        "is_publish": true,
        "alias_scope": "Microwave",
        "wf_id": 23,
        "is_offline": false,
        "form_type_id": null,
        "form_type_name": null,
        "PhotoCountGroup": 0,
        "SIRPhotoCount": 0,
        "ATPPhotoCount": 0,
        "SupportingDocCount": 0,
        "wf_name": null
    },
    {
        "template_id": 1,
        "doc_title": "Installation, Commissioning, and Integration Acceptance",
        "header_doc_title": "FLEXI MULTIRADIO",
        "sac_id": 1,
        "lmdt": null,
        "lmby": 3379,
        "is_active": true,
        "template_name": "ATP SIMO MIMO",
        "is_publish": true,
        "alias_scope": "ATP SIMO MIMO",
        "wf_id": 4,
        "is_offline": false,
        "form_type_id": null,
        "form_type_name": null,
        "PhotoCountGroup": 0,
        "SIRPhotoCount": 0,
        "ATPPhotoCount": 0,
        "SupportingDocCount": 0,
        "wf_name": "Dismantle Review Flow"
    }
]

export default function TableAtpTemplate() {
    const history = useHistory()
    const [dataFromFetch,setDataFromFetch] = useState([])
    const [ddlWorkflow,setDdlWorkflow] = useState([])
    const [ddlFormType,setDdlFormType] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)
    const uId = useSelector(state=>state.auth.user.uid)

   

    //? Fetch Data

    const getMasterAtpTemplate = () => {
        setIsLoading(true)
        API.getMasterAtpTemplate().then(
            result=>{
                setDataFromFetch(result)
                  
    
                setIsLoading(false)
                console.log('data atp template',result)
                    
            }
        )

    }
    const getDdlWorkflow = () => {

        API.getDdlWorkflow().then(
            result=>{
                setDdlWorkflow(result)
                console.log('ddl workflow',result)
                    
            }
        )
    }
    const getDdlFormType = () => {

        API.getDdlFormType().then(
            result=>{
                setDdlFormType(result)
                console.log('ddl workflow',result)
                    
            }
        )
    }

    //? Handle Add
    const [templateID,setTemplateID] = useState(0)
    const [formTypeId,setFormTypeId] = useState("")
    const [templateName,setTemplateName] = useState("")
    const [workflowId,setWorkFlowId] = useState("")
    const [headerTitle,setHeaderTitle] = useState("")
    const [docTitle,setDocTitle] = useState("")
   

    const body={
        "TemplateID":templateID
        ,"FormTypeId":formTypeId
        ,"TemplateName":templateName
        ,"WFID":workflowId
        ,"HeaderTitle":headerTitle
        ,"DocTitle":docTitle
        ,"LMBY":uId
    }

    const postMasterAttachmentDoc = () => {
        console.log(body,"body")
        API.postMasterAtpTemplate(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getMasterAtpTemplate()
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


    const showModalAdd = (data) => {
        setIsModalAddVisible(true)
        getDdlWorkflow()
        getDdlFormType()
      
        console.log(data,"ini")
    }
    const hideModalAdd = () => {
        setIsModalAddVisible(false)
    }

    const showModalEdit = (data) => {
        getDdlFormType()
        getDdlWorkflow()
        setIsModalEditVisible(true)
        setTemplateID(data.template_id)
        setFormTypeId(data.form_type_id)
        setTemplateName(data.template_name)
        setWorkFlowId(data.wf_id)
        setHeaderTitle(data.header_doc_title)
        setDocTitle(data.doc_title)
      
        console.log(data,"ini")
    }
    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }

 

    // Navigate to Manage photo

    const handleNavigateManagePhoto = (data) => {
        history.push(`masteratptemplatelist/manageatpphoto?templateId=${data.template_id}`)
    }

    const columns = [
        {
            title : "No",
            width : 50,
            align:'center',
            render: (value, item, index) => 1 + index,
         
        },
        {
            title : "Template Name",
            width : 200,
         
            render:(record)=>{
                return (
                    record.template_name !== null ? (<Typography>{record.template_name}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('template_name'),
        },
        {
            title : "Form Type Name",
            width : 150,
         
            render:(record)=>{
                return (
                    record.form_type_name !== null ? (<Typography>{record.form_type_name}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('form_type_name'),
        },
        {
            title : "Doc Title",
            width : 150,
         
            render:(record)=>{
                return (
                    record.doc_title !== null ? (<Typography>{record.doc_title}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('form_type_name'),
        },
        {
            title : "Header Doc Title",
            width : 150,
         
            render:(record)=>{
                return (
                    record.header_doc_title !== null ? (<Typography>{record.header_doc_title}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('form_type_name'),
        },
        {
            title : "Workflow",
            width : 150,
         
            render:(record)=>{
                return (
                    record.wf_name !== null ? (<Typography>{record.wf_name}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('CatChecklist'),
        },
        {
            title : "Required Photo Total",
            width : 120,
         
            render:(record)=>{
                return (
                    record.PhotoCountGroup !== null ? (<Typography>{record.PhotoCountGroup}</Typography>):(<Typography>-</Typography>)
                )
            },
        
        },
        {
            title : "ATP Photo Total",
            width : 90,
         
            render:(record)=>{
                return (
                    record.ATPPhotoCount !== null ? (<Typography>{record.ATPPhotoCount}</Typography>):(<Typography>-</Typography>)
                )
            },
            
        },
        {
            title : "SIR Photo Total",
            width : 90,
         
            render:(record)=>{
                return (
                    record.SIRPhotoCount !== null ? (<Typography>{record.SIRPhotoCount}</Typography>):(<Typography>-</Typography>)
                )
            },
         
        },
        {
            title : "Supporting Doc Req",
            width : 90,
         
            render:(record)=>{
                return (
                    record.SupportingDocCount !== null ? (<Typography>{record.SupportingDocCount}</Typography>):(<Typography>-</Typography>)
                )
            },
          
        },
        {
            title : "Has Published",
            width : 90,
         
            render:(record)=>{
                return (
                    <Checkbox defaultChecked={record.is_publish} disabled />
                )
            },
        },
        {
            title : "Has Offline",
            width : 90,
         
            render:(record)=>{
                return (
                    <Checkbox defaultChecked={record.is_offline} disabled />
                )
            },
        
        },
        {
            title : "Modify Date",
            width : 90,
         
            render:(record)=>{
                return (
                    record.lmdt === null ? (<Typography>-</Typography>):(<Typography>{moment(record.lmdt).format("YYYY-MM-DD")}</Typography>)
                    
                )
            },
            ...Search('SeqNo'),
        },
        {
            title : "Is Active",
            width: 70,
            align:'center',
            fixed: 'right',
            render:(record)=>{
                return (
                    <Switch
                        key={record.template_id}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.is_active}
                        // onClick={()=>handleIsActive(record)}
                      
                    />
                )
            },
  
        },
        
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed: 'right',
            width: 170,
            render:(record)=>{
                return (
                    <Space>
                     
                        <Tooltip title="Edit Template">
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
                       
                       
                        <Tooltip title="Publish Template">
                            {record.is_publish ? (
                                <>
                                    <Tooltip title="View ATP Photo">
                                        <IconButton
                                            size='small'
                                            color="primary"
                                            aria-label="upload file"
                                            component="span" 
                                            // onClick={() => showModalEdit(record)}
                                        >
                                            <InsertPhotoIcon  style={{color:"#1b72d5"}} />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            ):(<>
                                <Tooltip title="Publish">
                                    <IconButton
                                        size='small'
                                        color="primary"
                                        aria-label="upload file"
                                        component="span" 
                                    // onClick={() => showModalEdit(record)}
                                    >
                                        <EyeFilled  style={{color:"#1b72d5"}} />
                                    </IconButton>
                                </Tooltip>
                            
                                <Tooltip title="Manage ATP Photo">
                                    <IconButton
                                        size='small'
                                        color="primary"
                                        aria-label="upload file"
                                        component="span" 
                                        onClick={() => handleNavigateManagePhoto(record)}
                                    >
                                        <AddPhotoAlternateIcon  style={{color:"#1b72d5"}} />
                                    </IconButton>
                                </Tooltip>
                            </>)}
                          
                        </Tooltip>
                    </Space>
                )
            }
            
        },
    ]  

    useEffect(()=>{
        getMasterAtpTemplate()
       
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
                            <PlusOutlined style={{color:"#1b72d5",fontSize:20}} onClick={showModalAdd}/>
                        </IconButton>
                    </Tooltip>
                </div><Table
                    size="small"
                    // expandable={{ expandedRowRender }}
                    scroll={{ x: '100%' }}
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
            <Modal title="Add ATP Template"
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
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 17 }}
                    initialValues={{
                     
                    }}
                    onFinish={postMasterAttachmentDoc}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                > 
                    <Form.Item name="formType" label="Form Type"
                        wrapperCol={{  span: 14 }}
      
                    >
                        <Select 
                            placeholder="Select Form Type"
                            rules={[{ required: true, message: 'Please Select Form Type!' }]}
                            onChange={(e) => setFormTypeId(e)}
                        >
                            {
                                ddlFormType.map(inv =>  <Select.Option  value={inv.form_type_id}> 
                                    {inv.form_type_name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="templateName" label="Template Name"
                        wrapperCol={{  span: 14 }}         
                        rules={[{ required: true, message: 'Please Select Attachment Name!' }]}
                    >
                        <Input  
                            onChange={(e) => setTemplateName(e.target.value)} 
                            placeholder="Please Input Your Template Name"/>           
                    </Form.Item>                       
                    <Form.Item name="workflow" label="Workflow"
                        wrapperCol={{  span: 14 }}
      
                    >
                        <Select 
                            placeholder="Select WorkFlow"
                            rules={[{ required: true, message: 'Please Select Workflow!' }]}
                            onChange={(e) => setWorkFlowId(e)}
                        >
                            {
                                ddlWorkflow.map(inv =>  <Select.Option  value={inv.wf_id}> 
                                    {inv.wf_name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>  
                    <Form.Item name="headerTitle" label="Header title"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Input Header Title!' }]}
                    >
                        <Input  
                            onChange={(e) => setHeaderTitle(e.target.value)} 
                            placeholder="Please Input header title"/>  
                    </Form.Item> 
                    <Form.Item name="docTitle" label="DOC Title"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Input DOC Title!' }]}
                    >
                        <Input  
                            onChange={(e) => setDocTitle(e.target.value)} 
                            placeholder="Please Input doc title"/>  
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
            <Modal title="Edit ATP Template"
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
                    labelCol={{ span: 9 }}
                    wrapperCol={{ span: 17 }}
                    initialValues={{
                     
                    }}
                    fields={[
                        {
                            name: ["formType"],
                            value: formTypeId,
                        },
                        {
                            name: ["templateName"],
                            value: templateName,
                        },
                        {
                            name: ["workflow"],
                            value: workflowId,
                        },
                        {
                            name: ["headerTitle"],
                            value: headerTitle,
                        },
                        {
                            name: ["docTitle"],
                            value: docTitle,
                        },
                    ]}
                    onFinish={postMasterAttachmentDoc}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                > 
                    <Form.Item name="formType" label="Form Type"
                        wrapperCol={{  span: 14 }}
      
                    >
                        <Select 
                            placeholder="Select Form Type"
                            rules={[{ required: true, message: 'Please Select Form Type!' }]}
                            onChange={(e) => setFormTypeId(e)}
                        >
                            {
                                ddlFormType.map(inv =>  <Select.Option  value={inv.form_type_id}> 
                                    {inv.form_type_name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="templateName" label="Template Name"
                        wrapperCol={{  span: 14 }}         
                        rules={[{ required: true, message: 'Please Select Attachment Name!' }]}
                    >
                        <Input  
                            onChange={(e) => setTemplateName(e.target.value)} 
                            placeholder="Please Input Your Template Name"/>           
                    </Form.Item>                       
                    <Form.Item name="workflow" label="Workflow"
                        wrapperCol={{  span: 14 }}
      
                    >
                        <Select 
                            placeholder="Select WorkFlow"
                            rules={[{ required: true, message: 'Please Select Workflow!' }]}
                            onChange={(e) => setWorkFlowId(e)}
                        >
                            {
                                ddlWorkflow.map(inv =>  <Select.Option  value={inv.wf_id}> 
                                    {inv.wf_name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>  
                    <Form.Item name="headerTitle" label="Header title"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Input Header Title!' }]}
                    >
                        <Input  
                            onChange={(e) => setHeaderTitle(e.target.value)} 
                            placeholder="Please Input header title"/>  
                    </Form.Item> 
                    <Form.Item name="docTitle" label="DOC Title"
                        wrapperCol={{  span: 14 }}
                        rules={[{ required: true, message: 'Please Input DOC Title!' }]}
                    >
                        <Input  
                            onChange={(e) => setDocTitle(e.target.value)} 
                            placeholder="Please Input doc title"/>  
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

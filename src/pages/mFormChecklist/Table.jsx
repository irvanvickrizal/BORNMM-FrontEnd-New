/* eslint-disable radix */
import React,{useState,useEffect} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button,Select,Typography} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField}  from '@mui/material/';
import {EditFilled, FileExcelOutlined,CloseOutlined,CheckOutlined,PlusOutlined }from '@ant-design/icons'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TableRowsIcon from '@mui/icons-material/TableRows';
import ClearIcon from '@mui/icons-material/Clear';

import {toast} from 'react-toastify';
import { useSelector } from 'react-redux'

const ddlChecklistType = [
    {name:"autofill"},
    {name:'chk'},
    {name:'chklist'},
    {name:'date'},
    {name:'ddl'},
    {name:'dt'},
    {name:'inheret'},
]

const TableCollection = [
    {
        ChecklistCollectionID:2,
        CheklistID:1,
        Text:"test",
        Value:"TEST",

    }
]


export default function TableFormChecklist() {
    const [dataFromFetch,setDataFromFetch] = useState([])
    const [dataCollection,setDataCollection] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [isModalEditCollectionVisible,setIsModalEditCollectionVisible] = useState(false)
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)
    const [isModalCollectionVisible,setIsModalCollectionVisible] = useState(false)
    const uId = useSelector(state=>state.auth.user.uid)

    //? Data Pass Form

    const [cheklistName,setCheklistName] = useState("")
    const [tableRef,setTableRef] = useState("")
    const [fieldName,setFieldName] = useState("")
    const [fieldRef,setFieldRef] = useState("")
    const [defValue,setDefValue] = useState("")
    const [selectedCheklist,setSelectedCheklist] = useState(false)
    const [inherit,setInherit] = useState("0")
    const [formCheklistID,setFormCheklistID] = useState(0)

    const [text,setText] = useState("")
    const [values,setValues] = useState("")

    const bodyCollection = {
        FormChecklistID:formCheklistID,
        Text:text,
        Value:values,
        LMBY:uId
    }


    const body = {
        FormChecklistID:formCheklistID,
        ChecklistName:cheklistName,
        ChecklistType:selectedCheklist,
        TableRef:tableRef,
        FieldName:fieldName,
        FieldRef:fieldRef,
        DefValue:defValue,
        InheretChecklistID:parseInt(inherit)
    }

    //! Fetch data

    const getMFormCheklist = () =>{
        setIsLoading(true)
        API.getMasterFormCheklist().then(
            result=>{
                setDataFromFetch(result)
              

                setIsLoading(false)
                console.log('data form Cheklist',result)
                
            }
        )
    }
    const getMFormCheklistCollection = (data) =>{
        console.log('data form Cheklist collection',data.form_checklist_id)
        API.getMasterFormCheklistCollection(data.form_checklist_id).then(
            result=>{
                setDataCollection(result)
              

                setIsLoading(false)
                console.log('data form Cheklist collection',result)
                
            }
        )
    }

    // ddl radio button cheklist

    const showModalAdd = (data) => {
        setIsModalAddVisible(true)
      
        console.log(data,"ini")
    }
    const hideModalAdd = () => {
        setIsModalAddVisible(false)
    }

    const showModalCollection = (data) => {
        getMFormCheklistCollection(data)
        setIsModalCollectionVisible(true)
        setFormCheklistID(data.form_checklist_id)
      
        console.log(data,"ini")
    }
    const hideModalCollection = () => {
        setIsModalCollectionVisible(false)
      
    }

    const showModalEdit = (data) => {
      
        setIsModalEditVisible(true)
        setCheklistName(data.checklist_name)
        setTableRef(data.table_ref)
        setFieldName(data.field_name)
        setFieldRef(data.field_ref)
        setDefValue(data.def_value)
        setSelectedCheklist(data.checklist_type)
        setInherit(data.inheret_form_checklist_id)

        console.log(data,"ini")
    }
    const showModalEditCollection = (data) => {
      
        setIsModalEditCollectionVisible(true)
        setText(data.Text)
        setValues(data.Value)
        console.log(data,"ini")
    }
    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }
    const hideModalEditCollection = () => {
        setIsModalEditCollectionVisible(false)
    }

    //! handle Insert

    const postMasterFormCheklist = () => {
        API.postMasterFormCheklist(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getMFormCheklist()
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

    const postMasterFormCheklistCollection = () => {
        API.postMasterFormCheklist(bodyCollection).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getMFormCheklistCollection()
                    setIsModalCollectionVisible(false)
                    setIsModalCollectionVisible(false)
                    
                }
                else{
                    toast.error(result.message);
                    setIsModalAddVisible(false)
                    setIsModalEditVisible(false)
                }
            }
        )
    }

    const handleSubmitAdd = () => {
        console.log(body,"body request")
        postMasterFormCheklist()
    }


    //! handle Edit

    const handleSubmitEdit = () => {
        console.log(body,"body request")
        postMasterFormCheklist()
    }

    //? change stattus

    const handleIsActive =(data) => {
        console.log(data,"isActive")
        if (window.confirm('Are you sure you want to process this action ?')) {
            const bodyIsActive={
                FormChecklistID:data.form_checklist_id,
                IsActive:!data.is_active,
                LMBY:uId
            }
            console.log("activa:",body);
            API.editMasterFormCheklist(bodyIsActive).then(
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

    //! handle Delete
    const handleDeleteCollection =(data) => {
        if(window.confirm('Are you sure you want to Delete this Collection ?')){
            console.log(data.ChecklistCollectionID)
            API.deleteCollection(data.ChecklistCollectionID).then(
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
    

    const columns = [
        {
            title : "No",
            width : 50,
            align:'center',
            render: (value, item, index) => 1 + index,
         
        },
        {
            title : "Checklist Name",
            width : 250,
            // dataIndex:'checklist_name',
            render:(record)=>{
                return (
                    record.checklist_name !== null ? (<Typography>{record.checklist_name}</Typography>):(<Typography>-</Typography>)
                )
            },
         
            ...Search('checklist_name'),
        },        
        {
            title : "Prefix Name",
            width : 150,
         
            render:(record)=>{
                return (
                    record.prefix_name !== null ? (<Typography>{record.prefix_name}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('prefix_name'),
        },
        {
            title : "Checklist Type",
            width : 150,
          
            render:(record)=>{
                return (
                    record.checklist_type !== null ? (<Typography>{record.checklist_type}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('checklist_type'),
        },
        {
            title : "Table Ref",
            width : 200,
        
            render:(record)=>{
                return (
                    record.table_ref !== null ? (<Typography>{record.table_ref}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('table_ref'),
        },
        {
            title : "Field Name",
            width : 150,
         
            render:(record)=>{
                return (
                    record.field_name !== null ? (<Typography>{record.field_name}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('field_name'),
        },
  
        {
            title : "Field Ref",
            width : 250,
          
            render:(record)=>{
                return (
                    record.field_ref !== null ? (<Typography>{record.field_ref}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('field_ref'),
        },
        {
            title : "Def Value",
            width : 250,
           
            render:(record)=>{
                return (
                    record.def_value !== null ? (<Typography>{record.def_value}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('def_value'),
        },
        {
            title : "Field Ref",
            width : 250,
       
            render:(record)=>{
                return (
                    record.field_ref !== null ? (<Typography>{record.field_ref}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('field_ref'),
        },
        {
            title : "Inheret_ Form Checklist ID",
            width : 200,
       
            render:(record)=>{
                return (
                    record.inheret_form_checklist_id !== null ? (<Typography>{record.inheret_form_checklist_id}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('field_ref'),
        },
        {
            title : "isActive",
            width: 100,
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
            width: 100,
            render:(record)=>{
                return (
                    <Space>
                       
                        <Tooltip title="Edit">
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
                        {record.checklist_type === "ddl" || record.checklist_type === "chklist"? (
                            <Tooltip title="Add Collection">
                                <IconButton
                                    size='small'
                                    color="primary"
                                    aria-label="upload file"
                                    component="span" 
                                    onClick={() => showModalCollection(record)}
                                >
                                    <TableRowsIcon  style={record.cnt === null ? {color:"#eb1a1a"}:{color:"#1b72d5"}} />
                                </IconButton>
                            </Tooltip>
                        ):(null)}
                      
                        
                        
                    </Space>
                )
            }
            
        },
    ] 
    
    const columnTableCollection = [
        {
            title : "No",
            width : 10,
            align:'center',
            render: (value, item, index) => 1 + index,
         
        },
        {
            title : "Text",
            width : 250,
            // dataIndex:'checklist_name',
            render:(record)=>{
                return (
                    record.Text !== null ? (<Typography>{record.Text}</Typography>):(<Typography>-</Typography>)
                )
            },
         
            ...Search('text'),
        },        
        {
            title : "Value",
            width : 150,
         
            render:(record)=>{
                return (
                    record.Value !== null ? (<Typography>{record.Value}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('prefix_name'),
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
                       
                        <Tooltip title="Delete Collection">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                onClick={() => showModalEditCollection(record)}
                            >
                                <EditFilled  style={{color:"#1b72d5"}} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Collection">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                onClick={() => handleDeleteCollection(record)}
                            >
                                <ClearIcon  style={{color:"#eb1a1a",border:"1px solid #eb1a1a"}} />
                            </IconButton>
                        </Tooltip>
                        
                    </Space>
                )
            }
            
        },
    ]    

    useEffect(()=>{
        getMFormCheklist()
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



                    <Tooltip title="Add Master Form Cheklist">
                        <IconButton size="small" color="primary" >
                            <PlusOutlined style={{color:"#1b72d5",fontSize:20}} onClick={showModalAdd}/>
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
                   
                    bordered />

               

              
                    
                </>
            }

            {/* Modal Add */}
            <Modal title="Add Master Form Checklist"
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
                    
                    <Form.Item name="cheklistName" label="Checklist Name"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: true, message: 'Please Input Cheklist Name!' }]}
                    >
                        <Input  onChange={(e) => setCheklistName(e.target.value)} placeholder="Please Input Your Cheklist Name"/>           
                    </Form.Item>             
                    <Form.Item name="cheklistTyoe" label="Checklist Type"
                        wrapperCol={{  span: 12 }}
                        rules={[{ required: true, message: 'Please Select Checklist Type!' }]}
                    >
                        <Select 
                            placeholder="Select Cheklist Type"
                          
                            onChange={(e) => setSelectedCheklist(e)}
                        >
                            {
                                ddlChecklistType.map(inv =>  <Select.Option  value={inv.name}> 
                                    {inv.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="tableRef" label="Table Ref"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: false, message: 'Please Select Table Ref!' }]}
                    >
                        <Input  onChange={(e) => setTableRef(e.target.value)} placeholder="Please Input Your Table Ref"/>           
                    </Form.Item>               
                    <Form.Item name="fieldName" label="Field Name"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: false, message: 'Please Select Field Name!' }]}
                    >
                        <Input  onChange={(e) => setFieldName(e.target.value)} placeholder="Please Input Your Field Name"/>           
                    </Form.Item>               
                    <Form.Item name="field_ref" label="Field Ref"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: false, message: 'Please Select Field Ref!' }]}
                    >
                        <Input  onChange={(e) => setFieldRef(e.target.value)} placeholder="Please Input Your Field Ref"/>           
                    </Form.Item>               
                    <Form.Item name="def_value" label="Def Value"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: false, message: 'Please Select Def Value!' }]}
                    >
                        <Input  onChange={(e) => setDefValue(e.target.value)} placeholder="Please Input Your Def Value"/>           
                    </Form.Item>               
                    <Form.Item name="inheretFormChecklistId" label="Inheret Form Checklist ID"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: false, message: 'Please Input Inheret Form Checklist ID !' }]}
                    >
                        <Input  onChange={(e) => setInherit(e.target.value)} placeholder="Please Input Your Inheret Form Checklist ID"/>           
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

            {/* Modal Edit */}
            <Modal title="Edit Master Form Checklist"
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

                        "cheklistName":cheklistName,
                        "cheklistType":selectedCheklist,
                        "tableRef":tableRef,
                        "fieldName":fieldName,
                        "fieldRef":fieldRef,
                        "defValue":defValue,
                        "inheretFormChecklistId":inherit,
                    }}
                    onFinish={handleSubmitEdit}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    
                    <Form.Item name="cheklistName" label="Checklist Name"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: true, message: 'Please Input Checklist Name!' }]}
                    >
                        <Input  onChange={(e) => setCheklistName(e.target.value)} placeholder="Please Input Your Cheklist Name"/>           
                    </Form.Item>             
                    <Form.Item name="cheklistType" label="Cheklist Type"
                        wrapperCol={{  span: 12 }}
                        rules={[{ required: true, message: 'Please Select Checklist Type!' }]}
                    >
                        <Select 
                            placeholder="Select Checklist Type"
                          
                            onChange={(e) => setSelectedCheklist(e)}
                        >
                            {
                                ddlChecklistType.map(inv =>  <Select.Option  value={inv.name}> 
                                    {inv.name}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="tableRef" label="Table Ref"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: false, message: 'Please Select Table Ref!' }]}
                    >
                        <Input  onChange={(e) => setTableRef(e.target.value)} placeholder="Please Input Your Table Ref"/>           
                    </Form.Item>               
                    <Form.Item name="fieldName" label="Field Name"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: false, message: 'Please Select Field Name!' }]}
                    >
                        <Input  onChange={(e) => setFieldName(e.target.value)} placeholder="Please Input Your Field Name"/>           
                    </Form.Item>               
                    <Form.Item name="fieldRef" label="Field Ref"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: false, message: 'Please Select Field Ref!' }]}
                    >
                        <Input  onChange={(e) => setFieldRef(e.target.value)} placeholder="Please Input Your Field Ref"/>           
                    </Form.Item>               
                    <Form.Item name="defValue" label="Def Value"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: false, message: 'Please Select Def Value!' }]}
                    >
                        <Input  onChange={(e) => setDefValue(e.target.value)} placeholder="Please Input Your Def Value"/>           
                    </Form.Item>               
                    <Form.Item name="inheretFormChecklistId" label="Inheret Form Checklist ID"
                        wrapperCol={{  span: 12 }}         
                        rules={[{ required: false, message: 'Please Input Inheret Form Checklist ID !' }]}
                    >
                        <Input  onChange={(e) => setInherit(e.target.value)} placeholder="Please Input Your Inheret Form Checklist ID"/>           
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

            {/* Modal Collection */}
            <Modal title="Add Collection"
                visible={isModalCollectionVisible}
                destroyOnClose
                onCancel={hideModalCollection}
                centered
                maskClosable={false}
                closable
                footer={null}
               
            >
                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
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
                    onFinish={postMasterFormCheklistCollection}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    
                    <Form.Item name="text" label="Text"
                        wrapperCol={{  span: 16 }}         
                        rules={[{ required: true, message: 'Please Select Group!' }]}
                    >
                        <Input  onChange={(e) => setText(e.target.value)} placeholder="Please Input Your Text"/>           
                    </Form.Item>             
                    <Form.Item name="value" label="Value"
                        wrapperCol={{  span: 16 }}
                        rules={[{ required: true, message: 'Please Select Ch!' }]}
                    >
                        <Input  onChange={(e) => setValues(e.target.value)} placeholder="Please Input Your Value"/>           
                    </Form.Item>
                    <div style={{marginTop:46}}>
                        <Table

                            size="small"
                            // expandable={{ expandedRowRender }}

                            columns={columnTableCollection}
                            dataSource={TableCollection}
                            rowKey={record => record.vehicleId}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}

                            bordered />
                    </div>
                                
                                 
                    <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Confirm
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal> 
            <Modal title="Edit Collection"
                visible={isModalEditCollectionVisible}
                destroyOnClose
                onCancel={hideModalEditCollection}
                centered
                maskClosable={false}
                closable
                footer={null}
               
            >
                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 17 }}
                    initialValues={{
                        "text":text,
                        "value":values
                    }}
                    onFinish={postMasterFormCheklistCollection}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
                    
                    <Form.Item name="text" label="Text"
                        wrapperCol={{  span: 16 }}         
                        rules={[{ required: true, message: 'Please Select Group!' }]}
                    >
                        <Input  onChange={(e) => setText(e.target.value)} placeholder="Please Input Your Text"/>           
                    </Form.Item>             
                    <Form.Item name="value" label="Value"
                        wrapperCol={{  span: 16 }}
                        rules={[{ required: true, message: 'Please Select Ch!' }]}
                    >
                        <Input  onChange={(e) => setValues(e.target.value)} placeholder="Please Input Your Value"/>           
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

/* eslint-disable react/jsx-no-bind */
import React,{useEffect,useState} from 'react'
import API  from '../../utils/apiServices';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Search from '@app/components/searchcolumn/SearchColumn';
import {Switch ,Form,Modal,Table, Input, Button, Space,Select, Spin, Row, Col,Tooltip,Checkbox} from 'antd'
import {CheckOutlined,CloseOutlined,PlusOutlined, EditOutlined } from '@ant-design/icons'
import {IconButton}  from '@mui/material/';

import DGSMasterDop from './DataGenaerator';

export default function TableDop() {
    const [dataDop,setDataDop] = useState([])
    const [ddlOrderType,setDdlOrderType] = useState([])
    const [ddlSubcon,setDdlSubcon] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [isModalAddVisible,setIsModalAddVisible] = useState(false)

    const uId = useSelector(state=>state.auth.user.uid)

    
    const [dopId,setDopId] = useState("")
    const [dopName,setDopName] = useState("")
    const [dopCode,setDopCode] = useState("")
    const [dopType,setDopType] = useState("")
    const [dopDesc,setDopDesc] = useState("")
    const [dopDest,setDopDest] = useState("")
    const [dopAddress,setDopAddress] = useState("")
    const [isMainCWH,setIsMainCWH] = useState(false)
    const [isCWH,setIsCWH] = useState(false)
    const [isSite,setIsSite] = useState(false)
    const [selectedOrderType,setSelectedOrderType] = useState("")
    const [selectedSubcon,setSelectedSubcon] = useState("")
    




    function getDataDop(){
        setIsLoading(true)
        API.getmDOPList().then(
            result=>{
                console.log(result,"Res")
                
                const data = result.map((rs)=>DGSMasterDop.masterDop(
                    rs.dopId
                    ,rs.dopName
                    ,rs.dopDesc
                    ,rs.dopCode
                    ,rs.dopAddress
                    ,rs.dopType
                    ,rs.dopDestName
                    ,rs.cminfo.isActive
                    ,rs.isCWH
                    ,rs.isMainCWH
                    ,rs.isSite
                    ,rs.lspInfo.subconName
                    ,rs.orderType.orderTypeName
                    ,rs.orderType.orderTypeId,
                    rs.lspInfo.subconId
                  
                )) 
                setDataDop(data)
                setIsLoading(false)
                console.log(data,'<==dataDOP')
            }
              
            
        )
    } 
    function getDdlOrderType(){
      
        API.getmOrderType().then(
            result=>{
                setDdlOrderType(result)
                console.log(result,'<==ddlOd')
            }
              
            
        )
    } 
    function getDdlSubcon(){
    
        API.getmSubcon().then(
            result=>{
                console.log(result,"ddl Subcon")
         
                setDdlSubcon(result)
            }
              
            
        )
    } 

    const refreshData = () => {
        getDataDop()
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

    

    const showModalEdit = (data) => {
        setIsModalEditVisible(true)
        setDopId(data.dopId)
        setDopName(data.dopName)
        setDopCode(data.dopCode)
        setDopType(data.dopType)
        setDopDesc(data.dopDesc)
        setDopDest(data.dopDestName)
        setDopAddress(data.dopAddress)
        setIsMainCWH(data.isMainCWH)
        setIsCWH(data.isCWH)
        setIsSite(data.isSite)
        setSelectedSubcon(data.subconId)
        setSelectedOrderType(data.orderTypeId)
        
    }

    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }
    const showModalAdd = (data) => {
        setIsModalAddVisible(true)
    
    }

    const hideModalAdd = () => {
        setIsModalAddVisible(false)
    }


    
    function handleEdit(data){
      
        const body ={
            "dopId":dopId,
            "dopName": dopName,
            "dopCode": dopCode,
            "dopType": dopType,
            "dopDesc": dopDesc,
            "dopDestName": dopDest,
            "dopAddress": dopAddress,
            "isMainCWH": isMainCWH,
            "isCWH": isCWH,
            "isSite": isSite,
            "orderType": {
                "orderTypeId": selectedOrderType          
            },
            "lspInfo": {
                "subconId": selectedSubcon
            },
            "cminfo": {
                "lmby": uId       
            }
            
        }
        console.log(body,"body aduhai")
        API.putDOPData(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    refreshData()
                    setIsModalEditVisible(false)
                    
                }
                else{
                    toast.error(result.message);
                    setIsModalEditVisible(false)
                }
            }
        )
    }
    function handleAdd(data){
      
        const body ={
      
            "dopName": dopName,
            "dopCode": dopCode,
            "dopType": dopType,
            "dopDesc": dopDesc,
            "dopDestName": dopDest,
            "dopAddress": dopAddress,
            "isMainCWH": isMainCWH,
            "isCWH": isCWH,
            "isSite": isSite,
            "orderType": {
                "orderTypeId": selectedOrderType          
            },
            "lspInfo": {
                "subconId": selectedSubcon
            },
            "cminfo": {
                "lmby": uId       
            }
            
        }
        console.log(body,"body aduhai")
        API.postDOPData(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    refreshData()
                    setIsModalAddVisible(false)
                    
                }
                else{
                    toast.error(result.message);
                    setIsModalAddVisible(false)
                }
            }
        )
    }

    const column = [
        {
            title : "No",
            width : 30,
            render: (value, item, index) => 1 + index
        },
        {
            title : "DOP Name",
            width: 100,
            dataIndex:'dopName',
            ...Search('dopName'),
        },
    
        {
            title : "DOP Code",
            width: 100,
            dataIndex:'dopCode',
            ...Search('dopCode'),
        },
        {
            title : "DOP Type",
            width: 100,
            dataIndex:'dopType',
            ...Search('dopType'),
        },
        {
            title : "DOP Desc",
            width: 100,
            dataIndex:'dopDesc',
            ...Search('dopDesc'),
        },
        {
            title : "DOP Dest",
            width: 100,
            dataIndex:'dopDestName',
            ...Search('dopDestName'),
        },
        {
            title : "DOP Dest",
            width: 100,
            dataIndex:'dopDestName',
            ...Search('dopDestName'),
        },
        {
            title : "DOP Address",
            width: 100,
            dataIndex:'dopAddress',
            ...Search('dopAddress'),
        },
        {
            title : "DOP Address",
            width: 100,
            dataIndex:'dopAddress',
            ...Search('dopAddress'),
        },
        {
            title : "Order Type",
            width: 100,
            dataIndex:'orderTypeName',
            ...Search('orderTypeName'),
        },
        {
            title : "Subcon Name",
            width: 100,
            dataIndex:'subconName',
            ...Search('subconName'),
        },
        {
            title : "Is CWH",
            width: 70,
        
            render:(record)=>{
                return (
                    <Checkbox defaultChecked={record.isCWH} disabled />
                )
            }
        },
        {
            title : "Is Main CWH",
            width: 70,
        
            render:(record)=>{
                return (
                    <Checkbox defaultChecked={record.isMainCWH} disabled />
                )
            }
        },
        {
            title : "Is Site",
            width: 70,
        
            render:(record)=>{
                return (
                    <Checkbox defaultChecked={record.isSite} disabled />
                )
            }
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
                        defaultChecked={record.isActive}
                        onClick={()=>handleIsActive(record)}
                        // checked={record.isActive}
                    />
                )
            },
  
        },
        {
            title : "Options",
            width: 50,
            key:"orderMaterialId",
            align:'center',
            fixed: 'right',

            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="Edit Material">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                // onClick={() => handleEdit(record)}
                            >
                                <EditOutlined onClick={()=>showModalEdit(record)}/>
                            </IconButton>
                        </Tooltip>
                    </Space>
                )
  
            },}



    ]


    useEffect(() => {
        getDataDop()
        getDdlOrderType()
        getDdlSubcon()
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
                
                    <Tooltip title="Add New DOP">
                        <IconButton  color="primary" onClick={()=>showModalAdd()}>
                            <PlusOutlined style={{fontSize:24}} />
                        </IconButton>
                    </Tooltip>

                </div>
                <Table
                    scroll={{ x: '200%' }}
                    size="medium"
                    // expandable={{ expandedRowRender }}
                    columns={column}
                    dataSource={dataDop}
                    rowKey={record => record.dopId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>}

            <Modal title="Add New DOP"
                visible={isModalAddVisible}
                destroyOnClose
                onCancel={hideModalAdd}
                centered
                maskClosable={false}
                closable
                footer={null}
                style={{marginTop:72}}
           
            >
                <Form
                    name="basic"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
                  
              
                    onFinish={handleAdd}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                    // initialValues={{
                    //     'dopName': dopName,
                    //     'dopCode': dopCode,
                    //     "dopType":dopType,
                    //     'dopDesc':dopDesc,
                    //     'dopDest':dopDest,
                    //     'dopAddress':dopAddress,
                    //     'isMainCWH':isMainCWH,
                    //     'isCWH':isCWH,
                    //     'isSite':isSite,
                    //     'orderType':selectedOrderType,
                    //     'subcon':selectedSubcon


                       
                    // }}
                >
           
            
                    <Form.Item
                        label="DOP Name"
                        name="dopName"
                        rules={[{ required: true, message: 'Please input DOP Name Field!' }]}
                    >
                        <Input
                            onChange={(e) => setDopName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="DOP Code"
                        name="dopCode"
                        rules={[{ required: true, message: 'Please input DOP Code Field!' }]}
                    >
                        <Input 
                            onChange={(e) => setDopCode(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="DOP Type"
                        name="dopType"
                        rules={[{ required: true, message: 'Please input DOP Type Field!' }]}
                    >
                        <Input 
                            onChange={(e) => setDopType(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="DOP Desc"
                        name="dopDesc"
                        rules={[{ required: true, message: 'Please input DOP Desc Field!' }]}
                    >
                        <Input 
                            onChange={(e) => setDopDesc(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="DOP Adress"
                        name="dopAddress"
                        rules={[{ required: true, message: 'Please input DOP Adress Field!' }]}
                    >
                        <Input  onChange={(e) => setDopAddress(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="DOP Dest"
                        name="dopDest"
                        rules={[{ required: true, message: 'Please input DOP Dest' }]}
                    >
                        <Input 
                            onChange={(e) => setDopDest(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Order Type" name="orderType" 
                    
                        rules={[{ required: true, message: 'Please Select Order Type!' }]}
                    >
                        <Select
                            onChange={(e) => setSelectedOrderType(e)}
                            placeholder="Select an option"
                        >
                            {ddlOrderType?.map((inv) => (
                                <Select.Option value={inv.orderTypeId}>
                                    {inv.orderTypeName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Subcon" name="subcon" 
                        rules={[{ required: true, message: 'Please Subcon!' }]}
                    >
                        <Select
                            onChange={(e) => setSelectedSubcon(e)}
                            placeholder="Select an option"
                        >
                            {ddlSubcon?.map((inv) => (
                                <Select.Option value={inv.subconId}>
                                    {inv.subconName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                  
                    <Form.Item
                        label="Is Main CWH"
                        name="isMainCWH"
                       
                    >
                        <Checkbox defaultChecked={isMainCWH} onChange={(e) => setIsMainCWH(!isMainCWH)}/>
                    </Form.Item>
                    <Form.Item
                        label="Is CWH"
                        name="isCWH"
                     
                    >
                        <Checkbox defaultChecked={isCWH}  onChange={(e) => setIsCWH(!isCWH)}/>
                    </Form.Item>
                    <Form.Item
                        label="Is Site"
                        name="isSite"
                      
                    >
                        <Checkbox defaultChecked={isSite}  onChange={(e) => setIsSite(!isSite)}/>
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

            <Modal title="Edit DOP"
                visible={isModalEditVisible}
                destroyOnClose
                onCancel={hideModalEdit}
                centered
                maskClosable={false}
                closable
                footer={null}
                style={{marginTop:72}}
           
            >
                <Form
                    name="basic"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
                  
              
                    onFinish={handleEdit}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                    initialValues={{
                        'dopName': dopName,
                        'dopCode': dopCode,
                        "dopType":dopType,
                        'dopDesc':dopDesc,
                        'dopDest':dopDest,
                        'dopAddress':dopAddress,
                        'isMainCWH':isMainCWH,
                        'isCWH':isCWH,
                        'isSite':isSite,
                        'orderType':selectedOrderType,
                        'subcon':selectedSubcon


                       
                    }}
                >
           
            
                    <Form.Item
                        label="DOP Name"
                        name="dopName"
                        rules={[{ required: true, message: 'Please input DOP Name Field!' }]}
                    >
                        <Input
                            onChange={(e) => setDopName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="DOP Code"
                        name="dopCode"
                        rules={[{ required: true, message: 'Please input DOP Code Field!' }]}
                    >
                        <Input 
                            onChange={(e) => setDopCode(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="DOP Type"
                        name="dopType"
                        rules={[{ required: true, message: 'Please input DOP Type Field!' }]}
                    >
                        <Input 
                            onChange={(e) => setDopType(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="DOP Desc"
                        name="dopDesc"
                        rules={[{ required: true, message: 'Please input DOP Desc Field!' }]}
                    >
                        <Input 
                            onChange={(e) => setDopDesc(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="DOP Adress"
                        name="dopAddress"
                        rules={[{ required: true, message: 'Please input DOP Adress Field!' }]}
                    >
                        <Input  onChange={(e) => setDopAddress(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="DOP Dest"
                        name="dopDest"
                        rules={[{ required: true, message: 'Please input DOP Dest Field!' }]}
                    >
                        <Input 
                            onChange={(e) => setDopDest(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Order Type" name="orderType" 
                    
                        rules={[{ required: true, message: 'Please Select Order Type!' }]}
                    >
                        <Select
                            onChange={(e) => setSelectedOrderType(e)}
                            placeholder="Select an option"
                        >
                            {ddlOrderType?.map((inv) => (
                                <Select.Option value={inv.orderTypeId}>
                                    {inv.orderTypeName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Subcon" name="subcon" 
                        rules={[{ required: true, message: 'Please Select Subcon!' }]}
                    >
                        <Select
                            onChange={(e) => setSelectedSubcon(e)}
                            placeholder="Select an option"
                        >
                            {ddlSubcon?.map((inv) => (
                                <Select.Option value={inv.subconId}>
                                    {inv.subconName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                  
                    <Form.Item
                        label="Is Main CWH"
                        name="isMainCWH"
                        rules={[{ required: true, message: 'Please input Order Type QString Field!' }]}
                    >
                        <Checkbox defaultChecked={isMainCWH} onChange={(e) => setIsMainCWH(!isMainCWH)}/>
                    </Form.Item>
                    <Form.Item
                        label="Is CWH"
                        name="isCWH"
                        rules={[{ required: true, message: 'Please input Order Type QString Field!' }]}
                    >
                        <Checkbox defaultChecked={isCWH}  onChange={(e) => setIsCWH(!isCWH)}/>
                    </Form.Item>
                    <Form.Item
                        label="Is Site"
                        name="isSite"
                        rules={[{ required: true, message: 'Please input Order Type QString Field!' }]}
                    >
                        <Checkbox defaultChecked={isSite}  onChange={(e) => setIsSite(!isSite)}/>
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

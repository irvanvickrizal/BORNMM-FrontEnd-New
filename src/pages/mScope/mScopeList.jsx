/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
import React, {useState,useEffect} from 'react';
import API  from '../../utils/apiServices';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Search from '@app/components/searchcolumn/SearchColumn';
import {Switch ,Form,Modal,Table, Input, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {CheckOutlined,CloseOutlined,PlusOutlined, EditOutlined } from '@ant-design/icons'
import {IconButton}  from '@mui/material/';



const mScopeList = () => {

    const [isLoading, setIsLoading] = useState(false);

    
    const [scopeName,setScopeName] = useState("");
    const [scopeDesc,setScopeDesc] = useState("");


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [scopeData,setScopeData] = useState([]);
    const [idScope,setIdScope] = useState("");

    const user = useSelector((state) => state.auth.user);


    function getScope(){
        setIsLoading(true)
        API.getmScope().then(
            result=>{
                setScopeData(result);
                setIsLoading(false)
            }
        )
    } 

    const handleIsActive = (status,data) =>{
        console.log(data,"data pass")
        console.log(status,data,"isActive")
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "id" : data.scopeId,
                "actStatus" : status,
                "lmby" : user.uid
            }
            console.log("activa:",body);
            API.putmScopeActivation(body).then(
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

    const showModal = () => {
        setIsModalVisible(true)
    }
    const hideModal = () => {
        setIsModalVisible(false)
    }

    const showModalEdit = (data) => {
        setIsModalEditVisible(true)
        setScopeName(data.scopeName)
        setScopeDesc(data.scopeDesc) 
        setIdScope(data.scopeId)


    }
    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }

    const handleEditAddForm = (data) => {
        const body = 
            {
                "scopeId":idScope,
                "scopeName":data.scopeName,
                "scopeDesc":data.scopeDesc,
                "CMINFO":{
                    "LMBY":user.uid
                }
            }
        
        console.log(body,"body");
        console.log(data,"data");
        API.putmScope(body).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getScope()
           
                    setIsModalEditVisible(false)
              
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )              
    }

    const handleOkAddForm = (data) => {
        const body = 
            {
                "scopeName":data.scopeName,
                "scopeDesc":data.scopeDesc,
                "CMINFO":{
                    "LMBY":user.uid
                }
            }
        
        console.log(body,"body");
        console.log(data,"data");
        API.postmScope(body).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getScope()
                    getScope()
                    setIsModalVisible(false)
              
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )              
    }

    const column = [
        {
            title : "No",
            width : 10,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Scope Name",
            width: 100,
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
    
        {
            title : "Desc",
            width: 100,
            dataIndex:'scopeDesc',
            ...Search('scopeDesc'),
        },
        {
            title : "isActive",
            width: 30,
            align:'center',
            fixed: 'right',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.cminfo.isActive}
                        onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
  
        },
        {
            title : "Options",
            width: 30,
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
        getScope()
    
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
                
                    <Tooltip title="Add New Scope">
                        <IconButton  color="primary" onClick={()=>showModal()}>
                            <PlusOutlined style={{fontSize:24}} />
                        </IconButton>
                    </Tooltip>

                </div><Table
                    scroll={{ x: '100%' }}
                    size="medium"
                    // expandable={{ expandedRowRender }}
                    columns={column}
                    dataSource={[...scopeData]}
                    rowKey={record => record.materialId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>}

            {/* Modal add */}
            <Modal title="Add New Scope"
                visible={isModalVisible}
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
             
                    }}
                    onFinish={handleOkAddForm}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
           
            
                    <Form.Item
                        label="Scope Name"
                        name="scopeName"
                        rules={[{ required: true, message: 'Please input Scope Name Field!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Scope Desc"
                        name="scopeDesc"
                        rules={[{ required: true, message: 'Please input Scope Desc Field!' }]}
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

            {/* Modal Edit */}
            <Modal title="Edit New Scope"
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
              
                    onFinish={handleEditAddForm}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                    initialValues={{
                        'scopeName': scopeName,
                        'scopeDesc': scopeDesc,
                       
                    }}
                >
           
            
                    <Form.Item
                        label="Scope Name"
                        name="scopeName"
                        rules={[{ required: true, message: 'Please input Scope Name Field!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Scope Desc"
                        name="scopeDesc"
                        rules={[{ required: true, message: 'Please input Scope Desc Field!' }]}
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
    
    );
};

export default mScopeList;
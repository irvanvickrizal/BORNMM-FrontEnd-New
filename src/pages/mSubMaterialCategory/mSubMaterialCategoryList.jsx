/* eslint-disable react/jsx-boolean-value */
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
import {Switch ,Form,Modal,Select,Table, Input, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {CheckOutlined,CloseOutlined,PlusOutlined, EditOutlined } from '@ant-design/icons'
import {IconButton}  from '@mui/material/';



const SubMateialCategoryTable = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [ddlCategory,setDdlCategory] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState("");
    const [selectedSubcategoryId,setSelectedSubcategoryId] = useState("");
    const [selectedSubcategoryName,setSelectedSubcategoryName] = useState("");
    const [selectedSubcategoryCode,setSelectedSubcategoryCode] = useState("");
    const [selectedQtyRequired,setSelectedQtyRequired] = useState("");
    const [selectedSNRequired,setSelectedSNRequired] = useState("");
    const [selectedFieldConfirm,setSelectedFieldConfirm] = useState("");

    const [scopeName,setScopeName] = useState("");
    const [scopeDesc,setScopeDesc] = useState("");


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [scopeData,setScopeData] = useState([]);
    const [idScope,setIdScope] = useState("");
    
    const [subCategoryData,setsubCategoryData] = useState([]);

    const user = useSelector((state) => state.auth.user);



    function getSubCategory(){
        API.getSubMaterialCategory().then(
            result=>{
                console.log('i am sub category',result)
                setsubCategoryData(result);
            }
        )
    } 

    function getDDLCategory(){
        API.getMaterialCategory().then(
            result=>{
                const filtered = result.filter( (auto) => auto.isActive==true)
                console.log('i am DDL cate',filtered);
                //const activeCategory = result.categoryName.includes("true");
                setDdlCategory(filtered);
            }
        )
    }

    function refreshData(){
        getSubCategory();
        getDDLCategory();
        //getOrderType();
        //getSubcon();
    }

    function saveClick(data){
        const body ={
            "subCategoryId" : data.subCategoryId,
            "subCategoryName" : data.subCategoryName,
            "CategoryDetail":{
                "categoryId": data.selectedCategory
            },  
            "fieldConfirm":data.fieldConfirm,
            "snRequired":data.snRequired,
            "qtyRequired":data.qtyRequired,
            "subCategoryCode" : data.subCategoryCode,
            "lmby": user.uid   
        }

        console.log("saveclick",body);
        // API.putSubMaterialCategory(body).then(
        //     result=>{
        //         console.log(result);
        //         if(result.status=="success")
        //         {
        //             toast.success(result.message);
        //             refreshData();
        //         }
        //         else{
        //             toast.error(result.message);
        //         }
        //     }
        // )

    }

    function handleIsActiveClick(subCategoryId, e ){
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "Id":subCategoryId,
                "actstatus":e.target.checked,
                "lmby":0  
            }
            console.log(body);
            API.putSubCategoryStatus(body).then(
                result=>{
                    console.log("put scope: ", result);
                    if(result.status=="success")
                    {
                        toast.success(result.message);
                        refreshData();
                        //window.location.reload();
                    }
                    else{
                        toast.error(result.message);
                    }
                }
            )
        }
    }

    const handleIsActive = (status,data) =>{
        console.log(data,"data pass")
        console.log(status,data,"isActive")
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "Id":data.subCategoryId,
                "actstatus":status,
                "lmby":0  
            }
            console.log(body);
            API.putSubCategoryStatus(body).then(
                result=>{
                    console.log("put scope: ", result);
                    if(result.status=="success")
                    {
                        toast.success(result.message);
                        refreshData();
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
        setSelectedSubcategoryId(data.subCategoryId)
        setSelectedSubcategoryName(data.subCategoryName)
        setSelectedSubcategoryCode(data.subCategoryCode)
        setSelectedCategory(data.categoryId)
        setSelectedQtyRequired(data.qtyRequired)
        setSelectedSNRequired(data.snRequired)
        setSelectedFieldConfirm(data.fieldConfirm)

        console.log(data,"dataedit")

    }
    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }

    const handleEditAddForm = (data) => {
        console.log(data,"datasaveedit")   
        const body ={
            "subCategoryId" : selectedSubcategoryId,
            "subCategoryName" : data.subCategoryName,
            "CategoryDetail":{
                "categoryId": data.category
            },  
            "fieldConfirm":data.fieldConfirm,
            "snRequired":data.snRequired,
            "qtyRequired":data.qtyRequired,
            "subCategoryCode" : data.subCategoryCode,
            "lmby": user.uid    
        }

        console.log("saveclick",body);
        API.putSubMaterialCategory(body).then(
            result=>{
                console.log(result);
                if(result.status=="success")
                {
                    toast.success(result.message);
                    showModalEdit(false)
                    refreshData();
                }
                else{
                    toast.error(result.message);
                }
            }
        ) 
    }

    const handleOkAddForm = (data) => {
        const body = (
            {
                "subCategoryId" : 0,
                "subCategoryName" : data.subCategoryName,
                "CategoryDetail":{
                    "categoryId": data.category
                },        
                "fieldConfirm":data.fieldConfirm,
                "snRequired":data.snRequired,
                "qtyRequired":data.qtyRequired,
                "subCategoryCode" : data.subCategoryCode,
                "lmby": user.uid   
            }
        )
        console.log(body,"body")
        console.log(data,"data")
        API.postSubMaterialCategory(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    refreshData()
                    setIsModalVisible(false)
                    //window.location.reload();
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
            width : 30,
            render: (value, item, index) => 1 + index
        },
        {
            title : "SubCategory Name",
            width: 100,
            dataIndex:'subCategoryName',
            ...Search('subCategoryName'),
        },
        {
            title : "SubCategory Code",
            width: 100,
            dataIndex:'subCategoryCode',
            ...Search('subCategoryCode'),
        },
        {
            title : "Is Field Confirm",
            width: 50,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.fieldConfirm}
                        disabled={true}
                        //onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
  
        },
        {
            title : "Is SN Required",
            width: 50,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.snRequired}
                        disabled={true}
                        //onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
  
        },
        {
            title : "Is QTY Required",
            width: 50,
            align:'center',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.qtyRequired}
                        disabled={true}
                        //onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
  
        },
        {
            title : "Category Name",
            width: 100,
            align:'center',
            render:(record)=>{
                return (
                    <p>{record.categoryDetail.categoryName}</p>
                )
            },
  
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
                        onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
  
        },
        {
            title : "Options",
            width: 40,
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
                
                    <Tooltip title="Add New SubCategory">
                        <IconButton  color="primary" onClick={()=>showModal()}>
                            <PlusOutlined style={{fontSize:24}} />
                        </IconButton>
                    </Tooltip>

                </div><Table
                    scroll={{ x: '150%' }}
                    size="medium"
                    // expandable={{ expandedRowRender }}
                    columns={column}
                    dataSource={[...subCategoryData]}
                    rowKey={record => record.subCategoryId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>}

            {/* Modal add */}
            <Modal title="Add New Sub Category"
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
                        "qtyRequired":false,
                        "snRequired":false,
                        "fieldConfirm":false,

                    }}
                    onFinish={handleOkAddForm}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                >
           
            
                    <Form.Item
                        label="Sub Category Name"
                        name="subCategoryName"
                        rules={[{ required: true, message: 'Please input Scope Name Field!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Sub Category Code"
                        name="subCategoryCode"
                        rules={[{ required: true, message: 'Please input Scope Name Field!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please Select Item Level!'}]}
                    >
                        <Select 
                            // onChange={(e) => handleDDLSubconChange(e)}
                            placeholder="Select an option"
                        >
                            {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                            {
                                ddlCategory.map(inv =>  <Select.Option value={inv.categoryId}> 
                                    {inv.categoryName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Is Field Confirm"
                        name="fieldConfirm"
                            
                    >
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={false}
                            // checked={record.isActive}
                        />
                    </Form.Item>
                    <Form.Item label="SN Required"
                        name="snRequired"
                            
                    >
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            
                            // checked={record.isActive}
                        />
                    </Form.Item>
                    <Form.Item label="QTY Required"
                        name="qtyRequired"
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

            {/* Modal Edit */}
            <Modal title="Edit Sub Category"
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
                        "subCategoryName":selectedSubcategoryName,
                        "subCategoryCode":selectedSubcategoryCode,
                        "category":selectedCategory,
                        "qtyRequired":selectedQtyRequired,
                        "snRequired":selectedSNRequired,
                        "fieldConfirm":selectedFieldConfirm,
                       
                    }}
                >
                    
                    <Form.Item
                        label="Sub Category Name"
                        name="subCategoryName"
                        rules={[{ required: true, message: 'Please input Scope Name Field!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Sub Category Code"
                        name="subCategoryCode"
                        rules={[{ required: true, message: 'Please input Scope Name Field!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please Select Item Level!'}]}
                    >
                        <Select 
                            // onChange={(e) => handleDDLSubconChange(e)}
                            placeholder="Select an option"
                        >
                            {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                            {
                                ddlCategory.map(inv =>  <Select.Option value={inv.categoryId}> 
                                    {inv.categoryName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Is Field Confirm"
                        name="fieldConfirm"
                            
                    >
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={selectedFieldConfirm}
                            // checked={record.isActive}
                        />
                    </Form.Item>
                    <Form.Item label="SN Required"
                        name="snRequired"
                            
                    >
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={selectedSNRequired}
                            // checked={record.isActive}
                        />
                    </Form.Item>
                    <Form.Item label="QTY Required"
                        name="qtyRequired"
                    >
                        <Switch
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            defaultChecked={selectedQtyRequired}
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
        </div>
    
    );
};

export default SubMateialCategoryTable;
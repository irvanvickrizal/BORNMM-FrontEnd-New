/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
// import { useDispatch,useSelector } from 'react-redux'
//import {Select,Form,Modal,Table,Tabs, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {IconButton, TextField}  from '@mui/material/';
import API  from '../../utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import { useDispatch,useSelector } from 'react-redux'
// import exportFromJSON from 'export-from-json'
import {Checkbox,Switch ,Tabs,Tag,Typography,Popconfirm,Select,Upload,message,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {CheckOutlined ,CloseOutlined,PlusOutlined, FileExcelOutlined,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined,DeleteTwoTone,UploadOutlined } from '@ant-design/icons'
import {toast} from 'react-toastify';
import DGMasterMaterial from './DataGenerator';
import DGMasterMaterialDownload from '@app/pages/mMaterial/DataGeneratorDownload';

import exportFromJSON from 'export-from-json'
import { useHistory } from 'react-router-dom';

const TableMaterial = () => {
    const history = useHistory()
    const { Text } = Typography;
    // const { TabPane } = Tabs;
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);
    // const [inventoryReport,setInventoryReport] = useState([]);
    // const [inventoryReportDetail,setInventoryReportDetail] = useState([]);

    const [ddlUoM,setDdlUoM] = useState([]);
    const [ddlItemLevel,setDdlItemLevel] = useState([]);
    const [ddlCategory,setDdlCategory] = useState([]);
    const [ddlSubCategory,setDdlSubCategory] = useState([]);
    const [selectedUoM, setSelectedUoM] = useState("");
    const [fileDate, setFileDate] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedCategory, setselectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedBOQRef, setSelectedBOQRef] = useState(false);
    const [selectedIsReusable, setSelectedIsReusable] = useState(false);
    const [selectedIsCustomerMaterial, setSelectedIsCustomerMaterial] = useState(false);

    const [materialCode, setMaterialCode] = useState("");
    const [download,setDownload] = useState([])
    const [materialName, setMaterialName] = useState("");
    const [materialId, setMaterialId] = useState("");
    const [customerCode, setCustomerCode] = useState("");

    // const [isActive,setIsActive] = useState("");

    // const [show, setShow] = useState(false);
    const [materialData,setMaterialData] = useState([]);
    // const [isActiveRow,setIsActiveRow] = useState(false);
    const [isNew,setIsNew] = useState(false);
    const [isEdit,setIsEdit] = useState(false);

    const [fileUpload, setFileUpload] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [dataUpload, setDataUpload] = useState([]);
    const [dataDownload, setDataDownload] = useState("");
    const [flagUpload, setFlagUpload] = useState(false);
    const [isModalUploadVisible,setIsModalUploadVisible] = useState(false)

    const boqId = 2
    const uId = useSelector(state=>state.auth.user.uid)
    
    
    // const dispatch = useDispatch();

    const getMaterial = () =>{
        setIsLoading(true)
        API.getmMaterialList().then(
            result=>{
                const data = result.map((rs)=>DGMasterMaterial.MasterMaterial(
                    rs.materialId
                    ,rs.materialCode
                    ,rs.materialName
                    ,rs.unitOfMeasurement
                    ,rs.itemLevelDetail.itemLevelName
                    ,rs.itemLevelDetail.itemLevelId
                    ,rs.subCategoryDetail.subCategoryName
                    ,rs.subCategoryDetail.subCategoryId
                    ,rs.subCategoryDetail.categoryDetail.categoryName
                    ,rs.isActive
                    ,rs.boqRefCheck
                    ,rs.isCustomerMaterial
                    ,rs.isReusable
                    ,rs.customerCode
                )) 

                setIsLoading(false)
                console.log('i am result',result)
                console.log('i am data',data)
                setMaterialData(data);
            }
        )
    } 

    const getDownloadDataDetail = () =>{
        API.downloadMMaterial().then(
            result=>{
                console.log(result,"ini resul")
                const data = result

              
                
                //const data = result//result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName =`BORN_MasterMaterial_${moment().format("DD-MM-YYYY")}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }

    const downloadMaterial = () =>{
        API.downloadMMaterial().then(
            result=>{
                const data = result.map((rs)=>DGMasterMaterial.MasterMaterial(
                    rs.materialId
                    ,rs.materialCode
                    ,rs.materialName
                    ,rs.unitOfMeasurement
                    ,rs.itemLevelDetail.itemLevelName
                    ,rs.itemLevelDetail.itemLevelId
                    ,rs.subCategoryDetail.subCategoryName
                    ,rs.subCategoryDetail.subCategoryId
                    ,rs.subCategoryDetail.categoryDetail.categoryName
                    ,rs.isActive
                    ,rs.boqRefCheck
                    ,rs.isCustomerMaterial
                    ,rs.isReusable
                    ,rs.customerCode
                )) 
                //const data = result//result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `BORN_MasterMaterial_${moment(fileDate).format("DD-MM-YYYY")}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }

    function getDdlUoM(){
        API.getUOM().then(
            result=>{
                console.log('i am DDL UoM',result)
                setDdlUoM(result);
            }
        )
    }
    function getDdlItemLevel(){
        API.getItemLevel().then(
            result=>{
                console.log('i am DDL LVL',result)
                setDdlItemLevel(result);
            }
        )
    }

    function getDDLCategory(){
        API.getMaterialCategory().then(
            result=>{
                console.log('i am DDL LVL',result)
                const filtered = result.filter( (auto) => auto.isActive==true)
                setDdlCategory(filtered);
            }
        )
    }

    function getDDLSubCategory(){
        API.getSubMaterialCategory().then(
            result=>{
                console.log('i am DDL sub',result)
                const filtered = result.filter( (auto) => auto.isActive==true)
                setDdlSubCategory(filtered);
            }
        )
    }

    function refreshData(){
        getMaterial();
    }

    // Actionsession

    const handleShowAdd = () =>{
        console.log("add")
        setIsNew(true)
        getDDLSubCategory()
        getDdlItemLevel()
        getDdlUoM();
    }
    const handleCancelAdd = () =>{
        console.log("clise")
        setIsNew(false)
        setIsEdit(false)
    }

    const handleOkAddForm = (data) => {
        const body = 
            {
                "materialCode": data.materialCode,
                "materialName": data.materialName,
                "UnitOfMeasurement": data.uom,
                "customerCode":data.customerCode,
                "SubCategoryDetail":{
                    "SubCategoryId":data.subCategory
                },
                "ItemLevelDetail":{
                    "ItemLevelId":data.itemLevel
                },
                "boqRefCheck": data.isBOQRef,
                "isCustomerMaterial": data.isCustomerMaterial,
                "isReusable":data.isReusable,
                "lmby":user.uid 
            }
        
        console.log(body,"body");
        console.log(data,"data");
        API.postmMaterial(body).then(
            result=>{
                console.log(result,"result")
                if(result.status=="success")
                {
                    toast.success(result.message);
                    refreshData()
                    setIsNew(false)
                    // window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )              
    }
    const handleFailedAddForm = (data) => {
              
    }

    function getFlagUpload(){
        API.getFlagUpload("").then(
            result=>{
                console.log('flag',result)
                setFlagUpload(result);
            }
        )
    }
    function getResultUpload(){
        API.getResultUpload().then(
            result=>{
                console.log('i am DDL UoM',result)
                setDataUpload(result);
            }
        )
    }
    


    const showModalUpload = () => {
        getFlagUpload()
        setIsModalUploadVisible(true)
        getResultUpload()
    }
    const hideModalUpload = () => {
        setIsModalUploadVisible(false)
    }


    const handleEdit = (data) =>{
        console.log(data,"edit")
        setIsEdit(true)
        getDDLSubCategory()
        getDdlItemLevel()
        getDdlUoM();
        setMaterialId(data.materialId);
        setMaterialCode(data.materialCode);
        setMaterialName(data.materialName);
        setSelectedUoM(data.uom);
        setSelectedSubCategory(data.subCategoryId);
        setSelectedLevel(data.itemLevelId);
        setSelectedIsCustomerMaterial(data.isCustomerMaterial)
        setSelectedBOQRef(data.boqRefCheck)
        setSelectedIsReusable(data.isReusable)
        setCustomerCode(data.customerCode)
    }

    const handleOkEditForm = (data) =>{
        console.log(data,"data")
        const body ={
            "materialId": data.materialId,
            "materialCode": data.materialCode,
            "materialName": data.materialName,
            "customerCode":data.customerCode,
            "UnitOfMeasurement": data.uom,
            "boqRefCheck": data.isBOQRef,
            "isCustomerMaterial": data.isCustomerMaterial,
            "isReusable" : data.isReusable,
            "itemLevelDetail": {
                "itemLevelId": data.itemLevel
            },
            "subCategoryDetail": {
                "subCategoryId": data.subCategory
            },
            "lmby": user.uid           
        
        }
        console.log("saveclick",body);
        API.putMaterial(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    //mtr.isEditRow = null;
                    setIsEdit(false);
                    window.location.reload()
                }
                else{
                    toast.error(result.message);
                }
            }
        )
    }



    const handleIsActive = (status,data) =>{
        console.log(status,data,"isActive")
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "id" : data.materialId,
                "actStatus" : status,
                "lmby" : user.uid
            }
            console.log("activa:",body);
            API.putMaterialActivation(body).then(
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

    const navigateUploadPage = () => {
        history.push('/master/materialbulkupload')
    }

    const props = {
        onRemove: () => {
            setFileUpload(null);
            return fileUpload
        },
        // beforeUpload: file => {
        //     const isPNG = file.type === 'image/png';
        //     if (!isPNG) {
        //         message.error(`${file.name} is not a png file`);
        //     }
        //     return isPNG || Upload.LIST_IGNORE;
        // },
        beforeUpload: file => {
            console.log(file,"file");
            const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if(isXLSX){
                setFileUpload(file);
                return false;
            }
            toast.error(`${file.name} is not a xlsx`)
            return isXLSX || Upload.LIST_IGNORE;
        },
        fileUpload,
    };


    const handleUpload = () => {
        setUploading(true)
        try{
            API.postBulkUpload(uId,fileUpload).then(
                result=>{
                    try{
                        if(result.status=="success"){
                            setFileUpload(null);
                            setUploading(false);
                            props.onRemove();
                            toast.success(result.message);
                            getFlagUpload()
                            getResultUpload()
                        }
                        else{
                            setFileUpload(null);
                            setUploading(false);
                            props.onRemove();
                            toast.error(result.message);
                        }
                    }
                    catch(e){
                        toast.error("Upload file error")
                        setUploading(false);
                        console.log(e,"error catch")
                    }
                }
            );
        }catch(e)
        {
            console.log(e,"errorrrrororoo");
        }
    }

    const postProceedUploaded = () => {
   
        API.postProceedUpload("",uId).then(
            result=>{
                try{
                    if(result.status=="success"){
                        toast.success(result.message)
                        getFlagUpload()
                    }
              
                }
                catch(e){
                    toast.error(result.message)
                   
                    console.log(e,"error catch")
                }
            }
        )
    }

    const postResetUploaded = () => {
 
        API.postClearUpload("").then(
            result=>{
                try{
                    if(result.status=="success"){
                        toast.success(result.message)
                        getFlagUpload()
                    }
              
                }
                catch(e){
                    toast.error(result.message)
                   
                    console.log(e,"error catch")
                }
            }
        )
    }
    
    const getDownload = () => {
        API.getDownloadUploaded().then(
            result=>{
                setDataDownload(result)
               
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `Bulkup_Result_Summary`;
                exportFromJSON({ data, fileName, exportType });
                console.log("BulkUp_Result_Summary")
            }
        )
    }


    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Material Code",
            width: 100,
            dataIndex:'materialCode',
            ...Search('materialCode'),
        },
        {
            title : "Material Name",
            width: 250,
            dataIndex:'materialName',
            ...Search('materialName'),
        },
        {
            title : "Customer Code ",
            width: 250,
            dataIndex:'customerCode',
            ...Search('customerCode'),
        },
        {
            title : "UoM",
            width: 80,
            dataIndex:'uom',
            ...Search('uom'),
        },
        {
            title : "Item Level",
            width: 80,
            dataIndex:'itemLevel',
            ...Search('itemLevel'),
        },
        {
            title : "SubCategory Name",
            width: 150,
            dataIndex:'subCategory',
            ...Search('subCategory'),
        },
        {
            title : "Category Name",
            width: 100,
            dataIndex:'category',
            ...Search('category'),
        },
        {
            title : "BOQ Ref Check",
            width: 100,
            render:(record)=>{
                return (
                    <><Checkbox defaultChecked={record.boqRefCheck} disabled /></>
                )
            },
            ...Search('boqRefCheck'),
        },
        {
            title : "Is Customer Material",
            width: 100,
            // dataIndex:'isCustomerMaterial',
            render:(record)=>{
                return (
                    <><Checkbox defaultChecked={record.isCustomerMaterial} disabled /></>
                )
            },
            ...Search('isCustomerMaterial'),
        },
        {
            title : "Is Reusable",
            width: 100,
        
            render:(record)=>{
                return (
                    // eslint-disable-next-line no-unneeded-ternary
                    <><Checkbox defaultChecked={record.isReusable} disabled /></>
                )
            },
            ...Search('isReusable'),
        },
        {
            title : "Is Active",
            width: 120,
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
            ...Search('uploadedDate'),
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
                        <Tooltip title="Edit Material">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                onClick={() => handleEdit(record)}
                            >
                                <EditOutlined />
                            </IconButton>
                        </Tooltip>
                    </Space>
                )
            }
            
        },
        
    
    ]

    const columnsResumeUpload = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "totalDataSuccess",
            width: 100,
            dataIndex:'totalDataSuccess',
            // ...Search('materialCode'),
        },
        {
            title : "totalDataError",
            width: 100,
            dataIndex:'totalDataError',
            // ...Search('materialName'),
        },
    ]
    
    
    useEffect(() => {
        refreshData()
    },[])

    useEffect(() => {
        //getDOP();
    },[fileUpload])

    return(
        <div>
            {isLoading ? 
                <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  
                :
                <><div className='float-right'>
                    <Tooltip title="Master Material Bulk Upload">
                        <IconButton size="small" onClick={showModalUpload}>
                            <UploadOutlined style={{color:"#2a74bf"}} />
                        </IconButton>
                        {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                    </Tooltip>
                    <Tooltip title="Download As Excell File">
                        <IconButton size="small" color="success" onClick={getDownloadDataDetail}>
                            <FileExcelOutlined />
                        </IconButton>
                        {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                    </Tooltip>
                   
                    <Tooltip title="Add Material">
                        <IconButton size="small" color="primary" onClick={handleShowAdd}>
                            <PlusOutlined />
                        </IconButton>
                    </Tooltip>
                    
                </div>
                <Table
                    scroll={{ x: '150%' }}
                    size="small"
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={[...materialData]}
                    rowKey={record => record.materialId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />
                <Modal title="Add New Material"
                    visible={isNew}
                    destroyOnClose={true}
                    onCancel={handleCancelAdd}
                    centered
                    maskClosable={false}
                    closable={true}
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
                        onFinish={handleOkAddForm}
                        onFinishFailed={handleFailedAddForm}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Material Code"
                            name="materialCode"
                            rules={[{ required: true, message: 'Please input your Material Code!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Material Name"
                            name="materialName"
                            rules={[{ required: true, message: 'Please input your Material Name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Customer Code"
                            name="customerCode"
                            // rules={[{ required: true, message: 'Please input your Customer Code!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="UoM"
                            name="uom"
                            rules={[{ required: true, message: 'Please Select UoM!'}]}
                        >
                            <Select 
                                // onChange={(e) => handleDDLSubconChange(e)}
                                placeholder="Select an option"
                            >
                                {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                {
                                    ddlUoM.map(inv =>  <Select.Option value={inv.uomName}> 
                                        {inv.uomName}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="Item Level"
                            name="itemLevel"
                            rules={[{ required: true, message: 'Please Select Item Level!'}]}
                        >
                            <Select 
                                // onChange={(e) => handleDDLSubconChange(e)}
                                placeholder="Select an option"
                            >
                                {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                {
                                    ddlItemLevel.map(inv =>  <Select.Option value={inv.itemLevelId}> 
                                        {inv.itemLevelName}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="Sub Category"
                            name="subCategory"
                            rules={[{ required: true, message: 'Please Select Item Level!'}]}
                        >
                            <Select 
                                // onChange={(e) => handleDDLSubconChange(e)}
                                placeholder="Select an option"
                            >
                                {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                {
                                    ddlSubCategory.map(inv =>  <Select.Option value={inv.subCategoryId}> 
                                        {inv.subCategoryName}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="Is BOQ Ref"
                            name="isBOQRef"
                            
                        >
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                // checked={record.isActive}
                            />
                        </Form.Item>
                        <Form.Item label="Is Customer Material"
                            name="isCustomerMaterial"
                        
                        >
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                // checked={record.isActive}
                            />
                        </Form.Item>
                   
                        <Form.Item label="Is Reusable"
                            name="isReusable"
                        
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
                <Modal title="Edit Material"
                    visible={isEdit}
                    destroyOnClose={true}
                    onCancel={handleCancelAdd}
                    
                    maskClosable={false}
                    closable={true}
                    footer={null}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 17 }}
                        initialValues={{
                            'materialId': materialId,
                            'materialCode': materialCode,
                            'materialName': materialName,
                            'customerCode': customerCode,
                            'uom': selectedUoM,
                            'itemLevel': selectedLevel,
                            'subCategory': selectedSubCategory,
                            'isBOQRef':selectedBOQRef,
                            'isCustomerMaterial':selectedIsCustomerMaterial
                        }}
                        onFinish={handleOkEditForm}
                        onFinishFailed={handleFailedAddForm}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Material Id"
                            name="materialId"
                            rules={[{ required: true, message: 'Please input your Material Code!' }]}
                            hidden
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Material Code"
                            name="materialCode"
                            rules={[{ required: true, message: 'Please input your Material Code!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Material Name"
                            name="materialName"
                            rules={[{ required: true, message: 'Please input your Material Name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Customer Code"
                            name="customerCode"
                            // rules={[{ required: true, message: 'Please input your Customer Code!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="UoM"
                            name="uom"
                            rules={[{ required: true, message: 'Please Select UoM!'}]}
                        >
                            <Select 
                                // onChange={(e) => handleDDLSubconChange(e)}
                                placeholder="Select an option"
                            >
                                {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                {
                                    ddlUoM.map(inv =>  <Select.Option value={inv.uomName}> 
                                        {inv.uomName}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="Item Level"
                            name="itemLevel"
                            rules={[{ required: true, message: 'Please Select Item Level!'}]}
                        >
                            <Select 
                                // onChange={(e) => handleDDLSubconChange(e)}
                                placeholder="Select an option"
                            >
                                {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                {
                                    ddlItemLevel.map(inv =>  <Select.Option value={inv.itemLevelId}> 
                                        {inv.itemLevelName}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="Sub Category"
                            name="subCategory"
                            rules={[{ required: true, message: 'Please Select Item Level!'}]}
                        >
                            <Select 
                                // onChange={(e) => handleDDLSubconChange(e)}
                                placeholder="Select an option"
                            >
                                {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                {
                                    ddlSubCategory.map(inv =>  <Select.Option value={inv.subCategoryId}> 
                                        {inv.subCategoryName}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="Is BOQ Ref"
                            name="isBOQRef"
                            
                        >
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                defaultChecked={selectedBOQRef}
                                // checked={record.isActive}
                            />
                        </Form.Item>
                        <Form.Item label="Is Customer Material"
                            name="isCustomerMaterial"
                        
                        >
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                defaultChecked={selectedIsCustomerMaterial}
                                // checked={record.isActive}
                            />
                        </Form.Item>
                        <Form.Item label="Is Reusable"
                            name="isReusable"
                        
                        >
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                defaultChecked={selectedIsReusable}
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
                </>
            }
            <Modal title="New Master Material Bulk Upload"
                visible={isModalUploadVisible}
                destroyOnClose={true}
                onCancel={hideModalUpload}
                    
                maskClosable={false}
                closable={true}
                footer={null}
            >
                {flagUpload == true ? (<> <Row direction="vertical">
                    <Col span={12}>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                            <Row>

                                <Text type="danger">Note : (*.XLSX) is format allowed</Text>
                            </Row>
                        </Upload>
                    </Col>
                    <Col span={12}>
                        <div className='float-right'>
                            <Button
                                type="primary"
                                onClick={handleUpload}
                                disabled={fileUpload == null}
                                loading={uploading}
                            >
                                {uploading ? 'Uploading' : 'Start Upload'}
                            </Button>
                        </div>
                    </Col>
                </Row></>):flagUpload == false ?(<>
                    <Table
           
                      
                        dataSource={dataUpload}
                        columns={columnsResumeUpload}
                        pagination={false}

                        scroll={{ x: '100%' }}
                        // eslint-disable-next-line react/jsx-boolean-value
                        // pagination={{
                        //     pageSizeOptions: ['5','10','20','30', '40'],
                        //     showSizeChanger: true,
                        //     position: ["bottomLeft"],
                        // }}
                        size="small"
                    />

                    <div style={{display: 'flex',flexDirection:"column"}}>
                        <div className="mt-4" style={{alignSelf:"end"}}>
                            <Col span={4} md={8} sm={24}>
                                <Space direction="horizontal">
                                    <Button
                                        type="primary"
                                        onClick={postProceedUploaded}
                                    >
                                      Proceed
                                    </Button>
                                    <Button
                                        type="danger"
                                        htmlType="submit"
                                        onClick={postResetUploaded}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                       
                                        htmlType="submit"
                                        onClick={getDownload}
                                    >
                                        Download Resume
                                    </Button>
                                </Space>
                            </Col>
                        </div>
         
   
                    </div>

                </>):(<></>)}
               
            </Modal>

        
        </div>
                
            
    )
}

export default TableMaterial;
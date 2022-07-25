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
import {CheckOutlined,CloseOutlined,PlusOutlined, FileExcelOutlined,CloseSquareTwoTone ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined,DeleteTwoTone,UploadOutlined } from '@ant-design/icons'
import {toast} from 'react-toastify';
import DGMasterMaterial from './DataGenerator';
import DGMasterMaterialDownload from '@app/pages/mMaterial/DataGeneratorDownload';

import exportFromJSON from 'export-from-json'

const TableDOPRegionCoverage = () => {
    // const { TabPane } = Tabs;
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.auth.user);
    // const [inventoryReport,setInventoryReport] = useState([]);
    // const [inventoryReportDetail,setInventoryReportDetail] = useState([]);

    const [ddlWHDOP,setDdlWHDOP] = useState([]);
    const [ddlRegion,setDdlRegion] = useState([]);
    const [selectedUoM, setSelectedUoM] = useState("");
    const [fileDate, setFileDate] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedCategory, setselectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedBOQRef, setSelectedBOQRef] = useState(false);
    const [selectedIsReusable, setSelectedIsReusable] = useState(false);
    const [selectedIsCustomerMaterial, setSelectedIsCustomerMaterial] = useState(false);

    const [materialData,setMaterialData] = useState([]);
    // const [isActiveRow,setIsActiveRow] = useState(false);
    const [isNew,setIsNew] = useState(false);
    
    // const dispatch = useDispatch();

    const getMaterial = () =>{
        setIsLoading(true)
        API.getDOPRegion().then(
            result=>{
                setIsLoading(false)
                console.log('i am result',result)
                setMaterialData(result);
            }
        )
    } 


    function getDDLWHDOP(){
        API.getmDOPList().then(
            result=>{
                console.log('i am DDL WHDOP',result)
                setDdlWHDOP(result);
            }
        )
    }

    const getDDLRegion=(dopid)=>{
        API.getDOPNotCoverage(dopid).then(
            result=>{
                console.log('i am DDL Region',result)
                setDdlRegion(result);
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
        getDDLWHDOP();
    }
    const handleCancelAdd = () =>{
        console.log("clise")
        setIsNew(false)
    }
    const handleDelete = (id) =>{
        if (window.confirm('Are you sure you want to delete this material ?')) {
            API.deleteDOPRegion(id).then(
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
    }
    const handleWHDOPChange = (dopid) =>{
        getDDLRegion(dopid)
    }

    const handleOkAddForm = (data) => {
        const body = 
            {
                "dopId" : data.whdop,
                "rgnId" : data.region,
                "LMBY": user.uid
            }
        
        console.log(body,"body");
        console.log(data,"data");
        API.postDOPRegion(body).then(
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

   
    
    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "WH Name",
            width: 200,
            dataIndex:'dopName',
            ...Search('dopName'),
        },
        {
            title : "Coverage Region",
            width: 200,
            dataIndex:'coverageRegion',
            ...Search('coverageRegion'),
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
                        <Tooltip title="Delete Data">
                            <IconButton
                                size='small'
                                color='error'
                                aria-label="upload file"
                                component="span" 
                                onClick={() => handleDelete(record.dopRgnId)}
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
                    <Tooltip title="Add Material">
                        <IconButton size="small" color="primary" onClick={handleShowAdd}>
                            <PlusOutlined />
                        </IconButton>
                    </Tooltip>
                </div>
                <Table
                    scroll={{ x: '100%' }}
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
                <Modal title="Add Region Coverage"
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
                        onFinish={(data)=>handleOkAddForm(data)}
                        onFinishFailed={handleFailedAddForm}
                        autoComplete="off"
                    >
                        
                        <Form.Item label="WH / DOP"
                            name="whdop"
                            rules={[{ required: true, message: 'Please Select WH/DOP!'}]}
                        >
                            <Select 
                                onChange={(e) => handleWHDOPChange(e)} 
                                placeholder="Select an option"
                            >
                                {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                {
                                    ddlWHDOP.map(inv =>  <Select.Option value={inv.dopId}> 
                                        {inv.dopName}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        
                        <Form.Item label="Region"
                            name="region"
                            
                        >
                            <Select 
                                
                                placeholder="Select an option"
                            >
                                {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                {
                                    ddlRegion.map(inv =>  <Select.Option value={inv.rgnId}> 
                                        {inv.rgnName}</Select.Option>)
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

export default TableDOPRegionCoverage;
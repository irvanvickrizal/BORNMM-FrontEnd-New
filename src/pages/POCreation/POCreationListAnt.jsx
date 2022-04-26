/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
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
import React, {Component,useState,useEffect} from 'react';
import axios from 'axios';

import {variables} from '../../Variables';
import {ContentHeader} from '@components';
//Bootstrap and jQuery libraries
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-buttons/js/dataTables.buttons"
import "datatables.net-fixedcolumns/js/dataTables.fixedColumns.min.js";
import moment from 'moment';

import Search from '@app/components/searchcolumn/SearchColumn';
import $ from 'jquery'; 
import API  from '../../utils/apiServices';
import POPanel from './POCreationPanel';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import DGPOCreation from './DataGenerator';
// import Form from 'react-bootstrap/Form';
import { CloudUploadOutlined, UploadOutlined,DownloadOutlined,PlusOutlined,FileExcelOutlined,CloseOutlined, EditOutlined,DeleteOutlined,CheckOutlined  } from '@ant-design/icons';

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import {IconButton, TextField}  from '@mui/material/';
import {Modal,Switch,message,Upload,DatePicker,Typography, Table, Button,Input,Form, Space,Card,Tooltip,Row,Col,Title } from 'antd';


const POListAnt = () => {
    const isNew = useSelector((state) => state.scope.isNew);
    // const isEdit = useSelector((state) => state.scope.isEdit);
    const [isEdit,setIsEdit] = useState(false)
    const userId = useSelector(state=>state.auth.user.uid)
    const [scopeName,setScopeName] = useState("");
    const [scopeDesc,setScopeDesc] = useState("");
    const [isActive,setIsActive] = useState("");
    const { Title } = Typography;
    const [show, setShow] = useState(false);
    const [scopeData,setScopeData] = useState([]);
    const [isActiveRow,setIsActiveRow] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [selectedcpoId,setselectedCPOId] = useState('');
    const [selectedcpoNo,setselectedCPONo] = useState('');
    const [selectedcpoNoOriginal,setselectedCPONoOriginal] = useState('');
    const [selectedcpoDate,setselectedCPODate] = useState('');
    const [selectedprojectName,setselectedProjectName] = useState('');
    const [selectedcontractName,setselectedContractName] = useState('');
    const [selectedisActive,setselectedIsActive] = useState(false);


    const dispatch = useDispatch();

    const handleClose = () => 
    {
        setShow(false) 
    }
    function getPOList(){
        console.log("getscope");
        setIsLoading(true)
        API.getPOList().then(
            result=>{
                const filedata = result.map((rs)=>DGPOCreation.poList(
                    rs.cpoId
                    ,rs.cpoNo
                    ,rs.cpoNoOriginal
                    ,rs.cpoDate
                    ,rs.cpoDateStr
                    ,rs.projectName
                    ,rs.contractName
                    ,rs.cminfo.isActive
                ))
                setIsLoading(false)
                console.log('i am PO creation',result)
                console.log('i am PO creation filedata',filedata)
                const data = DGPOCreation.poList

                setScopeData(filedata);
            }
        )
    } 

    const handleShowAdd = () => {
        setShow(true);
    };

    const handleCancelEdit = (po) => {
        //setShow(true);
        setIsEdit(false)
    };
    function refreshData(){
        getPOList();
    }

    function saveClick(record){
        const body =(
            {
                "CPOId":record.cpoId,
                "CPONo":record.cpoNo,
                "CPONoOriginal":record.cpoNoOriginal,
                "CPODate" : record.cpoDate,
                "ProjectName":record.projectName,
                "ContractName":record.contractName,
                "CMINFO":{
                    "LMBY":userId
                }
            }
        )
        console.log("saveclick",record);
        console.log("body",body);
        API.putCustomerPO(body).then(
            result=>{
                console.log(result);
                if(result.status=="success")
                {
                    toast.success(result.message);
                    setIsEdit(false);
                    refreshData();
                }
                else{
                    toast.error(result.message);
                }
            }
        )
    }

    const handleOkEditForm = (po) => {
        saveClick(po)
        console.log(po,'edit')
    };
    const handleFailedAddForm = (po) => {

    };

    
   
    const showModalEdit = (data) =>
    {
        setIsEdit(true)
        setselectedCPOId(data.cpoId)
        setselectedCPONo(data.cpoNo)
        setselectedCPONoOriginal(data.cpoNoOriginal)
        setselectedCPODate(data.cpoDate)
        setselectedProjectName(data.projectName)
        setselectedContractName(data.contractName)
        setselectedIsActive(data.isActive)
        console.log(data,"edit data")
    }

   

    function handleIsActiveClick(e, record ){
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "Id":record.cpoId,
                "ActStatus":e,
                "LMBY":userId  
            }
            console.log(e,"checked",record,"record");
            console.log(body,"body");
            API.putPOActivation(body).then(
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

    const column = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "PO Number",
            width: 100,
            dataIndex:'cpoNo',
            ...Search('cpoNo'),
        },
    
        {
            title : "PO Number Original",
            width: 100,
            dataIndex:'cpoNoOriginal',
            ...Search('cpoNoOriginal'),
        },
        {
            title : "PO Date",
            width: 100,
            dataIndex:'cpoDatestr',
            ...Search('cpoDatestr'),
        },
        {
            title : "Project Name",
            width: 100,
            dataIndex:'projectName',
            ...Search('projectName'),
        },
        {
            title : "Contract Name",
            width: 100,
            dataIndex:'contractName',
            ...Search('contractName'),
        },
        {
            title : "isActive",
            width: 80,
            align:'center',
            fixed: 'right',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.isActive}
                        onClick={(e)=>handleIsActiveClick(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
  
        },
        {
            title : "Options",
            width: 70,
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

    const handleSaveFromPanel = () =>{
        setShow(false);
        refreshData();
    }

    useEffect(() => {
        refreshData();

    },[])
    
    return (
        <div>
            {isLoading ? <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
                :
                <>
                    {/* <a href='javascript:void(0)' onClick={handleShowAdd} class="btn btn-success float-right">
                        <i class="fas fa-plus"></i>
                    </a> */}
                    <Row>
                        <Col md={16} sm={24} >
                            <Title level={5}>PO List</Title>
                        </Col>
                        <Col md={8} sm={24} >
                            <div className='float-right'>
                                <Tooltip title="Add PO Scope">
                                    <IconButton size="small" color="primary" onClick={handleShowAdd}>
                                        <PlusOutlined />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Col>
                    </Row>
                    <Table
                        scroll={{ x: '100%' }}
                        size="medium"
                        // expandable={{ expandedRowRender }}
                        columns={column}
                        dataSource={[...scopeData]}
                        rowKey={record => record.cpoId}
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                            showSizeChanger: true,
                            position: ["bottomLeft"],
                        }}
                        bordered />
                    <Modal title="Add PO"
                        width={700}
                        visible={show}
                        //onOk={handleOKCancelTask}
                        onCancel={handleClose}
                        // confirmLoading={cancelLoading}
                        destroyOnClose={true}
                        footer={null}
                    >
                        <POPanel/>
                        {/* <Modal.Footer>
                    <Button variant="primary" onClick={saveClick}>Save</Button>
                </Modal.Footer> */}
                    </Modal>      
                    <Modal title="Edit PO"
                        visible={isEdit}
                        destroyOnClose={true}
                        onCancel={handleCancelEdit}
                        maskClosable={false}
                        closable={true}
                        footer={null}
                    >
                        <Form
                            name="basic"
                            labelCol={{ span: 7 }}
                            wrapperCol={{ span: 17 }}
                            initialValues={{
                                'cpoId': selectedcpoId,
                                'cpoNo': selectedcpoNo,
                                'cpoNoOriginal': selectedcpoNoOriginal,
                                'cpoDate': moment(selectedcpoDate, "YYYY-MM-DD").add(2,'d'),
                                'projectName': selectedprojectName,
                                'contractName': selectedcontractName,
                                'isActive': selectedisActive,
                            }}
                            onFinish={handleOkEditForm}
                            onFinishFailed={handleFailedAddForm}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="cpoId"
                                name="cpoId"
                                rules={[{ required: true, message: 'Please input your Material Code!' }]}
                                hidden
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="CPO No"
                                name="cpoNo"
                                rules={[{ required: true, message: 'Please input your Material Code!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="CPO No Original"
                                name="cpoNoOriginal"
                                rules={[{ required: true, message: 'Please input your Material Name!' }]}
                            >
                                <Input />
                            </Form.Item>
                          
                            <Form.Item name="cpoDate" label="DatePicker" >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                label="Project Name"
                                name="projectName"
                            // rules={[{ required: true, message: 'Please input your Customer Code!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Contract Name"
                                name="contractName"
                            // rules={[{ required: true, message: 'Please input your Customer Code!' }]}
                            >
                                <Input />
                            </Form.Item>
                            {/* 
                            <Form.Item label="Is Active"
                                name="isActive"
                        
                            >
                                <Switch
                                    checkedChildren={<CheckOutlined />}
                                    unCheckedChildren={<CloseOutlined />}
                                    defaultChecked={selectedisActive}
                                // checked={record.isActive}
                                />
                            </Form.Item> */}
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
    );
};

export default POListAnt;
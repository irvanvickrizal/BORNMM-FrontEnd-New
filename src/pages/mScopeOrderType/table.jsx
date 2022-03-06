/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { editDataScope, getActiveStatus, getDataScopeOrder,getOrderType, getScopeId, postDataScope } from '@app/store/action/scopeOrderAction'
import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table,Button,Modal} from 'antd'
import Form from 'react-bootstrap/Form';
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled} from '@ant-design/icons'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from '@app/utils/apiServices';

export default function TableScopeOrder() {
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const selectScope = useSelector(state=>state.scopeReducer.dataScope)

   
    const [selectedScope,setSelectedScope] = useState("");

    const [scopeName,setScopeName] = useState("");
    const [scopeDesc,setScopeDesc] = useState("");

    const [selectedOrder,setSelectedOrder] = useState("");
    const [orderName,setOrderName] = useState("");
    const [orderCode,setOrderCode] = useState("");
    const [orderQstring,setOrderQstring] = useState("");
    const [isActive,setIsActive] = useState('')
   
    const dataScope = useSelector(state=>state.scopeOrderReducer.dataScopeOrderType)
    const idDataScope = useSelector(state=>state.scopeOrderReducer.dataScopeOrderType)
    const dataOrder = useSelector(state=>state.scopeOrderReducer.dataOrderType)
    const activeStat = useSelector(state=>state.scopeOrderReducer.activestatus)
    useEffect(()=>{
        dispatch(getDataScopeOrder())
        dispatch(getOrderType())
        console.log(idDataScope.map(e=>e.scopeOrderTypeId),'ini data')
    },[dispatch])

    
   
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

 

    function handleDDLScopeChange(scopeId){
        const scope = selectScope.filter( (auto) => auto.scopeId==scopeId)
        setSelectedScope(scopeId)
        setScopeName(scope[0].scopeName);
        setScopeDesc(scope[0].scopeDesc);
       
    }

    function handleDDLOrderChange(orderTypeId){
        const order = dataOrder.filter( (auto) => auto.orderTypeId==orderTypeId)
        setSelectedOrder(orderTypeId)
        setOrderName(order[0].orderTypeName);
        setOrderCode(order[0].orderTypeCode);
        setOrderQstring(order[0].orderTypeQString);
        
        
    }
    const handleOk = () => {
        dispatch(postDataScope({
            'OrderTypeDetail':{
                OrderTypeId:selectedScope
            },
            'ScopeDetail':{
                ScopeId:selectedOrder
            }
        }))
        setIsModalVisible(false);
    };

  
    const handleEdit = () => {
        if (window.confirm('Are you sure you want to process this action ?')) {
            dispatch(editDataScope({
                "Id":idDataScope,
                "ActStatus":!activeStat
            }))
        }
    
    }

    const getId = (e,active) => {
        dispatch(getScopeId(e))
        dispatch(getActiveStatus(active))
        // setIsActive(active)
        handleEdit()
        console.log(!activeStat,'tes sdkn')
    }



    const column = [
        {
            title : 'Scope Name',
            dataIndex : 'scopeDetail',
            render: item => Object.keys(item).map(k => item[k])[1]
        },
        {
            title : 'Order Type Detail',
            dataIndex: 'orderTypeDetail',
            render: item => Object.keys(item).map(k => item[k])[1]
        },
        {
            title : 'Is Active',
            dataIndex: 'isActive',
            key: 'scopeOrderTypeId',
            render: (active,e,val) => (
                <Form.Check
                    
                    id={dataScope.map(()=>val.scopeOrderTypeId)}
                    defaultChecked={active}
                    onChange={()=>getId(e.scopeOrderTypeId,active)}
                />)
        },
        {
            title : "Action",
            render:(e,active)=>{
                return <EditOutlined onClick={()=>getId(e.scopeOrderTypeId,active.isActive)} />
            }
        },
    ]
    return (
        <div>
            <div className="card card-primary">
                <div className="card-header align-middle">
                    <h3 className="card-title">Scope Order Type</h3>
                    <a title="create new dop" onClick={showModal} class="btn btn-success float-right">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <Table
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    responsive
                    dataSource={dataScope}
                    columns={column}
                    key='siteConditionId'
                    // eslint-disable-next-line react/jsx-boolean-value
                    pagination={true}
                    style={{marginTop : 36}}
                />
            </div>
            <Modal 
                title="Add Scope Order Type" 
                visible={isModalVisible} 
                footer = {[
                    <Button key="submit" type="primary" onClick={handleOk} >
                    Submit
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                    Cancel
                    </Button>,
                ]}
                onCancel = {()=>{
                    handleCancel()
                }}
            >
                <div className="card-body">
                    <div className='row g-3'>
                        <div className='col-md-12 '>
                            <div class="input-group mb-3">
                                {/* <span class="input-group-text col-md-3" id="basic-addon1">PO NO </span> */}
                                {/* <input onChange={(e) => setCPONo(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" /> */}
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Scope</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                       
                                        onChange={(e) => handleDDLScopeChange(e.target.value)}
                                        
                                    >
                                        {selectScope.map(um => <MenuItem value={um.scopeId}>
                                            {um.scopeName}
                                        </MenuItem> )}
                                    </Select>
                                       
                                  
                                </FormControl>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">Scope Name</span>
                                <input  type="text" value={scopeName} class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">Scope Desc</span>
                                <input  type="text" value={scopeDesc} class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                        <div className='col-md-12 '>
                            <div class="input-group mb-3">
                                {/* <span class="input-group-text col-md-3" id="basic-addon1">PO NO </span> */}
                                {/* <input onChange={(e) => setCPONo(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" /> */}
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Select Order Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        onChange={(e) => handleDDLOrderChange(e.target.value)}
                                        // label={row.uom}
                                    >
                                        {dataOrder.map(um => <MenuItem value={um.orderTypeId}>
                                            {um.orderTypeName}
                                        </MenuItem> )}
                                    </Select>
                                </FormControl>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">Name</span>
                                <input value={orderName} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">Code</span>
                                <input value={orderCode} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">QString</span>
                                <input  type="text" value={orderQstring} class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                          
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

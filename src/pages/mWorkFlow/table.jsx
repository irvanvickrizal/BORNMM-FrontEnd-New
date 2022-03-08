/* eslint-disable no-unneeded-ternary */
/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Table,Input,Button,Modal,Switch} from 'antd'
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled} from '@ant-design/icons'
import Form from 'react-bootstrap/Form';
import { editDataWorkFlow, getDataWorkFlow,postDataWorkFlow } from '@app/store/action/workFlowAction';

import "./index.css"

import 'antd/dist/antd.css';

//Action



export default function TableWorkFlow() {
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isActive,setIsActive] = useState(false);
    const [workflowName,setWorkFlowName] = useState('');
    const [workflowDesc,setWorkFlowDesc] = useState('');
    const [workflowStatus,setWorkFlowStatus] = useState('');
    const [active,setActive] = useState(false);

    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [id,setId] = useState('')

    const dataWorkFlow = useSelector(state=>state.workFlowReducer.dataWorkFlow)
    const loading = useSelector(state=>state.workFlowReducer.isLoading)
    

    const showModalEdit = () => {
        setIsModalEditVisible(true);
    };

    const getId = (record) => {
        setId(record)
        showModalEdit()
        console.log(id,'id')
    }
    // const handleEdit = () => {
    //     getId()
    //     dispatch(editDataSite({siteConditionId:id,condition:siteName}))
    // }

    const showModal = () => {
        setIsModalVisible(true);
    };
 

    // const handlePost = () => {
    //     dispatch(postDataSite({condition : siteName,isActive}))
    // }
    const post = () => {
        dispatch(postDataWorkFlow({workflowName,workflowDesc,workflowStatus,IsLastApproverCheckpoint:active}))
    }
   
    const edit = () => {
        dispatch(editDataWorkFlow({WorkflowId:id,workflowName,workflowDesc,IsLastApproverCheckpoint:active}))
    }

    const handleEdit = () => {
        edit()
        setIsModalVisible(false);
        // console.log(id,'id')
    }

    const handleOk = () => {
        
        post()
        setIsModalVisible(false)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCancelEdit = () => {
        setIsModalEditVisible(false);
    };

    const columns = [
        {
            title : "Workflow Name",
            dataIndex:'workflowName',
            sorter:(record1,record2)=>{
                return record1.workflowName > record2.workflowName
            },
            filterDropdown: ({setSelectedKeys,selectedKeys,confirm}) => {
                return <Input 
                    autoFocus 
                    
                    placeHolder='search'
                    value={selectedKeys[0]}
                    onChange={(e)=>{
                        setSelectedKeys(e.target.value?[e.target.value]:[])
                    }}
                    style={{ marginBottom: 8, display: 'block' }}
                    onPressEnter={()=>{
                        confirm()
                    }}
                    onBlur={()=>{
                        confirm()
                    }}
                ></Input>
            },
            filterIcon: () => {
                return <SearchOutlined/>
            },
            onFilter:(value,record)=>{
                return record.workflowName.toLowerCase().includes(value.toLowerCase())
            },
            
        },
        {
            title:'Description',
            dataIndex:'workflowDesc'
        },
        {
            title:'Status',
            dataIndex:'workflowStatus'
        },
        {
            title : "Is Last Aprover Checkpoint",
            dataIndex:'isLastApproverCheckpoint',
            width:'15%',
            key: 'isLastApproverCheckpoint',
            render: (e, record) => (< Switch type='switch' defaultChecked={e} />)
        },
        {
            title : "Is Active",
            dataIndex:'isActive',
            key: 'isActive',
            render: (e, record) => (< Switch type='switch' defaultChecked={e} />)
        },


       
        {
            title : "Action",
            render:(record)=>{
                return <EditOutlined onClick={(e) => getId(record.workflowId)}/>
            }
        },
    ]


    useEffect(()=>{
        dispatch(getDataWorkFlow())
    },[dispatch])

   

    return (
        <div>
            <div className="card card-primary">
                <div className="card-header align-middle">
                    <h3 className="card-title">Workflow</h3>
                    <a title="create new dop" onClick={showModal} class="btn btn-success float-right">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <Table
                    // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    responsive
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    dataSource={dataWorkFlow}
                    columns={columns}
                    key='siteConditionId'
                    // eslint-disable-next-line react/jsx-boolean-value
                    pagination={{
                        
                       
                        pageSizeOptions: ['5','10','20','30', '40'],
                        position: ["bottomLeft"],
                        showSizeChanger: true,
                      
                       
                        
                    }}
                    style={{marginTop : 36}}
                    size='small'
                    bordered
                    loading={loading ? (true):(false)}    
                
                />
            </div>
          
            <Modal 
                title="Add Workflow" 
                visible={isModalVisible} 
                footer = {[
                    <Button key="submit" type="primary" onClick={handleOk} >
                    Submit
                    </Button>,
                    <Button key="back" onClick={handleCancel}>
                    Cancel
                    </Button>,
                ]}
            >
                <div className="card-body">
                    <div className='row g-3'>
                        <div className='col-md-12 '>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">Workflow Name </span>
                                <input value={workflowName} onChange={(e) => setWorkFlowName(e.target.value)} placeholder='Add workflow Name' type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">Description </span>
                                <input value={workflowDesc} onChange={(e) => setWorkFlowDesc(e.target.value)} placeholder='Add Description' type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">Description </span>
                                <input value={workflowStatus} onChange={(e) => setWorkFlowStatus(e.target.value)} placeholder='Add Status' type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">Is Aproved </span>
                                <div class="form-control col-md-9">
                                    <Form.Check 
                                        type="switch"
                                        id="isSite"
                                        onChange={(e) => setActive(e.target.checked)}
                                    />
                                </div>
                            </div>
                            
                            
                          
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal 
                title="Edit Condition" 
                visible={isModalEditVisible} 
                onCancel = {()=>{
                    handleCancelEdit()
                }}
                footer = {[
                    <Button key="submit" type="primary" onClick={handleEdit} >
                    Submit
                    </Button>,
                    <Button key="back" onClick={handleCancelEdit}>
                    Cancel
                    </Button>,
                ]}
            >
                <div className="card-body">
                    <div className='row g-3'>
                        <div className='col-md-12 '>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">Workflow Name </span>
                                <input value={workflowName} onChange={(e) => setWorkFlowName(e.target.value)} placeholder='Edit workflow Name' type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">Description </span>
                                <input value={workflowDesc} onChange={(e) => setWorkFlowDesc(e.target.value)} placeholder='Edit Description' type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text col-md-3" id="basic-addon1">Is Aproved </span>
                                <div class="form-control col-md-9">
                                    <Switch
                                       
                                        id="isSite"
                                        onChange={(e) => setActive(e.target.checked)}
                                    />
                                </div>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </Modal>
           
        </div>
        
    )
}

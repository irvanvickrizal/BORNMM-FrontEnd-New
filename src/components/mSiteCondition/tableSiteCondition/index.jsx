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
import { getDataSite, getSiteId, postDataSite,editDataSite } from '@app/store/action/siteConditionAction'
import {Table,Input,Button,Modal} from 'antd'
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled} from '@ant-design/icons'
import Form from 'react-bootstrap/Form';
import moment from 'moment'
import "./index.css"

import 'antd/dist/antd.css';

//Action



export default function TableSiteCondition() {
    const dispatch = useDispatch()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isActive,setIsActive] = useState(false);
    const [siteName,setSiteName] = useState('');
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [id,setId] = useState('')

    const showModalEdit = () => {
        setIsModalEditVisible(true);
    };

    const getId = (record) => {
        setId(record)
        showModalEdit()
        console.log(id,'id')
        
    }
    const handleEdit = () => {
        getId()
        // dispatch(editDataSite({siteConditionId:id,condition:siteName}))
        
    }

    const showModal = () => {
        setIsModalVisible(true);
    };
 

    const handlePost = () => {
        dispatch(postDataSite({condition : siteName,isActive}))
    }

    const handleOk = () => {
        
        handlePost()
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
            title : "Condition",
            dataIndex:'condition',
            sorter:(record1,record2)=>{
                return record1.scopeId > record2.scopeId
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
                return record.condition.toLowerCase().includes(value.toLowerCase())
            },
            
        },
        {
            title : "Is Active",
            dataIndex:'isActive',
            key: 'isActive',
            render: (e, record) => (< Form.Check type='switch' defaultChecked={e} />)
        },
        {
            title : "Action",
            render:(record)=>{
                return <EditOutlined onClick={(e) => getId(record.siteConditionId)}/>
            }
        },
    ]


    useEffect(()=>{
        dispatch(getDataSite())
    },[dispatch])

   
    const data = useSelector(state=>state.siteConditionReducer.dataSiteCondition)
    const loading = useSelector(state=>state.siteConditionReducer.isLoading)
    return (
        <div>
            <div className="card card-primary">
                <div className="card-header align-middle">
                    <h3 className="card-title">Site Condition List</h3>
                    <a title="create new dop" onClick={showModal} class="btn btn-success float-right">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <Table
                    // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    responsive
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    dataSource={data}
                    columns={columns}
                    key='siteConditionId'
                    // eslint-disable-next-line react/jsx-boolean-value
                    pagination={true}
                    style={{marginTop : 36}}
                    size='small'
                    bordered
                    loading={loading ? (true):(false)}    
                
                />
            </div>
          
            <Modal 
                title="Add Condition" 
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
                                <span class="input-group-text col-md-3" id="basic-addon1">Site Name </span>
                                <input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder='Add Site Name' type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1"/>
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
                                <span class="input-group-text col-md-3" id="basic-addon1">Site Name </span>
                                <input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder='Edit Site Name' type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1"/>
                            </div>
                          
                        </div>
                    </div>
                </div>
            </Modal>
           
        </div>
        
    )
}

/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect} from 'react'
import {Table,Input} from 'antd'
import { useDispatch,useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { getDataScope } from '@app/store/action/scopeAction';

import {SearchOutlined} from '@ant-design/icons'

export default function TableScope() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getDataScope())
    },[dispatch]);

    const data = useSelector(state => state.scopeReducer.dataScope)

    const columns =  [
        {
            title:'ID',
            dataIndex:'scopeId',
            sorter:(record1,record2)=>{
                return record1.scopeId > record2.scopeId
            }
        },
        {
            title:'Scope Name',
            dataIndex:'scopeName',
            // eslint-disable-next-line react/no-unstable-nested-components
            filterDropdown: ({setSelectedKeys,selectedKeys,confirm}) => {
                return <Input 
                    autoFocus 
                    placeHolder='search'
                    value={selectedKeys[0]}
                    onChange={(e)=>{
                        setSelectedKeys(e.target.value?[e.target.value]:[])
                    }}
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
                return record.scopeName.toLowerCase().includes(value.toLowerCase())
            },
            sorter:(record1,record2)=>{
                return record1.scopeName > record2.scopeName
            }
        },
        {
            title:'Description',
            dataIndex:'scopeDesc',
            filterDropdown: ({setSelectedKeys,selectedKeys,confirm}) => {
                return <Input 
                    autoFocus 
                    placeHolder='search'
                    value={selectedKeys[0]}
                    onChange={(e)=>{
                        setSelectedKeys(e.target.value?[e.target.value]:[])
                    }}
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
                return record.scopeDesc.toLowerCase().includes(value.toLowerCase())
            },
            sorter:(record1,record2)=>{
                return record1.scopeDesc > record2.scopeDesc
            }
         
        },
        {
            title:'Is Active',
            dataIndex:'cminfo.isActive',
          
        },
        
    ]
  
    return (
        <div>
            <Table
                responsive
                dataSource={data}
                columns={columns}
                key='scopeId'
                // eslint-disable-next-line react/jsx-boolean-value
                pagination={true}
            />
        </div>
    )
}

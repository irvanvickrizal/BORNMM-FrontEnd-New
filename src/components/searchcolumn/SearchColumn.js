/* eslint-disable react/react-in-jsx-scope */
import React, {useEffect, useState} from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const SearchColumn = (index) => {
    console.log('searchindex',index);
    const getColumnSearchProps = dataIndex => ({
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
        onFilter: (value, record) =>
            record[dataIndex]
                ?record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : ''
    });

    return (
        getColumnSearchProps(index)
    )
}

const Search = (index) => SearchColumn(index);

export default Search;
/* eslint-disable no-unreachable */
/* eslint-disable react/react-in-jsx-scope */
import React, {useEffect, useState} from 'react';
import { Table, Input, Button, Space,Col,Row } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Paper } from '@material-ui/core';

const SearchColumn = (index) => {
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys,selectedKeys,confirm}) => {
            const reset = ()=>{
                setSelectedKeys([])
                confirm()
              
                console.log(selectedKeys)
              
              
            }
            
            return (
                <Paper style={{padding:"4px 8px 8px 8px"}}>
                    <Input 
                    
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
                      
                    ></Input>
                    <Row gutter={24} >
                        <Col gutter="row" xl={12}>
                            {selectedKeys.length === 0 ? (
                                <Button disabled htmlType="submit" onClick={reset}>
                                Reset
                                </Button>
                            ):(
                                <Button  htmlType="submit" onClick={reset}>
                                Reset
                                </Button>
                            )}
                            
                        </Col>
                        <Col gutter="row" xl={12}>
                            <Button type="primary" htmlType="submit" onClick={confirm}>
                                Confirm
                            </Button>
                        </Col>
                      
                       
                    </Row>
                  
                </Paper>
            )
         
           
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
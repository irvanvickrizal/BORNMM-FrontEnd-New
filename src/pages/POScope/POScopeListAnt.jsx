/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-else-return */
/* eslint-disable react/jsx-fragments */
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
import Modal from 'react-bootstrap/Modal';
 
import API  from '../../utils/apiServices';
import POScopePanel from './POScopePanel';
import {useDispatch,useSelector} from 'react-redux';
import { setIsEdit, setIsNew } from '@app/store/reducers/scope';
import {toast} from 'react-toastify';

import { Table, Input, Button, Space,Card } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import CreateDataPOScope from './DataGenerator';
import Search from '@app/components/searchcolumn/SearchColumn';
// import Seacrh from '@app/components/searchcolumn/SearchColumn';

const POScopeListAnt = () => {

    const [scopeName,setScopeName] = useState("");
    const [scopeDesc,setScopeDesc] = useState("");
    const [isActive,setIsActive] = useState("");

    const [show, setShow] = useState(false);
    const [poScopeData,setPoScopeData] = useState([]);
    const [poFileList,setPoFileList] = useState([]);
    const [isActiveRow,setIsActiveRow] = useState(false);

    const dispatch = useDispatch();

    const columns = [
        {
            title: 'Id',
            dataIndex: 'poScopeId',
            key: 'poScopeId',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'CPO No',
            dataIndex: 'cpoNo',
            key: 'cpoNo',
            ...Search('cpoNo'),
        },
        {
            title: 'Total Sites',
            dataIndex: 'totalSites',
            key: 'totalSites',
            ...Search('totalSites'),
        },
        {
            title: 'CPO No Original',
            dataIndex: 'cpoNoOriginal',
            key: 'cpoNoOriginal',
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
                return record.cpoNoOriginal.toLowerCase().includes(value.toLowerCase())
            }
            // render: (cpoNoOriginal) => Seacrh.searchColumn(cpoNoOriginal),
        },
        
    ];

    const handleClose = () => 
    {
        setShow(false) 
        dispatch(setIsNew(false));;
        dispatch(setIsEdit(false));;
    }

    const handleShowAdd = () => {
        setShow(true);
        dispatch(setIsNew(true));
    };

    const handleKeyDownSearch = (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
        }
    }

    const [fileData,setFileData] = useState([]);

    const getFileList = (poScopeId) =>{
        API.getPOScopeListFile(poScopeId).then(
            result=>{
                setFileData(result);
                console.log("fileData",result);
            }
        )
    }
    const columnsSiteInfo =[
        {
            title:"File Name",
            dataIndex:"filePath",
        },
        {
            title:"Upload Data",
            dataIndex:"lmdt",
        },
        {
            title:"Total Row",
            dataIndex:"rowCount",
        },
        {
            title:"Status",
            dataIndex:"uploadStatus",
        },
        {
            title:"Option",
        },
    ]
    const columnss = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Age", dataIndex: "age", key: "age" },
        { title: "Address", dataIndex: "address", key: "address" },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () => <a href="javascript:;">Delete</a>
        }
    ];

    const data1 = [
        {
            key: 'poScopeId',
            name: "I am diff",
            age: 32,
            address: "New York No. 1 Lake Park",
            description:
            "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
        },
        {
            key: 'poScopeId',
            name: "yes",
            age: 42,
            address: "London No. 1 Lake Park",
            description:
            "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park."
        },
        {
            key: 'poScopeId',
            name: "no",
            age: 32,
            address: "Sidney No. 1 Lake Park",
            description:
            "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park."
        }
    ];
    const expandedRow = row => {
        
        console.log("exprow",row);
        //getFileList(row.poScopeId);
        // API.getPOScopeListFile(row.poScopeId).then(
        //     result=>{
        //         setFileData(result);
        //         console.log("fileData",result);
        //     }
        // )

        
        return (
            <Card title="File List"  hoverable>
                <Table 
                    columns={columnss} 
                    dataSource={data1} 
                    pagination={false} 
                    bordered
                />
            </Card>
        );
    };

    function getPOScopeListANT(){
        console.log("getscope");
        
        API.getPOScopeList().then(
            result=>{
                console.log("result po scope",result)
                // const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))

                const data = result.map((rs)=>CreateDataPOScope.poScopeData(
                    rs.poScopeId
                    , rs.totalSites
                    , rs.poDetail.cpoId
                    , rs.poDetail.cpoNo
                    , rs.poDetail.cpoNoOriginal
                    , rs.poDetail.projectName
                    , rs.scopeDetail.scopeId
                    , rs.scopeDetail.scopeName
                    , rs.lmdt)) 


                console.log("dataant", data)
                setPoScopeData(data);
                console.log("poscopedata",poScopeData);
            }
        )
    } 

    function refreshData(){
        // getPOScopeList();
        getPOScopeListANT();
        //getOrderType();
        //getSubcon();
    }

    function saveClick(scopeId){
        const body ={
            "ScopeId":scopeId,
            "ScopeName": scopeName,
            "ScopeDesc": scopeDesc,
            "CMINFO": {
                "LMBY": 0          
            }
        }
        console.log("saveclick",body);
        API.putmScope(body).then(
            result=>{
                console.log(result);
                if(result.status=="success")
                {
                    toast.success(result.message);
                    refreshData();
                }
                else{
                    toast.error(result.message);
                }
            }
        )
    }

    function handleIsActiveClick(cpoId, e ){
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "Id":cpoId,
                "ActStatus":e.target.checked,
                "LMBY":0  
            }
            console.log(body);
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

    const handleSaveFromPanel = () =>{
        setShow(false);
        refreshData();
    }

    const columnsss = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Age", dataIndex: "age", key: "age" },
        { title: "Address", dataIndex: "address", key: "address" },
        {
            title: "Action",
            dataIndex: "",
            key: "x",
            render: () => <a href="javascript:;">Delete</a>
        }
    ];

    const data = [
        {
            key: 1,
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park."
        },
        {
            key: 2,
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park."
        },
        {
            key: 3,
            name: "Joe Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
            description:
      "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park."
        }
    ];


    useEffect(() => {
        refreshData();

    },[])
    
    return (
        <><div className="card card-primary">
            <div className="card-header align-middle">
                <h3 className="card-title">PO List</h3>
                <a href='javascript:void(0)' onClick={handleShowAdd} class="btn btn-success float-right">
                    <i class="fas fa-plus"></i>
                </a>
            </div>
            <div className="card-body">
                <Table 
                    columns={columns} 
                    dataSource={poScopeData}
                    expandedRowRender={ expandedRow } />
            </div>
        </div><Modal
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New PO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <POScopePanel/>
            </Modal.Body>
            {/* <Modal.Footer>
                    <Button variant="primary" onClick={saveClick}>Save</Button>
                </Modal.Footer> */}
        </Modal>
        </>
    );
};

export default POScopeListAnt;
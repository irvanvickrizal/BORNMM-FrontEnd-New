/* eslint-disable react/jsx-boolean-value */
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
import ModalBS from 'react-bootstrap/Modal';
import moment from 'moment';
import API  from '../../utils/apiServices';
import POScopePanel from './POScopePanel';
import ModalUpload from './ModalUpload';
import ModalUploadRevise from './ModalUploadRevise';
import {useDispatch,useSelector} from 'react-redux';
import { setIsEdit, setIsNew } from '@app/store/reducers/scope';
import {toast} from 'react-toastify';
import {IconButton, TextField}  from '@mui/material/';
import {Modal,message,Upload,Typography, Table, Button, Space,Card,Tooltip,Row,Col,Title } from 'antd';
import Highlighter from 'react-highlight-words';
import { CloudUploadOutlined, UploadOutlined,DownloadOutlined,PlusOutlined,FileExcelOutlined,CloseOutlined, EditOutlined,DeleteOutlined,CheckOutlined  } from '@ant-design/icons';
import {variables} from '../../Variables';
import CreateDataPOScope from './DataGenerator';
import Search from '@app/components/searchcolumn/SearchColumn';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
// import Seacrh from '@app/components/searchcolumn/SearchColumn';
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import exportFromJSON from 'export-from-json'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const POScopeListAnt = () => {
    const Input = styled('input')({
        display: 'none',
    });
    const token = localStorage.getItem('token'); 
    const [scopeName,setScopeName] = useState("");
    const [scopeDesc,setScopeDesc] = useState("");
    const [selectedCPONo,setSelectedCPONo] = useState("");
    const [selectedProjectName,setSelectedProjectName] = useState("");
    const [selectedFileName,setSelectedFileName] = useState("");
    const [isActive,setIsActive] = useState("");
    const { Title } = Typography;
    const [show, setShow] = useState(false);
    const [poScopeData,setPoScopeData] = useState([]);
    const [selectedPOScopeId,setSelectedPOScopeId] = useState(0);
    const [selectedFileRevise, setSelectedFileRevise] = useState(null);
    const [isUploadFile, setIsUploadFile] = useState(false);
    const [isUploadFileRevise, setIsUploadFileRevise] = useState(false);

    const [errorLogs,setErrorLogs] = useState([]);
    const dispatch = useDispatch();
    const baseURL = variables.API_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [poScopeIdUpload, setPOScopeIdUpload] = useState(0);
    const [poSitelistIdUpload, setPOSitelistId] = useState(0);
    const [tablePage,setTablePage] = useState(0)

    function getPOScopeListANT(){
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

                setPoScopeData(data);
            }
        ) 
    } 

    function refreshPage(){
        getPOScopeListANT()
    }

    function onFileChange(file){
        console.log("upload file ",file, poScopeIdUpload);
        // setIsLoading(true);
        // API.postPOFile(id,file).then(
        //     result=>{
        //         setIsLoading(false);
        //         toast.success("Uploading File Success")
        //         setSelectedPOScopeId(0);
        //     }
        // );
        // setSelectedFile(file);
    }

    function getErrorLog(id){

        API.getErrorList(id).then(
            result=>{
                console.log('i am error log Scope',result)
                
                setErrorLogs(result);
                
                const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `errorlog_${data.WPID}_${data.Phase}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }

    function ReviseFileUpload(id, file){
        API.postRevisePOFile(id,file).then(
            result=>{
                window.location.reload();
            }
        )
        setSelectedFileRevise(file);
    }

    function DeleteFileUpload(id, file){
        if (window.confirm('Are you sure you want to process this action ?')) {
            API.deleteFileUpload(id).then(
                result=>{
                    console.log('i am PO Delete File',result);
                    
                    window.location.reload();
                }
            )
        }
    }

    function IconUploadStatus(props){
        console.log(props.status)
        if(props.status=="success"){
            console.log(props.status);
            return (
                <Tooltip title="Success">
                    <IconButton
                        aria-label="success"
                        size="small"
                        color="success"
                    >
                        <CheckCircleIcon />
                    </IconButton>
                </Tooltip> 
            );
        }
        else if(props.status=="failed"){ 
            console.log(props.status);
            return (
                // <h1>failed</h1>
                <Tooltip title="Failed">
                    <IconButton
                        aria-label="success"
                        size="small"
                        color="error"
                    >
                        <SmsFailedIcon/>
                    </IconButton>
                </Tooltip> 
            );
        }
        else if(props.status=="pending"){
            console.log(props.status);
            return (
                // <h1>pending</h1>
                <Tooltip title="Pending">
                    <IconButton
                        aria-label="success"
                        size="small"
                        color="primary"
                    >
                        <HourglassTopIcon />
                    </IconButton>
                </Tooltip>  
            );
        }
        return props.status;
    }
    const handleUploadFile = (poScopeId,cpoNo,projectName) =>{
        setIsUploadFile(true);
        setSelectedCPONo(cpoNo);
        setSelectedProjectName(projectName);
        setPOScopeIdUpload(poScopeId);
        console.log("idupload:",poScopeId);
    }
    const handleCancelUpload = () =>{
        setIsUploadFile(false);
    }
    const handleUploadFileRevise = (poSitelistId) =>{
        setIsUploadFileRevise(true);
        setPOSitelistId(poSitelistId);
        console.log("idupload:",poSitelistId);
    }
    const handleCancelUploadRevise = () =>{
        setIsUploadFileRevise(false);
    }

    function IconFileOption(props){
        console.log("id",props.id);
        console.log("fileName",props.fileName)
        setSelectedFileName(props.fileName);
        if(props.status=="success"){
            console.log(props.status);
            return (
                null
            );
        }
        else if(props.status=="failed"){ 
            console.log(props.status);
            return (
                <><label htmlFor="icon-button-file">
                    <IconButton 
                        size='small' 
                        color="primary" 
                        aria-label="upload file"
                        component="span"
                        onClick={()=>handleUploadFileRevise(props.id)}>
                        <UploadOutlined />
                    </IconButton>
                </label>
                <Tooltip title="Delete File">
                    <IconButton 
                        aria-label="expand row"
                        size="small"
                        color="error"
                        
                        onClick={() => DeleteFileUpload(props.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Download Log">
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        color="error"
                        onClick={() => getErrorLog(props.id)}
                    >
                        <SimCardDownloadIcon />
                    </IconButton>
                </Tooltip>
                </>
            );
        }
        else if(props.status=="pending"){
            console.log(props.status);
            return (
                <>
                    <label htmlFor="icon-button-file">
                        <IconButton 
                            size='small' 
                            color="primary" 
                            aria-label="upload file"
                            component="span"
                            onClick={()=>handleUploadFileRevise(props.id)}>
                            <UploadOutlined />
                        </IconButton>
                    </label>
                    <Tooltip title="Delete File">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            color="error"
                            onClick={() => DeleteFileUpload(props.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip></>
            );
        }
        return props.status;
    }

    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title: 'CPO No',
            dataIndex: 'cpoNo',
            key: 'cpoNo',
            ...Search('cpoNo'),
        },
        {
            title: 'CPO No Original',
            dataIndex: 'cpoNoOriginal',
            key: 'cpoNoOriginal',
            ...Search('cpoNoOriginal'),
        },
        {
            title: 'CPO Date',
            dataIndex: 'lmdt',
            key: 'lmdt',
            ...Search('lmdt'),
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            ...Search('projectName'),
        },
        {
            title: 'Scope',
            dataIndex: 'scopeName',
            key: 'scopeName',
            ...Search('scopeName'),
        },
        {
            title: 'Total Sites',
            dataIndex: 'totalSites',
            key: 'totalSites',
            ...Search('totalSites'),
        },
        {
            title:"Action",
            align:'center',
            render:(record)=>{
                return (
                    <label htmlFor="icon-button-file">
                        <IconButton 
                            size='small' 
                            color="primary" 
                            aria-label="upload file"
                            component="span"
                            onClick={()=>handleUploadFile(record.poScopeId,record.cpoNo,record.projectName)}>
                            <UploadOutlined />
                        </IconButton>
                    </label>
                )
            }
        }
        
    ];
    const columnsFile =[
        {
            title:"File Name",
            dataIndex:"filePath",
        },
        {
            title:"Upload Date",
            dataIndex:"uploadDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.uploadDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            }
        },
        {
            title:"Total Row",
            dataIndex:"rowCount",
        },
        {
            title:"Status",
            render:(record)=>{
                return (
                    <IconUploadStatus status={record.uploadStatus} />
                )
            }
        },
        {
            title:"Option",
            render:(record)=>{
                return (
                    <IconFileOption status={record.uploadStatus} id={record.poSitelistId} fileName={record.filePath}/>
                )
            }
        },
    ]

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

    const [fileDatas,setFileDatas] = useState([]);

    const getFileList = (data) =>{
        console.log("rowwwwww",data);
        setSelectedPOScopeId(data.poScopeId);
        setSelectedProjectName(data.projectName);
        setSelectedCPONo(data.cpoNo);
        API.getPOScopeListFile(data.poScopeId).then(
            result=>{
                const filedata = result.map((rs)=>CreateDataPOScope.fileListData(
                    rs.poScopeDetail.poScopeId
                    ,rs.poSitelistId
                    ,rs.filePath
                    ,rs.fullFilePath
                    ,rs.uploadStatus
                    ,rs.lmdt
                    ,rs.rowCount
                ))
                setFileDatas(filedata);
                console.log("fileData",filedata);
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


    useEffect(() => {
        refreshData();
    },[poScopeIdUpload])
    
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
                        columns={columns} 
                        dataSource={poScopeData}
                        size="small" 
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                            showSizeChanger: true,
                            position: ["bottomLeft"],
                        }}
                        scroll={{ x: '100%' }}
                        expandable={{
                            expandedRowRender: (record) => (
                                <Table 
                                    scroll={{ x: '100%' }}
                                    columns={columnsFile} 
                                    dataSource={fileDatas} 
                                    pagination={false}
                                    size="small" 
                                    bordered
                                />
                            ),
                            rowExpandable: (record) => selectedPOScopeId == 0 ? record.poScopeId != selectedPOScopeId : record.poScopeId == selectedPOScopeId,
                            onExpand: (expanded, record) =>
                                expanded ?
                                    getFileList(record)
                                    :
                                    setSelectedPOScopeId(0)
                        }} 
                    />        
                    <Modal title="Add New PO Scope"
                        visible={show}
                        //onOk={handleOKCancelTask}
                        onCancel={handleClose}
                        // confirmLoading={cancelLoading}
                        destroyOnClose={true}
                        footer={null}
                    >
                        <POScopePanel/>
                    </Modal>
                    <Modal title="Upload File"
                        visible={isUploadFile}
                        //onOk={handleOKCancelTask}
                        onCancel={handleCancelUpload}
                        // confirmLoading={cancelLoading}
                        destroyOnClose={true}
                        footer={null}
                    >
                        <ModalUpload poScopeId={poScopeIdUpload} cpoNo={selectedCPONo} projectName={selectedProjectName}  />
                    </Modal>
                    <Modal title="Upload File Revise"
                        visible={isUploadFileRevise}
                        //onOk={handleOKCancelTask}
                        onCancel={handleCancelUploadRevise}
                        // confirmLoading={cancelLoading}
                        destroyOnClose={true}
                        footer={null}
                    >
                        {/* <p>{poScopeIdUpload}</p> */}
                        <ModalUploadRevise poSitelistId={poSitelistIdUpload} cpoNo={selectedCPONo} projectName={selectedProjectName} fileName={selectedFileName} />
                    </Modal>
                </>
            }

        </div>

    );
};

export default POScopeListAnt;
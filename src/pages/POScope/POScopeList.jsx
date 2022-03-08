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
//Bootstrap and jQuery libraries
// import 'bootstrap/dist/css/bootstrap.min.css';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-buttons/js/dataTables.buttons"
import "datatables.net-fixedcolumns/js/dataTables.fixedColumns.min.js";

import $ from 'jquery'; 
import API  from '../../utils/apiServices';
import POScopePanel from './POScopePanel';
import {useDispatch,useSelector} from 'react-redux';
import { setIsEdit, setIsNew } from '@app/store/reducers/scope';
import {toast} from 'react-toastify';

// material table
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Tooltip from '@mui/material/Tooltip';
import { subDays } from 'date-fns/esm';
import DeleteIcon from '@mui/icons-material/Delete';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
import exportFromJSON from 'export-from-json'
import CreateDataPOScope from './DataGenerator';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

const datax = [{ foo: 'foo'}, { bar: 'bar' }];
const fileName = 'download';
const exportType =  exportFromJSON.types.xls;

const Input = styled('input')({
    display: 'none',
});

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


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileRevise, setSelectedFileRevise] = useState(null);
    
    const [poScopeData,setPoScopeData] = useState([]);
    const [errorLogs,setErrorLogs] = useState([]);

    function getPOScopeList(){
        console.log("getscope");
        API.getPOScopeList().then(
            result=>{
                console.log('i am PO Scope',result)
                setPoScopeData(result);
            }
        )
    } 

    function getErrorLog(id){

        API.getErrorList(id).then(
            result=>{
                console.log('i am error log Scope',result)
                
                setErrorLogs(result);
                
                const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))

                exportFromJSON({ data, fileName, exportType });
            }
        )
    }

    function ReviseFileUpload(id, file){
        API.postRevisePOFile(id,file).then(
            result=>{
                console.log('i am PO Revise File',result)
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

    function IconFileOption(props){
        console.log("id",props.id);
        console.log(props.status)
        if(props.status=="success"){
            console.log(props.status);
            return (
                null
            );
        }
        else if(props.status=="failed"){ 
            console.log(props.status);
            return (
                <><label title="upload file" htmlFor="icon-button-filerevise">
                    <Input accept="*/*" id="icon-button-filerevise" type="file" 
                        onChange={(e)=>ReviseFileUpload(props.id,e.target.files[0])}       
                    />
                    <IconButton 
                        color="primary" 
                        aria-label="upload file" 
                        component="span" 
                    >
                        <FileUploadIcon />
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
                    <label title="upload file" htmlFor="icon-button-filerevise">
                        <Input accept="*/*" id="icon-button-filerevise" type="file"                         
                            onChange={(e)=>ReviseFileUpload(props.id,e.target.files[0])}   
                        />
                        <IconButton color="primary" aria-label="upload file" component="span">
                            <FileUploadIcon />
                        </IconButton>
                    </label><Tooltip title="Delete File">
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


    function onFileChange(file,id){
        console.log(id,file);
        API.postPOFile(id,file).then(
            result=>{
                console.log('i am PO upload',result)
            }
        );
        setSelectedFile(file);
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.poDetail.cpoNo}
                </TableCell>
                <TableCell>{row.poDetail.cpoNoOriginal}</TableCell>
                <TableCell>{moment(row.lmdt).format("yyyy/mm/DD")}</TableCell>
                <TableCell>{row.poDetail.projectName}</TableCell>
                <TableCell>{row.scopeDetail.scopeName}</TableCell>
                <TableCell>{row.totalSites}</TableCell>
                <TableCell align="center">
                    <label htmlFor="icon-button-file">
                        <Input 
                            onChange={(e)=>onFileChange(e.target.files[0],row.poScopeId)}  
                            accept="*/*" id="icon-button-file" type="file" />
                        <IconButton color="primary" aria-label="upload file" component="span">
                            <FileUploadIcon/>
                        </IconButton>
                    </label>
                    {/* <IconButton
                        aria-label="expand row"
                        size="small"
                        color="primary"
                    >
                        <EditTwoTone/>
                    </IconButton> */}
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        color="primary"
                    >
                      
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                  File List
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>File Name</TableCell>
                                        <TableCell>Upload Date</TableCell>
                                        <TableCell>Total Row</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="center">Option</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.getFileUploadList.map((sd) => (
                                        <TableRow key={sd.poSitelistId}>
                                            <TableCell component="th" scope="row">
                                                {sd.filePath}
                                            </TableCell>
                                            <TableCell>{moment(sd.lmdt).format("yyyy/mm/DD")}</TableCell>
                                            <TableCell>{sd.rowCount}</TableCell>
                                            <TableCell>
                                                {/* {sd.uploadStatus} */}
                                                <IconUploadStatus status={sd.uploadStatus} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconFileOption status={sd.uploadStatus} id={sd.poSitelistId}/>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const POScopeList = () => {

    const [scopeName,setScopeName] = useState("");
    const [scopeDesc,setScopeDesc] = useState("");
    const [isActive,setIsActive] = useState("");

    const [show, setShow] = useState(false);
    const [poScopeData,setPoScopeData] = useState([]);
    const [isActiveRow,setIsActiveRow] = useState(false);

    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const [cpoNoSearch,setCPONoSearch] = useState(false);

    const handleSearchCPONO = () => {
        console.log("ckick");
        setCPONoSearch(true);
    }

    const handleCancelSearch =() =>{
        setCPONoSearch(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function createData(poScopeId, totalSites, cpoId, cpoNo, cpoNoOriginal, projectName, modifiedUser){
        return{
            poScopeId
            ,totalSites
            ,cpoId
            ,cpoNo
            ,cpoNoOriginal
            ,projectName
            ,modifiedUser
        }
    }

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
    
    function getPOScopeList(){
        console.log("getscope");
        API.getPOScopeList().then(
            result=>{
                console.log('i am PO Scope',result)
                setPoScopeData(result);
            }
        )
    } 



    function getPOScopeListANT(){
        console.log("getscope");
        
        API.getPOScopeList().then(
            result=>{
                const data = result.map((rs)=>CreateDataPOScope.poScopeData(rs.poScopeId
                    , rs.totalSites
                    , rs.poDetail.cpoId
                    , rs.poDetail.cpoNo
                    , rs.poDetail.cpoNoOriginal
                    , rs.poDetail.projectName
                    , rs.scopeDetail.scopeId
                    , rs.scopeDetail.scopeName
                    , rs.lmdt))
                console.log("dataant", data)
                setPoScopeData(result);
            }
        )
    } 

    function refreshData(){
        getPOScopeList();
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

    useEffect(() => {
        refreshData();
        setTimeout(()=>{                        

            var t = $('#tblScope').DataTable( {
                "columnDefs": [ 
                    {width: '9%', targets: 4}
                    
                ],
                "order": [[ 1, 'asc' ]],
                "scrollX": false,
                orderCellsTop: true,
                responsive:true,
                autoWidth: false,
                search:true
            } );

            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw();

        }, 1000);
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
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>
                                        {cpoNoSearch ? 
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                                <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-search-cancel"
                                                    // label="Search"
                                                    // type={values.showPassword ? 'text' : 'password'}
                                                    // value={values.password}
                                                    // onChange={handleChange('password')}
                                                    size="small"
                                                    onKeyDown={handleKeyDownSearch}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleCancelSearch}
                                                                // onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Search"
                                                />
                                            </FormControl>
                                            : <span>CPO No
                                                <span class="float-right">
                                                    <IconButton aria-label="search"
                                                        align="right"
                                                        onClick={handleSearchCPONO}
                                                    >
                                                        <SearchIcon />
                                                    </IconButton>
                                                </span>    
                                            </span>}
                                    </TableCell>
                                    <TableCell>
                                    CPO No Original
                                        <span class="float-right">
                                            <IconButton aria-label="search"
                                                align="right"
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                    CPO Date
                                        <span class="float-right">
                                            <IconButton aria-label="search"
                                                align="right"
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                    Project Name
                                        <span class="float-right">
                                            <IconButton aria-label="search"
                                                align="right"
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </span></TableCell>
                                    <TableCell>
                                    Scope
                                        <span class="float-right">
                                            <IconButton aria-label="search"
                                                align="right"
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </span></TableCell>
                                    <TableCell>Total Sites</TableCell>
                                    <TableCell align="center">Option</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {poScopeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <Row key={row.name} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={poScopeData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
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

export default POScopeList;
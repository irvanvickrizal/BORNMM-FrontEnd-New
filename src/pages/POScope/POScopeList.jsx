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
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    
    const [selectedFile, setSelectedFile] = useState(null);
    const Input = styled('input')({
        display: 'none',
    });

    
    function onFileChange(file){
        console.log(file);
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
                <TableCell>{row.poDetail.cpoDateStr}</TableCell>
                <TableCell>{row.poDetail.projectName}</TableCell>
                <TableCell>{row.scopeDetail.scopeName}</TableCell>
                <TableCell>{row.totalSites}</TableCell>
                <TableCell align="center">
                    <label htmlFor="icon-button-file">
                        <Input onChange={(e)=>onFileChange(e.target.files[0])}  accept="*/*" id="icon-button-file" type="file" />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <FileUploadIcon/>
                        </IconButton>
                    </label>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        color="primary"
                    >
                        <EditTwoTone/>
                    </IconButton>
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
                                            <TableCell></TableCell>
                                            <TableCell>{sd.uploadStatus}</TableCell>
                                            <TableCell align="center">
                                                <label htmlFor="icon-button-file">
                                                    <Input accept="*/*" id="icon-button-file" type="file" />
                                                    <IconButton color="primary" aria-label="upload file" component="span">
                                                        <FileUploadIcon/>
                                                    </IconButton>
                                                </label>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    color="error"
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
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

    const handleShowEdit = (po) => {
        //setShow(true);
        po.isEditRow = true;
        console.log("edit :",po)
        dispatch(setIsEdit(true));
    };

    const handleCancelEdit = (po) => {
        //setShow(true);
        po.isEditRow = null;
        console.log("edit cancel:",po)
        dispatch(setIsEdit(false));
    };

    function getPOScopeList(){
        console.log("getscope");
        API.getPOScopeList().then(
            result=>{
                console.log('i am PO Scope',result)
                setPoScopeData(result);
            }
        )
    } 

    function refreshData(){
        getPOScopeList();
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
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>CPO No</TableCell>
                                <TableCell>CPO No Original</TableCell>
                                <TableCell>CPO Date</TableCell>
                                <TableCell>Project Name</TableCell>
                                <TableCell>Scope</TableCell>
                                <TableCell>Total Sites</TableCell>
                                <TableCell align="center">Option</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {poScopeData.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
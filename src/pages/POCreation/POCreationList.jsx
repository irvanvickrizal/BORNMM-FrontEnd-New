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
import axios from 'axios';

import {variables} from '../../Variables';
import {ContentHeader} from '@components';
//Bootstrap and jQuery libraries
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-buttons/js/dataTables.buttons"
import "datatables.net-fixedcolumns/js/dataTables.fixedColumns.min.js";

import $ from 'jquery'; 
import API  from '../../utils/apiServices';
import POPanel from './POCreationPanel';
import {useDispatch,useSelector} from 'react-redux';
import { setIsEdit, setIsNew } from '@app/store/reducers/scope';
import {toast} from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPowerOff } from '@fortawesome/free-solid-svg-icons'

import Form from 'react-bootstrap/Form';


const POList = () => {
    const isNew = useSelector((state) => state.scope.isNew);
    const isEdit = useSelector((state) => state.scope.isEdit);
    
    const [scopeName,setScopeName] = useState("");
    const [scopeDesc,setScopeDesc] = useState("");
    const [isActive,setIsActive] = useState("");

    const [show, setShow] = useState(false);
    const [scopeData,setScopeData] = useState([]);
    const [isActiveRow,setIsActiveRow] = useState(false);
    
    const dispatch = useDispatch();

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

    function getPOList(){
        console.log("getscope");
        API.getPOList().then(
            result=>{
                console.log('i am PO',result)
                setScopeData(result);
            }
        )
    } 

    function refreshData(){
        getPOList();
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
        <>
            <div className="card card-primary">
                <div className="card-header align-middle">
                    <h3 className="card-title">PO List</h3>
                    <a href='javascript:void(0)' onClick={handleShowAdd} class="btn btn-success float-right">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <div className="card-body">
                    <table id="tblScope" className="display table table-striped table-bordered table-sm row-border hover mb-5 responsive" aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>PO Number</th>
                                <th>PO Number Original</th>
                                <th>PO Date</th>
                                <th>PO Date STR</th>
                                <th>Project Name </th>
                                <th>Contract Name </th>
                                <th>Is Active </th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scopeData.map(po => <tr key={po.cpoId}>
                                <td></td>
                                <td>
                                    {po.isEditRow == null ? po.cpoNo :
                                        <input placeholder={po.cpoNo} onChange={(e) => setScopeName(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />}
                                </td>
                                <td>
                                    {po.isEditRow == null ? po.cpoNoOriginal :
                                        <input placeholder={po.cpoNoOriginal} onChange={(e) => setScopeDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />}
                                </td>
                                <td>
                                    {po.isEditRow == null ? po.cpoDate :
                                        <input placeholder={po.cpoDate} onChange={(e) => setScopeDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />}
                                </td>
                                <td>
                                    {po.isEditRow == null ? po.cpoDateStr :
                                        <input placeholder={po.cpoDateStr} onChange={(e) => setScopeDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />}
                                </td>
                                <td>
                                    {po.isEditRow == null ? po.projectName :
                                        <input placeholder={po.projectName} onChange={(e) => setScopeDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />}
                                </td>
                                <td>
                                    {po.isEditRow == null ? po.contractName :
                                        <input placeholder={po.contractName} onChange={(e) => setScopeDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />}
                                </td>
                                <td>
                                    <Form.Check
                                        type="switch"
                                        id={po.cpoId}
                                        checked={po.cminfo.isActive}
                                        onChange={(e) => handleIsActiveClick(po.cpoId, e)} />
                                </td>
                                <td>
                                    {po.isEditRow == false || po.isEditRow == null ?
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            onClick={() => handleShowEdit(po)}
                                            title="edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                        :
                                        <button type="button"
                                            className="btn btn-success mr-1"
                                            onClick={() => saveClick(po.scopeId)}>
                                            <FontAwesomeIcon icon={faSave} />
                                        </button>
                                    // <a href='javascript:void(0)' onClick={()=>handleSaveEdit(po)} class="btn btn-success float-right">
                                    //     <i class="fas fa-save"></i>
                                    // </a>
                                    }
                                    {po.isEditRow == true ?
                                        <a href='javascript:void(0)' onClick={() => handleCancelEdit(po)} class="btn btn-danger float-right">
                                            <i class="fas fa-light fa-times"></i>
                                        </a> : null}
                                </td>
                            </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>NO</th>
                                <th>PO Number</th>
                                <th>PO Number Original</th>
                                <th>PO Date</th>
                                <th>PO Date STR</th>
                                <th>Project Name </th>
                                <th>Contract Name </th>
                                <th>Is Active </th>
                                <th>Option</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <Modal
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
                    <POPanel/>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="primary" onClick={saveClick}>Save</Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
};

export default POList;
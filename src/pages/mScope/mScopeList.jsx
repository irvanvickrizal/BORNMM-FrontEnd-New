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
import ScopePanel from './mScopePanel';
import {useDispatch,useSelector} from 'react-redux';
import { setIsEdit, setIsNew } from '@app/store/reducers/scope';
import {toast} from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { BsPencilFill } from 'react-icons/bs';

import Form from 'react-bootstrap/Form';


const mScopeList = () => {
    // const isNew = useSelector((state) => state.scope.isNew);
    const [isEdit,setIsEdit] = useState(false);
    const [isNew,setIsNew] = useState(false);
    
    const [scopeName,setScopeName] = useState("");
    const [scopeDesc,setScopeDesc] = useState("");
    const [isActive,setIsActive] = useState("");

    const [show, setShow] = useState(false);
    const [scopeData,setScopeData] = useState([]);
    const [isActiveRow,setIsActiveRow] = useState(false);

    const handleClose = () => 
    {
        setShow(false) 
        setIsNew(false);
        setIsEdit(false);
    }

    const handleShowAdd = () => {
        setShow(true);
        setIsNew(true);
    };

    const handleShowEdit = (scp) => {
        //setShow(true);
        scp.isEditRow = true;
        console.log("edit :",scp);
        setIsEdit(true);
    };

    const handleCancelEdit = (scp) => {
        //setShow(true);
        scp.isEditRow = null;
        console.log("edit cancel:",scp)
        setIsEdit(false);
    };

    function getScope(){
        API.getmScope().then(
            result=>{
                setScopeData(result);
            }
        )
    } 

    function refreshData(){
        getScope();
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

    function handleIsActiveClick(scopeId, e ){
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "Id":scopeId,
                "ActStatus":e.target.checked,
                "LMBY":0  
            }
            console.log(body);
            API.putmScopeActivation(body).then(
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

        }, 2000);
    },[])
    
    return (
        <><div className="card card-primary">
            <div className="card-header align-middle">
                <h3 className="card-title">Scope List</h3>
                <a href='javascript:void(0)' onClick={handleShowAdd} class="btn btn-success float-right">
                    <i class="fas fa-plus"></i>
                </a>
            </div>
            <div className="card-body">
                <table id="tblScope" className="display table table-striped table-bordered table-sm row-border hover mb-5 responsive" aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>Scope Name</th>
                            <th>Desc</th>
                            <th>IsActive</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scopeData.map(scp => <tr key={scp.scopeId}>
                            <td></td>
                            <td>
                                {scp.isEditRow == null ? scp.scopeName :
                                    <input placeholder={scp.scopeName} onChange={(e) => setScopeName(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />}
                            </td>
                            <td>
                                {scp.isEditRow == null ? scp.scopeDesc :
                                    <input placeholder={scp.scopeDesc} onChange={(e) => setScopeDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />}
                            </td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    id={scp.scopeId}
                                    checked={scp.cminfo.isActive}
                                    onChange={(e) => handleIsActiveClick(scp.scopeId, e)} />
                            </td>
                            <td>
                                {scp.isEditRow == false || scp.isEditRow == null ?
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => handleShowEdit(scp)}
                                        title="edit">
                                        <BsPencilFill/>
                                    </button>
                                    :
                                    <button type="button"
                                        className="btn btn-success mr-1"
                                        onClick={() => saveClick(scp.scopeId)}>
                                        <FontAwesomeIcon icon={faSave} />
                                    </button>
                                    // <a href='javascript:void(0)' onClick={()=>handleSaveEdit(scp)} class="btn btn-success float-right">
                                    //     <i class="fas fa-save"></i>
                                    // </a>
                                }
                                {scp.isEditRow == true ?
                                    <a href='javascript:void(0)' onClick={() => handleCancelEdit(scp)} class="btn btn-danger float-right">
                                        <i class="fas fa-light fa-times"></i>
                                    </a> : null}
                                {scp.datainused == 0 ?
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(scp.scopeId, scp.scopeName)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button> : null}
                            </td>
                        </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>NO</th>
                            <th>Scope Name</th>
                            <th>Desc</th>
                            <th>IsActive</th>
                            <th>Option</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div><Modal
            size="lg"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>"Add New Scope"</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ScopePanel/>
            </Modal.Body>
            {/* <Modal.Footer>
                    <Button variant="primary" onClick={saveClick}>Save</Button>
                </Modal.Footer> */}
        </Modal>
        </>
    );
};

export default mScopeList;
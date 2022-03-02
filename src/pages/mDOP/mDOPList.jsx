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
import Table from 'react-bootstrap/Table'

import $ from 'jquery'; 
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import {useTranslation} from 'react-i18next';
import API  from '../../utils/apiServices';
import DOPPanel from './mDOPPanel';
import {useDispatch,useSelector} from 'react-redux';
import {setCardTitle} from '@store/reducers/pagetext';
import { setIsEdit, setIsNew } from '@app/store/reducers/dop';
import {toast} from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPowerOff, faPencil } from '@fortawesome/free-solid-svg-icons'


import Form from 'react-bootstrap/Form';


//? Action
import { getDataDop } from '@app/store/action/dopAction';

const mDOPList = () => {
    const isNew = useSelector((state) => state.dop.isNew);
    const isEdit = useSelector((state) => state.dop.isEdit);
    
    const [ddlOrderType,setDdlOrderType] = useState([]);
    const [ddlSubconName,setddlSubconName] = useState([]);
    const [selectedOrderType,setSelectedOrderType] = useState(0);
    const [selectedSubcon,setSelectedSubcon] = useState(0);
    const [dopName,setDopName] = useState("");
    const [dopCode,setDopCode] = useState("");
    const [dopType,setDopType] = useState("");
    const [dopDesc,setDopDesc] = useState("");
    const [dopDest,setDopDest] = useState("");
    const [dopAddress,setDopAddress] = useState("");
    const [isMainCWH,setIsMainCWH] = useState(false);
    const [isCWH,setIsCWH] = useState(false);
    const [isSite,setIsSite] = useState(false);

    const [show, setShow] = useState(false);
    const [dopData,setDopData] = useState([]);
    const [isActiveRow,setIsActiveRow] = useState(false);
    
    const dispatch = useDispatch();
    function getDOP(){
        API.getmDOPList().then(
            result=>{
                console.log('i am DOP',result)
                setDopData(result);
            }
        )
    } 
    function getOrderType(){
        API.getmOrderType().then(
            result=>{
                console.log('i am OrderType',result)
                setDdlOrderType(result);
            }
        )
    }
    function getSubcon(){
        API.getmSubcon().then(
            result=>{
                setddlSubconName(result);
            }
        )
    }

    function refreshData(){
        getDOP();
        getOrderType();
        getSubcon();
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

    const handleShowEdit = (dop) => {
        //setShow(true);
        dop.isEditRow = true;
        console.log("edit :",dop)
        dispatch(setIsEdit(true));
    };

    const handleCancelEdit = (dop) => {
        //setShow(true);
        dop.isEditRow = false;
        console.log("edit cancel:",dop)
        dispatch(setIsEdit(false));
    };

    function handleIsActiveClick(dopId, isActive ){
        const body={
            "Id":dopId,
            "ActStatus":isActive,
            "LMBY":0   
        }
        API.putActiveStatus(body).then(
            result=>{
                console.log("put: ", result);
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
        // console.log("dop ID :", dopId,"is Active", isActive)
        // toast.success("dop ID : ", dopId,"is Active", isActive);
    }

    


    function saveClick(dopId){
        const body ={
            "dopId":dopId,
            "dopName": dopName,
            "dopCode": dopCode,
            "dopType": dopType,
            "dopDesc": dopDesc,
            "dopDestName": dopDest,
            "dopAddress": dopAddress,
            "isMainCWH": isMainCWH,
            "isCWH": isCWH,
            "isSite": isSite,
            "orderType": {
                "orderTypeId": selectedOrderType          
            },
            "lspInfo": {
                "subconId": selectedSubcon
            },
            "cminfo": {
                "lmby": 0          
            }
        }
        API.putDOPData(body).then(
            result=>{
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

    function addClick(){
        //const dispatch = useDispatch(setIsNew(true));
        dispatch(setIsNew(true));
    }

    useEffect(() => {
        getDOP();
        getOrderType();
        getSubcon();
        getDataDop();
        setTimeout(()=>{                        

            var t = $('#tblDOP').DataTable( {
                "columnDefs": [ 
                    {width: '9%', targets: 13}
                    
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
                    <h3 className="card-title">DOP List</h3>
                    <a href='javascript:void(0)' onClick={handleShowAdd} title="create new dop" class="btn btn-success float-right">
                        <i class="fas fa-plus"></i>
                    </a>
                </div>
                <div className="card-body">
                    <Table responsive id="tblDOP" className="display table table-striped table-bordered table-sm row-border hover mb-5" aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>DOP Name</th>
                                <th>DOP Code</th>
                                <th>Type</th>
                                <th>Desc</th>
                                <th>Destination</th>
                                <th>Address</th>
                                <th>Is Main CWH</th>
                                <th>Is CWH</th>
                                <th>Is Site</th>
                                <th>Order Type</th>
                                <th>Subcon Name</th>
                                <th>Is Active</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dopData.map(dop =>
                                <tr key={dop.dopId}>
                                    <td></td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopName : 
                                                <input placeholder={dop.dopName} onChange={(e) => setDopName(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopCode : 
                                                <input placeholder={dop.dopCode} onChange={(e) => setDopCode(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopType : 
                                                <input placeholder={dop.dopType} onChange={(e) => setDopType(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopDesc : 
                                                <input placeholder={dop.dopDesc} onChange={(e) => setDopDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }    
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopDestName : 
                                                <input placeholder={dop.dopDestName} onChange={(e) => setDopDest(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }  
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopAddress : 
                                                <input placeholder={dop.dopAddress} onChange={(e) => setDopAddress(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }  
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? <Form.Check 
                                                type="switch"
                                                id="isMainCWHRowBinded"
                                                // onChange={(e) => setIsCWH(e.target.checked)}
                                                checked={dop.isMainCWH}
                                            /> : 
                                                <Form.Check 
                                                    type="switch"
                                                    id="isMainCWHRow"
                                                    onChange={(e) => setIsMainCWH(e.target.checked)}
                                                />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? <Form.Check 
                                                type="switch"
                                                id="isCWHRowBinded"
                                                // onChange={(e) => setIsCWH(e.target.checked)}
                                                checked={dop.isCWH}
                                            /> : 
                                                <Form.Check 
                                                    type="switch"
                                                    id="isCWHRow"
                                                    onChange={(e) => setIsCWH(e.target.checked)}
                                                />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? <Form.Check 
                                                type="switch"
                                                id="isSiteRowBinded"
                                                // onChange={(e) => setIsCWH(e.target.checked)}
                                                checked={dop.isSite}
                                            /> : 
                                                <Form.Check 
                                                    type="switch"
                                                    id="isSiteRow"
                                                    onChange={(e) => setIsSite(e.target.checked)}
                                                />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.orderType.orderTypeName : 
                                                <select className="form-select col-md-9" onChange={(e) => setSelectedOrderType(e.target.value)} value={ddlOrderType.orderTypeId}>
                                                    <option value="0">Select Order Type</option>
                                                    {ddlOrderType.map(um => <option key={um.orderTypeId} value={um.orderTypeId}>
                                                        {um.orderTypeName}
                                                    </option>)}
                                                </select>
                                        }  
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.lspInfo.subconName : 
                                                <select className="form-select col-md-9" onChange={(e) => setSelectedSubcon(e.target.value)} value={ddlSubconName.subconId}>
                                                    <option value="0">Select Subcon</option>
                                                    {ddlSubconName.map(um => <option key={um.subconId} value={um.subconId}>
                                                        {um.subconName}
                                                    </option>)}
                                                </select>        
                                        }  
                                    </td>
                                    <td>
                                        <Form.Check 
                                            type="switch"
                                            id={"isActive" + dop.dopId}
                                            checked={dop.cminfo.isActive}
                                            onChange={(e) => handleIsActiveClick(dop.dopId,e.target.checked)}
                                        />
                                    </td>
                                    <td>
                                        {dop.isEditRow==false || dop.isEditRow==null ? 
                                            <button type="button"
                                                className="btn btn-light mr-1"
                                                onClick={() => handleShowEdit(dop)}
                                                title="edit">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </button>
                                            : 
                                            <button type="button"
                                                className="btn btn-success mr-1"
                                                onClick={() =>saveClick(dop.dopId)}>
                                                <FontAwesomeIcon icon={faSave} />
                                            </button>
                                        }
                                        {dop.isEditRow==true ?
                                            <a href='javascript:void(0)' onClick={()=>handleCancelEdit(dop)} class="btn btn-danger float-right">
                                                <i class="fas fa-light fa-times"></i>
                                            </a> : null}
                                        {dop.datainused == 0 ?
                                            <button type="button"
                                                className="btn btn-light mr-1"
                                                onClick={() => this.deleteClick(dop.DOPId, dop.DOPName)}>
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
                                <th>DOP Name</th>
                                <th>DOP Code</th>
                                <th>Type</th>
                                <th>Desc</th>
                                <th>Destination</th>
                                <th>Address</th>
                                <th>Is Main CWH</th>
                                <th>Is CWH</th>
                                <th>Is Site</th>
                                <th>Subcon Name</th>
                                <th>Order Type</th>
                                <th>Is Active</th>
                                <th>Option</th>
                            </tr>
                        </tfoot>
                    </Table>
                    {/* <table responsive id="tblDOP" className="display table table-striped table-bordered table-sm row-border hover mb-5 responsive" aria-labelledby="tabelLabel">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>DOP Name</th>
                                <th>DOP Code</th>
                                <th>Type</th>
                                <th>Desc</th>
                                <th>Destination</th>
                                <th>Address</th>
                                <th>Is Main CWH</th>
                                <th>Is CWH</th>
                                <th>Is Site</th>
                                <th>Order Type</th>
                                <th>Subcon Name</th>
                                <th>Is Active</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dopData.map(dop =>
                                <tr key={dop.dopId}>
                                    <td></td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopName : 
                                                <input placeholder={dop.dopName} onChange={(e) => setDopName(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopCode : 
                                                <input placeholder={dop.dopCode} onChange={(e) => setDopCode(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopType : 
                                                <input placeholder={dop.dopType} onChange={(e) => setDopType(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopDesc : 
                                                <input placeholder={dop.dopDesc} onChange={(e) => setDopDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }    
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopDestName : 
                                                <input placeholder={dop.dopDestName} onChange={(e) => setDopDest(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }  
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.dopAddress : 
                                                <input placeholder={dop.dopAddress} onChange={(e) => setDopAddress(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                                        }  
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? <Form.Check 
                                                type="switch"
                                                id="isMainCWHRowBinded"
                                                // onChange={(e) => setIsCWH(e.target.checked)}
                                                checked={dop.isMainCWH}
                                            /> : 
                                                <Form.Check 
                                                    type="switch"
                                                    id="isMainCWHRow"
                                                    onChange={(e) => setIsMainCWH(e.target.checked)}
                                                />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? <Form.Check 
                                                type="switch"
                                                id="isCWHRowBinded"
                                                // onChange={(e) => setIsCWH(e.target.checked)}
                                                checked={dop.isCWH}
                                            /> : 
                                                <Form.Check 
                                                    type="switch"
                                                    id="isCWHRow"
                                                    onChange={(e) => setIsCWH(e.target.checked)}
                                                />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? <Form.Check 
                                                type="switch"
                                                id="isSiteRowBinded"
                                                // onChange={(e) => setIsCWH(e.target.checked)}
                                                checked={dop.isSite}
                                            /> : 
                                                <Form.Check 
                                                    type="switch"
                                                    id="isSiteRow"
                                                    onChange={(e) => setIsSite(e.target.checked)}
                                                />
                                        }
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.orderType.orderTypeName : 
                                                <select className="form-select col-md-9" onChange={(e) => setSelectedOrderType(e.target.value)} value={ddlOrderType.orderTypeId}>
                                                    <option value="0">Select Order Type</option>
                                                    {ddlOrderType.map(um => <option key={um.orderTypeId} value={um.orderTypeId}>
                                                        {um.orderTypeName}
                                                    </option>)}
                                                </select>
                                        }  
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? dop.lspInfo.subconName : 
                                                <select className="form-select col-md-9" onChange={(e) => setSelectedSubcon(e.target.value)} value={ddlSubconName.subconId}>
                                                    <option value="0">Select Subcon</option>
                                                    {ddlSubconName.map(um => <option key={um.subconId} value={um.subconId}>
                                                        {um.subconName}
                                                    </option>)}
                                                </select>        
                                        }  
                                    </td>
                                    <td>
                                        {
                                            dop.isEditRow==false||dop.isEditRow == null? <Form.Check 
                                                type="switch"
                                                id="isActiveRowBinded"
                                                // onChange={(e) => setIsCWH(e.target.checked)}
                                                checked={dop.cminfo.isActive}
                                            /> : 
                                                <Form.Check 
                                                    type="switch"
                                                    id="isActiveRow"
                                                    checked={dop.cminfo.isActive}
                                                    // onChange={(e) => setIsCWH(e.target.checked)}
                                                />
                                        }
                                    </td>
                                    <td>
                                        {dop.isEditRow==false || dop.isEditRow==null ? 
                                            <><button type="button"
                                                className="btn btn-light mr-1"
                                                onClick={() => handleShowEdit(dop)}
                                                title="edit">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </button><button type="button"
                                                className={dop.cminfo.isActive? "btn btn-danger mr-1" : "btn btn-success mr-1"} 
                                                onClick={() => handleIsActiveClick(dop.dopId,!dop.cminfo.isActive)}
                                                title={dop.cminfo.isActive? "deactivate" : "activate"}>
                                                <FontAwesomeIcon icon={faPowerOff} />
                                            </button></>
                                            : 
                                            <button type="button"
                                                className="btn btn-success mr-1"
                                                onClick={() =>saveClick(dop.dopId)}>
                                                <FontAwesomeIcon icon={faSave} />
                                            </button>
                                            // <a href='javascript:void(0)' onClick={()=>handleSaveEdit(dop)} class="btn btn-success float-right">
                                            //     <i class="fas fa-save"></i>
                                            // </a>
                                        }
                                        {dop.isEditRow==true ?
                                            <a href='javascript:void(0)' onClick={()=>handleCancelEdit(dop)} class="btn btn-danger float-right">
                                                <i class="fas fa-light fa-times"></i>
                                            </a> : null}
                                        {dop.datainused == 0 ?
                                            <button type="button"
                                                className="btn btn-light mr-1"
                                                onClick={() => this.deleteClick(dop.DOPId, dop.DOPName)}>
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
                                <th>DOP Name</th>
                                <th>DOP Code</th>
                                <th>Type</th>
                                <th>Desc</th>
                                <th>Destination</th>
                                <th>Address</th>
                                <th>Is Main CWH</th>
                                <th>Is CWH</th>
                                <th>Is Site</th>
                                <th>Subcon Name</th>
                                <th>Order Type</th>
                                <th>Is Active</th>
                                <th>Option</th>
                            </tr>
                        </tfoot>
                    </table>   */}
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
                    <Modal.Title>{isNew? "Add New DOP" : "Edit DOP"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DOPPanel/>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="primary" onClick={saveClick}>Save</Button>
                </Modal.Footer> */}
            </Modal>
        </>
        

    );
};

export default mDOPList;
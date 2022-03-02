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
import SubCategoryPanel from './mSubMaterialCategoryPanel';
import {useDispatch,useSelector} from 'react-redux';
import { setIsEdit, setIsNew } from '@app/store/reducers/scope';
import {toast} from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { BsPencilFill } from 'react-icons/bs';

import Form from 'react-bootstrap/Form';


const mScopeList = () => {
    const [isEdit,setIsEdit] = useState(false);
    const [isNew,setIsNew] = useState(false);

    const [ddlCategory,setDdlCategory] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState("");

    const [subCategoryName,setSubCategoryName] = useState("");
    const [fieldConfirm, setFieldConfirm] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [snRequired, setSnRequired] = useState(false);
    const [qtyRequired, setqtyRequired] = useState(false);

    const [show, setShow] = useState(false);
    const [subCategoryData,setsubCategoryData] = useState([]);
    
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

    const handleShowEdit = (sct) => {
        //setShow(true);
        sct.isEditRow = true;
        setIsEdit(true);
    };

    const handleCancelEdit = (sct) => {
        //setShow(true);
        sct.isEditRow = null;
        setIsEdit(false);
    };

    function getSubCategory(){
        API.getSubMaterialCategory().then(
            result=>{
                console.log('i am sub category',result)
                setsubCategoryData(result);
            }
        )
    } 

    function getDDLCategory(){
        API.getMaterialCategory().then(
            result=>{
                const filtered = result.filter( (auto) => auto.isActive==true)
                console.log('i am DDL cate',filtered);
                //const activeCategory = result.categoryName.includes("true");
                setDdlCategory(filtered);
            }
        )
    }

    function refreshData(){
        getSubCategory();
        getDDLCategory();
        //getOrderType();
        //getSubcon();
    }

    function saveClick(subCategoryId){
        const body ={
            "subCategoryId" : subCategoryId,
            "subCategoryName" : subCategoryName,
            "CategoryDetail":{
                "categoryId": selectedCategory
            },  
            "fieldConfirm":fieldConfirm,
            "snRequired":snRequired,
            "qtyRequired":qtyRequired,
            "lmby": 0    
        }
        console.log("saveclick",body);
        API.putSubMaterialCategory(body).then(
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

    function handleIsActiveClick(subCategoryId, e ){
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "Id":subCategoryId,
                "actstatus":e.target.checked,
                "lmby":0  
            }
            console.log(body);
            API.putSubCategoryStatus(body).then(
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
                <h3 className="card-title">Sub Category List</h3>
                <a href='javascript:void(0)' onClick={handleShowAdd} class="btn btn-success float-right">
                    <i class="fas fa-plus"></i>
                </a>
            </div>
            <div className="card-body">
                <table id="tblScope" className="display table table-striped table-bordered table-sm row-border hover mb-5 responsive" aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Field Confirm</th>
                            <th>SN Required</th>
                            <th>Qty Required</th>
                            <th>Grouping Count</th>
                            <th>Category Name</th>
                            <th>Is Active</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subCategoryData.map(sct => <tr key={sct.subCategoryId}>
                            <td></td>
                            <td>
                                {sct.isEditRow == null ? sct.subCategoryName :
                                    <input placeholder={sct.subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />}
                            </td>
                            <td>
                                {sct.isEditRow == null ? <Form.Check
                                    type="switch"
                                    id={"fieldConfirm" + sct.subCategoryId + "binded"}
                                    checked={sct.fieldConfirm}/> :
                                    <Form.Check
                                        type="switch"
                                        id={"fieldConfirm" + sct.subCategoryId}
                                        // checked={sct.fieldConfirm}
                                        onChange={(e) => setFieldConfirm(e.target.checked)}/>}
                            </td>
                            <td>
                                {sct.isEditRow == null ? <Form.Check
                                    type="switch"
                                    id={"snRequired" + sct.subCategoryId + "binded"}
                                    checked={sct.snRequired}/> :
                                    <Form.Check
                                        type="switch"
                                        id={"snRequired" + sct.subCategoryId}
                                        onChange={(e) => setSnRequired(e.target.checked)}/>}
                            </td>
                            <td>
                                {sct.isEditRow == null ? <Form.Check
                                    type="switch"
                                    id={"qtyRequired" + sct.subCategoryId + "binded"}
                                    checked={sct.qtyRequired}/> :
                                    <Form.Check
                                        type="switch"
                                        id={"qtyRequired" + sct.subCategoryId}
                                        onChange={(e) => setqtyRequired(e.target.checked)}/>}
                            </td>
                            <td>
                                {sct.matGroupCount}
                            </td>
                            <td>
                                {sct.isEditRow == null ?  sct.categoryDetail.categoryName:
                                    <select className="form-select col-md-9" onChange={(e) => setSelectedCategory(e.target.value)} >
                                        <option value="0">Select Order Type</option>
                                        {ddlCategory.map(um => <option key={um.categoryId} value={um.categoryId}>
                                            {um.categoryName}
                                        </option>)}
                                    </select>}
                            </td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    id={"isActive"+sct.subCategoryId}
                                    checked={sct.isActive}
                                    onChange={(e) => handleIsActiveClick(sct.subCategoryId, e)}/>
                            </td>
                            <td>
                                {sct.isEditRow == false || sct.isEditRow == null ?
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => handleShowEdit(sct)}
                                        title="edit">
                                        <BsPencilFill/>
                                    </button>
                                    :
                                    <button type="button"
                                        className="btn btn-success mr-1"
                                        onClick={() => saveClick(sct.subCategoryId)}>
                                        <FontAwesomeIcon icon={faSave} />
                                    </button>
                                }
                                {sct.isEditRow == true ?
                                    <a href='javascript:void(0)' onClick={() => handleCancelEdit(sct)} class="btn btn-danger float-right">
                                        <i class="fas fa-light fa-times"></i>
                                    </a> : null}
                            </td>
                        </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Field Confirm</th>
                            <th>SN Required</th>
                            <th>Qty Required</th>
                            <th>Grouping Count</th>
                            <th>Category Name</th>
                            <th>Is Active</th>
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
                <Modal.Title>Add New Sub Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SubCategoryPanel/>
            </Modal.Body>
            {/* <Modal.Footer>
                    <Button variant="primary" onClick={saveClick}>Save</Button>
                </Modal.Footer> */}
        </Modal>
        </>
    );
};

export default mScopeList;
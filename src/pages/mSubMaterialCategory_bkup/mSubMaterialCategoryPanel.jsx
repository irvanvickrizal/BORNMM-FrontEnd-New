/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
import React, {Component,useState,useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'

import {Button} from '@components';
//Bootstrap and jQuery libraries
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-buttons/js/dataTables.buttons"

import {useDispatch,useSelector} from 'react-redux';
import API  from '../../utils/apiServices';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';


const mSubMaterialCategoryPanel = (props) => {
    const user = useSelector((state) => state.auth.user);
    const [ddlCategory,setDdlCategory] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState("");

    const [subCategoryName,setSubCategoryName] = useState("");
    const [subCategoryCode,setSubCategoryCode] = useState("");
    const [fieldConfirm, setFieldConfirm] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [snRequired, setSnRequired] = useState(false);
    const [qtyRequired, setqtyRequired] = useState(false);

    
    const dispatch = useDispatch();
    function getDDLCategory(){
        API.getMaterialCategory().then(
            result=>{
                console.log('i am DDL cate',result);
                const filtered = result.filter( (auto) => auto.isActive==true)
                //const activeCategory = result.categoryName.includes("true");
                setDdlCategory(filtered);
            }
        )
    }
    function saveClick(){
        const body = (
            {
                "subCategoryId" : 0,
                "subCategoryName" : subCategoryName,
                "CategoryDetail":{
                    "categoryId": selectedCategory
                },        
                "fieldConfirm":fieldConfirm,
                "snRequired":snRequired,
                "qtyRequired":qtyRequired,
                "subCategoryCode" : subCategoryCode,
                "lmby": user.uid   
            }
        )
        API.postSubMaterialCategory(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    //window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )
    }
    

    useEffect(() => {
        getDDLCategory();
    },[])
    
    return (
        
        <><div className="card-body">
            <div className='row g-3'>
                <div className='col-md-12 '>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Sub Category Name </span>
                        <input onChange={(e) => setSubCategoryName(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Sub Category Code </span>
                        <input onChange={(e) => setSubCategoryCode(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Category </span>
                        <select className="form-select col-md-9" onChange={(e) => setSelectedCategory(e.target.value)} >
                            <option value="0">Select Category</option>
                            {ddlCategory.map(um => <option key={um.categoryId} value={um.categoryId}>
                                {um.categoryName}
                            </option>)}
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Field Confirm </span>
                        <div class="form-control col-md-9">
                            <Form.Check 
                                type="switch"
                                id="fieldConfirm"
                                onChange={(e) => setFieldConfirm(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">SN Required </span>
                        <div class="form-control col-md-9">
                            <Form.Check 
                                type="switch"
                                id="snRequired"
                                onChange={(e) => setSnRequired(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">QTY Required </span>
                        <div class="form-control col-md-9">
                            <Form.Check 
                                type="switch"
                                id="qtyRequired"
                                onChange={(e) => setqtyRequired(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
                <Modal.Footer>
                    <Button variant="primary" onClick={saveClick}>Save</Button>
                </Modal.Footer>
            </div>
        </div>
        </>
    );
};

export default mSubMaterialCategoryPanel;
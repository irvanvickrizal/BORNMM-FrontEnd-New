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

import {useDispatch} from 'react-redux';
import API  from '../../utils/apiServices';
import { toast } from 'react-toastify';


const mScopePanel = (props) => {

    const [scopeName,setScopeName] = useState("");
    const [scopeDesc,setScopeDesc] = useState("");
    const [categoryList,setCategoryList] = useState("");
    
    const dispatch = useDispatch();



    function saveClick(){
        const body = (
            {
                "ScopeName":scopeName,
                "ScopeDesc":scopeDesc,
                "CMINFO":{
                    "LMBY":0
                }
            }
        )
        API.postmScope(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    window.location.reload();
                }
                else{
                    toast.error(result.message);
                }
            }
        )
    }
    

    useEffect(() => {
    },[])
    
    return (
        
        <><div className="card-body">
            <div className='row g-3'>
                <div className='col-md-12 '>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Material Name </span>
                        <input onChange={(e) => setScopeName(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Material Code </span>
                        <input onChange={(e) => setScopeDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Scope Desc </span>
                        <input onChange={(e) => setScopeDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Scope Desc </span>
                        <input onChange={(e) => setScopeDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Scope Desc </span>
                        <input onChange={(e) => setScopeDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
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

export default mScopePanel;
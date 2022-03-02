/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-template */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
import React, {Component,useState,useEffect} from 'react';

import axios from 'axios';

import {variables} from '../../Variables';
import {Button, ContentHeader} from '@components';
//Bootstrap and jQuery libraries
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-buttons/js/dataTables.buttons"

import $ from 'jquery'; 
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import API  from '../../utils/apiServices';
import { setIsEdit, setIsNew } from '@app/store/reducers/dop';

const CustomerPOPanel = (props) => {
    
    const dispatch = useDispatch();

    function cancelClick(){
        dispatch(setIsNew(false));
        dispatch(setIsEdit(false));
    }

    useEffect(() => {
        
    },[])
    
    return (
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">Customer PO Panel</h3>
            </div>
            <div className="card-body">
                <div className='row g-3'>
                    <div className='col-md-12 '>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">DOP </span>
                            <input type="text" class="form-control" placeholder="Name" aria-label="Username" aria-describedby="basic-addon1"/>
                            <input type="text" class="form-control" placeholder="Code" aria-label="Username" aria-describedby="basic-addon1"/>
                            <input type="text" class="form-control" placeholder="Type" aria-label="Username" aria-describedby="basic-addon1"/>
                            <input type="text" class="form-control" placeholder="Desc" aria-label="Username" aria-describedby="basic-addon1"/>
                            <input type="text" class="form-control" placeholder="Destination" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                    </div>
                    <div className='col-md-12 text-right'>
                        <button type="button" className="btn btn-primary m-2 pull-right ">
                        Save
                        </button>
                        <button type="button" className="btn btn-warning m-2 pull-right " onClick={cancelClick}>
                        Cancel
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default CustomerPOPanel;
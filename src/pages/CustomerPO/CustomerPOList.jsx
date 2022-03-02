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
import API  from '../../utils/apiServices';
import {useDispatch,useSelector} from 'react-redux';
import {setCardTitle} from '@store/reducers/pagetext';
import { setIsEdit, setIsNew } from '@app/store/reducers/dop';
import {toast} from 'react-toastify';


const CustomerPOlist = () => {

    const [dopData,setDopData] = useState([]);
    const isNew = useSelector((state) => state.dop.isNew);
    const isEdit = useSelector((state) => state.dop.isEdit);
    const dispatch = useDispatch();

    function getDOP(){
        API.getDOPList().then(
            result=>{
                console.log('i am DOP',result)
                setDopData(result);
            }
        )
    } 

    function addClick(){
        //const dispatch = useDispatch(setIsNew(true));
        dispatch(setIsNew(true));
    }

    function editClick(){
        dispatch(setIsNew(true));
        toast.success('test');
    }

    useEffect(() => {
        getDOP();
        setTimeout(()=>{                        

            var t = $('#tblDOP').DataTable( {
                "columnDefs": [ {
                    "searchable": false,
                    "orderable": false,
                    "targets": 0
                } ],
                "order": [[ 1, 'asc' ]],
                orderCellsTop: true,
                fixedHeader: false,
                responsive:true,
                autoWidth: true,
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
        <div className="card card-primary">
            <div className="card-header align-middle">
                <h3 className="card-title">Customer PO List</h3>
                <a href='javascript:void(0)' onClick={addClick} class="btn btn-warning float-right">
                    <i class="fas fa-plus"></i>
                </a>
            </div>
            <div className="card-body">
                <table id="tblDOP" className="display table table-striped table-bordered table-sm row-border hover mb-5" aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>DOP Name</th>
                            <th>DOP Code</th>
                            <th>Type</th>
                            <th>Desc</th>
                            <th>Destination</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dopData.map(dop =>
                            <tr key={dop.DOPId}>
                                <td></td>
                                <td>{dop.DOPName}</td>
                                <td>{dop.DOPCode}</td>
                                <td>{dop.DOPType}</td>
                                <td>{dop.DOPDesc}</td>
                                <td>{dop.DOPDestName}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={()=>editClick(dop)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    {dop.datainused == 0 ?
                                        <button type="button"
                                            className="btn btn-light mr-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </button> : null}
                                </td>
                            </tr>    
                        )}
                        {/* {this.state.materials.map(mat =>
                            <tr key={mat.material_id}>
                                <td>{mat.material_id}</td>
                                <td>{mat.cs_code}</td>
                                <td>{mat.item_material}</td>
                                <td>{mat.category_name}</td>
                                <td>{mat.uom}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#AddUpdateModal"
                                        onClick={() => this.editClick(mat)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    {mat.datainused == 0 ?
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            onClick={() => this.deleteClick(mat.material_id, mat.item_material)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                        </button> : null}
                                </td>
                            </tr>
                        )} */}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>NO</th>
                            <th>DOP Name</th>
                            <th>DOP Code</th>
                            <th>Type</th>
                            <th>Desc</th>
                            <th>Destination</th>
                            <th>Option</th>
                        </tr>
                    </tfoot>
                </table>  
            </div>
        </div>
    );
};

export default CustomerPOlist;
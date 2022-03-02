/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable prefer-template */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
import React, {Component, useContext, useRef} from 'react';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import {variables} from '../../Variables';
import {ContentHeader} from '@components';
//Bootstrap and jQuery libraries
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-fixedheader/js/dataTables.fixedHeader";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-bs4/js/dataTables.bootstrap4"
import "datatables.net-buttons/js/dataTables.buttons"

import $ from 'jquery'; 
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
    
import {toast} from 'react-toastify';
import API  from '../../utils/apiServices';
// const cardTitle = "Material Category";
// dispatch(setCardTitle(cardTitle));

const token = localStorage.getItem('token');

export default class MMaterialCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            cols: [],
            norows: 0,
            CategoryId: 0,
            CategoryName: '',
            LMBY: 1
        };
    }
       
    componentDidMount() {
        
        this.refreshList();
        setTimeout(()=>{                        

            var t = $('#tblMaterialCategory').DataTable( {
                "columnDefs": [ {
                    "searchable": false,
                    "orderable": false,
                    "targets": 0
                } ],
                "order": [[ 1, 'asc' ]],
                orderCellsTop: true,
                responsive:true,
                autoWidth: true,
                search:true
            } );

            t.on( 'order.dt search.dt', function () {
                t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                    cell.innerHTML = i+1;
                } );
            } ).draw();

            }, 2000);
    }

    refreshList() {
        API.getMaterialCategory().then(
            result=>{
                console.log('i am Scope',result)
                this.setState({categories: result});
            }
        )
    }

    getDataList() {
        axios.get(variables.API_URL + 'mastermaterialcategory')
        .then(res => 
            {
            this.setState({categories: res.data.rows});
        }); 
    }

    changeCategoryName = (e) => {
        this.setState({ CategoryName: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add New Category",
            CategoryId: 0,
            CategoryName: "",
            LMBY: 1

        });
        this.refreshList();
    }

    editClick(cat) {
        console.log(cat);
        this.setState({
            modalTitle: "Edit Category",
            CategoryId: cat.categoryId,
            CategoryName: cat.categoryName,
            LMBY: 0
        });
    }

    handleIsActiveClick(categoryId, e ){
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "Id": categoryId,
                "actstatus": e.target.checked,
                "lmby": 0       
            }
            console.log(body);
            API.putmMaterialActiveStatus(body).then(
                result=>{
                    console.log("put scope: ", result);
                    if(result.status=="success")
                    {
                        toast.success(result.message);
                        this.refreshList();
                        //window.location.reload();
                    }
                    else{
                        toast.error(result.message);
                    }
                }
            )
        }
    }


    createClick() {
        fetch(variables.API_URL + 'mastermaterialcategory', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ CategoryName: this.state.CategoryName, LMBY: 1 })
        })
        .then(res => res.json())
        .then((result) => {
            alert(result.message);
            window.location.reload();
        }, (error) => { alert('failed'); })

    }

    updateClick() {
        fetch(variables.API_URL + 'mastermaterialcategory', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ CategoryId: this.state.CategoryId, CategoryName: this.state.CategoryName, LMBY: 1 })
        })
            .then(res => res.json())
            .then((result) => {
                this.refreshList();
                window.location.reload();
            }, (error) => { alert('failed'); })

    }

    deleteClick(id, name) {
        if (window.confirm('Are you sure you want to delete ' + name + '?')) {

            fetch(variables.API_URL + 'mastermaterialcategory/' + id, {
                method: 'Delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => { alert('failed'); })
        }

    }
    
    render() {
        const { categories,
            modalTitle,
            CategoryId,
            CategoryName,
            LMBY
        } = this.state;
        return (
            <div>
            <HeaderChanger title="Material Category" />
            <button type="button" className="btn btn-primary m-2 pull-right"
                        data-bs-toggle="modal"
                        data-bs-target="#AddUpdateModal"
                        onClick={() => this.addClick()}>
                        Add New Category
                        </button>
                        <table id="tblMaterialCategory" className="display table table-striped table-bordered table-sm row-border hover mb-5" >
                        <thead>
                            <tr>
                                <th></th>
                                <th>CategoryName</th>
                                <th>Grouping Count</th>
                                <th>Is Active</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.categories.map(cat =>
                                <tr key={cat.categoryId}>
                                    <td></td>
                                    <td>{cat.categoryName}</td>
                                    <td>{cat.matGroupCount}</td>
                                    <td>
                                        <Form.Check
                                        type="switch"
                                        id={cat.categoryId}
                                        checked={cat.isActive}
                                        onChange={(e) => this.handleIsActiveClick(cat.categoryId, e)} />
                                    </td>
                                    <td>
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#AddUpdateModal"
                                            onClick={() => this.editClick(cat)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>CategoryName</th>
                                <th>Grouping Count</th>
                                <th>Is Active</th>
                                <th>Options</th>
                            </tr>
                        </tfoot>
                        </table>
                <div className="modal fade" id="AddUpdateModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text"> CategoryName</span>
                                    <input type="text" className="form-control" value={CategoryName} onChange={this.changeCategoryName} />
                                </div>
                                {CategoryId == 0 ? <button type="button" className="btn btn-primary float-start" onClick={() => this.createClick()}>Create</button> : null}
                                {CategoryId != 0 ? <button type="button" className="btn btn-primary float-start" onClick={() => this.updateClick()}>Update</button> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable prefer-template */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';
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

import $ from 'jquery'; 
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import API from '@app/utils/apiServices';

const token = localStorage.getItem('token');

export default class MMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTitle: "",
            materials: [],
            categories: [],
            MaterialId: 0,
            CategoryId: 0,
            MaterialName: "",
            MaterialCode: "",
            CMINFO: { LMBY: 1 },
            uOM: { UOMId: 0 }
        }
    }

    componentDidMount() {
        this.refreshCategoryList();
        this.refreshList();
        this.refreshUOMList();
        setTimeout(()=>{                        

            var t = $('#tblMaterial').DataTable( {
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

            }, 2000);
    }

    changeMaterialName = (e) => {
        this.setState({ MaterialName: e.target.value })
    }

    changeMaterialCode = (e) => {
        this.setState({ MaterialCode: e.target.value })
    }

    changeMaterialCategory = (e) => {
        this.setState({ CategoryId: e.target.value })
    }

    changeUOM = (e) => {
        this.setState({ uOM: { UOMId: e.target.value } })
    }

    refreshList() {
        API.getmMaterialList().then(
            result=>{
                this.setState({ materials: result });
            }
        )
        // fetch(variables.API_URL + 'mastermaterial')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ materials: data });
        //     });
    }

    refreshCategoryList() {
        fetch(variables.API_URL + 'mastermaterialcategory')
            .then(response => response.json())
            .then(data => {
                this.setState({ categories: data });
            });
    }
    
    refreshUOMList() {
        API.getUomList().then(
            result=>{
                console.log('uom:',result);
                this.setState({ uoms: result });
            }
        )
        // fetch(variables.API_URL + 'mastermaterial/UOMGetList',{
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        //     })
        //     .then(response => {
        //         console.log('uom',response.json())
        //     })
        //     .then(data => {
        //         this.setState({ uoms: data });
        //     });
    }

    addClick() {
        this.setState({
            modalTitle: "Add New Material",
            MaterialId: 0,
            CategoryId: 0,
            MaterialName: "",
            MaterialCode: "",
            CMINFO: { LMBY: 1 },
            uOM: { UOMId: 0 }
        });
    }

    editClick(mat) {
        this.setState({
            modalTitle: "Edit Material",
            MaterialId: mat.materialId,
            MaterialName: mat.itemMaterial,
            MaterialCode: mat.materialCode,
            CategoryId: mat.categoryIf,
            cminfo: { modifiedUser: 1 },
            uOM: { UOMId: mat.uomName }
        });
    }

    deleteClick(id, name) {
        if (window.confirm('Are you sure you want to delete ' + name + '?')) {

            fetch(variables.API_URL + 'mastermaterial/' + id, {
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

    updateClick() {
        fetch(variables.API_URL + 'mastermaterial', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ MaterialId: this.state.MaterialId, MaterialName: this.state.MaterialName, MaterialCode: this.state.MaterialCode, CategoryId: this.state.CategoryId, CMINFO: { LMBY: 1 }, uOM: this.state.uOM })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => { alert('failed'); })

    }

    createClick() {

        fetch(variables.API_URL + 'mastermaterial', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ MaterialId: 0, MaterialName: this.state.MaterialName, MaterialCode: this.state.MaterialCode, CategoryId: this.state.CategoryId, CMINFO: { LMBY: 1 }, uOM: this.state.uOM })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => { alert('failed'); })

    }

    render() {
        const {
            modalTitle,
            materials,
            uoms,
            categories,
            MaterialId,
            CategoryId,
            MaterialName,
            MaterialCode,
            CMINFO: { LMBY },
            uOM: { UOMId }
        } = this.state;
        return (
            <div>
                <HeaderChanger title="Material" />
                <button type="button" class="btn btn-primary m-2 pull-left "
                    data-bs-toggle="modal"
                    data-bs-target="#AddUpdateModal"
                    onClick={() => this.addClick()}>
                    Add New Material
                </button>
                <table id="tblMaterial" className="display table table-striped table-bordered table-sm row-border hover mb-5" aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Material Code</th>
                            <th>Material Name</th>
                            <th>Category Name</th>
                            <th>Sub Category Name</th>
                            <th>Item Level Name</th>
                            <th>UOM</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.materials.map(mat =>
                            <tr key={mat.materialId}>
                                <td></td>
                                <td>{mat.materialCode}</td>
                                <td>{mat.materialName}</td>
                                <td>{mat.subCategoryDetail.categoryDetail.categoryName}</td>
                                <td>{mat.subCategoryDetail.subCategoryName}</td>
                                <td>{mat.itemLevelDetail.itemLevelName}</td>
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
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>No</th>
                            <th>Material Code</th>
                            <th>Material Name</th>
                            <th>Category Name</th>
                            <th>Sub Category Name</th>
                            <th>Item Level Name</th>
                            <th>UOM</th>
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
                                    <span className="input-group-text"> Material Code</span>
                                    <input type="text" className="form-control" value={MaterialCode} onChange={this.changeMaterialCode} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"> Material Name</span>
                                    <input type="text" className="form-control" value={MaterialName} onChange={this.changeMaterialName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"> Material Category</span>
                                    <select className="form-select" onChange={this.changeMaterialCategory} value={CategoryId}>
                                        {/* <option value="0">Select Category</option>
                                        {categories.map(cat => <option key={cat.category_id} value={cat.categoryId}>
                                            {cat.categoryName}
                                        </option>)} */}
                                    </select>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"> Unit of Measurement</span>
                                    <select className="form-select" onChange={this.changeUOM} value={UOMId}>
                                        {/* <option value="0">Select UoM</option>
                                        {uoms.map(um => <option key={um.uomId} value={um.uomId}>
                                            {um.uomName}
                                        </option>)} */}
                                    </select>
                                </div>
                                {MaterialId == 0 ? <button type="button" className="btn btn-primary float-start" onClick={() => this.createClick()}>Create</button> : null}
                                {MaterialId != 0 ? <button type="button" className="btn btn-primary float-start" onClick={() => this.updateClick()}>Update</button> : null}
                            </div>
                        </div>
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
                <Modal.Title>Add New Material</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <POScopePanel/>
            </Modal.Body>
            {/* <Modal.Footer>
                    <Button variant="primary" onClick={saveClick}>Save</Button>
                </Modal.Footer> */}
            </Modal>
            </div>
        );
    }
}
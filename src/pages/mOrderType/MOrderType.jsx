/* eslint-disable func-names */
/* eslint-disable no-alert */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable prefer-template */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';

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

const token = localStorage.getItem('token');
export default class MMaterialJS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTitle: "",
            ordertypes: [],
            OrderTypeId: 0,
            OrderTypeName: "",
            OrderTypeCode: "",
            OrderTypeQString: "",
            CMINFO: { LMBY: 1, IsActive: 1 }
        }
    }

    componentDidMount() {
        this.refreshList();
        setTimeout(()=>{                        

            var t = $('#tblOrderType').DataTable( {
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
    }

    changeOrderTypeName = (e) => {
        this.setState({ OrderTypeName: e.target.value })
    }

    changeOrderTypeCode = (e) => {
        this.setState({ OrderTypeCode: e.target.value })
    }

    changeOrderTypeQString = (e) => {
        this.setState({ OrderTypeQString: e.target.value })
    }

    changeActivation = (e) => {
        this.setState({ CMINFO: { LMBY: 1, IsActive: e.target.value } })
    }

    refreshList() {
        fetch(variables.API_URL + 'masterordertype',
        {headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }})
        .then(response => response.json())
        .then(data => {
            this.setState({ ordertypes: data });
        });
    }

    addClick() {
        this.setState({
            modalTitle: "Add New Order Type",
            OrderTypeId: 0,
            OrderTypeName: "",
            OrderTypeCode: "",
            OrderTypeQString: "",
            CMINFO: { LMBY: 1, IsActive: 1 }
        });
    }

    editClick(ort) {
        this.setState({
            modalTitle: "Edit Order Type",
            OrderTypeId: ort.orderTypeId,
            OrderTypeName: ort.orderTypeName,
            OrderTypeCode: ort.orderTypeCode,
            OrderTypeQString: ort.orderTypeQString,
            CMINFO: { LMBY: 0 }
        });
    }

    deleteClick() {
        fetch(variables.API_URL + 'masterordertype/ordertypedeletetemp', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ OrderTypeId: this.state.OrderTypeId, CMINFO: { LMBY: 1 } })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => { alert('failed'); })

    }

    setActivationClick(e,id) {
        fetch(variables.API_URL + 'masterordertype/ordertypesetactivation', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                "id":id,
                "actStatus":e.target.checked,
                "lmby":0 
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result.message);
                this.refreshList();
            }, (error) => { alert('failed'); })

    }

    updateClick() {
        fetch(variables.API_URL + 'masterordertype', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ OrderTypeId: this.state.OrderTypeId, OrderTypeName: this.state.OrderTypeName, OrderTypeCode: this.state.OrderTypeCode, OrderTypeQString: this.state.OrderTypeQString, CMINFO: { LMBY: 1 } })
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                alert(result);
                this.refreshList();
            }, (error) => { alert('failed'); })

    }

    createClick() {

        fetch(variables.API_URL + 'masterordertype', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ OrderTypeName: this.state.OrderTypeName, OrderTypeCode: this.state.OrderTypeCode, OrderTypeQString: this.state.OrderTypeQString, CMINFO: { LMBY: 1 } })
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
            ordertypes,
            OrderTypeId,
            OrderTypeName,
            OrderTypeCode,
            OrderTypeQString,
            CMINFO: { LMBY, IsActive }
        } = this.state;
        return (
            <div>
                <HeaderChanger title="Order Type" />
                <button type="button"
                    hidden="hidden"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#AddUpdateModal"
                    onClick={() => this.addClick()}> 
                    Add New Order Type
                </button>
                <table id="tblOrderType" class="display table table-striped table-bordered table-sm row-border hover mb-5" aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>OrderType Id</th>
                            <th>OrderType Code</th>
                            <th>OrderType Name</th>
                            <th>OrderType QString</th>
                            <th>Is Active</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.ordertypes.map(ort =>
                            <tr key={ort.orderTypeId}>
                                <td>{ort.orderTypeId}</td>
                                <td>{ort.orderTypeCode}</td>
                                <td>{ort.orderTypeName}</td>
                                <td>{ort.orderTypeQString}</td>
                                <td>
                                    <div className="toggle-switch">
                                        <input type="checkbox" className="checkbox"
                                            name={'chk' + ort.orderTypeId} id={'chk' + ort.orderTypeId}
                                            checked={ort.cminfo.isActive}
                                            onChange={e => this.setActivationClick(e,ort.orderTypeId)} />
                                        <label className="label" htmlFor={'chk' + ort.orderTypeId}>
                                            <span className="inner" />
                                            <span className="switch" />
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#AddUpdateModal"
                                        onClick={() => this.editClick(ort)}>
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
                            <th>OrderType Id</th>
                            <th>OrderType Code</th>
                            <th>OrderType Name</th>
                            <th>OrderType QString</th>
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
                                    <span className="input-group-text"> OrderType Code</span>
                                    <input type="text" className="form-control" value={OrderTypeCode} onChange={this.changeOrderTypeCode} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"> OrderType Name</span>
                                    <input type="text" className="form-control" value={OrderTypeName} onChange={this.changeOrderTypeName} />
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"> OrderType QString</span>
                                    <input type="text" className="form-control" value={OrderTypeQString} onChange={this.changeOrderTypeQString} />
                                </div>


                                {OrderTypeId == 0 ? <button type="button" className="btn btn-primary float-start" onClick={() => this.createClick()}>Create</button> : null}
                                {OrderTypeId != 0 ? <button type="button" className="btn btn-primary float-start" onClick={() => this.updateClick()}>Update</button> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
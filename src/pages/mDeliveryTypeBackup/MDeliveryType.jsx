/* eslint-disable class-methods-use-this */
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

import API  from '../../utils/apiServices';

export default class MDeliveryType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTitle: "",
            deliverytypes: [],
            DeliveryTypeId: 0,
            DeliveryTypeName: "",
            IsInboundReq: 0,
            IsLTRRequired: 0,
            orderType: { OrderTypeId: 0, OrderTypeName: "" },
            CMINFO: { LMBY: 1, IsActive: 1 }
        }
    }

    componentDidMount() {
        this.refreshList();

        setTimeout(()=>{                        

            var t = $('#tblDeliveryType').DataTable( {
                "columnDefs": [ 
                    // {width: '9%', targets: 13}
                    
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

    }

    // fetch(variables.API_URL + 'masterdeliverytype')
        //     .then(response => response.json())
        //     .then(data => {
        //         this.setState({ deliverytypes: data });
        //         console.log(this.state.deliverytypes);
        //     });
    refreshList() {
        API.getmDeliveryType().then(
            result=>{
                console.log('i am delivery',result);
                this.setState({ deliverytypes: result });
            }
        );
    }

    setActivationClick(e, id, chktype,chkname) {
        var strMessage = '';
        if (chktype == 'CHKINBOUNDREQ') {
            strMessage = 'Are you sure you want to change Inbound Required status of activation for ' + chkname + ' ?';
        }
        else if (chktype == "CHKLTRREQ") {
            strMessage = 'Are you sure you want to change LTR Required status of activation for ' + chkname + ' ?';
        }
        else if (chktype == "CHKISACTIVE") {
            strMessage = 'Are you sure you want to change status of activation for ' + chkname + ' ?';
        }
        if (window.confirm(strMessage)) {
            fetch(variables.API_URL + 'masterdeliverytype/MasterDeliveryType_Checklist_U', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, chkType: chktype, chkValue: e.target.checked, lmby: 1 })
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => { alert('failed'); })
        }        
    }

    render() {
        const {
            deliverytypes,
            DeliveryTypeId,
            DeliveryTypeName,
            IsInboundReq,
            IsLTRRequired,
            orderType: { OrderTypeId, OrderTypeName},
            CMINFO: { LMBY, isActive }
        } = this.state;
        return (
            <div>
                
                <HeaderChanger title="Delivery Type"/>

                <table id="tblDeliveryType" class="display table table-striped table-bordered table-sm row-border hover mb-5">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>DeliveryType Name</th>
                            <th>Order Type</th>
                            <th>Inbound Required?</th>
                            <th>LTR Required?</th>                            
                            <th>Is Active?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.deliverytypes.map(det =>
                            <tr key={det.deliveryTypeId}>
                                <td>{det.deliveryTypeId}</td>
                                <td>{det.deliveryTypeName}</td>
                                <td>{det.orderType.orderTypeName}</td>
                                <td>
                                    <div className="toggle-switch">
                                        <input type="checkbox" className="checkbox"
                                            name={'chkInbound' + det.DeliveryTypeId} id={'chkInbound' + det.DeliveryTypeId}
                                            checked={det.IsInboundReq}
                                            onChange={e => this.setActivationClick(e, det.DeliveryTypeId, "CHKINBOUNDREQ", det.DeliveryTypeName)}/>
                                        <label className="label" htmlFor={'chkInbound' + det.DeliveryTypeId}>
                                            <span className="inner" />
                                            <span className="switch" />
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <div className="toggle-switch">
                                        <input type="checkbox" className="checkbox"
                                            name={'chkLTR' + det.DeliveryTypeId} id={'chkLTR' + det.DeliveryTypeId}
                                            checked={det.IsLTRRequired}
                                            onChange={e => this.setActivationClick(e, det.DeliveryTypeId, "CHKLTRREQ", det.DeliveryTypeName)}/>
                                        <label className="label" htmlFor={'chkLTR' + det.DeliveryTypeId}>
                                            <span className="inner" />
                                            <span className="switch" />
                                        </label>
                                    </div>
                                </td>
                                
                                <td>
                                    <div className="toggle-switch">
                                        <input type="checkbox" className="checkbox"
                                            name={'chkIsActive' + det.DeliveryTypeId} id={'chkIsActive' + det.DeliveryTypeId}
                                            checked={det.cminfo.isActive}
                                            onChange={e => this.setActivationClick(e, det.DeliveryTypeId, "CHKISACTIVE", det.DeliveryTypeName)}/>
                                        <label className="label" htmlFor={'chkIsActive' + det.DeliveryTypeId}>
                                            <span className="inner" />
                                            <span className="switch" />
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>No</th>
                            <th>DeliveryType Name</th>
                            <th>Order Type</th>
                            <th>Inbound Required?</th>
                            <th>LTR Required?</th>                            
                            <th>Is Active?</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        );
    }
}
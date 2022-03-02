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
import { setIsEdit, setIsNew, setDOP } from '@app/store/reducers/dop';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';


const mDOPPanel = (props) => {
    const [show, setShow] = useState(false);
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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    function cancelClick(){
        dispatch(setIsNew(false));
        dispatch(setIsEdit(false));
    }

    function saveClick(){
        const body = (
            {
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
        )
        API.postDOPData(body).then(
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
        //toast.success("data saved successfully")
        //console.log("dopName : ",dopName," dopCode : ",dopCode, "Order Type : ", orderType, "is CWH", isCWH)
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
                console.log('i am subcon',result)
                setddlSubconName(result);
            }
        )
    }

    const changeOrderType = (e) => {
        setSelectedOrderType(e.target.value);
        console.log(selectedOrderType);
    }


    useEffect(() => {
        getOrderType();
        getSubcon();
    },[])
    
    return (
        
        <><div className="card-body">
            <div className='row g-3'>
                <div className='col-md-12 '>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">DOP Name </span>
                        <input value={dopName} onChange={(e) => setDopName(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">DOP Code </span>
                        <input onChange={(e) => setDopCode(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">DOP Type </span>
                        <input onChange={(e) => setDopType(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">DOP Desc </span>
                        <input onChange={(e) => setDopDesc(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">DOP Destination </span>
                        <input onChange={(e) => setDopDest(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">DOP Address </span>
                        {/* <input onChange={(e) => setDopAddress(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" /> */}
                        <Form.Control
                            as="textarea"
                            style={{ height: '100px' }}
                            onChange={(e) => setDopAddress(e.target.value)}
                        />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Is Main CWH </span>
                        <div class="form-control col-md-9">
                            <Form.Check 
                                type="switch"
                                id="isMainCWH"
                                onChange={(e) => setIsMainCWH(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Is CWH </span>
                        <div class="form-control col-md-9">
                            <Form.Check 
                                type="switch"
                                id="isCWH"
                                onChange={(e) => setIsCWH(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Is Site </span>
                        <div class="form-control col-md-9">
                            <Form.Check 
                                type="switch"
                                id="isSite"
                                onChange={(e) => setIsSite(e.target.checked)}
                            />
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Order Type </span>
                        <select className="form-select col-md-9" onChange={(e) => setSelectedOrderType(e.target.value)} value={ddlOrderType.orderTypeId}>
                            <option value="0">Select Order Type</option>
                            {ddlOrderType.map(um => <option key={um.orderTypeId} value={um.orderTypeId}>
                                {um.orderTypeName}
                            </option>)}
                        </select>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Subcon Name </span>
                        <select className="form-select col-md-9" onChange={(e) => setSelectedSubcon(e.target.value)} value={ddlSubconName.subconId}>
                            <option value="0">Select Subcon</option>
                            {ddlSubconName.map(um => <option key={um.subconId} value={um.subconId}>
                                {um.subconName}
                            </option>)}
                        </select>
                    </div>
                </div>
                <Modal.Footer>
                    <Button variant="primary" onClick={saveClick}>Save</Button>
                </Modal.Footer>
                {/* <div className='col-md-12 text-right'>
                    <button type="button" className="btn btn-primary m-2 pull-right " onClick={saveClick}>
                        Save
                    </button>
                    <button type="button" className="btn btn-warning m-2 pull-right " onClick={cancelClick}>
                        Cancel
                    </button>
                </div> */}

            </div>
        </div>
        </>
    );
};

export default mDOPPanel;
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

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const mScopePanel = (props) => {

    const [CPONo,setCPONo] = useState("");
    const [CPONoOriginal,setCPONoOriginal] = useState("");
    const [CPODate,setCPODate] = useState("");
    const [ProjectName,setProjectName] = useState("");
    const [ContractName,setContractName] = useState("");
    
    const [scopeName,setScopeName] = useState("");
    const [scopeDesc,setScopeDesc] = useState("");

    const [ddlPOData,setDdlPOData] = useState([]);
    const [ddlScopeData,setDdlScopeData] = useState([]);
    const [selectedPO,setSelectedPO] = useState("");
    const [selectedScope,setSelectedScope] = useState("");

    const dispatch = useDispatch();

    function getDDLPOList(){
        API.getPOList().then(
            result=>{
                const filtered = result.filter( (auto) => auto.cminfo.isActive==true)
                setDdlPOData(filtered);
            }
        )
    } 
    function getDDLScope(){
        API.getmScope().then(
            result=>{
                const filtered = result.filter( (auto) => auto.cminfo.isActive==true)
                setDdlScopeData(filtered);
            }
        )
    } 

    function handleDDLPOChange(cpoId){
        const po = ddlPOData.filter( (auto) => auto.cpoId==cpoId)
        setSelectedPO(cpoId)
        setCPONoOriginal(po[0].cpoNoOriginal);
        setCPODate(po[0].cpoDateStr);
        setProjectName(po[0].projectName);
        setContractName(po[0].contractName);

    }
    
    function handleDDLScopeChange(scopeId){
        const scope = ddlScopeData.filter( (auto) => auto.scopeId==scopeId)
        setSelectedScope(scopeId)
        setScopeName(scope[0].scopeName);
        setScopeDesc(scope[0].scopeDesc);
    }

    function saveClick(){
        const body = (
            {
                "PODetail":{
                    "cpoId":selectedPO     
                },
                "ScopeDetail":{
                    "scopeId":selectedScope     
                },
                "CMINFO":{
                    "LMBY":0
                }
            }
        )
        console.log(body);
        API.postPOScope(body).then(
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
        getDDLPOList();
        getDDLScope();
    },[])
    
    return (
        
        <><div className="card-body">
            <div className='row g-3'>
                <div className='col-md-12 '>
                    <div class="input-group mb-3">
                        {/* <span class="input-group-text col-md-3" id="basic-addon1">PO NO </span> */}
                        {/* <input onChange={(e) => setCPONo(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" /> */}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                            <InputLabel id="demo-simple-select-standard-label">Select PO NO</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                onChange={(e) => handleDDLPOChange(e.target.value)}
                                // label={row.uom}
                            >
                                {ddlPOData.map(um => <MenuItem value={um.cpoId}>
                                    {um.cpoNo}
                                </MenuItem> )}
                            </Select>
                        </FormControl>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">PO NO Original</span>
                        <input value={CPONoOriginal} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">PO Date</span>
                        <input value={CPODate} type="date" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Project Name</span>
                        <input value={ProjectName} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Contract Name</span>
                        <input value={ContractName} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div className='col-md-12 '>
                    <div class="input-group mb-3">
                        {/* <span class="input-group-text col-md-3" id="basic-addon1">PO NO </span> */}
                        {/* <input onChange={(e) => setCPONo(e.target.value)} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" /> */}
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                            <InputLabel id="demo-simple-select-standard-label">Select Scope</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                onChange={(e) => handleDDLScopeChange(e.target.value)}
                                // label={row.uom}
                            >
                                {ddlScopeData.map(um => <MenuItem value={um.scopeId}>
                                    {um.scopeName}
                                </MenuItem> )}
                            </Select>
                        </FormControl>
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Scope Name</span>
                        <input value={scopeName} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text col-md-3" id="basic-addon1">Scope Desc</span>
                        <input value={scopeDesc} type="text" class="form-control col-md-9" aria-label="Username" aria-describedby="basic-addon1" />
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
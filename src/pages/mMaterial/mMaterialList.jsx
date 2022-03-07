/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unescaped-entities */
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
import "datatables.net-fixedcolumns/js/dataTables.fixedColumns.min.js";

import $ from 'jquery'; 
import API  from '../../utils/apiServices';
import MaterialPanel from './mMaterialPanel';
import {useDispatch,useSelector} from 'react-redux';
import { setIsEdit, setIsNew } from '@app/store/reducers/scope';
import {toast} from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { BsPencilFill } from 'react-icons/bs';

import Form from 'react-bootstrap/Form';
// material table
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditTwoTone from '@mui/icons-material/EditTwoTone';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const mMaterialList = () => {
    const [isEdit,setIsEdit] = useState(false);
    const [isNew,setIsNew] = useState(false);
    
    const [ddlUoM,setDdlUoM] = useState([]);
    const [ddlItemLevel,setDdlItemLevel] = useState([]);
    const [ddlCategory,setDdlCategory] = useState([]);
    const [ddlSubCategory,setDdlSubCategory] = useState([]);
    const [selectedUoM, setSelectedUoM] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedCategory, setselectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const [materialCode, setMaterialCode] = useState("");
    const [materialName, setMaterialName] = useState("");

    const [isActive,setIsActive] = useState("");

    const [show, setShow] = useState(false);
    const [materialData,setMaterialData] = useState([]);
    const [isActiveRow,setIsActiveRow] = useState(false);
    
    const dispatch = useDispatch();

    function getMaterial(){
        API.getmMaterialList().then(
            result=>{
                console.log('i am Scope',result)
                setMaterialData(result);
            }
        )
    } 

    function getDdlUoM(){
        API.getUOM().then(
            result=>{
                console.log('i am DDL UoM',result)
                setDdlUoM(result);
            }
        )
    }

    function getDdlItemLevel(){
        API.getItemLevel().then(
            result=>{
                console.log('i am DDL LVL',result)
                setDdlItemLevel(result);
            }
        )
    }

    function getDDLCategory(){
        API.getMaterialCategory().then(
            result=>{
                console.log('i am DDL LVL',result)
                const filtered = result.filter( (auto) => auto.isActive==true)
                setDdlCategory(filtered);
            }
        )
    }

    function getDDLSubCategory(){
        API.getSubMaterialCategory().then(
            result=>{
                console.log('i am DDL LVL',result)
                const filtered = result.filter( (auto) => auto.isActive==true)
                setDdlSubCategory(filtered);
            }
        )
    }

    function refreshData(){
        getMaterial();
        getDdlItemLevel();
        getDdlUoM();
        getDDLSubCategory();
        getDDLCategory();
    }


    const handleClose = () => 
    {
        setShow(false) 
        setIsNew(false);;
        setIsEdit(false);;
    }

    const handleShowAdd = () => {
        setShow(true);
        setIsNew(true);
    };

    const handleShowEdit = (mtr) => {
        //setShow(true);
        mtr.isEditRow = true;
        console.log("edit :",mtr)
        setIsEdit(true);
    };

    const handleCancelEdit = (mtr) => {
        //setShow(true);
        mtr.isEditRow = null;
        setIsEdit(false);
    };

    function saveClick(materialId){
        const body ={
            "materialId": materialId,
            "materialCode": materialCode,
            "materialName": materialName,
            "uom": selectedUoM,
            "itemLevelDetail": {
                "itemLevelId": selectedLevel
            },
            "subCategoryDetail": {
                "subCategoryId": selectedSubCategory
            },
            "lmby": 0           
        
        }
        console.log("saveclick",body);
        API.putMaterial(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    refreshData();
                }
                else{
                    toast.error(result.message);
                }
            }
        )
    }

    function handleIsActiveClick(materialId, status ){
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "id" : materialId,
                "actStatus" : status,
                "lmby" : 0
            }
            console.log("activa:",body);
            API.putMaterialActivation(body).then(
                result=>{
                    console.log("put material: ", result);
                    if(result.status=="success")
                    {
                        toast.success(result.message);
                        refreshData();
                        //window.location.reload();
                    }
                    else{
                        toast.error(result.message);
                    }
                }
            )
        }
    }

    useEffect(() => {
        refreshData();
        setTimeout(()=>{                        

            var t = $('#tblScope').DataTable( {
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

        }, 1000);
    },[])
    
    return (
        <><div className="card card-primary">
            <div className="card-header align-middle">
                <h3 className="card-title">Material List</h3>
                <a href='javascript:void(0)' onClick={handleShowAdd} class="btn btn-success float-right">
                    <i class="fas fa-plus"></i>
                </a>
            </div>
            <div className="card-body">
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Material Code</TableCell>
                                <TableCell>Material Name</TableCell>
                                <TableCell>UoM</TableCell>
                                <TableCell>Item Level</TableCell>
                                <TableCell>Sub Category</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Is Active</TableCell>
                                <TableCell>option</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {materialData.map((row) => (
                                <TableRow key={row.materialId}>
                                    <TableCell>
                                        {row.isEditRow==null || row.isEditRow == false ? row.materialCode : 
                                            <TextField id="txtMaterialCode" label={row.materialCode} onChange={(e)=>setMaterialCode(e.target.value)} variant="standard" />
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {row.isEditRow==null || row.isEditRow == false ? row.materialName : 
                                            <TextField id="txtMaterialName" label={row.materialName} onChange={(e)=>setMaterialName(e.target.value)} variant="standard" />
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {row.isEditRow==null || row.isEditRow == false ? row.uom : 
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                <InputLabel id="demo-simple-select-standard-label">{row.uom}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="demo-simple-select-standard"
                                                    onChange={(e) => setSelectedUoM(e.target.value)}
                                                    label={row.uom}
                                                >
                                                    {ddlUoM.map(um => <MenuItem value={um.uomName}>
                                                        {um.uomName}
                                                    </MenuItem> )}
                                                </Select>
                                            </FormControl>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {row.isEditRow==null || row.isEditRow == false ? row.itemLevelDetail.itemLevelName : 
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                <InputLabel id="demo-simple-select-standard-label">{row.itemLevelDetail.itemLevelName}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="demo-simple-select-standard"
                                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                                    label={row.itemLevelName}
                                                >
                                                    {ddlItemLevel.map(um => <MenuItem value={um.itemLevelId}>
                                                        {um.itemLevelName}
                                                    </MenuItem> )}
                                                </Select>
                                            </FormControl>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {/* {row.subCategoryDetail.subCategoryName} */}
                                        {row.isEditRow==null || row.isEditRow == false ? row.subCategoryDetail.subCategoryName : 
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                <InputLabel id="demo-simple-select-standard-label">{row.subCategoryDetail.subCategoryName}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="demo-simple-select-standard"
                                                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                                                    label={row.subCategoryDetail.subCategoryName}
                                                >
                                                    {ddlSubCategory.map(um => <MenuItem value={um.subCategoryId}>
                                                        {um.subCategoryName}
                                                    </MenuItem> )}
                                                </Select>
                                            </FormControl>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {/* {row.subCategoryDetail.categoryDetail.categoryName} */}
                                        {row.isEditRow==null || row.isEditRow == false ? row.subCategoryDetail.categoryDetail.categoryName : 
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                <InputLabel id="demo-simple-select-standard-label">{row.subCategoryDetail.categoryDetail.categoryName}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-standard-label"
                                                    id="demo-simple-select-standard"
                                                    onChange={(e) => setselectedCategory(e.target.value)}
                                                    label={row.subCategoryDetail.categoryDetail.categoryName}
                                                    inputProps={{ readOnly: true }}
                                                >
                                                    {ddlCategory.map(um => <MenuItem value={um.categoryId}>
                                                        {um.categoryName}
                                                    </MenuItem> )}
                                                </Select>
                                            </FormControl>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Form.Check
                                            type="switch"
                                            id={row.materialId}
                                            checked={row.isActive}
                                            onChange={(e) => handleIsActiveClick(row.materialId, e.target.checked)} />
                                    </TableCell>
                                    <TableCell>
                                        {
                                            row.isEditRow == null ? <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => handleShowEdit(row)}
                                            >
                                                <EditTwoTone/>
                                            </IconButton> :
                                                <><IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => saveClick(row.materialId)}
                                                >
                                                    <SaveIcon />
                                                </IconButton><IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => handleCancelEdit(row)}
                                                >
                                                    <CancelIcon />
                                                </IconButton></>
                                        }
                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div><Modal
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
                <MaterialPanel/>
            </Modal.Body>
            {/* <Modal.Footer>
                    <Button variant="primary" onClick={saveClick}>Save</Button>
                </Modal.Footer> */}
        </Modal>
        </>
    );
};

export default mMaterialList;
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-deprecated */
import { getDataDop } from '@app/store/action/dopAction';
import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditorFactory,{Type} from 'react-bootstrap-table2-editor';
import { getDataScope } from '@app/store/action/scopeAction';


const Dop2 = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDataDop())
        dispatch(getDataScope())
    },[dispatch]);

    const dataTable = useSelector(state=>state.dopReducer.dataDop)

    const columns = [
        {
            dataField:'dopName',
            text:'Name',
            sort:true
        },
        {
            dataField:'dopCode',
            text:'Code',
            sort:true
        },
        {
            dataField:'dopType',
            text:'Type'
        },
        {
            dataField:'dopDesc',
            text:'Desc'
        },
        {
            dataField:'dopDestName',
            text:'Destination'
        },
        {
            dataField:'dopAddress',
            text:'Adress'
        },
        {
            dataField:'isMainCWH',
            text:'Is Main CWH',
            editor: {
                type: Type.CHECKBOX,
                value: 'Y:N'
            },
            formatter: (cell, row, rowIndex) => {
                //     console.log(cell, row)
                return (
                    <input type="checkbox"  checked={cell} ></input>
                );
            },
        },
        {
            dataField:'isCWH',
            text:'Is CWH',
            editor: {
                type: Type.CHECKBOX,
                value: 'Y:N'
            },
            formatter: (cell, row, rowIndex) => {
                //     console.log(cell, row)
                return (
                    <input type="checkbox"  checked={cell} ></input>
                );
            },
        },
        {
            dataField:'isSite',
            text:'Is Site',
            editor: {
                type: Type.CHECKBOX,
                value: 'Y:N'
            },
            formatter: (cell, row, rowIndex) => {
                //     console.log(cell, row)
                return (
                    <input type="checkbox"  checked={cell} ></input>
                );
            },
        },
        {
            dataField:'lspInfo.subconName',
            text:'Subcon'
        },
       

    ]
    const handleEdit = () => {
        return alert('Edit Sucess')
    }
    return (
        <div>
            <BootstrapTable 
                data={dataTable} 
                columns={columns} 
                keyField='id' 
                pagination={paginationFactory()} 
                striped hover condensed
                cellEdit={cellEditorFactory({
                    mode:'dbclick',
                    blurToSave:true,
                    beforeSaveCell: handleEdit
                })}
                
            />
        </div>
    );
};


export default Dop2;
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Table,Input,Menu, Dropdown, Button, Space} from 'antd'
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';

import Search from '@app/components/searchcolumn/SearchColumn';



export default function TableSite() {

    const dispatch = useDispatch()
    const history = useHistory();
    const [wpIds,setWpids]=useState('')
    const [ordetTypeIdhook,setordetTypeIdhook]=useState('')
  
    const dataSiteList = useSelector(state=>state.siteListDeliveryRequestReducer.data)
    const wpid = useSelector(state=>state.siteListDeliveryRequestReducer.wpId)
    const dataOrderTypeList = useSelector(state=>state.siteListDeliveryRequestReducer.orderList)
    const ordetTypeIds = useSelector(state=>state.siteListDeliveryRequestReducer.orderTypeId)
    const [selectedOt,setSelectedOt] = useState("")
    const [count, setCount] = useState()
    

    useEffect(() => {
        dispatch(getDataSiteList())
        
    },[dispatch,ordetTypeIdhook,ordetTypeIds]);

   
    const navigateTo = () => {
        selectedOt == 'SDR' ? (history.push(`/sitelist/sdrform?wpid=${wpIds}&ot=${ordetTypeIdhook}`)):( history.push(`/sitelist/siteDetail?wpid=${wpIds}&ot=${ordetTypeIdhook}`))
       
    }

    const odi = (e) => {
        
 
        console.log(selectedOt,"dataOt")
       
        
        Promise.resolve()
            .then(() => { setSelectedOt(e.orderTypeDetail.orderTypeName)})
            .then(() => navigateTo())
    }


    const getId = (record,wp) => {
        // dispatch(getWpId(record));
        // console.log(wpId,scopeName,orderTypeId,'wpId');
  
        dispatch(getOrderType(record.orderTypeList))
        setWpids(wp);
        setordetTypeIdhook(record.orderTypeList[0].orderTypeDetail.orderTypeId)
        const wpId = record.workpackageID;
        const scopeName = record.scopeDetail.scopeName;
        const scopeId = record.orderTypeList[0].orderTypeDetail.orderTypeId;
        console.log(wpId,scopeName,scopeId,record,'wp');
        // navigateTo();
    } 
    const menuDropdown =  (
        <Menu>
            {dataOrderTypeList ? (dataOrderTypeList.map((e)=>(<Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={()=>odi(e)}>
                    {e.orderTypeDetail.orderTypeName}
                </a>
            </Menu.Item>))):(<p>no Data</p>)}
            
        </Menu>
    );

    const columns = [
        {
            title : "No",
            render: (value, item, index) => 1 + index
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Site Name",
            dataIndex:'siteName',
            sorter:(record1,record2)=>{
                return record1.siteName > record2.siteName
            },
            filterDropdown: ({setSelectedKeys,selectedKeys,confirm}) => {
                return <Input 
                    autoFocus 
                    placeHolder='search'
                    value={selectedKeys[0]}
                    onChange={(e)=>{
                        setSelectedKeys(e.target.value?[e.target.value]:[])
                    }}
                    style={{ marginBottom: 8, display: 'block' }}
                    onPressEnter={()=>{
                        confirm()
                    }}
                    onBlur={()=>{
                        confirm()
                    }}
                ></Input>
            },
            filterIcon: () => {
                return <SearchOutlined/>
            },
            onFilter:(value,record)=>{
                return record.siteName.toLowerCase().includes(value.toLowerCase())
            },
            
        },
        {
            title : "CPO No",
            dataIndex:'poDetail',
            
            ...Search('poDetail'),
            render: item => Object.keys(item).map(k => item[k])[1]
        },
        {
            title : "Workpackage ID",
            dataIndex:'workpackageID',
            
            ...Search('workpackageID'),
        },
        {
            title : "Scope",
            dataIndex:'scopeDetail',
            
            ...Search('scopeDetail'),
            render: item => Object.keys(item).map(k => item[k])[1]
            
            
        },
        {
            title : "Region",
            dataIndex:'region',
            responsive: ['md'],
            ...Search('region'),
        },
        {
            title : "Options",
            dataIndex:'',
            align:'center',
            render : (record,wp)=>{
                return <Space direction="vertical">
                    <Space wrap>
                        <Dropdown overlay={menuDropdown} trigger={['click']} placement="bottomLeft">
                            <MoreOutlined onClick={()=>getId(record,wp.workpackageID)} /> 
                        </Dropdown>
                    </Space>
                </Space>
            }
            
        },
        
    
    ]
  
    return (
        <Table
            // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            dataSource={dataSiteList}
            columns={columns}
            key='siteConditionId'
            scroll={{ x: '100%' }}
            // eslint-disable-next-line react/jsx-boolean-value
            pagination={{
                pageSizeOptions: ['5','10','20','30', '40'],
                showSizeChanger: true,
                position: ["bottomLeft"],
            }}
                    
            style={{marginTop : 36}}
            size='small'
            bordered
            // loading={loading ? (true):(false)}    
                
        />
    )
}

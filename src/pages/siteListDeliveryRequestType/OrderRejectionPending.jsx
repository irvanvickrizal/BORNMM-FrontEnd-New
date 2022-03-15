/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-unstable-nested-components */

import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Table,Input,Menu, Dropdown, Button, Space} from 'antd'
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import moment from 'moment'
import Search from '@app/components/searchcolumn/SearchColumn';
import { getOdi, getOrderRejectionPending } from '@app/store/action/siteListDeliveryRequestAction';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';


export default function OrderRejectionPendingList() {

    const dispatch = useDispatch()
    const history = useHistory();
    const [page,setPage] = useState(1)
  
    

    useEffect(() => {
        dispatch(getOrderRejectionPending())
        
    },[dispatch]);

    const dataRejection = useSelector(state=>state.siteListDeliveryRequestReducer.dataOrderRejection)
    const dataOdi = useSelector(state=>state.siteListDeliveryRequestReducer.odi)

  
  
 
    
    const handleEdit=(e)=>{
        dispatch(getOdi(e))
        history.push(`/sitelist/dismantleedit?odi=${dataOdi}`)
    }
  




    const columns = [
        {
            title:'No',
            key:"index",
            render:(value, item, index) => (page )  + index
        },
        {
            title : "Request No",
            dataIndex:'requestNo',
          
        },
        {
            title : "Order Type",
            dataIndex:'orderType',
          
            
        },
        {
            title : "Origin",
            dataIndex:'originName',
            
         
         
        },
        {
            title : "Destination",
            dataIndex:'destinationName',
            
        
        },
        {
            title : "Site Name",
            dataIndex:'siteName',
            
        
          
            
            
        },
        {
            title : "Region",
            dataIndex:'region',
        
       
        },
        {
            title : "Work Package ID",
            dataIndex:'workpackageid',
        
       
        },
        {
            title : "Scope Name",
            dataIndex:'scopeName',
        
       
        },
        {
            title : "Scope Detail",
            dataIndex:'scopeDetail',
        
       
        },
        {
            title : "Reason Of Rejection",
            dataIndex:'reasonOfRejection',
        
       
        },
        {
            title : "Rejected By",
            dataIndex:'rejectedBy',
        
       
        },
        {
            title : "incoming Date",
            dataIndex:'incomingDate',
            render:(text)=>{
                return(
                    <p>{moment(text).format("YYYY-MM-DD")}</p>
                )
            }
       
        },
        {
            title : "Options",
            dataIndex:'',
            align:'center',
            render : (e)=>{
                return <EditOutlined onClick={()=>handleEdit(e.orderDetailId)}/>
            }
            
        },
 
        
    
    ]
  
    

    

    return (
        <div>
            <HeaderChanger title="Order Rejection Pending List"/>
            <Table
            // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                dataSource={dataRejection}
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
        </div>
       
    )
}

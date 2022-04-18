import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table,Typography} from 'antd'
import { getIdTaskPending, getLogisticPending, getOdi } from '@app/store/action/logistikFormAction'
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import Search from '@app/components/searchcolumn/SearchColumn';

import moment from 'moment'

export default function Logistic() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [page,setPage] = useState(1)
    const [odi,setOdi] = useState("")

    

    useEffect(() => {
        dispatch(getLogisticPending())
    },[]) 

    const dataPending = useSelector(state => state.logistikFormReducer.dataLogisticPending)
    const dataIdTaskPending = useSelector(state => state.logistikFormReducer.idTaskPending)

    const navigateTo = (record) => {
      
        history.push(`/sitelist/logistikform?odi=${record.orderDetailId}`)
    }

    const handleEdit =(record) => {
        setOdi(record.orderDetailId)
        dispatch(getOdi(record.orderDetailId))
        dispatch(getIdTaskPending(record.orderDetailId))
        navigateTo(record)
    }


    const columns = [
        {
            title:'No',
            key:"index",
            width:60,
            render:(value, item, index) => (page )  + index
        },
        {
            title:'Request No',
            width:170,
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            title:'Order Type',
            width:150,
            dataIndex:'orderType',
            ...Search('orderType'),
        },
        {
            title:'Workpackage Id',
            width:150,
            dataIndex:'workpackageid',
            ...Search('orderType'),
        },
        {
            title:'Site No',
            width:200,
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title:'Origin',
            width:150,
            dataIndex:'originName',
            ...Search('originName'),
        },
        {
            title:'Destination',
            width:150,
            dataIndex:'destinationName',
            ...Search('destinationName'),
        },
        {
            title:'Site Name',
            width:150,
            dataIndex:'siteName',
            ...Search('siteName'),
        },
        {
            title:'Region',
            width:160,
            dataIndex:'region',
            ...Search('region'),
        },
        {
            title:'Scope Name',
            width:140,
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title:'Scope Detail',
            width:130,
            dataIndex:'scopeDetail',
            ...Search('scopeDetail'),
        },
        {
            title:'Delivery Type',
            width:130,
            dataIndex:'deliveryType',
            ...Search('deliveryDate'),
        },
        {
            title:'Incoming Date',
            width:130,
            render:(record)=>{
                return <Typography>{moment(record.incomingDate).format("YYYY-MM-DD,hh:mm:ss")}</Typography>
            },
      
            ...Search('deliveryDate'),
        },
        {
            title:'Action',
            fixed:'right',
            width: 70,
            render:(record)=>{
                return <EditOutlined onClick={() => handleEdit(record)}/>
            }
           
        },
    ]
    return (
        <div>

            <HeaderChanger title="Logistic Task Pending"/>
            <Table
                columns={columns}
                dataSource={dataPending}
                scroll={{ x: '200%' }}
               
                pagination={{
                    pageSizeOptions: ['5','10','20','30', '40'],
                    showSizeChanger: true,
                    position: ["bottomLeft"],
                }}
                    
            
              
                bordered
            />
        
        </div>
    )
}

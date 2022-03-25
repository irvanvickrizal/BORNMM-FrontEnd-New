import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table} from 'antd'
import { getIdTaskPending, getLogisticPending, getOdi } from '@app/store/action/logistikFormAction'
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import Search from '@app/components/searchcolumn/SearchColumn';

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

    const navigateTo = () => {
      
        history.push(`/sitelist/logistikform?odi=${dataIdTaskPending}`)
    }

    const handleEdit =(record) => {
        setOdi(record.orderDetailId)
        dispatch(getOdi(record.orderDetailId))
        dispatch(getIdTaskPending(record.orderDetailId))
        navigateTo()
    }


    const columns = [
        {
            title:'No',
            key:"index",
            render:(value, item, index) => (page )  + index
        },
        {
            title:'Request No',
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            title:'Order Type',
            dataIndex:'orderType',
            ...Search('orderType'),
        },
        {
            title:'Work Package Id',
            dataIndex:'workpackageid',
            ...Search('orderType'),
        },
        {
            title:'Site No',
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title:'Origin',
            dataIndex:'originName',
            ...Search('originName'),
        },
        {
            title:'Destination',
            dataIndex:'destinationName',
            ...Search('destinationName'),
        },
        {
            title:'Site Name',
            dataIndex:'siteName',
            ...Search('siteName'),
        },
        {
            title:'Region',
            dataIndex:'region',
            ...Search('region'),
        },
        {
            title:'Scope Name',
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title:'Scope Detail',
            dataIndex:'scopeDetail',
            ...Search('scopeDetail'),
        },
        {
            title:'Delivery Type',
            dataIndex:'deliveryType',
            ...Search('deliveryDate'),
        },
        {
            title:'Action',
            fixed:'right',
            width: 50,
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
                scroll={{ x: '120%' }}
               
                pagination={{
                    pageSizeOptions: ['5','10','20','30', '40'],
                    showSizeChanger: true,
                    position: ["bottomLeft"],
                }}
                    
                style={{marginTop : 36}}
                size='small'
                bordered
            />
        
        </div>
    )
}

import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table} from 'antd'
import { getIdTaskPending, getLogisticPending, getOdi } from '@app/store/action/logistikFormAction'
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'

export default function Logistic() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [page,setPage] = useState(1)

    

    useEffect(() => {
        dispatch(getLogisticPending())
    },[]) 

    const dataPending = useSelector(state => state.logistikFormReducer.dataLogisticPending)
    const dataIdTaskPending = useSelector(state => state.logistikFormReducer.idTaskPending)

    const navigateTo = () => {
      
        history.push(`/sitelist/logistikform?odi=${dataIdTaskPending}`)
    }

    const handleEdit =(record) => {
        dispatch(getOdi(record))
        dispatch(getIdTaskPending(record))
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
        },
        {
            title:'Order Type',
            dataIndex:'orderType',
        },
        {
            title:'Site No',
            dataIndex:'siteNo',
        },
        {
            title:'Origin',
            dataIndex:'originName',
        },
        {
            title:'Destination',
            dataIndex:'destinationName',
        },
        {
            title:'Site Name',
            dataIndex:'siteName',
        },
        {
            title:'Region',
            dataIndex:'region',
        },
        {
            title:'Scope Name',
            dataIndex:'scopeName',
        },
        {
            title:'Scope Detail',
            dataIndex:'scopeDetail',
        },
        {
            title:'Delivery Type',
            dataIndex:'deliveryType',
        },
        {
            title:'Action',
            render:(record)=>{
                return <EditOutlined onClick={() => handleEdit(record.orderDetailId)}/>
            }
        },
    ]
    return (
        <div>

            <HeaderChanger title="Logistic Task Pending"/>
            <Table
                columns={columns}
                dataSource={dataPending}
                scroll={{ x: '100%' }}
               
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

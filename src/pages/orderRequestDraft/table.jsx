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
import {Table
    ,Input
    ,Menu
    ,Dropdown
    ,Button
    ,Space,
    Tooltip} from 'antd'
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import API  from '../../utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';

export default function TableSite() {

    const dispatch = useDispatch()
    const history = useHistory();
    const [wpIds,setWpids]=useState('')
    const navigateTo = (path) => {
        history.push(path)
    }
    const [orderRequestDraft,setOrderRequestDraft] = useState('');

    const handleEditRequest=(data)=>{
        navigateTo(`/sitelist/materialorder?odi=${data.orderDetailId}`)
    }

    const columnsOrderRequestDraft =[
        {
            title:"Inventory Code",
            dataIndex:"inventoryCode",
            key:"orderDetailId"
        },
        {
            title:"Order Type",
            dataIndex:"orderType",
            key:"orderDetailId"
        },
        {
            title:"Request Type",
            dataIndex:"requestTypeName",
            key:"orderDetailId"
        },
        {
            title:"CT Name",
            dataIndex:'ctName',
            key:"orderDetailId"
        },
        {
            title:"Site Condition",
            dataIndex:"siteCondition",
            key:"orderDetailId"
        },
        {
            title:"Delivery Type",
            dataIndex:"deliveryType",
            key:"orderDetailId"
        },
        {
            title:"Packet Type",
            dataIndex:"packetType",
            key:"orderDetailId"
        },
        {
            title:"Subcon",
            dataIndex:"recipientOrDismantledBy",
            key:"orderDetailId"
        },
        {
            title:"Requester",
            dataIndex:"requesterName",
            key:"orderDetailId"
        },
        {
            title:"Request Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.requestDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            }
        },
        {
            title:"Expected Delivery Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.expectedDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            }
        },
        {
            title:"Expected Delivery Date",
            align:"center",
            render:(record)=>{
                return (
                    <Tooltip title="Edit Draft">
                        <EditOutlined onClick={() => handleEditRequest(record)} />
                    </Tooltip>
                )
            }
        },
        
    ]

    const getOrderRequestDraft=()=>{
        API.getOrderRequestDraft().then(
            result=>{
                console.log("order request draft", result);
                setOrderRequestDraft(result);
            }
        )
    }

    useEffect(() => {
        getOrderRequestDraft();
    },[dispatch]);

       

    return (
        <Table
            // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            dataSource={orderRequestDraft}
            columns={columnsOrderRequestDraft}
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

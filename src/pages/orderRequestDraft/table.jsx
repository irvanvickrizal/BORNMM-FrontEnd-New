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
import API from '@app/utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import {IconButton, TextField}  from '@mui/material/';
import {toast} from 'react-toastify';

export default function TableSite() {

    const dispatch = useDispatch()
    const history = useHistory();
    const [wpIds,setWpids]=useState('')
    const navigateTo = (path) => {
        history.push(path)
    }
    const [orderRequestDraft,setOrderRequestDraft] = useState('');

    const getOrderRequestDraft=()=>{
        API.getOrderRequestDraft().then(
            result=>{
                console.log("order request draft", result);
                setOrderRequestDraft(result);
            }
        )
    }


    const handleEditRequest=(data)=>{
        navigateTo(`/mm/materialorder?odi=${data.orderDetailId}`)
    }
    const handleDelete=(id)=>{
        if (window.confirm('Are you sure you want to delete this data ?')) {
            console.log(id)
            API.deleteOrderDetail("",id).then(
                result=>{
                    console.log("handledelete",result)
                    if(result.status=="success"){
                        getOrderRequestDraft();
                        toast.success(result.message)
                    }
                    else{
                        getOrderRequestDraft();
                        toast.error(result.message)
                    }
                }
            )
        }
    }

    const columnsOrderRequestDraft =[
        {
            title:"CPO No",
            dataIndex:"cpoNo",
            key:"cpoNo",
            ...Search('cpoNo'),
        },
        {
            title:"Site No",
            dataIndex:"siteNo",
            key:"siteNo",
            ...Search('siteNo'),
        },
        {
            title:"Workpackage ID",
            dataIndex:"workpackageId",
            key:"workpackageId",
            ...Search('workpackageId'),
        },
        {
            title:"Site Name",
            dataIndex:"siteName",
            key:"siteName",
            ...Search('siteName'),
        },
        {
            title:"Region",
            dataIndex:"region",
            key:"region",
            ...Search('region'),

        },
        {
            title:"Zone",
            dataIndex:'zone',
            key:"zone",
            ...Search('zone'),
        },
        {
            title:"Order Type",
            dataIndex:"orderType",
            key:"orderType",
            ...Search('orderType'),
        },
        {
            title:"Origin Name",
            dataIndex:"originName",
            key:"originName",
            ...Search('originName'),
        },
        {
            title:"Destination Name",
            dataIndex:"destinationName",
            key:"destinationName"
            ,...Search('destinationName'),
        },
        {
            title:"Request Type",
            dataIndex:"requestTypeName",
            key:"requestTypeName",
            ...Search('requestTypeName'),
        },
        {
            title:"Expected Delivery Date",
            ...Search('expectedDeliveryDate'),
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.expectedDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            }
        },
        {
            title:"Requester",
            dataIndex:"requesterName",
            key:"requesterName",
            ...Search('requesterName'),
        },
        {
            title:"Request Date",
            ...Search('requestDate'),
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.requestDate).format("YYYY-MM-DD   hh.mm.ss")}</p>
                    </Space>
                )
            }
        },
        {
            align:"center",
            fixed:'right',
            width:80,
            render:(record)=>{
                return (
                    <>
                        <Tooltip title="Edit Draft">
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                color="primary"
                                onClick={() => handleEditRequest(record)}
                                //onClick={() => handleDelete(record.inbFileId,record.fileName)}
                            >
                                <EditOutlined  />
                            
                            </IconButton>
                        </Tooltip>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            color="error"
                            onClick={() => handleDelete(record.orderDetailId)}
                        >
                            <DeleteOutlined />
                        </IconButton>
                    </>
                )
            }
        },
        
    ]

    

    useEffect(() => {
        getOrderRequestDraft();
    },[dispatch]);

       

    return (
        <Table
            // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            //rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
            dataSource={orderRequestDraft}
            columns={columnsOrderRequestDraft}
            key='siteConditionId'
            scroll={{ x: '200%' }}
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

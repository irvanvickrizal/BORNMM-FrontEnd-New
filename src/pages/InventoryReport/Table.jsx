/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Select,Form,Modal,Table, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'

import API  from '../../utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';


const TableInventoryReport = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [inventoryReport,setInventoryReport] = useState([]);


    const getInventoryReport = () => {
        setIsLoading(true);
        API.getInventoryReport().then(
            result=>{
                setInventoryReport(result);
                setIsLoading(false);
                console.log("scontaskpendnig",result);
            }
        )
    }


    const columns = [
        {
            title : "No",
            render: (value, item, index) => 1 + index
        },
        {
            title : "Project",
            dataIndex:'project',
            ...Search('project'),
        },
        {
            title : "WHCode",
            dataIndex:'whCode',
            ...Search('whCode'),
        },
        {
            title : "Warehouse/DOP",
            dataIndex:'warehouseName',
            ...Search('warehouseName'),
        },
        {
            title : "Material Code",
            dataIndex:'materialCode',
            ...Search('materialCode'),
        },
        {
            title : "Material Desc",
            dataIndex:'materialDesc',
            ...Search('materialDesc'),
        },
        {
            title : "UOM",
            dataIndex:'uom',
            responsive: ['md'],
            ...Search('uom'),
        },
        {
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            title : "Inbound QTY",
            dataIndex:'inboundQty',
            ...Search('inboundQty'),
        },
        {
            title : "Stock (OnHand)",
            dataIndex:'onHandQty',
            ...Search('onHandQty'),
        },
        {
            title : "Requested EMORE",
            dataIndex:'bookedQty',
            ...Search('bookedQty'),
        },
        {
            title : "Outbond QTY",
            dataIndex:'outboundQty',
            ...Search('outboundQty'),
        },
        {
            title:"Balance (FREE QTY)",
            dataIndex:'balanceQty',
            ...Search('balanceQty'),
            key:"balanceQty",
            
        },
        
    
    ]

    useEffect(() => {
        getInventoryReport();
    },[])

    return(
        isLoading ?   
            <Row justify="center">
                <Col span={1}>    
                    <Spin />
                </Col>
            </Row>  
            :
            <Table
                scroll={{ x: '100%' }}
                size="small"
                // expandable={{ expandedRowRender }}
                columns={columns}
                dataSource={inventoryReport}
                pagination={{
                    pageSizeOptions: ['5', '10', '20', '30', '40'],
                    showSizeChanger: true,
                    position: ["bottomLeft"],
                }}
                bordered />

            
    )
}

export default TableInventoryReport;
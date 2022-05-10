/* eslint-disable react/jsx-no-bind */
import React,{useState,useEffect} from 'react'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import API from '@app/utils/apiServices'
import {Tabs,Table, Spin, Row, Col,Tooltip  } from 'antd'
import { FileExcelOutlined } from '@ant-design/icons'
import {IconButton}  from '@mui/material/';

import exportFromJSON from 'export-from-json'

export default function TablePmrInventory() {
    const [dataStockDetail,setDataStockDetail] = useState([])
    const [dataInventoryReport,setDataInventoryReport] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { TabPane } = Tabs;


    function getStockDetail() {
        setIsLoading(true);
        API.getStockDetail().then(
            result=>{
                setDataStockDetail(result);
                setIsLoading(false);
                console.log("Data Stock Detail =>",result);
            }
        )
    }
    const getDownloadDataStockDetail = () => {
        API.getStockDetail().then(
            result=>{
                const data = result//result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `Inventory_Stock_Detail_${moment().format("DD-MM-YYYY hh:mm:ss")}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }

    const columnStockDetail = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Order Req No",
            width:180,
            dataIndex:'orderRequestNo',
            ...Search('orderReqNo'),
        },
        {
            title : "Site No",
            width:100,
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Workpackage ID",
            width:120,
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            title : "Material Code",
            width:100,
            dataIndex:'materialCode',
            ...Search('materialCode'),
        },
        {
            title : "Material Desc",
            width:220,
            dataIndex:'materialDesc',
            ...Search('materialDesc'),
        },
        {
            title : "Serial No",
            width:100,
            dataIndex:'serialNo',
            ...Search('serialNo'),
        },
        {
            title : "Item QTY",
            width:80,
            dataIndex:'itemQty',
            ...Search('itemQty'),
        },
        {
            title : "UOM",
            width:80,
            dataIndex:'uOM',
            ...Search('uOM'),
        },
    ]

    const columnInventoryReport = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Order Req No",
            width:180,
            dataIndex:'orderRequestNo',
            ...Search('orderReqNo'),
        },
        {
            title : "Site No",
            width:100,
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Workpackage ID",
            width:120,
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            title : "Material Code",
            width:100,
            dataIndex:'materialCode',
            ...Search('materialCode'),
        },
        {
            title : "Material Desc",
            width:220,
            dataIndex:'materialDesc',
            ...Search('materialDesc'),
        },
        {
            title : "Serial No",
            width:100,
            dataIndex:'serialNo',
            ...Search('serialNo'),
        },
        {
            title : "Item QTY",
            width:80,
            dataIndex:'itemQty',
            ...Search('itemQty'),
        },
        {
            title : "UOM",
            width:80,
            dataIndex:'uOM',
            ...Search('uOM'),
        },
    ]

    function callback(key) {
        if(key==1){
            getStockDetail();
        }
        else if(key==2){
            getStockDetail();
        }
        console.log("keytabs",key);
    }

    useEffect(() => {
        getStockDetail();

       
    },[])


    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Inventory Report" key="1">
                    { isLoading ?   
                        <Row justify="center">
                            <Col span={1}>    
                                <Spin />
                            </Col>
                        </Row>  
                        :
                        <><div className='float-right'>
                            <Tooltip title="Download Inventory Report">
                                <IconButton size="small" color="success" onClick={getDownloadDataStockDetail}>
                                    <FileExcelOutlined />
                                </IconButton>
                                {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                            </Tooltip>
                        </div><Table
                            scroll={{ x: '100%',y:500 }}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                            size='medium'
                            columns={columnStockDetail}
                            dataSource={dataStockDetail}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            bordered /></>}
          
                </TabPane>
                <TabPane tab="Stock Detail" key="2">
                    { isLoading ?   
                        <Row justify="center">
                            <Col span={1}>    
                                <Spin />
                            </Col>
                        </Row>  
                        :
                        <><div className='float-right'>
                            <Tooltip title="Download Stock Detail">
                                <IconButton size="small" color="success" onClick={getDownloadDataStockDetail}>
                                    <FileExcelOutlined />
                                </IconButton>
                                {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                            </Tooltip>
                        </div><Table
                            scroll={{ x: '100%',y:500 }}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                            size='medium'
                            columns={columnStockDetail}
                            dataSource={dataStockDetail}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            bordered /></>}
                </TabPane>
            </Tabs>
        </div>
    )
}

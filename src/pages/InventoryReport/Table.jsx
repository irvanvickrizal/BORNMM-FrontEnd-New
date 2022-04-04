/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Select,Form,Modal,Table,Tabs, Input,Menu, Dropdown, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {IconButton, TextField}  from '@mui/material/';
import API  from '../../utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import exportFromJSON from 'export-from-json'
import { CloudUploadOutlined, UploadOutlined,DownloadOutlined,PlusOutlined,FileExcelOutlined,CloseOutlined, EditOutlined,DeleteOutlined,CheckOutlined  } from '@ant-design/icons';


const TableInventoryReport = () => {
    const { TabPane } = Tabs;
    const [isLoading, setIsLoading] = useState(true);
    const [inventoryReport,setInventoryReport] = useState([]);
    const [inventoryReportDetail,setInventoryReportDetail] = useState([]);
    const [itemBookedList,setItemBookedList] = useState([]);


    const getInventoryReport = () => {
        setIsLoading(true);
        API.getInventoryReport().then(
            result=>{
                setInventoryReport(result);
                setIsLoading(false);
                console.log("inventory",result);
            }
        )
    }

    const getInventoryReportDetail = () => {
        setIsLoading(true);
        API.getInventoryDetail().then(
            result=>{
                setInventoryReportDetail(result);
                setIsLoading(false);
                console.log("inventory detail",result);
            }
        )
    }
    const getItemBookedList = () => {
        setIsLoading(true);
        API.getItemBookedList().then(
            result=>{
                
                console.log("item booked list",result);
                setItemBookedList(result)
                setIsLoading(false);
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
            title : "Requested BORN",
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
    const columnsDetail = [
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
            title : "Warehouse",
            dataIndex:'whCode',
            ...Search('whCode'),
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
            title : "Packing List",
            dataIndex:'packingList',
            responsive: ['md'],
            ...Search('packingList'),
        },
        {
            title:"On Hand QTY",
            dataIndex:'onHandQty',
            ...Search('onHandQty'),
            key:"onHandQty",
            
        },
        {
            title:"Region",
            dataIndex:'region',
            ...Search('region'),
            key:"region",
            
        },
        
    
    ]
    const columnsItemBookedList = [
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
            title : "WorkpackageId",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
        },
        {
            title : "Order Req No",
            dataIndex:'orderReqNo',
            ...Search('orderReqNo'),
        },
        {
            title : "Material Code",
            dataIndex:'materialCode',
            ...Search('materialCode'),
        },
        {
            title:"QTY",
            dataIndex:'QTY',
            ...Search('QTY'),
        },
        {
            title:"Status",
            dataIndex:'itemStatus',
            ...Search('itemStatus'),            
        },
    ]

    function callback(key) {
        if(key==1){
            getInventoryReport();
        }
        else if(key==2){
            getInventoryReportDetail()
        }
        else if(key==3){
            getItemBookedList();
        }
        console.log("keytabs",key);
    }

    function getDownloadData(){

        API.getInventoryReport().then(
            result=>{
                console.log('i am error log Scope',result)
                
                const data = result//result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `InventoryStockDetail_${moment().format("DD-MM-YYYY hh:mm:ss")}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }
    function getDownloadDataDetail(){

        API.getInventoryDetail().then(
            result=>{
                console.log('i am error log Scope',result)
                
                const data = result//result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `InventoryStockDetail_${moment().format("DD-MM-YYYY hh:mm:ss")}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }
    function getDownloadBookedList(){

        API.getItemBookedList().then(
            result=>{
                console.log('i am error log Scope',result)

                const data = result//result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `OrderRequest_ItemBookedList_${moment().format("DD-MM-YYYY hh:mm:ss")}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }

    useEffect(() => {
        getInventoryReport();
    },[])

    return(
        <Tabs onChange={callback} type="card">
            <TabPane tab="Inventory Report" key="1">
                {isLoading ? <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  :
                    <>
                        <div className='float-right'>
                            <Tooltip title="Download As Excell File">
                                <IconButton size="small" color="success" onClick={getDownloadData}>
                                    <FileExcelOutlined />
                                </IconButton>
                                {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                            </Tooltip>
                        </div><Table
                            scroll={{ x: '150%' }}
                            size="small"
                            // expandable={{ expandedRowRender }}
                            columns={columns}
                            dataSource={inventoryReport}
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            bordered /></>
                }
            </TabPane>
            <TabPane tab="Stock Detail" key="2">
                {isLoading ? <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  :
                    <><div className='float-right'>
                        <Tooltip title="Download As Excell File">
                            <IconButton size="small" color="success" onClick={getDownloadDataDetail}>
                                <FileExcelOutlined />
                            </IconButton>
                            {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                        </Tooltip>
                    </div><Table
                        scroll={{ x: '100%' }}
                        size="small"
                        // expandable={{ expandedRowRender }}
                        columns={columnsDetail}
                        dataSource={inventoryReportDetail}
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                            showSizeChanger: true,
                            position: ["bottomLeft"],
                        }}
                        bordered /></>
                }
            </TabPane>
            <TabPane tab="Item Booked List" key="3">
                {isLoading ? <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  :
                    <><div className='float-right'>
                        <Tooltip title="Download As Excell File">
                            <IconButton size="small" color="success" onClick={getDownloadBookedList}>
                                <FileExcelOutlined />
                            </IconButton>
                            {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                        </Tooltip>
                    </div><Table
                        scroll={{ x: '100%' }}
                        size="small"
                        // expandable={{ expandedRowRender }}
                        columns={columnsItemBookedList}
                        dataSource={itemBookedList}
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                            showSizeChanger: true,
                            position: ["bottomLeft"],
                        }}
                        bordered /></>
                }
            </TabPane>
        </Tabs>
    )
}

export default TableInventoryReport;
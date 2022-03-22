/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import {Table,Tooltip,Col,Row,Card,Typography,Space} from "antd"
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import {FileExcelOutlined,RedoOutlined   } from '@ant-design/icons'
import { Button } from '@app/components/index'
import exportFromJSON from 'export-from-json'
import { toast } from 'react-toastify';

export default function BoqAsPoUpload() {
    const [dataBoqSummary,setDataBoqSummary] = useState([])
    const [dataBoqList,setDataBoqList] = useState([])
    const [dataDownloadPoBoq,setDataDownloadPoBoq] = useState([])
    const [dataDownloadPoBoqList,setDataDownloadPoBoqList] = useState([])
    const [dataDownloadPoBoqListDeleted,setDataDownloadPoBoqListDeleted] = useState([])

    const {Title} = Typography

    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const bid = params.get('bid');

 
    


    const getBoqSummaryAsPoBoq = (boqid) => {
        API.getBoqSummaryAsPoBoq(1).then(
            result=>{
                setDataBoqSummary(result);
                console.log("data BOQ Summary :",result);
            }
        )
    }
    const getListBoqAsPo = (boqid) => {
        API.getListBoqAsPo(1).then(
            result=>{
                setDataBoqList(result);
                console.log("data BOQ List :",result);
            }
        )
    }
    const getDownloadPoBoqListDeleted = (record) => {
        API.getDownloadPoBoqListDeleted(record.workpackageid).then(
            result=>{
                setDataDownloadPoBoqListDeleted(result);
                console.log("data BOQ Lis fet :",result);
                if(result.status == "success"){
                    toast.success(dataDownloadPoBoqListDeleted.message);
                    getListBoqAsPo()
                }
            }
        )
      
    }

    

    const getDownloadPoBoqCompletion = (cpoNo,scopeName,poScopeId) => {
        API.getDownloadPoBoqCompletion(1,1).then(
            result=>{
                setDataDownloadPoBoq(result);
                console.log("data BOQ Download :",result);
               
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `${cpoNo}_${scopeName}_${poScopeId}`;
                exportFromJSON({ data, fileName, exportType });
                console.log("SSDA",cpoNo,poScopeId,scopeName)
            }
        )
    }

    const getDownloadPoBoqList = (cpoNo,siteNo,workpackageid) => {
        API.getDownloadPoBoqList(workpackageid).then(
            result=>{
                setDataDownloadPoBoqList(result);
                console.log("data BOQ Download :",result);
               
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `${cpoNo}_${siteNo}_${workpackageid}`;
                exportFromJSON({ data, fileName, exportType });
                console.log("SSDA",cpoNo,siteNo,workpackageid)
            }
        )
    }

    const handleDownloadPoBoq = (record) => {
        getDownloadPoBoqCompletion(1,record.poScopeId)
    }

    useEffect(() => {
        getBoqSummaryAsPoBoq()
        getListBoqAsPo()
    }, [])
    
    const mapBoqList = dataBoqList.map((e)=>e.rollbackStatus)
    const tai = mapBoqList.values()

    const columnsBoqSummary = [
        {
            title : "No",
            render: (value, item, index) => 1 + index
        },
        {
            title : "CPO No",
            dataIndex:'cpoNo',
            ...Search('cpoNo'),
        },
        {
            title : "Scope",
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title : "Total Sites",
            dataIndex:'totalSites',
         
        },
        {
            title : "Total Sites With Complete BOQ",
            dataIndex:'totalSitesWithCompleteBOQ',
         
        },
        {
            title : "Total Sites Without BOQ",
            dataIndex:'totalSitesWithoutBOQ',
        
        },
        
        {
            title : "Action",
            render : (record)=>{
                return (
                    
                    <Tooltip title="BOQ Detail">
                        <FileExcelOutlined style={{color :"#1f6e43",fontSize:20}} onClick={()=>getDownloadPoBoqCompletion(record.cpoNo,record.scopeName,record.poScopeId)}/>
                    </Tooltip>
                       
                  
                   
                    
                )
           
            },
        }
    ]
    const columnsBoqList = [
        {
            title : "No",
            render: (value, item, index) => 1 + index
        },
        {
            title : "CPO No",
            dataIndex:'cpoNo',
            ...Search('cpoNo'),
        },
        {
            title : "Site No",
            dataIndex:'SiteNo',
            ...Search('SiteNo'),
        },
        {
            title : "Work Package ID",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
         
        },
        {
            title : "Total Items",
            dataIndex:'rollbackStatus',
         
        },
  
        
        {
            title : "Action",
            render : (record)=>{
                return (
                    record.rollbackStatus == 0 ? (
                        <Space direction="horizontal">
                           
                            <Tooltip title="Reset BOQ">
                                <RedoOutlined style={{fontSize:20}} onClick={()=>getDownloadPoBoqListDeleted(record)}/>
                            </Tooltip>
                            <Tooltip title="BOQ Detail">
                                <FileExcelOutlined style={{color :"#1f6e43",fontSize:20}} onClick={()=>getDownloadPoBoqList(record.cpoNo,record.siteNo,record.workpackageid)}/>
                            </Tooltip>
                   
                        </Space>):( <Tooltip title="BOQ Detail">
                        <FileExcelOutlined style={{color :"#1f6e43",fontSize:20}} onClick={()=>getDownloadPoBoqList(record.cpoNo,record.siteNo,record.workpackageid)}/>
                    </Tooltip>)
                    
                    
                    
                )
           
            },
        }
    ]

    const CardTitle = (title) => <Title level={5}>{title}</Title>

    return (
        <div>
            <HeaderChanger title="BOQ As PO Bulk Upload" />
            <Row>
                <div>
                    <Col span={24}>
                        <Card hoverable title={CardTitle("Summary As PO BOQ Per Site")}>
                            <Table
                                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                                dataSource={dataBoqSummary}
                                columns={columnsBoqSummary}
                                key='boqId'
                                scroll={{ x: '100%' }}
                                // eslint-disable-next-line react/jsx-boolean-value
                                pagination={{
                                    pageSizeOptions: ['5','10','20','30', '40'],
                                    showSizeChanger: true,
                                    position: ["bottomLeft"],
                                }}
                                size="small"
                            />
                        </Card>
                      
                    </Col>
                    <Col span={24} style={{marginTop:12}}>
                        <Card hoverable title={CardTitle("Detail SiteList")}>
                            <Table
                                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                                dataSource={dataBoqList}
                                columns={columnsBoqList}
                                key='boqId'
                                scroll={{ x: '100%' }}
                                // eslint-disable-next-line react/jsx-boolean-value
                                pagination={{
                                    pageSizeOptions: ['5','10','20','30', '40'],
                                    showSizeChanger: true,
                                    position: ["bottomLeft"],
                                }}
                            />
                        </Card>
                       
                    </Col>
                </div>
            
                <div>
                    <Col spam={12}>
                        <p>Column 2</p>
                    </Col>
                </div>
            </Row>
         
            
            
        </div>
    )
}

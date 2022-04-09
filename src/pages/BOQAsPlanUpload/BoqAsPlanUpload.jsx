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
import PanelUpload from '@app/pages/BOQAsPlanUpload/PanelUpload'
import TableSummary from '@app/pages/BOQAsPlanUpload/TableSummary'
import { useHistory } from 'react-router-dom'

export default function BoqAsPlanUpload() {
    const [dataBoqSummary,setDataBoqSummary] = useState([])
    const [dataBoqList,setDataBoqList] = useState([])
    const [dataDownloadPoBoq,setDataDownloadPoBoq] = useState([])
    const [dataDownloadPoBoqList,setDataDownloadPoBoqList] = useState([])
    const [dataDownloadPoBoqListDeleted,setDataDownloadPoBoqListDeleted] = useState([])
    const [flag,setFlag] = useState("")
    
    const history = useHistory()

    const {Title,Link} = Typography

    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const bid = params.get('bid');

    const checkLatestCheckpoint = (id) => {
        API.getLatestAsPlanCheckPoint(id).then(
            result=>{
                console.log("latest",result);
                setFlag(result)
            }
        )
    }

    const getBoqSummaryAsPlanBoq = () => {
        API.getBoqSummaryAsPlanBoq(bid).then(
            result=>{
                setDataBoqSummary(result);
                console.log("data BOQ Summary as plan :",result);
            }
        )
    }
    const getListBoqAsPlan = () => {
        API.getListBoqAsPlan(bid).then(
            result=>{
                setDataBoqList(result);
                console.log("data BOQ List as plan :",result);
            }
        )
    }
    const getDownloadPlanBoqListDeleted = (record) => {
        API.getDownloadPlanBoqListDeleted(record.workpackageid).then(
            result=>{
                setDataDownloadPoBoqListDeleted(result);
                console.log("data BOQ List :",result);
                if(result.status == "success"){
                    toast.success(dataDownloadPoBoqListDeleted.message);
                    getListBoqAsPlan()
                }
            }
        )
      
    }

    const getDownloadPlanBoqCompletion = (cpoNo,scopeName,poScopeId) => {
        API.getDownloadPlanBoqCompletion(bid,poScopeId).then(
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

    const getDownloadPlanBoqList = (cpoNo,siteNo,workpackageid,boqRefCode) => {
        API.getDownloadPlanBoqList(workpackageid,boqRefCode).then(
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
        getDownloadPlanBoqCompletion(1,record.poScopeId)
    }

    useEffect(() => {
        getBoqSummaryAsPlanBoq()
        getListBoqAsPlan()
        checkLatestCheckpoint(bid)
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
                        <FileExcelOutlined style={{color :"#1f6e43",fontSize:20}} onClick={()=>getDownloadPlanBoqCompletion(record.cpoNo,record.scopeName,record.poScopeId)}/>
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
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Order Type",
            dataIndex:'orderType',
            ...Search('orderType'),
        },
        {
            title : "Work Package ID",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
         
        },
        {
            title : "Total Items",
            dataIndex:'totalItems',
         
        },
  
        
        {
            title : "Action",
            render : (record)=>{
                return (
                    record.rollbackStatus == 0 ? (
                        <Space direction="horizontal">
                           
                            <Tooltip title="Reset BOQ">
                                <RedoOutlined style={{fontSize:20}} onClick={()=>getDownloadPlanBoqListDeleted(record)}/>
                            </Tooltip>
                            <Tooltip title="BOQ Detail">
                                <FileExcelOutlined style={{color :"#1f6e43",fontSize:20}} onClick={()=>getDownloadPlanBoqList(record.cpoNo,record.siteNo,record.workpackageid,record.boqRefCode)}/>
                            </Tooltip>
                   
                        </Space>):( <Tooltip title="BOQ Detail">
                        <FileExcelOutlined style={{color :"#1f6e43",fontSize:20}} onClick={()=>getDownloadPlanBoqList(record.cpoNo,record.siteNo,record.workpackageid,record.boqRefCode)}/>
                    </Tooltip>)
                    
                    
                    
                )
           
            },
        }
    ]

    const CardTitle = (title) => {
        return (
            <Row>
                <Space align="center">
                    <Title style={{ align:'center' }} level={5}>{title}</Title> 
                </Space>
            </Row>
        )
    }

    const CardTitleUploadPanel = (title) => {
        return (
            <Row>
                <Space align="center">
                    <Title style={{ align:'center' }} level={5}>{title}</Title> 
                    <Link href="/file/SampleFile.xlsx">
                        <p> [Download Template]</p>
                    </Link>
                </Space>
            </Row>
        )
    }
    const size = 'small'
    return (
        <div>
            <HeaderChanger title="BOQ As Plan Bulk Upload" />
            <Row>
                
                <Col span={12} style={{ width: '100%' }}>
                    <Card hoverable title={CardTitle("Summary As Plan BOQ Per Site")}>
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
                    <Card style={{marginTop:12}} hoverable title={CardTitle("Detail Site List")}>
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
                <Col span={12} style={{ width: '100%' }}>
                    <Card hoverable title={CardTitleUploadPanel(`BOQ as Plan Upload`)}>
                        {flag ? 
                            <PanelUpload boqId={bid}/>
                            :
                            <TableSummary/>
                        }
                    </Card>
                    <div className='float-right'>
                        <Button
                            type="primary"
                            onClick={()=>history.push(`/boq/boqrefdetail?bid=${bid}`)}
                            style={{ marginTop: 10, marginBottom:5 }}
                            size={size}
                        >
                    Back
                        </Button>
                    </div>
                </Col>
            </Row>
            
        </div>
    )
}

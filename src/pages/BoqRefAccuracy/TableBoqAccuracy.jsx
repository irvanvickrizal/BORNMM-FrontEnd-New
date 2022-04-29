/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-undef */
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from 'moment'
import {Table ,Space,Row,Col,Spin,Tooltip,Typography,Tabs} from "antd"
import {FileExcelOutlined} from "@ant-design/icons"
import exportFromJSON from 'export-from-json'


export default function TableBoqAccuracy() {
    const [dataBoqAccuracyList,setDataBoqAccuracyList] = useState([])
    const [dataBoqAccuracyDetail,setDataBoqAccuracyDetail] = useState([])
    const [dataBoqAccuracySiteBase,setDataBoqAccuracySiteBase] = useState([])
    const [isLoading,setIsLoading]= useState(false)
    const [selectedBoqId,setSelectedBoqId] = useState(0)
    const { TabPane } = Tabs;

    const uid = useSelector(state=>state.auth.user.uid)

    function getBoqAccuracyList() {
        setIsLoading(true);
        API.getListBoqAccuracy(uid).then(
            result=>{
                setDataBoqAccuracyList(result);
                setIsLoading(false);
                console.log("data BOQ Accuracy List =>",result);
            }
        )
    }
    function getBoqAccuracyDetail(data) {
        console.log(data,"ddd")
  
        setSelectedBoqId(data.boqId)
        API.getListBoqAccuracyDetail(data.boqId).then(
            result=>{
                setDataBoqAccuracyDetail(result);
               
                console.log("data BOQ Accuracy Detail =>",result);
            }
        )
    }
    function getBoqAccuracySiteBase(data) {
        console.log(data,"ddd")
  
        setSelectedBoqId(data.boqId)
        API.getBoqAccuracySiteBase(data.boqId).then(
            result=>{
                setDataBoqAccuracySiteBase(result);
               
                console.log("data BOQ Accuracy SuteBase =>",result);
            }
        )
    }

    const getDownloadDataDetail = (record) => {
        API.getListBoqAccuracyDetail(record.boqId).then(
            result=>{
                const data = result//result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `BOQ_Accuracy_Deatail ${moment().format("DD-MM-YYYY hh:mm:ss")}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }
    const getDownloadDataSiteBase = (record) => {
        API.getBoqAccuracySiteBase(record.boqId).then(
            result=>{
                const data = result//result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `BOQ_Accuracy_Site_Base ${moment().format("DD-MM-YYYY hh:mm:ss")}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }

    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            width:150,
            title : "CPO No",
            dataIndex:'cpoNo',
            // width:100,
            ...Search('cpoNo'),
        },
        {
            width:150,
            title : "CPO Name",
            dataIndex:'CPOName',
            // width:150,
            ...Search('CPOName'),
        },
        {
            title : "Total Scopes",
            dataIndex:'totalScopes',
            width:150,
            ...Search('totalScopes'),
        },
        {
            title : "Total BOQ Ref",
            dataIndex:'totalBOQRef',
      
            width:150,
            ...Search('totalBOQRef'),
        },
        {
            title : "Total Req",
            dataIndex:'totalReq',
            width:150,
            ...Search('totalReq'),
        },
      
     
   
    
        {
            title:"Action",
           
            align:'center',
            fixed:'right',
            width:90,
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            <Tooltip title="Download Boq Detail">
                                <FileExcelOutlined style={{fontSize:20,color:"#0c6907"}} onClick={()=>getDownloadDataDetail(record)}/>
                            </Tooltip>
                            

                        </Space>
                       
                    </div>
                )
            },
        }
    ]
    const columnsSite = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            width:150,
            title : "CPO No",
            dataIndex:'cpoNo',
            // width:100,
            ...Search('cpoNo'),
        },
        {
            width:150,
            title : "CPO Name",
            dataIndex:'CPOName',
            // width:150,
            ...Search('CPOName'),
        },
        {
            title : "Total Scopes",
            dataIndex:'totalScopes',
            width:150,
            ...Search('totalScopes'),
        },
        {
            title : "Total BOQ Ref",
            dataIndex:'totalBOQRef',
      
            width:150,
            ...Search('totalBOQRef'),
        },
        {
            title : "Total Req",
            dataIndex:'totalReq',
            width:150,
            ...Search('totalReq'),
        },
      
     
   
    
        {
            title:"Action",
           
            align:'center',
            fixed:'right',
            width:90,
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            <Tooltip title="Download Boq Detail">
                                <FileExcelOutlined style={{fontSize:20,color:"#0c6907"}} onClick={()=>getDownloadDataSiteBase(record)}/>
                            </Tooltip>
                            

                        </Space>
                       
                    </div>
                )
            },
        }
    ]

    const columnDetail = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            width:150,
            title : "Material Code",
            dataIndex:'materialCode',
            // width:100,
            ...Search('materialCode'),
        },
        {
            width:150,
            title : "Material Desc",
            dataIndex:'materialDesc',
            // width:150,
            ...Search('materialDesc'),
        },
        {
            title : "Total BOQ Ref Qty",
            dataIndex:'totalBOQRefQty',
            width:150,
            ...Search('totalBOQRefQty'),
        },
        {
            title : "Total Req QTY",
            dataIndex:'totalReqQTY',
      
            width:150,
            ...Search('totalReqQTY'),
        },
        {
            width:150,
            title : "Boq Accuracy (%)",
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            {record.boqAccuracy <= 50 ? (<><Typography style={{color:"red"}}>{`${record.boqAccuracy} %`}</Typography></>):( <><Typography>{`${record.boqAccuracy} %`}</Typography></>)}
                         

                        </Space>
                       
                    </div>
                )
            },
            ...Search('boqAccuracy'),
        },
      
     
   
    

    ]
    const columnSiteBase = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Project Name",
            dataIndex:'projectName',
            // width:100,
            ...Search('projectName'),
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            // width:150,
            ...Search('siteNo'),
        },
        {
            title : "WorkpackageID",
            dataIndex:'workpackageid',
            width:150,
            ...Search('workpackageid'),
        },
        {
            title : "Material Code",
            dataIndex:'materialCode',
      
            width:150,
            ...Search('materialCode'),
        },
        {
            title : "Material Desc",
            dataIndex:'materialDesc',
      
            width:150,
            ...Search('materialDesc'),
        },
        {
            title : "BOQ Ref QTY",
            dataIndex:'boqRefQty',
      
            width:150,
            ...Search('boqRefQty'),
        },
        {
            title : "Total Req QTY",
            dataIndex:'reqQTY',
      
            width:150,
            ...Search('reqQTY'),
        },
   
        {
            title : "Boq Accuracy (%)",
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            {record.boqAccuracy <= 50 ? (<><Typography style={{color:"red"}}>{`${record.boqAccuracy} %`}</Typography></>):( <><Typography>{`${record.boqAccuracy} %`}</Typography></>)}
                         

                        </Space>
                       
                    </div>
                )
            },
            width:150,
            ...Search('boqAccuracy'),
        },
      
     
   
    

    ]




    useEffect(() => {
        getBoqAccuracyList();
      
    },[])

    function callback(key) {
        if(key==1){
            getBoqAccuracyList()
        }
        else if(key==2){
            // getMaterial()
        }
   
        console.log("keytabs",key);
    }

    return (
        <div>
            { isLoading ?   
                <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  
                :
                <Tabs defaultActiveKey="1" centered={false}  onChange={callback}>
                    <TabPane tab="Item Request" key="1">
                        <Table 
                            columns={columns} 
                            dataSource={dataBoqAccuracyList}
                            size="medium" 
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            scroll={{ x: '100%' }}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <Table 
                                        scroll={{ x: '100%',y:500 }}
                                        columns={columnDetail} 
                                        dataSource={dataBoqAccuracyDetail} 
                                        pagination={false}
                                        size="small" 
                                        bordered
                                    />
                                ),
                                rowExpandable: (record) => selectedBoqId == 0 ? record.boqId != selectedBoqId : record.boqId == selectedBoqId,
                                onExpand: (expanded, record) =>
                                    expanded ?
                                        getBoqAccuracyDetail(record)
                                        :
                                        setSelectedBoqId(0)
                            }} 
                        />  
                    </TabPane>
                    <TabPane tab="Sitebase Request" key="2">
                        <Table 
                            columns={columnsSite} 
                            dataSource={dataBoqAccuracyList}
                            size="medium" 
                            pagination={{
                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                showSizeChanger: true,
                                position: ["bottomLeft"],
                            }}
                            scroll={{ x: '100%',y:500 }}
                            expandable={{
                                expandedRowRender: (record) => (
                                    <Table 
                                        scroll={{ x: '100%' }}
                                        columns={columnSiteBase} 
                                        dataSource={dataBoqAccuracySiteBase} 
                                        pagination={false}
                                        size="small" 
                                        bordered
                                    />
                                ),
                                rowExpandable: (record) => selectedBoqId == 0 ? record.boqId != selectedBoqId : record.boqId == selectedBoqId,
                                onExpand: (expanded, record) =>
                                    expanded ?
                                        getBoqAccuracySiteBase(record)
                                        :
                                        setSelectedBoqId(0)
                            }} 
                        />  
                    </TabPane>
                
                </Tabs>
            }
          
        </div>
    )
}

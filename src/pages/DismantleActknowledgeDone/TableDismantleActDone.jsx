import React,{useEffect,useState} from 'react'
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux';

import {Table ,Space,Row,Col,Spin,Tooltip} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { EditFilled,EyeFilled,FileExcelOutlined  } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import exportFromJSON from 'export-from-json'
import { useHistory } from 'react-router-dom';

export default function TableDismantleActDone() {
    const history = useHistory()
    const [dataDismatleAct,setDtaDismantleAct] = useState([])
 
    const [isLoading, setIsLoading] = useState(true);

    const userId = useSelector(state=>state.auth.user.uid)

    
    function getDismantleActDone() {
        setIsLoading(true);
        API.getDismantleActDone(userId).then(
            result=>{
                setDtaDismantleAct(result);
                setIsLoading(false);
                console.log("data Dismantle Act Done =>",result);
            }
        )
    }

    const getDownloadAck = () => {
        API.getDismantleActDone(userId).then(
            result=>{
                // setDownloadData(result);
                console.log("data  Download :",result);
               
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `Dismantle_Ack`;
                exportFromJSON({ data, fileName, exportType });
               
            }
        )
    }

    const handleNavigate = (data) => {
        history.push(`/task/ackdismantleform?odi=${data.orderDetailId}&tdg=${data.transDelegateId}&pg=done`)
    }

    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "CPO No",
            dataIndex:'cpoNo',
            width:100,
            ...Search('cpoNo'),
        },
        {
            title : "Project Name",
            dataIndex:'projectName',
            width:150,
            ...Search('projectName'),
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            width:100,
            ...Search('siteNo'),
        },
        {
            title : "Site Name",
            dataIndex:'siteName',
      
            width:150,
            ...Search('siteName'),
        },
        {
            title : "Workpackage ID",
            dataIndex:'workpackageId',
            width:140,
            ...Search('workpackageId'),
        },
        {
            title : "Region",
            dataIndex:'region',
            width:150,
            ...Search('region'),
        },
        {
            title : "Zone",
            dataIndex:'zone',
            width:150,
            ...Search('zone'),
        },
        {
            title : "Site Address",
            dataIndex:'siteAddress',
            width:150,
            ...Search('siteAddress'),
        },
     
        {
            title : "Requested By",
            dataIndex:'requestedBy',
            width:150,
            ...Search('requestedBy'),
        },
        {
            title : "Request Date",
            width:100,
            render:(record)=>{
                return (
                    <div>
                        {record.requestDate !== null ? (<> <Space>
                            <p>{moment(record.requestDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('requestDate'),
        },
        {
            title : "Ack Completed By",
            width:100,
            dataIndex:'ackCompletedBy',
            ...Search('ackCompletedBy'),
        },
        {
            title : "Ack Complete Date",
            width:100,
            render:(record)=>{
                return (
                    <div>
                        {record.ackCompleteDate !== null ? (<> <Space>
                            <p>{moment(record.ackCompleteDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('ackCompleteDate'),
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
                            <Tooltip title="">
                                <IconButton
                                    size='small'
                                    color="primary"
                                    aria-label="upload file"
                                    component="span"
                                    onClick = {()=>handleNavigate(record)}>
                                    <EyeFilled />
                                </IconButton>
                            </Tooltip>
                            

                        </Space>
                       
                    </div>
                )
            },
        }
    ]




    useEffect(() => {
        getDismantleActDone();
      
    },[])
    


    return (
        <div>
            { isLoading ?   
                <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  
                :
                <><Row>
                    <Col md={24} sm={24}>
                        <div className='float-right'>

                            <Tooltip title="Download Template">
                                <IconButton size="medium" color="success" onClick={getDownloadAck}>

                                    <FileExcelOutlined />

                                </IconButton>
                                {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                            </Tooltip>
                        </div>
                    </Col>
                </Row><Table
                    scroll={{ x: '150%', y: 500 }}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataDismatleAct}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>}
        </div>
    )
}

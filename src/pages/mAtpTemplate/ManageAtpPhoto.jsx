/* eslint-disable react/jsx-no-bind */
import React,{useState,useEffect} from 'react'
import {Table,Col,Row,Tooltip,Spin,Switch,Modal,Form,Input,Space,Button,Select,Typography,Checkbox,Tabs} from "antd"
import API from '@app/utils/apiServices'
import { useHistory } from 'react-router-dom'
import Search from '@app/components/searchcolumn/SearchColumn'
import {IconButton, TextField,Paper}  from '@mui/material/';
import {EditFilled,CloseOutlined,CheckOutlined,PlusOutlined,EyeFilled }from '@ant-design/icons'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import LinkIcon from '@mui/icons-material/Link';
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';


export default function ManageAtpPhoto() {
    const {TabPane} = Tabs
    const customURL = window.location.href;
    const {Title} = Typography
    const [isLoading,setIsLoading] = useState(false)
    const params = new URLSearchParams(customURL.split('?')[1])
    const templateId = params.get('templateId');

    const data = [
        {
            photo:"test",
            Category:"test"
        }
    ]
  
    

    const columnAtp = [
        {
            title : "Photo",
            width : 900,
         
            render:(record)=>{
                return (
                    record.photo !== null ? (<Typography>{record.photo}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('AttachmentName'),
        },
        {
            title : "Mandatory",
            width : 100,
         
            render:(record)=>{
                return (
                    <Checkbox defaultChecked={record.isCWH} disabled />
                )
            },
        
        },
        {
            title : "Category",
            width : 100,
         
            render:(record)=>{
                return (
                    record.Category !== null ? (<Typography>{record.Category}</Typography>):(<Typography>-</Typography>)
                )
            },
       
        },
        {
    
            key:"orderMaterialId",
            align:'center',
            fixed: 'right',
            width: 100,
            render:(record)=>{
                return (
                    <Space>
                        <IconButton>
                            <CheckCircleOutlineIcon  style={{color:"#02c000"}} />   
                        </IconButton>
                        <IconButton>
                            <CheckCircleOutlineIcon  />  
                        </IconButton> 
                    </Space>
                )
            }
            
        },
    ]

    const columnAttachment = [
        {
            title : "Attachment",
            width : 700,
         
            render:(record)=>{
                return (
                    record.AttachmentName !== null ? (<Typography>{record.AttachmentName}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('AttachmentName'),
        },
        {
            title : "Category",
            width : 100,
         
            render:(record)=>{
                return (
                    record.AttachmentName !== null ? (<Typography>{record.AttachmentName}</Typography>):(<Typography>-</Typography>)
                )
            },
        },
        {
           
      
            align:'center',
            fixed: 'right',
            width: 100,
            render:(record)=>{
                return (
                    <Space>
                        <IconButton>
                            <CheckCircleOutlineIcon  style={{color:"#02c000"}} />   
                        </IconButton>
                        <IconButton>
                            <CheckCircleOutlineIcon  />  
                        </IconButton>
                                      
                                
                    </Space>
                )
            }
            
        },
    ]
    const columnAtpGroupRegist= [
        {
            title : "Photo",
            width : 700,
         
            render:(record)=>{
                return (
                    record.photo !== null ? (<Typography>{record.photo}</Typography>):(<Typography>-</Typography>)
                )
            },
            ...Search('AttachmentName'),
        },
        {
            title : "ATP Linked",
            width : 100,
         
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="Un-Linking ATP">
                            <IconButton>
                                <LinkOffIcon  style={{color:""}} /> 
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Linking SIR">
                            <IconButton>
                                <LinkIcon  style={{color:"#004b99"}} />   
                            </IconButton>
                        </Tooltip>
                                   
                                
                    </Space>
                )
            },
        },
        {
            title : "SA Linked",
            width : 100,
         
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="Un-Linking ATP">
                            <IconButton>
                                <LinkOffIcon  style={{color:""}} /> 
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Linking SIR">
                            <IconButton>
                                <LinkIcon  style={{color:"#004b99"}} />   
                            </IconButton>
                        </Tooltip>
                                       
                                    
                    </Space>
                )
            },
        },
        {
         
            align:'center',
            fixed: 'right',
            width: 100,
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                // onClick={() => showModalEdit(record)}
                            >
                                <CloseIcon  style={{color:"#c11111"}} />  
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Move Up">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                // onClick={() => showModalEdit(record)}
                            >
                                <ArrowUpwardIcon  style={{color:"#02c000"}} />  
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Move Up">
                            <IconButton
                                size='small'
                                color="primary"
                                aria-label="upload file"
                                component="span" 
                                // onClick={() => showModalEdit(record)}
                            >
                                <ArrowDownwardIcon  style={{color:"#c11111"}} />  
                            </IconButton>
                        </Tooltip>                
                    </Space>
                )
            }
            
        },
    ]

    useEffect(()=>{
      
    },[])


    function callback(key) {
     
        if(key==2){
            console.log("tab 2")
        }
        else if(key==3){
            console.log("tab 3")
        }
        console.log("keytabs",key);
    }
    return (
        <div>
            <HeaderChanger title="ATP Photo Setup"/>
            <Row gutter={24}>
                <Col gutter="row" xl={12}>
                
                   
                    <Tabs defaultActiveKey="1" centered={false} onChange={callback}>
                        <TabPane
                            tab="BOQ Material List" 
                            key="1" 
                            // onChange={getSconTaskPending}
                        >
                            <div style={{backgroundColor:"#004b99",padding:"2px 2px 2px 6px",borderRadius:4}}>
                                <Typography style={{color:"white",fontWeiht:"600"}}>ATP Photo Reference</Typography>
                            </div>
                            <div style={{marginTop:20}}>
                                {isLoading ? 
                                    <Row justify="center">
                                        <Col span={1}>    
                                            <Spin />
                                        </Col>
                                    </Row>  
                                    :
                                    <Table
                                        size="small"
                                        // expandable={{ expandedRowRender }}
                                
                                        columns={columnAtp}
                                        dataSource={data}
                                        rowKey={record => record.vehicleId}
                                        pagination={{
                                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                                            showSizeChanger: true,
                                            position: ["bottomLeft"],
                                        }}
                                        bordered />
                                }
                            </div>
                      
                        </TabPane>
                        <TabPane
                            tab="Attachment" 
                            key="2" 
                            // onChange={getSconTaskPending}
                        >
                            <div style={{backgroundColor:"#004b99",padding:"2px 2px 2px 6px",borderRadius:4}}>
                                <Typography style={{color:"white",fontWeiht:"600"}}>ATP Attachment Reference</Typography>
                            </div>
                            <div style={{marginTop:20}}>
                                {isLoading ? 
                                    <Row justify="center">
                                        <Col span={1}>    
                                            <Spin />
                                        </Col>
                                    </Row>  
                                    :
                                    <Table
                                        size="small"
                                        // expandable={{ expandedRowRender }}
                                
                                        columns={columnAttachment}
                                        // dataSource={dataFromFetch}
                                        rowKey={record => record.vehicleId}
                                        pagination={{
                                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                                            showSizeChanger: true,
                                            position: ["bottomLeft"],
                                        }}
                                        bordered />
                                }
                            </div>
                        </TabPane>
                    </Tabs>
                </Col>
                <Col gutter="row" xl={12}>
                    <div style={{backgroundColor:"#004b99",padding:"2px 2px 2px 6px",borderRadius:4,marginTop:"8.25vh",marginBottom:10}}>
                        <Typography style={{color:"white",fontWeiht:"600"}}>ATP Photo Group Registered</Typography>
                    </div>
                    <div>
                        <Typography>Max.Photo Per Page : <span style={{fontWeight:"800"}}>6</span></Typography>
                        <Typography>Total Page(s) : <span style={{fontWeight:"800"}}>1</span></Typography>
                    </div>
                    <div>
                        {isLoading ? 
                            <Row justify="center">
                                <Col span={1}>    
                                    <Spin />
                                </Col>
                            </Row>  
                            :<><div className='float-right'>
                                <Button style={{backgroundColor:"#02c000",color:"white",fontWeight:"600"}}>
                                    Publish
                                </Button>
                            </div><Table
                                size="small"
                                // expandable={{ expandedRowRender }}
                                columns={columnAtpGroupRegist}
                                dataSource={data}
                                rowKey={record => record.vehicleId}
                                pagination={{
                                    pageSizeOptions: ['5', '10', '20', '30', '40'],
                                    showSizeChanger: true,
                                    position: ["bottomLeft"],
                                }}
                                bordered /></>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

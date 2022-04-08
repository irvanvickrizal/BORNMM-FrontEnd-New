/* eslint-disable no-empty */
/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {Image,Table,InputNumber ,Tabs,Space,Row,Col,Spin,Tooltip,Modal,Upload,Button,Form,Input,Typography,Card,DatePicker} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { EyeFilled,DeleteOutlined ,UploadOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';
import {IconButton, TextField}  from '@mui/material/';

export default function TableDismantleActForm() {
    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const [dataTableAtas,setDataTableAtas] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { TabPane } = Tabs;

    const odi = params.get('odi');
    const tdg = params.get('tdg');

    
    const { Title } = Typography;
    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )

    function getDataSiteInfo() {
        setIsLoading(true);
        API.getDismantleSiteInfo(odi).then(
            result=>{
                setDataTableAtas(result);
                setIsLoading(false);
                console.log("data Site Indfo =>",result);
            }
        )
    }

    useEffect(() => {
        getDataSiteInfo();
      
    },[])

    function callback(key) {
        if(key==1){
    
        }
        else if(key==2){
         
        }
     
        console.log("keytabs",key);
    }

    const columnSiteInfo = [ 
      
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
            title : "Site Name",
            dataIndex:'siteName',
      
            ...Search('siteName'),
        },
        {
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            title : "Zone",
            dataIndex:'zone',
            ...Search('zone'),
        },
        {
            title : "Workpackage ID",
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
   
        {
            title : "Site Address",
            dataIndex:'siteAddress',
            ...Search('siteAddress'),
        },
        {
            title : "Scope Name",
            dataIndex:'scopeName',
            width:150,
            ...Search('scopeName'),
        },
        {
            title : "Package Name",
            dataIndex:'projectName',
            width:150,
            ...Search('projectName'),
        },

    ]
    

    

    return (
        <div>
            <Space direction="vertical" size={80} style={{width:"100%"}}>
                { isLoading ?   
                    <Row justify="center">
                        <Col span={1}>    
                            <Spin />
                        </Col>
                    </Row>  
                    :
                    <Card hoverable title={CardTitle("Site Info")}>
                        <Table
                            scroll={{ x: '120%' }}
                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                            // expandable={{ expandedRowRender }}
                            columns={columnSiteInfo}
                            dataSource={dataTableAtas}
                            pagination={false}
                            bordered />
                    </Card>
                }

                <Col hoverable span={24}>
                    <Card title={CardTitle("")}>
                    </Card>
                </Col>
            </Space>
      
                    
        </div>
    )
}

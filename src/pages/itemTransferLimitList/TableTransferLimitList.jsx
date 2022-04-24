import React,{useState,useEffect} from 'react'
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux';

import {Table,InputNumber ,Space,Row,Col,Spin,Tooltip,Modal,Upload,Button,Form,Input,Typography,Card,DatePicker} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { EditFilled,EyeFilled  } from '@ant-design/icons'

import { useHistory } from 'react-router-dom';


export default function TableTransferLimitList() {
    const history = useHistory()
    const [dataItemTransferLimit,setDataItemTransferLimit] = useState([])
 
    const [isLoading, setIsLoading] = useState(true);

    const userId = useSelector(state=>state.auth.user.uid)

    function getItemTransferList() {
        setIsLoading(true);
        API.getItemTransferMarketList().then(
            result=>{
                setDataItemTransferLimit(result);
                setIsLoading(false);
                console.log("data item Transfer  =>",result);
            }
        )
    }

    const handleNavigate = (data) => {
        history.push(`/ta/boqdetailwh?id=${data.dopId}`)
    }

    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "WH Name",
            dataIndex:'whName',
            width:200,
            ...Search('whName'),
        },
        {
            width:150,
            title : "WH Code",
            dataIndex:'whCode',
            ...Search('whCode'),
        },
        {
            width:150,
            title : "WH Adress",
            dataIndex:'whAddress',
            ...Search('whAddress'),
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
                            <Tooltip title="Go to WH Item Transfer Limit ">
                                <EditFilled style={{fontSize:20}} onClick = {()=>handleNavigate(record)}/>
                            </Tooltip>
                            

                        </Space>
                       
                    </div>
                )
            },
        }
    ]




    useEffect(() => {
        getItemTransferList();
      
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
                <Table
                    scroll={{ x: '100%' }}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataItemTransferLimit}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />}
        </div>
    )
}

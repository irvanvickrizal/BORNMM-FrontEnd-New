import React,{useEffect,useState} from 'react'
import {Table,Card,Col,Space,Spin,Row,Tooltip,Modal,Button,Typography} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import { EditOutlined,DeleteFilled  } from '@ant-design/icons'
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'
import {IconButton, TextField}  from '@mui/material/';

export default function TableOrderRejection() {
    const history = useHistory()
    const [dataOrderRejectionPending,setDataOrderRejectionList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [modalDeleteVisible,setModalDeleteVisible] = useState(false)
    const [odi,setOdi] = useState("")

    function getOrderRejectionPendingList() {
        setIsLoading(true);
        API.getOrderRejectionPendigList().then(
            result=>{
                setDataOrderRejectionList(result);
                setIsLoading(false);
                console.log("rejection =>",result);
            }
        )
    }



    useEffect(() => {
        getOrderRejectionPendingList();
    },[])


    const hideModalDelete = () => {
        setModalDeleteVisible(false)
    }
    const showModalDelete = (data) => {
        setModalDeleteVisible(true)
        setOdi(data)
    }
    const handleDelete =()=> {
        setIsLoading(true);
        API.postDeleteOrderList("",odi).then(
            result=>{
                try{
                    if(result.status=="success"){
                        setIsLoading(false)
                        toast.success(result.message)
                        getOrderRejectionPendingList()
                  
                     
                    }
              
                }
                catch(e){
                    toast.error(result.message)
                    setIsLoading(false)
                    console.log(e,"error catch")
                }
            }
        )
        setModalDeleteVisible(false)
    
    }

    const navigateTo =(record)=>{
        history.push(`materialorder?odi=${record}`)
    }

    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            width:150,
            title : "Request No",
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            width:150,
            title : "Order Type",
            dataIndex:'orderType',
            ...Search('requestNo'),
        },
        {
            width:150,
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            width:150,
            title : "Origin",
            dataIndex:'originName',
            ...Search(''),
        },
        {
            width:150,
            title : "Destination",
            dataIndex:'destinationName',
            ...Search(''),
        },
        {
            width:150,
            title : "Site Name",
            dataIndex:'siteName',
            responsive: ['md'],
            ...Search('siteName'),
        },
        {
            width:150,
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            width:150,
            title : "Workpackage Id",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
        },
        {
            width:150,
            title : "Scope Name",
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            width:150,
            title : "Scope Detail",
            dataIndex:'scopeDetail',
            ...Search('scopeDetail'),
        },
        {
            width:150,
            title : "Reason of Rejection",
            dataIndex:'reasonOfRejection',
            ...Search('reasonOfRejection'),
        },
        {
            width:150,
            title : "Rejected By",
            dataIndex:'rejectedBy',
            ...Search('rejectedBy'),
        },
        {
            width:150,
            title : "Incoming Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.incomingDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('incomingDate'),
        },
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            fixed:'right',
            width:90,
            render:(record)=>{
                return (
                    <div>
                       
                        <Space size={2}>
                            <Tooltip title="Material Order Form ">
                                <IconButton size="small" color="primary" onClick={()=>navigateTo(record.orderDetailId)}>
                                    <EditOutlined style={{fontSize:20}} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title=" Delete Order Request">
                                <IconButton size="small" color="error" onClick={()=>showModalDelete(record.orderDetailId)}>
                                    <DeleteFilled style={{fontSize:20,color:'red'}} />
                                </IconButton>
                            </Tooltip>
                        </Space>
                        
                    </div>
                    
                   
                )
            }
            
        },
    ]




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
                    scroll={{ x: '150%' }}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    // expandable={{ expandedRowRender }}
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataOrderRejectionPending}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />}
                  
            {/*  Modal Delete */}
            <Modal title="Delete Order Rejection Pending" visible={modalDeleteVisible}  onCancel={hideModalDelete} 
                footer={[
                    <Button key="back" onClick={hideModalDelete} >
                Cancel
                    </Button>,
                    <Button key="submit" type="danger" onClick={()=>handleDelete()} >
                Delete
                    </Button>,
                
                ]} >
                <Typography>Are You Sure You Want to Proceed  ?
                </Typography>
      
            </Modal>
        </div>
    )
    
}

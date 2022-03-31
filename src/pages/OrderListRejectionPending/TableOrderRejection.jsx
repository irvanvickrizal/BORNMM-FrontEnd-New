import React,{useEffect,useState} from 'react'
import {Table,Card,Col,Space,Spin,Row,Tooltip,Modal,Button,Typography} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import { EditOutlined,DeleteFilled  } from '@ant-design/icons'
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'

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
            title : "Request No",
            dataIndex:'requestNo',
            ...Search('requestNo'),
        },
        {
            title : "Order Type",
            dataIndex:'orderType',
            ...Search('requestNo'),
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Origin",
            dataIndex:'originName',
            ...Search(''),
        },
        {
            title : "Destination",
            dataIndex:'destinationName',
            ...Search(''),
        },
        {
            title : "Site Name",
            dataIndex:'siteName',
            responsive: ['md'],
            ...Search('siteName'),
        },
        {
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            title : "Workpackage Id",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
        },
        {
            title : "Scope Name",
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title : "Scope Detail",
            dataIndex:'scopeDetail',
            ...Search('scopeDetail'),
        },
        {
            title : "Reason of Rejection",
            dataIndex:'reasonOfRejection',
            ...Search('reasonOfRejection'),
        },
        {
            title : "Rejected By",
            dataIndex:'rejectedBy',
            ...Search('rejectedBy'),
        },
        {
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
            render:(record)=>{
                return (
                    <div>
                       
                        <Space size={20}>
                            <Tooltip title="Material Order Form ">
                                <EditOutlined style={{fontSize:20}} onClick={()=>navigateTo(record.orderDetailId)}/>  
                            </Tooltip>
                             
                    
                                                         
                            <Tooltip title=" Delete Order Request">
                                <DeleteFilled style={{fontSize:20,color:'red'}} onClick={()=>showModalDelete(record.orderDetailId)}/>
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

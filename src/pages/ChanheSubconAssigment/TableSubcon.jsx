import React,{useEffect,useState} from 'react'
import API from '@app/utils/apiServices'
import { useSelector ,useDispatch} from 'react-redux';
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { EyeFilled,DeleteOutlined ,EditOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import {Image,Table,InputNumber ,Space,Row,Col,Spin,Tooltip,Modal,Upload,Button,Form,Input,Typography,Card,DatePicker} from "antd"

export default function TableSubcon() {
    const [dataSubcon,setDataSubcon] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const userId = useSelector(state=>state.auth.user.uid)

    function getDataChangeSubcon() {
        setIsLoading(true);
        API.getDataTaskChangeSubcon(userId).then(
            result=>{
                setDataSubcon(result);
                setIsLoading(false);
                console.log("data Subcon =>",result);
            }
        )
    }


    const columns = [
        {
            title : "No",
            width : 15,
            align:'center',
            render: (value, item, index) => 1 + index
        },
        {
            width:60,
            title : " Order Request No",
            dataIndex:'orderRequestNo',
            ...Search('orderRequestNo'),
        },
        // {
        //     width:150,
        //     title : " ODI",
        //     dataIndex:'orderDetailId',
        //     ...Search('orderDetailId'),
        // },
        {
            width:40,
            title : "Schedule Date",
            render:(record)=>{
                return (
                    <div>
                        {record.scheduleDate !== null ? (<> <Space>
                            <Typography>{moment(record.scheduleDate).format("YYYY-MM-DD")}</Typography>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('scheduleDate'),
        },
    
        {
            width:40,
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            width:40,
            title : "Site Name",
            dataIndex:'siteName',
      
            ...Search('siteName'),
        },
        {
            width:40,
            title : "workpackage ID",
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            width:30,
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            width:30,
            title : "Zone",
            dataIndex:'zone',
            ...Search('zone'),
        },
        {
            width:30,
            title : "Subcon Name",
            dataIndex:'subconName',
            ...Search('subconName'),
        },
        {
            title : "Coordinator Name",
            dataIndex:'coordinatorName',
            width:30,
            ...Search('coordinatorName'),
        },
        {
            width:30,
            title : "engineerName",
            dataIndex:'engineerName',
            ...Search('engineerName'),
        },
    
        {
            title : "ACK Status",
            dataIndex:'ackStatus',
            width:40,
            ...Search('ackStatus'),
        },
    
       
        {
            title:"Action",
           
            align:'center',
            fixed:'right',
            width:18,
            render:(record)=>{
                return (
                    <div>
                        <Tooltip title="Change Subcon Assigmnet">
                            <EditOutlined style={{fontSize:16,color:"#004b99"}}/>
                        </Tooltip>
                    </div>
                )
            }
            //     return (
            //         <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
            //             <Space size={20}>
            //                 {record.taskCompleteDate == null ? (<></>):(
            //                     <Tooltip title="View HO Document">
            //                         <EyeFilled style={{fontSize:20,color:"#0332c3"}}
            //                             onClick={()=>showModal(record)}
            //                         />
            //                     </Tooltip>)}
            //                 {record.confirmStatus === "Confirmed" ? ( 
            //                     <Tooltip title="View Map">
            //                         <IconButton
            //                             size='small'
            //                             color="primary"
            //                             aria-label="upload file"
            //                             component="span"
            //                             onClick={()=>{showModalMap(record.orderDetailId)}}>
            //                             <RoomIcon style={{color:"red"}}  />
            //                         </IconButton>
            //                     </Tooltip>):(<></>)}
            //             </Space>
                       
            //         </div>
            //     )
            // },
        }
    ]


    useEffect(() => {
        getDataChangeSubcon();
      
      
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
                    scroll={{ x: '200%',y:500 }}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataSubcon}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />}
                    
        </div>
    )
}

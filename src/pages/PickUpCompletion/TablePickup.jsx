/* eslint-disable react/no-unstable-nested-components */
import React,{useState,useEffect} from 'react'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import { EditOutlined,DeleteFilled,EyeFilled   } from '@ant-design/icons'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { toast } from 'react-toastify'

import { useHistory } from 'react-router-dom';
import {Table,Modal,Space,Col,Typography,Row,Spin,Tooltip,Button, Tabs,Card,Form,Select,Input} from "antd"
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux'

export default function TablePickup() {
    const [dataPickUp,setDataPickup] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [transDelegateId,setTransDelegateId] = useState(false)
    const [selectedRequestNo,setRequestNo] = useState('');
    const [selectedRFPDate,setSelectedRFPDate] = useState('');
    const [selectedTransportTeam,setSelectedTransportTeam] = useState('');
    const [selectedWpid,setSelectedWpid] = useState('');
    const [ddl,setDdl] = useState([])
    const [selectedAssignTo,setSelectedAssignTo] = useState('');
    
    const history = useHistory()
    const {Title} = Typography

    const CardTitle = (title) => <Title level={5}>{title}</Title>
    const userId = useSelector(state=>state.auth.user.uid)


    function getPickUpCompletion() {
        setIsLoading(true);
        API.getPickUpCompletion(userId).then(
            result=>{
                setDataPickup(result);
                setIsLoading(false);
                console.log("completion =>",result);
            }
        )
    }

    
    useEffect(() => {
        getPickUpCompletion();
        console.log(userId,"asdasd")
    },[])
    const ddlTransporTeam = (transportTeamId,workpackageid) => {
        setIsLoading(true);
        API.getDdlTransportTeam(transportTeamId,workpackageid).then(
            result=>{
                setDdl(result);
                setIsLoading(false);
                console.log("ddl =>",result);
            }
        )
    }


    const showModal = (record) => {
        setTransDelegateId(record.transDelegateId)
        setRequestNo(record.requestNo)
        setSelectedRFPDate(record.rfpDate);
        setSelectedTransportTeam(record.transportTeamId)
        setSelectedWpid(record.workpackageid)
        setIsModalVisible(true)
        ddlTransporTeam(record.transportTeamId,record.workpackageid)
        console.log(record.transportTeamId)
    }

    const hideModal = () => {
        setIsModalVisible(false)
    }
    const handlePost = () => {
        setIsLoading(true);
        const body = {
            "transDelegateId":transDelegateId,
            "transferTo":selectedAssignTo,
            "transferBy":userId
        }
        API.postPickUpCompletion(body).then(
            result=>{
              
                if(result.status=="success")
                {
                    toast.success(result.message);
                    getPickUpCompletion()
                    setIsModalVisible(false)
                }
                else{
                    toast.error(result.message)
                }
            })
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
            ...Search('destinationName'),
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
            title : "CDMR Req",
            dataIndex:'cdmrType',
            ...Search('cdmrType'),
        },
        {
            title : "RFP Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.rfpDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('incomingDate'),
        },

        {
            title : "Assigned By",
            dataIndex:'assignBy',
            ...Search('assignBy'),
        },
  
        {
            title : "Assign Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.assignDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('assignDate'),
        },
        {
            title : "Assign Status",
            dataIndex:'assignStatus',
            ...Search('assignStatus'),
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
                      
                            <Tooltip title="Re-Assign Transport team Form">
                                <LocalShippingIcon style={{fontSize:24,color:"#2886b8"}} onClick={()=>showModal(record)}/>  
                            </Tooltip>
                             
                    
                                                         
                            <Tooltip title=" Delete Order Request">
                                <EyeFilled style={{fontSize:20}} />
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
                    dataSource={dataPickUp}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />}
            <Modal title="ReAssignment Task"
                visible={isModalVisible}
                destroyOnClose
                footer={null}
                
                onCancel={hideModal}
            >
                <div>
        
                    <Form
                        name="basic"
                        style={{marginRight:96}}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        initialValues={{
                            'transDelegateId' : transDelegateId,
                            'requestNo': selectedRequestNo,
                            'rfpDate' : moment(selectedRFPDate).format("YYYY-MM-DD"),
                         
                        }}
                        // onFinish={handleOKForm}
                        // onFinishFailed={handleFailedForm}
                        autoComplete="off"
                    >
                        <Form.Item
                            // hidden
                            label="Trans Delegate ID"
                            name="transDelegateId"
                            hidden
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                            // hidden
                            label="Request No"
                            name="requestNo"
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                            // hidden
                            label="RFP Date"
                            name="rfpDate"
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item name="assignTo" label="Assign To"
                            rules={[{ required: true, message: 'Please input Assign To!' }]}
                        >
                            <Select
                                onChange={(e) => setSelectedAssignTo(e)} 
                                placeholder="Select an option">
                                {
                                    ddl?.map(rbs =>  <Select.Option value={rbs.requestTypeId}> 
                                        {rbs.requestTypeName}</Select.Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                      
                            <div className='float-right'>
                                <Button type="primary" htmlType="submit" onClick={handlePost}>
                            Confirm
                                </Button>
                            </div>
                            

                        </Form.Item>
                    </Form>
         \
                </div>
                
            </Modal>
        </div>
    )
}

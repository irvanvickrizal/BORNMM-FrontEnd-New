/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import moment from 'moment'
import {Table,Modal,Form,Typography,Select,Button,Col,Row,Space,Spin,Tooltip,DatePicker,Input,Card} from "antd"
import GroupIcon from '@mui/icons-material/Group';
import API from '@app/utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import {EyeFilled } from '@ant-design/icons'

export default function TableSubconCancelation() {
    const [isModalViseble,setIsModalVisible] = useState(false)
    const [dataTaskCancel,setDataTaskCancel] = useState([])
    const [ddlSubcon,setDdlSubcon] = useState("")
    const [ddlCoordinator,setDdlCoordinator] = useState("")
    const {Title} = Typography
    const [isLoading,setIsLoading] = useState(false)
    const page =1
    const CardTitle = (title) => <Title level={5}>{title}</Title>

    const showModal = () => {
        setIsModalVisible(true)
    }

    const hideModal = () => {
        setIsModalVisible(false)
    }

    const dataIn = [
        {
            requesstNo:1192,
            orderType:"Dismantle",
            siteNo:"22",
            originName:"Semarang",
            destinationName:"West Java",
            siteName:"DOP",
            region:"West Java",
            workpackageid:"408123",
            scopeName:"Dismantle",
            pickupOrDeliveryDate:null,
            incomingDate:null,






        }
    ]

    const columns = [
        
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Request No",
            dataIndex: "requestNo",
            ...Search("requestNo")
        },
        {
            title: "Order Type",
            dataIndex: "orderType",
            ...Search("orderType")
        },
        {
            title: "Site No",
            dataIndex: "siteNo",
            ...Search("siteNo")
        },
    
        {
            title: "Origin",
            dataIndex: "originName",
            ...Search("originName")
        },
        {
            title: "Destination",
            dataIndex: "destinationName",
            ...Search("destinationName")
        },
        {
            title: "Site Name",
            dataIndex: "siteName",
            ...Search("siteName")
        },
        {
            title: "Region",
            dataIndex: "region",
            ...Search("region")
        },
        {
            title: "Work Pakgae ID",
            dataIndex: "workpackageid",
                
            ...Search("workpackageid")
        },
        {
            title: "Scope Name",
            dataIndex: "scopeName",
            ...Search("scopeName")
        },
        {
            title: "Pickup Date",
                
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(dataIn.pickupOrDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search("pickupOrDeliveryDate")
        },
        // {
        //     title: "Assign To",
        //     dataIndex: "assignedTo",
        //     ...Search("assignedTo")
        // },
        {
            title: "Incoming Date",
            dataIndex: "incomingDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(dataIn.incomingDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search("incomingDate")
        },
        {
            title: "Action",
            align:'center',
            fixed:'right',
           
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            <Tooltip title="Re-Assign Task">
                                <GroupIcon  style={{fontSize:20}} onClick={()=>showModal(record)}/>
                            </Tooltip>
                            <Tooltip title="View Detail">
                                <EyeFilled  style={{fontSize:20}}/>
                            </Tooltip>
                        </Space>
                    </div>
                )
            },
          
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
                    columns={columns}
                    scroll={{ x: '150%' }}
                    dataSource={dataIn}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered 
                />
            }
            <Modal visible={isModalViseble} onCancel={hideModal}
                footer={null}>
                <div> <Card  title={CardTitle("Re-Assign Task Subcontractor")}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{
                         
                        //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                        // remember: true
                        }}
                   
                   
                        autoComplete="off"
                    >
                        <Form.Item
                        // hidden
                            label="Subcon List"
                            name="subconList"
                            rules={[{ required: true, message: 'Please Select Subcon!' }]}
                        >
                            <Select
                                onChange={(e) => setDdlSubcon(e)}
                                placeholder="Select an option"
                                    
                            >
                                {/* {lsp?.length == 0 ? (<></>):( lsp?.map((inv) => (
                                    <Select.Option value={inv.subconId}>
                                        {inv.subconName}
                                    </Select.Option>
                                )))
                                } */}
                            </Select>
                        </Form.Item>
                        <Form.Item
                        // hidden
                            label="Project Coordinator"
                            name="coordinator"
                            rules={[{ required: true, message: 'Please Select Project Coordinator!' }]}
                        >
                            <Select
                                onChange={(e) => setDdlCoordinator(e)}
                                placeholder="Select an option"
                                    
                            >
                                {/* {lsp?.length == 0 ? (<></>):( lsp?.map((inv) => (
                                    <Select.Option value={inv.subconId}>
                                        {inv.subconName}
                                    </Select.Option>
                                )))
                                } */}
                            </Select>
                        </Form.Item>
                        <div className="float-right">
                            <Col span={4} md={8} sm={24} >
                                <Space direction="horizontal">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                       
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            hideModal()
                                        }
                                    >
                                        Cancel
                                    </Button>
                                 
                             
                                </Space>
                            </Col>
                        </div>
            
                     

                  
                    </Form>
                </Card>
                </div>
            </Modal>

        </div>
    )
}

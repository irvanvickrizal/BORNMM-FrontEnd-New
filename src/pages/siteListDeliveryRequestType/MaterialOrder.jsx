/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable react/jsx-no-undef */
import React,{useState, useEffect} from 'react'
import {Table, Row, Col,Card, Typography, Input, Space, Form,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    message,
    Divider ,
    Tabs,
    Tooltip,
    Modal } from 'antd'
import { DownloadOutlined,PlusOutlined,FileExcelOutlined } from '@ant-design/icons';
    
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import API  from '../../utils/apiServices';
import exportFromJSON from 'export-from-json'
import moment from 'moment';
import DataGenerator from './DataGenerator';

export default function MaterialOrder() {
    
    const exportType =  exportFromJSON.types.xls;

    const [selectedButton,setSelectedButton] = useState(true);
    const [orderDetailData,setOrderDetailData] = useState([]);
    const [orderDetailMaterial,setOrderDetailMaterial] = useState([]);
    
    // const [orderType, setOrderType] = useState('');
    // const [inventoryCode, setInventoryCode] = useState('');
    // const [requestBase, setRequestBase] = useState('');
    // const [siteLocation, setSiteLocation] = useState('');
    // const [ctName, setCTName] = useState('');
    // const [siteCondition, setSiteCondition] = useState('');
    // const [origin, setOrigin] = useState('');
    // const [destination, setDestination] = useState('');
    // const [subcon, setSubcon] = useState('');
    // const [packetType, setPacketType] = useState('');
    // const [deliveryDate, setDeliveryDate] = useState('');

    const { TabPane } = Tabs;

    const { Title } = Typography;
  
    const columnsMaterialOrder =[
        {
            title:"Item Code",
            dataIndex:"materialCode",
            key:"orderMaterialId"
        },
        {
            title:"Material Desc",
            dataIndex:"materialDesc",
            key:"orderMaterialId",
        },
        {
            title:"UOM",
            dataIndex:"uom",
            key:"orderMaterialId",
        },
        {
            title:"QTY Req",
            dataIndex:'reqQTY',
            key:"orderMaterialId",
        },
        {
            title:"QTY Ref",
            dataIndex:'refQTY',
            key:"orderMaterialId",
        },
        {
            title:"Balance",
            dataIndex:"balanceQTY",
            key:"orderMaterialId",

        },
        {
            title:"Site",
            dataIndex:"site",
            key:"orderMaterialId",
        },
        {
            title:"Order Status",
            dataIndex:"orderStatus",
            key:"orderMaterialId",
        },
        {
            title:"Action",
            key:"orderMaterialId",
        }
    ]

    const columnsOrderDetail =[
        {
            title:"Inventory Code",
            dataIndex:"inventoryCode",
            key:"orderDetailId"
        },
        {
            title:"Order Type",
            dataIndex:"orderType",
            key:"orderDetailId"
        },
        {
            title:"Request Type",
            dataIndex:"requestTypeName",
            key:"orderDetailId"
        },
        {
            title:"CT Name",
            dataIndex:'ctName',
            key:"orderDetailId"
        },
        {
            title:"Site Condition",
            dataIndex:"siteCondition",
            key:"orderDetailId"
        },
        {
            title:"Delivery Type",
            dataIndex:"deliveryType",
            key:"orderDetailId"
        },
        {
            title:"Packet Type",
            dataIndex:"packetType",
            key:"orderDetailId"
        },
        {
            title:"Subcon",
            dataIndex:"recipientOrDismantledBy",
            key:"orderDetailId"
        },
        {
            title:"Requester",
            dataIndex:"requesterName",
            key:"orderDetailId"
        },
        {
            title:"Request Date",
            dataIndex:"requestDate",
            key:"orderDetailId"
        },
        {
            title:"Expected Delivery Date",
            dataIndex:"expectedDeliveryDate",
            key:"orderDetailId"
        }
    ]

    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const odiParam = params.get('odi');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [siteNo, setSiteNo] = useState('');
    const [wpid, setWPID] = useState('');
    const [boqRef, setBOQRef] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
        console.log(isModalVisible);
    };
    
    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getOrderDetail=(odi)=>{
        API.getOrderDetailForm(odi).then(
            result=>{
                setOrderDetailData(result);
                setWPID(result[0].workpackageId);
                setSiteNo(result[0].siteNo);
                console.log('orderdetailform',result);
            }
        )
    }
   
    const handleDownloadBtn=()=>{
        API.getBOQRefGetList(odiParam).then(
            result=>{
                const data = result.map((rs)=>DataGenerator.boqRef(
                    rs.workpackageId 
                    , rs.materialCode
                    , rs.materialDesc
                    , rs.refQTY))
                const fileName = `boqactref_${siteNo}_${wpid}`;
                exportFromJSON({ data, fileName, exportType });
            }
        )
    }

    const getOrderDetailMaterial=(odi)=>{
        API.getOrderDetailMaterial(odi).then(
            result=>{
                setOrderDetailMaterial(result);
            }
        )
    }
   
    const expandedRowRender = () => {
        const columnsSiteInfo =[
            {
                title:"Site No",
                dataIndex:"siteNo",
            },
            {
                title:"Site Name",
                dataIndex:"siteName",
            },
            {
                title:"Region",
                dataIndex:"region",
            },
            {
                title:"Zone",
                dataIndex:'zone',
            },
            {
                title:"WorkpackageId",
                dataIndex:"workpackageId",
            },
            {
                title:"Package Name",
                dataIndex:"packageName",
            },
            {
                title:"CPO No",
                dataIndex:"cpoNo",
            },
            {
                title:"Project Name",
                dataIndex:"projectName",
            }
        ]
    
        return (
            <Card title="Site Info"  hoverable>
                <Table 
                    columns={columnsSiteInfo} 
                    dataSource={orderDetailData} 
                    pagination={false} 
                    bordered
                />
            </Card>
        );
    };


    // eslint-disable-next-line react/no-unstable-nested-components
    useEffect(() => {
        getOrderDetail(odiParam);
        getOrderDetailMaterial(odiParam);
    },[])

    return (
        <div>
            <HeaderChanger title="Material Order Form"/>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Card hoverable>
                    <Col md={16} sm={24} >
                        <Title level={5}>Order Detail</Title>
                    </Col>
                    <Table 
                        scroll={{ x: '100%' }} 
                        size="small"  
                        expandable={{ expandedRowRender }}
                        columns={columnsOrderDetail} 
                        dataSource={orderDetailData} 
                        pagination={false} 
                        bordered/>
                </Card>
                <Row gutter={16}>
                    <Col md={24} sm={24} >
                        <Card hoverable>
                            <Row>
                                <Col md={16} sm={24} >
                                    <Title level={5}>Material Order List</Title>
                                </Col>
                                <Col md={8} sm={24} >
                                    <div className='float-right'>
                                        <Space>
                                            <Tooltip title="Add Material">
                                                <Button type="primary" icon={<PlusOutlined />} onClick={showModal}  />
                                            </Tooltip>
                                            <Tooltip title="Download BOQ Ref">
                                                <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} />
                                            </Tooltip>
                                        </Space>
                                    </div>
                                </Col>
                            </Row>
                            <Space direction="vertical" style={{ width: '100%' }} >
                                <Table 
                                    className="components-table-demo-nested"
                                    columns={columnsMaterialOrder} 
                                    scroll={{ x: '100%' }} 
                                    dataSource={orderDetailMaterial} 
                                    size="small"
                                    pagination={false} 
                                />
                                <Divider />
                                <Row>
                                    <Col span={15}>
                                    </Col>
                                    <Col span={8}>
                                        <Space>
                                            <Button type="danger" htmlType="submit">
                                            Save as Draft
                                            </Button>
                                            <Button type="primary" htmlType="submit">
                                            Book and Submit
                                            </Button>
                                            <Button type="primary" htmlType="submit">
                                            Submit
                                            </Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </Space>
            <Modal title="Material List" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                
            </Modal>
        </div>
    )
}

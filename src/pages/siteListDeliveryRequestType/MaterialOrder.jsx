/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prefer-destructuring */
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
    InputNumber ,
    DatePicker,
    TreeSelect,
    Popconfirm,
    Switch,
    message,
    Divider ,
    Tabs,
    Tooltip,
    Modal } from 'antd'
import { DownloadOutlined,PlusOutlined,FileExcelOutlined,CloseOutlined, EditOutlined,DeleteOutlined,CheckOutlined  } from '@ant-design/icons';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import API  from '../../utils/apiServices';
import exportFromJSON from 'export-from-json'
import moment from 'moment';
import DataGenerator from './DataGenerator';
import {IconButton, TextField}  from '@mui/material/';
import {useDispatch, useSelector} from 'react-redux';

export default function MaterialOrder() {
    
    const user = useSelector((state) => state.auth.user);
    const { Option } = Select;
    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const odiParam = params.get('odi');
    const exportType =  exportFromJSON.types.xls;

    const [selectedButton,setSelectedButton] = useState(true);
    const [orderDetailData,setOrderDetailData] = useState([]);
    const [orderDetailMaterial,setOrderDetailMaterial] = useState([]);
    const [orderDetailMaterialExcluded,setOrderDetailMaterialExcluded] = useState([]);
    const [materialChoosed,setMaterialChoosed] = useState([]);
    const [materialChoosedEdit,setMaterialChoosedEdit] = useState([]);
    const [reqQTY, setReqQTY] = useState('');

    const { TabPane } = Tabs;

    const { Title } = Typography;
  
    const [isModalAddMaterial, setIsModalAddMaterial] = useState(false);
    const [isModalEditMaterial, setIsModalEditMaterial] = useState(false);
    const [siteNo, setSiteNo] = useState('');
    const [wpid, setWPID] = useState('');
    const [boqRef, setBOQRef] = useState('');
    const [stockCheck, setStockCheck] = useState(false);
    const history = useHistory();

    const [selectedMaterialId,setSelectedMaterialId] = useState('');
    const [selectedMaterialCode,setSelectedMaterialCode] = useState('');
    const [selectedMaterialDesc,setSelectedMaterialDesc] = useState('');
    const [selectedUOM,setSelectedUOM] = useState('');
    const [selectedQTYReq,setSelectedQTYReq] = useState('');
    const [selectedQTYRef,setSelectedQTYRef] = useState('');
    const [selectedBalance,setSelectedBalance] = useState('');
    const [selectedSite,setSelectedSite] = useState('');
    const [selectedOrderStatus,setSelectedOrderStatus] = useState('');

    const navigateTo = (path) => {
        history.push(path)
    }
    const getOrderDetailMaterial=(odi)=>{
        API.getOrderDetailMaterial(odi).then(
            result=>{
                setOrderDetailMaterial(result);
            }
        )
    }
    const handleEditMaterial = (data) => {
        setSelectedMaterialId(data.orderMaterialId);
        setSelectedMaterialCode(data.materialCode);
        setSelectedMaterialDesc(data.materialDesc);
        setSelectedUOM(data.uom);
        setSelectedQTYRef(data.refQTY);
        setSelectedQTYReq(data.reqQTY);
        setSelectedBalance(data.availableQTY);
        setSelectedOrderStatus(data.orderStatus);
        setIsModalEditMaterial(true);
        console.log("edit data", data);
    }

    const handleDeleteMaterial = (data) => {
        if (window.confirm('Are you sure you want to delete this material ?')) {
            console.log("edit data", data);
            const body=(
                {
                    "orderDetailId":odiParam,
                    "reqQty":data.reqQTY,
                    "LMBY":user.uid,
                    "stockCheck":false,
                    "neType":data.site
                }
            )
            console.log("delete material",body)
            API.deleteMaterialOrderRequest(data.orderMaterialId).then(
                result=>{
                    if(result.status=="success"){
                        toast.success(result.message)
                        getOrderDetailMaterial(odiParam);
                    }
                    else{
                        toast.error(result.message)
                    }
                }
            )
        }

    }

    const handleChangeNeType=(value) => {
        console.log(`selected ${value}`);
    }

    const handleChangeQTY=(value) => {
        console.log(`selected ${value}`);
    }

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
            align:'center',
            render:(record)=>{
                return (
                    <Space>
                        <Tooltip title="Edit Req Quantity">
                            <EditOutlined onClick={() => handleEditMaterial(record)} />
                        </Tooltip>
                        {record.isBoqRef?
                            null
                            :
                            <Tooltip title="Delete Material">
                                <DeleteOutlined onClick={() => handleDeleteMaterial(record)} />
                            </Tooltip>
                        }
                    </Space>
                )
            }
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
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.requestDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            }
        },
        {
            title:"Expected Delivery Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.expectedDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            }
        },
        
    ]
    
    const handleAddMaterial = (data) => {
        setMaterialChoosed(data);
    }

    const onFinishAddMaterial = (values) => {
        const body=(
            {
                "orderDetailId":odiParam,
                "materialCode":values.materialCode,
                "reqQty":values.reqQTY,
                "LMBY":user.uid,
                "stockCheck":false,
                "neType":values.neType
            }
        )
        console.log("submit material",body)
        API.postAddMaterial(body).then(
            result=>{
                if(result.status=="success"){
                    toast.success(result.message)
                    setIsModalAddMaterial(false);
                    setMaterialChoosed([]);
                    getOrderDetailMaterial(odiParam);
                }
                else{
                    toast.error(result.message)
                    setIsModalAddMaterial(false);
                    setMaterialChoosed([]);
                }
            }
        )
    };
    
    const onFinishFailedAddMaterial = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishFailedEditMaterial = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishEditMaterial = (values) => {
        const body=(
            {
                "orderMaterialId":values.orderMaterialId,
                "reqQty":values.reqQTY,
                "LMBY":user.uid,
                "stockCheck":false
            }
        )
        console.log("edit material",values)
        API.putEditQtyMaterial(body).then(
            result=>{
                if(result.status=="success"){
                    toast.success(result.message)
                    setIsModalEditMaterial(false);
                    setMaterialChoosed([]);
                    getOrderDetailMaterial(odiParam);
                }
                else{
                    toast.error(result.message)
                    setIsModalEditMaterial(false);
                    setMaterialChoosed([]);
                }
            }
        )
    };

    const columnsMaterialListExcluded =[
        {
            title:"ID",
            dataIndex:"materialId",
            key:"materialId"
        },
        {
            title:"Subcategory Name",
            dataIndex:"subCategoryName",
            key:"subCategoryName"
        }, 
        {
            title:"Material Code",
            dataIndex:"materialCode",
            key:"materialCode"
        }, 
        {
            title:"Material Desc",
            dataIndex:"materialDesc",
            key:"materialDesc"
        },
        // {
        //     title:"NE Type",
        //     render:(record)=>{
        //         return (
        // <Select defaultValue="NE" style={{ width: 120 }} onChange={handleChangeNeType} disabled>
        //     <Option value="NE">NE</Option>
        //     <Option value="FE">FE</Option>
        // </Select>
        //         )
        //     }
        // },
        // {
        //     title:"QTY",
        //     render:(record)=>{
        //         return (
        //             <InputNumber min={1} defaultValue={1} onChange={(e)=>handleChangeQTY(e)} disabled />
        //         )
        //     }
        // },
        {
            title:"Action",
            key:"orderMaterialId",
            align:'center',
            render:(record)=>{
                return (
                    <Space>
                        <PlusOutlined  onClick={(e) => handleAddMaterial(record)} />
                    </Space>
                )
            }
        } 
    ]

    const showModalAddMaterial = () => {
        setIsModalAddMaterial(true);
        API.getMaterialListExcludeOrdered(odiParam).then(
            result=>{
                setOrderDetailMaterialExcluded(result);
                console.log(result);
            }
        )
    };
    
    const handleOk = () => {
        setIsModalAddMaterial(false);
        setIsModalEditMaterial(false);
        setMaterialChoosed([]);
        setMaterialChoosedEdit([]);
    };
    
    const handleCancel = () => {
        setIsModalAddMaterial(false);
        setIsModalEditMaterial(false);
        setMaterialChoosed([]);
        setMaterialChoosedEdit([]);
    };
    const handleOkEdit = () => {
        setSelectedMaterialCode('');
        setSelectedMaterialDesc('');
        setIsModalEditMaterial(false);
    };
    const handleCancelEdit = () => {
        setSelectedMaterialCode('');
        setSelectedMaterialDesc('');
        setIsModalEditMaterial(false);
    };

    const getOrderDetail=(odi)=>{
        API.getOrderDetailForm(odi).then(
            result=>{
                setOrderDetailData(result);
                setWPID(result[0].workpackageId);
                setSiteNo(result[0].siteNo);
                setStockCheck(result[0].stockCheck);
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


    const handleSubmitDirect = () => {
        API.postMaterialOrderDirectSubmit(odiParam).then(
            result=>{
                console.log(result);
                if(result.status=="success"){
                    toast.success(result.message);
                    navigateTo('/mm/sitelistdr')
                }
                else{
                    toast.error(result.message);
                }
            }
        )
    }

    const handleBookSubmit = () => {
        API.postMaterialOrderBookSubmit(odiParam).then(
            result=>{
                console.log(result);
                if(result.status=="success"){
                    toast.success(result.message);
                }
                else{
                    toast.error(result.message);
                }
            }
        )
    }
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
                    <Row>
                        <Col md={16} sm={12} >
                            <Title level={5}>Order Detail</Title>
                        </Col>
                        <Col md={8} sm={12} >
                            <div className='float-right'>
                                <Tooltip title="Edit Order Detail">
                                    <IconButton size="small" color="primary" onClick={showModalAddMaterial}>
                                        <EditOutlined />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Col>
                    </Row>
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
                                        <Tooltip title="Add Material">
                                            <IconButton size="small" color="primary" onClick={showModalAddMaterial}>
                                                <PlusOutlined />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Download BOQ Ref">
                                            <IconButton size="small" color="success" onClick={handleDownloadBtn} >
                                                <FileExcelOutlined />
                                            </IconButton>
                                            {/* <Button type="primary" icon={<FileExcelOutlined />} onClick={handleDownloadBtn} /> */}
                                        </Tooltip>
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
                                    <Col span={24}>
                                        <div className='float-right'>
                                            <Space>
                                                <Button type="danger" htmlType="submit">
                                            Save as Draft
                                                </Button>
                                                {stockCheck ? <Button type="primary" htmlType="submit" onClick={handleBookSubmit}>
                                            Book and Submit
                                                </Button> :
                                                    <Button type="primary" htmlType="submit" onClick={handleSubmitDirect}>
                                                Submit
                                                    </Button>
                                                }
                                            </Space>
                                        </div>
                                    
                                    </Col>
                                </Row>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </Space>
            <Modal title="Add Material" 
                visible={isModalAddMaterial} 
                onOk={handleOk} 
                onCancel={handleCancel}
                footer={null}
            >
                {materialChoosed.length == 0 ? 
                    <Table 
                        scroll={{ x: '100%' }} 
                        size="small"  
                        columns={columnsMaterialListExcluded} 
                        dataSource={orderDetailMaterialExcluded} 
                        pagination={false} 
                        bordered/>    :
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{
                            'materialCode':materialChoosed.materialCode,
                            'materialDesc': materialChoosed.materialDesc,
                            'subCategoryName': materialChoosed.subCategoryName,
                            'neType': "NE",
                            'reqQTY' : 1
                        }}
                        onFinish={onFinishAddMaterial}
                        onFinishFailed={onFinishFailedAddMaterial}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Material Code"
                            name="materialCode"
                        >
                            <Input disabled/>
                        </Form.Item>
                  
                        <Form.Item
                            label="Material Desc"
                            name="materialDesc"                            
                        >
                            <Input disabled/>
                        </Form.Item>
                  
                        <Form.Item
                            label="Subcategory Name"
                            name="subCategoryName"

                        >
                            <Input disabled/>
                        </Form.Item>
                  
                        <Form.Item 
                            label="NE Type"
                            name="neType"
                        >
                            <Select style={{ width: 120 }} onChange={handleChangeNeType} disabled>
                                <Option value="NE">NE</Option>
                                <Option value="FE">FE</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item 
                            label="Req QTY"
                            name="reqQTY"
                            rules={[{ required: true, message: 'Please input req qty!' }]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Space>
                                
                                <Button type="primary" htmlType="submit">
                            Submit
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                }

            </Modal>


            <Modal title="Edit Material" 
                visible={isModalEditMaterial} 
                onOk={handleOkEdit} 
                onCancel={handleCancelEdit}
                footer={null}
                destroyOnClose={true}
            >
                {/* <TextField
                    disabled
                    id="outlined-disabled"
                    label="Disabled"
                    defaultValue={selectedMaterialCode}
                /> */}
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        'orderMaterialId': selectedMaterialId,
                        'materialCode': selectedMaterialCode,
                        'materialDesc': selectedMaterialDesc,
                        'uOM': selectedUOM,
                        'qtyRef': selectedQTYRef,
                        'reqQTY': selectedQTYReq,
                        'balance': selectedBalance,
                        'orderStatus': selectedOrderStatus,
                        'neType': "NE",
                    }}
                    onFinish={onFinishEditMaterial}
                    onFinishFailed={onFinishFailedEditMaterial}
                    autoComplete="off"
                >
                    <Form.Item
                        hidden
                        label="Material Code"
                        name="orderMaterialId"
                            
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        label="Material Code"
                        name="materialCode"
                            
                    >
                        <Input disabled/>
                    </Form.Item>
                  
                    <Form.Item
                        label="Material Desc"
                        name="materialDesc"
                            
                    >
                        <Input disabled/>
                    </Form.Item>
                  
                    <Form.Item
                        label="UOM"
                        name="uOM"
                            
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        label="QTY Ref"
                        name="qtyRef"
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        label="Balance"
                        name="balance"
                            
                    >
                        <Input disabled/>
                    </Form.Item>
                  
                    <Form.Item 
                        label="Site"
                        name="neType"
                    >
                        <Select style={{ width: 120 }} onChange={handleChangeNeType} disabled>
                            <Option value="NE">NE</Option>
                            <Option value="FE">FE</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Order Status"
                        name="orderStatus"
                            
                    >
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item 
                        label="Req QTY"
                        name="reqQTY"
                        rules={[{ required: true, message: 'Please input req qty!' }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Space>
                                
                            <Button type="primary" htmlType="submit">
                            Submit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
}

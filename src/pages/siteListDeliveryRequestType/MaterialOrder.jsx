/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
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
import API from '@app/utils/apiServices';
import exportFromJSON from 'export-from-json'
import moment from 'moment';
import DataGenerator from './DataGenerator';
import {IconButton, TextField}  from '@mui/material/';
import {useDispatch, useSelector} from 'react-redux';
import "./style.css";

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
    const [orderTypeId, setOrderTypeId] = useState('');
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
    const [isOutOfStock,setIsOutOfStock] = useState(null)
    const [materialOrderLog,setMaterialOrderLog] = useState([])

    const navigateTo = (path) => {
        history.push(path)
    }

    function checkoutofstock(balanceQTY){
        if(balanceQTY<0){
            setIsOutOfStock(1);
        }
    }

    const getOrderDetailMaterial=(odi)=>{
        setIsOutOfStock(0);
        API.getOrderDetailMaterial(odi).then(
            result=>{
                result.map((rst)=>checkoutofstock(rst.balanceQTY)) 
                setOrderDetailMaterial(result);

            }
        )
    }
    const getMaterialOrderLog=(odi)=>{
        API.getMaterialOrderLog(odi).then(
            result=>{
                setMaterialOrderLog(result);

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
            title:"QTY Ref",
            dataIndex:'refQTY',
            key:"orderMaterialId",
        },
        {
            title:"QTY Req",
            render:(record)=>{
                return (
                    <Space>
                        <b>{record.reqQTY}</b>
                    </Space>
                )
            }
        },
        {
            title:"Balance",
            key:"orderMaterialId",
            render:(record)=>{
                return (
                    <Space>
                        {record.balanceQTY < 0 
                            ?
                            <p style={{ color:'red' }}>{record.balanceQTY}</p>:
                            <p>
                                {record.balanceQTY}
                            </p>}
                    </Space>
                )
            }

        },
        {
            title:"Site",
            dataIndex:"site",
            key:"orderMaterialId",
        },
        {
            title:"Order Status",
            key:"orderMaterialId",
            render:(record)=>{
                return (
                    <Space>
                        {record.balanceQTY < 0 ? <p style={{ color:'red' }}>{record.orderStatus}</p>:
                            <p>
                                {record.orderStatus}
                            </p>}
                    </Space>
                )
            }
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
    
    const columsMaterialOrderLog =[
        {
            title:"No",
            render: (value, item, index) => 1 + index
        }, 
        {
            title:"Incoming Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.incomimgDate).format("YYYY-MM-DD HH:mm:ss")}</p>
                    </Space>
                )
            }
        },
        {
            title:"Execute Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.executeDate).format("YYYY-MM-DD HH:mm:ss" )}</p>
                    </Space>
                )
            }
        },
        {
            title:"Execute By",
            dataIndex:"executedBy",
        },
        {
            title:"Event Desc",
            dataIndex:'taskEventDesc',
        },
        {
            title:"Remarks",
            dataIndex:"remarks",
        }
        
    ]
    
    const handleAddMaterial = (data) => {
        console.log("handleAddplus",data)
        setMaterialChoosed(data);
    }

    const onFinishAddMaterial = (values) => {
        if(stockCheck==true){
            if(values.balance < values.reqQTY){
                toast.error("req qty exceeds balance")
            }
        }
        else{
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
                    else if(result.status=="warning"){
                        toast.warning(result.message)
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
        }
        
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
            title:"No",
            render: (value, item, index) => 1 + index
        }, 
        {
            title:"Material Code",
            dataIndex:"materialCode",
            key:"materialCode"
        },
        {
            title:"Subcategory Name",
            dataIndex:"subCategoryName",
            key:"subCategoryName"
        }, 
        {
            title:"Material Desc",
            dataIndex:"materialDesc",
            key:"materialDesc"
        },
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

    const columnsMaterialListExcludedStockCheck =[
        {
            title:"No",
            render: (value, item, index) => 1 + index
        }, 
        {
            title:"Material Code",
            dataIndex:"materialCode",
            key:"materialCode"
        },
        {
            title:"Subcategory Name",
            dataIndex:"subCategoryName",
            key:"subCategoryName"
        }, 
        {
            title:"Material Desc",
            dataIndex:"materialDesc",
            key:"materialDesc"
        },
        {
            title:"Available QTY",
            dataIndex:"availableQTY",
            key:"availableQTY"
        },
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
                setOrderTypeId(result[0].orderTypeId);
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

    
    const handleSaveDraft = () => {
        const body =(
            {
                "id":odiParam,
                "customSuccessMessage":"Order Request saved successfully",
                "customErrMessage":"Error while attempting to save this order request, please try again!"    
            }
        )
        API.putMaterialOrderDraft(body).then(
            result=>{
                if(result.status=="success"){
                    toast.success(result.message)
                    navigateTo('/mm/orderrequestdraft')
                }
                else{
                    toast.error(result.message)
                }
            }
        )

    }

    const handleSubmitDirect = () => {
        const body=(
            {
                "orderDetailId":odiParam,
                "LMBY":user.uid
            }
        )
        API.postMaterialOrderDirectSubmit2(body).then(
            result=>{
                console.log(result);
                if(result.status=="success"){
                    toast.success(result.message);
                    navigateTo('/mm/sitelistdr')
                }
                else if(result.status=="warning"){
                    toast.warning(result.message);
                }
                else{
                    toast.error(result.message);
                }
            }
        )
    }

    const handleBookSubmit = () => {
        const body=(
            {
                "orderDetailId":odiParam,
                "LMBY":user.uid
            }
        )

        API.postMaterialOrderBookSubmit2(body).then(
            result=>{
                console.log(result);
                if(result.status=="success"){
                    toast.success(result.message);
                    navigateTo('/mm/sitelistdr')
                }
                else if(result.status=="warning"){
                    toast.warning(result.message);
                }
                else{
                    toast.error(result.message);
                }
            }
        )
    }
    const handleEditOrderDetail = () => {
        navigateTo(`/sitelist/dismantleedit?odi=${odiParam}`)
    }

    function callback(key) {
        if(key==1){
            getOrderDetailMaterial(odiParam);
        }
        else if(key==2){
            // getOutboundSuccessLog();
        }
        else if(key==3){
            getMaterialOrderLog(odiParam);
        }
        console.log("keytabs",key);
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
                                    <IconButton size="small" color="primary" onClick={handleEditOrderDetail}>
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
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Material Order List" key="1">
                        <Row gutter={16}>
                            <Col md={24} sm={24} >
                                <Card hoverable>
                                    <Row>
                                        <Col md={24} sm={24} >
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
                                            // className="components-table-demo-nested"
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
                                                        <Button type="default" htmlType="submit" onClick={handleSaveDraft}>
                                                    Save as Draft
                                                        </Button>
                                                        {stockCheck ?
                                                            isOutOfStock>0 ? 
                                                                <Tooltip color='red' title="Certain item has out of stock status">
                                                                    <Button type="primary" danger disabled htmlType="submit" onClick={handleBookSubmit}>
                                                        Book and Submit
                                                                    </Button> 
                                                                </Tooltip>
                                                                :
                                                                <Button type="primary" htmlType="submit" onClick={handleBookSubmit}>
                                                        Book and Submit
                                                                </Button> 
                                                            :
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
                    </TabPane>
                    <TabPane tab="Attachment" key="2">
                        Attachment
                    </TabPane>
                    <TabPane tab="Log" key="3">
                        <Table 
                            // className="components-table-demo-nested"
                            columns={columsMaterialOrderLog} 
                            scroll={{ x: '100%' }} 
                            dataSource={materialOrderLog} 
                            size="small"
                            pagination={false} 
                        />                      
                    </TabPane>
                </Tabs>

                
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
                        columns={stockCheck? columnsMaterialListExcludedStockCheck : columnsMaterialListExcluded} 
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
                            'balance': materialChoosed.availableQTY,
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
                        
                        {stockCheck ? <Form.Item 
                            label="Available QTY"
                            name="balance"
                        >
                            <InputNumber disabled />
                        </Form.Item> :
                            null}

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
                                    Add Material
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
                        label="Available QTY"
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

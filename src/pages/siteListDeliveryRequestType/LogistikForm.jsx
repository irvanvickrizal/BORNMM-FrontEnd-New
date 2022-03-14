/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteInfo, getDeliveryList, getDeliveryMode, getIdDelivery, getLsp, getMaterialOrderDetail, } from '@app/store/action/logistikFormAction'
import { getDataSite } from '@app/store/action/siteConditionAction'
import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table,Row,Col,Card,Space,Typography,Form,Input,Select,Tabs,Button,Switch} from 'antd'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import moment from 'moment'

export default function LogisticForm() {
    const dispatch = useDispatch()
    const { Title } = Typography;
    const [selectedButton,setSelectedButton] = useState(true)
    const { TabPane } = Tabs;
    const [wh,setWh] = useState("")
    const [deliveryRequest,setDeliveryRequest] = useState("")
    const [deliveryTransport,setDeliveryTransport] = useState("")
    const [transportTeam,setTransportTeam] = useState("")
    const [modeTransport,setModeTransport] = useState("")
    const [page,setPage] = useState(1)
    const [selectedDeleivery,setSelecteddelivery] = useState("")
    



    useEffect(() => {
        dispatch(getDataSiteInfo())
        dispatch(getMaterialOrderDetail())
        dispatch(getLsp())
        dispatch(getDeliveryList())
        dispatch(getDeliveryMode())
    },[]) 

    const lsp = useSelector(state=>state.logistikFormReducer.dataLsp)
    const deliveryList = useSelector(state=>state.logistikFormReducer.detaDeliveryList)
    const idDeliveryRequest = useSelector(state=>state.logistikFormReducer.idDelivery)
    const deliveryMode = useSelector(state=>state.logistikFormReducer.detaDeliveryMode)
    const materialOrder = useSelector(state=>state.logistikFormReducer.dataOrderDetail)
    
    const dataSite = useSelector(state=>state.logistikFormReducer.dataSiteInfo)
    
    const date = moment(dataSite[0].expectedDeliveryDate).format("YYYY-MM-DD")
    const index2 = deliveryRequest
 
    const handleDeliveryChange = (e) => {
        setDeliveryRequest(e)
        dispatch(getIdDelivery(e))
    }
    const columns =[
        {
            title:"No",
            key:"index",
            render:(value, item, index) => (page )  + index
        },

        {
            title:"PO No/RO No",
            dataIndex:"cpoNo",
          
        },
        {
            title:"General Scope",
            dataIndex:"requestTypeName",
        },
        {
            title:"Site No",
            dataIndex:"siteNo",
        },
        
        {
            title:"Package Name",
            dataIndex:"packageName",
        },
        {
            title:"Project Contract",
            dataIndex:'projectName',
        },
        {
            title:"Region",
            dataIndex:"region",

        },
       
    ]

    const columnsMaterial = [
        {
            title : "Material Code",
            dataIndex:"materialCode",
        },
        {
            title:"Material Desc",
            dataIndex:"materialDesc"
        },
        {
            title:"Ref QTY",
            dataIndex:"refQTY"
        },
        {
            title:"Req QTY",
            dataIndex:"reqQTY"
        },
        {
            title:"Is Boq Ref",
            dataIndex:"isBoqRef",
            render: (active,e,val) => (
                <Switch
                    
                    // id={dataScope.map(()=>val.scopeOrderTypeId)}
                    defaultChecked={active}
                    disabled
                />)
        },
        {
            title:"UOM",
            dataIndex:"uom"
        },
        {
            title:"Site",
            dataIndex:"site"
        },

    ]
    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )

    return (
        <div>
            <HeaderChanger title="Logistic Form"/>
            <Col span={24}>
                <div className="card card-primary">
                    <div className="card-header align-middle">
                        <h3 className="card-title">Site Info</h3>
                    </div>
                    <div className="card-body">
                        <Table 
                            columns={columns} 
                            pagination={false} 
                            dataSource={dataSite} />
                    </div>
                </div>
            </Col>
            <Row>
                <Col span={12}>
                    <Card hoverable title={CardTitle("Order Request Detail")}>
                        <Tabs defaultActiveKey="1" centered={false}>
                            <TabPane tab="Order Request Detail" key="1">
                                {dataSite.length == 0 ? (<></>):(<Card hoverable title={CardTitle("Order Detail")}>
 
                                    <Form
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 14 }}
                                        layout="horizontal"
                                    >
                                        <Form.Item label="Order Type">
                                            <Input disabled value={dataSite[0].orderType} />
                                        </Form.Item>
                                        <Form.Item label="Inventory Code">
                                            <Input disabled value={dataSite[0].inventoryCode} />
                                        </Form.Item>
                                        <Form.Item label="Request Base">
                                            <Input disabled value={dataSite[0].requestTypeName} />
                                        </Form.Item>
                                        <Form.Item label="Site Location">
                                            <Input disabled value={dataSite[0].siteCondition}  />
                                        </Form.Item>
                                        <Form.Item label="CT Name">
                                            <Input disabled value="Near End (NE)" />
                                        </Form.Item>
                                        <Form.Item label="Origin">
                                            <Input disabled value="Site" />
                                        </Form.Item>
                                        <Form.Item label="Destination">
                                            <Input disabled value="DOP Semarang" />
                                        </Form.Item>
                                        <Form.Item label="SOW" rules={[
                                            {
                                                required: true,
                                            },
                                        ]}>
                                            <Input disabled value="CWH Cikarang" />
                                        </Form.Item>
                                        <Form.Item label="Delivery Date" rules={[{ required: true, message: 'Missing Inventory Code' }]}>
                                            <Input disabled value={date} />
                                        </Form.Item>
                                        {/* <Form.Item>
                                    <Button type="primary" htmlType="submit">Confirm</Button>
                                    <Button type="danger">Cancel</Button>
                                </Form.Item> */}
                                    </Form>
                         
                          
                                </Card>)}
                            </TabPane>
                            <TabPane tab="Material Order" key="2">
                                <Card hoverable title={CardTitle("Site Info")}>
                                    <Table  scroll={{ x: '100%' }} bordered columns={columnsMaterial} pagination={false} dataSource={materialOrder}/>
 
                                </Card>
                            </TabPane>
                        </Tabs>

                    </Card>
                </Col>
                <Col span={12}>
                    <Card hoverable title={CardTitle("Logistik Form")}>
                        <Form
                            labelCol={{ span: 9 }}
                            wrapperCol={{ span: 13 }}
                            layout="horizontal"
                        >
                            <Form.Item label="WH Team">
                                <Select 
                                    onChange={(e) => setWh(e)}
                                    placeholder="Select an option"
                                >
                                    {lsp.map(inv =>  <Select.Option value={inv.subconName}> 
                                        {inv.subconName}</Select.Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Delivery Request">
                                <Select 
                                    onChange={(e) => handleDeliveryChange(e)}
                                    placeholder="Select an option"
                                >
                                    {deliveryList.map(inv =>  <Select.Option value={inv.cdmrId}> 
                                        {inv.cdmrId}</Select.Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Delivery Request Transport">
                           
                                {
                                    deliveryRequest == '' ?  <Select status="warning" disabled placeholder="Please Select Delivery Request Type">
                                    </Select>
                                        :
                                        <Select 
                                            onChange={(e) => setModeTransport(e)} 
                                            placeholder="Select an option">
                                            {
                                                deliveryRequest == '' ? (<Select.Option> 
                                                    No Data</Select.Option>):( deliveryList[deliveryRequest].transportModeList.length == 0  ? (<Select.Option>Delivery Transport Not Available</Select.Option>):(deliveryList[deliveryRequest].transportModeList.map(slc =>  <Select.Option value={slc.transportMode}> 
                                                    {slc.transportMode}</Select.Option>) ))
                                               
                                            }
                                        </Select>
                                }
                            
                            </Form.Item>
                            <Form.Item label="Transport Team">
                                <Select 
                                    onChange={(e) => setDeliveryTransport(e)}
                                    placeholder="Select an option"
                                >
                                    {lsp.map(inv =>  <Select.Option value={inv.subconName}> 
                                        {inv.subconName}</Select.Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Mode Of Transport">
                                <Select 
                                    onChange={(e) => setModeTransport(e)}
                                    placeholder="Select an option"
                                >
                                    {deliveryMode.map(inv =>  <Select.Option value={inv.deliveryMode}> 
                                        {inv.deliveryMode}</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Form>
                        <div className='float-right'>
                            <Col span={4} md={8} sm={24}> 
                                <Space direction="horizontal">   
                                    <Button type="danger" onClick={()=>console.log("save as draft")}>Cancel</Button>
                                    <Button type="primary" htmlType="submit" onClick={()=>console.log([deliveryRequest])}>Confirm</Button>
                                </Space>
                            </Col>
                        </div>
                       
                           
                    </Card>

                </Col>
                
               
            </Row>
        </div>
    )
}

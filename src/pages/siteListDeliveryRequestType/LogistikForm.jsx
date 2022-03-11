/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteInfo, getDeliveryList, getDeliveryMode, getLsp, getMaterialOrderDetail, } from '@app/store/action/logistikFormAction'
import { getDataSite } from '@app/store/action/siteConditionAction'
import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table,Row,Col,Card,Space,Typography,Radio,Form,Input,Select} from 'antd'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import moment from 'moment'

export default function LogistikForm() {
    const dispatch = useDispatch()
    const { Title } = Typography;
    const [selectedButton,setSelectedButton] = useState(true)

    useEffect(() => {
        dispatch(getDataSiteInfo())
        dispatch(getMaterialOrderDetail())
        dispatch(getLsp())
        dispatch(getDeliveryList())
        dispatch(getDeliveryMode())
    },[]) 

    const lsp = useSelector(state=>state.logistikFormReducer.dataLsp)
    const deliveryList = useSelector(state=>state.logistikFormReducer.detaDeliveryList)
    const deliveryMode = useSelector(state=>state.logistikFormReducer.detaDeliveryMode)

    const dataSite = useSelector(state=>state.logistikFormReducer.dataSiteInfo)
    useEffect(() => {
        console.log(dataSite,'data')
    },[]) 
    const date = moment(dataSite[0].expectedDeliveryDate).format("YYYY-MM-DD")
 
    const columns =[
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
    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )

    return (
        <div>
            <HeaderChanger title="Logistik Form"/>
            <Row>
                <Col span={24}>
                    <div className="card card-primary">
                        <div className="card-header align-middle">
                            <h3 className="card-title">Site Info</h3>
                        </div>
                        <div className="card-body">
                            <Table columns={columns} pagination={false} dataSource={dataSite} />
                        </div>
                    </div>
                </Col>
           
                <Col span={12}>
                    <Card hoverable title={CardTitle("Order Request Detail")}>
                        <Radio.Group  >
                            <Radio.Button  onClick={()=>setSelectedButton(!selectedButton,console.log(selectedButton,'coba2'))}>Order Detail</Radio.Button>
                            <Radio.Button value="large" onClick={()=>setSelectedButton(!selectedButton,console.log(selectedButton,'coba'))}>Site Info</Radio.Button>
                        </Radio.Group>
                        <br />
                        <br />
                        {selectedButton == true ? (  <Card hoverable title={CardTitle("Order Detail")}>
                            <Space direction="vertical" style={{ width: '100%' }}>
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
                         
                          
                            </Space>
                        </Card>):( <Card hoverable title={CardTitle("Site Info")}>
                            <Space direction="vertical" style={{ width: '100%' }}>
                                <h2>Site Info Here</h2>
                            </Space>
                        </Card>)}
                    </Card>
                </Col>
                <br/>
                <br/>
                <Col span={12}>
                    <Card hoverable title={CardTitle("Logistik Form")}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Form
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 13 }}
                                layout="horizontal"
                            >
                                <Form.Item label="WH Team">
                                    <Select 
                                        // onChange={(e) => handleInvDDLChange(e)}
                                        placeholder="Select an option"
                                    >
                                        {lsp.map(inv =>  <Select.Option value={inv.subconName}> 
                                            {inv.subconName}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Delivery Request">
                                    <Select 
                                        // onChange={(e) => handleInvDDLChange(e)}
                                        placeholder="Select an option"
                                    >
                                        {deliveryList.map(inv =>  <Select.Option value={inv.cdmrName}> 
                                            {inv.cdmrName}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Delivery Request Trransport">
                                    <Select 
                                        // onChange={(e) => handleInvDDLChange(e)}
                                        placeholder="Select an option"
                                    >
                                        {deliveryList[0].transportModeList.map(inv =>  <Select.Option value={inv.transportMode}> 
                                            {inv.transportMode}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Transport Team">
                                    <Select 
                                        // onChange={(e) => handleInvDDLChange(e)}
                                        placeholder="Select an option"
                                    >
                                        {lsp.map(inv =>  <Select.Option value={inv.subconName}> 
                                            {inv.subconName}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Mode Of Transport">
                                    <Select 
                                        // onChange={(e) => handleInvDDLChange(e)}
                                        placeholder="Select an option"
                                    >
                                        {deliveryMode.map(inv =>  <Select.Option value={inv.deliveryMode}> 
                                            {inv.deliveryMode}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                            </Form>
                            
                           
                        </Space>
                    </Card>

                </Col>
               
            </Row>
        </div>
    )
}

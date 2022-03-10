/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable react/jsx-no-undef */
import React,{useState} from 'react'
import {Table, Row, Col,Card, Typography, Input, Space, Form,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    message} from 'antd'
    
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import Divider from '@mui/material/Divider';

export default function MaterialOrder() {
    const [selectedButton,setSelectedButton] = useState(true)


    const { Title } = Typography;
    const columns =[
        {
            title:"No",
            dataIndex:"id",
            key:'id'
        },
        {
            title:"CS-Code",
            dataIndex:"csCode",
        },
        {
            title:"Item",
            dataIndex:"Item",
        },
        
        {
            title:"UOM",
            dataIndex:"uom",
        },
        {
            title:"QTY Req",
            dataIndex:'qyy',
        },
        {
            title:"Balance",
            dataIndex:"Balance",

        },
        {
            title:"Site",
            dataIndex:"Site",

        },
        {
            title:"Order Status",
            dataIndex:"Order Status",
        },
        {
            title:"Action"
        }
    ]

    
    // eslint-disable-next-line react/no-unstable-nested-components
    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )

    return (
        <div>
            <HeaderChanger title="Material Order"/>
            <Row gutter={16}>
                <Col span={8}>
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
                                    <Input disabled value="PMR" />
                                </Form.Item>
                                <Form.Item label="Inventory Code">
                                    <Input disabled value="XL" />
                                </Form.Item>
                                <Form.Item label="Request Base">
                                    <Input disabled value="Dismantle" />
                                </Form.Item>
                                <Form.Item label="Site Location">
                                    <Input disabled value="Rooftop" />
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
                                    <Input disabled value="2022-03-22" />
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
                  
                </Col>
                <Col span={16} >
              
                    <div className="card card-primary">
                        <div className="card-header align-middle">
                            <h3 className="card-title">Material Order</h3>
                            <a href='javascript:void(0)' title="create new dop" class="btn btn-success float-right">
                                <i class="fas fa-plus"></i>
                            </a>
                        </div>
                       
                        <div className="card-body">
                            <Table columns={columns} pagination={false}  />
                        </div>
                    </div>
                
                </Col>
            </Row>
        </div>
    )
}

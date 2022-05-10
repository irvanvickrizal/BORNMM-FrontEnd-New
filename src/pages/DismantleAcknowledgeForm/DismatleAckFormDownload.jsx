/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable global-require */
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import React, { useEffect, useState } from 'react'
import { Image,Col,Space,Row,Typography,Table,
    Divider
    ,Form
    ,Input
    ,DatePicker  } from 'antd'
import Logo from '../../assets/image/logoXL.png'
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import API from '@app/utils/apiServices';
import DismantleAcknowledgeForm from '@app/pages/DismantleAcknowledgeForm/DismantleAcknowledgeForm';
import moment from 'moment';

export default function DismatleAckFormDownload() {
    const [dataSite,setDataSite] = useState([])
    const [dataInfo,setDataInfo] = useState([])

    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const odi = params.get('odi');
    const tdg = params.get('tdg');

    function getDataSiteInfo() {
      
        API.getDismantleList(tdg).then(
            result=>{
                setDataSite(result);
               
                console.log("data Site Indfo =>",result);
            }
        )
    }

    function getDataInfo() {
   
        API.getDismantleSiteInfo(odi).then(
            result=>{
                setDataInfo(result);
              
                console.log("data  Indfo =>",result);
            }
        )
    }
    
    
    const columnDismantleList = [ 
      
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
   
        {
            title : "Material Code",
            dataIndex:'materialCode',
         
        },
        {
            title : "Item Description",
            dataIndex:'materialDesc',
 
        },
        {
            title : "Description",
            dataIndex:'itemQty',
        
        },
        {
            title : "Serial No",
            dataIndex:'serialNo',
    
        },
        {
            title : "QTY",
            dataIndex:'itemQty',
        
        },
        {
            title : "UOM",
            dataIndex:'uOM',
        
        },
        {
            title : "Completeness",
            dataIndex:'completeness',
        
        },
   
    ]

    function printToPDF(){
        var printContents = document.getElementById("printArea").innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    }

    useEffect(() => {
        getDataSiteInfo();
        getDataInfo()
       
    },[])
    useEffect(()=>
    {
        document.title=`${dataInfo[0]?.siteNo}_${dataInfo[0]?.siteName}_Dismantlelist`
        if(dataInfo.length>0 && dataSite.length>0){
            var printContents = document.getElementById("printArea").innerHTML;
            var originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;

            window.print();

            document.body.innerHTML = originalContents;
        }
    },[dataSite,dataInfo])
    return (
        <><HeaderChanger title='' />
            <div id="printArea">
                <Row>
                    <Col className="gutter-row" span={2}>
                        <Image
                            src={Logo}
                            width={50} />
                    </Col>
                    <Col className="gutter-row" span={15}>
                        <div style={{ marginTop: 6 }}>
                            <Typography style={{ fontSize: 18, fontWeight: 700 }}>Material Return Form</Typography>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div style={{ marginTop: 6 }}>
                            <Typography style={{ fontSize: 18, fontWeight: 700 }}>{`Document Date :`}</Typography>
                        </div>
                    </Col>


                </Row>
                <Divider style={{ 'margin-bottom': '4px' }} />
                <Divider style={{ 'margin-top': '4px', 'margin-bottom': '4px' }} />
                <Row style={{ marginTop: 10 }}>
                    <Col className="gutter-row" span={2}>
                        <div style={{ marginTop: 6 }}>
                            <Row>
                                <SquareOutlinedIcon />
                                <Typography style={{ fontSize: 18, fontWeight: 600 }}>New</Typography>
                            </Row>

                        </div>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <div style={{ marginTop: 6 }}>
                            <Row>
                                <SquareOutlinedIcon />
                                <Typography style={{ fontSize: 18, fontWeight: 600 }}>Change</Typography>
                            </Row>

                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={{ marginTop: 6 }}>
                            <Row>
                                <Col className="gutter-row" span={14}>
                                    <Typography style={{ fontSize: 18, fontWeight: 600 }}>Type Of Return :</Typography>
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Typography style={{ fontSize: 18, fontWeight: 600 }}>Un-used</Typography>
                                </Col>

                            </Row>

                        </div>
                    </Col>

                </Row>
                <Divider style={{ 'margin-bottom': '4px', marginTop: 10 }} />
                <b>Reference Numbers</b>
                <Row style={{ marginTop: 10 }}>
                    <Form
                        name="basic"
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 14 }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Network No"
                            name="username"
                            style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Work Order No"
                            name="password"
                            style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Reservation No"
                            name="password"
                            style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </Row>
                <Divider style={{ 'margin-bottom': '4px', marginTop: 10 }} />
                <b>General Information</b>
                <Row justify="start" style={{ marginTop: 10 }}>
                    <Col span={14}>
                        <Form
                            name="basic"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            autoComplete="off"
                            labelAlign="left"
                            initialValues={{
                                'deliveryDate':moment(dataInfo[0]?.ackCompleteDate, "YYYY-MM-DD"),
                            }}
                        >
                            <Form.Item name="deliveryDate" label="DatePicker" >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                label="Delivery Date"
                                name="delivseryDate"
                                style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                            >
                                <Input />
                                {/* <Input style={{ width: 5 }} />
                                <Input style={{ width: 5 }} />
                                <span>-</span>
                                <Input style={{ width: 5 }} />
                                <Input style={{ width: 5 }} />
                                <span>-</span>
                                <Input style={{ width: 5 }} />
                                <Input style={{ width: 5 }} />
                                <Input style={{ width: 5 }} />
                                <Input style={{ width: 5 }} /> */}
                                {/* <span>  From Site:  {moment(dataInfo[0]?.ackCompleteDate, "DD-MMM-YYYY")}</span> */}
                            </Form.Item>

                            <Form.Item
                                label="Doc Header Text"
                                name="password"
                                style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Receiving Plant"
                                name="password"
                                style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                            >
                                <Input style={{ width: 80 }} />
                                <span>  WH Nokia Semarang</span>
                            </Form.Item>
                            <Form.Item
                                label="Storage Location"
                                name="password"
                                style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                            >
                                <Input style={{ width: 80 }} />
                                <span>  If faulty pls return to nearby remote warehouse</span>
                            </Form.Item>
                            <Form.Item
                                label="Recipient"
                                name="password"
                                style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                            >
                                <Input style={{ width: 180 }} />
                                <span> Nama Penerima Barang</span>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col justify="center" span={10}>
                        <Row justify="center">
                            <Input disabled style={{ width: "75%", "background-color": 'lightgreen' }} />
                            <Input disabled style={{ width: "75%", marginTop: 10, "background-color": 'lightgreen' }} />
                        </Row>
                    </Col>

                </Row>
                <Divider style={{ 'margin-bottom': '4px', marginTop: 10 }} />

                <Row style={{ marginTop: 32 }}>
                    <b>Detail Information</b>
                    <Col span={24}>
                        <Table
                            columns={columnDismantleList}
                            dataSource={dataSite}
                            pagination={false} />
                    </Col>
                </Row>

            </div></>
    )
}


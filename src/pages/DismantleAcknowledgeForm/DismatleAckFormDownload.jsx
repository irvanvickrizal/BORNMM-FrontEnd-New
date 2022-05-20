/* eslint-disable react/no-unstable-nested-components */
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
    const [dataDismantleLog,setDataDismantleLog] = useState([])
    const [siteNo,setSiteNo] = useState('')
    const [siteName,setSiteName] = useState('')
    const [documentDate,setDocumentDate] = useState('')

    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const odi = params.get('odi');
    const tdg = params.get('tdg');

    const TimeStampComponent = ({odiParam}) => {
        console.log(odiParam,"oadoiiii")
        API.getDismantleLog(odiParam).then(
            result=>{
                setDataDismantleLog(result);
                console.log("log =>",result);
                console.log("log =>",dataDismantleLog[0]?.docName);
                
            }
        )
        // [docName] + “ “ + [eventDesc] + “ by “ + [userType]  + “, ”+ [Name] + “ “ + [signTitle] + “ on ” + [executeDate]

        return (
            <div>
                <span>{dataDismantleLog[0]?.docName} {dataDismantleLog[0]?.eventDesc} by {dataDismantleLog[0]?.userType},</span><b> {dataDismantleLog[0]?.name} {dataDismantleLog[0]?.signTitle} on {moment(dataDismantleLog[0]?.executeDate).format("DD-MMM-YYYY hh:mm:ss")}    </b>
                <br></br>
                <span>{dataDismantleLog[1]?.docName} {dataDismantleLog[1]?.eventDesc} by {dataDismantleLog[1]?.userType},</span><b> {dataDismantleLog[1]?.name} {dataDismantleLog[1]?.signTitle} on {moment(dataDismantleLog[1]?.executeDate).format("DD-MMM-YYYY hh:mm:ss")}    </b>
                <br></br>
            </div>
        )

    }

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
                setSiteName(result[0].siteName)
                setSiteNo(result[0].siteNo)
                console.log("data  Indfo =>",result);
                console.log("deliverydate =>",moment(result[0]?.ackCompleteDate).format("DD-MMM-YYYY"));
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
    
    const TimeStamp = (data) => {
        <p>{data[0]?.docName}</p>
    }

    useEffect(() => {
        getDataSiteInfo();
        getDataInfo()
    },[])
    useEffect(() => {
        document.title=`${dataInfo[0]?.siteNo}_${dataInfo[0]?.siteName}_Dismantlelist`
        setDocumentDate(`${moment(dataInfo[0]?.ackCompleteDate).format("DD-MMM-YYYY")}`)
    },[dataInfo])
    useEffect(()=>
    {
        if(dataInfo.length>0 && dataSite.length>0){
            var printContents = document.getElementById("printArea").innerHTML;
            var originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;

            window.print();
            window.onafterprint = window.close;
            
            document.body.innerHTML = originalContents;
        }
    },[dataInfo,dataSite])
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
                    <Col className="gutter-row" span={7}>
                        <div style={{ marginTop: 6 }}>
                            <Typography style={{ fontSize: 18, fontWeight: 700 }}>{`Document Date : ${moment(dataInfo[0]?.ackCompleteDate).format("DD-MMM-YYYY")}`}</Typography>
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
                            <Input style={{ width: "75%", marginTop: 10, "background-color": 'white', color:"black"  }}  disabled/>
                        </Form.Item>

                        <Form.Item
                            label="Work Order No"
                            name="password"
                            style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                        >
                            <Input style={{ width: "75%", marginTop: 10, "background-color": 'white', color:"black"  }}  disabled/>
                        </Form.Item>

                        <Form.Item
                            label="Reservation No"
                            name="password"
                            style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                        >
                            <Input style={{ width: "75%", marginTop: 10, "background-color": 'white', color:"black"  }}  disabled/>
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
                                'deliveryDate':"test",
                            }}
                        >
                            <Form.Item name="deliveryDate" label="Delivery Date" 
                                style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                            >
                                {/* <DatePicker /> */}
                                <Input hidden style={{ width: "75%", marginTop: 10, "background-color": 'white', color:"black"  }}  disabled/>
                                <Input value={moment(dataInfo[0]?.ackCompleteDate).format("DD-MMM-YYYY")} style={{ width: "75%", marginTop: 10, "background-color": 'white', color:"black"  }}  disabled/>
                            </Form.Item>
                            
                            <Form.Item
                                label="Doc Header Text"
                                name="password"
                                style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                            >
                                <Input style={{ width: "75%", marginTop: 10, "background-color": 'white', color:"black"  }}   disabled />
                            </Form.Item>

                            <Form.Item
                                label="Receiving Plant"
                                name="password"
                                style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                            >
                                <Input style={{ width: 80, marginTop: 10, "background-color": 'white', color:"black"  }}  disabled />
                                <span>  WH Nokia Semarang</span>
                            </Form.Item>
                            <Form.Item
                                label="Storage Location"
                                name="password"
                                style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                            >
                                <Input style={{ width: 80, marginTop: 10, "background-color": 'white', color:"black"  }} disabled />
                                <span>  If faulty pls return to nearby remote warehouse</span>
                            </Form.Item>
                            <Form.Item
                                label="Recipient"
                                name="password"
                                style={{ 'margin-top': '4px', 'margin-bottom': '4px' }}
                            >
                                <Input style={{ marginTop: 10, "background-color": 'white', color:"black",width: 180   }}disabled />
                                <span> Nama Penerima Barang</span>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col justify="center" span={10}>
                        <Row justify="center">
                            <Col span={6} push={2}>
                                <span>From Site : </span>
                            </Col>
                            <Col span={18} push={2}>
                                <Input disabled style={{ width: "75%", "background-color": 'lightgreen', color:"black" }} value={dataInfo[0]?.siteName} />
                                <Input disabled style={{ width: "75%", marginTop: 10, "background-color": 'lightgreen', color:"black"  }}  value={dataInfo[0]?.siteNo}/>
                            </Col>
                            
                        </Row>
                    </Col>

                </Row>
                <Divider style={{ 'margin-bottom': '4px', marginTop: 10 }} />

                <Row style={{ marginTop: 32 }}>
                    <b>Detail Information</b>
                    <Col span={24}>
                        <Table
                            id="table1"
                            columns={columnDismantleList}
                            dataSource={dataSite}
                            pagination={false} />
                    </Col>
                </Row>
                <TimeStampComponent odiParam={odi}/>

            </div></>
    )
}


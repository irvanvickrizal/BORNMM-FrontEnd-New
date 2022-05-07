/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable global-require */
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import React, { useEffect, useState } from 'react'
import { Image,Col,Space,Row,Typography,Table } from 'antd'
import Logo from '../../assets/image/logoXL.png'
import SquareOutlinedIcon from '@mui/icons-material/SquareOutlined';
import API from '@app/utils/apiServices';

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

    useEffect(() => {
        getDataSiteInfo();
        getDataInfo()
     
    },[])
    return (
        <div>
            <HeaderChanger title='test'/>
            
            <Row>
                <Col className="gutter-row" span={1}>
                    <Image
                        src={Logo}
                        width={50}
                    />
                </Col>
                <Col className="gutter-row" span={17}>
                    <div style={{marginTop:6}}>
                        <Typography style={{fontSize:18,fontWeight:700}}>Material Return Form</Typography>
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div style={{marginTop:6}}>
                        <Typography style={{fontSize:18,fontWeight:700}}>{`Document Date :`}</Typography>
                    </div>
                </Col>
              

            </Row>
            <Row style={{marginTop:24}}>
                <Col className="gutter-row" span={2}>
                    <div style={{marginTop:6}}>
                        <Row>
                            <SquareOutlinedIcon/>
                            <Typography style={{fontSize:18,fontWeight:600}}>New</Typography>
                        </Row>
                        
                    </div>
                </Col>
                <Col className="gutter-row" span={2}>
                    <div style={{marginTop:6}}>
                        <Row>
                            <SquareOutlinedIcon/>
                            <Typography style={{fontSize:18,fontWeight:600}}>Change</Typography>
                        </Row>
                        
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div style={{marginTop:6}}>
                        <Row>
                            <Col className="gutter-row" span={14}>
                                <Typography style={{fontSize:18,fontWeight:600}}>Type Of Return :</Typography>
                            </Col>
                            <Col className="gutter-row" span={8}>
                                <Typography style={{fontSize:18,fontWeight:600}}>Un-used</Typography>
                            </Col>
                           
                        </Row>
                        
                    </div>
                </Col>

            </Row>
            <Row style={{marginTop:24}}>
                <Col className="gutter-row" span={12}>
                    <div style={{marginTop:6}}>
                        <Row>
                       
                            <Typography style={{fontSize:18,fontWeight:600}}>{`Delivery Date :`}</Typography>
                        </Row>
                        
                    </div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div style={{marginTop:6}}>
                        <Row>
                            <Col className="gutter-row" span={4}>
                                <Typography style={{fontSize:18,fontWeight:600}}>{`From Site :`}</Typography>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Typography>{dataInfo[0]?.siteName}</Typography>
                                <Typography>{dataInfo[0]?.siteNo}</Typography>
                            </Col>
                        
                            
                        </Row>
                        
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop:32}}>
                <Col span={24}>
                    <Table
                        columns={columnDismantleList}
                        dataSource={dataSite}
                        pagination={false}
                    />
                </Col>
            </Row>
          
        </div>
    )
}

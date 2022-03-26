/* eslint-disable no-unused-expressions */
import React,{useEffect,useState} from 'react'
import API from '@app/utils/apiServices'
import {Table,Typography,Row,Col,Button} from "antd"
import Search from '@app/components/searchcolumn/SearchColumn'
import {CheckCircleFilled } from "@ant-design/icons"


export default function TableSummary() {
    const [dataDownloaded,setDataDownloaded] = useState([])

    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const bid = params.get('bid');

    const getDownloadUploadedBoq = (boqid) => {
        API.getDownloadUploadedBoq(bid).then(
            result=>{
                setDataDownloaded(result);
                console.log("data Downloaded List =>",result);
            }
        )
    }

    useEffect(() => {
        getDownloadUploadedBoq()
       
    }, [])
    
    const columns = [
        {
            title : "No",
            render: (value, item, index) => 1 + index
        },
        {
            title : "Work Package ID/ SMPID",
            dataIndex:'workpackageid',

        },
        {
            title : "BOM is Exist",
            dataIndex:'checkStatus',
            render: ()=>{
                return (
                    <p style={{ color:'red' }}>{dataDownloaded.checkStatus}</p>
                )
            }
           
        },
        {
            title : "Wrong Category",
            dataIndex:'totalSites',
         
        },
        {
            title : "CS Code NA",
            dataIndex:'materialCodeNA',
            render : (text) => String(text),
            
               
        },
         
        
        {
            title : "CS Code Duplicate",
            dataIndex:'totalSitesWithoutBOQ',
        
        },
    ]

    return (
        <div>
            <Table
           
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                dataSource={dataDownloaded}
                columns={columns}
     
                scroll={{ x: '100%' }}
                // eslint-disable-next-line react/jsx-boolean-value
                pagination={{
                    pageSizeOptions: ['5','10','20','30', '40'],
                    showSizeChanger: true,
                    position: ["bottomLeft"],
                }}
                size="small"
            
            />
            <Row>
                <Col span={12}>
                   
                    <Button icon={<CheckCircleFilled />}>Select File</Button>
                    <Row>

                        <p>text</p>
                    </Row>
                  
                </Col>
                <Col span={12}>
                    <div className='float-right'>
                        <Button
                            type="primary"
                            
                        >
                           
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

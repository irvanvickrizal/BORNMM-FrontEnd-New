/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-expressions */
import React,{useEffect,useState} from 'react'
import API from '@app/utils/apiServices'
import {Table,Typography,Row,Col,Button,Space,Modal,Card} from "antd"


import { toast } from 'react-toastify';
import exportFromJSON from 'export-from-json'


export default function TableSummary() {
    const [dataDownloaded,setDataDownloaded] = useState([])
    const [isModalVisible,setIsModalVisible] = useState(false)
    const [isModalResetVisible,setIsModalResetVisible] = useState(false)
    const [dataDownloadPoBoqList,setDataDownloadPoBoqList] = useState([])

    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const bid = params.get('bid');
    const {Title} = Typography

    const CardTitle = (title) => <Title level={5}>{title}</Title>

    const getDownloadUploadedBoq = (boqid) => {
        API.getDownloadUploadedBoqSummaryAsPlan(bid).then(
            result=>{
                setDataDownloaded(result);
                console.log("data Downloaded List =>",result);
            }
        )
    }

    useEffect(() => {
        getDownloadUploadedBoq()
       
    }, [])

    const postProceedUploadedBoq = () => {
      
        API.postBoqAsPlanUploadProceed("",bid).then(
            result=>{
                try{
                    if(result.status=="success"){
                        toast.success(result.message)
                        window.location.reload()
                     
                    }
              
                }
                catch(e){
                    toast.error(result.message)
                   
                    console.log(e,"error catch")
                }
            }
        )
    }

    const postResetUploadedBoq = () => {
     
        API.postResetUploadedBoqAsPlan("",bid).then(
            result=>{
                try{
                    if(result.status=="success"){
                        toast.success(result.message)
                        window.location.reload()
                     
                    }
              
                }
                catch(e){
                    toast.error(result.message)
                   
                    console.log(e,"error catch")
                }
            }
        )
    }

    const getDownloadPoBoqCheckList = (cpoNo,siteNo,workpackageid) => {
        API.getDownloadUploadedAsPlanBoq(bid).then(
            result=>{
                setDataDownloadPoBoqList(result);
                console.log("data BOQ Download :",result);
               
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `Resume as Plan BOQ`;
                exportFromJSON({ data, fileName, exportType });
                console.log("SSDA",cpoNo,siteNo,workpackageid)
            }
        )
    }

    const showModalProced = () => {
        setIsModalVisible(true)
    }
    const hideModalProced = () => {
        setIsModalVisible(false)
    }
    const showModalReset = () => {
        setIsModalResetVisible(true)
    }

    const hideModalReset = () => {
        setIsModalResetVisible(false)
    }

    const handleProceedBoq = () => {
        postProceedUploadedBoq()
    }



    const handleResetBoq = () => {
        postResetUploadedBoq()
    }
    
    const downloadResume = () => {
        getDownloadPoBoqCheckList()
    }
    
    const consoleTest = () => {
        console.log("boqId=>",bid)
    }
    
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
            title : "Upload Status",
            dataIndex:'check_status',

        },
        {
            title : "BOM is Exist",
            dataIndex:'isExist',
           
           
        },
        {
            title : "Wrong Category",
            dataIndex:'wrongCategory',
         
        },
        {
            title : "CS Code NA",
            dataIndex:'materialCodeNA',
            render : (text) => String(text),
            
               
        },
         
        
        {
            title : "CS Code Duplicate",
            dataIndex:'materialCodeDuplicate',
        
        },
    ]

    return (
        <div>
         
            <Table
           
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                dataSource={dataDownloaded}
                columns={columns}
                pagination={false}
     
                scroll={{ x: '100%' }}
                // eslint-disable-next-line react/jsx-boolean-value
                // pagination={{
                //     pageSizeOptions: ['5','10','20','30', '40'],
                //     showSizeChanger: true,
                //     position: ["bottomLeft"],
                // }}
                size="small"
            
            />
           
            <div style={{display: 'flex',flexDirection:"column"}}>
                <div className="mt-4" style={{alignSelf:"end"}}>
                    <Col span={4} md={8} sm={24}>
                        <Space direction="horizontal">
                            <Button
                                type="primary"
                                onClick={showModalProced}
                            >
                                      Proceed
                            </Button>
                            <Button
                                type="danger"
                                htmlType="submit"
                                onClick={showModalReset}
                            >
                                        Reset
                            </Button>
                            <Button
                                       
                                htmlType="submit"
                                onClick={downloadResume}
                            >
                                        Download Resume
                            </Button>
                        </Space>
                    </Col>
                </div>
                
                <div style={{backgrounColor:'red'}} className="mt-4">
                 
                    <div className="card card-primary">
                        <div className="card-header align-middle">
                            <h3 className="card-title">Direction</h3>
                         
                        </div>
                   
                        <ul>
                            <li><span style={{color:"#f00",fontWeight:"600"}}>CS Code NA</span> means the CS Code Inside the BOM is Not Registred yet In EMORE</li>
                            <li><span style={{color:"#f00",fontWeight:"600"}}>BOM is Exist</span> means the BOM already Registered in Emore</li>
                            <li><span style={{color:"#f00",fontWeight:"600"}}>Wrong Category</span> means the Category is not "NE" or "FE"</li>
                            <li><span style={{color:"#f00",fontWeight:"600"}}>CS Code Duplicate</span> means there are more than 1 CS Code is Listed inside BOM Upload Template</li>
                            <li>While Clicking "Proceed" Button then all of <span style={{color:"#187b21",fontWeight:"600"}}>"Success"</span> Status of BOM will be mapped to <span style={{fontWeight:"600"}}>Active</span> BOM Reference and <span style={{fontWeight:"600",color:"#f00"}}>Error</span> status will be Removed  </li>
                        </ul>
                   
                    </div>
                  
                
                 
                  
                </div>
   
            </div>
        
  
           
      
            
            
            {/*  Modal Proceed Confirm */}
            <Modal title="Proceed BOQ as Plan Upload" visible={isModalVisible}  onCancel={hideModalProced} 
                footer={[
                    <Button key="back" onClick={hideModalProced} >
                Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={()=>handleProceedBoq()} >
                Proceed
                    </Button>,
                    <Button key="submit" type="primary" onClick={()=>consoleTest()} >
                Tes
                    </Button>,
                
                ]} >
                <Typography>Are You Sure You Want to Proceed  ?
                </Typography>
      
            </Modal>
            {/* Modal Reset Confirm */}
            <Modal title="Reset BOQ as Plan Upload" visible={isModalResetVisible}  onCancel={hideModalReset} 
                footer={[
                    <Button key="back" onClick={hideModalReset} >
                Cancel
                    </Button>,
                    <Button key="submit" type="danger" onClick={()=>handleResetBoq()} >
                Reset
                    </Button>,
                
                ]} >
                <Typography>Are You Sure You Want to Reset  ?
                </Typography>
      
            </Modal>
        </div>
    )
}

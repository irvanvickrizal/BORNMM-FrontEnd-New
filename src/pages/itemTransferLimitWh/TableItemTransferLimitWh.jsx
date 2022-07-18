/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-comment-textnodes */
import React,{useEffect,useState} from 'react'
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {BackTop ,Image,Table,InputNumber ,Tabs,Space,Row,Col,Spin,Tooltip,Modal,Upload,Button,Form,Input,Typography,Card,DatePicker} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { FileExcelOutlined,StepBackwardOutlined,EyeFilled,DeleteOutlined ,UploadOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';
import {IconButton, TextField}  from '@mui/material/';
import RoomIcon from '@mui/icons-material/Room';
import { useHistory } from 'react-router-dom';
import exportFromJSON from 'export-from-json'
import L, { divIcon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup,useMapEvent } from 'react-leaflet'



export default function TableItemTransferLimitWh() {
    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const dopId = params.get('id');
    const [isLoading, setIsLoading] = useState(false);
    const [itemtransferLimitWh,setItemtransferLimitWh] = useState([])
    const [itemtransferLimitWhList,setItemtransferLimitWhList] = useState([])
    const [dataDownloadSummary,setDataDownloadSummary]= useState([])
    const [dataSummaryPo,setDataSummaryPo]= useState([])
    const [downloadSummaryPo,setDownloadDataSummaryPo]= useState([])
    const [stateCek,setStateCek]= useState(true)
  
    const [dataDownloadDetail,setDataDownloadDetail]= useState([])
    const { Text, Link } = Typography;
    const [fileUpload, setFileUpload] = useState(null);
    const [uploading, setUploading] = useState("");
    const [isModalProceedVisible, setIsModalProceedVisible] = useState(false);
    const [isModalClearProceedVisible, setIsModalClearProceedVisible] = useState(false);
    const uid = useSelector(state=>state.auth.user.uid)
  
    const { TabPane } = Tabs;
    const { Title } = Typography;
    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )

    const props = {
        onRemove: () => {
            setFileUpload(null);
            return fileUpload
        },
        // beforeUpload: file => {
        //     const isPNG = file.type === 'image/png';
        //     if (!isPNG) {
        //         message.error(`${file.name} is not a png file`);
        //     }
        //     return isPNG || Upload.LIST_IGNORE;
        // },
        beforeUpload: file => {
            console.log(file,"file");
            const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if(isXLSX){
                setFileUpload(file);
                return false;
            }
            toast.error(`${file.name} is not a xlsx`)
            return isXLSX || Upload.LIST_IGNORE;
        },
        fileUpload,
    };



    function getDataItemTransferLimitWh() {
        setIsLoading(true);
        API.getItemTransferMarketWh(dopId).then(
            result=>{
                setItemtransferLimitWh(result);
                setIsLoading(false);
                console.log("data Item Trasnfer Limit WH =>",result);
            }
        )
    }
    
    function getDataSummaryAsPo() {
        setIsLoading(true);
        API.getSummaryAsPO(dopId).then(
            result=>{
                setDataSummaryPo(result);
                setIsLoading(false);
                console.log("data Summary As PO =>",result);
            }
        )
    }
    
    function getDataItemTransferLimitWhList() {
        setIsLoading(true);
        API.getItemTransferMarketWhList(dopId).then(
            result=>{
                setItemtransferLimitWhList(result);
                setIsLoading(false);
                console.log("data Item Trasnfer Limit WH List=>",result);
            }
        )
    }

    function getStateTrueOrFalse() {

        API.getCekTrueOrFalse("",dopId).then(
            result=>{
                setStateCek(result);

                console.log("true or flase=>",result);
            }
        )
    }

    
    function callback(key) {
        if(key==1){
            getDataItemTransferLimitWh()
            console.log(key)
        }
        else if(key==2){
            getDataItemTransferLimitWhList()
        }
        console.log("keytabs",key);
    }

   
    const getDownloadSummary = () => {
        API.getItemTransferMarketWh(dopId).then(
            result=>{
                setDataDownloadSummary(result);
                console.log("data BOQ Download :",result);
               
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `Item_Transfer_Limit_Summary_dopId=${dopId}`;
                exportFromJSON({ data, fileName, exportType });
                console.log("SSDA")
                
            }
        )
    }
    const getDownloadBoq = () => {
        API.getSummaryAsPO(dopId).then(
            result=>{
                setDownloadDataSummaryPo(result);
                console.log("data BOQ Download :",result);
               
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `BOQ_Assets_Upload_Summary_dopId`;
                exportFromJSON({ data, fileName, exportType });
                console.log("SSDA")
                
            }
        )
    }

    const handleUpload = () => {
        setUploading(true)
        try{
            API.uploadBoqAsset(dopId,uid,fileUpload).then(
                result=>{
                    console.log(result.value,"res")
                    try{
                        if(result.value.status=="success"){
                            setFileUpload(null);
                            setUploading(false);
                            getStateTrueOrFalse()   
                            console.log(result,"res")
                            props.onRemove();
                            toast.success('upload successfully.');
                            window.location.reload()
                        }
                        else{
                            setFileUpload(null);
                            setUploading(false);
                            getStateTrueOrFalse()
                            props.onRemove();
                            toast.error(result.message);
                        }
                    }
                    catch(e){
                        toast.error("Upload file error")
                        setUploading(false);
                        console.log(e,"error catch")
                    }
                }
            );
        }catch(e)
        {
            console.log(e,"errorrrrororoo");
        }
    }

    const postBoqProceed = () => {
        setUploading(true)
        try{
            API.postBoqProceed("",dopId).then(
                result=>{
                    try{
                        if(result.status=="success"){
                        
                            toast.success('upload successfully.');
                            getDataSummaryAsPo()
                        }
                        else{
                       
                            toast.error(result.message);
                        }
                    }
                    catch(e){
                        toast.error("Upload file error")
                        setUploading(false);
                        getDataSummaryAsPo()
                        console.log(e,"error catch")
                    }
                }
            );
        }catch(e)
        {
            console.log(e,"errorrrrororoo");
        }
    }
    const deleteBoqProceed = () => {
        setUploading(true)
        try{
            API.deleteBoqProceed(dopId).then(
                result=>{
                    try{
                        if(result.status=="success"){
                        
                            toast.success(result.message);
                            getDataSummaryAsPo()
                        }
                        else{
                       
                            toast.error(result.message);
                        }
                    }
                    catch(e){
                        toast.error("Upload file error")
                        setUploading(false);
                        getDataSummaryAsPo()
                        console.log(e,"error catch")
                    }
                }
            );
        }catch(e)
        {
            console.log(e,"errorrrrororoo");
        }
    }


    const getDownloadDetail = () => {
        API.getItemTransferMarketWhList(dopId).then(
            result=>{
                setDataDownloadDetail(result);
                console.log("data BOQ Download :",result);
               
                const data = result;
                //const data = result.map((rs)=>CreateDataPOScope.errorLog(rs.workpackageID , rs.phase, rs.packageName, rs.region, rs.dataStatus))
                const exportType =  exportFromJSON.types.xls;
                const fileName = `Item_Transfer_Limit_Detail`;
                exportFromJSON({ data, fileName, exportType });
                console.log("SSDA")
                
            }
        )
    }

    const showModalProceed = () => {
        setIsModalProceedVisible(true)
    }
    const hideModal = () => {
        setIsModalProceedVisible(false)
    }
    const showModalClear = () => {
        setIsModalClearProceedVisible(true)
    }
    const hideModalClear = () => {
        setIsModalClearProceedVisible(false)
    }
    const columnSummaryItem = [ 
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
      
        {
            title : "WH Code",
            dataIndex:'whCode',
            ...Search('whCode'),
        },
   
        {
            title : "Material Code",
            dataIndex:'materialCode',
            ...Search('materialCode'),
        },
        {
            title : "Material Desc",
            dataIndex:'materialDesc',
      
            ...Search('materialDesc'),
        },
        {
            title : "Total QTY Transfer Limit",
            dataIndex:'totalLimitQty',
            ...Search('totalLimitQty'),
        },
       
      

    ]
    

    const columnDetail = [ 
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
      
        {
            title : "WH Code",
            dataIndex:'whCode',
            ...Search('whCode'),
        },
   
        {
            title : "Material Code",
            dataIndex:'materialCode',
            ...Search('materialCode'),
        },
        {
            title : "Material Desc",
            dataIndex:'materialDesc',
      
            ...Search('materialDesc'),
        },
        {
            title : "Total QTY Transfer Limit",
            dataIndex:'LimitQty',
            ...Search('LimitQty'),
        },
        {
            title : "Uploaded By",
            dataIndex:'uploadedBy',
            ...Search('uploadedBy'),
        },
        {
            title : "Uploaded Date",
            render:(record)=>{
                return (
                    <div>
                        {record.uploadDate !== null ? (<> <Space>
                            <p>{moment(record.uploadDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('uploadDate'),
        },
       
      

    ]

    const columnPo = [ 
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
      
        {
            title : "WH Code",
            dataIndex:'whCode',
            ...Search('whCode'),
        },
   
        {
            title : "Material Code",
            dataIndex:'materialCode',
            ...Search('materialCode'),
        },

        {
            title : "Total QTY Transfer Limit",
            dataIndex:'addQty',
            ...Search('addQty'),
        },
       

        {
            title : "Upload Status",
            dataIndex:'status',
            ...Search('status'),
        },
       
      

    ]


    useEffect(() => {
        getDataItemTransferLimitWh();
        getStateTrueOrFalse()
        getDataSummaryAsPo()
    },[])



    return (
        <div>
    
            <Row >
    
                <Col md={12} sm={24} xs={24}>
                    <Card hoverable>
                            
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="Summary Item Transfer Limit" key="1">
                                <div className='float-right'>
                                    <Tooltip title="Download Summary">
                                        <FileExcelOutlined style={{fontSize:24,color:"#1e6715",marginBottom:12}} onClick={(record)=>getDownloadSummary(record)}/>
                                    </Tooltip>
                                   
                                </div>
                                { isLoading ?   
                                    <Row justify="center">
                                        <Col span={1}>    
                                            <Spin />
                                        </Col>
                                    </Row>  
                                    :
                                    <Table
                                        scroll={{ x: '70%' }}
                                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                                        // expandable={{ expandedRowRender }}
                                        columns={columnSummaryItem}
                                        dataSource={itemtransferLimitWh}
                                        pagination={{
                                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                                            showSizeChanger: true,
                                            position: ["bottomLeft"],
                                        }}
                                        bordered />}
                           
                            </TabPane>
                            <TabPane tab="Detail List" key="2">
                                <div className='float-right'>
                                    <Tooltip title="Download Detail">
                                        <FileExcelOutlined style={{fontSize:24,color:"#1e6715",marginBottom:12}} onClick={getDownloadDetail}/>
                                    </Tooltip>
                                    
                                </div>
                                { isLoading ?   
                                    <Row justify="center">
                                        <Col span={1}>    
                                            <Spin />
                                        </Col>
                                    </Row>  
                                    :
                                    <Table
                                        scroll={{ x: '125%' }}
                                        rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                                        pagination={{
                                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                                            showSizeChanger: true,
                                            position: ["bottomLeft"],
                                        }}
                                        columns={columnDetail}
                                        dataSource={itemtransferLimitWhList}
                                 
                                        bordered />}
                            </TabPane>
                        </Tabs>
                    </Card>
                       
                      
                </Col>
                <Col md={12} sm={24} xs={24}>
                    <Card hoverable   title={CardTitle("Define Item transfer limit Upload ")}
                        headStyle={{ 'color': 'blue' }}>
                        <div>
                            {stateCek ? (<Row>
                                <Col span={12}>
                                    <Upload {...props}>
                                        <Button icon={<UploadOutlined />}>Select File</Button>
                                        <Row>
                    
                                            <Text type="danger">Note : (*.XLSX) is format allowed</Text>
                                        </Row>
                                    </Upload>
                                </Col>
                                <Col span={12}>
                                    <div className='float-right'>
                                        <Button
                                            type="primary"
                                            onClick={handleUpload}
                                            disabled={fileUpload == null}
                                            loading={uploading}
                                        >
                                            {uploading ? 'Uploading' : 'Start Upload'}
                                        </Button>
                                    </div>
                                 
                                </Col>
                            </Row>
                            ):(        
                            
                                <>
                                    { isLoading ?   
                                        <Row justify="center">
                                            <Col span={1}>    
                                                <Spin />
                                            </Col>
                                        </Row>  
                                        :
                                        <Table
                                            scroll={{ x: '70%' }}
                                            rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                                            // expandable={{ expandedRowRender }}
                                            columns={columnPo}
                                            dataSource={dataSummaryPo}
                                            pagination={{
                                                pageSizeOptions: ['5', '10', '20', '30', '40'],
                                                showSizeChanger: true,
                                                position: ["bottomLeft"],
                                            }}
                                            bordered />}
                                    <div className='float-right' style={{display:"flex",flexDirection:"row",marginTop:12}}>
                                        <Space>
                                            <Button type="primary" onClick={(record)=>showModalProceed(record)}>Procceed</Button>
                                            <Button type="danger" onClick={(record)=>showModalClear(record)}>Reset</Button>
                                            <Button onClick={getDownloadBoq} >Download Summary</Button>
                                        </Space>
                                
                                    </div></>)}
                        </div>
                    </Card>
                    
                </Col>
                    
                 

            </Row>
            <Modal visible={isModalProceedVisible} footer={null} onCancel={hideModal}>
                <Space size={50} direction="vertical" style={{width:"100%"}}>
                    <Typography style={{fontSize:16}}>
                    Are you Sure want to Proceed
                    </Typography>
                    <div className='float-right'>
                        <Space>
                            <Button type="primary" onClick={postBoqProceed}>Procceed</Button>
                            <Button onClick={hideModal}>Cancel</Button>
                        </Space>
                  
                    </div>
                </Space>
              
            </Modal>

            <Modal visible={isModalClearProceedVisible} footer={null}
                onCancel={hideModalClear}
            >
                <Space size={50} direction="vertical" style={{width:"100%"}}>
                    <Typography style={{fontSize:16}}>
                    Are you Sure want to Reset BOQ Asset
                    </Typography>
       
                    <Space style={{width:"100%",display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                        <Button type="danger" onClick={deleteBoqProceed}>Reset</Button>
                        <Button onClick={hideModalClear}>Cancel</Button>
                    </Space>
                  
          
                </Space>
              
            </Modal>
                 
           

        </div>
    )
}

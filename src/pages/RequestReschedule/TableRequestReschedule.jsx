/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-unstable-nested-components */
import React,{useState,useEffect} from 'react'
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {Table,InputNumber ,Space,Row,Col,Spin,Tooltip,Modal,Upload,Button,Form,Input,Typography,Card,DatePicker} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { EyeFilled,DeleteOutlined ,UploadOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify';

export default function TablePickUpReschedule() {
    const [dataSchedule,setDataSchedule] = useState([])
    const [pickUpDate,setPickUpDate] = useState("")
    const [taskId,setTaskId] = useState("")
    const [odi,setOdi] = useState("")
    const [wpId,setWpId] = useState("")
    const [assignId,setAssignId] = useState("")
    const [rfpDate,setRfpDate] = useState("")
    const [requestNo,setRequestNo] = useState("")
    const [proposeRescheduleDate,setProposeRescheduleDate] = useState("")
    const [isLoading, setIsLoading] = useState(true);
    const userId = useSelector(state=>state.auth.user.uid)
    const [isModalApproveVisible,setIsModalApproveVisible] = useState(false)
    const [isModalFeeVisible,setIsModalFeeVisible] = useState(false)
    const { Title } = Typography;
    const [cancelLoading,setCancelLoading] = useState(false);

    const [fileUpload, setFileUpload] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState([]);
    const [isViewDoc, setIsViewDoc] = useState(false);
    const [previewDoc,setPreviewDoc] = useState('')

    const props = {
        onRemove: () => {
            setFileUpload(null);
            return fileUpload
        },
        beforeUpload: file => {
            console.log(file,"file");
            const isJPEG = file.type === 'image/jpeg';
            const isJPG = file.type === 'image/jpg';
            const isPNG = file.type === 'image/png';
            const isPDF = file.type === 'application/pdf';
            if(isPDF||isPNG||isJPG||isJPEG){
                setFileUpload(file);
                return false;
            }
            toast.error(`${file.name} is not allowed file`)
            return isPNG || isJPEG || isJPG || isPDF || Upload.LIST_IGNORE;
        },
        fileUpload,
    };



    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )

    function getRequestRescheduleList() {
        setIsLoading(true);
        API.getRequstRescheduleList(userId).then(
            result=>{
                setDataSchedule(result);
                setIsLoading(false);
                console.log("data Schedule Request =>",result);
            }
        )
    }
    function getUploadedFile(tid) {
        setIsLoading(true);
        API.getUploadedFile(tid).then(
            result=>{
                setUploadedFile(result);
                setIsLoading(false);
                console.log("Uploaded File List =>",result);
            }
        )
    }

    const showModalApprove = (data) => {
        setIsModalApproveVisible(true)
        setProposeRescheduleDate(data.proposeScheduleDate)
        setPickUpDate(data.pickupDate)
        setTaskId(data.taskScheduleId)
        setAssignId(data.assignToId)
    }

    const hideModalApprove = (data) => {
        setIsModalApproveVisible(false)
    }

    const showModalFee = (data) => {
        setIsModalFeeVisible(true)
        setRequestNo(data.requestNo)
        setRfpDate(data.rfpDate)
        setPickUpDate(data.pickupDate)
        setOdi(data.orderDetailId)
        setWpId(data.workpackageid)
        setTaskId(data.taskScheduleId)
        getUploadedFile(data.taskScheduleId)
    }

    const hideModalFee = (data) => {
        setIsModalFeeVisible(false)
    }
    const handleCancelView =() =>{
        setIsViewDoc(false)
    }   

    
    const handleUpload = () => {
        setUploading(true)
        // const isPNG = file.type === 'image/png';
        API.postUploadEvidence(taskId,odi,wpId,userId,fileUpload).then(
            result=>{
                if(result.status=="success"){
                    setFileUpload(null);
                    setUploading(false);
                    getUploadedFile(taskId)
                    props.onRemove();
                    toast.success(result.message);
                    // setIsHOConfirmation(false)
                }
                else{
                    setFileUpload(null);
                    setUploading(false);
                    props.onRemove();
                    // setIsHOConfirmation(false)
                }

                console.log('Evidence Download =>',result)
            }
        );
    }


    const postApproveReschedule  = () => {
        
        const body = {
            "taskScheduleId":taskId,
            "approvedProposedBy":userId
        }
        console.log(body,"body")
        API.postApproveReschedule(body).then(
            result=>{
                try{
                    if(result.status=="success"){
                        setIsLoading(false)
                        getRequestRescheduleList(userId)
                        toast.success(result.message)
                 
                    }else {
                        toast.error(result.message)
                        setIsLoading(false)
                    }
          
                }
                catch(e){
                  
                    setIsLoading(false)
                    console.log(e,"error catch")
                }
            }
        )
        setIsModalApproveVisible(false)
    }

    const handleViewDoc = (record) =>
    {
        setPreviewDoc(record.filePath)
        setIsViewDoc(true)
    }

    const handleDeleteEvidence = (record) => {

        if (window.confirm('Are you sure you want to delete this data ?')) {
         
            API.deleteUploadedFile(record.costEvidenceId).then(
                result=>{
                    console.log("handledelete",result)
                    if(result.status=="success"){
                        getUploadedFile(record.taskScheduleId);
                        toast.success(result.message)
                    }
                    else{
                        getUploadedFile(record.taskScheduleId);
                        toast.error(result.message)
                    }
                }
            )
        }
    }
    

    
    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : " Order Request No",
            dataIndex:'orderRequestNo',
            ...Search('requestNo'),
        },
        {
            title : "Origin",
            dataIndex:'originName',
            ...Search('originName'),
        },
        {
            title : "Destination",
            dataIndex:'destinationName',
            ...Search('destinationName'),
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            responsive: ['md'],
            ...Search('siteNo'),
        },
        {
            title : "Workpackage Id",
            dataIndex:'workpackageid',
            ...Search('workpackageid'),
        },
        {
            title : "Address",
            dataIndex:'locationAddress',
            ...Search('locationAddress'),
        },
        {
            title : "Scope Name",
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title : "CDMR Req",
            dataIndex:'cdmrType',
            ...Search('cdmrType'),
        },
        {
            title : "Request Delivery Mode",
            dataIndex:'deliveryMode',
            ...Search('deliveryMode'),
        },
        {
            title : "LSP Name",
            dataIndex:'lspName',
            ...Search('lspName'),
        },
    
        {
            title : "RFP Date",
            render:(record)=>{
                return (
                  
                    <div>
                        {record.rfpDate !== null ? (<> <Space>
                            <p>{moment(record.rfpDate).format("YYYY-MM-DD")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                )
            },
            ...Search('rfpDate'),
        },
    
        {
            title : " Current Pickup Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.pickupDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('pickupDate'),
        },
        {
            title : " Propose New Pickup Date",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.proposeScheduleDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
            ...Search('proposeRequestDate'),
        },
        {
            title : " Proposed By",
            dataIndex:"proposedBy",
            ...Search('proposedBy'),
        },

        {
            title : "Propose Request Date",
            render:(record)=>{
                return (
                  
                    <div>
                        {record.proposeRequestDate !== null ? (<> <Space>
                            <p>{moment(record.proposeRequestDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                )
            },
            ...Search('proposeRequestDate'),
        },


        {
            title : " Propose Reason",
            dataIndex:"proposeReason",
            ...Search('proposeReason'),
        },

        {
            title : "Assign Date",
            render:(record)=>{
                return (
                    <div>
                        {record.assignedDate !== null ? (<> <Space>
                            <p>{moment(record.assignedDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('logisticCompletedDate'),
        },
        {
            title : "Asign To",
            width:240,
            dataIndex:"assignTo",
            ...Search('assignTo'),
        },
        {
            title : "Day To Go",
            dataIndex:'dayToGo',
            width:100,
            ...Search('dayToGo'),
        },
        {
            title: "Action",
            align:'center',
            fixed:'right',
            width:130,
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            <Tooltip title="Approve Reschedule">
                                <CheckCircleIcon style={{color:"#1b9a0c",fontSize:28}}
                                    onClick={()=>showModalApprove(record)}
                                />
                            </Tooltip>
                            <Tooltip title="Cancellation Fee Request">
                                <MonetizationOnIcon style={{color:"#cf4646",fontSize:28}}
                                    onClick={()=>showModalFee(record)}
                                />
                            </Tooltip>

                        </Space>
                    </div>
                )
            },
          
        },
    
    ]

    const columnDataEvidence=[
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "File Name",
            dataIndex:'fileName',
            width:280,
            ...Search('fileName'),
        },
        {
            title:"Action",
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            <Tooltip title="Review Document">
                                <EyeFilled style={{fontSize:18,color:"#0c8ed3"}}
                                    onClick={() => handleViewDoc(record)}
                                />
                            </Tooltip>
                            <Tooltip title="Delete Document">
                                <DeleteOutlined style={{fontSize:18,color:"red"}}
                                    onClick={() => handleDeleteEvidence(record)}
                                />
                            </Tooltip>

                        </Space>
                    </div>
                )
            },
        }
    ]







    
    useEffect(() => {
        getRequestRescheduleList();
        console.log(userId,"asdasd")
    },[])


    return (
        <div>
            { isLoading ?   
                <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  
                :
                <Table
                    scroll={{ x: '200%' }}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataSchedule}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered />}

            {/* Modak Approve */}

            
            <Modal
                visible={isModalApproveVisible}
                onCancel={hideModalApprove}
      
                destroyOnClose
                footer={[
                    <Button key="submit" type="primary" onClick={postApproveReschedule}>
                    Approve
                    </Button>,
                    <Button key="back"  onClick={hideModalApprove}>
                Close
                    </Button>,
                
                
                ]}
            >
                <Col span={24}>
                      
                    <Card title={CardTitle("Approve Reschedule Date")}>
                        {assignId > 0 ? (<><Typography style={{ fontSize: 18, fontWeight: "500" }}>
                            {`Are you sure you want to approve Reschedule Date from ${moment(pickUpDate).format("YYYY-MM-DD")} to ${moment(proposeRescheduleDate).format("YYYY-MM-DD")}?`}
                        </Typography><p style={{ fontSize: 16, fontWeight: "600",color:"red"}}>Caution: You need to re-assign task to transport due to updated Pick up date</p></>)
                            : (<Typography style={{ fontSize: 18, fontWeight: "500" }}>
                                {`Are you sure you want to approve Reschedule Date from ${moment(pickUpDate).format("YYYY-MM-DD")} to ${moment(proposeRescheduleDate).format("YYYY-MM-DD")}?`}
                            </Typography>) }
                        
                    </Card>
                </Col>
            </Modal>

            {/* Modal dayToGo <= 0 */}
            

            <Modal
                visible={isModalFeeVisible}
                onCancel={hideModalFee}
                footer={null}
                destroyOnClose
            >
                <Col span={24}>
                    <Card title={CardTitle("Cancellation Fee Form")}>
                        <Form
                            labelCol={{span: 6}}
                            wrapperCol={{span: 16}}
                            layout="horizontal"
                            onFinish={hideModalFee}
                    
                            initialValues={{
                               
                            }}
                         
                        >
                            <Form.Item label="Req Number" >
                                <Input disabled value={requestNo} />
                            </Form.Item>
                            <Form.Item  label="RFP Date" >
                                <Input disabled value={rfpDate !== null ? moment(rfpDate).format("YYYY-MM-DD") : null} />
                            </Form.Item>
                            <Form.Item  label="Current Pickup" >
                                <Input disabled value={pickUpDate !== null ? moment(pickUpDate).format("YYYY-MM-DD") : null} />
                            </Form.Item>
                            <Form.Item  label="Current Pickup" >
                                <Input disabled value={pickUpDate !== null ? moment(pickUpDate).format("YYYY-MM-DD") : null} />
                            </Form.Item>
                            <Form.Item  label="Cancelation Fee"
                                rules={[{ required: true, message: 'Please input Assign To!' }]}
                            >
                                <InputNumber   style={{ width: 280 }}
                                    defaultValue="1000000"
                                    min="0"
                                    max="10000000000"
                                    step="0"
                                    
                       
                                    stringMode placeHolder=""/>
                            </Form.Item>
                            <Form.Item name="uploadFile" label="Evidence">
                                <Col Span={9}>
                                    <Upload {...props}>
                                        <Button icon={<UploadOutlined />}>Select File</Button>
                                    </Upload>
                                    <Button
                                        type="primary"
                                        onClick={handleUpload}
                                        disabled={fileUpload == null}
                                        loading={uploading}
                                        style={{ marginTop: 16 }}
                                    >
                                        {uploading ? 'Uploading' : 'Start Upload'}
                                    </Button>
                                </Col>
                                    
                            </Form.Item> 
                        
                      
                            <Table
                                columns={columnDataEvidence}
                                dataSource={uploadedFile}
                            
                               
                            />               
                 
                            <Form.Item wrapperCol={{ offset: 0, span: 24 }} style={{marginTop:6,marginLeft:128}}>
                                <div className="float-right">
                                    <Col span={4} md={8} sm={24} >
                                        <Space direction="horizontal">
                                
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                       
                                            >
                                        Submit
                                            </Button>
                                            <Button
                                                onClick={hideModalFee}
                                                htmlType="submit"
                                       
                                            >
                                        Back
                                            </Button>
                                        </Space>
                                    </Col>
                                </div>
                          
                            </Form.Item>
                        </Form>     
                    </Card>
                </Col>
              
              
            </Modal>

            <Modal 
                visible={isViewDoc}
                onCancel={handleCancelView}
                footer={null}
                confirmLoading={cancelLoading}
                destroyOnClose
                width={1000}
                bodyStyle={{height: 1000}}
            >
                <Card title={CardTitle("View Doc")}>
                    <embed src={previewDoc}  style={{ width: '100%' ,height: '100%' }}></embed>
                </Card>
               
                {/* <img alt="example" style={{ width: '100%' }} src={previewDoc} /> */}
            </Modal>

        </div>
    )
}

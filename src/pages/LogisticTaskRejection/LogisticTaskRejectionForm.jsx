/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-undef */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
import {
    getDataSiteInfo,
    getDataSiteInfoLogistik,
    getDeliveryList,
    getDeliveryMode,
    getDeliveryTransport,
    getIdDelivery,
    getLsp,
    getMaterialOrderDetail,
    postAsDraft,
    postLogistikForm,
    postLogistikFormSuccess,
    putLogistikForm
} from "@app/store/action/logistikFormAction"
import {getDataSite} from "@app/store/action/siteConditionAction"
import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
    Table,
    Row,
    Col,
    Card,
    Space,
    Typography,
    Form,
    Input,
    Select,
    Tabs,
    Button,
    Switch,
    Modal
   
} from "antd"
import HeaderChanger from "@app/components/cardheader/HeaderChanger"
import moment from "moment"
import { useHistory } from "react-router-dom"
import API from "@app/utils/apiServices"

const { TextArea } = Input;


export default function LogisticTaskRejectionForm() {
    const {Title} = Typography
    const CardTitle = (title) => <Title level={5}>{title}</Title>
    const dispatch = useDispatch()
    const {TabPane} = Tabs
    const [page, setPage] = useState(1)
    const history = useHistory()
    const [wh, setWh] = useState("")
    const [deliveryRequest, setDeliveryRequest] = useState("")
    const [deliveryTransport, setDeliveryTransport] = useState("")
    const [delivMode, setDeliveMode] = useState("")
    const [modeTransport, setModeTransport] = useState("")

    const [remarks, setRemarks] = useState("")
    const [note,setNote] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [log, setDataLog] = useState([]);
    const [isModalCancelVisible, setIsModalCancelVisible] = useState(false);


    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const odi = params.get('odi');
    // const ordlid = params.get('ordlid');

    

    const lsp = useSelector((state) => state.logistikFormReducer.dataLsp)
    const deliveryList = useSelector(
        (state) => state.logistikFormReducer.detaDeliveryList
    )
    const idDeliveryRequest = useSelector(
        (state) => state.logistikFormReducer.idDelivery
    )
    const deliveryMode = useSelector(
        (state) => state.logistikFormReducer.dataDeliveryMode
    )
    const materialOrder = useSelector(
        (state) => state.logistikFormReducer.dataOrderDetail
    )
    const dataSite = useSelector(
        (state) => state.logistikFormReducer.dataSiteInfo
    )
    const dataOrderLogistik = useSelector(
        (state) => state.logistikFormReducer.dataSiteInfoLogistik
    )
    
    const dataUser = useSelector(state=>state.auth.user.uid)
    



    const DataDeliveryTransport = useSelector(state=> state.logistikFormReducer.detaDeliveryTransport)
    const dataOdi = useSelector(state=> state.logistikFormReducer.odi)
    const dataOdiLog = useSelector(state=> state.logistikFormReducer.odiLogistik)
    const dataStats = useSelector(state=>state.logistikFormReducer.stats.status)



    const getLogLogistic = () => {
        API.getLogLogistic(odi).then(
            result=>{
                setDataLog(result);
                console.log("data Log List =>",result);
            }
        )
    }


    const cancelModal = () => {
        setIsModalVisible(false);
        console.log(isModalVisible);
    };
    // const index2 = deliveryRequest

    const handleDeliveryChange = (e) => {
        setDeliveryRequest(e)
        dispatch(getIdDelivery(e))
        dispatch(getDeliveryTransport())
    };


    const handlePost = (data) => {
        // dispatch(putLogistikForm(body))
        console.log({"logisticOrderDetailId":dataOdiLog,"orderDetailId":dataOdi,"whTeamId":wh,"cdmrId":deliveryRequest,"transportModeId":modeTransport,"transportTeamId":deliveryTransport,"deliveryModeId":delivMode,"LMBY":dataUser,"note":note})

        // if( dataStats == 200){
        //     history.push('/mm/tasklogisticreject')
        //     cancelModal()
        // }
        // console.log("test Bod=?>",{"orderDetailId":dataOdi,"whTeamId":wh,"cdmrId":deliveryRequest,"transportModeId":modeTransport,"transportTeamId":deliveryTransport,"deliveryModeId":delivMode,"note":note})
    };

    const saveDraft = () => {
        dispatch(postAsDraft({"orderDetailId":dataOdi,"remarks":remarks}))
        if( dataStats == 200){
            history.push('/mm/tasklogisticreject')
         
           
        }
    };

    const showModal = (data) => {
        setIsModalVisible(true);
        setWh(data.whTeam)
        setModeTransport(data.modeTransport)
        setDeliveMode(data.modeTransport)
        setDeliveryRequest(data.deliveryRequest)
        setNote(data.note)


        console.log(data,"data");
    };
    const cancelNavigate = () => {
        history.push('/mm/tasklogisticreject')
    };
    const showModalCancel = () => {
        setIsModalCancelVisible(true);
        setIsModalVisible(false)
        console.log(isModalVisible);
    };
    const onFinishFailedAddMaterial = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

 
    const cancelModal2 = () => {
        setIsModalCancelVisible(false);
        console.log(isModalVisible);
    };

    useEffect(() => {
        dispatch(getDataSiteInfo())
        dispatch(getMaterialOrderDetail())
        dispatch(getLsp())
        dispatch(getDeliveryList())
        dispatch(getDeliveryMode())
        getLogLogistic()
        dispatch(getDataSiteInfoLogistik())
    }, [dispatch])

    const columns = [
    

        {
            title: "PO No/RO No",
            dataIndex: "cpoNo"
        },
        {
            title: "General Scope",
            dataIndex: "requestTypeName"
        },
        {
            title: "Site No",
            dataIndex: "siteNo"
        },

        {
            title: "Package Name",
            dataIndex: "packageName"
        },
        {
            title: "Work Package Id",
            dataIndex: "workpackageId"
        },
        {
            title: "Project Contract",
            dataIndex: "projectName"
        },
        {
            title: "Region",
            dataIndex: "region"
        }
    ]

    const columnsMaterial = [
        {
            title: "Material Code",
            dataIndex: "materialCode"
        },
        {
            title: "Material Desc",
            dataIndex: "materialDesc"
        },
        {
            title: "Ref QTY",
            dataIndex: "refQTY"
        },
        {
            title: "Req QTY",
            dataIndex: "reqQTY"
        },

        {
            title: "UOM",
            dataIndex: "uom"
        },
        {
            title: "Site",
            dataIndex: "site"
        }
    ]


    const columnsLog = [
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Incoming Date",
            dataIndex: "incomingDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.incomingDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
        },
        {
            title: "Execute Date",
            dataIndex: "executeDate",
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.executeDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            },
        },

        {
            title: "Execute By",
            dataIndex: "executedBy",
        },
        {
            title: "Event Desc",
            dataIndex: "taskEventDesc"
        },
        {
            title: "Remarks",
            dataIndex: "remarks"
        }
    ]

    
   


    return (
      
        <div>
            <HeaderChanger title="Logistic Task Rejection Form"/>
            <Col span={24}>
                <div className="card card-primary">
                    <Card hoverable title={CardTitle("Site Info")}>
                        {/* <div className="card-header align-middle">
                        <h3 className="card-title">Site Info</h3>
                    </div> */}
                        <div className="card-body">
                            <Table
                                columns={columns}
                                pagination={false}
                                dataSource={dataSite}
                            />
                        </div>
                    </Card>
                </div>
            </Col>
            <Row>
                <Col span={12}>
                    <Card hoverable title={CardTitle("Order Request Detail")}>
                        <Tabs defaultActiveKey="1" centered={false}>
                            <TabPane tab="Order Request Detail" key="1">
                                {dataSite.length == 0 ? (
                                    <></>
                                ) : (
                                    <Card
                                        hoverable
                                        title={CardTitle("Order Request Detail")}
                                    >
                                        <Form
                                            labelCol={{span: 8}}
                                            wrapperCol={{span: 14}}
                                            layout="horizontal"
                                            
                                        >
                                            <Form.Item label="Order Type">
                                                <Input
                                                    disabled
                                                    value={
                                                        dataSite[0].orderType
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item label="Request No">
                                                <Input
                                                    disabled
                                                    value={
                                                        dataSite[0]
                                                            .requestNo
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item label="Request Base">
                                                <Input
                                                    disabled
                                                    value={
                                                        dataSite[0]
                                                            .requestTypeName
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item label="Site Location">
                                                <Input
                                                    disabled
                                                    value={
                                                        dataSite[0]
                                                            .siteCondition
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item label="CT Name">
                                                <Input
                                                    disabled
                                                    value={
                                                        dataSite[0].ctName
                                                    }
                                                  
                                                />
                                            </Form.Item>
                                            <Form.Item label="Origin">
                                                <Input disabled 
                                                    value={
                                                        dataSite[0].originName
                                                    } />
                                            </Form.Item>
                                            <Form.Item label="Destination">
                                                <Input
                                                    disabled
                                                    value={
                                                        dataSite[0].destinationName 
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="SOW"
                                                rules={[
                                                    {
                                                        required: true
                                                    }
                                                ]}
                                            >
                                                <Input
                                                    disabled
                                                    value={
                                                        dataSite[0].packageName
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Proposed Delivery Mode"
                                                rules={[
                                                    {
                                                        required: true
                                                    }
                                                ]}
                                            >
                                                <Input
                                                    disabled
                                                    value={
                                                        dataSite[0].proposeDeliveryMode
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Delivery Date"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                        "Missing Inventory Code"
                                                    }
                                                ]}
                                            >
                                                <Input disabled value={
                                                    moment( dataSite[0]
                                                        .expectedDeliveryDate).format("YYYY-MM-DD")
                                                       
                                                } />
                                            </Form.Item>
                                            {/* <Form.Item>
                                <Button type="primary" htmlType="submit">Confirm</Button>
                                <Button type="danger">Cancel</Button>
                            </Form.Item> */}
                                        </Form>
                                    </Card>
                                )}
                            </TabPane>
                            <TabPane tab="Material Order" key="2">
                          
                                <Table
                                    scroll={{x: "100%"}}
                                    bordered
                                    columns={columnsMaterial}
                                    pagination={false}
                                    dataSource={materialOrder}
                                />
                       
                            </TabPane>
                            <TabPane tab="Log" key="3">
                        
                                <Table
                                    scroll={{x: "100%"}}
                                    bordered
                                    columns={columnsLog}
                                    pagination={{
                                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                                        showSizeChanger: true,
                                        position: ["bottomLeft"],
                                    }}
                                    dataSource={log}
                                />
                             
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card hoverable title={CardTitle("Logistic Rejection Form")}>
                        <Form
                            labelCol={{span: 9}}
                            wrapperCol={{span: 13}}
                            layout="horizontal"
                            onFinish={showModal}
                            onFinishFailed={onFinishFailedAddMaterial}
                            initialValues={{
                                'whTeam':dataOrderLogistik[0].whTeamId,
                                'deliveryRequest':dataOrderLogistik[0].cdmrId,
                                'deliveryRequestTransport':dataOrderLogistik[0].transportModeId,
                                "note": dataOrderLogistik[0].note,
                                "transportTeam":dataOrderLogistik[0].transportTeamId,
                                "modeTransport":dataOrderLogistik[0].transportModeId,
                            }}
                        >
                            <Form.Item label="WH Team" name="whTeam" 
                                rules={[{ required: true, message: 'Please Select WH Team!' }]}
                            >
                                <Select
                                    onChange={(e) => setWh(e)}
                                    placeholder="Select an option"
                                    value={dataOrderLogistik[0].whTeamId}
                                >
                                    {lsp?.map((inv) => (
                                        <Select.Option value={inv.subconId}>
                                            {inv.subconName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Delivery Request" name="deliveryRequest"
                                rules={[{ required: true, message: 'Please Select Delivery Request!' }]}
                            >
                                <Select
                                    onChange={(e) => handleDeliveryChange(e)}
                                    placeholder="Select an option"
                                >
                                    {deliveryList?.length == 0 ? null : deliveryList?.map((inv) => (
                                        <Select.Option value={inv.cdmrId}>
                                            {inv.cdmrName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Delivery Request Transport" name="deliveryRequestTransport"
                                rules={[{ required: true, message: 'Please Select Delivery Request Transport!' }]}
                            >
                      
                                <Select
                                    onChange={(e) => setModeTransport(e)}
                                    placeholder="Select an option"
                                >
                                    {DataDeliveryTransport?.length == 0 ? (<></>):(DataDeliveryTransport?.map((e)=>(
                                        <Select.Option value={e.transportModeId}>
                                            {e.transportMode}
                                        </Select.Option>
                                    )))
                                    }
                                </Select>
                      
                            </Form.Item>
                            <Form.Item label="Transport Team" name="transportTeam"
                                rules={[{ required: true, message: 'Please Select Transport Team!' }]}
                            >
                                <Select
                                    onChange={(e) => setDeliveryTransport(e)}
                                    placeholder="Select an option"
                                
                                >
                                    {lsp?.length == 0 ? (<></>):( lsp?.map((inv) => (
                                        <Select.Option value={inv.subconId}>
                                            {inv.subconName}
                                        </Select.Option>
                                    )))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Mode Of Transport" name="modeTransport"
                                rules={[{ required: true, message: 'Please Select Mode of Transport!' }]}
                            >
                                <Select
                                    onChange={(e) => setDeliveMode(e)}
                                    placeholder="Select an option"
                                >
                                    {
                                        deliveryMode?.length == 0 ? (null):( deliveryMode?.map((inv) => (
                                            <Select.Option value={inv.deliveryModeId}>
                                                {inv.deliveryMode}
                                            </Select.Option>
                                        )))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item label="Note" name="note" 
                            
                            >
                                <TextArea rows={4} onChange={(e) => setNote(e.target.value)}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{marginTop:6,marginLeft:128}}>
                                <Col span={4} md={8} sm={24}>
                                    <Space direction="horizontal">
                                        <Button
                                            type="danger"
                                            onClick={() =>
                                                showModalCancel()
                                            }
                                        >
                                    Order Request Cancel
                                        </Button>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                       
                                        >
                                    Confirm
                                        </Button>
                                        <Button
                                       
                                            htmlType="submit"
                                            onClick={() =>
                                                cancelNavigate()
                                            }
                                        >
                                    Back
                                        </Button>
                                    </Space>
                                </Col>
                            </Form.Item>
                        </Form>
                      
                        
                    </Card>
                </Col>
            </Row>
            <Modal title="Confirm Order Request" visible={isModalVisible}  onCancel={cancelModal} 
                footer={[
                    <Button key="back"  onClick={cancelModal}>
            Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handlePost} >
            Submit
                    </Button>,
                
                ]} >
                <Typography>Are you sure you want to confirm  ?
                </Typography>
      
            </Modal>
            <Modal title="Cancel Order Request" visible={isModalCancelVisible}  onCancel={cancelModal2} 
                footer={
                    remarks.length <= 10 ? ( [
                
                
                        <Button disabled key="back" type="danger" onClick={saveDraft}>
                Reject
                        </Button>,
                        <Button key="submit"  onClick={cancelModal2} >
                Close
                        </Button>,
                    
                    ]):( [
                
                
                        <Button key="back" type="danger" onClick={saveDraft}>
                Reject
                        </Button>,
                        <Button key="submit"  onClick={cancelModal2} >
                Close
                        </Button>,
                    
                    ])
                } >
                <Typography>Reason Of Cancelation :
                </Typography>
                <TextArea rows={4} onChange={(e) => setRemarks(e.target.value)}/>
      
            </Modal>
        </div>
    )
}

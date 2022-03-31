/* eslint-disable react/no-unstable-nested-components */
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
import { useHistory } from "react-router-dom"
import moment from 'moment'
import HeaderChanger from "@app/components/cardheader/HeaderChanger"
import { getLog, getMaterial, getOrderDetail, postAprove,postReject,getOdi,getSno } from "@app/store/action/aprovalTaskPendingAction"

const { TextArea } = Input;

export default function AprovalTaskPendingForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const [page, setPage] = useState(1)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalRejectVisible, setIsModalRejectVisible] = useState(false);
    const [remarks, setRemarks] = useState("")
    const {Title} = Typography
    const {TabPane} = Tabs

    useEffect(() => {
        dispatch(getOrderDetail())
        dispatch(getMaterial())
        dispatch(getLog())
    }, [])

    const dataOrderDetail = useSelector(state=>state.aprovalTaskPendingReducer.dataOrderRequestDetail)
    const dataMaterialOrder = useSelector(state=>state.aprovalTaskPendingReducer.dataMaterial)
    const dataLogOrder = useSelector(state=>state.aprovalTaskPendingReducer.dataLog)
    const dataSno = useSelector(state=>state.aprovalTaskPendingReducer.sno)
    const dataUserId = useSelector(state=>state.auth.user.uid)
    const dataStats = useSelector(state=>state.aprovalTaskPendingReducer.stats.status)
    const dataStats2 = useSelector(state=>state.aprovalTaskPendingReducer.statsReject.status)

    const showModal = () => {
        setIsModalVisible(true);
       
    };
   
    const showModalReject = () => {
        setIsModalRejectVisible(true);
       
       
    };
    const cancelModal = () => {
        setIsModalVisible(false);
    }
    const cancelModal2 = () => {
        setIsModalRejectVisible(false);
    }

    const handleAproval = () => {
        dispatch(postAprove({"sno":dataSno,"LMBY":dataUserId}))
        if(dataStats == "success"){
            history.push('/sitelist/aprovaltaskpending')
        }
        dispatch(getOdi(""))
        dispatch(getSno(""))
    }
    const handleReject = () => {
        dispatch(postReject({"sno":dataSno,"LMBY":dataUserId,"reasonOfRejection":remarks}))
        if(dataStats2 == "success"){
            history.push('/sitelist/aprovaltaskpending')
        }
        dispatch(getOdi(""))
        dispatch(getSno(""))
    
    }

    const handleBack = () => {
        history.push("/sitelist/aprovaltaskpending")
    }

    const columns = [
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "PO No/RO No",
            dataIndex: "cpoNo"
        },
        {
            title: "Work Package ID",
            dataIndex: "workpackageId"
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
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Category",
            dataIndex: "site"
        },
        {
            title: "Item Code",
            dataIndex: "materialCode"
        },

        {
            title: "Item Desc",
            dataIndex: "materialDesc"
        },
        {
            title: "BOQ Ref QTY",
            dataIndex: "refQTY"
        },
        {
            title: "BOQ Req QTY",
            dataIndex: "reqQTY"
        },
        {
            title: "Delta QTY",
            dataIndex: "deltaQTY"
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
            render : (record) =>{return(
                <p>{moment(record.incomingDate).format("YYYY-MM-DD hh:mm:ss")}</p>
            )}
        },
        {
            title: "Execute Date",
            dataIndex: "executeDate",
            render : (record) =>{return(
                <p>{moment(record.executeDate).format("YYYY-MM-DD hh:mm:ss")}</p>
            )}
        },

        {
            title: "Execute By",
            dataIndex: "executedBy"
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
    const columnsOrderDetail = [
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Order Type",
            dataIndex: "orderType"
        },
        {
            title: "Delivery Type",
            dataIndex: "deliveryType"
            
        },
        {
            title: "Propose Delivery Mode",
            dataIndex: "proposeDeliveryMode"
        },
       
        {
            title: "Site Location",
            dataIndex: "siteCondition"
        },
        {
            title: "CT Name",
            dataIndex: "ctName"
        },
        {
            title: "Site Name",
            dataIndex: "siteName"
        },
        {
            title: "Region",
            dataIndex: "region"
        },
        {
            title: "Zone",
            dataIndex: "zone"
        },
        {
            title: "Requester",
            dataIndex: "requesterName"
        },
        {
            title: "Request Date",
            dataIndex: "requestDate",
            render : (text) =>{return(
                <p>{moment(text).format("YYYY-MM-DD hh.mm.ss")}</p>
            )}
        },
        {
            title: "Expected Delivery Date",
            dataIndex: "expectedDeliveryDate",
            render : (text) =>{return(
                <p>{moment(text).format("YYYY-MM-DD")}</p>
            )}
        },

       
      
    ]
    
    // eslint-disable-next-line react/jsx-no-undef
    const CardTitle = (title) => <Title level={5}>{title}</Title>
    return (
        <div>
            <HeaderChanger title="Aproval Task Pending Form" />
            <Col span={24}>
                <div className="card card-primary">
                   
                    <div className="card-body">
                        <Table columns={columns} pagination={false} dataSource={dataOrderDetail} />
                    </div>
                </div>
            </Col>
            <Col span={24}>
                <Card hoverable >
                    <Tabs defaultActiveKey="1" centered={false}>
                        <TabPane tab="Order Request Detail" key="1">
                            <Card title={CardTitle("Order Request")}>
                                <div className="card-body">
                                    <Table
                                        columns={columnsOrderDetail}
                                        pagination={false}
                                        dataSource={dataOrderDetail}
                                    />
                                </div>
                            </Card>
                        </TabPane>
                        <TabPane tab="Material Order" key="2">
                            <Card title={CardTitle("Material Order")}>
                                <div className="card-body">
                                    <Table
                                        columns={columnsMaterial}
                                        pagination={false}
                                        dataSource={dataMaterialOrder}
                                    />
                                </div>
                            </Card>
                        </TabPane>
                        <TabPane tab="Log" key="3">
                            <Card title={CardTitle("Log")}>
                                <div className="card-body">
                                    <Table
                                        columns={columnsLog}
                                        pagination={false}
                                        dataSource={dataLogOrder}
                                    />
                                </div>
                            </Card>
                        </TabPane>
                    </Tabs>
                    <div className="float-right mt-4">
                        <Col span={4} md={8} sm={24}>
                            <Space direction="horizontal">
                                <Button
                            
                                    onClick={() => handleBack()}
                                >
                            Back
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={() => showModal()}
                                >
                            Aprove
                                </Button>
                                <Button
                                    type="danger"
                                    onClick={() => showModalReject()}
                                >
                            Reject
                                </Button>
                          
                            </Space>
                        </Col>
                    </div>
                </Card>
            </Col>
      
            <Modal title="Approve Task" style={{borderRadius:"4px"}} visible={isModalVisible}  onCancel={cancelModal} 
                footer={[
                    <Button key="submit" type="primary"  onClick={handleAproval}>
                    Approve
                    </Button>,
                    
                    <Button key="back"  onClick={cancelModal}>
                Cancel
                    </Button>,
                
                ]} >
                <Typography>Are you sure you want to Aprove?
                </Typography>
      
            </Modal>
            <Modal title="Material List" visible={isModalRejectVisible}  onCancel={cancelModal2} 
                footer={
                    remarks.length <= 10 ? ( [
                    
                        <Button disabled key="back" type="danger" onClick={handleReject} >
                    Reject
                        </Button>,
                        <Button key="submit"  onClick={cancelModal2} >
                    Close
                        </Button>,
                    
                    ]):( [
                    
                        <Button key="back" type="danger" onClick={handleReject} >
                    Reject
                        </Button>,
                        <Button key="submit"  onClick={cancelModal2} >
                    Close
                        </Button>,
                       
                    
                    ])}
            >
                <Typography>Reason Of Cancelation :
                </Typography>
                <TextArea rows={4} onChange={(e) => setRemarks(e.target.value)} placeHolder="Min 10 Characters"/>
      
            </Modal>
        </div>
    )
}

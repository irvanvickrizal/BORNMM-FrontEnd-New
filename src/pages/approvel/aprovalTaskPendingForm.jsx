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
    Switch
} from "antd"
import HeaderChanger from "@app/components/cardheader/HeaderChanger"

export default function AprovalTaskPendingForm() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const {Title} = Typography
    const {TabPane} = Tabs

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
            dataIndex: "category"
        },
        {
            title: "Item Code",
            dataIndex: "itemCode"
        },

        {
            title: "Item Desc",
            dataIndex: "Item Desc"
        },
        {
            title: "BOQ Ref QTY",
            dataIndex: "projectName"
        },
        {
            title: "Delta QTY",
            dataIndex: "region"
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
            dataIndex: "incomingDate"
        },
        {
            title: "Execute Date",
            dataIndex: "itemCode"
        },

        {
            title: "Execute By",
            dataIndex: "Item Desc"
        },
        {
            title: "Event Desc",
            dataIndex: "projectName"
        },
        {
            title: "Remarks",
            dataIndex: "region"
        }
    ]
    // eslint-disable-next-line react/jsx-no-undef
    const CardTitle = (title) => <Title level={5}>{title}</Title>
    return (
        <div>
            <HeaderChanger title="Logistic Form" />
            <Col span={24}>
                <div className="card card-primary">
                    <div className="card-header align-middle">
                        <h3 className="card-title">Site Info</h3>
                    </div>
                    <div className="card-body">
                        <Table columns={columns} pagination={false} />
                    </div>
                </div>
            </Col>
            <Col span={24}>
                <Card hoverable title={CardTitle("Order Request Detail")}>
                    <Tabs defaultActiveKey="1" centered={false}>
                        <TabPane tab="Order Request Detail" key="1">
                            <div className="card card-primary">
                                <div className="card-header align-middle">
                                    <h3 className="card-title">Site Info</h3>
                                </div>
                                <div className="card-body">
                                    <Table
                                        columns={columns}
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Material Order" key="2">
                            <div className="card card-primary">
                                <div className="card-header align-middle">
                                    <h3 className="card-title">Site Info</h3>
                                </div>
                                <div className="card-body">
                                    <Table
                                        columns={columnsMaterial}
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tab="Log" key="3">
                            <div className="card card-primary">
                                <div className="card-header align-middle">
                                    <h3 className="card-title">Site Info</h3>
                                </div>
                                <div className="card-body">
                                    <Table
                                        columns={columnsLog}
                                        pagination={false}
                                    />
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </Col>
            <div className="float-right">
                <Col span={4} md={8} sm={24}>
                    <Space direction="horizontal">
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => console.log("tes")}
                        >
                            Aprove
                        </Button>
                        <Button
                            type="danger"
                            onClick={() => console.log("save as draft")}
                        >
                            Reject
                        </Button>
                    </Space>
                </Col>
            </div>
        </div>
    )
}

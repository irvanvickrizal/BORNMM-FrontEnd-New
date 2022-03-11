/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-unstable-nested-components */
import React, {Component,useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Row, Col,Card, Typography, Input, Space,
    Form,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    message } from 'antd';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {useDispatch, useSelector} from 'react-redux';
import API  from '../../utils/apiServices';
import CreateDataDismantle from './DataGenerator';
import moment from 'moment';

const DismantleForm = (props) => {
    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const { Title } = Typography;
    const wpid = params.get('wpid');
    const orderTypeId = 4;
    const [siteInfo, setSiteInfo] = useState([]);
    const [cpoNo,setCpoNo] = useState("");
    const [generalScope,setGeneralScope] = useState("");
    const [siteID,setSiteID] = useState("");
    const [siteName,setSiteName] = useState("");
    const [packageName,setPackageName] = useState("");
    const [packageStatus,setPackageStatus] = useState("");
    const [sowIPM,setSOWIPM] = useState("");
    const [wBS,setWBS] = useState("");
    const [projectContract,setProjectContract] = useState("");
    const [region,setRegion] = useState("");
    const [ddlInventoryCode,setDDLInventoryCode] = useState([]);
    const [ddlRequestBase,setDDLRequestBase] = useState([]);
    const [ddlSiteLocation,setDDLSiteLocation] = useState([]);
    const [ddlCTName,setDDLCTName] = useState([]);
    const [ddlOrigin,setDDLOrigin] = useState([]);
    const [ddlDestination,setDDLDestination] = useState([]);
    const [ddlSOW,setDDLSOW] = useState([]);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    
    const history = useHistory();
    const [selectedInvCode,setSelectedInvCode] = useState('');
    const [selectedSiteLocation,setSelectedSiteLocation] = useState('');
    const [selectedRequestBase,setSelectedRequestBase] = useState('');
    const [selectedCTName,setSelectedCTName] = useState('');
    const [selectedOrigin,setSelectedOrigin] = useState('');
    const [selectedDestination,setSelectedDestination] = useState('');
    const [selectedSOW,setSelectedSOW] = useState('');
    const [deliveryDate,setDeliveryDate] = useState('');

    const navigateTo = (path) => {
      
        history.push(`/mm/sitelistdr`)
    }
    const user = useSelector((state) => state.auth.user);

    const getSiteInfo = () => {
        API.getSiteInfo(wpid).then(
            result=>{
                const data = [CreateDataDismantle.siteInfo(
                    result.poDetail.cpoNo
                    ,result.scopeDetail.scopeName
                    ,result.siteNo
                    ,result.siteName
                    ,result.packageName
                    ,result.packageName
                    ,result.region)]
                setSiteInfo(data);
            }
        )
    }

    const getInventoryDDL = () => {
        API.getInventoryActiveList().then(
            result=>{
                console.log("inventory",result);
                setDDLInventoryCode(result);
            }
        )
    }
    
    const getRequestBaseDDL = () => {
        API.getRequestBase(orderTypeId).then(
            result=>{
                console.log("rb",result);
                setDDLRequestBase(result);
            }
        )
    }

    const getSiteLocationDDL = () => {
        API.getSiteLocation().then(
            result=>{
                setDDLSiteLocation(result);
                console.log("netype",result);
            }
        )
    }
    
    const getCTNameDDL = (invcodeid) => {
        API.getCTName(invcodeid).then(
            result=>{
                setDDLCTName(result);
                console.log("CTNAMeDDL",result);
            }
        )
    }

    const getOriginDDL = () => {
        API.getOrigin(wpid,orderTypeId).then(
            result=>{
                setDDLOrigin(result);
                console.log("ORIGIN",result);
            }
        )
    }

    const getDestination = () => {
        API.getDestination(wpid,orderTypeId).then(
            result=>{
                setDDLDestination(result);
                console.log("Destination",result);
            }
        )
    }

    const getSOW = () => {
        API.getDismantledBy().then(
            result=>{
                setDDLSOW(result);
                console.log("SOW",result);
            }
        )
    }

    const columns = [
        {
            title: 'PO NO/ RO No',
            dataIndex: 'cpoNo',
            key: 'cpoNo',
        },
        {
            title: 'General Scope',
            dataIndex: 'scopeName',
            key: 'scopeName',
        },
        {
            title: 'Site No',
            dataIndex: 'siteNo',
            key: 'siteNo',
        },
        {
            title: 'Site Name',
            dataIndex: 'siteName',
            key: 'siteName',
        },
        {
            title: 'Package Name',
            dataIndex: 'packageName',
            key: 'packageName',
        },
        {
            title: 'Project Contract',
            dataIndex: 'packageName',
            key: 'packageName',
        },
        {
            title: 'Region',
            dataIndex: 'region',
            key: 'region',
        },
    ];

    function handleInvDDLChange(e){
        console.log("handleInvDDLChange",e); 
        setSelectedInvCode(e);
        getCTNameDDL(e);
    }

    function range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return current < moment().add(2,'d');
    }

    const postDismantleForm = () => {
        const body = (
            {
                "workpackageid":"480759",            
                "InvCodeId":1,
                "orderTypeId":4,
                "requestTypeId":6,
                "subconId":22,
                "originId":2,        
                "destinationId":4,        
                "siteConditionId":1,
                "CTId":1,
                "packetTypeId":2,
                "expectedDeliveryDate":"2022-03-13",
                "requestBy": 1
            }
        )
        API.postDismantleForm(body).then(
            result=>{
                setDDLDestination(result);
                console.log("Destination",result);
            }
        )
    }

    function btnConfirm(){
        if(selectedRequestBase==''||selectedInvCode==''||
            selectedSiteLocation==''||selectedCTName==''||
            selectedOrigin==''||selectedDestination==''||
            selectedSOW==''||deliveryDate==''){
                
            message.error('Please Complete Form');
        }
        else{


            message.success("confirm Form");
        }
    }

    function btnCancel(){
        console.log("sini");
        navigateTo("mm/sitelistdr");
    }

    useEffect(() => {
        getSiteInfo();
        getInventoryDDL();
        getRequestBaseDDL();
        getSiteLocationDDL();
        getOriginDDL();
        getDestination();
        getSOW();
    },[])

    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )

    return (
        <div>
            <HeaderChanger title="Dismantle Form"/>
            <Row>
                <Col span={24}>
                    <div className="card card-primary">
                        <div className="card-header align-middle">
                            <h3 className="card-title">Site Info</h3>
                        </div>
                        <div className="card-body">
                            <Table columns={columns} pagination={false} dataSource={siteInfo} />
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <Card hoverable title={CardTitle("Order Detail")}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Form
                                labelCol={{ span: 3 }}
                                wrapperCol={{ span: 20 }}
                                layout="horizontal"
                            >
                                <Form.Item label="Order Type">
                                    <Input disabled value="PMR" />
                                </Form.Item>
                                <Form.Item label="Inventory Code">
                                    <Select 
                                        onChange={(e) => handleInvDDLChange(e)}
                                        placeholder="Select an option"
                                    >
                                        {/* <Select.Option value={0}>-- SELECT --</Select.Option> */}
                                        {
                                            ddlInventoryCode.map(inv =>  <Select.Option value={inv.invCodeId}> 
                                                {inv.invCode}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Request Base">
                                    <Select
                                        onChange={(e) => setSelectedRequestBase(e)} 
                                        placeholder="Select an option">
                                        {
                                            ddlRequestBase.map(rbs =>  <Select.Option value={rbs.requestTypeId}> 
                                                {rbs.requestTypeName}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Site Location">
                                    <Select
                                        onChange={(e) => setSelectedSiteLocation(e)}  
                                        placeholder="Select an option">
                                        {
                                            ddlSiteLocation.map(slc =>  <Select.Option value={slc.neTypeId}> 
                                                {slc.neType}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="CT Name">
                                    {
                                        selectedInvCode == '' ?  <Select status="warning" disabled placeholder="Please Select Inventory Code">
                                        </Select>
                                            :
                                            <Select 
                                                onChange={(e) => setSelectedCTName(e)} 
                                                placeholder="Select an option">
                                                {
                                                    ddlCTName.map(slc =>  <Select.Option value={slc.ctName}> 
                                                        {slc.neType}</Select.Option>)
                                                }
                                            </Select>
                                    }
                                </Form.Item>
                                <Form.Item label="Site Condition">
                                    <Select
                                        onChange={(e) => setSelectedSiteLocation(e)}  
                                        placeholder="Select an option">
                                        {
                                            ddlSiteLocation.map(slc =>  <Select.Option value={slc.neTypeId}> 
                                                {slc.neType}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Origin">
                                    <Select 
                                        onChange={(e) => setSelectedOrigin(e)} 
                                        placeholder="Select an option">
                                        {
                                            ddlOrigin.map(org =>  <Select.Option value={org.dopId}> 
                                                {org.dopName}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Destination">
                                    <Select 
                                        onChange={(e) => setSelectedDestination(e)} 
                                        placeholder="Select an option">
                                        {
                                            ddlDestination.map(dst =>  <Select.Option value={dst.dopId}> 
                                                {dst.dopName}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Packet Type" rules={[
                                    {
                                        required: true,
                                    },
                                ]}>
                                    <Select 
                                        onChange={(e) => setSelectedSOW(e)} 
                                        placeholder="Select an option">
                                        {
                                            ddlDestination.map(dst =>  <Select.Option value={dst.dopId}> 
                                                {dst.dopName}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Delivery Date" rules={[{ required: true, message: 'Missing Inventory Code' }]}>
                                    <DatePicker
                                        format="YYYY-MM-DD"
                                        disabledDate={disabledDate}
                                        onChange={(e) => setDeliveryDate(e)} 
                                        // disabledDate={current && current < moment().endOf('day')}
                                        // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                    />
                                </Form.Item>
                                {/* <Form.Item>
                                    <Button type="primary" htmlType="submit">Confirm</Button>
                                    <Button type="danger">Cancel</Button>
                                </Form.Item> */}
                            </Form>
                            <Divider orientation="center" />
                            <Row>
                                <Col span={20}>
                                    <Row>
                                        <Col span={3}>Requester</Col>
                                        <Col span={1}>:</Col>
                                        <Col span={15}>{user.name}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={3}>Request Date</Col>
                                        <Col span={1}>:</Col>
                                        <Col span={15}>{date}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={3}>Phone No</Col>
                                        <Col span={1}>:</Col>
                                        <Col span={15}>{user.name}</Col>
                                    </Row>
                                </Col>
                                <Col span={4}> 
                                    <Space direction="horizontal">
                                        <Button type="primary" htmlType="submit" onClick={btnConfirm}>Confirm</Button>
                                        <Button type="danger" onClick={btnCancel}>Cancel</Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default DismantleForm;
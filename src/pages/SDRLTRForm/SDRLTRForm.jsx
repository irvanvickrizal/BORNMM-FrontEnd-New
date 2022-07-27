/* eslint-disable radix */
/* eslint-disable react/jsx-no-useless-fragment */
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
    Tooltip,
    Checkbox,
    message } from 'antd';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {useDispatch, useSelector} from 'react-redux';
import API from '@app/utils/apiServices';
import CreateDataDismantle from './DataGenerator';
import moment from 'moment';

import { toast } from 'react-toastify';

const SDRLTRForm = (props) => {
    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const { Title } = Typography;
    const wpid = params.get('wpid');
    const orderTypeId = params.get('ot');
    const ddid = params.get('ddid');
    const odi = params.get('odi');
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
    const [ddlPacketType,setDDLPacketType] = useState([]);
    const [ddlSubcon,setDDLSubcon] = useState([]);
    const [ddlSiteCondition,setDDLSiteCondition] = useState([]);
    const [ddlTeam,setDdlTeam] = useState([]);
    const [ddlWHTeam,setDdlWHTeam] = useState([]);
    const [ddlWHSPV,setDdlWHSPV] = useState([]);

    const [ddlIDeliveryMode,setDDLDeliveryMode] = useState([]);
    const [ddlOrderType,setDDLOrderType] = useState([]);
    const [siteInfoDetail,setSiteInfoDetail] = useState([]);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const date2 = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    
    const history = useHistory();
    const [selectedInvCode,setSelectedInvCode] = useState('');
    const [selectedOrderType,setSelectedOrderType] = useState('');
    const [selectedSiteLocation,setSelectedSiteLocation] = useState('');
    const [selectedRequestBase,setSelectedRequestBase] = useState('');
    const [selectedCTName,setSelectedCTName] = useState('');
    const [selectedOrigin,setSelectedOrigin] = useState('');
    const [selectedDestination,setSelectedDestination] = useState('');
    const [selectedPacketType,setSelectedPacketType] = useState('');
    const [selectedSubcon,setSelectedSubcon] = useState('');
    const [selectedSiteCondition,setSelectedSiteCondition] = useState('');
    const [deliveryDate,setDeliveryDate] = useState(moment(date2, "YYYY-MM-DD").add(2,'d'));
    const [siteAddress,setSiteAddress] = useState('');
    const [selectedTeamCoordinator,setSelectedTeamCoordinator] = useState('');
    const [ddlTeamCoordinator,setDDLTeamCoordinator] = useState([]);
    const [checked,setChecked] = useState(false);
    const [selectedDeliveryMode,setSelectedDeliveryMode] = useState('');
    const [form] = Form.useForm();
    const [phoneNumber,setPhoneNumber] = useState('')
    const [isSite,setIsSite]= useState(true)
    const [express,setExpress] = useState(false);
    const [siteNo,setSiteNo] = useState('')
    const [intialValueDestination,setInitialValueDestination] = useState("")


    const navigateTo = (path) => {
        history.push(path)
    }

    const user = useSelector((state) => state.auth.user);
    const getIdentity = () => {
        API.getIdentity().then(
            result=>{
                console.log("data me:",result)
                setPhoneNumber(result.data.phoneNo)
            }
        )
    }
    const getDDLWHSPV=(destinationid)=>{
        API.getWHSupervisor(destinationid,wpid,selectedDestination).then(
            result=>{
                setDdlWHSPV(result);
                console.log("wh spv",result);
            }
        )
    }

    const getTeamCoordinator = (selectedSubcons) => {
        API.getTeamCoordinator(selectedSubcons,wpid).then(
            result=>{
                console.log("data team:",result)
                setDdlTeam(result);
            }
        )
    }
    const getDDLWHTeam = (destinationId) => {
        API.getWHTeam(destinationId).then(
            result=>{
                setDdlWHTeam(result);
                console.log("WH team",result);
            }
        )
    }

    const handleWHTeamChange = (e)=>{
        console.log(e,"selected WH Team");
        setSelectedSubcon(e)
        getDDLWHSPV(e)
    }
    

    const handleSubcon = (e)=>{
        setSelectedSubcon(e)
        getTeamCoordinator(e)
        setSelectedTeamCoordinator('')
        console.log(selectedTeamCoordinator);
    }

    const handleDestinationChange = (value) =>{
        setSelectedDestination(value);
        API.getAddress(siteNo,value).then(
            result=>{
                setSiteAddress(result[0].endPointAddress)  
                console.log("teslog",result[0].endPointAddress);    
                // form.setFieldsValue({
                //     siteAddress: "result[0].endPointAddress"
                // });
                console.log(siteAddress,"siteAddress");  
            }
        )

        API.checkIsSite(value).then(
            result=>{
                console.log("issite",result)
                setIsSite(result)
                if(!result)
                { 
                    getDDLWHTeam(value)
                }

            }
        )
    }

    const getSiteInfo = (wpidparam) => {
        API.getSiteInfo(wpidparam).then(
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
                setSiteNo(result.siteNo)
                console.log("site info",data)
            }
        )
    }

    const getSiteInfoDetail = (orderDetailId) => {
        API.getSDRLTRDDL(orderDetailId).then(
            result=>{
                setSiteInfoDetail(result[0]);
                console.log("site info detail",result[0])
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

    const getInventoryDDL = () => {
        API.getInventoryActiveList().then(
            result=>{
                console.log("inventory",result);
                setDDLInventoryCode(result);
                setSelectedInvCode(result[0].invCodeId)
                getCTNameDDL(result[0].invCodeId);
            }
        )
    }

    const getOrderTypeDDL = (orderTypeParam) => {
        API.getmOrderType().then(
            result=>{
                console.log("OrderType",result);
                setDDLOrderType(result);
                setSelectedOrderType(orderTypeParam);
            }
        )
    }

    const getDeliveryModeDDL = (orderTypeIdParam) => {
        API.getDdlDeliveryDate(orderTypeIdParam).then(
            result=>{
                console.log("propose",result);
                setDDLDeliveryMode(result);
                // setInitialValue(result[0].invCode)
            }
        )
    }
    
    const getRequestBaseDDL = (orderTypeIdParam,wpidParam) => {
        API.getRequestBase2(orderTypeIdParam,wpidParam).then(
            result=>{
                console.log("rb",result);
                setDDLRequestBase(result);
            }
        )
    }

    const getHasExpressDelivery = (orderTypeIdParam) => {
        API.getHasExpressDelivery(orderTypeIdParam).then(
            result=>{
                setExpress(result);
                console.log("express",result);
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

    const getOriginDDL = (wpidParam,orderTypeIdParam) => {
        API.getOrigin(wpidParam,orderTypeIdParam).then(
            result=>{
                setDDLOrigin(result);
                console.log("ORIGIN",result);
            }
        )
    }

    const getAddress = (value) =>{
        API.getAddress(siteNo,value).then(
            result=>{
                setSiteAddress(result[0].endPointAddress)  
                console.log("teslog",result[0].endPointAddress);    
                // form.setFieldsValue({
                //     siteAddress: "result[0].endPointAddress"
                // });
                console.log(siteAddress,"siteAddress");  
            }
        )
    }

    const getDestination = () => {
        API.getDestination(wpid,orderTypeId).then(
            result=>{
                setDDLDestination(result);
                setInitialValueDestination(result[0].dopId)
                console.log("Destination",result);
            }
        )
    }
    
    const getPacketType = (orderTypeIdParam) => {
        API.getPacketType(orderTypeIdParam).then(
            result=>{
                setDDLPacketType(result);
                console.log("PacketType",result);
            }
        )
    }

    const getSubcon = () => {
        API.getSubcon(orderTypeId).then(
            result=>{
                setDDLSubcon(result);
                console.log("PacketType",result);
            }
        )
    }

    const handleIsExpress = (value)=> {
        setChecked(value)
        console.log("v",value)
    }


    const handleCTNameChange = (value)=> {
        console.log("ctchange",value)
    }
    
    const getSiteCondition = (orderTypeIdParam) => {
        API.getSiteCondition(orderTypeIdParam).then(
            result=>{
                setDDLSiteCondition(result);
                console.log("PacketType",result);
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
            title: 'WH Code',
            dataIndex: 'siteNo',
            key: 'siteNo',
        },
        {
            title: 'WH Name',
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

    function handleSelectedSubcon(e){
        console.log("handlesconchange",e); 
        setSelectedSubcon(e);
        getTeamCoordinator(e);
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
        if(!express){
            return current < moment().add(1,'d');
        }
        return (current < moment().endOf('day'))
    }

    function disabledDateExpress(current) {
        // Can not select days before today and today
        return  moment(current).add(1,'d') < moment().endOf('day')
    }

    const postDismantleForm = (values) => {
        const body = (
            {

                "orderDetailId":odi,
                "workpackageid":wpid,            
                "InvCodeId":values.inventoryCode,
                "orderTypeId":values.orderType,
                "requestTypeId":values.requestBase,
                "subconId":values.subCon,
                "picOnSiteId":values.teamCoordinator,
                "originId":values.origin,        
                "destinationId":values.destination,        
                "siteConditionId":values.siteLocation,
                "CTId":values.ctName,
                "packetTypeId":values.packetType,
                "neTypeId" : values.siteLocation,
                "siteAddress": values.siteAddress,
                "isExpressDelivery":values.isExpressDelivery,
                "expectedDeliveryDate":moment(deliveryDate).format("YYYY-MM-DD"),
                "proposeDeliveryModeId":values.proposeDelivery,
                "requestBy": user.uid
            }
        )
        console.log("TAR values",values);
        console.log("TAR body",body);
        API.putSDRLTRForm(body).then(
            result=>{
                if(result.status=="success")
                {
                    console.log(result,'result tarmo')
                    toast.success(result.message);
                    navigateTo(`/mm/materialordersdrltr?odi=${result.returnVal}`)
                }
                else{
                    toast.error(result.message)
                }
            }
        )
    }

    function btnConfirm(data){
        console.log("confirmbutton",data)
        postDismantleForm(data);
    
    }

    const handleConfirm=(data)=>{
        console.log("confirmbutton",data)
        postDismantleForm(data);
    }

    const onFinishFailedAddMaterial = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function btnCancel(){
        navigateTo("/mm/sitelistdr");
    }

    function onChange(value) {
        console.log(`selected ${value}`);
    }
      
    function onSearch(val) {
        console.log('search:', val);
    }

    useEffect(() => {
        console.log('wpid:',wpid,"ordertype:",orderTypeId)
        getInventoryDDL();
        getSiteLocationDDL();
        getDestination();
        getSubcon();
        getIdentity()
        // getTeamCoordinator();
    },[])

    useEffect(() => {
        getSiteInfoDetail(odi)
    },[odi])
    useEffect(() => {
        getOrderTypeDDL(orderTypeId);
        getDeliveryModeDDL(orderTypeId)
        getSiteCondition(orderTypeId);
        getHasExpressDelivery(orderTypeId);
        getPacketType(orderTypeId);
    },[orderTypeId])

    useEffect(() => {
        getSiteInfo(wpid)
        getOriginDDL(wpid,orderTypeId);
        getRequestBaseDDL(orderTypeId,wpid);
    },[wpid,orderTypeId])

    // useEffect(() => {
    //     getAddress(ddid)
    // },[siteNo])

    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )

    return (
        <div>
            <Row>
                <Col span={24}>
                    <div className="card card-primary">
                        <div className="card-header align-middle">
                            <h3 className="card-title">Site Info</h3>
                        </div>
                        <div className="card-body">
                            <Table 
                                columns={columns} 
                                scroll={{x:'100%'}} 
                                pagination={false} 
                                dataSource={siteInfo} 
                            />
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <Card hoverable title={CardTitle("Order Detail")}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Form
                                form={form}
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 18 }}
                                layout="horizontal"
                                initialValues={{
                                    'isExpressDelivery':false,
                                    'deliveryDate': moment(date2, "YYYY-MM-DD").add(2,'d'),
                                    'orderType' : selectedOrderType,
                                    'destination': parseInt(intialValueDestination)
                                }}
                                fields={[
                                    {
                                        name: ["siteAddress"],
                                        value: siteAddress,
                                    },
                                    {
                                        name: ["orderType"],
                                        value: parseInt(selectedOrderType),
                                    },
                                    {
                                        name: ["requestBase"],
                                        value: parseInt(siteInfoDetail.requestTypeId),
                                    },
                                    {
                                        name: ["inventoryCode"],
                                        value: parseInt(siteInfoDetail.inventoryCodeId),
                                    },
                                    {
                                        name: ["origin"],
                                        value: parseInt(siteInfoDetail.originId),
                                    },
                                    {
                                        name: ["ctName"],
                                        value: parseInt(siteInfoDetail.ctId),
                                    },
                                    {
                                        name: ["siteLocation"],
                                        value: parseInt(siteInfoDetail.neTypeId),
                                    },
                                    {
                                        name: ["packetType"],
                                        value: parseInt(siteInfoDetail.packetTypeId),
                                    },
                                    {
                                        name: ["destination"],
                                        value: parseInt(intialValueDestination),
                                    },
                                ]}
                                onFinish={handleConfirm}
                                onFinishFailed={onFinishFailedAddMaterial}
                            >
                                <Form.Item label="Order Type"
                                    name="orderType"
                                    
                                >
                                    <Select 
                                        placeholder="Select an option"
                                        disabled
                                    >
                                        {
                                            ddlOrderType.map(ot =>  <Select.Option value={ot.orderTypeId}> 
                                                {ot.orderTypeName}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Inventory Code"
                                    name="inventoryCode"
                                    disabled
                                    rules={[{ required: true, message: 'Please Select Inventory Code!'}]}
                                >
                                    <Select 
                                        onChange={(e) => handleInvDDLChange(e)}
                                        placeholder="Select an option"
                                        disabled
                                    >
                                        {
                                            ddlInventoryCode.map(inv =>  <Select.Option value={inv.invCodeId}> 
                                                {inv.invCode}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Request Base"
                                    name="requestBase"
                                    
                                    rules={[{ required: true, message: 'Please Select Request Base!'}]}
                                >
                                    <Select
                                        onChange={(e) => setSelectedRequestBase(e)} 
                                        placeholder="Select an option"
                                        disabled>
                                        {
                                            ddlRequestBase.map(rbs =>  <Select.Option value={rbs.requestTypeId}> 
                                                {rbs.requestTypeName}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Site A/NE - Site B/FE" name="siteLocation"
                                    rules={[{ required: true, message: 'Please Select Site Condition!' }]}
                                >
                                    <Select
                                        onChange={(e) => setSelectedSiteLocation(e)}  
                                        placeholder="Select an option"
                                        disabled>
                                        {
                                            ddlSiteLocation.map(slc =>  <Select.Option value={slc.neTypeId}> 
                                                {slc.neType}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="CT Name" name="ctName"
                                    rules={[{ required: true, message: 'Please Select CT Name!' }]}
                                >
                                    {
                                        selectedInvCode == '' ?  <Select status="warning" disabled placeholder="Please Select Inventory Code">
                                        </Select>
                                            :
                                            <Select 
                                                onChange={(e) => handleCTNameChange(e)} 
                                                placeholder="Select an option"
                                                disabled>
                                                {
                                                    ddlCTName.map(slc =>  <Select.Option value={slc.ctId}> 
                                                        {slc.ctName}</Select.Option>)
                                                }
                                            </Select>
                                    }
                                </Form.Item>
                                <Form.Item label="Origin"
                                    name="origin"
                                    rules={[{ required: true, message: 'Please Origin!'}]}
                                >
                                    <Select 
                                        onChange={(e) => setSelectedOrigin(e)} 
                                        placeholder="Select an option"
                                        disabled>
                                        {
                                            ddlOrigin.map(org =>  <Select.Option value={org.dopId}> 
                                                {org.dopName}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Destination" name="destination"
                                    rules={[{ required: true, message: 'Please Select Destination!' }]}
                                >
                                    <Select 
                                        onChange={(e) => handleDestinationChange(e)} 
                                        placeholder="Select an option">
                                        {
                                            ddlDestination.map(dst =>  <Select.Option value={dst.dopId}> 
                                                {dst.dopName}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                {
                                    isSite ? 
                                        <><Form.Item label="SubCon" name="subCon"
                                            rules={[{ required: true, message: 'Please Select Subcon Name!' }]}
                                        >
                                            <Select
                                                onChange={(e) => handleSubcon(e)}
                                                optionFilterProp="children"
                                                placeholder="Select an option"
                                                //onChange={onChange}
                                                onSearch={onSearch}
                                                showSearch
                                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {ddlSubcon.map(dst => <Select.Option value={dst.subconId}>
                                                    {dst.subconName}</Select.Option>)}
                                            </Select>
                                        </Form.Item><Form.Item label="Team Coordinator at Site" name="teamCoordinator"
                                            rules={[{ required: true, message: 'Please Select Team Coordinator!' }]}
                                        >

                                            {ddlTeam.length == null ? (<></>) : (
                                                <Select
                                                    showSearch
                                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    onChange={(e) => setSelectedTeamCoordinator(e)}
                                                    placeholder="Select an option"
                                                    allowClear='true'
                                                >
                                                    {ddlTeam.map(dst => <Select.Option allowClear value={dst.userId}>
                                                        {dst.fullname}</Select.Option>)}
                                                </Select>)}
                                        </Form.Item></>
                                        :
                                        <>
                                            <Form.Item label="WHTeam" name="subCon"
                                                rules={[{ required: true, message: 'Please Select Subcon Name!' }]}
                                            >
                                                <Select

                                                    onChange={(e) => handleWHTeamChange(e)}
                                                    optionFilterProp="children"
                                                    placeholder="Select an option"
                                                    //onChange={onChange}
                                                    onSearch={onSearch}
                                                    showSearch
                                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    {ddlWHTeam.map(dst => <Select.Option value={dst.scon_id}>
                                                        {dst.scon_name}</Select.Option>)}
                                                </Select>
                                            </Form.Item><Form.Item label="WH Supervisor" name="teamCoordinator"
                                                rules={[{ required: true, message: 'Please Select Team Coordinator!' }]}
                                            >

                                                {ddlWHSPV.length == null ? (<></>) : (
                                                    <Select
                                                        showSearch
                                                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        onChange={(e) => setSelectedTeamCoordinator(e)}
                                                        placeholder="Select an option"
                                                        allowClear='true'
                                                    >
                                                        {ddlWHSPV.map(dst => <Select.Option allowClear value={dst.userId}>
                                                            {dst.fullname}</Select.Option>)}
                                                    </Select>)}
                                            </Form.Item>
                                        </>
                                }

                                {/* <Form.Item label="LSP Team"
                                    name="subCon"
                                    rules={[{ required: true, message: 'Please Select LSP Name!'}]}
                                >
                                    <Select 
                                        onChange={(e) => handleSelectedSubcon(e)} 
                                        placeholder="Select an option"
                                        // onSearch={onSearch}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {
                                            ddlSubcon.map(dst =>  <Select.Option value={dst.subconId}> 
                                                {dst.subconName}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                
                                <Form.Item label="WH Supervisor" 
                                    name="teamCoordinator"
                                    rules={[{ required: true, message: 'Please Select Team Coordinator!'}]}
                                >
                                    {ddlTeamCoordinator.length == null ? (<></>):(
                                        <Select 
                                            showSearch
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                            onChange={(e) => setSelectedTeamCoordinator(e)} 
                                            placeholder="Select an option">
                                            
                                            {
                                                ddlTeamCoordinator.map(dst =>  <Select.Option value={dst.userId}> 
                                                    {dst.fullname}</Select.Option>)
                                            }
                                        </Select>)}
                                    
                                </Form.Item> */}


                                <Form.Item label="Express Pickup" valuePropName="checked" name="isExpressDelivery">  
                                    {express ? (<Checkbox onChange={(e)=>handleIsExpress(e.target.checked)}/>):(
                                        <Tooltip color='#f50' title="Cannot request Express Delivery"><Checkbox disabled /></Tooltip>
                                    )}
                                </Form.Item>
                                <Form.Item label="Packet Type"
                                    name="packetType"
                                    rules={[{ required: true, message: 'Please Select Packet Type!'}]}
                                >
                                    <Select 
                                        onChange={(e) => setSelectedPacketType(e)} 
                                        placeholder="Select an option"
                                        disabled>
                                        {
                                            ddlPacketType.map(dst =>  <Select.Option value={dst.packetTypeId}> 
                                                {dst.packetType}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Propose Delivery Mode" name="proposeDelivery"
                                    rules={[{ required: true, message: 'Please Select Packet Type!' }]}
                                >
                                    <Select 
                                        onChange={(e) => setSelectedDeliveryMode(e)} 
                                        placeholder="Select an option"
                                       
                                    >
                                        {
                                            ddlIDeliveryMode.map(dst =>  <Select.Option value={dst.deliveryModeId}> 
                                                {dst.deliveryMode}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Pickup Date" name="deliveryDate" rules={[{ required: true, message: 'Please Select Delivery Date' }]}>
                                    {checked ? <DatePicker
                                        format="YYYY-MM-DD"
                                        disabledDate={
                                            disabledDateExpress
                                        }
                                        onChange={(e) => setDeliveryDate(moment(e).format("YYYY-MM-DD"))} 
                                        // disabledDate={current && current < moment().endOf('day')}
                                        // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                    /> :
                                        <DatePicker
                                            format="YYYY-MM-DD"
                                            disabledDate={
                                                disabledDate
                                            }
                                            // defaultValue={moment('2015/01/01', "YYYY-MM-DD")}
                                            onChange={(e) => setDeliveryDate(moment(e).format("YYYY-MM-DD"))} 
                                        // disabledDate={current && current < moment().endOf('day')}
                                        // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                        /> }
                                </Form.Item>
                                <Form.Item label="Site Address"   name="siteAddress"
                                    rules={[{ required: true, message: 'Please Input Site Adress Field!'}]}>
                                    <Input.TextArea 
                                        // value={siteAddress}
                                        onChange={(e) => setSiteAddress(e.target.value)}  
                                    />
                                </Form.Item>
                                {/* <Form.Item>
                                    <Button type="primary" htmlType="submit">Confirm</Button>
                                    <Button type="danger">Cancel</Button>
                                </Form.Item> */}
                                <Divider orientation="center" />
                                <Row>
                                    <Col span={18}>
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
                                            <Col span={15}>{phoneNumber}</Col>
                                        </Row>
                                    </Col>
                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{marginTop:6}}>
                                        <Col span={4}> 
                                            <Space direction="horizontal">
                                                <Button type="primary" htmlType="submit" >Confirm</Button>
                                                <Button type="danger" onClick={btnCancel}>Cancel</Button>
                                            </Space>
                                        </Col>
                                    </Form.Item>
                                </Row>
                            </Form>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default SDRLTRForm;
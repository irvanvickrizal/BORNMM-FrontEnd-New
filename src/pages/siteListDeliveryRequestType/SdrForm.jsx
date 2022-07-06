/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-self-compare */
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
    Tooltip,
    Checkbox ,
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

const SdrForm = (props) => {
    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const { Title } = Typography;
    const wpid = params.get('wpid');
    const ot = params.get('ot');
    const subconid= 22
    const orderTypeId = params.get('ot');
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
    const [express,setExpress] = useState("");
    const [ddlInventoryCode,setDDLInventoryCode] = useState([]);
    const [ddlIDeliveryDate,setDDLDeliveryDate] = useState([]);
    const [ddlRequestBase,setDDLRequestBase] = useState([]);
    const [ddlSiteLocation,setDDLSiteLocation] = useState([]);
    const [ddlCTName,setDDLCTName] = useState([]);
    const [ddlOrigin,setDDLOrigin] = useState([]);
    const [ddlDestination,setDDLDestination] = useState([]);
    const [ddlPacketType,setDDLPacketType] = useState([]);
    const [ddlSubcon,setDDLSubcon] = useState([]);
    const [ddlTeam,setDdlTeam] = useState([]);
    const [ddlWHTeam,setDdlWHTeam] = useState([]);
    const [ddlWHSPV,setDdlWHSPV] = useState([]);
    const [ddlSiteCondition,setDDLSiteCondition] = useState([]);
    const current = new Date();
    const [checked,setChecked] = useState(false)
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    
    const date2 = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const history = useHistory();
    const [selectedInvCode,setSelectedInvCode] = useState(1);
    const [selectedSiteLocation,setSelectedSiteLocation] = useState('');
    const [selectedRequestBase,setSelectedRequestBase] = useState('');
    const [selectedCTName,setSelectedCTName] = useState('');
    const [selectedOrigin,setSelectedOrigin] = useState('');
    const [selectedDestination,setSelectedDestination] = useState('');
    const [selectedPacketType,setSelectedPacketType] = useState('');
    const [selectedSubcon,setSelectedSubcon] = useState('');
    const [selectedDeliveryMode,setSelectedDeliveryMode] = useState('');
    const [selectedSiteCondition,setSelectedSiteCondition] = useState('');
    const [deliveryDate,setDeliveryDate] = useState(moment(date2, "YYYY-MM-DD").add(2,'d'));
    const [siteAddress,setSiteAddress] = useState('');
    const [selectedTeamCoordinator,setSelectedTeamCoordinator] = useState("")
    const [initialValue,setInitialValue]= useState("")
    const [selectedINVCode,setSelectedINVCode]= useState("")
    const [isSite,setIsSite]= useState(true)

    const [siteNo,setSiteNo] = useState('')
    const navigateTo = (path) => {
        history.push(path)
    }
    const user = useSelector((state) => state.auth.user);
    const [phoneNumber,setPhoneNumber] = useState('')
    const getSiteInfo = () => {
        API.getSiteInfo(wpid).then(
            result=>{
                console.log(result,"data")
                const data = [CreateDataDismantle.siteInfo(
                    result.poDetail.cpoNo
                    ,result.scopeDetail.scopeName
                    ,result.siteNo
                    ,result.siteName
                    ,result.packageName
                    ,result.packageName
                    ,result.region
                    ,result.workpackageID)]
                setSiteInfo(data);
                setSiteNo(result.siteNo)
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
    
    const getIdentity = () => {
        API.getIdentity().then(
            result=>{
                console.log("data me:",result)
                setPhoneNumber(result.data.phoneNo)
            }
        )
    }

    const getInventoryDDL = () => {
        API.getInventoryActiveList().then(
            result=>{
                console.log("inventory",result);
                setDDLInventoryCode(result);
                setInitialValue(result[0].invCodeId)
                setSelectedINVCode(result[0].invCodeId)
            }
        )
    }
    const getDeliveryDateDDL = () => {
        API.getDdlDeliveryDate(ot).then(
            result=>{
                console.log("propose",result);
                setDDLDeliveryDate(result);
                setInitialValue(result[0].invCode)
            }
        )
    }
    
    const getRequestBaseDDL = () => {
        API.getRequestBase2(orderTypeId,wpid).then(
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
        console.log(invcodeid,"ddlctnameinv")
        API.getCTName(invcodeid).then(
            result=>{
                setDDLCTName(result);
                if(result.length>0){
                    setSelectedCTName(1)
                }
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
    
    const getPacketType = () => {
        API.getPacketType(orderTypeId).then(
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

    const getDDLWHTeam = (destinationId) => {
        API.getWHTeam(destinationId).then(
            result=>{
                setDdlWHTeam(result);
                console.log("WH team",result);
            }
        )
    }
    
    const getSiteCondition = () => {
        API.getSiteCondition(orderTypeId).then(
            result=>{
                setDDLSiteCondition(result);
                console.log("PacketType",result);
            }
        )
    }

    const getHasExpressDelivery = () => {
        API.getHasExpressDelivery(orderTypeId).then(
            result=>{
                setExpress(result);
                console.log("express",result);
            }
        )
    }

    function onChange(value) {
        console.log(`selected ${value}`);
    }
      
    function onSearch(val) {
        console.log('search:', val);
    }
    
    const togleCheckbox = (value)=> {
        setChecked(value)
        console.log("v",value)
    }

    const getDDLWHSPV=(sconid)=>{
        console.log(sconid,"destinationid")
        API.getWHSupervisor(sconid,wpid,selectedDestination).then(
            result=>{
                setDdlWHSPV(result);
                console.log("wh spv",result);
            }
        )
    }

    const handleDestinationChange = (value) =>{
        setSelectedDestination(value);
        console.log(value,"selecteddestination")
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
    
    const columns = [
        {
            title: 'PO NO/ RO No',
            dataIndex: 'cpoNo',
            key: 'cpoNo',
        },
        {
            title: 'WorkpackageID',
            dataIndex: 'workpackageId',
            key: 'workpackageId',
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

    function disabledDateExpressTrue(current) {
        // Can not select days before today and today
        return moment(current).add(1,'d') < moment().endOf('day')
    }
    function disabledDate(current) {
        // Can not select days before today and today
        return current < moment().add(1,'d');
    }

    function consoleTeam() {
        console.log("dataTeam:",selectedSubcon)
    }

    const postDismantleForm = (values) => {
        const body = (
            {
                "workpackageid":wpid,            
                "InvCodeId":selectedInvCode,
                "orderTypeId":orderTypeId,
                "requestTypeId":values.requestBase,
                "subconId":selectedSubcon,
                "picOnSiteId":selectedTeamCoordinator,
                "originId":selectedOrigin,        
                "destinationId":selectedDestination,        
                "siteConditionId":selectedSiteCondition,
                "CTId":values.ctName,
                "packetTypeId":values.packetType,
                "proposeDeliveryModeId":values.proposeDelivery,
                "neTypeId" : values.site,
                "siteAddress": siteAddress,
                "isExpressDelivery":express,
                "expectedDeliveryDate":moment(deliveryDate).format("YYYY-MM-DD"),
                "requestBy": user.uid
            }
        )
        console.log("dismantle body",body);
        API.postDismantleForm(body).then(
            result=>{
                if(result.status=="success")
                {
                    toast.success(result.message);
                    navigateTo(`/mm/materialorder?odi=${result.returnVal}`)
                }
                else{
                    toast.error(result.message)
                }
            }
        )
    }

    function btnConfirm(values){
        postDismantleForm(values);
        console.log("values:",values)
    }
    const onFinishFailedAddMaterial = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const consoleCoba = ()=>{
        console.log(initialValue,"initial")
        console.log(selectedTeamCoordinator,"initial")
    }

    function btnCancel(){
        navigateTo("/mm/sitelistdr");
    }

    useEffect(() => {
        getIdentity();
        console.log('wpid:',wpid,"ordertype:",orderTypeId)
        getSiteInfo();
        getInventoryDDL();
        getRequestBaseDDL();
        getSiteLocationDDL();
        getOriginDDL();
        getDestination();
        getPacketType();
        getSubcon();
        getSiteCondition();
        getTeamCoordinator()
        getHasExpressDelivery()
        getCTNameDDL(selectedINVCode);
        getDeliveryDateDDL()
    },[wpid,orderTypeId,selectedINVCode])

    const CardTitle = (title) => (
        <Title level={5}>
            {title}
        </Title>
    )
    const False = false
    const [form] = Form.useForm();


    const handleSubcon = (e)=>{
        setSelectedSubcon(e)
        getTeamCoordinator(e)
        setSelectedTeamCoordinator('')
        console.log(selectedTeamCoordinator);
    }
    const handleWHTeamChange = (e)=>{
        console.log(e,"selected WH Team");
        setSelectedSubcon(e)
        getDDLWHSPV(e)
    }

    return (
        <div>
            <HeaderChanger title="SDR Form"/>
            <Row>
                <Col span={24}>
                    <div className="card card-primary">
                        <div className="card-header align-middle">
                            <h3 className="card-title">Site Info</h3>
                        </div>
                        <div className="card-body">
                            <Table columns={columns} scroll={{ x: '100%' }} pagination={false} dataSource={siteInfo} />
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <Card hoverable title={CardTitle("Order Detail")}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Form
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 18 }}
                                layout="horizontal"
                                initialValues={{
                                    'isExpressDelivery':false,
                                    'ctName':1,
                                    'invName':1,
                                    "site":1,
                                    "packetType":1,
                                    "proposeDelivery":2,
                                    'deliveryDates': moment(date2, "YYYY-MM-DD").add(2,'d')
                                }}
                                fields={[
                                    {
                                        name: ["siteAddress"],
                                        value: siteAddress,
                                    },
                                ]}
                                onFinish={btnConfirm}
                                onFinishFailed={onFinishFailedAddMaterial}
                            >
                                <Form.Item label="Order Type">
                                    <Input disabled value="SDR" />
                                </Form.Item>
                                <Form.Item name="invName" label="Inventory Code"
                                   
                                    rules={[{ required: true, message: 'Please Select Inventory Code!' }]}
                                >
                                    <Select 
                                        onChange={(e) => handleInvDDLChange(e)}
                                    >
                                        {
                                            ddlInventoryCode.map(inv =>  <Select.Option  value={inv.invCodeId}> 
                                                {inv.invCode}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Request Base" 
                                    name="requestBase"
                                    rules={[{ required: true, message: 'Please Select Request Base!' }]}
                                >
                                    <Select
                                        onChange={(e) => setSelectedRequestBase(e)} 
                                        placeholder="Select an option">
                                        {
                                            ddlRequestBase.map(rbs =>  <Select.Option value={rbs.requestTypeId}> 
                                                {rbs.requestTypeName}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Site A/NE - Site B/FE" name="site"
                                    rules={[{ required: true, message: 'Please Select Site Condition!' }]}
                                >
                                    <Select
                                        onChange={(e) => setSelectedSiteLocation(e)}  
                                        placeholder="Select an option">
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
                                                onChange={(e) => setSelectedCTName(e)} 
                                                placeholder="Select an option">
                                                {
                                                    ddlCTName.map(slc =>  <Select.Option value={slc.ctId}> 
                                                        {slc.ctName}</Select.Option>)
                                                }
                                            </Select>
                                    }
                                </Form.Item>
                                <Form.Item label="Site Condition" name="siteCondition"
                                    rules={[{ required: true, message: 'Please Select Site Condition!' }]}
                                >
                                
                                    <Select
                                        onChange={(e) => setSelectedSiteCondition(e)}  
                                        placeholder="Select an option">
                                        {
                                            ddlSiteCondition.map(slc =>  <Select.Option value={slc.siteConditionId}> 
                                                {slc.condition}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Origin" name="origin"
                                    rules={[{ required: true, message: 'Please Select Origin!' }]}
                                >
                                    <Select 
                                        onChange={(e) => setSelectedOrigin(e)} 
                                        placeholder="Select an option">
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
                                <Form.Item label="Express Delivery" valuePropName="checked" name="isExpressDelivery">  
                                    {express ? (<Checkbox onChange={(e)=>togleCheckbox(e.target.checked)}/>):(
                                        <Tooltip color='#f50' title="Cannot request Express Delivery"><Checkbox disabled  onChange={(e)=>togleCheckbox(e.target.checked)}/></Tooltip>
                                    )}
                                </Form.Item>
                                
                                <Form.Item label="Packet Type" name="packetType"
                                    rules={[{ required: true, message: 'Please Select Packet Type!' }]}
                                >
                                    <Select 
                                        onChange={(e) => setSelectedPacketType(e)} 
                                        placeholder="Select an option"
                                        name="packetType"
                                    >
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
                                            ddlIDeliveryDate.map(dst =>  <Select.Option value={dst.deliveryModeId}> 
                                                {dst.deliveryMode}</Select.Option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Delivery Date" 
                                    name="deliveryDates"
                                    rules={[{ required: true, message: 'Please Select Delivery Date' }]}>
                                    {checked ? (<DatePicker 
                                        format="YYYY-MM-DD"
                                        disabledDate={disabledDateExpressTrue}
                                        onChange={(e) => setDeliveryDate(moment(e).format("YYYY-MM-DD"))} 
                                        // disabledDate={current && current < moment().endOf('day')}
                                        // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                    />):(<DatePicker 
                                        format="YYYY-MM-DD"
                                        disabledDate={disabledDate}
                                        onChange={(e) => setDeliveryDate(moment(e).format("YYYY-MM-DD"))} 
                                        // disabledDate={current && current < moment().endOf('day')}
                                        // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                    />)}
                                   
                                </Form.Item>
                                <Form.Item label="Site Address"
                                    name="siteAddress"
                                    rules={[{ required: true, message: 'Please input Site Adress Field!' }]}
                                >
                                    <Input.TextArea 
                                        onChange={(e) => setSiteAddress(e.target.value)}  
                                    />
                                </Form.Item>
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

export default SdrForm;
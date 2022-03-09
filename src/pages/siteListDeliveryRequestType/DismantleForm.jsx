/* eslint-disable react/no-unstable-nested-components */
import React, {Component,useState,useEffect} from 'react';
import {  Row, Col,Card, Typography, Input, Space } from 'antd';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {useDispatch, useSelector} from 'react-redux';
import API  from '../../utils/apiServices';

const DismantleForm = (props) => {
    const customURL = window.location.href;
    const params = new URLSearchParams(customURL.split('?')[1])
    const { Title } = Typography;
    const wpid = params.get('wpid');
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
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    
    const user = useSelector((state) => state.auth.user);

    const getSiteInfo = () => {
        API.getSiteInfo(wpid).then(
            result=>{
                setCpoNo(result.poDetail.cpoNo);
                setGeneralScope(result.scopeDetail.scopeName);
                setSiteID(result.siteNo);
                setSiteName(result.siteName);
                setPackageName(result.packageName);
                setPackageStatus(result.packageStatus);
                setSOWIPM(result.packageName);
                setWBS(result.packageName);
                setProjectContract(result.packageName);
                setRegion(result.region);
                
            }
        )
    }

    useEffect(() => {
        console.log("wpid qs:",wpid);
        getSiteInfo();
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
                <Col span={11}>
                    <Card hoverable title={CardTitle("Site Info")}>
                        <Space direction="vertical">
                            <Input disabled addonBefore="PO NO/ RO No" value={cpoNo} />
                            <Input disabled addonBefore="General Scope" value={generalScope} />
                            <Input disabled addonBefore="Site ID" value={siteID} />
                            <Input disabled addonBefore="Site Name" value={siteName} />
                            <Input disabled addonBefore="WorkpackageID" value={wpid} />
                            <Input disabled addonBefore="Package Name" value={packageName} />
                            <Input disabled addonBefore="Project Contract" value={projectContract} />
                            <Input disabled addonBefore="Region" value={region} />
                        </Space>
                    </Card>
                </Col>
                <Col span={2}>
                </Col>
                <Col span={11}>
                    <Card hoverable title={CardTitle("Order Detail")}>
                        <Col span={24}>
                            <Space direction="vertical">
                                <Col span={24}>
                                    <Input addonBefore={
                                        <Row>
                                            <Col span={12}>Order Type</Col>
                                        </Row>
                                    } disabled value="PMR"/>
                                </Col>
                                <Divider light />
                                <Row>
                                    <Col span={6}>Requestor</Col>
                                    <Col span={1}>:</Col>
                                    <Col span={12}><p> {user.name}</p></Col>
                                </Row>
                                <Row>
                                    <Col span={6}>Request Date</Col>
                                    <Col span={1}>:</Col>
                                    <Col span={12}><p> {date}</p></Col>
                                </Row>
                                <Row>
                                    <Col span={6}>Phone Number</Col>
                                    <Col span={1}>:</Col>
                                    <Col span={12}><p> {user.name}</p></Col>
                                </Row>
                            </Space>
                        </Col>
                    </Card>
                </Col>
            </Row>
        </div>
    );

}

export default DismantleForm;
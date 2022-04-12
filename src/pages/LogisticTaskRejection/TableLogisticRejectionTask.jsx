/* eslint-disable react/jsx-no-bind */
import React,{useState,useEffect} from 'react'
import {Statistic,Table,Slider,Modal,Space,Col,Typography,Row,Spin,Tooltip,Button, Tabs,Card} from "antd"
import API from '@app/utils/apiServices'
import Search from '@app/components/searchcolumn/SearchColumn'
import moment from "moment"
import { EditOutlined,DeleteFilled,EyeFilled   } from '@ant-design/icons'
import { toast } from 'react-toastify'

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getOdi,getOdiLogistik,getDataSiteInfoLogistik } from '@app/store/action/logistikFormAction'

export default function TableLogisticRejectionTask() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [sliderVal,setSliderVal] = useState(0)
    const [dataLogisticReject,setDataLogisticReject] = useState([])
    const page = 1

    const userId = useSelector(state=>state.auth.user.uid)
    const { Countdown } = Statistic;
    
    function getLogisticRejectionList() {
        setIsLoading(true);
        API.getLogisticRejectionList(userId).then(
            result=>{
                setDataLogisticReject(result);
                setIsLoading(false);
                console.log("data Logistic Reject =>",result);
            }
        )
    }

    const navigateTo = (logisticOrderDetailId,odi) => {
        dispatch(getOdi(odi))
        dispatch(getOdiLogistik(logisticOrderDetailId))
        dispatch(getDataSiteInfoLogistik())
        history.push(`logisticformreject?ordlid=${logisticOrderDetailId}&odi=${odi}`
        )
    }

    
    function onFinish() {
        console.log('finished!');
        
    }
  
    function onChangeHandler(val) {
        console.log(val/1000)
        
        setSliderVal(val)
        if(val<=100){
            getLogisticRejectionList();
        }
    }
    function onChangeSlider(value) {
        console.log(value,"slider")
        
    }
    
    useEffect(() => {
        getLogisticRejectionList();
    },[])

    const columns = [
        {
            title:'No',
            key:"index",
            width:60,
            render:(value, item, index) => (page )  + index
        },
        {
            title:'Request No',
            dataIndex:'requestNo',
            width:200,
            ...Search('requestNo'),
        },
        {
            title:'Order Type',
            dataIndex:'orderType',
            ...Search('orderType'),
        },
        {
            title:'Origin',
            dataIndex:'originName',
            ...Search('originName'),
        },
        {
            title:'Destination',
            dataIndex:'destinationName',
            ...Search('destinationName'),
        },
        {
            title:'Delivery Mode',
            dataIndex:'deliveryMode',
            ...Search('deliveryMode'),
        },
        {
            title:'Delivery Type',
            dataIndex:'deliveryType',
            ...Search('deliveryDate'),
        },
        {
            title:'Reason of Rejection',
            dataIndex:'reasonOfRejection',
            ...Search('reasonOfRejection'),
        },
        {
            title:'Transport Rejected By',
            dataIndex:'transportRejectedBy',
            ...Search('transportRejectedBy'),
        },
        {
            title:'Work Package Id',
            dataIndex:'workpackageid',
            ...Search('orderType'),
        },
        {
            title:'Site No',
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
 
        {
            title:'Site Name',
            dataIndex:'siteName',
            width:180,
        
            ...Search('siteName'),
        },
        {
            title:'Region',
            dataIndex:'region',
            ...Search('region'),
        },
        {
            title:'Scope Name',
            dataIndex:'scopeName',
            ...Search('scopeName'),
        },
        {
            title:'Scope Detail',
            dataIndex:'scopeDetail',
            ...Search('scopeDetail'),
        },
   
    
        {
            title:'Incoming Date',
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.incomingDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                    </Space>
                )
            },
            ...Search('deliveryDate'),
        },
        {
            title:'Action',
            fixed:'right',
            width: 70,
            render:(record)=>{
                return <EditOutlined style={{fontSize:16}} onClick={()=>navigateTo(record.logisticOrderDetailId,record.orderDetailId)}/>
            }
        },
    ]
 


    return (
        <div>
            { isLoading ?   
                <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  
                :
                <>
                    <Row>
                        <Col span={12} hidden>
                            <Countdown value={Date.now() + 10 * 10000} onChange={onChangeHandler} onFinish={onFinish} format="s"/>
                        </Col>
                        <Col span={5}>
                            <p>data will be refreshed at : </p>
                        </Col>
                        <Col span={19}>
                            <Slider min={0} max={100000} value={sliderVal} onChange={onChangeSlider}/>
                        </Col>

                    </Row>
                    <Table
                        scroll={{ x: '200%' }}

                        // expandable={{ expandedRowRender }}
                        columns={columns}
                        dataSource={dataLogisticReject}
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                            showSizeChanger: true,
                            position: ["bottomLeft"],
                        }}
                        bordered /></>}
         
        </div>
    )
}

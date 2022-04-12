/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
import React,{useEffect,useState} from 'react'
import API from '@app/utils/apiServices'
import { useSelector } from 'react-redux';

import {Table ,Statistic,Slider,Space,Row,Col,Spin,Tooltip} from "antd"
import moment from "moment"
import Search from '@app/components/searchcolumn/SearchColumn';
import { EditFilled  } from '@ant-design/icons'

import { useHistory } from 'react-router-dom';

export default function TableDismantlePending() {
    const history = useHistory()
    const [dataDismatleAct,setDtaDismantleAct] = useState([])
    const [sliderVal,setSliderVal] = useState(0)
    const { Countdown } = Statistic;
    const [isLoading, setIsLoading] = useState(false);

    const userId = useSelector(state=>state.auth.user.uid)

    function getDataDismantleActPending() {
        setIsLoading(true);
        API.getDismantleActPending(userId).then(
            result=>{
                setDtaDismantleAct(result);
                setIsLoading(false);
                console.log("data Dismantle Act =>",result);
            }
        )
    }

    function onFinish() {
        console.log('finished!');
        
    }
  
    function onChangeHandler(val) {
        console.log(val/1000)
        
        setSliderVal(val)
        if(val<=100){
            getDataDismantleActPending()
        }
    }
    function onChangeSlider(value) {
        console.log(value,"slider")
        
    }

    const handleNavigate = (data) => {
        history.push(`/task/ackdismantleform?odi=${data.orderDetailId}&tdg=${data.transDelegateId}&pg=pending&rbid=${data.requestedById}`)
        console.log(data,"navigate tp")
    
    }

    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {
            title : "CPO No",
            dataIndex:'cpoNo',
            ...Search('cpoNo'),
        },
        {
            title : "Project Name",
            dataIndex:'projectName',
            ...Search('projectName'),
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {
            title : "Site Name",
            dataIndex:'siteName',
      
            ...Search('siteName'),
        },
        {
            title : "Workpackage ID",
            dataIndex:'workpackageId',
            ...Search('workpackageId'),
        },
        {
            title : "Region",
            dataIndex:'region',
            ...Search('region'),
        },
        {
            title : "Zone",
            dataIndex:'zone',
            ...Search('zone'),
        },
        {
            title : "Site Address",
            dataIndex:'siteAddress',
            ...Search('siteAddress'),
        },
        {
            title : "Requested By",
            dataIndex:'requestedBy',
            width:150,
            ...Search('requestedBy'),
        },
        {
            title : "Request Date",
            render:(record)=>{
                return (
                    <div>
                        {record.requestDate !== null ? (<> <Space>
                            <p>{moment(record.requestDate).format("YYYY-MM-DD hh:mm:ss")}</p>
                        </Space></>):(<>
                        </>)}
                    </div>
                   
                   
                )
            },
            ...Search('requestDate'),
        },
    
        {
            title:"Action",
           
            align:'center',
            fixed:'right',
            width:90,
            render:(record)=>{
                return (
                    <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                        <Space size={20}>
                            <Tooltip title="">
                                <EditFilled style={{fontSize:20}} onClick = {()=>handleNavigate(record)}/>
                            </Tooltip>
                            

                        </Space>
                       
                    </div>
                )
            },
        }
    ]




    useEffect(() => {
        getDataDismantleActPending();
      
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
                <><Row hidden>
                    <Col span={12} hidden>
                        <Countdown value={Date.now() + 10 * 10000} onChange={onChangeHandler} onFinish={onFinish} format="s" />
                    </Col>
                    <Col span={5}>
                        <p>data will be refreshed at: </p>
                    </Col>
                    <Col span={19}>
                        <Slider min={0} max={100000} value={sliderVal} onChange={onChangeSlider} />
                    </Col>

                </Row><Table
                    scroll={{ x: '150%' }}
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
                    // expandable={{ expandedRowRender }}
                    columns={columns}
                    dataSource={dataDismatleAct}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>}
        </div>
    )
}

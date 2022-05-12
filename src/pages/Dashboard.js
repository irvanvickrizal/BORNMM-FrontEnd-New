/* eslint-disable prefer-template */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
import React,{useEffect, useState} from 'react';
import SmallBox from '../components/small-box/SmallBox';
import Chart from 'chart.js/auto';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import {Bar,Line,Pie} from "react-chartjs-2"
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
    message,
    Tooltip,
    Tabs,
    List } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import API from '@app/utils/apiServices';
import { useSelector } from 'react-redux';
import SquareIcon from '@mui/icons-material/Square';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);


const Dashboard = () => {
    const [dataGraphNotComplete,setDataGraphNotComplete] = useState([])
    const [dataGraphComplete,setDataGraphComplete] = useState([])
    const [labelPie,setLabelPie] = useState([])
    const [dataValuePie,setValueDataPie] = useState([])
    const uid = useSelector(state=>state.auth.user.uid)
    const { TabPane } = Tabs;

    //variable for chart
    const hoDone = []
    const rfpDone = []
    const logisticRevDone= []
    const projectName = []
    const orderReq = []
    const totalSite = []

    function getGraphNotCompleteYet() {
        // setIsLoading(true);
        API.getGraphNotCompleteYet(uid).then(
            result=>{
                setDataGraphNotComplete(result);
                setLabelPie(Object.keys(result[0]))
                setValueDataPie(Object.values(result[0]))
                console.log("Graph Not Complete =>",result);
            }
        )
    }

    function getGraphComplete() {
        // setIsLoading(true);
        API.getGraphComplete(uid).then(
            result=>{
              
                setDataGraphComplete(result);
           
                console.log("Graph Complete =>",result);
                console.log("Graph Complete ho=>",hoDone);
                // console.log("Graph Complete =>",logisticRevDone);
                // console.log("Graph Complete =>",rfpDone);
                // console.log("Graph Complete projectName=>",projectName);
                // console.log("Graph Complete =>",hoDone);
            }
        )
    }

    const dataAgenda = [
        'PMR Pending',
        'LTR Pending',
        'SDR Pending',
        'Order Rejection',
        'Task Pending',
    ];

    const colorHex = ['#d93a23','#1960db','#41c358',"#eba111"]
    const data = {
        // labels:["LTR","SDR","PMR","ORDER REJECTION"],
        labels:dataGraphComplete.map(x => x.project_name),
        datasets: [
            {
                label: "HO Done",
                backgroundColor: "#41c358",
                data: dataGraphComplete.map(x=>x.LSP_HODone)
            },
            {
                label: "RFP Done",
                backgroundColor: "#0ed7dd",
                data: dataGraphComplete.map(x=>x.LSP_RFPDone)
            },
            {
                label: "Logistic Rev Done",
                backgroundColor: "#acf890",
                data: dataGraphComplete.map(x=>x.logistic_RevDone)
            },
            {
                label: "Order Request",
                backgroundColor: "#db30d2",
                data: dataGraphComplete.map(x=>x.RO_OrderReq)
            },
            {
                label: "Total Sites",
                backgroundColor: "#1960db",
                data: dataGraphComplete.map(x=>x.totalSites)
            },
       
        ]
    
      
        // datasets:[{
        //     data:[20,48,10,22],
        //     backgroundColor: colorHex,
        //     display:true,
        //     datalabels: {
        //         color: '#FFCE56'
        //     }
        // }]
    };
    const dataNotComplete = {
        labels:labelPie,
        // labels:dataGraphComplete.map(x => x.project_name),
      
    
      
        datasets:[{
        
            data:dataValuePie,
            backgroundColor: colorHex,
            display:true,
            datalabels: {
                color: '#FFCE56'
            }
        }]
    };


    useEffect(() => {
        getGraphNotCompleteYet()
        getGraphComplete()
        console.log("data dashboard")
        for (const dataObj of dataGraphComplete){
            hoDone.push(parseInt(dataObj.HODone))
            rfpDone.push(parseInt(dataObj.RFPDone))
            logisticRevDone.push(parseInt(dataObj.logisticRevDone))
            orderReq.push(parseInt(dataObj.orderReq))
            projectName.push(dataObj.project_name)
            totalSite.push(parseInt(dataObj.totalSites))
        }
        console.log(dataGraphNotComplete.LSP_HOPending,"tes")
        
    },[])
 



    return (
        <>
            <HeaderChanger title="Dashboard"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={0}
                            title="SDR Done"
                            type="info"
                            icon="fas fa-list"
                            navigateTo="/" />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={0}
                            title="LTR Done"
                            type="success"
                            icon="fas fa-list"
                            navigateTo="/" />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={0}
                            title="PMR Done"
                            type="warning"
                            icon="fas fa-list"
                            navigateTo="/" />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={0}
                            title="Order Rejection"
                            type="danger"
                            icon="fas fa-list"
                            navigateTo="/" />
                    </div>
                </div>

            </div>
            <div className="container-fluid">
                <div className='row'>
                    <div className='col-lg-12 col-md-12'>
                        <div className='card card-primary'>
                            <div className='card-header align-middle'>
                                <h3 className="card-title">Forward Logistic Summary</h3>
                            </div>
                            <Card>
                       
                    
                                <Row gutter={24}>
                              
                                    <Col className="gutter-row" span={12}>
                                        <Card hoverable>
                                            <Space size={16} direction="vertical" style={{width:'100%'}}>
                                                <Bar
                                                    data = {data}
                                                    height="236"
                                                    options={{
                                                        responsive:true,
                                                        aspectRatio:1.63,
                                                        plugins: {
                                                            // legend: {
                                                            //     position: 'bottom',
                                                            // },
                                                        
                                                            legend: {
                                                     
                                                                position: 'bottom',
                                                            },
                                                            title: {
                                                                display: true,
                                                                text: 'Order Request Progress Summary (Forward Logistic)'
                                                            },
                                                            datalabels: {
                                                                // display: false,
                                                                color: "#black",
                                                                font: {
                                                                    size: 12,
                                                                    weight: "500",
                                                                    color:"#000"
                                                                }
                                                            },
                                                            animation: {
                                                                animateScale: true,
                                                                animateRotate: true
                                                            },
                                                    
                                                    
                                                           
                                   
                                                        }}}
                                            
                           
                                                >

                                                </Bar>
                                                <Card hoverable>
                                                    {dataGraphComplete?.map(e=>{
                                                        return(
                                                            <Row>
                                                                <Col className="gutter-row" span={9}>
                                                                    <Typography style={{fontWeight:'500'}}>{e.project_name} </Typography>
                                                                </Col>
                                                                <Col className="gutter-row" span={3}>
                                                                    <Tooltip title="HO Done">
                                                                        <Typography style={{fontSize:16,fontWeight:"500"}}><SquareRoundedIcon style={{color:"#41c358"}}/>     {e.LSP_HODone}</Typography>
                                                                    </Tooltip>
                                                        
                                                                </Col>
                                                                <Col className="gutter-row" span={3}>
                                                                    <Tooltip title="RFP Done">
                                                                        <Typography style={{fontSize:16,fontWeight:"500"}}><SquareRoundedIcon style={{color:"#0ed7dd"}}/>       {e.LSP_RFPDone}</Typography>
                                                                    </Tooltip>
                                                     
                                                                </Col>
                                                                <Col className="gutter-row" span={3}>
                                                                    <Tooltip title="Logistic Rev Done">
                                                                        <Typography style={{fontSize:16,fontWeight:"500"}}><SquareRoundedIcon style={{color:"#acf890"}}/>       {e.logistic_RevDone}</Typography>
                                                                    </Tooltip>
                                                     
                                                                </Col>
                                                                <Col className="gutter-row" span={3}>
                                                                    <Tooltip title="Order Req">
                                                                        <Typography style={{fontSize:16,fontWeight:"500"}}><SquareRoundedIcon style={{color:"#db30d2"}}/>        {e.RO_OrderReq}</Typography>
                                                                    </Tooltip>
                                                     
                                                                </Col>
                                                   
                                                                <Col className="gutter-row" span={3}>
                                                                    <Tooltip title="Order Req">
                                                                        <Typography style={{fontSize:16,fontWeight:"500"}}><SquareRoundedIcon style={{color:"#1960db"}}/>        {e.totalSites}</Typography>
                                                                    </Tooltip>
                                                     
                                                                </Col>
                                                   
                                                    
                                                            </Row>
                                              
                                                        )
                                                    })}
                                                </Card>
                                            </Space>
                           
                                    
                                        
                                    
                                        </Card>
                                    </Col>
                                    
                               
                                    <Col className="gutter-row" span={12}>
                                        <Card hoverable>
                           
                                            <Pie
                                                data = {dataNotComplete}
                                                width="596" height="456"
                                               
                                                options={{
                                                    responsive: true,
                                                    aspectRatio:1.5,
                                                    cutoutPercentage: 75,
                                                    plugins: {
                                                    
                                                        legend: {
                                                            position: 'bottom',
                                                            padding:2
                                                        },
                          
                                                        title: {
                                                            display: true,
                                                            text: 'Task Not Complete Yet',
                                                          
                                                        },
                                                 
                                                 
                                                        datalabels: {
                                                            // display: false,
                                                            color: "black",
                                                            font: {
                                                                size: 14,
                                                                weight: "500",
                                                                color:"#000"
                                                            },
                                                            anchor: 'end',
                                                            align: 'end',
                                                            offset: 8,
                                                            display: function(context) {
                                                                return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
                                                             },
                                                             formatter: function(value,ctx) {
                                                                return `${ctx.chart.data.labels[ctx.dataIndex]}:${value}`;
                                                             
                                                              }
                                                          
                                                        },
                                                        
                                                        animation: {
                                                            animateScale: true,
                                                            animateRotate: true
                                                        },
                                                             
                                                        
                      
             
                                                    }}}
                                               
     
                                            >

                                            </Pie>
                                            <Card hoverable>
                                                {dataGraphNotComplete?.map(e=>{
                                                    return(
                                                  
                                                        <><Row>
                                                            <Col className="gutter-row" span={12}>
                                                              
                                                                <Typography style={{ fontSize: 16, fontWeight: "500" }}><SquareRoundedIcon style={{ color: "#d93a23" }} />RO Order Req: {e.LSP_HOPending}</Typography>
                                                             

                                                            </Col>
                                                            <Col className="Logistic Rev Pending" span={12}>
                                                         
                                                                <Typography style={{ fontSize: 16, fontWeight: "500" }}><SquareRoundedIcon style={{ color: "#1960db" }} /> Logistic Rev Pending: {e.Logistic_RevPending}</Typography>
                                                        

                                                            </Col>
                                                        </Row><Row>
                                                            <Col className="gutter-row" span={12}>
                                                              
                                                                <Typography style={{ fontSize: 16, fontWeight: "500" }}><SquareRoundedIcon style={{ color: "#41c358" }} />LSP RFP Pending: {e.LSP_RFPPending}</Typography>
                                                          

                                                            </Col>
                                                            <Col className="LSP HO Pending" span={12}>
                                                             
                                                                <Typography style={{ fontSize: 16, fontWeight: "500" }}><SquareRoundedIcon style={{ color: "#eba111" }} />LSP HO Pending: {e.RO_OrderReq}</Typography>
                                                             

                                                            </Col>

                                                        </Row></>
                                                     
                                                         
                                                   
                                                    
                                                   
                                              
                                                    )
                                                })}
                                            </Card>
                                        </Card>
              
                                    </Col>
                           
                              
                                  
                                 
                             
                              
                                </Row> 
                            </Card>

                       
         
                           
                        </div>
                    </div>
                 
                    <div className='col-lg-6 col-md-6'>
                        <div className='card card-primary'>
                            <div className='card-header align-middle'>
                                <h3 className="card-title">My Agenda</h3>
                            </div>
                            <div className="card-body">
                                <List
                                    
                                    footer={<div></div>}
                                    bordered
                                    dataSource={dataAgenda}
                                    renderItem={item => (
                                        <List.Item>
                                            <Button ghost type="text"><FormOutlined /> {item} </Button>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
};

export default Dashboard;

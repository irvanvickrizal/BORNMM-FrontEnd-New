/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
import React,{useEffect, useState} from 'react';
import SmallBox from '../components/small-box/SmallBox';
import Chart from 'chart.js/auto';
import HeaderChanger from '@app/components/cardheader/HeaderChanger';
import {Bar,Line,Pie,Doughnut} from "react-chartjs-2"
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

import Search from '@app/components/searchcolumn/SearchColumn';
import CreateDataGraphNotComplete from "./DashboardDataGenerator"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


Chart.register(ChartDataLabels);


const Dashboard = () => {
    const [dataGraphNotCompleteRfp,setDataGraphNotCompleteRfp] = useState([])
    const [dataGraphNotCompleteHo,setDataGraphNotCompleteHo] = useState([])
    const [dataGraphNotCompleteLogistic,setDataGraphNotCompleteLogistic] = useState([])
    const [dataGraphNotCompleteOrderReq,setDataGraphNotCompleteOrderReq] = useState([])
    const [dataGraphComplete,setDataGraphComplete] = useState([])
    const [dataSummary,setDataSummary] = useState([])
    const [labelPieHo,setLabelPieHo] = useState([])
    const [dataValuePieHo,setValueDataPieHo] = useState([])
    const [labelPieRfp,setLabelPieRfp] = useState([])
    const [dataValuePieRfp,setValueDataPieRfp] = useState([])
    const [labelPieLogistic,setLabelPieLogistic] = useState([])
    const [dataValuePieLogistic,setValueDataPieLogistic] = useState([])
    const [labelPiePmApproval,setLabelPiePmApproval] = useState([])
    const [dataValuePiePmApproval,setValueDataPiePmApproval] = useState([])
    const [labelPieOrderReq,setLabelPieOrderReq] = useState([])
    const [dataValuePieOrderReq,setValueDataPieOrderReq] = useState([])
    const uid = useSelector(state=>state.auth.user.uid)
    const { TabPane } = Tabs;
    const {Title} = Typography

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
                console.log(result,"complete result")
                // setDataGraphNotComplete(result);
                // setLabelPie(Object.keys(result[0]))
                // setValueDataPie(Object.values(result[0]))
               
                const dataHo = result.map((rs)=>CreateDataGraphNotComplete.dataGraphNotCompleteHo(
                    rs.LSP_HOPending,
                    rs.LSP_TotalHOPending - rs.LSP_HOPending,
                 
                )) 
                const dataRfp = result.map((rs)=>CreateDataGraphNotComplete.dataGraphNotCompleteRfp(
                    rs.LSP_RFPPending,
                    rs.LSP_TotalRFPPending  -   rs.LSP_RFPPending

                )) 
                const dataLogistic = result.map((rs)=>CreateDataGraphNotComplete.dataGraphNotCompleteLogistic(
                    rs.Logistic_RevPending,
                    rs.RO_OrderReq -  rs.Logistic_RevPending
                )) 
                const dataPmApproval = result.map((rs)=>CreateDataGraphNotComplete.dataGraphNotCompletePmApproval(
                    rs.PM_RevPending,
                    rs.Total_OrderReq
                )) 
            
                setDataGraphNotCompleteHo(dataHo);
                setLabelPieHo(Object.keys(dataHo[0]))
                setValueDataPieHo(Object.values(dataHo[0]))
                setLabelPiePmApproval(Object.keys(dataPmApproval[0]))
                setValueDataPiePmApproval(Object.values(dataPmApproval[0]))
                setLabelPieRfp(Object.keys(dataRfp[0]))
                setValueDataPieRfp(Object.values(dataRfp[0]))
                setLabelPieLogistic(Object.keys(dataLogistic[0]))
                setValueDataPieLogistic(Object.values(dataLogistic[0]))
                  
                //   setDataGraphNotCompleteLogistic(dataLogistic)
                //   setDataGraphNotCompleteLogistic(dataOrderReq)
             
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

    const columns = [
        {
            width:70,
            title : "Project",
            dataIndex:'project_name',
            ...Search('project_name'),
        },
        {
            width:70,
            title : "Total Sites",
            dataIndex:'totalSites',
            ...Search('totalSites'),
        },
        {
            width:70,
            title : "Order Req",
            dataIndex:'RO_OrderReq',
            ...Search('RO_OrderReq'),
        },
        {
            width:70,
            title : "Logistic-RevDone",
            dataIndex:'logistic_RevDone',
            ...Search('logistic_RevDone'),
        },
        {
            width:70,
            title : "LSP-RFPDone",
            dataIndex:'LSP_RFPDone',
            ...Search('RFPDone'),
        },
        {
            width:70,
            title : "LSPHODone",
            dataIndex:'LSP_HODone',
            ...Search('LSP_HODone'),
        },
    ]
    const columnsPie = [
        {
            width:70,
            title : "RO-OrderReq",
            dataIndex:'RO-OrderReq',
            ...Search('RO-OrderReq'),
        },
        {
            width:70,
            title : "Logistic-RevPending",
            dataIndex:'logistic-RevPending',
            ...Search('logistic-RevPending'),
        },
        {
            width:70,
            title : "LSP-RFPPending",
            dataIndex:'LSP-RFPPending',
            ...Search('LSP-RFPPending'),
        },
        {
            width:70,
            title : "LSP-HOPending",
            dataIndex:'LSP-HOPending',
            ...Search('LSP-HOPending'),
        },
    ]

    const getSummary=(userid)=>{
        API.getSummary(uid).then(
            result=>{
                setDataSummary(result)
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
                label: "Total Sites",
                backgroundColor: "#1960db",
                data: dataGraphComplete.map(x=>x.totalSites)
            },
            {
                label: "Order Request",
                backgroundColor: "#ea8a0b",
                data: dataGraphComplete.map(x=>x.RO_OrderReq)
            },
            {
                label: "Logistic Rev Done",
                backgroundColor: "#acf890",
                data: dataGraphComplete.map(x=>x.logistic_RevDone)
            },
            {
                label: "RFP Done",
                backgroundColor: "#0ed7dd",
                data: dataGraphComplete.map(x=>x.LSP_RFPDone)
            },
            {
                label: "HO Done",
                backgroundColor: "#41c358",
                data: dataGraphComplete.map(x=>x.LSP_HODone)
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
        labels:labelPieHo,
        // labels:dataGraphComplete.map(x => x.project_name),
      
    
      
        datasets:[{
        
            data:dataValuePieHo,
            backgroundColor: colorHex,
            display:true,
            datalabels: {
                color: '#black'
            }
        }]
    };
    const dataNotCompleteRfp = {
        labels:labelPieRfp,
        // labels:dataGraphComplete.map(x => x.project_name),
      
    
      
        datasets:[{
        
            data:dataValuePieRfp,
            backgroundColor: colorHex,
            display:true,
            datalabels: {
                color: '#black'
            }
        }]
    };
    const dataNotCompleteLogistic = {
        labels:labelPieLogistic,
        // labels:dataGraphComplete.map(x => x.project_name),
      
    
      
        datasets:[{
        
            data:dataValuePieLogistic,
            backgroundColor: colorHex,
            display:true,
            datalabels: {
                color: '#black'
            }
        }]
    };
    const dataNotCompletePmApproval = {
        labels:labelPiePmApproval,
        // labels:dataGraphComplete.map(x => x.project_name),
      
    
      
        datasets:[{
        
            data:dataValuePiePmApproval,
            backgroundColor: colorHex,
            display:true,
            datalabels: {
                color: '#black'
            }
        }]
    };

    const CardTitle = (title) => <Title level={5}>{title}</Title>


    useEffect(() => {
        getGraphNotCompleteYet()
        getGraphComplete()
        getSummary(uid)
        console.log("data dashboard")
        for (const dataObj of dataGraphComplete){
            hoDone.push(parseInt(dataObj.HODone))
            rfpDone.push(parseInt(dataObj.RFPDone))
            logisticRevDone.push(parseInt(dataObj.logisticRevDone))
            orderReq.push(parseInt(dataObj.orderReq))
            projectName.push(dataObj.project_name)
            totalSite.push(parseInt(dataObj.totalSites))
        }
        // console.log(dataGraphNotComplete.LSP_HOPending,"tes")
        
    },[uid])
    
 



    return (
        <>
            <HeaderChanger title="Dashboard"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={dataSummary[0]?.totalSDRDone}
                            title="SDR Done"
                            type="info"
                            icon="ion-ios-list"
                            navigateTo="/" />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={dataSummary[0]?.totalLTRDone}
                            title="LTR Done"
                            type="success"
                            icon="ion-ios-list"
                            navigateTo="/" />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={dataSummary[0]?.totalPMRDone}
                            title="PMR Done"
                            type="warning"
                            icon="ion-ios-list"
                            navigateTo="/" />
                    </div>
                    <div className="col-lg-3 col-6">
                        <SmallBox
                            count={dataSummary[0]?.totalOrderRejection}
                            title="Order Rejection"
                            type="danger"
                            icon="ion-ios-list"
                            navigateTo="/" />
                    </div>
                </div>

            </div>
            <div className="container-fluid">
                <div className='row' >
                    <div className='col-lg-12 col-md-12' >
                        <div className='card card-primary' data-toggle="collapse" >
                            <div className='card-header align-middle'>
                                <h3 className="card-title">Forward Logistic Summary</h3>
                            </div>
                       
                       
                    
                       
                        
                            <Row gutter={24} style={{paddingLeft:26,marginTop:48,paddingBottom:12,paddingRight:26}}>
                              
                                <Col className="gutter-row"  xs={24} xl={0} align="middle">
                                    <Accordion defaultExpanded>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography style={{fontSize:16,fontWeight:"bold"}}>Order Request Progress Summary (Forward Logistic)</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                       
                                            <Table

                                                size="small"
                                                // expandable={{ expandedRowRender }}
                                                columns={columns}
                                                scroll={{ x: '100%' }} 
                                                dataSource={dataGraphComplete}
                                                // rowKey={record => record.vehicleId}
                                                // pagination={{
                                                //     pageSizeOptions: ['5', '10', '20', '30', '40'],
                                                //     showSizeChanger: true,
                                                //     position: ["bottomLeft"],
                                                // }}
                                                pagination={false}
                                                bordered />

                                       
                                        </AccordionDetails>
                                    </Accordion>
                                </Col>
                                  


                           
                                   

                                <Col className="gutter-row"  xs={0} xl={24} >
                                    <Accordion defaultExpanded>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography style={{fontSize:16,fontWeight:"bold"}}>Order Request Progress Summary (Forward Logistic)</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            
                                            <Space size={16} direction="vertical" style={{width:'100%'}}>
                                               
                                                <Row gutter={24} style={{paddingLeft:0,marginTop:48,paddingBottom:6,paddingRight:0}}>
                                                    <Col className="gutter-row"  xs={0} xl={24} align="middle">
                                         
                                        
                                           
                                                        <Bar
                                                            data = {data}
                                                            height="360"
                                                            width="900"
                                                            options={{
                                                                responsive:false,
                                                                aspectRatio:1.5,
                                                                x: {
                                                                    ticks: {
                                                                        font: {
                                                                            size: 11,
                                                                        }
                                                                    }
                                                                },
                             
                                        
                                                                plugins: {
                                   
                                         
                                                                    legend: {
                                            
                                                                        position: 'bottom',
                                                                    },
                                                                    title: {
                                                                        display: true,
                                          
                                                                    },
                                                                    datalabels: {
                                                                        display: false,
                                                                        color: "#black",
                                                                        font: {
                                                                            size: 10,
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
                                                    </Col>
                                                    <Col className="gutter-row" xs={0} xl={24}  >
                                                        <Card>
                                                            {dataGraphComplete?.map(e=>{
                                                                return(
                                                                    <Row>
                                    
                                     
                                                                        <Col className="gutter-row" xs={22} xl={9}>
                                                                            <Typography style={{fontWeight:'700',fontSize:12}}>{e.project_name} </Typography>
                                                                        </Col>
                                                                        <Col className="gutter-row" xs={4} xl={3}>
                                                                            <Tooltip title="Total Sites">
                                                                                <Typography style={{fontSize:12,fontWeight:"500"}}><SquareRoundedIcon style={{color:"#1960db",fontSize:18}}/>        {e.totalSites}</Typography>
                                                                            </Tooltip>
                                      
                                                                        </Col>
                                                                        <Col className="gutter-row" xs={4} xl={3}>
                                                                            <Tooltip title="Order Req">
                                                                                <Typography style={{fontSize:12,fontWeight:"500"}}><SquareRoundedIcon style={{color:"#ea8a0b",fontSize:18}}/>        {e.RO_OrderReq}</Typography>
                                                                            </Tooltip>
                                      
                                                                        </Col>
                                                                        <Col className="gutter-row" xs={4} xl={3}>
                                                                            <Tooltip title="Logistic Rev Done">
                                                                                <Typography style={{fontSize:12,fontWeight:"500"}}><SquareRoundedIcon style={{color:"#acf890",fontSize:18}}/>       {e.logistic_RevDone}</Typography>
                                                                            </Tooltip>
                                      
                                                                        </Col>
                                                                        <Col className="gutter-row" xs={4} xl={3}>
                                                                            <Tooltip title="RFP Done">
                                                                                <Typography style={{fontSize:12,fontWeight:"500"}}><SquareRoundedIcon style={{color:"#0ed7dd",fontSize:18}}/>       {e.LSP_RFPDone}</Typography>
                                                                            </Tooltip>
                                      
                                                                        </Col>
                                                                        <Col className="gutter-row" xs={4} xl={3}>
                                                                            <Tooltip title="HO Done">
                                                                                <Typography style={{fontSize:12,fontWeight:"500"}}><SquareRoundedIcon style={{color:"#41c358",fontSize:18}}/>     {e.LSP_HODone}</Typography>
                                                                            </Tooltip>
                                                                        </Col>
                                                                    </Row>
                               
                                                                )
                                                            })}
                                                        </Card>
                                                    </Col>
                                                </Row>
                                     
                                               
                                            </Space>
                                        </AccordionDetails>
                                    </Accordion>
                                </Col>
                              
                                   
                                 
                       
                            </Row> 

                            <Row gutter={24} style={{paddingLeft:26,paddingRight:26}}>
                         
                                <Col className="gutter-row" xs={24} xl={12} style={{marginBottom:18}}>
                                    <Accordion defaultExpanded>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography style={{fontSize:16,fontWeight:"bold"}}>Nokia Task</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Row style={{paddingLeft:34}} gutter={96}>
                                                <Col className="gutter-row" xs={24} xl={12}>
                                                    <Doughnut
                                                        data = {dataNotCompletePmApproval}
                                                        width="146" height="216"
                                                        weight={8}
                                                        options={{
                                                            responsive: false,
                                                            aspectRatio:1.5,
                                                            centertext:"112",
                                                            cutoutPercentage: 75,
                                                            cutout: 45,
                                                            plugins: {
                                                                legend: {
                                                                    display:false,
                                                                    position: 'bottom',
                                                                    padding:2
                                                                },
                                                 
                   
                                                                title: {
                                                                    display: true,
                                                                    text: 'PM Approval',
                                                   
                                                                },
                                          
                                          
                                                                datalabels: {
                                                                // display: false,
                                                                    color: '#ffffff',
                                                                    font: {
                                                                        size: 14,
                                                                        weight: "500",
                                                                        color:"#000"
                                                                    },
                                                               
                                                                    offset: 8,
                                                                    display: function(context) {
                                                                        return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
                                                                    },
                                                   
                                                   
                                                                },
                                                 
                                                                animation: {
                                                                    animateScale: true,
                                                                    animateRotate: true
                                                                },
                                                      
                                                 
               
      
                                                            }}}
                                        

                                                    >

                                                    </Doughnut>
                                                    <Row>
                                                        <Col className="gutter-row" span={3}>
                                                            <Tooltip>
                                                                <SquareRoundedIcon style={{color:"#d93a23",fontSize:20}}/>
                                                            </Tooltip>
                                                        </Col>
                                                        <Col className="gutter-row" span={14}>
                                                            <Typography style={{fontSize:12,paddingTop:4}}>PM Approval Pending</Typography>
                                                        </Col>
                                       
                                                    </Row>
                                                    <Row>
                                                        <Col className="gutter-row" span={3}>
                                                            <Tooltip>
                                                                <SquareRoundedIcon style={{color:"#1960db",fontSize:20}}/>
                                                            </Tooltip>
                                                        </Col>
                                                        <Col className="gutter-row" span={12}>
                                                            <Typography style={{fontSize:12,paddingTop:4}}>Total Order Req</Typography>
                                                        </Col>
                                         
                                
                                                    </Row>
                                

                                                </Col>

                                                <Col className="gutter-row" xs={24} xl={12}>
                                                    <Doughnut
                                                        data = {dataNotCompleteLogistic}    
                                                        width="146" height="216"
                                                        options={{
                                                            responsive: false,
                                                            aspectRatio:1.5,
                                                            centertext:"112",
                                                            cutoutPercentage: 75,
                                                            cutout: 45,
                                                            plugins: {
                                             
                                                                legend: {
                                                                    display:false,
                                                                    position: 'bottom',
                                                                    padding:2
                                                                },
                   
                                                                title: {
                                                                    display: true,
                                                                    text: 'Logistic Review',
                                                   
                                                                },
                                          
                                          
                                                                datalabels: {
                                                                // display: true,
                                                                    color: '#black',
                                                                    font: {
                                                                        size: 14,
                                                                        weight: "500",
                                                                        color:"#000"
                                                                    },
                                                    
                                                                    display: function(context) {
                                                                        return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
                                                                    },
                                                                    //  formatter: function(value,ctx) {
                                                                    //     return `${ctx.chart.data.labels[ctx.dataIndex]}:${value}`;
                                                      
                                                                    //   }
                                                   
                                                                },
                                                 
                                                                animation: {
                                                                    animateScale: true,
                                                                    animateRotate: true
                                                                },
                                                      
                                                 
                                                 
               
      
                                                            }}}
                                             
                                        

                                                    >

                                                    </Doughnut>
                                                    <Row>
                                                        <Col className="gutter-row" span={3}>
                                                            <Tooltip>
                                                                <SquareRoundedIcon style={{color:"#d93a23",fontSize:20}}/>
                                                            </Tooltip>
                                                        </Col>
                                                        <Col className="gutter-row" span={16}>
                                                            <Typography style={{fontSize:12,paddingTop:4}}>Logistic Rev Pending</Typography>
                                                        </Col>
                                         
                                
                                                    </Row>
                                                    <Row>
                                                        <Col className="gutter-row" span={3}>
                                                            <Tooltip>
                                                                <SquareRoundedIcon style={{color:"#1960db",fontSize:20}}/>
                                                            </Tooltip>
                                                        </Col>
                                                        <Col className="gutter-row" span={12}>
                                                            <Typography style={{fontSize:12,paddingTop:4}}>RO Order Request</Typography>
                                                        </Col>
                                       
                                                    </Row>
                                             
                                                </Col>
                                            </Row>
                                        </AccordionDetails>
                                    </Accordion>
                                    
                                </Col>
                                <Col className="gutter-row" xs={24} xl={12}>
                                    <Accordion defaultExpanded>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography style={{fontSize:16,fontWeight:"bold"}}>LSP Task</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Row style={{paddingLeft:34}} gutter={96}>
                                                <Col className="gutter-row" xs={24} xl={12}>
                                                    <Doughnut
                                                        data = {dataNotCompleteRfp}
                                                        width="146" height="216"
                                        
                                                        options={{
                                                            responsive: false,
                                                            aspectRatio:1.5,
                                                            centertext:"112",
                                                            cutoutPercentage: 75,
                                                            cutout: 45,
                                          
                                                            plugins: {
                                             
                                                                legend: {
                                                                    display:false,
                                                                    position: 'bottom',
                                                                    padding:2
                                                                },
                   
                                                                title: {
                                                                    display: true,
                                                                    text: 'Waiting RFP',
                                                   
                                                                },
                                          
                                                 
                                          
                                                                // datalabels: {
                                                                //     // display: false,
                                                                //     color: '#ffffff',
                                                                //     font: {
                                                                //         size: 14,
                                                                //         weight: "500",
                                                                //         color:"#000"
                                                                //     },
                                                                //     anchor: 'end',
                                                                //     align: 'end',
                                                                //     offset: 8,
                                                                //     display: function(context) {
                                                                //         return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
                                                                //      },
                                                                //      formatter: function(value,ctx) {
                                                                //         return `${ctx.chart.data.labels[ctx.dataIndex]}:${value}`;
                                                      
                                                                //       }
                                                   
                                                                // },
                                                                beforeDraw: function(chart) {
                                                                    var {width} = chart;
                                                                    var {height} = chart;
                                                                    var {ctx} = chart;
                                                                    ctx.restore();
                                                                    var fontSize = (height / 160).toFixed(2);
                                                                    ctx.font = fontSize + "em sans-serif";
                                                                    ctx.textBaseline = "top";
                                                                    var text = "Foo-bar";
                                                                    var textX = Math.round((width - ctx.measureText(text).width) / 2);
                                                                    var textY = height / 2;
                                                                    ctx.fillText(text, textX, textY);
                                                                    ctx.save();
                                                                } ,
                                                 
                                                                animation: {
                                                                    animateScale: true,
                                                                    animateRotate: true
                                                                },
                                                      
                                                 
               
      
                                                            }}}
                                        

                                                    >
                                         

                                                    </Doughnut>
                                                    <Row>
                                                        <Col className="gutter-row" span={3}>
                                                            <Tooltip>
                                                                <SquareRoundedIcon style={{color:"#d93a23",fontSize:20}}/>
                                                            </Tooltip>
                                                        </Col>
                                                        <Col className="gutter-row" span={12}>
                                                            <Typography style={{fontSize:12,paddingTop:4}}>LSP RFP Pending</Typography>
                                                        </Col>
                                       
                                                    </Row>
                                                    <Row>
                                                        <Col className="gutter-row" span={3}>
                                                            <Tooltip>
                                                                <SquareRoundedIcon style={{color:"#1960db",fontSize:20}}/>
                                                            </Tooltip>
                                                        </Col>
                                                        <Col className="gutter-row" span={12}>
                                                            <Typography style={{fontSize:12,paddingTop:4}}>LSP RFP Done</Typography>
                                                        </Col>
                                         
                                
                                                    </Row>
                             
                                                </Col>
                                                <Col className="gutter-row" xs={24} xl={12}>
                                                    <Doughnut
                                                        data = {dataNotComplete}
                                                        width="146" height="216"
                                                        weight={8}
                                                        options={{
                                                            responsive: false,
                                                            aspectRatio:1.5,
                                                            cutout: 45,
                                                            plugins: {
                                             
                                                                legend: {
                                                                    display:false,
                                                                    position: 'bottom',
                                                                    padding:2
                                                                },
                                                 
                   
                                                                title: {
                                                                    display: true,
                                                                    text: 'Waiting HO Complete',
                                                   
                                                                },
                                          
                                          
                                                                datalabels: {
                                                                // display: false,
                                                                    color: '#ffffff',
                                                                    font: {
                                                                        size: 14,
                                                                        weight: "500",
                                                                        color:"#000"
                                                                    },
                                                                    // anchor: 'end',
                                                                    // align: 'end',
                                                                    offset: 8,
                                                                    display: function(context) {
                                                                        return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
                                                                    },
                                                   
                                                   
                                                                },
                                                 
                                                                animation: {
                                                                    animateScale: true,
                                                                    animateRotate: true
                                                                },
                                                      
                                                 
               
      
                                                            }}}
                                        

                                                    >

                                                    </Doughnut>
                                                    <Row>
                                                        <Col className="gutter-row" span={3}>
                                                            <Tooltip>
                                                                <SquareRoundedIcon style={{color:"#d93a23",fontSize:20}}/>
                                                            </Tooltip>
                                                        </Col>
                                                        <Col className="gutter-row" span={12}>
                                                            <Typography style={{fontSize:12,paddingTop:4}}>LSP HO Pending</Typography>
                                                        </Col>
                                       
                                                    </Row>
                                                    <Row>
                                                        <Col className="gutter-row" span={3}>
                                                            <Tooltip>
                                                                <SquareRoundedIcon style={{color:"#1960db",fontSize:20}}/>
                                                            </Tooltip>
                                                        </Col>
                                                        <Col className="gutter-row" span={12}>
                                                            <Typography style={{fontSize:12,paddingTop:4}}>LSP HO Done</Typography>
                                                        </Col>
                                         
                                
                                                    </Row>
                                

                                                </Col>
                  
              
                                 
                                            </Row>
                                        </AccordionDetails>
                                    </Accordion>
                                    
                                </Col>
                        
                            </Row>

                        </div>
                    </div>
            
                </div>
            </div>
        </>
        
    );
};

export default Dashboard;

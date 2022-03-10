import React,{useEffect} from 'react';
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
    List } from 'antd';
import { FormOutlined } from '@ant-design/icons';


const Dashboard = () => {

    useEffect(() => {
        
    },[])

    const dataAgenda = [
        'PMR Pending',
        'LTR Pending',
        'SDR Pending',
        'Order Rejection',
        'Task Pending',
    ];

    const colorHex = ['#d93a23','#1960db','#41c358',"#eba111"]
    const data = {
        labels:["LTR","SDR","PMR","ORDER REJECTION"],
      
        datasets:[{
            data:[20,48,10,22],
            backgroundColor: colorHex,
            display:true,
            datalabels: {
                color: '#FFCE56'
            }
        }]
    };



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
                    <div className='col-lg-6 col-md-6'>
                        <div className='card card-primary'>
                            <div className='card-header align-middle'>
                                <h3 className="card-title">Chart</h3>
                            </div>
                            <div className="card-body">
                                <Pie
                                    data = {data}
                                    options={{
                                        responsive:true,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                            },
                                            title: {
                                                display: true,
                                                text: 'Order Type'
                                            },
                                            datalabels: {
                                               
                                                display:true,
                                                align: 'bottom',
                                               
                                                

                                            },
                                            animation: {
                                                animateScale: true,
                                                animateRotate: true
                                            },
                                           
                                            
                                        }}}
                                    
                                >

                                </Pie>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6'>
                        <div className='card card-primary'>
                            <div className='card-header align-middle'>
                                <h3 className="card-title">My Agenda</h3>
                            </div>
                            <div className="card-body">
                                <List
                                    header={<div>My Agenda</div>}
                                    footer={<div></div>}
                                    bordered
                                    dataSource={dataAgenda}
                                    renderItem={item => (
                                        <List.Item>
                                            <Typography.Text ><FormOutlined /></Typography.Text> {item}
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

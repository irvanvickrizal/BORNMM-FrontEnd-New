/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-lone-blocks */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteList,getWpId,getOrderType,getOrderTypeId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Table
    ,Input
    ,Menu
    ,Dropdown
    ,Button
    ,Space,
    Tooltip
    ,Card
    ,Modal
    ,Form
    ,Spin
    ,Typography
    ,Row
    ,Col
    ,Checkbox
    ,DatePicker} from 'antd'
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined,CalendarOutlined  } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import API from '@app/utils/apiServices';
import Search from '@app/components/searchcolumn/SearchColumn';
import moment from 'moment';
import {IconButton, TextField}  from '@mui/material/';
import {toast} from 'react-toastify';



export default function TableSite() {

    const dispatch = useDispatch()
    const history = useHistory();
    const [wpIds,setWpids]=useState('')
    const navigateTo = (path) => {
        history.push(path)
    }
    const [isLoading, setIsLoading] = useState(true);
    const [orderRequestDraft,setOrderRequestDraft] = useState('');
    const [rescheduleDate,setRescheduleDate] = useState('');
    const [selecteSconId,setSelectedSconId] = useState("")
    const [selectedTaskSchedule,setSelectedTaskSchedule] = useState("")
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    
    const date2 = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const [deliveryDate,setDeliveryDate] = useState(moment(date2, "YYYY-MM-DD").add(3,'d'));


    const [isModalRescheduleVisible,setIsModalRescheduleVisible] = useState(false)
    const dataUserId = useSelector(state=>state.auth.user.uid)
    const dateNow = moment().format("YYYY-MM-DD");
    const {Title} = Typography

    const [checked,setChecked] = useState(false)
    const [express,setExpress] = useState("");
    const [odi,setOdi] = useState("")
  

    const CardTitle = (title) => <Title level={5}>{title}</Title>

    const getOrderRequestDraft=()=>{
        setIsLoading(true)
        API.getOrderRequestDraft(dataUserId).then(
            result=>{
                console.log("order request draft", result);
                setOrderRequestDraft(result);
                setIsLoading(false)
            }
        )
    }


    const handleEditRequest=(data)=>{
        navigateTo(`/mm/materialorder?odi=${data.orderDetailId}`)
        console.log(moment(data.expectedDeliveryDate).format("YYYY-MM-DD"),"da")
    }
    const handleDelete=(id)=>{
        if (window.confirm('Are you sure you want to delete this data ?')) {
            console.log(id)
            API.deleteOrderDetail("",id).then(
                result=>{
                    console.log("handledelete",result)
                    if(result.status=="success"){
                        getOrderRequestDraft();
                        toast.success(result.message)
                    }
                    else{
                        getOrderRequestDraft();
                        toast.error(result.message)
                    }
                }
            )
        }
    }


    const showModalReschedule = (data) => {
        setIsModalRescheduleVisible(true)
        setExpress(data.hasExpressDelivery)
        setOdi(data.orderDetailId)
  
    }
    const hideModalReschedule = (data) => {
        setIsModalRescheduleVisible(false)
        
    
    }

    const onFinishRequestReschedule = (data) => {
        console.log("datasubmitassign", express)
        const body = {
            "orderDetailId":odi,
            "expectedDeliveryDate" : data.deliveryDates,
            requestBy: dataUserId

        }
        API.orderRequestDraft(body).then(
            result=>{
                console.log("handle put",result)
                if(result.status=="success"){
                    getOrderRequestDraft();
                    toast.success(result.message)
                }
                else{
                    getOrderRequestDraft();
                    toast.error(result.message)
                }
            }
        )
        // console.log(body,"ini body")
     
        setIsModalRescheduleVisible(false)
    }

    const togleCheckbox = (value)=> {
        setChecked(value)
        console.log("v",value)
    }


    const columnsOrderRequestDraft =[
        {
            title:"CPO No",
            dataIndex:"cpoNo",
            key:"cpoNo",
            ...Search('cpoNo'),
        },
        {
            title:"Site No",
            dataIndex:"siteNo",
            key:"siteNo",
            ...Search('siteNo'),
        },
        {
            title:"Workpackage ID",
            dataIndex:"workpackageId",
            key:"workpackageId",
            ...Search('workpackageId'),
        },
        {
            title:"Site Name",
            dataIndex:"siteName",
            key:"siteName",
            ...Search('siteName'),
        },
        {
            title:"Region",
            dataIndex:"region",
            key:"region",
            ...Search('region'),

        },
        {
            title:"Zone",
            dataIndex:'zone',
            key:"zone",
            ...Search('zone'),
        },
        {
            title:"Order Type",
            dataIndex:"orderType",
            key:"orderType",
            ...Search('orderType'),
        },
        {
            title:"Origin Name",
            dataIndex:"originName",
            key:"originName",
            ...Search('originName'),
        },
        {
            title:"Destination Name",
            dataIndex:"destinationName",
            key:"destinationName"
            ,...Search('destinationName'),
        },
        {
            title:"Request Type",
            dataIndex:"requestTypeName",
            key:"requestTypeName",
            ...Search('requestTypeName'),
        },
        {
            title:"Expected Delivery Date",
            ...Search('expectedDeliveryDate'),
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.expectedDeliveryDate).format("YYYY-MM-DD")}</p>
                    </Space>
                )
            }
        },
        {
            title:"Requester",
            dataIndex:"requesterName",
            key:"requesterName",
            ...Search('requesterName'),
        },
        {
            title:"Request Date",
            ...Search('requestDate'),
            render:(record)=>{
                return (
                    <Space>
                        <p>{moment(record.requestDate).format("YYYY-MM-DD   hh.mm.ss")}</p>
                    </Space>
                )
            }
        },
        {
            align:"center",
            fixed:'right',
            width:80,
            render:(record)=>{
                return (
                    <>
                        {moment(record.expectedDeliveryDate).isAfter(dateNow)? (<><Tooltip title="Edit Draft">
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                color="primary"
                                onClick={() => handleEditRequest(record)}
                            >
                                <EditOutlined />

                            </IconButton>
                        </Tooltip><IconButton
                            aria-label="expand row"
                            size="small"
                            color="error"
                            onClick={() => handleDelete(record.orderDetailId)}
                        >
                            <DeleteOutlined />
                        </IconButton></>):(<>
                            {record.isPickupRequest ? ( <Tooltip title="Change Expected Picup Date">
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    color="primary"
                                    onClick={() => showModalReschedule(record)}
                                >
                                    <CalendarOutlined />

                                </IconButton>
                            </Tooltip>):( <Tooltip title="Change Expected Delivery Date">
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    color="primary"
                                    onClick={() => showModalReschedule(record)}
                                >
                                    <CalendarOutlined />

                                </IconButton>
                            </Tooltip>)}
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                color="error"
                                onClick={() => handleDelete(record.orderDetailId)}
                            >
                                <DeleteOutlined />
                            </IconButton></>)}
                    </>
                )
            },
        }
        
    ]

    function disabledDateExpressTrue(current) {
        // Can not select days before today and today
        return moment(current).add(1,'d') < moment().endOf('day')
    }
    function disabledDate(current) {
        // Can not select days before today and today
        return current < moment().add(2,'d');
    }

    

    useEffect(() => {
        getOrderRequestDraft();
        console.log("dasd")
    },[dispatch]);

       

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
                    <Table
                        // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                        //rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                        dataSource={orderRequestDraft}
                        columns={columnsOrderRequestDraft}
                        key='siteConditionId'
                        scroll={{ x: '200%' }}
                        // eslint-disable-next-line react/jsx-boolean-value
                        pagination={{
                            pageSizeOptions: ['5', '10', '20', '30', '40'],
                            showSizeChanger: true,
                            position: ["bottomLeft"],
                        }}

                        style={{ marginTop: 36 }}
                        size='small'
                        bordered /><Modal visible={isModalRescheduleVisible} onCancel={hideModalReschedule}
                        footer={null}
                    >
                        <div> <Card title={CardTitle("Express Delivery")}>
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                  
                                initialValues={{
                                    'deliveryDates': moment(date2, "YYYY-MM-DD").add(3,'d')
                                    //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                                    // remember: true
                                }}
                                onFinish={onFinishRequestReschedule}
                


                                autoComplete="off"
                            >

                                <Form.Item label="Express Delivery" valuePropName="checked" name="isExpressDelivery">  
                                    {express ? (<Checkbox onChange={(e)=>togleCheckbox(e.target.checked)}/>):(
                                        <Tooltip color='#f50' title="Cannot request Express Delivery"><Checkbox disabled  onChange={(e)=>togleCheckbox(e.target.checked)}/></Tooltip>
                                    )}
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
                                <div className='float-sm-right ml-10'>
                                    <Form.Item wrapperCol={{ offset: 1, span: 16 }} style={{marginTop:6}}>
                                        <Row>
                                            <Col span={4}> 
                                                <Space direction="horizontal">
                                                    <Button type="primary" htmlType="submit" >Confirm</Button>
                               
                                                    <Button type="danger" onClick={hideModalReschedule}>Cancel</Button>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                </div>
                  
             


                            </Form>
                        </Card>
                        </div>
                    </Modal></>
            }
        </div>
        
    )
}

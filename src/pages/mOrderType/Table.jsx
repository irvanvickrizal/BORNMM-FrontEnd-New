import React, {useState,useEffect} from 'react';
import API  from '../../utils/apiServices';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import Search from '@app/components/searchcolumn/SearchColumn';
import {Switch ,Form,Modal,Table, Input, Button, Space, Spin, Row, Col,Tooltip  } from 'antd'
import {CheckOutlined,CloseOutlined,PlusOutlined, EditOutlined } from '@ant-design/icons'
import {IconButton}  from '@mui/material/';


export default function TableMOrderType() {
    const [dataOrdetType,setDataOrderType] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const [isModalEditVisible,setIsModalEditVisible] = useState(false)
    const [orderTypeCode,setOrderTypeCode] = useState("")

    const user = useSelector((state) => state.auth.user);


    function getOrderType(){
        setIsLoading(true)
        API.getmOrderType().then(
            result=>{
                setDataOrderType(result);
                setIsLoading(false)
            }
        )
    } 

    const handleIsActive = (status,data) =>{
        console.log(data,"data pass")
        console.log(status,data,"isActive")
        if (window.confirm('Are you sure you want to process this action ?')) {
            const body={
                "id" : data.orderTypeId,
                "actStatus" : status,
                "lmby" : user.uid
            }
            console.log("activa:",body);
            API.putActivationmOrderType(body).then(
                result=>{
                    console.log("put material: ", result);
                    if(result.status=="success")
                    {
                        toast.success(result.message);
                        //refreshData();
                        //window.location.reload();
                    }
                    else{
                        toast.error(result.message);
                    }
                }
            )
        }
    }



    const showModalEdit = (data) => {
        setIsModalEditVisible(true)
    }

    const hideModalEdit = () => {
        setIsModalEditVisible(false)
    }

    const column = [
        {
            title : "No",
            width : 20,
            render: (value, item, index) => 1 + index
        },
        {
            title : "Order Type ID",
            width: 100,
            dataIndex:'orderTypeId',
            ...Search('orderTypeId'),
        },
    
        {
            title : "Order Type Code",
            width: 100,
            dataIndex:'orderTypeCode',
            ...Search('orderTypeCode'),
        },
        {
            title : "Order Type Name",
            width: 100,
            dataIndex:'orderTypeName',
            ...Search('orderTypeName'),
        },
        {
            title : "Order Type QString",
            width: 100,
            dataIndex:'orderTypeQString',
            ...Search('orderTypeQString'),
        },
        {
            title : "isActive",
            width: 30,
            align:'center',
            fixed: 'right',
            render:(record)=>{
                return (
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        defaultChecked={record.cminfo.isActive}
                        onClick={(e)=>handleIsActive(e,record)}
                        // checked={record.isActive}
                    />
                )
            },
  
        },
        // {
        //     title : "Options",
        //     width: 30,
        //     key:"orderMaterialId",
        //     align:'center',
        //     fixed: 'right',

        //     render:(record)=>{
        //         return (
        //             <Space>
        //                 <Tooltip title="Edit Material">
        //                     <IconButton
        //                         size='small'
        //                         color="primary"
        //                         aria-label="upload file"
        //                         component="span" 
        //                         // onClick={() => handleEdit(record)}
        //                     >
        //                         <EditOutlined onClick={()=>showModalEdit(record)}/>
        //                     </IconButton>
        //                 </Tooltip>
        //             </Space>
        //         )
  
        //     },}

    ]






    useEffect(() => {
        getOrderType()
    
    },[])
    
    return (
        <div>
            {isLoading ? 
                <Row justify="center">
                    <Col span={1}>    
                        <Spin />
                    </Col>
                </Row>  
                :
                <><div className='float-right'>
                </div>
                <Table
                    scroll={{ x: '100%' }}
                    size="medium"
                    // expandable={{ expandedRowRender }}
                    columns={column}
                    dataSource={[...dataOrdetType]}
                    rowKey={record => record.materialId}
                    pagination={{
                        pageSizeOptions: ['5', '10', '20', '30', '40'],
                        showSizeChanger: true,
                        position: ["bottomLeft"],
                    }}
                    bordered /></>}

            <Modal title="Edit Scope"
                visible={isModalEditVisible}
                destroyOnClose
                onCancel={hideModalEdit}
                centered
                maskClosable={false}
                closable
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 17 }}
              
                    // onFinish={handleEditAddForm}
                    // onFinishFailed={handleFailedAddForm}
                    autoComplete="off"
                    // initialValues={{
                    //     'scopeName': scopeName,
                    //     'scopeDesc': scopeDesc,
                       
                    // }}
                >
           
            
                    <Form.Item
                        label="Order Type Code"
                        name="orderTypeCode"
                        rules={[{ required: true, message: 'Please input Order Type Code Field!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Order Type Name"
                        name="orderTypeName"
                        rules={[{ required: true, message: 'Please input Order Type Name Field!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Order Type QString"
                        name="orderTypeQstring"
                        rules={[{ required: true, message: 'Please input Order Type QString Field!' }]}
                    >
                        <Input />
                    </Form.Item>
                 
                    <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Confirm
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>    
        </div>
    )
}

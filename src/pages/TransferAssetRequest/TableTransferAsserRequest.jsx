/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect,useState} from 'react'
import {Table,Input,Menu, Dropdown, Button, Space,Typography} from 'antd'
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import Search from '@app/components/searchcolumn/SearchColumn';
import API from '@app/utils/apiServices';
import { useSelector } from 'react-redux';
import moment from 'moment';


export default function TableTransferAsserRequest() {
    const [dataTransferRequest,setDataTransferRequest] = useState([])
    const [dataOrderTypeList,setDataOrderTypeList] = useState([])
    const [path,setPath] = useState("")
    const [ddId,setddId] = useState("")
    const history = useHistory()
  
    const [isLoading, setIsLoading] = useState(true);


    const userId = useSelector(state=>state.auth.user.uid)
   


    function getDataTransferAssetRequest() {
        setIsLoading(true);
        API.getTransfeAssetRequest(userId).then(
            result=>{
                setDataTransferRequest(result);
               
                setIsLoading(false);
                console.log("data Transfer Asset  =>",result);
            }
        )
    }

    const selectedArray = (data) => {
        setDataOrderTypeList(data.orderTypeList[0].orderTypeName)
        setPath(data.orderTypeList[0].formPath)
        setddId(data.destDOPId)

    }
    const handleSelectDropdown = () => {
        history.push(`/${path}&ddid=${ddId}`)
    }

    

    const menuDropdown =  (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" onClick={handleSelectDropdown}>
                    {dataOrderTypeList}
                </a>
            </Menu.Item>
        </Menu>
    );


    const columns = [
        {
            title : "No",
            width : 50,
            render: (value, item, index) => 1 + index
        },
        {width:150,
            title : "WH Code",
            dataIndex:'siteNo',
            ...Search('siteNo'),
        },
        {width:150,
            title : "WH Name",
            dataIndex:'siteName',
            ...Search('siteName'),
        },     
        {width:150,
            title : "Workpackage ID",
            render:(record)=>{
                return (
                    <div>
                        <Typography>{record.orderTypeList[0].workpackageid}</Typography>
                    </div>
                   
                   
                )
            },
            ...Search('workpackageid'),
        },
        {width:150,
            title : "Package Type",
            dataIndex:'packageType',
            ...Search('packageType'),
        },
        {width:150,
            title : "Scope",
            render:(record)=>{
                return (
                    <div>
                        <Typography>{record.scopeDetail.scopeName}</Typography>
                    </div>
                   
                   
                )
            },
            ...Search('scopeName'),
        },

        {
            title : "Region",
            dataIndex:'region',
            width:150,
            ...Search('region'),
        },
        {width:80,
            title : "Options",
            dataIndex:'',
            align:'center',
            fixed:'right',
            render : (record,wp)=>{
                return <Space direction="vertical">
                    <Space wrap>
                        <Dropdown overlay={menuDropdown} trigger={['click']} placement="bottomLeft">
                            <MoreOutlined onClick={()=>selectedArray(record)} /> 
                        </Dropdown>
                    </Space>
                </Space>
            }
            
        },

    ]

    useEffect(() => {
        getDataTransferAssetRequest();
        
      
    },[])

    
    

    return (
        <div>
          
            <Table
            // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                dataSource={dataTransferRequest}
                columns={columns}
                key='siteID'
                scroll={{ x: '100%' }}
                // eslint-disable-next-line react/jsx-boolean-value
                pagination={{
                    pageSizeOptions: ['5','10','20','30', '40'],
                    showSizeChanger: true,
                    position: ["bottomLeft"],
                }}
                    
                style={{marginTop : 36}}
                size='small'
                bordered
                // loading={loading ? (true):(false)}    
                
            />
        </div>
    )
}

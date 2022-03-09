/* eslint-disable react/no-unstable-nested-components */
import { getDataSiteList,getWpId } from '@app/store/action/siteListDeliveryRequestAction';
import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Table,Input} from 'antd'
import {EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom';

export default function TableSite() {

    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        dispatch(getDataSiteList())
    },[dispatch]);

    const dataSiteList = useSelector(state=>state.siteListDeliveryRequestReducer.data)
    const wpid = useSelector(state=>state.siteListDeliveryRequestReducer.wpId)

    const navigateTo = (wpids) => history.push(`/sitelist/siteDetail?wpid=${wpids}`)

    const getId = (record) => {
        // dispatch(getWpId(record));
        console.log(record);
        navigateTo(record);
    } 
    

    const columns = [
        {
            title : "No",
            dataIndex:'siteID',
        },
        {
            title : "Site No",
            dataIndex:'siteNo',
            
            
        },
        {
            title : "Site Name",
            dataIndex:'siteName',
            sorter:(record1,record2)=>{
                return record1.siteName > record2.siteName
            },
            filterDropdown: ({setSelectedKeys,selectedKeys,confirm}) => {
                return <Input 
                    autoFocus 
                    placeHolder='search'
                    value={selectedKeys[0]}
                    onChange={(e)=>{
                        setSelectedKeys(e.target.value?[e.target.value]:[])
                    }}
                    style={{ marginBottom: 8, display: 'block' }}
                    onPressEnter={()=>{
                        confirm()
                    }}
                    onBlur={()=>{
                        confirm()
                    }}
                ></Input>
            },
            filterIcon: () => {
                return <SearchOutlined/>
            },
            onFilter:(value,record)=>{
                return record.siteName.toLowerCase().includes(value.toLowerCase())
            },
            
        },
        {
            title : "CPO No",
            dataIndex:'poDetail',
            render: item => Object.keys(item).map(k => item[k])[1]
        },
        {
            title : "Work Pakage ID",
            dataIndex:'workpackageID',
        },
        {
            title : "Scope",
            dataIndex:'scopeDetail',
            render: item => Object.keys(item).map(k => item[k])[1]
            
            
        },
        {
            title : "Region",
            dataIndex:'region',
        },
        {
            title : "Option",
            dataIndex:'',
            render : (record)=>{
                return <MoreOutlined onClick={()=>getId(record.workpackageID)}  />
            }
            
        },
        
    
    ]

    

    return (
        <div>
            <div className="card card-primary">
                <div className="card-header align-middle">
                    <h3 className="card-title">Site List Delivery Request Type</h3>
                  
                </div>
                <Table
                    // rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    responsive
                    rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                    dataSource={dataSiteList}
                    columns={columns}
                    key='siteConditionId'
                    
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
        </div>
    )
}

import React,{useState,useEffect} from 'react'
import API from '@app/utils/apiServices'
import {Table,Tooltip} from "antd"
import Search from '@app/components/searchcolumn/SearchColumn'
import {BookOutlined  } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'


export default function TableBoqRef() {
    const [dataBoq,setDataBoq] = useState([])
    const [page,setPage] = useState(1)
    const history = useHistory()
    
    const getBoqList = () => {
        API.getBoqList().then(
            result=>{
                setDataBoq(result);
                console.log("data BOQ :",result);
            }
        )
    }

    useEffect(() => {
        getBoqList()
    }, [])

   

    const handleAction = (record)=> {
        // setSelectedBid(record.boqId)
        // navigateTo()
        history.push(`/boq/boqrefdetail?bid=${record.boqId}`)
       
    }
    const columns = [
        {
            width: 50,
            title : "No",
            render: (value, item, index) => 1 + index
        },
        {width: 150,
            title : "CPO No",
            dataIndex:'cpoNo',
            ...Search('cpoNo'),
        },
        {width: 150,
            title : "CPO No Alias",
            dataIndex:'cpoNoAlias',
            ...Search('cpoNoAlias'),
        },
        {width: 150,
            title : "Project Name",
            dataIndex:'projectName',
            ...Search('projectName'),
        },
        {width: 80,
            title : "Total Scope",
            dataIndex:'totalScopes',
            ...Search('totalScopes'),
        },
        {width: 80,
            title : "Total Sites",
            dataIndex:'totalSites',
            ...Search('totalSites'),
        },
        {width: 100,
            title : "Total BOQ as PO Complete",
            dataIndex:'totalBOQasPODone',
            ...Search('totalBOQasPODone'),
        },
        {width: 100,
            title : "Total BOQ as Plan Complete",
            dataIndex:'totalBOQasPlanDone',
            ...Search('totalBOQasPlanDone'),
        },
        {width: 80,
            title : "Action",
            fixed : "right",
            render : (record)=>{
                return (
                    <Tooltip title="BOQ Detail">
                        <BookOutlined style={{fontSize:20, color:"#004b99"}} onClick={()=>handleAction(record)}/>
                    </Tooltip>
                    
                )
           
            },
        }
    ]


    return (
        <div>
            <Table
                rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' :  'table-row-dark'}
                dataSource={dataBoq}
                columns={columns}
                key='boqId'
                scroll={{ x: '100%' }}
                // eslint-disable-next-line react/jsx-boolean-value
                pagination={{
                    pageSizeOptions: ['5','10','20','30', '40'],
                    showSizeChanger: true,
                    position: ["bottomLeft"],
                }}
            />
        </div>
    )
}

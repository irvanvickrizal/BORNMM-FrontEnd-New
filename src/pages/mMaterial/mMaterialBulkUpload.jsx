import React,{useEffect,useState} from 'react'
import HeaderChanger from '@app/components/cardheader/HeaderChanger'
import { Upload, Button, message,Row,Col,Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import API from '@app/utils/apiServices';
import { toast } from 'react-toastify';


export default function mMaterialBulkUpload() {
    const { Text, Link } = Typography;
    const [fileUpload, setFileUpload] = useState(null);
    const [uploading, setUploading] = useState(false);
    const boqId = 2
    
    const props = {
        onRemove: () => {
            setFileUpload(null);
            return fileUpload
        },
        // beforeUpload: file => {
        //     const isPNG = file.type === 'image/png';
        //     if (!isPNG) {
        //         message.error(`${file.name} is not a png file`);
        //     }
        //     return isPNG || Upload.LIST_IGNORE;
        // },
        beforeUpload: file => {
            console.log(file,"file");
            const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if(isXLSX){
                setFileUpload(file);
                return false;
            }
            toast.error(`${file.name} is not a xlsx`)
            return isXLSX || Upload.LIST_IGNORE;
        },
        fileUpload,
    };


    const handleUpload = () => {
        setUploading(true)
        try{
            API.postBOQASPOFile(boqId,fileUpload).then(
                result=>{
                    try{
                        if(result.status=="success"){
                            setFileUpload(null);
                            setUploading(false);
                            props.onRemove();
                            toast.success('upload successfully.');
                            window.location.reload()
                        }
                        else{
                            setFileUpload(null);
                            setUploading(false);
                            props.onRemove();
                            toast.error(result.message);
                        }
                    }
                    catch(e){
                        toast.error("Upload file error")
                        setUploading(false);
                        console.log(e,"error catch")
                    }
                }
            );
        }catch(e)
        {
            console.log(e,"errorrrrororoo");
        }
    }

    useEffect(() => {
        //getDOP();
    },[fileUpload])
    return (
        <div>
            <HeaderChanger title="New Master Material Bulk Upload"/>
            <Row direction="vertical">
                <Col span={12}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                        <Row>

                            <Text type="danger">Note : (*.XLSX) is format allowed</Text>
                        </Row>
                    </Upload>
                </Col>
                <Col span={12}>
                    <div className='float-right'>
                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={fileUpload == null}
                            loading={uploading}
                        >
                            {uploading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                
            </Row>
        </div>
    )
}

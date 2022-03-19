import React, {Component,useState,useEffect} from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import API  from '../../utils/apiServices';

const ModalUpload = ({poScopeId,cpoNo,projectName}) => {
    
    const [fileUpload, setFileUpload] = useState(null);
    const [uploading, setUploading] = useState(false);
    
    const props = {
        onRemove: () => {
            setFileUpload(null);
            return fileUpload
        },
        beforeUpload: file => {
            setFileUpload(file);
            return false;
        },
        fileUpload,
    };


    const handleUpload = () => {
        setUploading(true)
        
        API.postPOFile(poScopeId,fileUpload).then(
            result=>{
                if(result.value.status=="success"){
                    setFileUpload(null);
                    setUploading(false);
                    props.onRemove();
                    message.success('upload successfully.');
                    window.location.reload()
                }
                else{
                    setFileUpload(null);
                    setUploading(false);
                    props.onRemove();
                    message.error(result.value.message);
                }

                console.log('i am PO upload xx',result)
            }
        );
    }

    useEffect(() => {
        //getDOP();
    },[fileUpload])

    return (
        <div>
            <p><b>CPO NO :</b>{cpoNo}</p>
            <p><b>Project Name :</b>{projectName}</p>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileUpload == null}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
        </div>
    );
};

export default ModalUpload;
import React, {Component,useState,useEffect} from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import API  from '../../utils/apiServices';

const ModalUpload = ({poSitelistId,cpoNo,projectName,fileName}) => {
    
    const [fileUpload, setFileUpload] = useState(null);
    const [uploading, setUploading] = useState(false);
    
    const props = {
        onRemove: () => {
            setFileUpload(null);
            // message.success("sininininsinisnisns")
            // this.setState(state => {
            //     const index = state.fileList.indexOf(file);
            //     const newFileList = state.fileList.slice();
            //     newFileList.splice(index, 1);
            //     return {
            //         fileList: newFileList,
            //     };
            // });
        },
        beforeUpload: file => {
            setFileUpload(file);
            // this.setState(state => ({
            //     fileList: [...state.fileList, file],
            // }));
            return false;
        },
        fileUpload,
    };


    const handleUpload = () => {
        //const { fileList } = fileUpload;
        //const formData = new FormData();
        //fileList.forEach(file => {
        //    formData.append('files[]', file);
        //});
        setUploading(true)
        
        API.postRevisePOFile(poSitelistId,fileUpload).then(
            result=>{
                if(result.value.status=="success"){
                    setFileUpload(null);
                    setUploading(false);
                    props.onRemove();
                    window.location.reload()
                    message.success('upload successfully.');
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

    // You can use any AJAX library you like
    //     fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
    //         method: 'POST',
    //         body: formData,
    //     })
    //         .then(res => res.json())
    //         .then(() => {
    //             this.setState({
    //                 fileList: [],
    //             });
    //             message.success('upload successfully.');
    //         })
    //         .catch(() => {
    //             message.error('upload failed.');
    //         })
    //         .finally(() => {
    //             this.setState({
    //                 uploading: false,
    //             });
    //         });
    // };
    useEffect(() => {
        //getDOP();
    },[fileUpload])

    return (
        <div>
            <p><b>CPO NO :</b></p><p>{cpoNo}</p>
            <p><b>Project Name :</b></p><p>{projectName}</p>
            <p><b>File Name :</b></p><p>{fileName}</p>
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
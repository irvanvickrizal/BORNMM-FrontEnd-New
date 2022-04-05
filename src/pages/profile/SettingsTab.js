/* eslint-disable react/jsx-boolean-value */
import React, {Component,useState,useEffect} from 'react';

import {Button} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {Tabs,InputNumber,Typography, Card,Select,Form,Modal,Table, Input,Menu, Dropdown, Space, Spin, Row, Col,Tooltip  } from 'antd'
import { CheckCircleTwoTone,EyeFilled ,CloseSquareOutlined,CalendarTwoTone,UserAddOutlined, EditOutlined,DeleteOutlined,SearchOutlined,CheckCircleFilled,MoreOutlined } from '@ant-design/icons'
import {IconButton, TextField}  from '@mui/material/';
import API from '@app/utils/apiServices';
import {useHistory, Link} from 'react-router-dom';

import {logoutUser} from '@store/reducers/auth';


const SettingsTab = ({isActive}) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [isChangePassword,setIsChangePassword] = useState(false)

    const handleChangePasswordbtn = () =>
    {
        setIsChangePassword(true)
    }

    const handleCancelChangePassword =() =>
    {
        setIsChangePassword(false)
    }

    function success() {
        Modal.success({
            content: 'Change Password Success, please log in with your new password',
        });
    }


    const handleOKForm = (data) =>{
        if (window.confirm('Are you sure want to change your password ?')) {
            console.log(data)
            const body = (
                {
                    "userId" : user.uid,
                    "oldPassword" : data.oldPassword,
                    "newPassword" :data.confirmPassword  
                }
            )
            console.log("body", body)
            API.changePassword(body).then(
                result=>{
                    success()
                    dispatch(logoutUser());
                    history.push('/login');
                    console.log(result.message,"result")
                }
            )
        }
    }
    const handleFailedForm = (data) =>{
        console.log(data)
    }

    return (
        <><div className={`tab-pane ${isActive ? 'active' : ''}`}>
            <form className="form-horizontal">
                <div className="form-group row">
                    <label
                        htmlFor="inputName"
                        className="col-sm-2 col-form-label"
                    >
                        Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            id="inputName"
                            value={user.name}
                            disabled />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="inputEmail"
                        className="col-sm-2 col-form-label"
                    >
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            value={user.email}
                            disabled />
                    </div>
                </div>
                <div className="form-group row">
                    <label
                        htmlFor="inputName2"
                        className="col-sm-2 col-form-label"
                    >
                        Phone Number
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="inputName2"
                            placeholder="Phone Number" />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10 col-md-9">
                        <Button theme="warning" onClick={handleChangePasswordbtn}>
                            Change Password
                        </Button>
                    </div>
                    <div className="col-sm-10 col-md-1 float-right">
                        <Button type="submit" theme="primary">
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </div><Modal title="Change Password"
            visible={isChangePassword}
            destroyOnClose={true}
            footer={null}

            onCancel={handleCancelChangePassword}
        >
            <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                // initialValues={{
                //     'orderDetailId': orderDetailId,
                //     'requestNo': selectedRequestNo,
                //     'orderRequestNo': selectedOrderRequestNo,
                //     'orderType': selectedOrderType,
                //     'pickupOrDeliveryDate': moment(selectedPickuporDeliveryDate).format("YYYY-MM-DD"),
                //     // 'taskScheduleId': props.taskScheduleId,
                //     // 'subconId': props.subconId,
                //     //'pickupDate': moment(props.pickupDate).format("YYYY-MM-DD"),
                //     // remember: true
                // }}
                onFinish={handleOKForm}
                onFinishFailed={handleFailedForm}
                autoComplete="off"
            >
                <Form.Item
                    name="oldPassword"
                    label="Old Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your old password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                                Confirm
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal></>
    );
};

export default SettingsTab;

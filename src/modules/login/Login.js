/* eslint-disable no-dupe-else-if */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {loadUser, loginUser} from '@store/reducers/auth';
import {setMenu} from '@store/reducers/menu';
import {setDashboard} from '@store/reducers/dashboard';
import {Checkbox, Input} from '@components';
import {faEnvelope, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import mapLogin from '../../assets/image/map-login.svg'
import logoNokia from '../../assets/image/logoBorn.png'
import logoNokia2 from '../../assets/image/Logo-Nokia.png' 
import Spinner from 'react-bootstrap/Spinner';

import API  from '../../utils/apiServices'

import jwt from 'jwt-decode';
import * as Yup from 'yup';

import * as AuthService from '../../services/auth';


import {
    IconButton,
    OutlinedInput,
    InputAdornment,
    FormControl,
    Typography,
    Button,
    FormHelperText,
} from '@material-ui/core';
import { Row, Col,Spin } from 'antd';
import eyeRed from '../../assets/image/eye.png';
import eyeRedOff from '../../assets/image/eye-off.png';

const useStyles = makeStyles({
    container: {
        minHeight: '100vh',
        padding: 40,
        backgroundColor: '#F4F7FB',
        display: 'flex',
        flexDirection: 'column',
    },
    leftLayout: {
      
        alignContent: 'center',
        justifyContent: 'center',
        
    },
    leftInner: {
        backgroundColor: 'white',
        padding: 30,
        paddingBottom:5,
        background: 'white',
        boxShadow: '0px 6px 6px rgba(232, 238, 255, 0.3)',
        borderRadius: 6,
    },
    inputText: {
        margin: 0,
        backgroundColor: '#F4F7FB',
        border: `1px solid ${'#BCC8E7'}`,
        borderRadius: 4,
        fontSize: '13px',
        lineHeight: '16px',
        '&.Mui-error': {
            borderColor: '#DC241F',
            backgroundColor: '#F4F7FB',
            '& fieldset': {
                backgroundColor: '#DC241F',
                opacity: 0.1,
            },
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },
        '& .MuiOutlinedInput-input': {
            padding: '16px 0 16px 12px',
            '&:-webkit-autofill': {
                borderRadius: '8px 0 0 8px',
            },
            '&::placeholder': {
                color: '#BCC8E7',
                fontStyle: 'italic',
            },
        },
    },
    btnRoot: {
        borderRadius: '6px',
        padding: '10px 0',
        width: 115,
        backgroundColor: '#1c4598',
        '&:hover': {
            backgroundColor: '#8D98B4',
        },
    },
    btnDisabled: {
        background: '#BCC8E7',
    },
    btnLabel: {
        fontWeight: 600,
        fontSize: '17px',
        lineHeight: '20px',
        color: 'white',
        textTransform: 'capitalize',
    },
    copyright: {
        fontSize: '13px',
        lineHeight: '16px',
        color: '#8D98B4',
        textAlign: 'center',
    },
});
  

const Login = () => {
    const [isAuthLoading, setAuthLoading] = useState(false);
    const [isGoogleAuthLoading, setGoogleAuthLoading] = useState(false);
    const [isFacebookAuthLoading, setFacebookAuthLoading] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [isVisible, setIsVisible] = useState(false);
    const [Password, setPassword] = useState('');
    const [isErrorUserName, setIsErrorUserName] = useState(false);
    const [isErrorPassword, setIsErrorPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [passHelperText, setPassHelperText] = useState('');
    const [emailHelperText, setEmailHelperText] = useState('');
    const [dashboardUrl,setDashboardURL] = useState('');
    const history = useHistory();
    const [t] = useTranslation();

    
    const User = (token) => {
        const user =  jwt(token);
        console.log("jwt user: ",user);
    }

    const menuapi=(id,tokens)=> {
        try{
            API.getMenu(id,tokens).then(
                result=>{
                    console.log('i menu',result)
                    
                    dispatch(setMenu(result));
                }
            );
        }catch(e){
            console.log(e,"menu error")
        }
       
    } 

    const dashboardByRole=(userid)=> {
        console.log(userid,"userid login")
        try{
            API.getDashboardRole(userid).then(
                result=>{
                    console.log('dashboard',result)
                    console.log('dashboardLength',result.length)
                    if(result.length>0){
                        dispatch(setDashboard(result[0].dashboardURL));
                        setDashboardURL(result[0].dashboardURL)
                    }
                    else{
                        dispatch(setDashboard("/"));
                    }
                }
            );
        }catch(e){
            console.log(e,"menu error")
        }
    } 


    const loginori = async (email, password) => {
        try {
            setAuthLoading(true);
            const token = await AuthService.loginByAuth(email, password);
            toast.success('Login is succeeded!');
            setAuthLoading(false);
            dispatch(loginUser(token));
            history.push('/');
        } catch (error) {
            setAuthLoading(false);
            toast.error(error.message || 'Failed');
        }
    };

    const login = async (email, password) => {
        try {
            setAuthLoading(true);
            const token = await AuthService.loginAPI(username, Password); //await AuthService.loginByAuth(email, password);
            
            console.log('login : ',token);
            toast.success('Login is succeed!');
            setIsErrorUserName(false)
            setIsErrorPassword(false)
            dispatch(loginUser(token));
            const user =  jwt(token);

            menuapi(user.roleId,token)
            dashboardByRole(user.uid)

            dispatch(loadUser(user));
            // if(user.roleId==175){
            //     history.push('/task/ackdismantlepending');
            //     setAuthLoading(false);
            // }
            // else{
            //     history.push('/');
            //     setAuthLoading(false);
            // }
            history.push(dashboardUrl);
            setAuthLoading(false);
        } catch (error) {
            if ( Password.length < 1 && username.length < 1) {
                setIsErrorUserName(true)
                setEmailHelperText("Username/Email Required");
                setIsErrorPassword(true)
                setPassHelperText('Password Required');
            
            } else if ( Password.length < 1 ) {
                setIsErrorPassword(true)
                setIsErrorUserName(false)
                setPassHelperText("");
                setPassHelperText('Password Required');
            } else if( username.length < 1) {
                setIsErrorUserName(true)
                setIsErrorPassword(false)
                setEmailHelperText("Username/Email Required");
                setPassHelperText('');
            } 
            else {
                console.log(error);
                setIsErrorPassword(false)
                setIsErrorUserName(false)
                setEmailHelperText('');
                setPassHelperText('');
            }
            setAuthLoading(false);
            toast.error("Incorrect Username/Password");
        }
    };

    const loginByGoogle = async () => {
        try {
            setGoogleAuthLoading(true);
            const token = await AuthService.loginByGoogle();
            toast.success('Login is succeeded!');
            setGoogleAuthLoading(false);
            dispatch(loginUser(token));
            history.push('/');
        } catch (error) {
            setGoogleAuthLoading(false);
            toast.error(error.message || 'Failed');
        }
    };

    const loginByFacebook = async () => {
        try {
            setFacebookAuthLoading(true);
            const token = await AuthService.loginByFacebook();
            toast.success('Login is succeeded!');
            setFacebookAuthLoading(false);
            dispatch(loginUser(token));
            history.push('/');
        } catch (error) {
            setFacebookAuthLoading(false);
            toast.error(error.message || 'Failed');
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            Password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required'),
            Password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Required')
        }),
        onSubmit: (values) => {
            login(values.username, values.Password);
        }
    });

    // document.getElementById('root').classList = 'hold-transition login-page';

    return (
    // <div className="login-box">
    //     <div className="card card-outline card-primary">
    //         <div className="card-header text-center">
    //             <Link to="/" className="h1">
    //                 <b>BORN</b>
    //             </Link>
    //         </div>
    //         <div className="card-body">
    //             <p className="login-box-msg">{t('login.label.signIn')}</p>
    //             <form onSubmit={formik.handleSubmit}>
    //                 <div className="mb-3">
    //                     <Input
    //                         icon={faUser}
    //                         placeholder="User Name"
    //                         type="text"
    //                         formik={formik}
    //                         formikFieldProps={formik.getFieldProps('email')}
    //                     />
    //                 </div>
    //                 <div className="mb-3">
    //                     <Input
    //                         icon={faLock}
    //                         placeholder="Password"
    //                         type="password"
    //                         formik={formik}
    //                         formikFieldProps={formik.getFieldProps(
    //                             'password'
    //                         )}
    //                     />
    //                 </div>

    //                 <div className="row">
    //                     <div className="col-8">
    //                         <Checkbox
    //                             checked={false}
    //                             label={t('login.label.rememberMe')}
    //                         />
    //                     </div>
    //                     <div className="col-4">
    //                         <Button
    //                             block
    //                             type="submit"
    //                             isLoading={isAuthLoading}
    //                             disabled={
    //                                 isFacebookAuthLoading ||
    //                                 isGoogleAuthLoading
    //                             }
    //                         >
    //                             {t('login.button.signIn.label')}
    //                         </Button>
    //                     </div>
    //                 </div>
    //             </form>
    //             <div className="social-auth-links text-center mt-2 mb-3">
    //                 <Button
    //                     block
    //                     icon="facebook"
    //                     onClick={loginByFacebook}
    //                     isLoading={isFacebookAuthLoading}
    //                     disabled={isAuthLoading || isGoogleAuthLoading}
    //                 >
    //                     {t('login.button.signIn.social', {
    //                         what: 'Facebook'
    //                     })}
    //                 </Button>
    //                 <Button
    //                     block
    //                     icon="google"
    //                     theme="danger"
    //                     onClick={loginByGoogle}
    //                     isLoading={isGoogleAuthLoading}
    //                     disabled={isAuthLoading || isFacebookAuthLoading}
    //                 >
    //                     {t('login.button.signIn.social', {what: 'Google'})}
    //                 </Button>
    //             </div>
    //             <p className="mb-1">
    //                 <Link to="/forgot-password">
    //                     {t('login.label.forgotPass')}
    //                 </Link>
    //             </p>
                  
        //         </div>
        //     </div>
        // </div>
        <>
            <div className={classes.container}>
                <div>
                    <img src={logoNokia2} style={{position:"absolute",height:120,width:200}}/>
                </div>
                <div
                    style={{ flex: '0 1 580px', display: 'flex', alignItems: 'center' }}
                >
                    <Row
                        style={{
                            width: '100%',
                            backgroundImage: `url('${mapLogin}')`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center left 190px',
                  
                            justifyContent:"flex-end",
                            display:"flex"
                        
                        }}
                     
                    >
                        <Col flex='450px' className={classes.leftLayout}>
                            <div className={classes.leftInner} >
                                <Col className="gutter-row" xl={24} xs={24} sm={24}  style={{display:"flex",justifyContent:"flex-start",marginBottom:10}} >
                                    <img src={logoNokia} style={{height:30,width:110}}/>
                                </Col>
                                
                                <Typography
                                    style={{
                                        fontWeight: 500,
                                        fontSize: '15px',
                                        lineHeight: '16px',
                                        color: '#1c4598',
                                        marginBottom: 10
                                    }}
                                >
                                    Please Login to Your Account
                                </Typography>
                                
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        formik.handleSubmit
                                        login();
                                    }}
                                >
                                    <LoginField
                                        placeholder='Username/email'
                                        type='text'
                                        // icon={isError ? <img src={mailRed} /> : <MailGrey />}
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                        isBtnDisabled
                                        formik={formik}
                                        formikFieldProps={formik.getFieldProps(
                                            'username'
                                        )}
                                        error={isErrorUserName}
                                        helperText={emailHelperText}
                                    />
                                    <LoginField
                                        placeholder='Password'
                                        type={isVisible ? 'text' : 'password'}
                                        formik={formik}
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={Password}
                                        isBtnDisabled={Password.length == 0}
                                        onBtnClick={(e) => setIsVisible(!isVisible)}
                                        formikFieldProps={formik.getFieldProps(
                                            'Password'
                                        )}
                                        error={isErrorPassword}
                                        helperText={passHelperText}
                                    />
                                    
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: 18,
                                        }}
                                    >
                                        <Row gutter={24} style={{display:'flex',width:"100%"}}>
                                            <Col className="gutter-row" xl={12} sm={12} xs={12}  >
                                                <div>
                                                    <Typography
                                                        style={{
                                                            fontWeight: 500,
                                                            fontSize: '13px',
                                                            lineHeight: '16px',
                                                            color: '#1c4598',
                                                        }}
                                                    >
                                                        Forgot Password
                                                    </Typography>
                                                </div>
                                            </Col>
                                            <Col className="gutter-row" xl={12} sm={12} xs={12} style={{display:"flex",justifyContent:"flex-end",marginBottom:10}} >
                                                <div>
                                                    {isAuthLoading ? (     <Spin 
                                                    />):( <Button
                                                        classes={{
                                                            root: classes.btnRoot,
                                                            label: classes.btnLabel,
                                                            disabled: classes.btnDisabled,
                                                        }}
                                                        type='submit'
                                                        
                                                        // disabled={isBtnDisabled}
                                                    >
                                                        {/* {isAuthLoading ? (<Spinner/>):("Login")} */}
                                                    Login
                                                    </Button>)}
                                                
                                       
                                           
                                                </div>
                                            </Col>
                                            {/*                                          
                                            <Col className="gutter-row" xl={24} xs={24} sm={24}  style={{display:"flex",justifyContent:"flex-end",marginLeft:10,marginTop:20}} >
                                                <img src={logoNokia} style={{height:50,width:130}}/>
                                            </Col>
                                           */}
                                           
                                        </Row>
                                      
                                    </div>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Typography className={classes.copyright}>
            Copyright 2022 | NOKIA BORN 
                </Typography>
            </div>
            {/* <ModalLoader isOpen={isModalOpen} /> */}
        </>
    );
};

export default Login;

const LoginField = ({
    placeholder,
    icon,
    type,
    value,
    onChange,
    onBtnClick,
    isBtnDisabled,
    error,
    formik,
    formikFieldProps,
    helperText,
}) => {
    const classes = useStyles();
    return (
        <FormControl     formik={formik} formikFieldProps={formikFieldProps} error={error} fullWidth style={{ marginBottom: 40 }}>
            <OutlinedInput
            
                {...{ type, placeholder, value, onChange, error }}
                classes={{ root: classes.inputText }}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton onClick={onBtnClick} disabled={isBtnDisabled}>
                            {icon}
                        </IconButton>
                    </InputAdornment>
                }
            />
            {error && helperText && (
                <FormHelperText style={{ color: "red" }}>
                    {helperText}
                </FormHelperText>
            )}
      
        </FormControl>
    );
};

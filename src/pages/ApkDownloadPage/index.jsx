import React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Space} from "antd"
import Divider from '@mui/material/Divider';
import AndroidIcon from '@mui/icons-material/Android';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import API from '@app/utils/apiServices';
import {AndroidFilled} from "@ant-design/icons"
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Footer from "../../modules/main/footer/Footer"


export default function ApkDownload() {
    const [linkApk,setLinkApk] = useState("")

    function getLatestApk() {
  
        API.getApkLink().then(
            result=>{
                setLinkApk(result[0]);
            
                console.log("Link Download =>",result);
            }
        )
    }

    const handleDownloadApk = () => {
        window.location.href = linkApk.appDownloadUrl
        console.log(linkApk.appDownloadUrl,"this is link")
        
    }
    const handleNavigateLogin = () => {
        window.location.href = "/login"
        console.log(linkApk.appDownloadUrl,"this is link")
        
    }

    useEffect(() => {
        getLatestApk();
    
    },[])

    return (
        <div >
              
     
          
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ backgroundColor: "#004b98" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >

                        </IconButton>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        BORN NOKIA XL
                        </Typography>
                        <Button onClick={handleNavigateLogin} variant="outlined" color="inherit">Sign In</Button>
                    </Toolbar>
                </AppBar>
            </Box>
              
              
            
            <Grid container  justifyContent="space-between"
                alignItems="center">
                <Grid item xs={12} sm={7}>
                    <Box sx={{
                        // width: 700,
                        // height: 300,
                        margin:10,
                        paddingLeft:3,
                        paddingRight:2,
                        paddingTop:2,
                        paddingBottom:10,
                        border:3,
                        borderColor:"#004b98",
                        backgroundColor: '#ffffff',
                        
                    }}>
                        <Grid container  >
                            <Grid item sm={12} display="flex" alignItems="center"
                                sx={{
                                // width: 700,
                                // height: 300,
                                    marginBottom:4,
                                    
                            
                                
                                }}
                            >
                                <Typography style={{fontSize:20,color:"black",fontWeight:"800"}}>Minimum Requirement :</Typography>
                            </Grid>
                            <Grid item sm={12} display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography style={{color:"black",fontSize:18}}>1.   Only Field Engineer Require to Install this Application</Typography>
                            </Grid>
                            <Grid item sm={12} display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography style={{color:"black",fontSize:18}}>2.   Android Oreo or higher Version</Typography>
                            </Grid>
                            <Grid item sm={12} display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography style={{color:"black",fontSize:18}}>3.   Ram 3 GB or Higher</Typography>
                            </Grid>
                            <Grid item sm={12} display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography style={{color:"black",fontSize:18}}>4.   Camere 5 MP</Typography>
                            </Grid>
                            <Grid item sm={12} display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography style={{color:"black",fontSize:18}}>5.   Storage 1 GB</Typography>
                            </Grid>
                        </Grid>

                        
                        
                    </Box>
                    
                </Grid>
              
                <Grid item sm={4} xs={12} display="flex" align="center">
                    <Box display="flex" alignItem="center" direction="column" sx={{
                        width: 330,
                        height:  80,
                        marginLeft:4,
                        padding:4,
                        borderRadius:5,
                        borderColor:"#004b98",
                        backgroundColor: '#004b98',
                        '&:hover': {
                            backgroundColor: 'green',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}>
                        
                        <Button onClick={handleDownloadApk}>
                            <Grid container xs={1}sm={1} >
                                <Grid item xs={4} sm={2} display="flex" justifyContent="center" alignItems="center">
                                    <Typography style={{fontSize:20,color:"white"}}><AndroidFilled style={{fontSize:44,color:"#ffff"}}/></Typography>
                                </Grid>
                            </Grid>
                            
                            <Grid container  sm={12}>
                                <Grid item xs={12} sm={12} display="flex" justifyContent="center" alignItems="center">
                                    <Typography style={{fontSize:18,color:"white"}}>Download Latest APK</Typography>
                                </Grid>
                          
                             
                          
                                <Grid item sm={12} xs={12}  display="flex" justifyContent="center" alignItems="center">
                                    <Typography style={{color:"white"}}>{`(${linkApk.versionName})`}</Typography>
                                </Grid>
                            </Grid>
                       
                            
                        </Button>
                      
                    </Box>
                </Grid>
            </Grid>
    
            
                
             
           
        
        </div>
       

    );
}

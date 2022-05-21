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
import API from '@app/utils/apiServices';

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
              
            
            <Grid container  justifyContent="space-evenly"
                alignItems="center">
                <Grid item sm={7}>
                    <Box sx={{
                        width: 700,
                        height: 300,
                        margin:8,
                        padding:3,
                        border:2,
                        borderColor:"#004b98",
                        backgroundColor: 'white',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}>
                        <Grid container  >
                            <Grid item sm={12} display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography style={{fontSize:18,color:"black",fontWeight:"800"}}>Minimum Requirement</Typography>
                            </Grid>
                            <Grid item sm={12} display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography style={{color:"black"}}>1. Only Field Engineer Require to Install this Application</Typography>
                            </Grid>
                            <Grid item sm={12} display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography style={{color:"black"}}>2. Android Oreo or higher Version</Typography>
                            </Grid>
                            <Grid item sm={12} display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography style={{color:"black"}}>3. Ram 3 GB or Higher</Typography>
                            </Grid>
                            <Grid item sm={12} display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography style={{color:"black"}}>4. Camere 5 MP</Typography>
                            </Grid>
                            <Grid item sm={12} display="flex" justifyContent="flex-start" alignItems="center">
                                <Typography style={{color:"black"}}>5. Storage 1 GB</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
              
                <Grid item sm={5}>
                    <Box display="flex" justifyContent="center" direction="column" sx={{
                        width: 300,
                        height:  80,
                        margin:8,
                        padding:2,
                        borderRadius:5,
                        borderColor:"#004b98",
                        backgroundColor: '#004b98',
                        '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}>
                        <Button onClick={handleDownloadApk}>
                            <Grid container  >
                                <Grid item sm={12} display="flex" justifyContent="center" alignItems="center">
                                    <Typography style={{fontSize:18,color:"white"}}>Download Latest APK</Typography>
                                </Grid>
                                <Grid item sm={12} display="flex" justifyContent="center" alignItems="center">
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

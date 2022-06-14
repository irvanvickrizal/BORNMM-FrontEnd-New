/* eslint-disable no-lone-blocks */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable import/no-duplicates */
import L from "leaflet";
import { divIcon } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "./map.css"
import markerIcon from "./logoXL.png"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { useSelector } from "react-redux";
import {Col,Space,Row,Typography} from "antd"
import {Divider} from "@material-ui/core";
  



const createRoutineMachineLayer = (waypoints) => {

    const currentLat = useSelector(state=>state.transportTaskTrackingReducer?.dataLonglat[0]?.currLatitude)
    const currentLong = useSelector(state=>state.transportTaskTrackingReducer?.dataLonglat[0]?.currLongitude)
    const siteLat = useSelector(state=>state.transportTaskTrackingReducer?.dataLonglat[0]?.siteLatitude)
    const siteLong = useSelector(state=>state.transportTaskTrackingReducer?.dataLonglat[0]?.siteLongitude)
    const dataLocation = useSelector(state=>state.transportTaskTrackingReducer?.dataLonglat[0])

    const iconMarkup = renderToStaticMarkup(
        <Row gutter={24}>
            <Col className="gutter-row"  xs={24} xl={12} align="middle">
                {currentLong >= siteLong ? (<LocalShippingIcon style={{color:"#243dcb",fontSize:35,transform: 'rotateY(180deg)'}} />):(<LocalShippingIcon style={{color:"#243dcb",fontSize:35}} />)}
                
            </Col>
       
        
        </Row>
    )
           
      
    const customMarkerIcon = divIcon({
        html: iconMarkup,
        className: 'dummy',
        iconSize: [50, 40],
    });

    const iconMarkup2= renderToStaticMarkup(
        <Row gutter={24} >
            <Col  xs={24} xl={6} align="middle">
               
            </Col>
            <WarehouseIcon style={{color:"#243dcb",fontSize:35,  borderBottomWidth: 5, }} />

            <Col   xs={24} xl={18} 
                style={{backgroundColor:"white",borderRadius:8,borderColor:"red"}}>
                <div style={{padding:4}}>
              
                    
                    <Typography style={{fontSize:8,fontWeight:"600"}}>Site No : {dataLocation?.siteNo}</Typography>
                    <Divider  sx={{ borderBottomWidth: 8 }}/>
                    <Typography  style={{fontSize:8,fontWeight:"600"}}>Site Name : {dataLocation?.siteName}</Typography>
                    
                 
                </div>
             
              
            </Col>
    
        </Row>);
    const customMarkerIcon2 = divIcon({
        html: iconMarkup2,
        className: 'dummy',
        iconSize: [200, 35],
    });

    
  

    const instance = L.Routing.control({
     
        waypoints: [
            // L.latLng(-7.409518, 107.188919),
            // L.latLng(-6.914744, 107.609810)
            L.latLng(currentLat,currentLong),
            L.latLng(siteLat, siteLong)
        ],
        createMarker: function(i, wp, nWps) {
          
            if (i === 1 || i === nWps - 1) {
                return L.marker(wp.latLng);
            } 
            return L.marker(wp.latLng, {icon: customMarkerIcon });
            
        },
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        
        // show: false,
        // addWaypoints: false,
        // routeWhileDragging: true,
        // draggableWaypoints: true,
        // fitSelectedRoutes: true,
        // showAlternatives: false
        show: true,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        collapsible: false
        
        
    });
    

    return instance;
};


const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;

/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
import React,{useEffect,useState,useRef} from 'react'
import {Table,Tooltip,Space,Row,Modal,Card,Typography} from "antd"
import Search from '@app/components/searchcolumn/SearchColumn'
import RoomIcon from '@mui/icons-material/Room';
import { MapContainer, TileLayer, Marker, Popup,useMapEvent } from 'react-leaflet'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import L, { divIcon } from "leaflet";



const markerIcon = new L.Icon({

    iconUrl: require("../../assets/marker/iconMarker1.png"),
    iconSize: [65,75]
})


export default function TableSite() {
    const page=1
    const [mapLocation,setMapLocation] = useState([])
    const [isModalVisible,setIsModalVisible] = useState(false)

    const [zoom, setZoom] = useState("");

    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window
        return { width, height }
    }

    const useWindowDimensions = () => {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
 
        useEffect(() => {
            const handleResize = () => setWindowDimensions(getWindowDimensions())
 
            window.addEventListener('resize', handleResize)
 
            return () => window.removeEventListener('resize', handleResize)
 
        }, [])
 
        return windowDimensions
    }

    const { width } = useWindowDimensions();

    const handleClick = (record) => {
        setZoom(10);
    
        console.log(zoom, "Sasd");
    };

 
    const animateRef = useRef(false)
    
    const Data = [
        {
            id:1,
            site:"DOP",
            category:"SDR",
            materialCode:"MM-XLMN-01",
            materialDesc:"Item Based",
            origin:"Site",
            location:"Semarang",
            longLat:[-6.966667,110.416664]
 
        },
        {
            id:2,
            site:"DOP",
            category:"SDR",
            materialCode:"MM-XLMN-02",
            materialDesc:"Item Based",
            origin:"Site",
            location:"Padang",
            longLat:[-0.94924,100.35427]
 
        },
        {
            id:3,
            site:"DOP",
            category:"SDR",
            materialCode:"MM-XLMN-03",
            materialDesc:"Item Based",
            origin:"Site",
            location:"Jakarta",
            longLat:[-6.200000,106.816666],
 
        },
    ]

    const showModal = (data) => {
        setMapLocation(data.longLat)
        setIsModalVisible(true)
        setZoom(8)
        console.log(mapLocation,"<= this is data parsing")
    }

    const hideModal = () => {
        setIsModalVisible(false)
    }

    const columns = [
        {
            title: "No",
            key: "index",
            render: (value, item, index) => page + index
        },
        {
            title: "Category",
            dataIndex: "site",
            ...Search("site")
        },
        {
            title: "Item Code",
            dataIndex: "materialCode",
            ...Search("materialCode")
        },

        {
            title: "Item Desc",
            dataIndex: "materialDesc",
            ...Search("materialDesc")
        },
        {
            title: "Site Location",
            dataIndex: "location"
        },
        {
            title: "Action",
            render:(record)=>{
                return (
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Space>
                            <Tooltip title="View Location">
                                <RoomIcon style={{color:"red"}} onClick={()=>{showModal(record)}}/>
                            </Tooltip>
                        </Space>
                       
                    </div>
                )
            },
         
        },
    ]
   
    useEffect(() => {
      
        setZoom(4);
    }, [zoom]);
    
    return (
        <div>
            <Table
                columns={columns}
                dataSource={Data}
                size="small"
            />
           
            <Modal visible={isModalVisible} onCancel={hideModal}
                style={{ width: (90 * width / 100), minWidth: (80 * width / 100) }}
            >
                <Card>
                    <MapContainer center={mapLocation} zoom={zoom} style={{width:"75vw",height:"80vh"}}
                        scrollWheelZoom={false}
                   
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                 
                       
                        {Data.map((e,idx)=> 
                            <Marker position={e.longLat}
                                
                                eventHandlers={{
                                    click: (record) => {
                                        handleClick(record)
                                    },}}
                                
                            
                                key={idx}
                            >
                                <Popup>
                                    <Typography>
                                        <ul>
                                            <li>{e.location}</li>
                                            <li>{e.origin}</li>
                                        </ul>
                                    </Typography>
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </Card>
            </Modal>
        </div>
    )
}

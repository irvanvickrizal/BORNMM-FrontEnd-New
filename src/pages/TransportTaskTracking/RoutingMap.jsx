import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = (props) => {
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(-6.200000,106.816666),
            L.latLng(-6.914744, 107.609810)
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        // show: false,
        // addWaypoints: false,
        // routeWhileDragging: true,
        // draggableWaypoints: true,
        // fitSelectedRoutes: true,
        // showAlternatives: false
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
        
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;

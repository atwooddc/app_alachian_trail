import { React, useState, useRef } from "react";
import OpenLayersMap from "../components/OpenLayersMap.js";
import Sidebar from "../components/Sidebar.js";
import { MapContext } from "../context/MapContext.js";

const MapPage = () => {
    const [data, setData] = useState({
        day: 0,
        date: "",
        mileage: 0.0,
        totalDist: 0.0,
        start: "",
        end: "",
        lodging: "",
        town: "",
        // xcoord: 0.0,
        // ycoord: 0.0,
    });

    const mapRef = useRef();

    return (
        <MapContext.Provider value={mapRef}>
            <OpenLayersMap setData={setData} ref={mapRef} />
            <Sidebar data={data} setData={setData} />
        </MapContext.Provider>
    );
};

export default MapPage;

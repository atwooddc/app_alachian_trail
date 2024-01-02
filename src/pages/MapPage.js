import { React, useState, useRef } from "react";
import OpenLayersMap from "../components/OpenLayersMap.js";
import Sidebar from "../components/Sidebar.js";
import GitHubButton from "../components/GitHubButton.js";
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
    });

    const mapRef = useRef();

    return (
        <MapContext.Provider value={mapRef}>
            <OpenLayersMap setData={setData} ref={mapRef} />
            <GitHubButton />
            <Sidebar data={data} setData={setData} />
        </MapContext.Provider>
    );
};

export default MapPage;

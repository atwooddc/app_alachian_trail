import { React, useState } from "react";
import OpenLayersMap from "../components/OpenLayersMap.js";
import Sidebar from "../components/Sidebar.js";

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
    return (
        <div className="map-page">
            <OpenLayersMap setData={setData} />
            <Sidebar data={data} setData={setData} />
        </div>
    );
};

export default MapPage;

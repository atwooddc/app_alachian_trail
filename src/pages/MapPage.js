import React, { useState } from "react";
import OpenLayersMap from "../components/OpenLayersMap.js";
import Sidebar from "../components/Sidebar.js";

const DATA = [
    {
        day: 0,
        state: "error",
        mileage: -1.0,
        elev: -1,
        entry: "error.",
    },
    {
        day: 1,
        state: "GA",
        mileage: 13.1,
        elev: 2100,
        entry: "had a fun hike.",
    },
    { day: 2, state: "PA", mileage: 15.6, elev: 1150, entry: "it rained." },
    { day: 3, state: "ME", mileage: 19.4, elev: 2200, entry: "almost done!" },
];

const MapPage = () => {
    const [day, setDay] = useState(0);

    return (
        <div className="map-page">
            <OpenLayersMap day={day} changeDay={setDay} />
            <Sidebar data={DATA} day={day} changeDay={setDay} />
        </div>
    );
};

export default MapPage;

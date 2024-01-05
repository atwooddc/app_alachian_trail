import { React, useState, useRef, useEffect } from "react";
import OpenLayersMap from "../components/OpenLayersMap.js";
import Sidebar from "../components/Sidebar.js";
import GitHubButton from "../components/GitHubButton.js";
import { MapContext } from "../context/MapContext.js";

import Papa from "papaparse";
import csvFile from "../test_data/glenn_at_data_1_5.csv";

const MapPage = () => {
    // const [data, setData] = useState({
    //     day: 0,
    //     date: "",
    //     mileage: 0.0,
    //     totalDist: 0.0,
    //     start: "",
    //     end: "",
    //     lodging: "",
    //     town: "",
    // });

    const [day, setDay] = useState(0);
    const [data, setData] = useState(null);

    const mapRef = useRef();

    const parseCsvData = (setData) => {
        Papa.parse(csvFile, {
            download: true,
            header: true,
            complete: (results) => {
                const dataMap = new Map();
                results.data.forEach((row) => {
                    dataMap.set(parseInt(row.day, 10), row);
                });
                setData(dataMap);
            },
        });
    };

    useEffect(() => {
        parseCsvData(setData);
    }, []);

    return (
        <MapContext.Provider value={mapRef}>
            <OpenLayersMap setDay={setDay} data={data} ref={mapRef} />
            <GitHubButton />
            <Sidebar day={day} setDay={setDay} data={data} />
        </MapContext.Provider>
    );
};

export default MapPage;

import { React, useState, useRef, useEffect } from "react";
import OpenLayersMap from "../components/OpenLayersMap.js";
import Sidebar from "../components/Sidebar.js";
import GitHubButton from "../components/GitHubButton.js";
import { MapContext } from "../context/MapContext.js";
import RecenterButton from "../components/RecenterButton.js";
import ZoomSwitch from "../components/ZoomSwitch.js";

const MapPage = () => {
    const [day, setDay] = useState(0);
    const [data, setData] = useState(null);
    const [autoZoom, setAutoZoom] = useState(true);

    const mapRef = useRef();

    const getZoomLevel = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const ratio = width / height;
        if (ratio < 2 / 3) return 8.5; // Smaller devices
        if (ratio < 4 / 3) return 10; // Medium devices
        return 11; // Larger devices (default)
    };

    const [autoZoomLevel, setAutoZoomLevel] = useState(getZoomLevel());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://gic2p2iycjqo7z7rqebkho2wpe0verbz.lambda-url.us-east-2.on.aws/"
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <MapContext.Provider value={mapRef}>
            <OpenLayersMap
                day={day}
                setDay={setDay}
                data={data}
                autoZoom={autoZoom}
                autoZoomLevel={autoZoomLevel}
            />
            <GitHubButton />
            <RecenterButton />
            <ZoomSwitch autoZoom={autoZoom} setAutoZoom={setAutoZoom} />
            <Sidebar
                day={day}
                setDay={setDay}
                data={data}
                autoZoom={autoZoom}
                autoZoomLevel={autoZoomLevel}
            />
        </MapContext.Provider>
    );
};

export default MapPage;

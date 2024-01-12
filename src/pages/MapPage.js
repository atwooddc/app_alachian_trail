import { React, useState, useRef, useEffect } from "react";
import OpenLayersMap from "../components/OpenLayersMap.js";
import Sidebar from "../components/Sidebar.js";
import GitHubButton from "../components/GitHubButton.js";
import { MapContext } from "../context/MapContext.js";
import RecenterButton from "../components/RecenterButton.js";

const MapPage = () => {
    const [day, setDay] = useState(0);
    const [data, setData] = useState(null);

    const mapRef = useRef();

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
                console.log(json);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <MapContext.Provider value={mapRef}>
            <OpenLayersMap day={day} setDay={setDay} data={data} ref={mapRef} />
            <GitHubButton />
            <RecenterButton />
            <Sidebar day={day} setDay={setDay} data={data} />
        </MapContext.Provider>
    );
};

export default MapPage;

import { React, createRef } from "react";
import OpenLayersMap from "../components/OpenLayersMap.js";
import Sidebar from "../components/Sidebar.js";
import GitHubButton from "../components/GitHubButton.js";
// import { MapRefProvider } from "../context/MapRefContext.js";
import { MapRefContext } from "../context/MapRefContext.js";
import { DataProvider } from "../context/DataContext.js";
import { LegProvider } from "../context/LegContext.js";
import { ZoomProvider } from "../context/ZoomContext.js";
import RecenterButton from "../components/RecenterButton.js";
import ZoomSwitch from "../components/ZoomSwitch.js";

const MapPage = () => {
    const mapRef = createRef();
    return (
        // <MapRefProvider>
        <MapRefContext.Provider value={mapRef}>
            <ZoomProvider>
                <DataProvider>
                    <LegProvider>
                        <OpenLayersMap />
                        <GitHubButton />
                        <RecenterButton />
                        <ZoomSwitch />
                        <Sidebar />
                    </LegProvider>
                </DataProvider>
            </ZoomProvider>
        </MapRefContext.Provider>
        // </MapRefProvider>
    );
};

export default MapPage;

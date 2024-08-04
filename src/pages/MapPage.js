import React from "react";
import OpenLayersMap from "../components/OpenLayersMap.js";
import Sidebar from "../components/Sidebar.js";
import GitHubButton from "../components/GitHubButton.js";
import { MapRefProvider } from "../context/MapRefContext.js";
import { DataProvider } from "../context/DataContext.js";
import { LegProvider } from "../context/LegContext.js";
import { ZoomProvider } from "../context/ZoomContext.js";
import RecenterButton from "../components/RecenterButton.js";
import ZoomSwitch from "../components/ZoomSwitch.js";
import OnThisDayButton from "../components/OnThisDayButton.js";

const MapPage = () => {
    return (
        <MapRefProvider>
            <ZoomProvider>
                <DataProvider>
                    <LegProvider>
                        <OpenLayersMap />
                        <GitHubButton />
                        <RecenterButton />
                        <ZoomSwitch />
                        <OnThisDayButton />
                        <Sidebar />
                    </LegProvider>
                </DataProvider>
            </ZoomProvider>
        </MapRefProvider>
    );
};

export default MapPage;

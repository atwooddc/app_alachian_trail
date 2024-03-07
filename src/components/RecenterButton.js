import React, { useContext } from "react";
import "./RecenterButton.css";

import { Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { MyLocation } from "@mui/icons-material";
// import useMapRefContext from "../context/MapRefContext";
import { MapRefContext } from "../context/MapRefContext";
import { boundingExtent } from "ol/extent";
import { fromLonLat } from "ol/proj";

const RecenterButton = () => {
    // const mapRef = useMapRefContext();
    const mapRef = useContext(MapRefContext);

    const recenterMap = () => {
        if (mapRef.current) {
            const extent = boundingExtent([fromLonLat([-76.18, 40.49])]);
            mapRef.current.ol.getView().fit(extent, {
                duration: 3000,
                maxZoom: 5.7,
            });
        }
    };
    return (
        <Paper className="recenter-button desktop">
            <IconButton onClick={recenterMap}>
                <MyLocation />
            </IconButton>
        </Paper>
    );
};

export default RecenterButton;

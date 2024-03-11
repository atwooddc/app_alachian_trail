import React from "react";

import { Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { MyLocation } from "@mui/icons-material";
import { useMapRefContext } from "../context/MapRefContext";
import { boundingExtent } from "ol/extent";
import { fromLonLat } from "ol/proj";

const RecenterButton = () => {
    const mapRef = useMapRefContext();

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
        <Paper
            className="recenter-button desktop"
            sx={{
                height: "40px",
                width: "40px",
                position: "absolute",
                bottom: "65px",
                left: "20px",
                padding: 0,
                zIndex: 1000,
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
        >
            <IconButton onClick={recenterMap}>
                <MyLocation />
            </IconButton>
        </Paper>
    );
};

export default RecenterButton;

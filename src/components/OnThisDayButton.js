import React, { useEffect, useState } from "react";
import { boundingExtent } from "ol/extent";
import { Button } from "@mui/material";
import { useMapRefContext } from "../context/MapRefContext";
import { useDataContext } from "../context/DataContext";
import { useLegContext } from "../context/LegContext";

const OnThisDayButton = () => {
    const mapRef = useMapRefContext();
    const data = useDataContext();
    const [leg, setLeg] = useLegContext();
    const [showButton, setShowButton] = useState(false);
    const isAutoZoom = true;
    const autoZoomLevel = 12;

    useEffect(() => {
        if (!data) {
            return;
        }

        const today = new Date();
        const monthDay = `${today.getMonth() + 1}-${today.getDate()}`;
        console.log("monthDay:", monthDay);
        console.log("date type:", data[1].date.slice(5));

        const dateExists = Object.values(data).some((d) => {
            return d.date.slice(5) === monthDay;
        });

        if (dateExists) {
            setShowButton(true);
        }
    }, [data]);

    const changeMapView = (newLeg) => {
        if (isAutoZoom) {
            const legData = data[newLeg];
            if (legData && mapRef.current) {
                const x = legData.x;
                const y = legData.y;
                const coords = [[x, y]];
                const extent = boundingExtent(coords);
                mapRef.current.ol.getView().fit(extent, {
                    duration: 1000,
                    maxZoom: autoZoomLevel,
                });
            }
        }
    };

    const updateToToday = () => {
        if (!data || Object.keys(data).length === 0) {
            console.error("Data is not defined or empty:", data);
            return;
        }

        const today = new Date();
        const monthDay = `${today.getMonth() + 1}-${today.getDate()}`;
        const legKey = Object.keys(data).find((key) => {
            return data[key].date.slice(5) === monthDay;
        });

        if (legKey) {
            setLeg(parseInt(legKey));
            changeMapView(parseInt(legKey));
        }
    };

    return (
        <Button
            className="desktop"
            onClick={updateToToday}
            disabled={!showButton}
            sx={{
                height: "40px",
                width: "136.43px",
                position: "absolute",
                bottom: "20px",
                left: "20px",
                padding: 0,
                zIndex: 1000,
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                    backgroundColor: "lightgrey"
                }
            }}
        >
            On This Day...
        </Button>
    );
};

export default OnThisDayButton;

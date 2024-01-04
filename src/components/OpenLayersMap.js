import { React, useState, useCallback, useContext } from "react";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";

import { RMap, RLayerVector, RStyle, ROverlay, RFeature } from "rlayers";
import RLayerStadia from "rlayers/layer/RLayerStadia";
import { MapContext } from "../context/MapContext";

import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const center = fromLonLat([-76.17, 41.76]);

const useStyles = makeStyles((theme) => ({
    popUp: {
        minWidth: "105px",
        width: "flex",
        padding: "10px 10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        fontFamily: "Futura",
        color: "#11151C",
    },
}));

const OpenLayersMap = ({ setData }) => {
    const classes = useStyles();
    const [currentSection, setCurrentSection] = useState(null);
    const [currentStop, setCurrentStop] = useState(null);

    const mapRef = useContext(MapContext);

    return (
        <RMap
            ref={mapRef}
            width={"100%"}
            height={"100vh"}
            initial={{
                center: center,
                zoom: 5.5,
            }}
        >
            <RLayerStadia layer="outdoors" />

            <RLayerVector
                zIndex={5}
                format={new GeoJSON({ featureProjection: "EPSG:3857" })}
                url="https://raw.githubusercontent.com/atwooddc/at_geojson/main/glenn_at_trek_12_17.geojson"
                onPointerEnter={useCallback(
                    (e) => setCurrentSection(e.target),
                    []
                )}
                onPointerLeave={useCallback(
                    (e) =>
                        currentSection === e.target && setCurrentSection(null),
                    [currentSection]
                )}
                onClick={(e) => {
                    e.map.getView().fit(e.target.getGeometry().getExtent(), {
                        duration: 1000,
                        maxZoom: 11,
                    });
                    setData(e.target.getProperties());
                }}
            >
                <RStyle.RStyle>
                    <RStyle.RStroke color="#8A4942" width={2.5} />
                </RStyle.RStyle>
            </RLayerVector>

            <RLayerVector zIndex={10}>
                {currentSection ? (
                    <div>
                        <RFeature geometry={currentSection.getGeometry()}>
                            <ROverlay className="overlay" autoPosition={true}>
                                <Paper className={classes.popUp}>
                                    <Typography
                                        variant="p"
                                        fontWeight="bold"
                                        align="center"
                                    >
                                        Day {currentSection.get("day")}
                                    </Typography>
                                </Paper>
                            </ROverlay>
                        </RFeature>
                    </div>
                ) : null}
            </RLayerVector>

            <RLayerVector
                zIndex={10}
                maxResolution={350}
                format={new GeoJSON({ featureProjection: "EPSG:3857" })}
                url="https://raw.githubusercontent.com/atwooddc/at_geojson/main/glenn_at_shelters_12_24.geojson"
                onPointerEnter={useCallback(
                    (e) => setCurrentStop(e.target),
                    []
                )}
                onPointerLeave={useCallback(
                    (e) => currentStop === e.target && setCurrentStop(null),
                    [currentStop]
                )}
            >
                <RStyle.RStyle>
                    <RStyle.RCircle radius={10}>
                        <RStyle.RStroke color={"#92a38d"} width={5} />
                        <RStyle.RFill color={"#4a6741"} />
                    </RStyle.RCircle>
                </RStyle.RStyle>
            </RLayerVector>

            {/* shelter pop ups
            note: need to revise names of shelters in geojson */}
            {/* <RLayerVector zIndex={10}>
                {currentStop ? (
                    <div>
                        <RFeature geometry={currentStop.getGeometry()}>
                            <ROverlay className="overlay" autoPosition={true}>
                                <strong>{currentStop.get("Name")}</strong>
                            </ROverlay>
                        </RFeature>
                    </div>
                ) : null}
            </RLayerVector> */}
        </RMap>
    );
};

export default OpenLayersMap;

import { React, useState, useCallback, useContext } from "react";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";

import { RMap, RLayerVector, RStyle } from "rlayers";
import RLayerStadia from "rlayers/layer/RLayerStadia";
import { MapContext } from "../context/MapContext";
import { fetchDataForDay } from "../utils/dataUtils";

const center = fromLonLat([-76.17, 41.76]);

const OpenLayersMap = ({ setData }) => {
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

                    const day = e.target.get("day");

                    fetchDataForDay(day, setData);
                }}
            >
                <RStyle.RStyle>
                    <RStyle.RStroke color="#8A4942" width={2.5} />
                </RStyle.RStyle>
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
        </RMap>
    );
};

export default OpenLayersMap;

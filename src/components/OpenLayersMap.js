import { React, useState, useCallback, useContext } from "react";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";

import { RMap, RLayerVector, RStyle, ROverlay, RFeature } from "rlayers";
import RLayerStadia from "rlayers/layer/RLayerStadia";
import { MapContext } from "../context/MapContext";

import SectionPopUp from "./SectionPopUp";

import hikingIcon from "../img/hiking.png";
import mountainIcon from "../img/mountain.png";

const center = fromLonLat([-76.18, 40.49]);
const start = fromLonLat([-84.21433, 34.60862]);
const end = fromLonLat([-68.9215, 45.9044]);
const maxExtentCoords = [
    -11318965.82,
    3310893.22, // bottom-left corner
    -5397882.11,
    6423792.5, // top-right corner
];

const OpenLayersMap = ({ setDay, data }) => {
    const [currentSection, setCurrentSection] = useState(null);
    const [currentStop, setCurrentStop] = useState(null);

    const mapRef = useContext(MapContext);

    return (
        <RMap
            ref={mapRef}
            width={"100%"}
            height={"100vh"}
            noDefaultControls={true}
            extent={maxExtentCoords}
            initial={{
                center: center,
                zoom: 5.7,
            }}
        >
            <RLayerStadia layer="outdoors" />

            <RLayerVector
                zIndex={5}
                format={new GeoJSON({ featureProjection: "EPSG:3857" })}
                url="https://raw.githubusercontent.com/atwooddc/at_geojson/main/glenn_at_only_day.geojson"
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
                    setDay(e.target.get("day"));
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
                                {data[currentSection.get("day")].state ? (
                                    <SectionPopUp
                                        day={currentSection.get("day")}
                                        stateString={
                                            data[currentSection.get("day")]
                                                .state
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                            </ROverlay>
                        </RFeature>
                    </div>
                ) : null}
            </RLayerVector>

            <RLayerVector
                zIndex={10}
                maxResolution={650}
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

            <RLayerVector zIndex={1000}>
                <RStyle.RStyle>
                    <RStyle.RIcon src={hikingIcon} anchor={[0.8, 1.0]} />
                </RStyle.RStyle>
                <RFeature geometry={new Point(start)}></RFeature>
            </RLayerVector>

            <RLayerVector zIndex={1000}>
                <RStyle.RStyle>
                    <RStyle.RIcon src={mountainIcon} anchor={[0.5, 0.8]} />
                </RStyle.RStyle>
                <RFeature geometry={new Point(end)}></RFeature>
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

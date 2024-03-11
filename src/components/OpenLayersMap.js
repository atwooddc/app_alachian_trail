import { React, useState, useCallback, useEffect } from "react";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import { applyStyle } from "ol-mapbox-style";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";

import {
    RMap,
    RLayerVector,
    RLayerVectorTile,
    RLayerTile,
    RStyle,
    ROverlay,
    RFeature,
} from "rlayers";
import RLayerRasterMBTiles from "rlayers/layer/RLayerRasterMBTiles";
import RLayerStadia from "rlayers/layer/RLayerStadia";
import { useMapRefContext } from "../context/MapRefContext";
import { useDataContext } from "../context/DataContext";
import { useLegContext } from "../context/LegContext";
import { useZoomContext } from "../context/ZoomContext";

import { getCenter, getZoom } from "../utils/MapDefaults";

import SectionPopUp from "./SectionPopUp";

import hikingIcon from "../img/hiking.png";
import mountainIcon from "../img/mountain.png";

const start = fromLonLat([-84.21433, 34.60862]);
const end = fromLonLat([-68.9215, 45.9044]);
// const maxExtentCoords = [
//     -11318965.82,
//     3310893.22, // bottom-left corner
//     -5397882.11,
//     6423792.5, // top-right corner
// ];

const OpenLayersMap = () => {
    const mapRef = useMapRefContext();
    const data = useDataContext();
    const [leg, setLeg] = useLegContext();
    const [isAutoZoom, , autoZoomLevel] = useZoomContext();

    const [hoverSection, setHoverSection] = useState(null);
    // const [hoverStop, setHoverStop] = useState(null);

    const [center] = useState(getCenter());
    const [zoom] = useState(getZoom());

    // useEffect(() => {
    //     if (mapRef.current) {
    //         const map = mapRef.current.ol;
    //         const layers = map.getLayers().getArray();
    //         const layer = layers[0];
    //         console.log(layer);

    //         const styleUrl =
    //             "https://api.maptiler.com/maps/25c47bd0-60c9-42e5-bae0-401ec4ad316b/style.json?key=Jkc3jiUV3uJ2WHYoDX4S";

    //         applyStyle(layer, styleUrl)
    //             .then(() => {
    //                 console.log("MapTiler style applied successfully");
    //             })
    //             .catch((error) => {
    //                 console.error("Error applying MapTiler style:", error);
    //             });
    //     }
    // }, []);

    const legFeatureGeometry = () => {
        const map = mapRef.current.ol;
        const layers = map.getLayers().getArray();
        const layer = layers[2];
        const source = layer.getSource();
        const allFeatures = source.getFeatures();
        const legFeature = allFeatures.find((feature) => {
            return feature.get("leg") === leg;
        });

        return legFeature ? legFeature.getGeometry() : null;
    };

    return (
        <RMap
            ref={mapRef}
            width={"100%"}
            height={"100vh"}
            noDefaultControls={true}
            // extent={maxExtentCoords}
            initial={{
                center: center,
                zoom: zoom,
            }}
        >
            {/* basemap */}
            <RLayerStadia layer="outdoors" />
            {/* <RLayerVectorTile /> */}
            {/* <RLayerStadia layer="outdoors" /> */}
            {/* <RLayerStadia layer="stamen_terrain" /> */}

            {/* Map */}
            <RLayerVector
                zIndex={5}
                format={new GeoJSON({ featureProjection: "EPSG:3857" })}
                url="https://raw.githubusercontent.com/atwooddc/at_geojson/main/at_complete_day_and_leg.geojson"
                onPointerEnter={useCallback(
                    (e) => setHoverSection(e.target),
                    []
                )}
                onPointerLeave={useCallback(
                    (e) => hoverSection === e.target && setHoverSection(null),
                    [hoverSection]
                )}
                onClick={(e) => {
                    setLeg(e.target.get("leg"));
                    if (isAutoZoom) {
                        e.map
                            .getView()
                            .fit(e.target.getGeometry().getExtent(), {
                                duration: 1000,
                                maxZoom: autoZoomLevel,
                            });
                    }
                }}
            >
                <RStyle.RStyle>
                    <RStyle.RStroke color="black" width={2.5} />
                </RStyle.RStyle>
            </RLayerVector>

            {/* Hovered section */}
            <RLayerVector zIndex={10}>
                {hoverSection && (
                    <div>
                        <RFeature geometry={hoverSection.getGeometry()}>
                            <ROverlay className="overlay" autoPosition={true}>
                                {data[hoverSection.get("leg")].state ? (
                                    <SectionPopUp
                                        day={hoverSection.get("day")}
                                        stateString={
                                            data[hoverSection.get("leg")].state
                                        }
                                    />
                                ) : (
                                    <></>
                                )}
                            </ROverlay>
                        </RFeature>
                    </div>
                )}
                <RStyle.RStyle>
                    <RStyle.RStroke color="black" width={4} />
                </RStyle.RStyle>
            </RLayerVector>

            {/* Selected section */}
            <RLayerVector zIndex={10}>
                {leg ? (
                    <RFeature geometry={legFeatureGeometry()}>
                        <ROverlay
                            className="overlay"
                            autoPosition={true}
                        ></ROverlay>
                    </RFeature>
                ) : null}
                <RStyle.RStyle>
                    <RStyle.RStroke color="crimson" width={4} />
                </RStyle.RStyle>
            </RLayerVector>

            {/* <RLayerVector
                zIndex={10}
                maxResolution={650}
                format={new GeoJSON({ featureProjection: "EPSG:3857" })}
                url="https://raw.githubusercontent.com/atwooddc/at_geojson/main/glenn_at_shelters_12_24.geojson"
                onPointerEnter={useCallback((e) => setHoverStop(e.target), [])}
                onPointerLeave={useCallback(
                    (e) => hoverStop === e.target && setHoverStop(null),
                    [hoverStop]
                )}
            >
                <RStyle.RStyle>
                    <RStyle.RCircle radius={10}>
                        <RStyle.RStroke color={"#92a38d"} width={5} />
                        <RStyle.RFill color={"#4a6741"} />
                    </RStyle.RCircle>
                </RStyle.RStyle>
            </RLayerVector> */}

            {/* shelter pop ups
            note: need to revise names of shelters in geojson */}
            {/* <RLayerVector zIndex={10}>
                {currentStop && (
                    <div>
                        <RFeature geometry={currentStop.getGeometry()}>
                            <ROverlay className="overlay" autoPosition={true}>
                                <strong>{currentStop.get("Name")}</strong>
                            </ROverlay>
                        </RFeature>
                    </div>
                )}
            </RLayerVector> */}

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
        </RMap>
    );
};

export default OpenLayersMap;

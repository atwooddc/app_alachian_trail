import React, { useState, useCallback, useRef } from "react";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";
import { RMap, RLayerVector, RStyle, ROverlay, RFeature } from "rlayers";
import RLayerStadia from "rlayers/layer/RLayerStadia";
import { useMapRefContext } from "../context/MapRefContext";
import { useDataContext } from "../context/DataContext";
import { useLegContext } from "../context/LegContext";
import { useZoomContext } from "../context/ZoomContext";
import { getCenter, getZoom } from "../utils/MapDefaults";
import SectionPopUp from "./SectionPopUp";
import StopPopUp from "./StopPopUp";
import hikingIcon from "../img/hiking.png";
import mountainIcon from "../img/mountain.png";
import { Style, Circle as CircleStyle, Stroke, Fill } from "ol/style";

const start = fromLonLat([-84.21433, 34.60862]);
const end = fromLonLat([-68.9215, 45.9044]);

const defaultStyle = new Style({
    image: new CircleStyle({
        radius: 8,
        fill: new Fill({ color: "#4a6741" }),
        stroke: new Stroke({ color: "#92a38d", width: 4 }),
    }),
});

const hoverStyle = new Style({
    image: new CircleStyle({
        radius: 8,
        fill: new Fill({ color: "#4a6741" }),
        stroke: new Stroke({ color: "#92a38d", width: 6 }),
    }),
});

const OpenLayersMap = () => {
    const mapRef = useMapRefContext();
    const data = useDataContext();
    const [leg, setLeg] = useLegContext();
    const [isAutoZoom, , autoZoomLevel] = useZoomContext();
    const [hoverSection, setHoverSection] = useState(null);
    const [hoverStop, setHoverStop] = useState(null);
    const [center] = useState(getCenter());
    const [zoom] = useState(getZoom());

    const legFeatureGeometry = () => {
        const map = mapRef.current.ol;
        const layers = map.getLayers().getArray();
        const layer = layers[1];
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
            initial={{
                center: center,
                zoom: zoom,
            }}
        >
            <RLayerStadia layer="outdoors" />

            {/* Map */}
            <RLayerVector
                zIndex={5}
                format={new GeoJSON({ featureProjection: "EPSG:3857" })}
                url="https://raw.githubusercontent.com/atwooddc/at_gis/main/at_complete_day_and_leg.geojson"
                onPointerEnter={useCallback(
                    (e) => {
                        if (hoverStop == null) {
                            setHoverSection(e.target);
                        } else {
                            setHoverSection(null);
                        }
                    },
                    [hoverStop]
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
                                <SectionPopUp
                                    day={hoverSection.get("day")}
                                    stateString={
                                        data[hoverSection.get("leg")].state
                                    }
                                />
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

            {/* Hovered stop */}
            <RLayerVector
                zIndex={10}
                maxResolution={650}
                format={new GeoJSON({ featureProjection: "EPSG:4326" })}
                url="https://raw.githubusercontent.com/atwooddc/at_gis/main/at_stops.geojson"
                onPointerEnter={useCallback((e) => {
                    const feature = e.target;
                    feature.setStyle(null); // Clear any existing styles
                    feature.setStyle(hoverStyle); // Apply the hover style
                    setHoverStop(feature);
                }, [])}
                onPointerLeave={useCallback((e) => {
                    const feature = e.target;
                    feature.setStyle(null); // Clear any existing styles
                    feature.setStyle(defaultStyle); // Apply the default style
                    setHoverStop(null);
                }, [])}
            >
                <RStyle.RStyle>
                    <RStyle.RCircle radius={10}>
                        <RStyle.RStroke color={"#92a38d"} width={5} />
                        <RStyle.RFill color={"#4a6741"} />
                    </RStyle.RCircle>
                </RStyle.RStyle>
            </RLayerVector>

            {/* Shelter pop ups */}
            <RLayerVector zIndex={10}>
                {hoverStop && (
                    <div>
                        <RFeature geometry={hoverStop.getGeometry()}>
                            <ROverlay className="overlay" autoPosition={true}>
                                <StopPopUp leg={hoverStop.get("leg")} />
                            </ROverlay>
                        </RFeature>
                    </div>
                )}
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
        </RMap>
    );
};

export default OpenLayersMap;

import { React, useState } from "react";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import "ol/ol.css";

import { RMap, ROSM, RLayerVector, RFeature, RStyle } from "rlayers";
import locationIcon from "../location_icon.png";

export const days = {
    1: [-84, 35],
    2: [-77, 40],
    3: [-70, 44],
};

const center = fromLonLat([-76.56, 40.266]);
const OpenLayersMap = ({ setDay }) => {
    const [features] = useState(() =>
        Object.keys(days).map(
            (d) =>
                new Feature({
                    geometry: new Point(fromLonLat(days[d])),
                    day: d,
                })
        )
    );
    return (
        <RMap
            width={"100%"}
            height={"100vh"}
            initial={{ center: center, zoom: 5.5 }}
        >
            <ROSM />
            <RLayerVector zIndex={10}>
                <RStyle.RStyle>
                    <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
                </RStyle.RStyle>
                {features.map((f, i) => (
                    <RFeature
                        key={i}
                        feature={f}
                        onClick={(e) => {
                            e.map
                                .getView()
                                .fit(e.target.getGeometry().getExtent(), {
                                    duration: 1000,
                                    maxZoom: 8,
                                });
                            setDay(e.target.get("day"));
                        }}
                    />
                ))}
            </RLayerVector>
        </RMap>
    );
};

export default OpenLayersMap;

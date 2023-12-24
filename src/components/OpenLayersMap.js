import { React } from "react";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";

import { RMap, ROSM, RLayerVector } from "rlayers";

const center = fromLonLat([-76.17, 41.76]);

const OpenLayersMap = ({ setData }) => {
    return (
        <RMap
            width={"100%"}
            height={"100vh"}
            initial={{ center: center, zoom: 5.5 }}
        >
            <ROSM />
            <RLayerVector
                zIndex={15}
                format={new GeoJSON({ featureProjection: "EPSG:3857" })}
                url="https://raw.githubusercontent.com/atwooddc/at_geojson/main/glenn_at_trek_12_17.geojson"
                onClick={(e) => {
                    e.map.getView().fit(e.target.getGeometry().getExtent(), {
                        duration: 1000,
                        maxZoom: 12,
                    });
                    setData(e.target.getProperties());
                }}
            ></RLayerVector>
        </RMap>
    );
};

export default OpenLayersMap;

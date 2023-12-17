import { React } from "react";
import { fromLonLat } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import "ol/ol.css";

import { RMap, ROSM, RLayerVector, RStyle } from "rlayers";

const center = fromLonLat([-76.56, 40.266]);
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
                        maxZoom: 8,
                    });
                    setData({
                        day: e.target.get("day"),
                        date: e.target.get("date"),
                        mileage: e.target.get("mileage"),
                        totalDist: e.target.get("totalDist"),
                        start: e.target.get("start"),
                        end: e.target.get("end"),
                        lodging: e.target.get("lodging"),
                        town: e.target.get("town"),
                    });
                }}
            >
                <RStyle.RStyle>
                    <RStyle.RStroke color="#007bff" width={3} />
                </RStyle.RStyle>
            </RLayerVector>
        </RMap>
    );
};

export default OpenLayersMap;

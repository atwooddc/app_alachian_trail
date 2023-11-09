import React, { useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";

const OpenLayersMap = ({ day, changeDay }) => {
    useEffect(() => {
        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                // center: fromLonLat([-76.5600885, 40.2655785]), // calculated center of AT bounding box
                center: fromLonLat([-76, 40]),
                zoom: 5.5,
            }),
        });

        // Create a vector source and layer to hold features
        const vectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({
            source: vectorSource,
        });
        map.addLayer(vectorLayer);

        // Function to add a marker to the map
        const addMarker = (coordinates, day) => {
            const marker = new Feature({
                geometry: new Point(fromLonLat(coordinates)),
            });

            marker.set("day", day);

            // Example icon for the marker
            marker.setStyle(
                new Style({
                    image: new Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: "fraction",
                        anchorYUnits: "pixels",
                        src: "https://openlayers.org/en/latest/examples/data/icon.png", // Example icon URL
                    }),
                })
            );

            vectorSource.addFeature(marker);
        };

        // Add markers at specific coordinates
        addMarker([-84, 35], 1); // around s terminus
        addMarker([-77, 40], 2); // around middle in PA
        addMarker([-70, 44], 3); // around n terminus

        // Handle click events on the markers
        map.on("click", (e) => {
            map.forEachFeatureAtPixel(e.pixel, (feature) => {
                // Handle the click on a feature (marker)
                changeDay(feature.get("day"));
            });
        });

        return () => {
            map.setTarget(null);
        };
    });

    return <div id="map" style={{ width: "100%", height: "680px" }}></div>;
};

export default OpenLayersMap;

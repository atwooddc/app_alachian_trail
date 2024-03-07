import React from "react";

import { boundingExtent } from "ol/extent";
import { Grid, Typography } from "@mui/material";
import { formatDate } from "../../utils/FormatDate";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useMapRefContext } from "../../context/MapRefContext";

import { useDataContext } from "../../context/DataContext";
import { useLegContext } from "../../context/LegContext";
import { useZoomContext } from "../../context/ZoomContext";

const NavBar = () => {
    const mapRef = useMapRefContext();
    const data = useDataContext();
    const [leg, setLeg] = useLegContext();
    const [isAutoZoom, autoZoomLevel] = useZoomContext();

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

    const backLeg = () => {
        if (leg > 1) {
            const newLeg = leg - 1;
            if (data[newLeg]) {
                setLeg(newLeg);
                changeMapView(newLeg);
            }
        }
    };

    const nextLeg = () => {
        if (leg < 148) {
            const newLeg = leg + 1;
            if (data[newLeg]) {
                setLeg(newLeg);
                changeMapView(newLeg);
            }
        }
    };

    return (
        <>
            <Grid item xs={1} display="flex" justifyContent="center">
                <IconButton onClick={backLeg}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Grid>
            <Grid item xs={10}>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h6" marginRight={1}>
                        Day {data[leg].day}
                    </Typography>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Typography variant="overline" marginLeft={1}>
                        {formatDate(data[leg].date)}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={1} display="flex" justifyContent="center">
                <IconButton onClick={nextLeg}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Grid>
        </>
    );
};

export default NavBar;

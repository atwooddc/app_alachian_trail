import { React, useContext } from "react";

import { boundingExtent } from "ol/extent";
import { Grid, Typography } from "@mui/material";
import { formatDate } from "../../utils/FormatDate";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { MapContext } from "../../context/MapContext";

const NavBar = ({ day, data, setDay, autoZoom }) => {
    const mapRef = useContext(MapContext);

    const changeMapView = (newDay) => {
        if (autoZoom) {
            const dayData = data[newDay];
            if (dayData && mapRef.current) {
                const x = dayData.x;
                const y = dayData.y;
                const coords = [[x, y]];
                const extent = boundingExtent(coords);
                mapRef.current.ol.getView().fit(extent, {
                    duration: 1000,
                    maxZoom: 11,
                });
            }
        }
    };

    const backDay = () => {
        if (day > 1) {
            let newDay = day - 1;
            while (newDay > 1 && !data[newDay]) {
                --newDay;
            }
            if (data[newDay]) {
                setDay(newDay);
                changeMapView(newDay);
            }
        }
    };

    const nextDay = () => {
        if (day < 182) {
            let newDay = day + 1;
            while (newDay < 182 && !data[newDay]) {
                ++newDay;
            }
            if (data[newDay]) {
                setDay(newDay);
                changeMapView(newDay);
            }
        }
    };
    return (
        <>
            <Grid item xs={1} display="flex" justifyContent="center">
                <IconButton onClick={backDay}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Grid>
            <Grid item xs={10}>
                <Box display="flex" justifyContent="center">
                    <Typography variant="h6" marginRight={1}>
                        Day {day}
                    </Typography>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Typography variant="overline" marginLeft={1}>
                        {formatDate(data[day].date)}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={1} display="flex" justifyContent="center">
                <IconButton onClick={nextDay}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Grid>
        </>
    );
};

export default NavBar;

import { React, useContext } from "react";

import { boundingExtent } from "ol/extent";
import { Grid, Typography } from "@mui/material";
import { formatDate } from "../../utils/FormatDate";

import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import StateIndicator from "../StateIndicator";

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
            <Grid item xs={2}>
                {" "}
                <IconButton onClick={backDay}>
                    <ArrowBackIosNewIcon />
                </IconButton>
            </Grid>
            <Grid item xs={8} alignContent={"center"}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    minHeight={30}
                    marginTop={0.5}
                >
                    <Typography
                        variant="h5"
                        align="right"
                        marginBottom={0}
                        paddingBottom={0}
                        marginRight={1}
                    >
                        Day {day}
                    </Typography>
                    <StateIndicator stateString={data[day].state} />
                </Box>
            </Grid>
            <Grid item xs={2}>
                <IconButton onClick={nextDay}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Grid>

            <Grid item xs={12} textAlign={"center"}>
                <Typography variant="overline" align="center" paddingTop={0}>
                    {formatDate(data[day].date)}
                </Typography>
            </Grid>
        </>
    );
};

export default NavBar;

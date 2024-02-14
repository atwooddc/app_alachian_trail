import React from "react";

import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

import DayDate from "./sidebar/NavBar";
import ElevationChart from "./sidebar/ElevationChart";
import ProgressBar from "./sidebar/ProgressBar";
import BeginToEnd from "./sidebar/BeginToEnd";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        maxWidth: "350px",
        width: "flex",
        padding: "10px 20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        fontFamily: "Futura",
        color: "#11151C",
        maxHeight: "400px", // Adjust this value as needed
        overflowY: "auto", // Enables vertical scrolling
        borderRadius: 15,
    },
    imageIcon: {
        display: "flex",
        height: "inherit",
        width: "inherit",
    },
    iconRoot: {
        textAlign: "center",
    },
}));

const Sidebar = ({ day, setDay, data, autoZoom }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.sidebar} borderradius={20}>
            {day && data[day].date ? (
                <>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={2}
                        alignItems="center"
                        justifyContent="center"
                    >
                        {/* nav bar */}
                        <DayDate
                            day={day}
                            data={data}
                            setDay={setDay}
                            autoZoom={autoZoom}
                        />

                        {/* start to end */}
                        <BeginToEnd day={day} data={data} />

                        {/* elevation profile */}
                        <ElevationChart day={day} data={data} />

                        {/* progress bar */}
                        <ProgressBar day={day} data={data} />
                    </Grid>
                </>
            ) : (
                // Welcome sidebar
                <>
                    <Typography
                        variant="h5"
                        textAlign={"left"}
                        fontWeight={"bold"}
                        fontFamily="Futura"
                        // marginBottom={1}
                        padding={2}
                    >
                        {" "}
                        On April 8th, 1981,
                    </Typography>
                    <Typography
                        variant="paragraph"
                        fontSize={12}
                        textAlign={"left"}
                        fontFamily="Helvetica"
                        padding={1}
                    >
                        my dad set out from Nimblewill Gap near Georgia's
                        northern border, an external frame pack on his back and
                        a beard on his face that wouldn't quit growing. He was
                        19, and hoped to hike 2000+ miles to Mount Katahdin in
                        Maine by October.
                        <br />
                        &emsp; This website is a tool to explore that journey
                        with data from his itinerary and journals that are
                        (somehow) still intact. So click around, explore, and
                        marvel at this 19-year-old's singlemindedness!
                        <br />
                        &emsp; And one note about the line: the line that
                        appears on this website is the current centerline. There
                        are shelters that have been torn down, and trail
                        sections that have been rerouted, but a majority of the
                        trail remains the same. Where the trail and Glenn's
                        stops (marked by green circles) diverge, tracing the
                        stops will give a more accurate sense of the trail as it
                        existed in 1981.
                        <br />
                        &emsp; And as for the missing days - even the greatest
                        athletes have to rest. In the future I hope to add info
                        on Glenn's rest days as well as his scanned journal
                        entries.
                    </Typography>
                </>
            )}
        </Paper>
    );
};

export default Sidebar;

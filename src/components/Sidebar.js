import { React, useContext } from "react";
import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// icons for progress bar
import LinearProgress from "@mui/material/LinearProgress";
// import TerrainIcon from "@mui/icons-material/Terrain";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { boundingExtent } from "ol/extent";

import { makeStyles } from "@mui/styles";
import { fromLonLat } from "ol/proj";

import StateIndicator from "./StateIndicator";

import { MapContext } from "../context/MapContext";

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
    },
}));

const MileageToFrom = styled(Button)({
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 4,
    verticalAlign: "middle",
    fontFamily: "Futura",
    fontSize: 16,
    padding: "2px 8px",
    textTransform: "none",
    backgroundColor: "white",
    border: "1px solid",
    color: "#0063cc",
    "&:hover": {
        backgroundColor: "white",
        borderColor: "#0063cc",
    },
    pointerEvents: "none",
});

const Sidebar = ({ day, setDay, data }) => {
    const classes = useStyles();

    const mapRef = useContext(MapContext);

    const recenterMap = () => {
        if (mapRef.current) {
            const extent = boundingExtent([fromLonLat([-76.17, 41.76])]);
            mapRef.current.ol.getView().fit(extent, {
                duration: 3000,
                maxZoom: 5.5,
            });
        }
    };

    const backDay = () => {
        if (day > 1) {
            let newDay = day - 1;
            while (newDay > 1 && !data.get(newDay)) {
                --newDay;
            }
            if (data.get(newDay)) {
                setDay(newDay);
                changeMapView(newDay);
            }
        }
    };

    const nextDay = () => {
        if (day < 182) {
            let newDay = day + 1;
            while (newDay < 182 && !data.get(newDay)) {
                ++newDay;
            }
            if (data.get(newDay)) {
                setDay(newDay);
                changeMapView(newDay);
            }
        }
    };

    const changeMapView = (newDay) => {
        const dayData = data.get(newDay);
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
    };

    // move to utils
    function formatDate(inputDate) {
        // Parse the input string into a Date object
        const [year, month, day] = inputDate.split("-");
        const date = new Date(year, month - 1, day);

        // Use Intl.DateTimeFormat to format the date
        const formatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        return formatter.format(date);
    }

    return (
        <Paper className={classes.sidebar} sx={{ borderRadius: 4 }}>
            {day && data.get(day) ? ( // error handling for sections w missing data
                // Conditional sidebar based on what day is selected
                <>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={2}
                        alignItems="center"
                        justifyContent="center"
                    >
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
                                marginTop={1.5}
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
                                <StateIndicator
                                    stateString={data.get(day).state}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={nextDay}>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={12} textAlign={"center"}>
                            <Typography
                                variant="overline"
                                align="center"
                                paddingTop={0}
                            >
                                {formatDate(data.get(day).date)}
                            </Typography>
                        </Grid>

                        {/* start to end */}
                        <Grid item xs={12}>
                            <Typography
                                variant="p"
                                align="center"
                                marginBottom={0}
                                paddingBottom={0}
                            >
                                <MileageToFrom
                                    style={{
                                        borderColor: "#275DAD",
                                        color: "#275DAD",
                                    }}
                                >
                                    {data.get(day).mileage} mi.
                                </MileageToFrom>
                                from <br />
                                <MileageToFrom
                                    style={{
                                        borderColor: "#0B3948",
                                        color: "#0B3948",
                                    }}
                                >
                                    {data.get(day).start}
                                </MileageToFrom>
                                to <br />
                                <MileageToFrom
                                    style={{
                                        borderColor: "#0B3948",
                                        color: "#0B3948",
                                    }}
                                >
                                    {data.get(day).end}
                                </MileageToFrom>
                                {/* {data.town ? ` in ${data.town}` : ""} */}
                            </Typography>
                        </Grid>

                        {/* progress bar */}
                        <Grid item xs={1.5}>
                            <PlayArrowIcon />
                        </Grid>
                        <Grid
                            item
                            alignItems="center"
                            justifyContent="center"
                            xs={9}
                        >
                            <LinearProgress
                                variant="determinate"
                                color="secondary"
                                value={(100 * data.get(day).totalDist) / 2092.2}
                            />
                        </Grid>
                        <Grid item xs={1.5}>
                            <CelebrationIcon />
                        </Grid>

                        <Grid item xs={12} alignContent={"center"}>
                            <Button onClick={recenterMap}>Recenter</Button>
                        </Grid>
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
                        marginBottom={1}
                    >
                        {" "}
                        On April 8th, 1981,
                    </Typography>
                    <Typography
                        variant="paragraph"
                        fontSize={12}
                        textAlign={"left"}
                        fontFamily="Helvetica"
                    >
                        my dad set out from Nimblewill Gap near Georgia's
                        northern border, an external frame pack on his back and
                        a beard on his face that wouldn't quit growing. He was
                        19, and hoped to hike 2000+ miles to Mount Katahdin in
                        Maine by October.
                        <br />
                        This website is a tool to explore that journey with data
                        from his itinerary and journals that are (somehow) still
                        intact. So click around, explore, and marvel at this
                        19-year-old's singlemindedness!
                        <br />
                        And one note about the line: the line that appears on
                        this website is the current centerline. There are
                        shelters that have been torn down, and trail sections
                        that have been rerouted, but a majority of the trail
                        remains the same. Where the trail and Glenn's stops
                        (marked by green circles) diverge, tracing the stops
                        will give a more accurate sense of the trail as it
                        existed in 1981.
                        <br />
                        And as for the seemingly skipped days - Glenn took some
                        days off (lazy). In the future I hope to add this
                        information as well as his scanned journal entries.
                    </Typography>
                </>
            )}
        </Paper>
    );
};

export default Sidebar;

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
import { fetchDataForDay } from "../utils/dataUtils";

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
        borderRadius: 30, // doesn't work!
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
            mapRef.current.ol.getView().setCenter(fromLonLat([-76.17, 41.76]));
            mapRef.current.ol.getView().setZoom(5.5);
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
        <Paper className={classes.sidebar}>
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
                    <Typography variant="h5" textAlign={"center"}>
                        {" "}
                        Merry Christmas Dad!
                    </Typography>
                    <Typography
                        variant="paragraph"
                        fontSize={12}
                        textAlign={"left"}
                        fontFamily="Futura"
                    >
                        {/* {" "}
                        This is what I've been working on over the last two
                        months to 'practice coding'. Ever since you shared your
                        journal entries with me and mom two years ago, this
                        project has been in the back of my mind. I hope this
                        allows you to explore your trip of a lifetime in a new
                        way.
                        <br />
                        <br />
                        The line that appears on this website is the current
                        centerline. There are shelters and trail sections that
                        do not exist as they did in 1981. Shelters have been
                        rebuilt and renamed, or destroyed completely. Many
                        sections of highway you complain about have been
                        rerouted to newly built trails. There are so many fun
                        facts and questions and parts of The trail I can't wait
                        to talk to you about. It really was a joy to make this.
                        <br />
                        <br />
                        As of now, you may only interact with the map by
                        clicking on the trail. In the future, I hope to flesh
                        out the UI a bit and add your journal entries (I don't
                        think there is an AI out there that can decipher your
                        handwriting).
                        <br />
                        <br />
                        Click anywhere along the trail to start exploring. I
                        love you! */}
                    </Typography>
                </>
            )}
        </Paper>
    );
};

export default Sidebar;

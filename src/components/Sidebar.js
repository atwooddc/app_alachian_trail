import React from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        width: "350px",
        padding: "10px 20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        zIndex: 1000,
    },
}));

const Sidebar = ({ data, setData }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.sidebar}>
            {data.day ? (
                // Conditional sidebar based on what day is selected
                <>
                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Grid item xs={2}>
                            {" "}
                            <IconButton>
                                <ArrowBackIosNewIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={8} textAlign={"center"}>
                            {" "}
                            <Typography
                                variant="title1"
                                color="common.black"
                                fontFamily={"Futura"}
                                align="center"
                            >
                                {" "}
                                Day {data.day}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton>
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Typography
                        variant="paragraph"
                        color="common.black"
                        fontStyle="italic"
                    >
                        {" "}
                        Date: {data.date} <br />
                        State: {data.state} <br />
                        Mileage: {data.mileage} <br />
                        Total Distance: {data.totalDist} <br />
                        Start: {data.start} <br />
                        End: {data.end} <br />
                        Lodging type: {data.lodging} <br />
                        Town: {data.town} <br />
                    </Typography>
                </>
            ) : (
                // Welcome sidebar
                <>
                    <Typography
                        variant="subtitle1"
                        color="common.black"
                        fontWeight="bold"
                        align="center"
                    >
                        {" "}
                        Welcome
                    </Typography>
                    <Typography
                        variant="paragraph"
                        color="common.black"
                        fontStyle="italic"
                    >
                        {" "}
                        click on the trail to start exploring!
                    </Typography>
                </>
            )}
        </Paper>
    );
};

export default Sidebar;

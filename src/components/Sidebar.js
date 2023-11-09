import React from "react";
import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        padding: theme.spacing(2),
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        color: "red",
    },
}));

const Sidebar = ({ data, day, changeDay }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.sidebar}>
            {day ? (
                // Conditional sidebar based on what day is selected
                <>
                    <Typography
                        variant="subtitle1"
                        color="common.black"
                        fontWeight="bold"
                        align="center"
                    >
                        {" "}
                        Day {day}
                    </Typography>
                    <Typography
                        variant="paragraph"
                        color="common.black"
                        fontStyle="italic"
                    >
                        {" "}
                        State: {data[day]["state"]} <br />
                        Mileage: {data[day]["mileage"]}
                        <br />
                        Elevation: {data[day]["elev"]}
                        <br />
                        Entry: {data[day]["entry"]}
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

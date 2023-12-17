import React from "react";
import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        width: "200px",
        padding: theme.spacing(2),
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        color: "red",
    },
}));

const Sidebar = ({ data, setData }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.sidebar}>
            {data.day ? (
                // Conditional sidebar based on what day is selected
                <>
                    <Typography
                        variant="subtitle1"
                        color="common.black"
                        fontWeight="bold"
                        align="center"
                    >
                        {" "}
                        Day {data.day}
                    </Typography>
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

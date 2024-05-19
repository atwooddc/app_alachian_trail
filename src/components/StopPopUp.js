import React from "react";

import { Paper, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useDataContext } from "../context/DataContext";

import LodgingIndicator from "./LodgingIndicator";

const useStyles = makeStyles((theme) => ({
    popUp: {
        // minWidth: "105px",
        position: "absolute",
        right: 20,
        width: "flex",
        padding: "5px 5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        fontFamily: "Futura",
        color: "#11151C",
        opacity: 0.9,
    },
}));

const StopPopUp = ({ leg }) => {
    const classes = useStyles();

    const data = useDataContext();

    return (
        <Paper className={classes.popUp}>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight={20}

                // marginTop={1.5}
            >
                <Typography
                    variant="p"
                    align="center"
                    marginLeft={0.5}
                    marginRight={1}
                    whiteSpace="nowrap"
                >
                    {data[leg].end}
                </Typography>
                <LodgingIndicator lodging={data[leg].lodging} />
            </Box>
        </Paper>
    );
};

export default StopPopUp;

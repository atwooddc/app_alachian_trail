import React from "react";

import { Paper, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import StateIndicator from "./StateIndicator";

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

const SectionPopUp = ({ day, stateString }) => {
    const classes = useStyles();

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
                    fontWeight="medium"
                    align="center"
                    marginLeft={0.5}
                    marginRight={1}
                    whiteSpace="nowrap"
                >
                    Day {day}
                </Typography>
                <StateIndicator stateString={stateString} />
            </Box>
        </Paper>
    );
};

export default SectionPopUp;

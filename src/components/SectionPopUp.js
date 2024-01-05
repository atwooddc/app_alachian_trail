import React from "react";

import { Paper, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import StateIndicator from "./StateIndicator";

const useStyles = makeStyles((theme) => ({
    popUp: {
        // minWidth: "105px",
        width: "flex",
        padding: "5px 8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        fontFamily: "Futura",
        color: "#11151C",
    },
}));

const SectionPopUp = ({ currentSection }) => {
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
                    fontWeight="semi-bold"
                    align="center"
                    marginRight={1}
                    whiteSpace="nowrap"
                >
                    Day {currentSection.get("day")}
                </Typography>
                <StateIndicator stateString={currentSection.get("state")} />
            </Box>
        </Paper>
    );
};

export default SectionPopUp;

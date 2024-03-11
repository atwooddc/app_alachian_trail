import React from "react";
import { Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Icon from "@mui/material/Icon";
import hikingIcon from "../../img/hiking.svg";
import mountainIcon from "../../img/mountain.svg";
import { makeStyles } from "@mui/styles";

import { useDataContext } from "../../context/DataContext";
import { useLegContext } from "../../context/LegContext";

const useStyles = makeStyles((theme) => ({
    imageIcon: {
        display: "flex",
        height: "inherit",
        width: "inherit",
    },
    iconRoot: {
        textAlign: "center",
    },
}));

const ProgressBar = () => {
    const classes = useStyles();

    const data = useDataContext();
    const [leg] = useLegContext();

    return (
        <>
            <Grid item xs={1.5} className="desktop">
                <Icon classes={{ root: classes.iconRoot }}>
                    <img
                        alt="hiking-icon"
                        className={classes.imageIcon}
                        src={hikingIcon}
                    />
                </Icon>
            </Grid>
            <Grid
                item
                alignItems="center"
                justifyContent="left"
                xs={9}
                className="desktop"
            >
                <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={(100 * data[leg].totalDist) / data[148].totalDist}
                />
            </Grid>
            <Grid item xs={1.5} className="desktop">
                <Icon classes={{ root: classes.iconRoot }}>
                    <img
                        alt="mountain-icon"
                        className={classes.imageIcon}
                        src={mountainIcon}
                    />
                </Icon>
            </Grid>
            <Grid
                item
                className="mobile"
                alignItems="center"
                justifyContent="center"
                xs={12}
                margin={1}
                marginTop={0}
                padding={0}
            >
                <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={(100 * data[leg].totalDist) / data[148].totalDist}
                />
            </Grid>
        </>
    );
};

export default ProgressBar;

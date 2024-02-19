import React from "react";
import { Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Icon from "@mui/material/Icon";
import hikingIcon from "../../img/hiking.svg";
import mountainIcon from "../../img/mountain.svg";
import { makeStyles } from "@mui/styles";

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

const ProgressBar = ({ day, data }) => {
    const classes = useStyles();
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
                justifyContent="center"
                xs={9}
                className="desktop"
            >
                <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={(100 * data[day].totalDist) / 2092.2}
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
                    value={(100 * data[day].totalDist) / 2092.2}
                />
            </Grid>
        </>
    );
};

export default ProgressBar;

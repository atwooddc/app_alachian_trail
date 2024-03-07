import { React } from "react";

import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

import { useDataContext } from "../context/DataContext";
import { useLegContext } from "../context/LegContext";

import StateIndicator from "./StateIndicator";
import NavBar from "./sidebar/NavBar";
import ElevationChart from "./sidebar/ElevationChart";
import ProgressBar from "./sidebar/ProgressBar";
import BeginToEnd from "./sidebar/BeginToEnd";
import WelcomeMessage from "./sidebar/WelcomeMessage";

const useStyles = makeStyles((theme) => ({
    desktop: {
        position: "absolute",
        bottom: "20px",
        right: "20px",
        maxWidth: "350px",
        width: "flex",
        padding: "10px 20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        zIndex: 100000,
        fontFamily: "Futura",
        color: "#11151C",
        maxHeight: "350px", // Adjust this value as needed
        overflowY: "auto", // Enables vertical scrolling
        borderRadius: 15,
    },
    mobile: {
        position: "absolute",
        bottom: "2vh",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "1vh 3vh",
        width: "96vw",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        fontFamily: "Futura",
        color: "#11151C",
        maxHeight: "35vh",
        overflowY: "auto",
        borderRadius: 15,
    },
}));

const Sidebar = () => {
    const classes = useStyles();

    const data = useDataContext();
    const [leg] = useLegContext();

    return (
        <>
            <Paper className={`${classes.desktop} desktop`}>
                {leg ? (
                    <>
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={1}
                            alignItems="center"
                            justifyContent="left"
                        >
                            {/* nav bar */}
                            <NavBar />

                            {/* start to end */}
                            <BeginToEnd />

                            {/* elevation profile */}
                            {/* <ElevationChart /> */}

                            {/* progress bar */}
                            <ProgressBar />
                        </Grid>
                    </>
                ) : (
                    <WelcomeMessage />
                )}
            </Paper>
            <Paper className={`${classes.mobile} mobile`}>
                {leg ? (
                    <>
                        <Grid
                            container
                            rowSpacing={0.2}
                            columnSpacing={0}
                            alignItems="center"
                            justifyContent="center"
                            justifyItems="center"
                        >
                            {/* nav bar */}
                            <NavBar />

                            <Grid item xs={12}>
                                <BeginToEnd />
                            </Grid>
                            <Grid
                                item
                                container
                                xs={2}
                                justifyContent={"center"}
                                paddingBottom={2}
                            >
                                <StateIndicator stateString={data[leg].state} />
                            </Grid>
                            <Grid item xs={10}>
                                {/* <ElevationChart /> */}
                            </Grid>
                            {/* progress bar */}
                            <ProgressBar />
                        </Grid>
                    </>
                ) : (
                    <WelcomeMessage />
                )}
            </Paper>
        </>
    );
};

export default Sidebar;

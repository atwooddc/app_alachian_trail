import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import StartEndPoint from "./StartEndPoint";
import EastIcon from "@mui/icons-material/East";

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

const BeginToEnd = ({ day, data }) => {
    return (
        <>
            <div className="desktop">
                <Grid
                    container
                    item
                    xs={12}
                    alignItems={"center"}
                    justifyItems={"center"}
                >
                    <Typography
                        variant="p"
                        align="left"
                        marginBottom={0}
                        paddingBottom={0}
                        paddingTop={1}
                    >
                        <MileageToFrom
                            style={{
                                borderColor: "#275DAD",
                                color: "#275DAD",
                            }}
                        >
                            {data[day].mileage} mi.
                        </MileageToFrom>
                        from <br />
                        <MileageToFrom
                            style={{
                                borderColor: "#0B3948",
                                color: "#0B3948",
                            }}
                        >
                            {data[day].start}
                        </MileageToFrom>
                        to <br />
                        <MileageToFrom
                            style={{
                                borderColor: "#0B3948",
                                color: "#0B3948",
                            }}
                        >
                            {data[day].end}
                        </MileageToFrom>
                    </Typography>
                </Grid>
            </div>
            <div className="mobile">
                <Grid
                    container
                    item
                    xs={12}
                    alignItems={"center"}
                    justifyItems={"center"}
                >
                    <Grid
                        item
                        container
                        xs={3}
                        justifyContent="center"
                        alignContent="center"
                        alignItems="end"
                    >
                        <Typography
                            fontFamily={"verdana"}
                            variant={"h1"}
                            fontSize={20}
                            fontWeight={"bold"}
                            color="grey"
                            paddingBottom={0}
                        >
                            {data[day].mileage}
                        </Typography>
                        <Typography
                            fontFamily={"verdana"}
                            variant={"h1"}
                            fontSize={8}
                            fontWeight={"bold"}
                            color="grey"
                            paddingBottom={0}
                        >
                            &nbsp;mi.
                        </Typography>
                    </Grid>
                    <StartEndPoint text={data[day].start} />
                    <Grid item container xs={1} justifyContent="center">
                        <EastIcon color="disabled" />
                    </Grid>
                    <StartEndPoint text={data[day].end} />
                </Grid>
            </div>
        </>
    );
};

export default BeginToEnd;

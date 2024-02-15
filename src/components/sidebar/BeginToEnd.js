import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

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
        <Grid item xs={12}>
            <Typography
                variant="p"
                align="center"
                marginBottom={0}
                paddingBottom={0}
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
    );
};

export default BeginToEnd;

import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

const BorderedBox = styled(Box)({
    bgcolor: "background.paper",
    // border: "1px solid grey",
    // margin: "auto", // Center in the flex container
    width: "100%",
    minHeight: "2em", // Adjust based on your font size to fit exactly two lines
    borderRadius: 5,
    display: "flex", // Use flexbox for centering
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    textAlign: "center", // Ensure text is centered if it wraps
});

const StartEndPoint = ({ text }) => {
    return (
        <Grid
            container
            item
            xs={4}
            justifyContent="center"
            alignContent="center"
            alignItems="center"
            style={{ height: "100%" }}
        >
            <BorderedBox>
                <Typography
                    fontFamily="Futura"
                    fontSize={10}
                    color={"grey"}
                    style={{ textAlign: "center" }}
                >
                    {text}
                </Typography>
            </BorderedBox>
        </Grid>
    );
};

export default StartEndPoint;

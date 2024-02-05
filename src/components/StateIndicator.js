import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StateButton = styled(Button)(({ bgcolor }) => ({
    padding: "0px 1px",
    margin: 2,
    width: 20,
    height: 20,
    verticalAlign: "middle",
    fontFamily: "Futura",
    fontSize: 14,
    backgroundColor: bgcolor,
    color: "white",
    pointerEvents: "none",
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
}));

const stateColors = {
    GA: "darkred", // 7 days
    NC: "crimson", // common
    TN: "tomato", // common
    VA: "orange", // common
    WV: "gold", // 3 days
    MD: "yellowgreen", // 2 days
    PA: "green", // ~10 days
    NJ: "seagreen", // 5 days
    NY: "turquoise", // 6 days
    CT: "teal", // 3 days
    MA: "steelblue", // 6 days
    VT: "darkblue", // 8 days
    NH: "midnightblue", // common
    ME: "indigo", // common
};

const StateIndicator = ({ stateString }) => {
    function StateButtonColor({ stateAbbr }) {
        return (
            <StateButton bgcolor={stateColors[stateAbbr]}>
                {stateAbbr}
            </StateButton>
        );
    }

    return (
        <>
            {stateString.length > 2 ? (
                <>
                    <StateButtonColor stateAbbr={stateString.substring(0, 2)} />
                    <StateButtonColor stateAbbr={stateString.substring(3)} />
                </>
            ) : (
                <StateButtonColor stateAbbr={stateString} />
            )}
        </>
    );
};

export default StateIndicator;

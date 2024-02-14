import React from "react";
import "./Header.css";
import atLogo from "../img/at_logo_b&w.png";
import Stack from "@mui/material/Stack";

const Header = () => {
    return (
        <div className="map-header desktop">
            <div color="#11151C">
                <Stack
                    direction="row"
                    className="Stack"
                    spacing={1.5}
                    marginTop={1}
                >
                    <h1>Putting the</h1>
                    <img src={atLogo} alt="at-logo" className="header-image" />
                    <h1>in Atwood</h1>
                </Stack>
                <p>Exploring Glenn's 1981 trek from Georgia to Maine</p>
            </div>
        </div>
    );
};

export default Header;

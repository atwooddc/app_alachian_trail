import { React, useState } from "react";
import "./Header.css";
import atLogo from "../img/at_logo_b&w.png";
import Stack from "@mui/material/Stack";

const Header = () => {
    const [minimized, setMinimized] = useState(false);

    const toggleMinimize = () => {
        setMinimized(!minimized);
    };

    return (
        <>
            <div className="map-header desktop">
                <Stack
                    direction="row"
                    className="Stack"
                    spacing={1.5}
                    marginTop={1}
                >
                    <h1>Putting the</h1>
                    <img
                        src={atLogo}
                        alt="at-logo"
                        className="header-image"
                        onClick={toggleMinimize}
                    />
                    <h1>in Atwood</h1>
                </Stack>
                <p>Exploring Glenn's 1981 trek from Georgia to Maine</p>
            </div>
            <div
                className={`map-header mobile ${minimized ? "minimized" : ""}`}
            >
                <Stack
                    direction="row"
                    className="Stack"
                    spacing={1.5}
                    marginTop={1}
                >
                    <h1 style={{ color: minimized ? "transparent" : "black" }}>
                        Putting the
                    </h1>
                    <div onClick={toggleMinimize}>
                        {" "}
                        {/* Wrapper for image */}
                        <img
                            src={atLogo}
                            alt="at-logo"
                            className="header-image"
                            style={{ cursor: minimized ? "pointer" : "arrow" }}
                        />
                    </div>
                    <h1 style={{ color: minimized ? "transparent" : "black" }}>
                        in Atwood
                    </h1>
                </Stack>
                <p style={{ display: minimized ? "none" : "block" }}>
                    Exploring Glenn's 1981 trek from Georgia to Maine
                </p>
            </div>
        </>
    );
};

export default Header;

import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <div className="map-header">
            <img
                src={require("../img/at_logo_b&w.png")}
                alt="at-logo"
                className="header-image"
            />
            {/* <img
                src={require("../img/first_day_pic_zoomed_in.png")}
                alt="first day"
                className="header-image"
            /> */}
            <div color="#11151C">
                <h1>
                    Putting the &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; in
                    Atwood
                </h1>
                <p>Exploring Glenn's 1981 trek from Georgia to Maine</p>
            </div>
        </div>
    );
};

export default Header;

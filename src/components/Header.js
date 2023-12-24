import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <div className="map-header">
            <img
                src={require("../img/beige.jpg")}
                alt="beige"
                className="header-image"
            />
            <img
                src={require("../img/first_day_pic.jpg")}
                alt="first day"
                className="header-image"
            />
            <div>
                <h1>Putting the A.T. in Atwood</h1>
                <p>Glenn's 1981 trek from GA to ME</p>
            </div>
            <img
                src={require("../img/blue_sticker.jpg")}
                alt="blue journal"
                className="header-image"
            />
            <img
                src={require("../img/at_archive_1.jpg")}
                alt="at archive 1"
                className="header-image"
            />
        </div>
    );
};

export default Header;

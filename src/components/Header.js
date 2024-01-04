import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <div className="map-header">
            <img
                src={require("../img/first_day_pic_zoomed_in.png")}
                alt="first day"
                className="header-image"
            />
            <div color="#11151C">
                <h1>
                    Putting the &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; in
                    Atwood
                </h1>
                <p>Glenn's 1981 Appalachian Trail trek from GA to ME</p>
            </div>
            <img
                src={require("../img/stack_of_journals.png")}
                alt="blue planning"
                className="header-image"
            />
            <img
                src={require("../img/at_logo_from_blue_notebook.png")}
                alt="blue journal"
                className="header-image"
            />
            {/* <img
                src={require("../img/beige.jpg")}
                alt="beige"
                className="header-image"
            />

            <img
                src={require("../img/itinerary.jpg")}
                alt="itinerary"
                className="header-image"
            /> */}
        </div>
    );
};

export default Header;

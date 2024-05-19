import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faPersonShelter,
    faSquareH,
    faTents,
    faHotel,
    faCampground,
    faPeopleGroup,
    faPiggyBank,
    faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";

// Add the icons to the library
library.add(
    faPersonShelter,
    faSquareH,
    faTents,
    faHotel,
    faCampground,
    faPeopleGroup,
    faPiggyBank,
    faBuildingColumns
);

const LodgingButton = styled(Button)(() => ({
    padding: "0px 1px",
    margin: 2,
    width: 20,
    height: 20,
    verticalAlign: "middle",
    fontFamily: "Futura",
    fontSize: 14,
    backgroundColor: "grey",
    color: "white",
    pointerEvents: "none",
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px",
}));

const iconMap = {
    shelter: "person-shelter",
    hostel: "hotel",
    campground: "campground",
    motel: "hotel",
    camp: "campground",
    "friend/family": "people-group",
    "pig sty": "piggy-bank",
    hotel: "hotel",
    "under bleachers": "building-columns",
    campsite: "campground",
};

const LodgingIndicator = ({ lodging }) => {
    const iconName = iconMap[lodging];
    return (
        <LodgingButton>
            <FontAwesomeIcon icon={`fa-solid fa-${iconName}`} />
        </LodgingButton>
    );
};

export default LodgingIndicator;

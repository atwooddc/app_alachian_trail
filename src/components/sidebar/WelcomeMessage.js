import React from "react";
import { Typography } from "@mui/material";

const WelcomeMessage = () => {
    return (
        <>
            <Typography
                variant="h6"
                fontSize={24}
                textAlign={"left"}
                fontWeight={"bold"}
                fontFamily="Futura"
                // marginBottom={1}
                paddingTop={1}
                paddingBottom={1}
                lineHeight={"18px"}
            >
                {" "}
                On April 8th, 1981,
            </Typography>
            <Typography
                variant="paragraph"
                fontSize={12}
                textAlign={"left"}
                fontFamily="Helvetica"
                lineHeight={"6px"}
            >
                my grandparents waved goodbye to their son as he set out from
                Nimblewill Gap near Georgia's northern border. By October, he
                had hiked more than 2000 miles to Mount Katahdin, the northern
                terminus of the Appalachian Trail.
                <br />
                This site is a tool to explore that journey. The route is
                segmented to reflect his stops on the trail, meticulously
                recorded in his (somehow still intact) journals. Click anywhere
                along the route to see what Glenn was up to that day...Happy
                Trails!
                <br />
                <br />
            </Typography>
            <Typography
                variant="paragraph"
                fontSize={10}
                fontFamily="Helvetica"
                // padding={1}
                lineHeight={"6px"}
            >
                for more info on the Appalachian Trail, visit{" "}
                <a href="https://appalachiantrail.org/">appalachiantrail.org</a>
            </Typography>
        </>
    );
};

export default WelcomeMessage;

import React from "react";
import { Typography } from "@mui/material";

const WelcomeMessage = () => {
    return (
        <>
            <Typography
                variant="h6"
                fontSize={14}
                textAlign={"left"}
                fontWeight={"bold"}
                fontFamily="Futura"
                // marginBottom={1}
                padding={1}
                lineHeight={"18px"}
            >
                {" "}
                On April 8th, 1981,
            </Typography>
            <Typography
                variant="paragraph"
                fontSize={10}
                textAlign={"left"}
                fontFamily="Helvetica"
                padding={1}
                lineHeight={"6px"}
            >
                my dad set out from Nimblewill Gap near Georgia's northern
                border, an external frame pack on his back and a beard on his
                face that wouldn't quit growing. He was 19, and hoped to hike
                2000+ miles to Mount Katahdin in Maine by October.
                <br />
                &emsp; This website is a tool to explore that journey with data
                from his itinerary and journals that are (somehow) still intact.
                So click around, explore, and marvel at this 19-year-old's
                singlemindedness!
                <br />
                &emsp; And one note about the line: the line that appears on
                this website is the current centerline. There are shelters that
                have been torn down, and trail sections that have been rerouted,
                but a majority of the trail remains the same. Where the trail
                and Glenn's stops (marked by green circles) diverge, tracing the
                stops will give a more accurate sense of the trail as it existed
                in 1981.
                <br />
                &emsp; And as for the missing days - even the greatest athletes
                have to rest. In the future I hope to add info on Glenn's rest
                days as well as his scanned journal entries.
            </Typography>
        </>
    );
};

export default WelcomeMessage;

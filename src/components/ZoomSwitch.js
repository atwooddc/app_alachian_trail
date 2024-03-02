import { React, useState } from "react";
import "./ZoomSwitch.css";

import { Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";

import { useZoomContext } from "../context/ZoomContext";

const ZoomSwitch = () => {
    const [isAutoZoom, setIsAutoZoom] = useZoomContext();
    const [checked, setChecked] = useState(true);

    const handleChange = () => {
        setIsAutoZoom(!isAutoZoom);
        setChecked(!checked);
    };

    return (
        <Paper className="zoom-switch desktop">
            <Stack direction="row" alignItems="center">
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    color={"secondary"}
                    paddingleft={1}
                >
                    auto-zoom
                </Switch>

                <Typography
                    variant="overline"
                    fontSize={10}
                    paddingleft={0}
                    paddingRight={1.25}
                >
                    auto-zoom
                </Typography>
            </Stack>
        </Paper>
    );
};

export default ZoomSwitch;

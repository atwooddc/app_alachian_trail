import { React, useState } from "react";
import "./ZoomSwitch.css";

import { Paper, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";

const ZoomSwitch = ({ autoZoom, setAutoZoom }) => {
    const [checked, setChecked] = useState(true);

    const handleChange = () => {
        setAutoZoom(!autoZoom);
        setChecked(!checked);
    };

    return (
        <Paper className="zoom-switch">
            <Switch
                // size="small"
                checked={checked}
                onChange={handleChange}
                padding={1}
                color={"secondary"}
            ></Switch>
            <Typography variant="overline" padding={1}>
                auto-zoom
            </Typography>
        </Paper>
    );
};

export default ZoomSwitch;

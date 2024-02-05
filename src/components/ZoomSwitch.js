import { React, useState } from "react";
import "./ZoomSwitch.css";

import { Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";

const ZoomSwitch = ({ autoZoom, setAutoZoom }) => {
    const [checked, setChecked] = useState(true);

    const handleChange = () => {
        setAutoZoom(!autoZoom);
        setChecked(!checked);
    };

    return (
        <Paper className="zoom-switch">
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

import { React, useState } from "react";

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
        <Paper
            className="zoom-switch desktop"
            sx={{
                height: "40px",
                width: "136.43px",
                position: "absolute",
                bottom: "70px",
                left: "20px",
                padding: 0,
                zIndex: 1000,
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            }}
        >
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

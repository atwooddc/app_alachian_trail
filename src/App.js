import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header.js";
import MapPage from "./pages/MapPage";

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <MapPage />
        </ThemeProvider>
    );
}

export default App;

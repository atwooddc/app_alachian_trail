import React from "react";
import "./App.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header.js";
import MapPage from "./pages/MapPage";

const theme = createTheme({
    palette: {
        primary: {
            main: "#8A4942",
        },
        secondary: {
            main: "#275DAD",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme} className="app">
            <CssBaseline />
            <Header />
            <MapPage />
        </ThemeProvider>
    );
}

export default App;

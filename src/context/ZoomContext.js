import { createContext, useContext, useState, useEffect } from "react";

const ZoomContext = createContext(null);

export const ZoomProvider = ({ children }) => {
    const getZoomLevel = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const ratio = width / height;
        if (ratio < 2 / 3) return 8.5; // mobile displays
        if (ratio < 4 / 3) return 10; // approx square displays
        return 11; // desktop
    };

    const [isAutoZoom, setIsAutoZoom] = useState(true);
    const [autoZoomLevel] = useState(getZoomLevel());

    return (
        <ZoomContext.Provider
            value={{ isAutoZoom, setIsAutoZoom, autoZoomLevel }}
        >
            {children}
        </ZoomContext.Provider>
    );
};

export const useZoomContext = () => useContext(ZoomContext);

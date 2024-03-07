// import { createContext, useContext, useRef } from "react";

// const MapRefContext = createContext(null);

// export const MapRefProvider = ({ children }) => {
//     const mapRef = useRef();

//     return (
//         <MapRefContext.Provider value={mapRef}>
//             {children}
//         </MapRefContext.Provider>
//     );
// };

// export const useMapRefContext = () => useContext(MapRefContext);

import { createContext } from "react";

export const MapRefContext = createContext(null);

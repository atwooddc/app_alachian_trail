import { createContext, useContext, useState } from "react";

const LegContext = createContext(null);

export const LegProvider = ({ children }) => {
    const [leg, setLeg] = useState(0);

    return (
        <LegContext.Provider value={[leg, setLeg]}>
            {children}
        </LegContext.Provider>
    );
};

export const useLegContext = () => useContext(LegContext);

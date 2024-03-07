import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://gic2p2iycjqo7z7rqebkho2wpe0verbz.lambda-url.us-east-2.on.aws/"
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                console.log(json);
                setData(json);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);

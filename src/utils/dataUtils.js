export const fetchDataForDay = async (day, setData) => {
    try {
        const response = await fetch(`[Your AWS API Endpoint]?day=${day}`);
        const data = await response.json();
        setData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

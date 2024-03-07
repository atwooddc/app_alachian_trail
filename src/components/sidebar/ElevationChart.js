import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import ResizeObserver from "resize-observer-polyfill";

import { useDataContext } from "../../context/DataContext";
import { useLegContext } from "../../context/LegContext";

const ElevationChart = () => {
    const data = useDataContext();
    const leg = useLegContext();

    const d3Container = useRef(null);
    const [allElevData, setAllElevData] = useState([]);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    // Fetch and process CSV data
    // TO DO - UPDATE ELEV DATA
    useEffect(() => {
        const fetchData = async () => {
            const url =
                "https://raw.githubusercontent.com/atwooddc/at_geojson/main/elevation_per_feature.csv";
            d3.csv(url)
                .then((data) => {
                    const processedData = data.map((row) => ({
                        day: +row.day,
                        elevations: Object.keys(row)
                            .filter((key) => key.startsWith("e"))
                            .map((key) => +row[key]), // Convert elevation strings to numbers
                    }));
                    setAllElevData(processedData);
                })
                .catch((error) =>
                    console.error("Error fetching or processing data: ", error)
                );
        };

        fetchData();
    }, []); // Fetch data only once

    // Observe changes in the container's size
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (!entries || entries.length === 0) {
                return;
            }
            const { width, height } = entries[0].contentRect;
            setContainerSize({ width, height });
        });

        if (d3Container.current) {
            resizeObserver.observe(d3Container.current.parentElement);
        }

        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        // Ensure data and container are ready
        if (
            allElevData.length > 0 &&
            containerSize.width &&
            containerSize.height
        ) {
            const legData = allElevData.find((l) => l.leg === leg);
            if (legData) {
                // Clear existing content
                d3.select(d3Container.current).selectAll("*").remove();

                // Use containerSize.width and containerSize.height for dynamic sizing
                const margin = { top: 10, right: 15, bottom: 20, left: 30 };
                const width =
                    Math.min(300, containerSize.width) -
                    margin.left -
                    margin.right;
                const height =
                    Math.min(90, containerSize.height) -
                    margin.top -
                    margin.bottom;

                const endDist = data[leg].totalDist;
                const startDist = endDist - data[leg].mileage;

                const elevationValues = legData.elevations;

                // Scales
                const xScale = d3
                    .scaleLinear()
                    .domain([0, elevationValues.length - 1]) // From 0 to number of elevation points - 1
                    .range([0, width]); // The pixel width of the drawing area

                const yDomainPadding =
                    (d3.max(elevationValues) - d3.min(elevationValues)) * 0.5; // 5% padding

                const yScale = d3
                    .scaleLinear()
                    .domain([
                        d3.min(elevationValues) > yDomainPadding
                            ? d3.min(elevationValues) - yDomainPadding
                            : 0,
                        d3.max(elevationValues) + yDomainPadding,
                    ])
                    .range([height, 0]);

                // Create the line generator
                const lineGenerator = d3
                    .line()
                    .x((_, i) => xScale(i)) // Use index 'i' to get x-coordinate
                    .y((d) => yScale(d)) // Use elevation value to get y-coordinate
                    .curve(d3.curveMonotoneX);

                // Axes
                // Assuming your xScale's domain is set up to reflect indices or specific values
                const xAxis = d3
                    .axisBottom(xScale)
                    .tickValues([0, elevationValues.length - 1]) // Only show ticks at the start and end
                    .tickFormat((i) =>
                        d3.format(".1f")(i === 0 ? startDist : endDist)
                    ); // Adjust the format if necessary to match your data's context

                const yAxis = d3
                    .axisLeft(yScale)
                    .ticks(4)
                    .tickFormat(function (d) {
                        return d >= 1000 ? `${d / 1000}k` : d;
                    });

                // Create SVG container
                const svg = d3
                    .select(d3Container.current)
                    .attr(
                        "viewBox",
                        `0 0 ${width + margin.left + margin.right} ${
                            height + margin.top + margin.bottom
                        }`
                    );

                // Append grey rectangle for background directly to the SVG
                svg.append("rect")
                    .attr("x", margin.left) // Position the rectangle within the margins
                    .attr("y", margin.top)
                    .attr("width", width)
                    .attr("height", height)
                    .attr("fill", "#E8E8E8");

                svg.append("text")
                    .attr("x", margin.left + 2)
                    .attr("y", margin.top + 10) // Adjust this value if needed to position correctly
                    .attr("text-anchor", "start") // Align text to the start of the text element
                    .style("font-size", "10px") // Adjust font size as needed
                    // .style("fill", "white")
                    .text("ft."); // Text to display

                svg.append("text")
                    .attr("x", width + margin.left + margin.right - 20)
                    .attr("y", height + margin.top - 2) // Adjust this value to position above the bottom margin
                    .attr("text-anchor", "end") // Align text to the end of the text element
                    .style("font-size", "10px") // Adjust font size as needed
                    .style("fill", "grey")
                    .text("mi."); // Text to display

                svg.append("g")
                    .attr(
                        "transform",
                        `translate(${margin.left}, ${margin.top})`
                    )
                    .call(yAxis);

                // Create a group for the graph elements and transform it
                const graphGroup = svg
                    .append("g")
                    .attr(
                        "transform",
                        `translate(${margin.left},${margin.top})`
                    );

                const xAxisGroup = graphGroup
                    .append("g")
                    .attr("transform", `translate(0,${height})`)
                    .call(xAxis);

                xAxisGroup.select(".domain").remove(); // Remove the x-axis line
                xAxisGroup.selectAll(".tick text").style("fill", "grey"); // Style the x-axis labels and ticks
                xAxisGroup.selectAll(".tick line").style("stroke", "grey");

                // // Append and draw y-axis
                // graphGroup.append("g").call(yAxis);

                // Draw the line
                const path = svg
                    .append("path")
                    .datum(elevationValues)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 2)
                    .attr("d", lineGenerator)
                    .attr(
                        "transform",
                        `translate(${margin.left},${margin.top})`
                    );

                const pathLength = path.node().getTotalLength();
                const transitionPath = d3
                    .transition()
                    .ease(d3.easeSin)
                    .duration(2500);
                path.attr("stroke-dashoffset", pathLength)
                    .attr("stroke-dasharray", pathLength)
                    .transition(transitionPath)
                    .attr("stroke-dashoffset", 0);
            }
        }
    }, [leg, data, allElevData, containerSize]); // Rerun when dependencies change

    return <svg className="d3-component" ref={d3Container} />;
};

export default ElevationChart;

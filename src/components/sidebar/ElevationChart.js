import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { Grid } from "@mui/material";

const ElevationChart = ({ day, data }) => {
    const d3Container = useRef(null);
    const [allElevData, setAllElevData] = useState([]);

    // Fetch and process CSV data once and store it in state
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
                    console.log("AllElevData set");
                })
                .catch((error) =>
                    console.error("Error fetching or processing data: ", error)
                );
        };

        fetchData();
    }, []); // Empty dependency array to run only once

    useEffect(() => {
        if (allElevData.length > 0 && d3Container.current) {
            console.log(day);
            // Find data for the specific day
            const dayData = allElevData.find((d) => d.day === day);

            if (dayData) {
                d3.select(d3Container.current).selectAll("*").remove();

                const endDist = data[day].totalDist;
                const startDist = endDist - data[day].mileage;

                const elevationValues = dayData.elevations;

                // SVG dimensions
                const margin = { top: 10, right: 20, bottom: 20, left: 40 }; // Adjust margins as needed
                const width = 300 - margin.left - margin.right;
                const height = 100 - margin.top - margin.bottom;

                // ADD FEET

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
                    .ticks(4) // Specify the number of ticks you want.
                    .tickFormat(d3.format("d")); // Format elevation values as integers

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
                    .attr("y", margin.top - 1) // Adjust this value if needed to position correctly
                    .attr("text-anchor", "start") // Align text to the start of the text element
                    .style("font-size", "10px") // Adjust font size as needed
                    // .style("fill", "white")
                    .text("ft."); // Text to display

                svg.append("text")
                    .attr("x", width + margin.left + margin.right - 5)
                    .attr("y", height + margin.top - 2) // Adjust this value to position above the bottom margin
                    .attr("text-anchor", "end") // Align text to the end of the text element
                    .style("font-size", "10px") // Adjust font size as needed
                    .style("fill", "grey")
                    .text("mi."); // Text to display

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

                // Append and draw y-axis
                graphGroup.append("g").call(yAxis);

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

                // const margin = { top: 20, right: 10, bottom: 20, left: 20 };
                // const width = 300 - margin.left - margin.right;
                // const height = 100 - margin.top - margin.bottom;

                // const svg = d3
                //     .select(d3Container.current)
                //     .attr("width", width + margin.left + margin.right)
                //     .attr("height", height + margin.top + margin.bottom)
                //     .append("g")
                //     .attr(
                //         "transform",
                //         `translate(${margin.left},${margin.top})`
                //     );

                // svg.append("rect")
                //     .attr("width", width)
                //     .attr("height", height)
                //     .attr("fill", "#E8E8E8");

                // // Assuming data[day].totalDist and data[day].mileage are defined and are numbers
                // const startDist = data[day].totalDist - data[day].mileage;
                // const endDist = data[day].totalDist;

                // // Assuming dayData.elevations is an array of 50 elevation values
                // const elevationValues = dayData.elevations; // Already an array of numbers like the one you provided

                // // Create the x-scale
                // const xScale = d3
                //     .scaleLinear()
                //     .domain([0, elevationValues.length - 1]) // Input domain is the index range from 0 to 49
                //     .range([startDist, endDist]); // Output range is the distance domain

                // const yScale = d3
                //     .scaleLinear()
                //     .domain([0, d3.max(dayData.elevations, (d) => d[1])])
                //     .range([100, 0]); // Adjust as needed

                // // // When you create the line, you would use the index to get the x-coordinate
                // const line = d3
                //     .line()
                //     .x((d, i) => xScale(i)) // Use the index 'i' here
                //     .y((d) => yScale(d)) // Assuming yScale is already defined for the elevation values
                //     .curve(d3.curveMonotoneX);

                // const path = svg
                //     .append("path")
                //     .datum(elevationValues)
                //     .attr("fill", "none")
                //     .attr("stroke", "steelblue")
                //     .attr("stroke-linejoin", "round")
                //     .attr("stroke-linecap", "round")
                //     .attr("stroke-width", 1.5)
                //     .attr("d", line);

                // // const pathLength = path.node().getTotalLength();
                // // const transitionPath = d3
                // //     .transition()
                // //     .ease(d3.easeSin)
                // //     .duration(2500);
                // // path.attr("stroke-dashoffset", pathLength)
                // //     .attr("stroke-dasharray", pathLength)
                // //     .transition(transitionPath)
                // //     .attr("stroke-dashoffset", 0);

                // // // Add area
                // // // const area = d3
                // // //     .area()
                // // //     .x((d) => xScale(d[0]))
                // // //     .y0(height)
                // // //     .y1((d) => yScale(d[1]))
                // // //     .curve(d3.curveMonotoneX); // smooth line

                // // // svg.append("path")
                // // //     .datum(testData)
                // // //     .attr("class", "area")
                // // //     .attr("fill", "lightgrey")
                // // //     .attr("d", area);

                // const xAxis = svg
                //     .append("g")
                //     .attr("transform", `translate(0,${height})`)
                //     .call(d3.axisBottom(xScale).ticks(8));

                // xAxis.select(".domain").remove(); // remove x axis

                // xAxis.selectAll(".tick line").style("stroke", "grey");
                // xAxis.selectAll(".tick text").style("fill", "grey");

                // svg.append("g").call(
                //     d3.axisLeft(yScale).ticks(4).tickFormat(d3.format("d"))
                // );
            }
        }
    }, [day, data, allElevData]); // Rerun when `day` or `allElevData` changes

    return (
        <Grid item xs={12}>
            <svg
                className="d3-component"
                width={300}
                height={100}
                ref={d3Container}
            />
        </Grid>
    );
};

export default ElevationChart;

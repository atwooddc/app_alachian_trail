import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ElevationChart = () => {
    const d3Container = useRef(null);

    const data = [
        [1, 3],
        [2, 4],
        [3, 1],
        [4, 6],
        [5, 3],
        [6, 4],
        [7, 1],
        [8, 6],
    ];

    useEffect(() => {
        if (data && d3Container.current) {
            const margin = { top: 20, right: 10, bottom: 20, left: 20 };
            const width = 300 - margin.left - margin.right;
            const height = 100 - margin.top - margin.bottom;

            // Set up the SVG canvas
            const svg = d3
                .select(d3Container.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Define the scales
            const xScale = d3
                .scaleLinear()
                .domain(d3.extent(data, (d) => d[0]))
                .range([0, width]);

            const yScale = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d[1])])
                .range([height, 0]);

            // Create the area
            const area = d3
                .area()
                .x((d) => xScale(d[0]))
                .y0(height)
                .y1((d) => yScale(d[1]))
                .curve(d3.curveMonotoneX); // This will smooth the line

            // Add the area to the SVG
            svg.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("fill", "lightgrey")
                .attr("d", area);

            // Create the line generator with curve
            const line = d3
                .line()
                .x((d) => xScale(d[0]))
                .y((d) => yScale(d[1]))
                .curve(d3.curveMonotoneX); // This will smooth the line

            // Add the line to the SVG
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", line);

            const xAxis = svg
                .append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(xScale).ticks(8));

            // Remove the x-axis line
            xAxis.select(".domain").remove();

            xAxis.selectAll(".tick line").style("stroke", "lightgrey"); // Change '#yourColor' to the desired color for the tick lines

            xAxis.selectAll(".tick text").style("fill", "lightgrey");

            const yAxis = svg
                .append("g")
                .call(d3.axisLeft(yScale).ticks(4).tickFormat(d3.format("d")));
        }
    }, [data, d3Container.current]);

    return (
        <svg
            className="d3-component"
            width={300}
            height={100}
            ref={d3Container}
        />
    );
};

export default ElevationChart;

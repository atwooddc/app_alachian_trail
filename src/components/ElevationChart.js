import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ElevationChart = () => {
    const d3Container = useRef(null);

    const data = [
        [0, 3.3],
        [1, 3.5],
        [2, 4],
        [3, 4.6],
        [4, 5.1],
        [5, 3.7],
        [6, 4.3],
        [7, 5.4],
        [8, 6],
        [9, 3],
        [10, 4.2],
        [11, 4.6],
        [12, 6.1],
        [13, 5.2],
        [14, 4.9],
        [15, 4.8],
        [16, 4.9],
        [17, 4.7],
        [18, 4.3],
        [19, 5],
        [20, 4.8],
    ];

    useEffect(() => {
        if (data && d3Container.current) {
            const margin = { top: 20, right: 10, bottom: 20, left: 20 };
            const width = 300 - margin.left - margin.right;
            const height = 100 - margin.top - margin.bottom;

            const svg = d3
                .select(d3Container.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            svg.append("rect")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "lightgrey");

            const xScale = d3
                .scaleLinear()
                .domain(d3.extent(data, (d) => d[0]))
                .range([0, width]);

            const yScale = d3
                .scaleLinear()
                .domain([0, d3.max(data, (d) => d[1])])
                .range([height, 0]);

            const line = d3
                .line()
                .x((d) => xScale(d[0]))
                .y((d) => yScale(d[1]))
                .curve(d3.curveMonotoneX); // smooth line

            // Add path
            const path = svg
                .append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", line);

            const pathLength = path.node().getTotalLength();
            // D3 provides lots of transition options, have a play around here:
            // https://github.com/d3/d3-transition
            const transitionPath = d3
                .transition()
                .ease(d3.easeSin)
                .duration(2500);

            path.attr("stroke-dashoffset", pathLength)
                .attr("stroke-dasharray", pathLength)
                .transition(transitionPath)
                .attr("stroke-dashoffset", 0);

            // Add area
            // const area = d3
            //     .area()
            //     .x((d) => xScale(d[0]))
            //     .y0(height)
            //     .y1((d) => yScale(d[1]))
            //     .curve(d3.curveMonotoneX); // smooth line

            // svg.append("path")
            //     .datum(data)
            //     .attr("class", "area")
            //     .attr("fill", "lightgrey")
            //     .attr("d", area);

            const xAxis = svg
                .append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(xScale).ticks(8));

            xAxis.select(".domain").remove(); // remove x axis

            xAxis.selectAll(".tick line").style("stroke", "grey");
            xAxis.selectAll(".tick text").style("fill", "grey");

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

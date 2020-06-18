import React, { useRef, useEffect, useState } from "react";
import {
  forceSimulation,
  forceX,
  forceY,
  forceManyBody,
  forceCollide,
} from "d3-force";
import { select } from "d3-selection";
import { extent } from "d3-array";
import { scaleLinear, scaleOrdinal, scalePoint } from "d3-scale";
import { schemeTableau10 } from "d3-scale-chromatic";

import useInner from "../hooks/useInner";
import useUnique from "../hooks/useUnique";

const simulation = forceSimulation();
const margin = { top: 10, left: 300, right: 300, bottom: 10 };
export default function ({ data, dimensions }) {
  const { width, height } = dimensions;
  const [innerWidth, innerHeight] = useInner(dimensions, margin);
  const [xAttr, setX] = useState("cylinders");

  const plot = useRef();

  const radiusScale = scaleLinear()
    .domain(extent(data, (d) => d.displacement))
    .range([4, 10]);

  const colorScale = scaleOrdinal()
    .domain(useUnique(data, (d) => d.origin))
    .range(schemeTableau10);

  const xScale = scalePoint()
    .domain(useUnique(data, (d) => d[xAttr]))
    .range([0, innerWidth]);

  useEffect(() => {
    simulation
      .nodes(data)
      .force(
        "x",
        forceX((d) => xScale(d[xAttr]))
      )
      .alpha(1)
      .force("y", forceY(innerHeight / 2))
      .force(
        "collide",
        forceCollide((d) => radiusScale(d.displacement))
      )
      .force(
        "charge",
        forceManyBody().strength((d) => -1.5 * radiusScale(d.displacement))
      )

      .on("tick", () => {
        simulation.tick(3);
        select(plot.current)
          .selectAll("circle.mark")
          .data(data)
          .join("circle")
          .classed("mark", true)
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("r", (d) => radiusScale(d.displacement))
          .attr("fill", (d) => colorScale(d.origin));
      })
      .restart();
  }, [xAttr, data, innerWidth, innerHeight, colorScale, radiusScale, xScale]);

  useEffect(() => {
    setTimeout(() => {
      setX("origin");
    }, 5000);
    setTimeout(() => {
      setX("cylinders");
    }, 10000);
    setTimeout(() => {
      setX("year");
    }, 15000);
    setTimeout(() => {
      setX("mpg");
    }, 20000);
  }, []);

  return (
    <>
      <svg width={width} height={height}>
        <g ref={plot} transform={`translate(${margin.left},${margin.top})`}></g>
      </svg>
    </>
  );
}

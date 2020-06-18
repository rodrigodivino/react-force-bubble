import React, { useRef, useEffect, useMemo } from "react";
import {
  forceSimulation,
  forceX,
  forceY,
  forceManyBody,
  forceCollide,
} from "d3-force";
import { select, selectAll } from "d3-selection";
import { extent } from "d3-array";

import useInner from "../hooks/useInner";

const margin = { top: 10, left: 10, right: 10, bottom: 10 };
export default function ({ data, dimensions }) {
  const { width, height } = dimensions;
  const [innerWidth, innerHeight] = useInner(dimensions, margin);
  const plot = useRef();

  useEffect(() => {
    forceSimulation(data)
      .force("x", forceX(innerWidth / 2))
      .force("y", forceY(innerHeight / 2))
      .force("collide", forceCollide(5))
      .force("charge", forceManyBody().strength(-5))
      .on("tick", () => {
        select(plot.current)
          .selectAll("circle.mark")
          .data(data)
          .join("circle")
          .classed("mark", true)
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .attr("r", 5);
      });
  }, [innerWidth, innerHeight]);

  return (
    <>
      <svg width={width} height={height}>
        <g ref={plot} transform={`translate(${margin.left},${margin.top})`}></g>
      </svg>
    </>
  );
}

import React, { useRef, useEffect, useMemo } from "react";
import {
  forceSimulation,
  forceX,
  forceY,
  forceManyBody,
  forceCollide,
} from "d3-force";
import { selectAll } from "d3-selection";
import { extent } from "d3-array";

import useInner from "../hooks/useInner";
import useRerender from "../hooks/useRerender";

const margin = { top: 10, left: 10, right: 10, bottom: 10 };

export default function ({ data, dimensions }) {
  const { width, height } = dimensions;
  const [innerWidth, innerHeight] = useInner(dimensions, margin);
  const rerender = useRerender();
  const svg = useRef();

  return (
    <>
      <svg ref={svg} width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <rect width={innerWidth} height={innerHeight} />
        </g>
      </svg>
    </>
  );
}

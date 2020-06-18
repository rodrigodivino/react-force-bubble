import React from "react";

export default function ({ data, dimensions }) {
  const { width, height } = dimensions;
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height}></rect>
    </svg>
  );
}

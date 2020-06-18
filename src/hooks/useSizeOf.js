import { useState, useLayoutEffect, useCallback } from "react";

export default function (div) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const updateSize = useCallback(() => {
    const [width, height] = [div.current.clientWidth, div.current.clientHeight];
    setDimensions({ width, height });
  }, [div]);

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);

  return dimensions;
}

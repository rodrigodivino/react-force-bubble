import { useState, useLayoutEffect, useCallback } from "react";

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default function (div) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateSize = useCallback(
    debounce(() => {
      const [width, height] = [
        div.current.clientWidth,
        div.current.clientHeight,
      ];
      setDimensions({ width, height });
    }, 500),

    [div]
  );

  useLayoutEffect(() => {
    const [width, height] = [div.current.clientWidth, div.current.clientHeight];
    setDimensions({ width, height });
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [updateSize]);

  return dimensions;
}

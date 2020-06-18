import React, { useRef } from "react";
import Loader from "react-loader-spinner";
import useSizeOf from "./hooks/useSizeOf";
import useCSV from "./hooks/useCSV";

import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const div = useRef();
  const dimensions = useSizeOf(div);

  const [data, fetching] = useCSV(
    "https://raw.githubusercontent.com/curran/data/gh-pages/uci_ml/auto-mpg/auto-mpg.csv"
  );
  return (
    <div className="App" ref={div}>
      <h1>Hello World</h1>
      {fetching ? (
        <Loader type="Circles" />
      ) : (
        <Circles data={data} dimensions={dimensions}></Circles>
      )}
      <h1>
        {dimensions.width},{dimensions.height}
      </h1>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { csv } from "d3-fetch";
import { autoType } from "d3-dsv";

import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await csv(
        "https://raw.githubusercontent.com/curran/data/gh-pages/uci_ml/auto-mpg/auto-mpg.csv",
        autoType
      );
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Hello World</h1>
      {data.length === 0 ? <Loader type="Circles" /> : <h1>Fetched</h1>}
    </div>
  );
}

export default App;

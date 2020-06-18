import { useState, useEffect } from "react";
import { csv } from "d3-fetch";
import { autoType } from "d3-dsv";

export default function (url) {
  const [{ data, fetching }, setFetching] = useState({
    data: [],
    fetching: true,
  });
  useEffect(() => {
    const fetch = async () => {
      const data = await csv(url, autoType);
      setFetching({ data, fetching: false });
    };
    fetch();
  }, [url]);

  return [data, fetching];
}

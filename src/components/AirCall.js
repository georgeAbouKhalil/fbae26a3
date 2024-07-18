import { useEffect, useState } from "react";
import { getAllAcitivies } from "../utils/data.js";

import ListCall from "./view_components/ListCall.js";

export default function AirCall() {
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const result = await getAllAcitivies();

      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return <ListCall data={data} />;
}

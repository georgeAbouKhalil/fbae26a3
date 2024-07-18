import { useEffect, useState } from "react";
import { getAllAcitivies } from "../../utils/data";
import ListCall from "./ListCall";

export default function ActivityFeed() {
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

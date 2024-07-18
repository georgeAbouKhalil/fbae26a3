import { useEffect, useState } from "react";
import { getMissedCalls } from "../../utils/data";
import ListCall from "./ListCall";

export default function MissedCall() {
  const [missedCalls, setMissedCalls] = useState([]);

  useEffect(() => {
    async function fetchMissedCalls() {
      try {
        const data = await getMissedCalls();
        setMissedCalls(data);
      } catch (error) {
        console.error("Error fetching missed calls:", error);
      }
    }

    fetchMissedCalls();
  }, []);

  const sortedArray = [];

  missedCalls.forEach((call) => {
    const index = sortedArray.findIndex(
      (sortedCall) => call.from === sortedCall.from
    );
    if (index === -1) {
      sortedArray.push({
        id: call.id,
        from: call.from,
        callHistory: [call],
        counter: 1,
        lastTime: call.created_at,
        direction: call.direction,
        duration: call.duration,
        to: call.to,
        call_type: call.call_type,
        is_archived: call.is_archived,
      });
    } else {
      sortedArray[index].callHistory.push(call);
      sortedArray[index].counter++;
      if (new Date(call.time) > new Date(sortedArray[index].lastTime)) {
        sortedArray[index].lastTime = call.time;
      }
    }
  });

  return (
    <div>
      <ListCall data={sortedArray} />
    </div>
  );
}

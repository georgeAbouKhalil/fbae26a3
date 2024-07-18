import ListCard from "./ListCard";
import "../../css/ListCall.css";

import { Link } from "react-router-dom";

export default function ListCall({ data }) {
  if (!data) {
    return <div>Loading...</div>;
  }

  const nonArchivedCalls = data.filter((call) => !call.is_archived);
  const sortedArray = [];

  nonArchivedCalls.forEach((call) => {
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
        to: call.to,
        call_type: call.call_type,
        is_archived: call.is_archived,
      });
    } else {
      sortedArray[index].callHistory.push(call);
      sortedArray[index].counter++;

      if (new Date(call.created_at) > new Date(sortedArray[index].lastTime)) {
        sortedArray[index].lastTime = call.created_at;
      }
    }
  });

  return (
    <div className="listCallContainer">
      <button className="archiveCalls">
        <img width={20} src="../../../public/images/archive.png" />
        <Link to={"/archive"} className="archiveText">
          Archive calls
        </Link>
      </button>
      <ul className="heightScreen">
        {sortedArray.map((item) => (
          <ListCard key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

import { Link } from "react-router-dom";
import { formatDate, formatTime } from "../../utils/helper";
import "../../css/ListCall.css";

export default function ListCard({ item }) {
  const Itemdate = formatDate(item?.lastTime || item.created_at);
  const ItemTime = formatTime(item?.lastTime || item.created_at);

  return (
    <div className="">
      <ul className="center">
        <span className="dateStyle">{Itemdate}</span>
        <li className="callCard">
          <Link to={`/activityDetail/${item?.id}`}>
            <div className="left">
              <span className="itemFrom">
                <span>
                  {item.call_type === "missed" ? (
                    <img
                      width={15}
                      src="../../../public/images/incoming-call.png "
                    />
                  ) : (
                    <img width={15} src="../../../public/images/outbound.png" />
                  )}
                </span>
                {item.from}{" "}
                {item.counter > 0 && (
                  <span className="countNum">{item.counter}</span>
                )}
              </span>

              <div className="additionalInfo">
                <span>tried to call on {item.to}</span>
              </div>
            </div>
          </Link>
          <div className="right">
            <span>{ItemTime}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

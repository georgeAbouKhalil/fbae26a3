import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/ActivityDetail.css";

function getActivityClass(callType) {
  switch (callType) {
    case "answered":
      return "answered-call";
    case "missed":
      return "missed-call";
    case "voicemail":
      return "voicemail-call";
    default:
      return "";
  }
}

// Function to update activity on the API using fetch
async function updateActivity(updatedActivity) {
  const url = `https://aircall-backend.onrender.com/activities/${updatedActivity.id}`;
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedActivity),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error updating activity: ${error.message}`);
  }
}

export default function ActivityDetail() {
  const { id } = useParams(); 
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await fetch(
          `https://aircall-backend.onrender.com/activities/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const activityData = await response.json();
        setActivity(activityData);
      } catch (error) {
        console.error("Error fetching activity:", error);
      }
    }

    fetchActivity();
  }, [id]);

  if (!activity) {
    return <div>Loading...</div>;
  }

  const callTypeClass = getActivityClass(activity.call_type);

  async function handleArchive() {
    try {
      const updatedActivity = {
        ...activity,
        is_archived: !activity.is_archived,
      };
      setActivity(updatedActivity);

      await updateActivity(updatedActivity);
    } catch (error) {
      console.error("Error archiving activity:", error);
    }
  }

  return (
    <div className="activity-detail">
      <h1 className={callTypeClass}>{activity.call_type}</h1>
      <div className="details">
        <p>
          <strong>Created At:</strong> {activity.created_at}
        </p>
        <p>
          <strong>Direction:</strong> {activity.direction}
        </p>
        <p>
          <strong>From:</strong> {activity.from}
        </p>
        <p>
          <strong>To:</strong> {activity.to}
        </p>
        <p>
          <strong>Via:</strong> {activity.via}
        </p>
        <p>
          <strong>Archived:</strong> {activity.is_archived ? "Yes" : "No"}
          <button
            className={`archive-button ${
              activity.is_archived ? "restore" : "archive"
            }`}
            onClick={handleArchive}
          >
            {activity.is_archived ? "Restore" : "Archive"}
          </button>
        </p>
      </div>
    </div>
  );
}

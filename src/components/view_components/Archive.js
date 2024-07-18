import React, { useEffect, useState } from "react";
import ListCard from "./ListCard";


async function fetchArchivedActivities() {
  const url = `https://aircall-backend.onrender.com/activities`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const activities = await response.json();
    
    return activities.filter((activity) => activity.is_archived);
  } catch (error) {
    console.error("Error fetching archived activities:", error);
    return []; 
  }
}

export default function Archive() {
  const [archivedActivities, setArchivedActivities] = useState([]);

  useEffect(() => {
    async function fetchArchiveData() {
      const archivedData = await fetchArchivedActivities();
      setArchivedActivities(archivedData);
    }

    fetchArchiveData();
  }, []);

  return (
    <div className="archive-container">
      {archivedActivities.length === 0 ? (
        <p>No archived activities found.</p>
      ) : (
        <ul className="heightScreen">
          {archivedActivities.map((activity) => (
            <ListCard key={activity.id} item={activity} />
          ))}
        </ul>
      )}
    </div>
  );
}

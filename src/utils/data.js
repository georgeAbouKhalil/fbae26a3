export async function getAllAcitivies() {
  const BaseUrl = "https://aircall-backend.onrender.com/activities";
  try {
    const response = await fetch(BaseUrl);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getMissedCalls() {
  const activityUrl = `https://aircall-backend.onrender.com/activities`;
  try {
    const response = await fetch(activityUrl);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    const missedCalls = json.filter(
      (activity) => activity.call_type === "missed"
    );

    return missedCalls;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function getActivity(id) {
  const activityUrl = `https://aircall-backend.onrender.com/activities/${id}`;
  try {
    const response = await fetch(activityUrl);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

export async function fetchArchivedActivities() {
  try {
    const response = await fetch(
      "https://aircall-backend.onrender.com/activities"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const archivedActivities = data.filter(
      (activity) => activity.is_archived === true
    );

    return archivedActivities;
  } catch (error) {
    console.error("Error fetching or filtering data:", error);
    return [];
  }
}

export async function updateActivity(updatedActivity) {
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
    return await response.json(); // Assuming API returns updated activity data
  } catch (error) {
    throw new Error(`Error updating activity: ${error.message}`);
  }
}

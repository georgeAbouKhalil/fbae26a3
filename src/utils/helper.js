export function formatDate(dateString) {
  let date = new Date(dateString);
  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = monthNames[date.getMonth()];
  let day = ("0" + date.getDate()).slice(-2);
  let year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function formatTime(dateString) {
  let date = new Date(dateString);
  let hours = date.getHours();
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${hours}:${minutes} ${ampm}`;
}

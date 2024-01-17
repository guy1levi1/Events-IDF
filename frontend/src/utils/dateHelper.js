// Function to convert the provided date string to a JavaScript Date object
function convertToDateObject(dateString) {
  return new Date(dateString);
}

// Function to format a JavaScript Date object to the desired string format
function formatDateString(dateObject) {
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const seconds = dateObject.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Example usage:
const inputDateString = "Thu Jan 18 2024 00:59:00 GMT+0200 (שעון ישראל (חורף))";
const dateObject = convertToDateObject(inputDateString);
const formattedDateString = formatDateString(dateObject);

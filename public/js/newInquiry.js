

const dateTimeInput = document.getElementById("date-time-input");
const currentDate = new Date();
const dateString = currentDate.toLocaleDateString();
const timeString = currentDate.toLocaleTimeString();
const dateTimeString = `${dateString}, ${timeString}`;
dateTimeInput.setAttribute("value", `${dateTimeString}`);

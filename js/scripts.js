export const setDefaultDateTime = () => {
    // Get references to the date and time input elements
    let dateInput = document.getElementById("date");
    let timeInput = document.getElementById("time");

    // Get the current date and time
    let now = new Date();
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");

    // Format the current date in "YYYY-MM-DD" format
    let formattedDate = `${year}-${month}-${day}`;

    // Format the current time in "HH:mm" format
    let formattedTime = `${hours}:${minutes}`;

    // Set the values in the date and time input fields
    dateInput.value = formattedDate;
    timeInput.value = formattedTime;
}
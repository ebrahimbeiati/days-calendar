import { generateCalendar } from "./calendarView.mjs";
import { getCommemorativeDaysForYear } from "../core/dataRules.mjs";
import daysData from "../data/days.json" with { type: "json" };

//Get DOM elements
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarContainer = document.getElementById("calendar-container");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let now = new Date();
let currentYear = now.getUTCFullYear();
let currentMonth = now.getUTCMonth();

//Populate dropdowns

function initDropdowns() {
  monthNames.forEach((name, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = name;
    if (index === currentMonth) option.selected = true;
    monthSelect.appendChild(option);
  });

  for (let year = 1900; year <= 2100; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    if (year === currentYear) option.selected = true;
    yearSelect.appendChild(option);
  }
}

//Render current calendar
function updateCalendar() {
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;

  const commemorativeDays = getCommemorativeDaysForYear(currentYear, daysData);
  generateCalendar(currentMonth, currentYear, commemorativeDays);
}

//Event listeners
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  monthSelect.value = currentMonth;
  yearSelect.value = currentYear;
  updateCalendar();
});

monthSelect.addEventListener("change", () => {
  currentMonth = Number(monthSelect.value);
  updateCalendar();
});

yearSelect.addEventListener("change", () => {
  currentYear = Number(yearSelect.value);
  updateCalendar();
});

//Initialize
initDropdowns();
updateCalendar();

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
// Use local time for dropdown defaults, but calendar calculations will use UTC to avoid timezone issues
let currentYear = now.getFullYear();
let currentMonth = now.getMonth();

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
 
// If year doesn't exist in dropdown, add it dynamically
  if (!yearSelect.querySelector(`option[value="${currentYear}"]`)) {
    const option = document.createElement("option");
    option.value = currentYear;
    option.textContent = currentYear;

    if (currentYear < 1900) {
      yearSelect.insertBefore(option, yearSelect.firstChild); // Add at top
    } else {
      yearSelect.appendChild(option); // Add at bottom
    }
  }
  // Update dropdowns to display current month/year (in case they were changed by prev/next buttons)
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
  // We reallised the job for these 2 variables is just to update the dropdowns, so we moved the updateCalendar() call here and removed it from the month/year change listeners.
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

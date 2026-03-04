// Get references to DOM
const calendarEl = document.getElementById("calendar-container");
const monthYearEl = document.getElementById("monthYear");
const todayDateEl = document.getElementById("today-date");

// Current month/year
let today = new Date();
// Use local time for display, but calendar calculations will use UTC to avoid timezone issues
const todayUTC = {
  year: today.getFullYear(),
  month: today.getMonth(),
  day: today.getDate(),
};

// show month and year
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

// Display today's date
function displayTodaysDate() {
  const dayOfWeekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
 
  todayDateEl.textContent = `Today: ${dayOfWeekNames[new Date().getUTCDay()]} ${monthNames[todayUTC.month]} ${todayUTC.day} ${todayUTC.year}`;
}

displayTodaysDate();

export function generateCalendar(month, year, commemorativeDays = []) {
  calendarEl.innerHTML = ""; // clear previous calender
  monthYearEl.textContent = `${monthNames[month]} ${year}`;

  // Add header row with day-of-week labels
  const dayOfWeekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const headerRow = document.createElement("div");
  headerRow.setAttribute("role", "row");

  dayOfWeekNames.forEach((dayName) => {
    const headerCell = document.createElement("div");
    headerCell.className = "day-header";
    //shows a 3‑letter abbreviation e.g. "Mon" for Monday, "Tue" for Tuesday.
    headerCell.textContent = dayName.slice(0, 3);
    headerCell.setAttribute("role", "columnheader");
    headerCell.setAttribute("aria-label", dayName);
    headerRow.appendChild(headerCell);
  });

  calendarEl.appendChild(headerRow);

  // First day of the month
  const firstDay = new Date(Date.UTC(year, month, 1));
  const firstWeekday = firstDay.getUTCDay();

  //This uses the “day 0 of next month” trick to get the last day of the current month.
  const lastDay = new Date(Date.UTC(year, month + 1, 0));
  const daysInMonth = lastDay.getUTCDate();

  // These calculations determine: how many empty cells appear before day 1, and 
  // how many empty cells appear after the last day
  const totalCells = firstWeekday + daysInMonth;
  const trailingEmpty = (7 - (totalCells % 7)) % 7;
 

  // Create weeks with rows
  let cellCount = 0;
  let currentRow = null;

  // This fills the first row with blank cells until the first real date should appear.
  for (let i = 0; i < firstWeekday; i++) {
    if (cellCount % 7 === 0) {
      currentRow = document.createElement("div");
      currentRow.setAttribute("role", "row");
      calendarEl.appendChild(currentRow);
    }
    const emptyCell = document.createElement("div");
    emptyCell.className = "day empty";
    emptyCell.setAttribute("aria-hidden", "true");
    emptyCell.setAttribute("role", "gridcell");
    currentRow.appendChild(emptyCell);
    cellCount++;
  }

  // Fill actual days
  for (let day = 1; day <= daysInMonth; day++) {
    //Every 7 cells, a new row begins.
    if (cellCount % 7 === 0) {
      currentRow = document.createElement("div");
      currentRow.setAttribute("role", "row");
      calendarEl.appendChild(currentRow);
    }

    const dayCell = document.createElement("div");
    dayCell.className = "day";

    // Highlight today if current month/year
    if (
      year === todayUTC.year &&
      month === todayUTC.month &&
      day === todayUTC.day
    ) {
      dayCell.classList.add("today");
    }

    //This checks whether the current cell matches any commemorative day. 
    // If it does, it adds a special class and includes the commemorative day’s name in the cell.
    const commemorativeDay = commemorativeDays.find(
      (commDay) =>
        commDay.date.getUTCDate() === day &&
        commDay.date.getUTCMonth() === month &&
        commDay.date.getUTCFullYear() === year,
    );
    if (commemorativeDay) {
      dayCell.classList.add("commemorative-day");
      dayCell.innerHTML = `<div class="day-number">${day}</div><div class="day-name">${commemorativeDay.name}</div>`;
    } else {
      dayCell.textContent = day;
    }

    dayCell.setAttribute("role", "gridcell");
    const commName = commemorativeDay ? ` - ${commemorativeDay.name}` : "";
    dayCell.setAttribute(
      "aria-label",
      `${day} ${monthNames[month]} ${year}${commName}`,
    );

    currentRow.appendChild(dayCell);
    cellCount++;
  }

  // This fills the last row so the grid is complete.
  for (let i = 0; i < trailingEmpty; i++) {
    if (cellCount % 7 === 0) {
      currentRow = document.createElement("div");
      currentRow.setAttribute("role", "row");
      calendarEl.appendChild(currentRow);
    }
    const emptyCell = document.createElement("div");
    emptyCell.className = "day empty";
    emptyCell.setAttribute("aria-hidden", "true");
    emptyCell.setAttribute("role", "gridcell");
    currentRow.appendChild(emptyCell);
    cellCount++;
  }
}

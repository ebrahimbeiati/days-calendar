// Get references to DOM
const calendarEl = document.getElementById("calendar-container");
const monthYearEl = document.getElementById("monthYear");
const todayDateEl = document.getElementById("today-date");

// Current month/year
let today = new Date();
const todayUTC = {
  year: today.getUTCFullYear(),
  month: today.getUTCMonth(),
  day: today.getUTCDate(),
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
  const dayName = dayOfWeekNames[todayUTC.month];
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
    headerCell.textContent = dayName.slice(0, 3);
    headerCell.setAttribute("role", "columnheader");
    headerCell.setAttribute("aria-label", dayName);
    headerRow.appendChild(headerCell);
  });

  calendarEl.appendChild(headerRow);

  // First day of the month
  const firstDay = new Date(Date.UTC(year, month, 1));
  const firstWeekday = firstDay.getUTCDay();

  // Number of days in month
  const lastDay = new Date(Date.UTC(year, month + 1, 0));
  const daysInMonth = lastDay.getUTCDate();

  // Total cells needed
  const totalCells = firstWeekday + daysInMonth;
  const trailingEmpty = (7 - (totalCells % 7)) % 7;
  const totalDaysToShow = firstWeekday + daysInMonth + trailingEmpty;

  // Create weeks with rows
  let cellCount = 0;
  let currentRow = null;

  // Leading empty days
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

    // Mark commemorative days and add their names
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

  // Trailing empty days
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

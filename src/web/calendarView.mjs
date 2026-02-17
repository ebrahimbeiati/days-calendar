
 // Get references to DOM
const calendarEl = document.getElementById('calendar-container');
const monthYearEl = document.getElementById('monthYear');

// Current month/year
let today = new Date();
let currentMonth = today.getUTCMonth();
let currentYear = today.getUTCFullYear();

function generateCalendar(month,year) {
    calendarEl.innerHTML =''; // clear previous calender

    // show month and year
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]


 monthYearEl.textContent = `${monthNames[month]} ${year}`;

  // First day of the month
  const firstDay = new Date(Date.UTC(year, month, 1));
  const firstWeekday = firstDay.getUTCDay(); 

  // Number of days in month
  const lastDay = new Date(Date.UTC(year, month + 1, 0));
  const daysInMonth = lastDay.getUTCDate();

  // Leading empty days
  for (let i = 0; i < firstWeekday; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'day empty';
    calendarEl.appendChild(emptyCell);
  }

  // Fill actual days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'day';
    dayCell.textContent = day;
    calendarEl.appendChild(dayCell);
  }

  // Trailing empty days (to fill last week)
  const totalCells = firstWeekday + daysInMonth;
  const trailingEmpty = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < trailingEmpty; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'day empty';
    calendarEl.appendChild(emptyCell);
    
    
  }}  
  generateCalendar(currentMonth, currentYear);

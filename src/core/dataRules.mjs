export function getNthWeekdayOfMonth(year, month, weekday, n) {
  if (n === "last") {
    // Start the last day of the month
    const lastDay = new Date(Date.UTC(year, month + 1, 0));
    const lastWeekday = lastDay.getUTCDay();
    const diff = (lastWeekday - weekday + 7) % 7;
    return new Date(Date.UTC(year, month, lastDay.getUTCDate() - diff));
  } else {
    // Start the first day of the month
    const firstDay = new Date(Date.UTC(year, month, 1));
    const firstWeekday = firstDay.getUTCDay();
    const diff = (weekday - firstWeekday + 7) % 7;
    return new Date(Date.UTC(year, month, 1 + diff + (n - 1) * 7));
  }
}

function weekdayStringToNumber(weekday) {
  const weekdays = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  return weekdays[weekday];
}

// Convert month name to month index (0-11)
function monthNameToIndex(monthName) {
  const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  return months[monthName];
}

// Convert occurrence string to nth value
function occurrenceToNth(occurrence) {
  const occurrenceMap = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    fifth: 5,
    last: "last",
  };
  return occurrenceMap[occurrence];
}

// Returning an array of commemorative days for a given year
export function getCommemorativeDaysForYear(year, daysData) {
  return daysData.map((day) => {
    const monthIndex = monthNameToIndex(day.monthName);
    const weekdayNum = weekdayStringToNumber(day.dayName);
    const nth = occurrenceToNth(day.occurrence);
    const date = getNthWeekdayOfMonth(year, monthIndex, weekdayNum, nth);
    return {
      name: day.name,
      date,
    };
  });
}

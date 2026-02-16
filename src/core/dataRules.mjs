export function getNthWeekdayOfMonth(year, month, weekday, n) {
    if(n === "last") {
        // Start the last day of the month
        const lastDay = new Date(year, month + 1, 0);
        const lastWeekday = lastDay.getDay();
        const diff = (lastWeekday - weekday + 7) % 7;
        return new Date(year, month, lastDay.getDate() - diff);
    } else {
        // Start the first day of the month
        const firstDay = new Date(year, month, 1);
        const firstWeekday = firstDay.getDay();
        const diff = (weekday - firstWeekday + 7) % 7;
        return new Date(year, month, 1 + diff + (n - 1) * 7);
    }
}
// Returning an array of commemorative days for a given year
export function getCommemorativeDaysForYear(year, daysData ){
    return daysData.map(day => {
        const monthIndex = day.month - 1; 
        const weekdayNum = weekdayStringToNumber(day.weekday);
        const date = getNthWeekdayOfMonth(year, monthIndex, weekdayNum, day.nth);
        return {
           name: day.name,
            date
        };
    });
}
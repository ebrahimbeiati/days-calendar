export function generateMonthGrid(year, month) {
    const weeks = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();

    let currentWeek = [];
    
    // Fill in leading days from previous month
    const startWeekday = firstDayOfMonth.getDay(); // 0 = Sunday, 
    for (let i = 0; i < startWeekday; i++) {
        const prevDate = new Date(year, month, 1 - (startWeekday - i));
        currentWeek.push({ date: prevDate, isCurrentMonth: false });
    }

    // Fill in days of the current month
    for (let day = 1; day <= numDaysInMonth; day++) {
        const date = new Date(year, month, day);
        currentWeek.push({ date, isCurrentMonth: true });
        if (currentWeek.length === 7) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }
    // Fill in trailing days from next month
    let nextDay = 1;
    while (currentWeek.length > 0 && currentWeek.length < 7) {
        const date = new Date(year, month + 1, nextDay++);
        currentWeek.push({ date, isCurrentMonth: false });
    }
    if (currentWeek.length > 0) weeks.push(currentWeek);

    return weeks;
}
    
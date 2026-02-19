import fs from "fs";
import path from "path";
import { getCommemorativeDaysForYear } from "./dateRules.mjs";

// Load the commemorative days JSON file
const daysData = JSON.parse(
  fs.readFileSync(path.resolve("./data/days.json"), "utf-8"),
);

// Function to format Date objects into iCal YYYYMMDD format
function formatDate(date) {
  const y = date.getUTCFullYear(); // Year
  const m = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month (two digits)
  const d = String(date.getUTCDate()).padStart(2, "0"); // Day (two digits)
  return `${y}${m}${d}`; // Combine into YYYYMMDD
}

// Function to generate the full iCal content
function generateICS(daysData, startYear = 2020, endYear = 2030) {
  // Start the VCALENDAR
  let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourCompany//CommemorativeDays//EN
CALSCALE:GREGORIAN
`;

  // Loop over each year in the range
  for (let year = startYear; year <= endYear; year++) {
    // Get all commemorative days for this year
    const commemorativeDays = getCommemorativeDaysForYear(year, daysData);

    // Loop over each holiday and add a VEVENT
    commemorativeDays.forEach((day) => {
      const dateStr = formatDate(day.date); // Format date for iCal

      icsContent += `BEGIN:VEVENT
UID:${day.name.replace(/\s+/g, "")}-${year}@yourcompany.com
DTSTAMP:${formatDate(new Date())}T000000Z
SUMMARY:${day.name}
DTSTART;VALUE=DATE:${dateStr}
DTEND;VALUE=DATE:${dateStr}
END:VEVENT
`;
    });
  }

  // Close the VCALENDAR
  icsContent += `END:VCALENDAR
`;

  // Return the full iCal content
  return icsContent;
}

// Generate the iCal content
const icsFileContent = generateICS(daysData);

// Write the content to a file
fs.writeFileSync(path.resolve("./days.ics"), icsFileContent, "utf-8");

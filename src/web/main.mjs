import {generateCalendar} from "./calendarView.mjs";
import { getCommemorativeDaysForYear } from "../core/dataRules.mjs";
import daysData from "../data/days.json" with { type: "json" };

let currentYear = new Date().getUTCFullYear();
let currentMonth = new Date().getUTCMonth(); // 0-11

//Get DOM elements
const calendarContainer = document.getElementById("calendar-container");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");

//Populate dropdowns

function initDropdowns() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"];
    
         monthNames.forEach((name, index) => {
             const option = document.createElement("option");
             option.value = index;
             option.textContent = name;
             if(index === currentMonth) option.selected = true;
             monthSelect.appendChild(option);
         });

         for(let year = 1900; year <= 2100; year++) {
             const option = document.createElement("option");
             option.value = year;
             option.textContent = year;
             if(year === currentYear) option.selected = true;
             yearSelect.appendChild(option);
         }
         }

         //Render current calendar
         function updateCalendar() {
             const commemorativeDays = getCommemorativeDaysForYear(currentYear, daysData);
             generateCalendar(calendarContainer, currentYear, currentMonth, commemorativeDays);
            }

            //Event listeners
            prevBtn.addEventListener("click", () => {
                currentMonth--;
                if(currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                updateCalendar();
            });
            
            nextBtn.addEventListener("click", () => {
                currentMonth++;
                if(currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                monthSelect.value = currentMonth;
                yearSelect.value = currentYear;
                updateCalendar();
            });
            
            monthSelect.addEventListener("change", () => {
                currentMonth = parseInt(monthSelect.value);
                updateCalendar();
            });
            
            yearSelect.addEventListener("change", () => {
                currentYear = parseInt(yearSelect.value);
                updateCalendar();
            });

            //Initialize
            initDropdowns();
            updateCalendar();
           
import { 
  jd_to_persian,
  persian_to_jd,
  leap_persian,
  jd_to_gregorian,
  NormLeap,
} from "@/util/calendar.js";

import { gregorianDateToJulianDay } from "@/util/CalendarHelpers.js";
import { pipe, map, filter,  reduce, inspect } from "@/util/Pipe.js";


const PERSIAN_MONTHS = ["Farvardin", "Ordibehesht", "Khordad", "Tir", "Mordad", "Shahrivar", "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand"];

export const gregorianToPersian = pipe(
  gregorianDateToJulianDay,
  jd_to_persian,
  formatPersianDate
)

function formatPersianDate(fourmilabPersianDate) {
  return {
    calendar: "persian",
    year: fourmilabPersianDate[0],
    month: fourmilabPersianDate[1] - 1,
    day: fourmilabPersianDate[2],
    yearType: NormLeap[leap_persian(fourmilabPersianDate[0]) ? 1 : 0],
    isLeapYear: leap_persian(fourmilabPersianDate[0])
  }
}

export function renderPersianDateToEnglish({day, month, year}) {
  return `${PERSIAN_MONTHS[month]} ${day}, ${year}`;
}

export function persianDateGetNextGregorianOccurence(originalPersianDate, currentDate) {
  const currentJulianDay = gregorianDateToJulianDay(currentDate);
  const currentPersianDate = gregorianToPersian(currentDate);
  const currentPersianYear = currentPersianDate.year;

  let projectedPersianDate = deepClone(originalPersianDate);
  projectedPersianDate.year = currentPersianYear; // Start our search with today's persian date
  let projectedJulianDay = persianDateToJulianDay(projectedPersianDate);

  if(projectedJulianDay <= currentJulianDay) { // if we've missed this year's occurence
    projectedPersianDate.year += 1;
    projectedJulianDay = persianDateToJulianDay(projectedPersianDate);
  }
  
  const [year, month, day] = jd_to_gregorian(projectedJulianDay);
  return { calendar: "gregorian", year, month: month - 1, day }
}

function persianDateToJulianDay({year, month, day}) {
  return persian_to_jd(year, month + 1, day)
}

const deepClone = obj => JSON.parse(JSON.stringify(obj));
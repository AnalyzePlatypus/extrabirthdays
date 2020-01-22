import { 
  jd_to_persian,
  persian_to_jd,
  leap_persian,
  NormLeap,
} from "@/util/calendar.js";

import { gregorianDateToJulianDay } from "@/util/CalendarHelpers.js";
import { pipe } from "@/util/Pipe.js";


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

export function persianToJulianDay({year, month, day}) {
  return persian_to_jd(year, month + 1, day)
}
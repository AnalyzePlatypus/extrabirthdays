import { 
  jd_to_islamic,
  indian_civil_to_jd,
  jd_to_indian_civil,
  leap_gregorian,
  jd_to_gregorian,
  NormLeap,
} from "@/util/calendar.js";

import { gregorianDateToJulianDay } from "@/util/CalendarHelpers.js";
import { pipe, log } from "@/util/Pipe.js";


const INDIAN_CIVIL_MONTH_ENGLISH_NAMES = ["Caitra", "Vaisakha", "Jyaistha", "Asadha", "Sravana", "Bhadra", "Asvina", "Kartika", "Agrahayana", "Pausa", "Magha", "Phalguna"];


export const gregorianToIndianCivil = pipe(
  gregorianDateToJulianDay,
  jd_to_indian_civil,
  formatIndianCivilDate
)

function formatIndianCivilDate(fourmilabIndianCivilDate) {
  const isLeapYear = leap_gregorian(fourmilabIndianCivilDate[0] + 78);
  return {
    calendar: "indian_civil",
    year: fourmilabIndianCivilDate[0],
    month: fourmilabIndianCivilDate[1] - 1,
    day: fourmilabIndianCivilDate[2],
    yearType: NormLeap[isLeapYear ? 1 : 0],
    isLeapYear
  }
}

export function indianCivilToJulianDay({year, month, day}) {
  return indian_civil_to_jd(year, month + 1, day)
}

export function renderIndianCivilDateToEnglish({day, month, year}) {
  return `${INDIAN_CIVIL_MONTH_ENGLISH_NAMES[month]} ${day}, ${year}`;
}
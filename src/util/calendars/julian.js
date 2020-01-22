import { 
  julian_to_jd,
  jd_to_julian,
  leap_julian,
  NormLeap,
} from "@/util/calendar.js";

import { jwday } from "@/util/astro.js";

import { gregorianDateToJulianDay } from "@/util/CalendarHelpers.js";

export function gregorianToJulian(gregorianDate) {
  let julianDay = gregorianDateToJulianDay(gregorianDate);
  let julianReturnValue = jd_to_julian(julianDay);

  return {
    calendar: "julian",
    year: julianReturnValue[0],
    month: julianReturnValue[1] - 1,
    day: julianReturnValue[2],
    isLeapYear: NormLeap[leap_julian(julianReturnValue[0]) ? 1 : 0],
    weekday: jwday(julianDay)
  }
}

export function julianToJulianDay({year, month, day}) {
  return julian_to_jd(year, month + 1, day);
}
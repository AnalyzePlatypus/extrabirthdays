import { 
  gregorian_to_jd, 
  jd_to_julian,
  leap_julian,
  NormLeap,
} from "@/util/calendar.js";


import {
  astor, 
  rtd, 
  fixangle,
  fixangr,
  dsin,
  dcos,
  mod,
  amo,
  jhms,
  jwday,
  obliqeq,
  nutation,
  ecliptoeq,
  Weekdays,
  deltat,
  equinox,
  sunpos,
  equationOfTime
} from "@/util/astro.js";


const WESTERN_MONTHS = ["January", "February", "March", "April", 'May', "June", "July", "August", "September", "October", "November" ,"December"]

export function gregorian_to_julian(gregorianDate) {

  let julianDay = gregorianDateToJulianDay(gregorianDate);
  
  let julianReturnValue = jd_to_julian(julianDay);

  let year, month, day, isLeapYear, weekday;
  return {
    calendar: "julian",
    year: julianReturnValue[0],
    month: julianReturnValue[1] - 1,
    day: julianReturnValue[2],
    isLeapYear: NormLeap[leap_julian(julianReturnValue[0]) ? 1 : 0],
    weekday: jwday(julianDay)
  }
}

export function gregorianDateToJulianDay(gregorianDate) {
  return gregorian_to_jd(
    gregorianDate.getFullYear(), 
    gregorianDate.getMonth() + 1, // Expects the month to be 1-indexed, for some reason
    gregorianDate.getDate()) + getTimeAsSeconds(gregorianDate);
}

function getTimeAsSeconds(date) {
  return Math.floor(date.getSeconds() + 60 * (date.getMinutes() + 60 * date.getHours()) + 0.5) / 86400.0;
}

export function renderJulianDate({ year, month, day, isLeapYear, weekday}) {
  return `${WESTERN_MONTHS[month]} ${day}, ${year}`;
}
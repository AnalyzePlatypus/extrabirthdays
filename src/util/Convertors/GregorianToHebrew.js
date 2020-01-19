import { 
  jd_to_hebrew,
  hebrew_year_days,
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


import { gregorianDateToJulianDay } from "@/util/CalendarHelpers.js";

export function gregorianToHebrew(gregorianDate) {
  //  Update Hebrew Calendar
  const julianDay = gregorianDateToJulianDay(gregorianDate);
  const hebcal = jd_to_hebrew(julianDay);

  let yearType;
  let isLeapYear = false;

  switch (hebrew_year_days(hebcal[0])) {
      case 353:
          yearType = "Common deficient (353 days)";
          break;

      case 354:
          yearType = "Common regular (354 days)";
          break;

      case 355:
          yearType = "Common complete (355 days)";
          break;

      case 383:
          yearType = "Embolismic deficient (383 days)";
          isLeapYear = true;
          break;

      case 384:
          yearType = "Embolismic regular (384 days)";
          isLeapYear = true;
          break;

      case 385:
          yearType = "Embolismic complete (385 days)";
          isLeapYear = true;
          break;

      default:
          yearType = "Invalid year length: " +
              hebrew_year_days(hebcal[0]) + " days.";
          break;
  }

  return {
    calendar: "hebrew",
    year: hebcal[0],
    month: hebcal[1] - 1,
    day: hebcal[2],
    isLeapYear,
    yearType
  }
}

const HEBREW_MONTHS_REGULAR__ENGLISH = ["Nissan", "Iyar", "Tammuz", "Av", "Elul", "Tishrei", "Cheshvan", "Kislev", "Tevet", "Shvat", "Adar"];
const HEBREW_MONTHS_LEAP_YEAR__ENGLISH = ["Nissan", "Iyar", "Tammuz", "Av", "Elul", "Tishrei", "Cheshvan", "Kislev", "Tevet", "Shvat", "Adar I", "Adar II"];
const HEBREW_MONTHS_REGULAR__HEBREW = [];
const HEBREW_MONTHS_LEAP_YEAR__HEBREW = [];

export function renderHebrewDateToEnglish({year, month, day, isLeapYear, yearType, calendar}) {
  const months = isLeapYear ? HEBREW_MONTHS_LEAP_YEAR__ENGLISH : HEBREW_MONTHS_REGULAR__ENGLISH;
  return `${months[month]} ${day}, ${year}`
}

export function renderHebrewDateToHebrew(hebrewDateObject) {

}
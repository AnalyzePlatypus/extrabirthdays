import { 
  jd_to_hebrew,
  hebrew_year_days,
  hebrew_to_jd,
  jd_to_gregorian,
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
  return `${months[month - 1]} ${day}, ${year}`
}

export function renderHebrewDateToHebrew(hebrewDateObject) {

}

export function hebrewDateToNextGregorianOccurence(originalHebrewDate, currentDate) {
  const currentJulianDay = gregorianDateToJulianDay(currentDate);
  const currentHebrewDate = gregorianToHebrew(currentDate);
  const currentHebrewYear = currentHebrewDate.year;

  let projectedHebrewDate = deepClone(originalHebrewDate);
  projectedHebrewDate.year = currentHebrewYear; // Start our search with today's Hebrew date
  let projectedJulianDay = hebrewDateToJulianDay(projectedHebrewDate);

  if(projectedJulianDay <= currentJulianDay) { // if we've missed this year's occurence
    projectedHebrewDate.year += 1;
    projectedJulianDay = hebrewDateToJulianDay(projectedHebrewDate);
  }
  
  const [year, month, day] = jd_to_gregorian(projectedJulianDay);
  return { calendar: "gregorian", year, month: month - 1, day }
}

function hebrewDateToJulianDay({year, month, day}) {
  return hebrew_to_jd(year, month + 1, day)
}

const deepClone = obj => JSON.parse(JSON.stringify(obj));
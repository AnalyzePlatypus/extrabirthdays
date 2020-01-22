import { 
  jd_to_hebrew,
  hebrew_year_days,
  hebrew_to_jd,
} from "@/util/calendar.js";

import { gregorianDateToJulianDay } from "@/util/CalendarHelpers.js";
import { pipe } from "@/util/Pipe.js";


const HEBREW_MONTHS_REGULAR__ENGLISH = ["Nissan", "Iyar", "Tammuz", "Av", "Elul", "Tishrei", "Cheshvan", "Kislev", "Tevet", "Shvat", "Adar"];
const HEBREW_MONTHS_LEAP_YEAR__ENGLISH = ["Nissan", "Iyar", "Tammuz", "Av", "Elul", "Tishrei", "Cheshvan", "Kislev", "Tevet", "Shvat", "Adar I", "Adar II"];
const HEBREW_MONTHS_REGULAR__HEBREW = [];
const HEBREW_MONTHS_LEAP_YEAR__HEBREW = [];

const HEBREW_YEAR_TYPES = {
  353: "Common deficient (353 days)",
  354: "Common regular (354 days)",
  355: "Common complete (355 days)",
  383: "Embolismic deficient (383 days)",
  384: "Embolismic regular (384 days)",
  385: "Embolismic complete (385 days)"
}

const HEBREW_LEAP_YEAR_MINIMUM_DAYS = 383;


export const gregorianToHebrew = pipe(
  gregorianDateToJulianDay,
  jd_to_hebrew,
  formatHebrewDate
);

function formatHebrewDate(fourmilabHebrewDate) {
  return {
    calendar: "hebrew",
    year: fourmilabHebrewDate[0],
    month: fourmilabHebrewDate[1] - 1,
    day: fourmilabHebrewDate[2],
    yearType: getHebrewYearType(fourmilabHebrewDate),
    isLeapYear: isHebrewLeapYear(fourmilabHebrewDate)
  }
}

function getHebrewYearType(fourmilabHebrewDate) {
  const daysInYear = hebrew_year_days(fourmilabHebrewDate[0]);
  const yearType = HEBREW_YEAR_TYPES[daysInYear];
  if(!yearType) console.error("Invalid Hebrew year length: " + daysInYear + " days.");
  return yearType;
}

function isHebrewLeapYear(fourmilabHebrewDate) {
  return hebrew_year_days(fourmilabHebrewDate[0]) >= HEBREW_LEAP_YEAR_MINIMUM_DAYS;
}

export function hebrewToJulianDay({year, month, day}) {
  return hebrew_to_jd(year, month + 1, day)
}

export function renderHebrewDateToEnglish({year, month, day, isLeapYear, yearType, calendar}) {
  const months = isLeapYear ? HEBREW_MONTHS_LEAP_YEAR__ENGLISH : HEBREW_MONTHS_REGULAR__ENGLISH;
  return `${months[month - 1]} ${day}, ${year}`
}

export function renderHebrewDateToHebrew(hebrewDateObject) {

}
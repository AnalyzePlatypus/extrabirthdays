
import {  jd_to_gregorian } from "@/util/calendar.js";

import { gregorianDateToJulianDay } from "@/util/CalendarHelpers.js";

import { gregorianToJulian, julianToJulianDay } from "@/util/calendars/julian.js";
import { gregorianToHebrew, hebrewToJulianDay } from "@/util/calendars/hebrew.js";
import { gregorianToIslamic, islamicToJulianDay } from "@/util/calendars/islamic.js";
import { gregorianToPersian, persianToJulianDay } from "@/util/calendars/persian.js";
import { gregorianToIndianCivil, indianCivilToJulianDay } from "@/util/calendars/indian_civil.js";

const enabledCalendars = ["julian", "hebrew", "islamic", "persian", "indian_civil"];

export function nextGregorianOccurence(dateObject, currentDate) {
  if(dateObject instanceof Date) return dateObject.toLocaleDateString();
  if(!enabledCalendars.includes(dateObject.calendar)) console.error(`Unknown calendar type \"${dateObject.calendar}\"`)
  return getNextGregorianOccurrence(dateObject, currentDate);
}

const GREGORIAN_TO_FOREIGN_DATE_FUNCTIONS = {
  julian: gregorianToJulian,
  hebrew: gregorianToHebrew,
  islamic: gregorianToIslamic,
  persian: gregorianToPersian,
  indian_civil: gregorianToIndianCivil
}

const FOREIGN_DATE_TO_JULIAN_DAY_FUNCTIONS = {
  julian: julianToJulianDay,
  hebrew: hebrewToJulianDay,
  islamic: islamicToJulianDay,
  persian: persianToJulianDay,
  indian_civil: indianCivilToJulianDay
}

export function getNextGregorianOccurrence(dateObject, currentDate) {
  console.log("Hi!");
  
  const currentJulianDay = gregorianDateToJulianDay(currentDate);
  const currentForeignDate = gregorianToForeignDate(currentDate, dateObject.calendar);
  const currentForeignYear = currentForeignDate.year;

  let projectedForeignDate = deepClone(dateObject);
  projectedForeignDate.year = currentForeignYear; // Start our search with today's persian date
  let projectedJulianDay = foreignDateToJulianDay(projectedForeignDate, dateObject.calendar);

  if(projectedJulianDay <= currentJulianDay) { // if we've missed this year's occurence
    projectedForeignDate.year += 1;
    projectedJulianDay = foreignDateToJulianDay(projectedForeignDate, dateObject.calendar);
  }
  
  return julianDayToGregorian(projectedJulianDay);
}

function gregorianToForeignDate(gregorianDate, foreignCalendarType) {
  return GREGORIAN_TO_FOREIGN_DATE_FUNCTIONS[foreignCalendarType](gregorianDate);
}

function foreignDateToJulianDay(dateObject, foreignCalendarType) {
  return FOREIGN_DATE_TO_JULIAN_DAY_FUNCTIONS[foreignCalendarType](dateObject);
}

function julianDayToGregorian(julianDay) {
  const [year, month, day] = jd_to_gregorian(julianDay);
  return { calendar: "gregorian", year, month: month - 1, day }
}

const deepClone = obj => JSON.parse(JSON.stringify(obj));


export default nextGregorianOccurence;
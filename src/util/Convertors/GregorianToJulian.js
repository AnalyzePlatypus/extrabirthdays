
import { 
  jd_to_gregorian,
  julian_to_jd,
} from "@/util/calendar.js";

import { 
  gregorianDateToJulianDay, 
  gregorianDateToJulianDate,
  julianDateToJulianDay,
  julianDayToGregorianDate } from "@/util/CalendarHelpers.js";


import deepClone from "@/util/deepClone.js";


export function julianDateToNextGregorianOccurence(originalJulianDate, currentDate) {
  const currentJulianDay = gregorianDateToJulianDay(currentDate);
  const currentJulianDate = gregorianDateToJulianDate(currentDate);
  

  let projectedJulianDate = deepClone(originalJulianDate);
  projectedJulianDate.year = currentJulianDate.year; // Start our search with today's Hebrew date
  let projectedJulianDay = julianDateToJulianDay(projectedJulianDate);

  if(projectedJulianDay <= currentJulianDay) { // if we've missed this year's occurence
    projectedJulianDate.year += 1;
    projectedJulianDay = julianDateToJulianDay(projectedJulianDate);
  }
  
  return julianDayToGregorianDate(projectedJulianDay);
}


import { 
  jd_to_islamic,
  islamic_to_jd,
  leap_islamic,
  jd_to_gregorian,
  NormLeap,
} from "@/util/calendar.js";

import { gregorianDateToJulianDay } from "@/util/CalendarHelpers.js";
import { pipe, map, filter,  reduce, inspect } from "@/util/Pipe.js";


const ISLAMIC_MONTHS = ["Muharram", "Safar", "Rabi`al-Awwal", "Rabi`ath-Thani", "Jumada l-Ula", "Jumada t-Tania", "Rajab", "Sha`ban", "Ramadan", "Shawwal", "Dhu l-Qa`da", "Dhu l-Hijja"];

export const gregorianToIslamic = pipe(
  gregorianDateToJulianDay,
  jd_to_islamic,
  formatIslamicDate
)

function formatIslamicDate(rawIslamicDate) {
  return {
    calendar: "islamic",
    year: rawIslamicDate[0],
    month: rawIslamicDate[1] - 1,
    day: rawIslamicDate[2],
    // document.islamic.wday.value = "yawm " + ISLAMIC_WEEKDAYS[weekday];
    yearType: NormLeap[leap_islamic(rawIslamicDate[0]) ? 1 : 0],
    isLeapYear: leap_islamic(rawIslamicDate[0])
  }
}

export function renderIslamicDateToEnglish({day, month, year}) {
  return `${ISLAMIC_MONTHS[month]} ${day}, ${year}`;
}

export function islamicDateGetNextGregorianOccurence(originalIslamicDate, currentDate) {
  const currentJulianDay = gregorianDateToJulianDay(currentDate);
  const currentIslamicDate = gregorianToIslamic(currentDate);
  const currentIslamicYear = currentIslamicDate.year;

  let projectedIslamicDate = deepClone(originalIslamicDate);
  projectedIslamicDate.year = currentIslamicYear; // Start our search with today's Islamic date
  let projectedJulianDay = islamicDateToJulianDay(projectedIslamicDate);

  if(projectedJulianDay <= currentJulianDay) { // if we've missed this year's occurence
    projectedIslamicDate.year += 1;
    projectedJulianDay = islamicDateToJulianDay(projectedIslamicDate);
  }
  
  const [year, month, day] = jd_to_gregorian(projectedJulianDay);
  return { calendar: "gregorian", year, month: month - 1, day }
}

function islamicDateToJulianDay({year, month, day}) {
  return islamic_to_jd(year, month + 1, day)
}

const deepClone = obj => JSON.parse(JSON.stringify(obj));
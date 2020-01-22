import { 
  jd_to_islamic,
  islamic_to_jd,
  leap_islamic,
  jd_to_gregorian,
  NormLeap,
} from "@/util/calendar.js";

import { gregorianDateToJulianDay } from "@/util/CalendarHelpers.js";
import { pipe } from "@/util/Pipe.js";


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

export function islamicToJulianDay({year, month, day}) {
  return islamic_to_jd(year, month + 1, day)
}

export function renderIslamicDateToEnglish({day, month, year}) {
  return `${ISLAMIC_MONTHS[month]} ${day}, ${year}`;
}
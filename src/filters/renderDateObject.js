
import { renderJulianDate } from "@/util/CalendarHelpers.js";

import { renderHebrewDateToEnglish } from "@/util/Convertors/GregorianToHebrew.js";
import { renderIslamicDateToEnglish } from "@/util/calendars/islamic.js";

export function renderDateObject(dateObject, options) {
  if(dateObject instanceof Date) return dateObject.toLocaleDateString();
  if(!dateObject.calendar) return dateObject;
  switch(dateObject.calendar) {
    case "gregorian":
      return renderJulianDate(dateObject, options); // Gregorian and Julian use the same months
    case "julian":
      return renderJulianDate(dateObject, options);
    case "hebrew":
      return renderHebrewDateToEnglish(dateObject, options);
    case "islamic":
      return renderIslamicDateToEnglish(dateObject, options);
    default: 
      console.error(`Unknown calendar type \"${dateObject.calendar}\"`)
      return dateObject
  }
}

export default renderDateObject;
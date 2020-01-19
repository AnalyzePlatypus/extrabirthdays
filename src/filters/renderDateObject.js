
import { renderJulianDate } from "@/util/CalendarHelpers.js";

import { renderHebrewDateToEnglish } from "@/util/Convertors/GregorianToHebrew.js";


export function renderDateObject(dateObject) {
  if(dateObject instanceof Date) return dateObject.toLocaleDateString();
  switch(dateObject.calendar) {
    case "gregorian":
      return renderJulianDate(dateObject); // Gregorian and Julian use the same months
    case "julian":
      return renderJulianDate(dateObject);
    case "hebrew":
      return renderHebrewDateToEnglish(dateObject);
    default: 
      console.error(`Unknown calendar type \"${dateObject.calendar}\"`)
      return dateObject
  }
}

export default renderDateObject;
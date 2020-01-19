
import { renderJulianDate } from "@/util/CalendarHelpers.js";

import { hebrewDateToNextGregorianOccurence} from "@/util/Convertors/GregorianToHebrew.js";


export function nextGregorianOccurence(dateObject) {
  if(dateObject instanceof Date) return dateObject.toLocaleDateString();
  switch(dateObject.calendar) {
    case "julian":
      return dateObject;
    case "hebrew":
      return hebrewDateToNextGregorianOccurence(dateObject);
    default: 
      console.error(`Unknown calendar type \"${dateObject.calendar}\"`)
      return dateObject
  }
}

export default nextGregorianOccurence;
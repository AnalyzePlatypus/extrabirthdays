
import { hebrewDateToNextGregorianOccurence} from "@/util/Convertors/GregorianToHebrew.js";

import { julianDateToNextGregorianOccurence } from "@/util/Convertors/GregorianToJulian.js"
import { islamicDateGetNextGregorianOccurence } from "@/util/calendars/islamic.js";
import { persianDateGetNextGregorianOccurence } from "@/util/calendars/persian.js";

export function nextGregorianOccurence(dateObject, currentDate) {
  if(dateObject instanceof Date) return dateObject.toLocaleDateString();
  switch(dateObject.calendar) {
    case "julian":
      return julianDateToNextGregorianOccurence(dateObject, currentDate);
    case "hebrew":
      return hebrewDateToNextGregorianOccurence(dateObject, currentDate);
    case "islamic": 
      return islamicDateGetNextGregorianOccurence(dateObject, currentDate);
    case "persian": 
      return persianDateGetNextGregorianOccurence(dateObject, currentDate);
    default: 
      console.error(`Unknown calendar type \"${dateObject.calendar}\"`)
      return dateObject
  }
}

export default nextGregorianOccurence;
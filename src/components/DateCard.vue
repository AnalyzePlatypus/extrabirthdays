<template>
  <div class="bg-teal-600 my-2 w-11/12 max-w-xs p-3 rounded shadow-md">
    <h2 class="uppercase text-sm font-medium text-gray-300">{{calendarType}}</h2>
    <p class="text-white text-2xl">{{foreignDate | renderDateObject}}</p>
    <p class="text-sm uppercase">
      <span>Next on </span>
      <span class="font-medium">{{foreignDate | nextGregorianOccurence(currentDate) | renderDateObject}}</span>
      <!-- <span class="font-medium"> ({{foreignDate | nextGregorianOccurence(currentDate) | toJSDate | timeDifference(new Date(), {displayMode: "full", sign: "text"}) }})</span> -->
    </p>
  </div>
</template>

<script>
import validCalendarNames from "@/util/supportedCalendars.js";

import { gregorianDateToJulianDate } from "@/util/CalendarHelpers.js";
import { gregorianToHebrew } from "@/util/calendars/hebrew.js";
import { gregorianToIslamic } from "@/util/calendars/islamic.js";
import { gregorianToPersian } from "@/util/calendars/persian.js";
import { gregorianToIndianCivil } from "@/util/calendars/indian_civil.js";

export default {
  name: 'DateCard',
  props: {
    calendarType: {
      type: String,
      required: true,
      validator: str => validCalendarNames.includes(str)
    },
    date: {
      type: Date,
      required: true
    },
    currentDate: {
      type: Date,
      required: false,
      default: () => new Date()
    }
  },
  methods: {
  },
  computed: {
    foreignDate() {
      switch(this.calendarType) {
        case "gregorian":
          return  this.date;
        case "julian":
          return gregorianDateToJulianDate(this.date);
        case "hebrew":
          return gregorianToHebrew(this.date);
          break;
        case "islamic":
          return gregorianToIslamic(this.date);
          break;
        case "persian":
          return gregorianToPersian(this.date);
          break;
        case "indian_civil":
          return gregorianToIndianCivil(this.date);
          break;
        default:
          throw new TypeError(`Unknown calendar type: \"${this.calendarType}\"`)
      }
    },
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss'>
</style>
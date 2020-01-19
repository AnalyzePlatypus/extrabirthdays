<template>
  <div>
    <h2>{{calendarType}}</h2>
    <p>{{foreignDate}}</p>
  </div>
</template>

<script>
import validCalendarNames from "@/util/supportedCalendars.js";

import { gregorian_to_julian, renderJulianDate } from "@/util/CalendarHelpers.js";

import { gregorianToHebrew, renderHebrewDateToEnglish } from "@/util/Convertors/GregorianToHebrew.js";

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
    }
  },
  methods: {
  },
  computed: {
    foreignDate() {
      switch(this.calendarType) {
        case "gregorian":
          return  this.date.toLocaleDateString();
        case "julian":
          return renderJulianDate(gregorian_to_julian(this.date));
        case "hebrew":
          return renderHebrewDateToEnglish(gregorianToHebrew(this.date));
          break;
        default:
          throw new TypeError(`Unknown calendar type: \"${this.calendarType}\"`)
      }
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss'>
</style>
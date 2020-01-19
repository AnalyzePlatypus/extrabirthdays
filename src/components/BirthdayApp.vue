<template>
  <div>
    <div>
      <h1>When's your <span>Persian</span> birthday?</h1>
      <p>Find your birthday in 8 foriegn calendars!</p>

      <div>
        <input type="date" v-model="queriedDate">
      </div>

      <div>
        <DateCard 
          v-for="calendarType of enabledCalendarTypes" 
          :key="calendarType"
          :calendarType="calendarType"
          :date="queriedDateAsDate"
          />
      </div>
    </div>
  </div>
</template>

<script>

import DateCard from "@/components/DateCard.vue";

export default {
  name: 'BirthdayApp',
  data() {
    return {
      queriedDate: new Date(),
      enabledCalendarTypes: [
        "gregorian",
        "julian",
        "hebrew"
      ]
    };
  },
  methods: {
  },
  computed: {
    queriedDateAsDate() {
      return new Date(this.queriedDate);
    }
  },
  components: {
    DateCard
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss'>
</style>
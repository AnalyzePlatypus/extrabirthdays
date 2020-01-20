<template>
  <div>
    <div>
      <div class="bg-teal-600 pt-16 pb-8 md:pb-16 text-center">
        <h1 class="text-3xl md:text-4xl text-white">When's your <span>Persian</span> birthday?</h1>
        <p class="text-base font-medium text-gray-100 px-4">Find your birthday in 8 foreign calendars!</p>
      </div>

      <div class="-mt-6 flex justify-center">
        <input class="pl-4 pr-4 text-2xl md:text-3xl w-auto border-solid border-teal-900 border-2"
          type="date" v-model="queriedDateString">
      </div>

      <div class="flex flex-col justify-center items-center mt-8" v-if="formWasEdited">
        <h1 class="uppercase font-medium text-gray-600">Results</h1>
        <DateCard 
          v-for="calendarType of enabledCalendarTypes" 
          :key="calendarType"
          :calendarType="calendarType"
          :date="queriedDate"
          />
      </div>
    </div>
  </div>
</template>

<script>

import DateCard from "@/components/DateCard.vue";

export default {
  name: 'Home',
  data() {
    return {
      queriedDateString: new Date().toDateString(),
      enabledCalendarTypes: [
        "julian",
        "hebrew"
      ],
    };
  },
  methods: {
  },
  computed: {
    queriedDate() {
      return new Date(this.queriedDateString);
    },
    formWasEdited() {
      return this.queriedDateString !== new Date().toDateString()
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
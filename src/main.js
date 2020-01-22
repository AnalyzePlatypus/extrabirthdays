import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import renderDateObject from "@/filters/renderDateObject.js";
import nextGregorianOccurence from "@/filters/nextGregorianOccurence.js";
import timeDifference from "@/util/GetTimeDifference.js";
import toJSDate from "@/filters/toJSDate.js";

import './assets/tailwind.css'

import router from '@/router';

Vue.filter("renderDateObject", renderDateObject);
Vue.filter("nextGregorianOccurence", nextGregorianOccurence);
Vue.filter("timeDifference", timeDifference);
Vue.filter("toJSDate", toJSDate);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

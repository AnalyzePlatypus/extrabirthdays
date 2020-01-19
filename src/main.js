import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import renderDateObject from "@/filters/renderDateObject.js";
import nextGregorianOccurence from "@/filters/nextGregorianOccurence.js";

Vue.filter("renderDateObject", renderDateObject);
Vue.filter("nextGregorianOccurence", nextGregorianOccurence); 

new Vue({
  render: h => h(App),
}).$mount('#app')

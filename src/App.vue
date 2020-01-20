<template>
  <div id="app">
    <BirthdayApp/>
  </div>
</template>

<script>
import BirthdayApp from './components/BirthdayApp.vue'

export default {
  name: 'app',
  components: {
    BirthdayApp
  }
}
</script>

<style>
@import "./assets/tailwind.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

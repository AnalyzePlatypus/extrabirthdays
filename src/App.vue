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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

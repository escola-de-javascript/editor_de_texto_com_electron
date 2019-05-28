<template>
  <div id="app">
    <editor/>
  </div>
</template>

<script>
import Editor from "./components/Editor.vue";
const { remote } = require("electron");
export default {
  name: "app",
  components: {
    Editor
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<template>
  <div id="home">
    <nav-header/>
    <router-view/>
    <nav-footer/>
  </div>
</template>

<script>
  import NavHeader from "../components/nav/NavHeader";
  import NavFooter from "../components/nav/NavFooter";
  import ServiceBar from "../components/nav/ServiceBar";
  export default {
    name: "Home",
    components: {NavFooter, NavHeader}
  }
</script>

<style scoped>

</style>
<template>
  <div id="home">
    <nav-header></nav-header>
    <router-view/>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from "../components/nav/NavHeader";
  import NavFooter from "../components/nav/NavFooter";
  export default {
    name: "Home",
    components: {NavFooter, NavHeader}
  }
</script>

<style scoped>

</style>
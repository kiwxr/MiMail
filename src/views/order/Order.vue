<template>
  <div>
    <router-view/>
    <service-bar/>
    <nav-footer/>
  </div>
</template>

<script>
  import NavFooter from "../../components/nav/NavFooter";
  import ServiceBar from "../../components/nav/ServiceBar";
  export default {
    name: "Order",
    components: {NavFooter,ServiceBar},
    data(){
      return{
        title: '',
        tip: '',
      }
    },
    mounted() {
    },
    methods:{}
  }
</script>

<style scoped>

</style>
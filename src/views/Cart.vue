<template>
  <div>
    <order-header/>
    <router-view/>
    <nav-footer/>
  </div>
</template>

<script>
  import OrderHeader from "../components/order/OrderHeader";
  import NavFooter from "../components/nav/NavFooter";
  export default {
    name: "Cart",
    components: {NavFooter, OrderHeader}
  }
</script>

<style scoped>

</style>
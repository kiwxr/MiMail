<template>
  <div>
    <order-header :title="title">
      <template v-slot:tip>
        {{tip}}
      </template>
    </order-header>
    <router-view/>
    <service-bar/>
    <nav-footer/>
  </div>
</template>

<script>
  import OrderHeader from "../../components/order/OrderHeader";
  import NavFooter from "../../components/nav/NavFooter";
  import ServiceBar from "../../components/nav/ServiceBar";
  export default {
    name: "Order",
    components: {NavFooter, OrderHeader,ServiceBar},
    data(){
      return{
        title: '',
        tip: '',
      }
    },
    mounted() {
      let path = this.$route.path
      if(path == '/order/confirm'){
        this.title = '订单确认'
        this.tip = '买买买'
      }else if(path == '/order/list'){
        this.title = '订单列表'
        this.tip = '啊哈哈哈哈哈'
      }else if(path == '/order/pay'){
        this.title = '订单支付'
        this.tip = '希望你钱够'
      }
    },
    methods:{}
  }
</script>

<style scoped>

</style>
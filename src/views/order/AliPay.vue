<template>
  <div id="ali-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        希望你钱够
      </template>
    </order-header>
    <loading/>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
  import {request} from "../../api";
  import Loading from "../../components/Loading";
  import OrderHeader from "../../components/order/OrderHeader";

  export default {
    name: "AliPay",
    components: {OrderHeader, Loading},
    data(){
      return{
        orderId:this.$route.query.orderId,
        content:'',

      }
    },
    mounted() {
      this.paySubmit()
    },
    methods:{
      paySubmit(){
        request({
          url:'/pay',
          method:'post',
          data:{
            orderId: this.orderId,
            orderName: 'vue高仿',
            amount:0.01, //支付金额
            payType: 1   //支付类型 1支付宝 2微信
          }
        }).then(res => {
          this.content = res.content
          setTimeout(()=>{
            document.getElementById('bestPayForm').submit();
          },200)
        })
      }
    }
  }
</script>

<style scoped>

</style>
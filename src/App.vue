<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {request} from "./api";
  import {mapActions} from 'vuex';
  export default {
    name: 'app',
    data(){
      return {}
    },
    mounted() {
      this.getUser()
      this.getCartCount()
    },
    methods:{
      getUser(){
        request({
          'url':'/user',
          method: 'get'
        }).then((res={}) => {
          this.$store.dispatch('saveUserName',res.username)
          // this.saveUserName(res.username)
        })
      },
      getCartCount(){
        request({
          'url': '/carts/products/sum',
          method: 'get'
        }).then((res=0) => {
          this.$store.dispatch('saveCartCount',res)
        })
      },
    },
    // ...mapActions(['saveUserName'])
  }
</script>
<style lang="less">
  @import "assets/css/reset.css";
  @import "assets/css/base.less";
  @import "assets/css/model.less";
  @import "assets/css/button.less";
</style>

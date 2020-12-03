<template>
  <div id="order-header">
    <div class="container clearfix">
      <div class="header-logo fl">
        <a href="/#/index"></a>
      </div>
      <div class="title fl">
        <h2>{{title}}<span><slot name="tip"></slot></span></h2>
      </div>
      <div class="username fr">
        <a href="javascript:;">{{username}}</a>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "OrderHeader",
    props:{
      title:String,
    },
    computed:{
      username(){ //解决延迟问题
        return this.$store.state.username
      },
    }
  }
</script>

<style scoped lang="less">
  #order-header{
    box-sizing: border-box;
    height: 112px;
    padding: 30px 0;
    border-bottom: 2px solid #ff6600;
    background-color: white;
    .title,.username{
      display: inline-block;
      height: 55px;
      line-height: 55px;
    }
    .title{
      font-size: 24px;
      color: #333333;
      margin-left: 54px;
      h2 {
        font-weight: bold;
      }
      span{
        font-size: 14px;
        margin-left: 17px;
        color: #999999;
      }
    }
    .username{
      a{
        font-size: 16px;
        color: #666666;
      }
    }
  }
</style>
<template>
  <div id="footer">
    <div class="footer-logo">
      <img src="@/assets/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="https://www.bilibili.com/" target="_blank">哔哩哔哩 (゜-゜)つロ 干杯~-bilibili</a><span>|</span>
      <a href="https://www.imooc.com/" target="_blank">慕课网</a><span>|</span>
      <a href="https://www.imooc.com/t/1343480" target="_blank">河畔一角</a><span>|</span>
      <a href="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ded8d0e4a77d.html" target="_blank">小米商城隐私政策</a><span>|</span>
      <a href="https://www.mi.com/about/user-agreement/" target="_blank">小米商城用户协议</a>
    </div>
    <div class="copyright">Copyright ©2020 <span class="domain">mi.future.com</span> All Rights Reserved</div>
  </div>
</template>

<script>
  export default {
    name: "NavFooter"
  }
</script>

<style scoped lang="less">
  @import "~assets/css/minixs.less";
  @import "~assets/css/config.less";
  #footer{
    height: 234px;
    border-top: 4px solid @colorA;
    background-color: @colorB;
    color: @colorD;
    font-size: @fontI;
    text-align: center;
    .footer-logo{
      margin-top: 46px;
      margin-bottom: 31px;
      img{
        width: 56px;
        height: 56px;
        margin-bottom: 13px;
      }
    }
    .footer-link{
      a{
        display: inline-block;
        color: @colorD;
      }
      span{
        margin: 0 10px;
      }
    }
    .copyright{
      margin-top: 13px;
      .domain{
        color: @colorA;
      }
    }
  }
</style>
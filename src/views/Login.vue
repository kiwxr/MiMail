<template>
  <div id="login">
    <div class="container logo">
      <a href="/#/index"><img v-lazy="'https://account.xiaomi.com/static/res/7f6f2f5/account-static/respassport/acc-2014/img/mistore_logo.png'" alt=""></a>
    </div>
    <div class="wrapper">
      <a href="/#/product/30" class="go"></a>
      <div class="container">
          <div class="login-form">
            <h3 class="login-nav">
              <span class="checked">账号登录</span><span class="sep-line">|</span><span class="checked">扫码登录</span>
            </h3>
            <div class="input">
              <input type="text" placeholder="请输入账号" v-model="username">
            </div>
            <div class="input">
              <input type="password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="btn-box">
              <a href="javascript:;" class="btn" @click="toLogin">登录</a>
            </div>
            <div class="tips">
              <div class="sms">手机短信登录/注册</div>
              <div class="reg"><a href="javascript:;">立即注册</a><span>|</span><a href="javascript:;">忘记密码？</a></div>
            </div>
            <div class="icon-box">
              <div class="icon"><a href="javascript:;"></a></div>
              <div class="icon"><a href="javascript:;"></a></div>
              <div class="icon"><a href="javascript:;"></a></div>
              <div class="icon"><a href="javascript:;"></a></div>
            </div>
          </div>
        </div>
    </div>
    <div class="footer">
      <div class="container">
        <div>
          <span>简体</span><span>|</span>
          <span>繁体</span><span>|</span>
          <span>English</span><span>|</span>
          <span>常见问题</span><span>|</span>
          <span>隐私政策</span>
        </div>
        <p>
          小米公司版权所有-京ICP备10046444-<img src="https://account.xiaomi.com/static/res/9204d06/account-static/respassport/acc-2014/img/ghs.png" alt="">京公网安备11010802020134号-京ICP证110507号
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import NavFooter from "../components/nav/NavFooter";
  import {request} from "../api";
  import {Message} from "element-ui";

  export default {
    name: "Login",
    data(){
      return{
        username:'kiwxr',
        password:'kiwxr',
        userId:''
      }
    },
    methods: {
      getCartCount(){
        request({
          'url': '/carts/products/sum',
          method: 'get'
        }).then((res=0) => {
          this.$store.dispatch('saveCartCount',res)
          this.$router.push('/index')
        })
      },
      toLogin() {
        let {username, password} = this
        this.login(username, password).then(res => {
          this.$cookie.set('userId',res.id,{expires:'Session'})
          this.$store.dispatch('saveUserName',res.username)
          this.getCartCount()
        })
      },
      toRegister() {
        this.register().then(res => {
          console.log(res)
        })
      },

      //网络请求
      login(username, password) {
        return request({
          url:'/user/login',
          method:'post',
          headers:{"Content-Type":"application/json;charset=UTF-8"},
          data:{
            username,
            password
          }
        })
      },
      register(){
        return request({
          url:'/user/register',
          method: 'post',
          headers:{"Content-Type":"application/json;charset=UTF-8"},
          data:{
            username:"kiwxr",
            password:"kiwxr",
            email:"kiwxr@qq.com"
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  @import "~assets/css/minixs.less";
  @import "~assets/css/config.less";
  #login{
    .logo{
      min-height: 98px;
    }
    .wrapper{
      width: 100%;
      min-height: 556px;
      background: url("https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/72644d9b8031286de3cc74e151aefd90.jpg") no-repeat center;
      .go{
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 100%;
        min-height: 556px;
      }
      .container{
        position: relative;
        .login-form{
          position: absolute;
          top: 20px;
          right: 0;
          width: 410px;
          height: 510px;
          background-color: white;
          .login-nav{
            width: 100%;
            height: 82px;
            font-size: 24px;
            line-height: 82px;
            text-align: center;
            font-weight: lighter;
            .checked{
              margin: 0 30px;
              &:hover{
                color: #ff6600;
                cursor: pointer;
              }
            }
          }
          .input{
            width: 350px;
            height: 50px;
            margin: 0 auto 10px;
            border: 1px solid #e0e0e0;
            input{
              box-sizing: border-box;
              width: 99%;
              height: 99%;
              color: #666666;
              padding-left: 15px;
              border: none;
            }
          }
          .btn-box{
            width: 350px;
            height: 50px;
            margin: 20px auto 10px;
            .btn{
              width: 100%;
              height: 100%;
              background-color: #ff6600;
              color: white;
              font-size: 16px;
              line-height: 50px;
              text-align: center;
            }
          }
          .sms{
            font-size: 14px;
            text-align: center;
            color: #ff6600;
            margin-bottom: 30px;
          }
          .reg{
            font-size: 12px;
            text-align: center;
            color: #ff6600;
            span{
              margin: 0 5px;
            }
          }
          .icon-box{
            display: flex;
            justify-content: space-around;
            width: 200px;
            height: 26px;
            margin: 120px auto 0;
            .icon{
              box-sizing: border-box;
              overflow: hidden;
              width: 26px;
              border-radius: 50%;
              text-align: center;
              a{
                display: block;
                width: 18px;
                height: 18px;
                margin:4px;
                background: url("https://account.xiaomi.com/static/res/166d6dc/account-static/respassport/acc-2014/img/icons_type.png") no-repeat center;
              }
              &:nth-child(1){
                background-color: #0288d1;
                a{
                  background-position: -19px 0;
                }
              }
              &:nth-child(2){
                background-color: #d32f2f;
                a{
                  background-position: -38px 0;
                }
              }
              &:nth-child(3){
                background-color: #00aaee;
                a{
                  background-position: -58px 0;
                }
              }
              &:nth-child(4){
                background-color: #00d20d;
                a{
                  width: 30px;
                  height: 30px;
                  background-position: -84px 0;
                }
              }
            }
          }
        }
      }
    }
    .footer{
      .container{
        text-align: center;
        div{
          margin-top: 100px;
          span{
            margin: 0 4px;
          }
        }
        p{
          margin-top: 5px;
          vertical-align: middle;
        }
      }
    }
  }
</style>
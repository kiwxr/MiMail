<template>
  <div id="header">
    <div class="nav-top-bar">
      <div class="container">
        <div class="top-bar-menu">
          <!--  javascript:; 防止页面刷新-->
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="top-bar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="login">登录</a>
          <a href="javascript:;" v-if="username">我的订单</a>
          <a href="javascript:;" v-if="!username">注册</a>
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <a :href="'/#/product/'+item.id" target="_blank">
                    <div class="product-img">
                      <img :src="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="product-name">{{item.name}}</div>
                    <div class="product-price">{{item.price | currency}}</div>
                  </a>
                </li>

              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/81808cd191332114f44d8d0cb0d0813a.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">Redmi K30S 至尊纪念版</div>
                    <div class="product-price">2599元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/81808cd191332114f44d8d0cb0d0813a.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">Redmi K30S 至尊纪念版</div>
                    <div class="product-price">2599元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/81808cd191332114f44d8d0cb0d0813a.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">Redmi K30S 至尊纪念版</div>
                    <div class="product-price">2599元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/81808cd191332114f44d8d0cb0d0813a.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">Redmi K30S 至尊纪念版</div>
                    <div class="product-price">2599元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/81808cd191332114f44d8d0cb0d0813a.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">Redmi K30S 至尊纪念版</div>
                    <div class="product-price">2599元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/81808cd191332114f44d8d0cb0d0813a.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">Redmi K30S 至尊纪念版</div>
                    <div class="product-price">2599元起</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">小米电视大师 82英寸至尊纪念版</div>
                    <div class="product-price">49999元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">小米电视大师 82英寸至尊纪念版</div>
                    <div class="product-price">49999元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">小米电视大师 82英寸至尊纪念版</div>
                    <div class="product-price">49999元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">小米电视大师 82英寸至尊纪念版</div>
                    <div class="product-price">49999元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">小米电视大师 82英寸至尊纪念版</div>
                    <div class="product-price">49999元起</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="product-img">
                      <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/174a2f9256a44b98f9e08bbe30528329.png?thumb=1&w=160&h=110&f=webp&q=90" alt="小米10至尊纪念版">
                    </div>
                    <div class="product-name">小米电视大师 82英寸至尊纪念版</div>
                    <div class="product-price">49999元起</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from "@/api/index.js"
  export default {
    name: "NavHeader",
    data(){
      return{
        username: '',
        phoneList:[]
      }
    },
    filters:{
      currency(val){
        if(!val){
          return '0.00'
        }else {
          return '￥'+val.toFixed(2)+'元'
        }
      }
    },
    mounted() {
      this.getProductList(100012).then(res => {
        console.log(res)
       if(res.list.length > 6){
         this.phoneList = res.list.slice(0,6)
         // console.log(this.phoneList)
       }else{
         this.phoneList = res.list
         // console.log(this.phoneList)
       }

      })
    },
    methods:{
      //网络请求
      getProductList(categoryId){
        return request({
          url: "/products",
          params:{
            categoryId,
            pageSize:6
          }
        })
      },
      //跳转
      login(){
        this.$router.push('/login')
      },
      goToCart(){
        this.$router.push('/cart')
      }
    }
  }
</script>

<style scoped lang="less">
  @import "~assets/css/minixs.less";
  @import "~assets/css/config.less";
  #header{
    .nav-top-bar{
      height: 39px;
      line-height: 39px;
      background-color: #333333;
      color: #B0B0B0;
      .container{
        display: flex;
        justify-content: space-between;
        /*align-items: center;*/
        a{
          display: inline-block;
          color: #B0B0B0;
          margin-right: 17px;
        }
        .my-cart{
          width: 110px;
          background-color: #FF6600;
          color: #ffffff;
          text-align: center;
          .icon-cart{
            .backImg(16px,12px,'~assets/icon-cart.png');
            margin-right: 4px;
          }
        }
      }
    }
    .nav-header{
      .container{
        position: relative;
        height: 112px;
        .flex();
        .header-logo{
          display: inline-block;
          width: 55px;
          height: 55px;
          overflow: hidden;
          a{
            display: inline-block;
            width: 110px;
            height: 55px;
            &:before{
              content: "";
              .backImg(55px,55px,"~assets/mi-logo.png");
              transition: margin .3s;
            }
            &:after{
              content: "";
              .backImg(55px,55px,"~assets/mi-home.png");
            }
            &:hover:before{
              margin-left: -55px;
              transition: margin .3s;
            }
          }
          background-color: #FF6600;
        }
        .header-menu{
          display: inline-block;
          width: 643px;
          padding-left: 209px;
          .item-menu{
            display: inline-block;
            color: #333333;
            font-weight: bold;
            font-size: 16px;
            line-height: 112px;
            margin-right: 20px;
            span{
              cursor: pointer;
            }
            &:hover{
              color: @colorA;
              .children{
                height: 220px;
                opacity: 1;
              }
            }
            .children{
              position: absolute;
              top: 112px;
              left: 0;
              width: @min-width;
              height: 0;
              opacity: 0; //透明度
              overflow: hidden;
              border-top: 1px solid #E5E5E5;
              box-shadow: 0px 7px 6px 0px rgba(0,0,0,0.11);
              transition: height .5s,opacity .1s;
              background-color: #ffffff;
              z-index: 10;
              .product{
                position: relative;
                float: left;
                width: 16.6%;
                height: 220px;
                font-size: 12px;
                line-height: 12px;
                text-align: center;
                &:before{
                  content: '';
                  position: absolute;
                  top: 28px;
                  right: 0;
                  width: 1px;
                  height: 100px;
                  border-left: 1px solid @colorF;
                }
                &:last-child:before{
                  display: none;
                }
                a{
                  display: inline-block;
                }
                img {
                  width: auto;
                  height: 110px;
                  margin-top: 26px;
                }
                .product-img{
                  height: 137px;
                }
                .product-name{
                  font-weight: bold;
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: @colorB;
                }
                .product-price{
                  color: @colorA;
                }
              }

            }
          }
        }
        .header-search{
          width: 319px;
          .wrapper{
            .flex();
            height: 50px;
            border: 1px solid #E0E0E0;
            background-color: #ffffff;
            input{
              box-sizing: border-box;
              border: none;
              border-right: 1px solid #E0E0E0;
              width: 264px;
              height: 50px;
              padding-left: 14px;
            }
            a{
              .backImg(54px,50px,"~assets/icon-search.png",24px);
            }
            a:hover{
              .backImg(54px,50px,"~assets/icon-search-hover.png",24px);
              background-color: #FF6600;
              transition: background-color .5s;
            }
          }
        }
      }
    }
  }

</style>
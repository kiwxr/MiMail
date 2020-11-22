<template>
  <div id="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,index) in menuList" :key="index">
                  <li v-for="(li_item,li_index) in item" :key="li_index">
                    <a :href="'/#/product/'+(li_item?li_item.id:40)">
                      <img :src="li_item?li_item.img:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/92b463f8e502e5d26ac488a252a05b58.jpg?thumb=1&w=40&h=40&f=webp&q=90'" alt="">
                      {{li_item?li_item.name:'Redmi K30 Pro'}}
                    </a>
                  </li>
                </ul>
              </div>
              <a href="javascript:;">电视 盒子</a>
              <div class="children">
                <ul v-for="(item,index) in menuList" :key="index">
                  <li v-for="(li_item,li_index) in item" :key="li_index">
                    <a :href="'/#/product/'+(li_item?li_item.id:40)">
                      <img :src="li_item?li_item.img:'//cdn.cnbj1.fds.api.mi-img.com/mi-mall/92b463f8e502e5d26ac488a252a05b58.jpg?thumb=1&w=40&h=40&f=webp&q=90'" alt="">
                      {{li_item?li_item.name:'Redmi K30 Pro'}}
                    </a>
                  </li>
                </ul>
              </div>
              <a href="javascript:;">笔记本 平板</a>
              <div class="children"></div>
              <a href="javascript:;">家电 插线板</a>
              <div class="children"></div>
              <a href="javascript:;">出现 穿戴</a>
              <div class="children"></div>
              <a href="javascript:;">智能 路由器</a>
              <div class="children"></div>
              <a href="javascript:;">电源 配件</a>
              <div class="children"></div>
              <a href="javascript:;">生活 箱包</a>
              <div class="children"></div>
            </li>
          </ul>
        </div>

        <swiper ref="mySwiper" :options="SwiperOptions">
          <swiper-slide v-for="(item,index) in sildeList" :key="index">
            <a :href="'/#/product/'+item.id"><img :src="item.img" alt=""></a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
<!--          <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="(item,index) in adList" :key="index">
          <img :src="item.img" alt="">
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/6c907ad4004b32609a589bdada203443.jpg?thumb=1&w=1226&h=120&f=webp&q=90" alt="">
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/30"><img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/574c6643ab91c6618bfb2d0e2c761d0b.jpg?thumb=1&w=234&h=614&f=webp&q=90" alt=""></a>
          </div>

          <div class="list-box">
            <div class="list" v-for="(arr,i) in phoneList" :key="i">
              <div class="item" v-for="(item,j) in arr" :key="j">
                <span class="phone-status" :class="{'new-pro':j%2==0,'kill-pro':item.id==31}">新品</span>
                <div class="item-img">
                  <img :src="item.mainImage" alt="">
                </div>

                <div class="item-info">
                  <h2>{{item.name}}</h2>
                  <p>{{item.subtitle}}</p>
                  <p class="phone-price">{{item.price}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar/>
  </div>
</template>

<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'
  import ServiceBar from "../components/nav/ServiceBar";
  import {request} from "../api";

  export default {
    name: "Index",
    components: {ServiceBar,swiper,swiperSlide},
    data(){
      return{
        SwiperOptions:{
          autoplay: true,
          loop: true,
          effect: 'cube',
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        },
        sildeList:[
          {
            id:'42',
            img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9e86067517796d842c7d4d9d3f050bab.jpg?w=2452&h=920'
          },
          {
            id:'45',
            img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1cb0358a55614d5f49fa442b1b056cc2.jpg?thumb=1&w=1226&h=460&f=webp&q=90'
          },
          {
            id:'46',
            img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9ebff5f5c1f52f2dbdd611897adbefd4.jpg?thumb=1&w=1226&h=460&f=webp&q=90'
          },
          {
            id:'',
            img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0ef4160c861b998239bce9adb82341e7.jpg?thumb=1&w=1226&h=460&f=webp&q=90'
          },
        ],
        menuList:[
          [
            {
              id:30,
              img: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/5ca871528d3420622f21f25be7aba58c.png?thumb=1&w=40&h=40&f=webp&q=9',
              name: '小米 10'
            },
            {
              id:30,
              img: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/5ca871528d3420622f21f25be7aba58c.png?thumb=1&w=40&h=40&f=webp&q=9',
              name: '小米 10'
            },
            {
              id:30,
              img: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/5ca871528d3420622f21f25be7aba58c.png?thumb=1&w=40&h=40&f=webp&q=9',
              name: '小米 10'
            },
            {
              id:30,
              img: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/5ca871528d3420622f21f25be7aba58c.png?thumb=1&w=40&h=40&f=webp&q=9',
              name: '小米 10'
            },
          ],  [
            {
              id:30,
              img: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/5ca871528d3420622f21f25be7aba58c.png?thumb=1&w=40&h=40&f=webp&q=9',
              name: '小米 10'
            },
            {
              id:30,
              img: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/5ca871528d3420622f21f25be7aba58c.png?thumb=1&w=40&h=40&f=webp&q=9',
              name: '小米 10'
            },
            {
              id:30,
              img: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/5ca871528d3420622f21f25be7aba58c.png?thumb=1&w=40&h=40&f=webp&q=9',
              name: '小米 10'
            },
            {
              id:30,
              img: '//cdn.cnbj1.fds.api.mi-img.com/mi-mall/5ca871528d3420622f21f25be7aba58c.png?thumb=1&w=40&h=40&f=webp&q=9',
              name: '小米 10'
            },
          ], [0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
        ],
        adList: [
          {
            id:33,
            img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e5f20a62c3d5b3d6806bd51ab6c5dd12.jpg?w=632&h=340',
          },
          {
            id:48,
            img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e5f20a62c3d5b3d6806bd51ab6c5dd12.jpg?w=632&h=340',
          },
          {
            id:45,
            img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8a43378b96501d7e227a9018fe2668c5.jpg?w=632&h=340',
          },
          {
            id:47,
            img:'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8a43378b96501d7e227a9018fe2668c5.jpg?w=632&h=340',
          }
        ],
        phoneList:[[1,1,1,1],[1,1,1,1]]
      }
    },
    mounted() {
      this.getProductList().then(res => {
        this.phoneList = [res.list.slice(0,4),res.list.slice(4,8)]
        console.log(this.phoneList)
      })
    },
    methods:{
      getProductList(){
        return request({
          url:'/products',
          params:{
            categoryId:100012,
            pageSize:8
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "~assets/css/minixs.less";
  @import "~assets/css/config.less";
  #index{
    .swiper-box{
      .nav-menu{
        box-sizing: border-box;
        position: absolute;
        width: 264px;
        height: 451px;
        padding: 26px 0;
        z-index: 10;
        background-color: rgba(0,0,0,0.17);
        .menu-wrap{
          .menu-item{
            height: 50px;
            line-height: 50px;
            a{
              position: relative;
              display: block;
              font-size: 16px;
              color: #ffffff;
              padding-left: 30px;
              &:after{
                position: absolute;
                top: 17.5px;
                right: 30px;
                content: '';
                .backImg(25px,15px,'~assets/icon-arr.png')
              }
              &:hover{
                background-color: @colorA;
                & + .children{
                  display: block;
                }
              }

            }

            .children{
              display: none;
              box-sizing: border-box;
              position: absolute;
              top: 0;
              left: 264px;
              width: 962px;
              height: 451px;
              border: 1px solid @colorH;
              background-color: white;
              ul{
                .flex();
                height: 75px;
                li{
                  flex: 1;
                  height: 75px;
                  line-height: 75px;
                  padding-left: 23px;
                  z-index: 10;
                }
                img{
                  width: 42px;
                  height: 35px;
                  vertical-align: middle;
                  margin-right: 15px;
                }
                a{
                  color: @colorB;
                  font-size: @fontJ;
                  background-color: @colorG;
                  &:after{
                    display: none;
                  }
                  &:hover{
                    color: @colorA;
                  }
                }
              }
            }
          }
        }
      }
      .swiper-container{
        height: 451px;
        z-index: 9;
        .swiper-button-prev{
          left: 274px;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .ads-box{
      .flex();
      margin-top: 14px;
      margin-bottom: 31px;
      a{
        width: 296px;
        height: 196px;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .banner{
      margin-bottom: 50px;
    }
    .product-box{
      padding: 30px 0 50px;
      background-color: @colorJ;
      h2{
        height: 21px;
        font-size: @fontF;
        line-height: 22px;
        margin-bottom: 20px;
      }
      .wrapper{
        display: flex;
        .banner-left{
          width: 240px;
          height: 619px;
          margin-right: 16px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .list-box{
          .list{
            width: 986px;
            .flex();
            margin-bottom: 14px;
            &:last-child{
              margin-bottom: 0;
            }
            .item{
              width: 236px;
              height: 302px;
              text-align: center;
              background-color: @colorG;
              .phone-status{
                display: inline-block;
                width: 67px;
                height: 24px;
                font-size: 14px;
                line-height: 24px;
                color: white;
                &.new-pro{
                  background-color: #7ecf68;
                }
                &.kill-pro{
                  background-color: #e82626;
                }
              }
              .item-img{
                img{
                  width: 100%;
                  height: 195px;

                }
              }
              .item-info{
                h2{
                  /*display: inline-block;*/
                  /*height: 20px;*/
                  font-size: @fontJ;
                  line-height: 14px;
                  font-weight: bold;
                  color: @colorB;
                  margin-bottom: 0;
                }
                p{
                  color: @colorD;
                  line-height: 12px;
                  margin: 6px auto 13px;
                }
                .phone-price{
                  color: #F20A0A;
                  font-size: @fontJ;
                  font-weight: bold;
                  cursor: pointer;
                  &:after{
                    content: ' ';
                    .backImg(18px,18px,"~assets/icon-cart-phone.png");
                    margin-left: 5px;
                    /*vertical-align: middle;*/
                  }
                }
              }

            }
          }
        }
      }
    }
  }
</style>
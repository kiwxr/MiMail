<template>
  <div id="product">
    <product-params :title="product.name">
      <template v-slot:buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-params>
    <div class="content">
      <div class="item-bg-1">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p>
          <a href="">全球首款双频 GP</a>
          <span>|</span>
          <a href="">骁龙845</a>
          <span>|</span>
          <a href="">AI 变焦双摄</a>
          <span>|</span>
          <a href="">红外人脸识别</a>
        </p>
        <div class="price">
          <span>￥<em>{{product.price}}</em></span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>
      <div class="item-swiper">
        <swiper :options="swiperOption">
          <swiper-slide><img src="" alt=""></swiper-slide>
          <swiper-slide><img src="" alt=""></swiper-slide>
          <swiper-slide><img src="" alt=""></swiper-slide>
          <swiper-slide><img src="" alt=""></swiper-slide>
          <swiper-slide><img src="" alt=""></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影超慢动作视频，将眨眼间的美妙展现的淋漓尽致 <br> 更能AI</p>
<!--        动画实现方法①-->
<!--        <div class="video-bg" @click="showSlide1=true"></div>-->
<!--        <div class="video-box">-->
<!--          <div class="overlay" v-if="showSlide1"></div>-->
<!--          <div class="video" :class="{'slide':showSlide1}">-->
<!--            <span class="icon-close" @click="showSlide1=false"></span>-->
<!--            <video src="https://cdn.cnbj1.fds.api.mi-img.com/product-images/redminote9pro/vlog.mp4" controls="controls"></video>-->
<!--&lt;!&ndash;            <video src="assets/video/ruhai.mp4" controls="controls"></video>&ndash;&gt;-->
<!--          </div>-->
<!--        </div>-->

        <div class="video-bg" @click="showSlide2='slideDown'"></div>
        <div class="video-box" v-show="showSlide2">
          <div class="overlay"></div>
          <div class="video" :class="showSlide2">
            <span class="icon-close" @click="closeVideo"></span>
            <video src="https://cdn.cnbj1.fds.api.mi-img.com/product-images/redminote9pro/vlog.mp4" controls="controls"></video>
            <!--            <video src="assets/video/ruhai.mp4" controls="controls"></video>-->
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from "../api";
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'
  import ProductParams from "../components/ProductParams";
  import ServiceBar from "../components/nav/ServiceBar";
  export default {
    name: "Product",
    components: {swiper,swiperSlide,ProductParams},
    data(){
      return{
        showSlide1:false,
        showSlide2:'',
        product: {}, //商品信息
        swiperOption:{
          autoplay:true,
          slidesPerView:3,
          spaceBetween:30,
          freeMode:true,
          pagination:{
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    mounted() {
      this.getProductInfo()
    },
    methods:{
      getProductInfo(){
        let id = this.$route.params.id;
        request({
          url: '/products/'+id
        }).then(res => {
          console.log(res)
          this.product = res;
        })
      },
      buy(){
        let id = this.$route.params.id;
        this.$router.push(`/detail/${id}`)
      },

      closeVideo(){
        this.showSlide2 = 'slideUp';
        setTimeout(()=>{
          this.showSlide2 = '';
        },600)
      }
    }
  }
</script>

<style scoped lang="less">
  #product{
    .content{
      .item-bg-1{
        background: url("https://cdn.cnbj1.fds.api.mi-img.com/product-images/redminote9/pv.jpg") no-repeat center;
        background-size: cover;
        height: 718px;
        text-align: center;
        h2{
          font-size: 80px;
          padding-top: 55px;
        }
        h3{
          font-size: 24px;
          letter-spacing: 10px;
        }
        p{
          margin-top: 21px;
          margin-bottom: 40px;
          a{
            font-size: 16px;
            color: #333333;
          }
          span{
            margin: 0 15px;
          }
        }
        .price{
          font-size: 30px;
          color: #333333;
          em{
            font-style: normal;
            font-size: 38px;
          }
        }
      }
      .item-bg-2{
        background: url("https://cdn.cnbj1.fds.api.mi-img.com/product-images/redminote9/hpb.jpg") no-repeat center;
        height: 580px;
        background-size: 1226px 450px;
      }
      .item-bg-3{
        background: url("https://cdn.cnbj1.fds.api.mi-img.com/product-images/redminote9/coating.jpg") no-repeat center;
        height:638px;
        background-size: cover;
      }
      .item-swiper{
        margin: 36px auto 52px;
        .desc{
          font-size: 18px;
          color: #333333;
          text-align: center;
        }
        img{
          width: 100%;
        }
      }
      .item-video{
        height: 1044px;
        background-color: #070708;
        margin-bottom: 76px;
        color: #ffffff;
        text-align: center;
        h2{
          font-size: 60px;
          padding-top: 82px;
          margin-bottom: 47px;
        }
        p{
          font-size: 24px;
          margin-bottom: 58px;
        }
        .video-bg{
          background: url("/img/product-video.png") no-repeat center;
          background-size: cover;
          width: 1226px;
          height: 540px;
          margin: 0 auto 120px;
          cursor: pointer;
        }
        .video-box{
          .overlay{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #cccccc;
            opacity: .4;
          }
          //自定义动画②
          @keyframes slideDown{
            from{
              top: -50%;
              opacity: 0;
            }
            to{
              top: 50%;
              opacity: 1;
            }
          }
          @keyframes slideUp{
            from{
              top: 50%;
              opacity: 1;
            }
            to{
              top: -50%;
              opacity: 0;
            }
          }
          .video{
            position: fixed;
            top: -50%;
            left: 50%;
            width: 1000px;
            height: 536px;
            transform: translate(-50%,-50%);
            //opacity: 0; //动画①
            opacity: 1; //动画②
            z-index: 10;
            //自定义动画②
            &.slideDown{
              animation: slideDown .6s linear;
              top: 50%;
            }
            &.slideUp{
              animation: slideUp .6s linear;
              top: -50%;
            }
            /*动画方法①
            transition: top .6s,opacity .6s;
            &.slide{
              top: 50%;
              opacity: 1;
            }
            */
            .icon-close{
              position: absolute;
              top: 20px;
              right: 20px;
              width: 20px;
              height: 20px;
              background: url("~assets/icon-close.png") no-repeat center;
              background-size: contain;
              cursor: pointer;
              z-index: 11;
            }
            video{
              width: 100%;
              height: 100%;
              object-fit: cover;
              outline: none;
            }
          }
        }
      }
    }
    button{
      margin-left: 10px;
    }
  }
</style>
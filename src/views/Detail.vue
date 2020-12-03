<template>
  <div id="detail">
    <product-params :title="product.name"></product-params>
    <div class="wrapper">
      <div class="container clearfix">
        <div class="swiper fl">
          <swiper :options="swiperOption">
            <swiper-slide><img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1575882211.1223535.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1575882211.1241624.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1575882211.12354336.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1575882211.215180.jpg" alt=""></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="content fr">
          <h2 class="item-title">{{product.name}}</h2>
          <p class="item-info">「6GB+128GB到手价低至仅1599元，叠加北京消费券更优惠；购机享延保5折、碎屏保8折优惠；+1元得200G云空间月卡」</p>
          <div class="delivery">小米自营</div>
          <div class="item-price">{{product.price}}元<span class="del">9999元</span></div>
          <div class="line"></div>
          <div class="item-addr">
            <i class="icon-loc"></i>
            <div class="addr">北京</div>
            <div class="stock">有现货</div>
          </div>
          <div class="item-version clearfix">
            <h2>选择版本</h2>
            <div class="phone fl" :class="{'checked':version==1}" @click="version=1">6GB+64GB</div>
            <div class="phone fr" :class="{'checked':version==2}" @click="version=2">4GB+64GB</div>
            <div class="phone fl" :class="{'checked':version==3}" @click="version=3">8GB+256GB</div>

          </div>
          <div class="item-color clearfix">
            <h2>选择颜色</h2>
            <div class="phone fl" :class="{'checked':color==1}" @click="color=1">
              <span class="color"></span>
              深海微光
            </div>
            <div class="phone fr" :class="{'checked':color==2}" @click="color=2">
              <span class="color"></span>
              紫玉幻境
            </div>
            <div class="phone fl" :class="{'checked':color==3}" @click="color=3">
              <span class="color"></span>
              时光独白
            </div>
            <div class="phone fr" :class="{'checked':color==4}" @click="color=4">
              <span class="color"></span>
              花影惊鸿
            </div>
          </div>
          <div class="item-total">
            <div class="phone-info clearfix">
              <div class="fl">{{product.name+' '+versionList[version-1]+' '+colorList[color-1]}}</div>
              <div class="fr">{{product.price}}元</div>
            </div>
            <div class="phone-total">总计：{{product.price}}元</div>
          </div>
          <div class="btn-group">
            <a href="javascript:;" class="btn btn-huge fl" @click="addCart">进入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/a482afa34053b1b32ece1023475af7fb.jpeg" alt="">
        </div>
      </div>
    </div>
    <service-bar/>
  </div>
</template>

<script>
  import ProductParams from "../components/ProductParams";
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'
  import ServiceBar from "../components/nav/ServiceBar";

  import {request} from "../api";

  export default {
    name: "Detail",
    components: {ServiceBar, swiper,swiperSlide,ProductParams},
    data(){
      return {
        id: this.$route.params.id,
        product: {},
        version: 1,
        color: 1,
        versionList:['6GB+64GB','4GB+64GB','8GB+256GB'],
        colorList:['深海微光','紫玉幻境','时光独白','花影惊鸿'],
        swiperOption: {
          autoplay: true,
          pagination:{
            el: '.swiper-pagination',
            clickable:true
          }
        }
      }
    },
    mounted() {
      this.getProductInfo()
    },
    methods:{
      getProductInfo(){
        request({
          url:`/products/${this.id}`
        }).then(res => {
          // console.log(res)
          this.product = res
        })
      },
      addCart(){
        request({
          url: '/carts',
          method:'post',
          data:{
            "productId": this.id,
            "selected": true
          }
        }).then(res => {
          console.log(res)
          res && res.cartProductVoList && this.$store.dispatch('saveCartCount',res.cartProductVoList.length)
          this.$router.push('/cart')
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #detail{
    .wrapper{
      margin-top: 40px;
      .swiper{
        width: 600px;
        height: 600px;
        .swiper-container{
          width: 560px;
          img{
            width: 100%;
          }
        }
      }
      .content{
        width: 600px;
        .item-title{
          font-size: 24px;
          font-weight: bold;
          color: #221122;
        }
        .item-info{
          margin-top: 15px;
          font-size: 14px;
          color: #cccccc;
        }
        .delivery{
          margin-top: 15px;
          font-size: 18px;
          color: #ff6600;
        }
        .item-price{
          margin-top: 15px;
          font-size: 18px;
          color: #FF6600;
          .del{
            margin-left: 5px;
            font-size: 16px;
            color: #cccccc;
            text-decoration: line-through;
          }
        }
        .line{
          margin-top: 12px;
          border: 1px solid #e0e0e0;
        }
        .item-addr{
          position: relative;
          margin-top: 20px;
          height: 100px;
          background-color: #fafafa;
          border: 1px solid #e0e0e0;
          .icon-loc{
            display: inline-block;
            position: absolute;
            top: 10px;
            width: 30px;
            height: 30px;
            background: url("~assets/icon-loc.png") no-repeat center;
            background-size: 16px 16px;
          }
          .addr{
            margin-left: 30px;
            margin-top: 10px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
          }
          .stock{
            margin-left: 30px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #ff6600;
          }
        }
        .item-version{
          margin-top: 20px;
          cursor: pointer;
        }
        .item-color{
          margin-top: 20px;
          cursor: pointer;
        }
        .phone{
          display: inline-block;
          width: 290px;
          height: 40px;
          font-size: 16px;
          line-height: 40px;
          text-align: center;
          color: gray;
          border: 1px solid #cccccc;
          margin-top: 12px;
          &.checked{
            color: #ff6600;
            border: 1px solid #ff6600;
          }
        }
        .item-total{
          margin: 35px 0;
          height: 140px;
          background-color: #f9f9fa;
          padding: 30px;
          .phone-info{
            line-height: 30px;
            font-size: 16px;
            color: #616161;
          }
          .phone-total{
            padding-top: 20px;
            font-size: 24px;
            color: #ff6600;
          }
        }
      }
    }
    .price-info{
      margin-top: 35px;
      background-color: #f5f5f5;
      .container{
        padding: 30px;
        h2{
          font-size: 20px;
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
<template>
  <div id="order-confirm">
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收获地址</h2>
            <div class="addr-list clearfix">
              <div class="addr-info" v-for="(item, index) in list" :key="index">
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverMobile}}</div>
                <div class="street">{{item.receiverProvince+' '+item.receiverCity+' '+item.receiverDistrict+' '+item.receiverAddress}}</div>
                <div class="action">
                  <a href="javascript:;"class="fl">
                    <div class="icon icon-del"></div>
                  </a>
                  <a href="javascript:;" class="fr">
                    <div class="icon icon-edit"></div>
                  </a>
                </div>
              </div>
              <div class="addr-add">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li  v-for="(item,index) in cartList" :key="index">
                <div class="good-name">
                  <img v-lazy="item.productMainImage" alt="">
                  <span>{{item.productName+' '+item.productSubtitle}}</span>
                </div>
                <div class="good-price">{{item.productPrice}}元 x {{item.quantity}}</div>
                <div class="good-total">{{item.productTotalPrice}}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="pos-box">
            <div class="detail">
              <div class="detail-box">
                <div class="item">
                  <span class="item-name">商品件数：</span>
                  <span class="item-val">{{count}}件</span>
                </div>
                <div class="item">
                  <span class="item-name">商品总价：</span>
                  <span class="item-val">{{cartTotalPrice}}元</span>
                </div>
                <div class="item">
                  <span class="item-name">优惠活动：</span>
                  <span class="item-val">0元</span>
                </div>
                <div class="item">
                  <span class="item-name">运费：</span>
                  <span class="item-val">0元</span>
                </div>
                <div class="item-total">
                  <span class="item-name">应付总额：</span>
                  <span class="item-val">{{cartTotalPrice}}元</span>
                </div>
              </div>
            </div>
            <div class="btn-group">
              <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
              <a href="javascript:;" class="btn btn-large">去结算</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from "../../api";

  export default {
    name: "OrderConfirm",
    data(){
      return{
        list:[],
        cartList:[],
        cartTotalPrice: 0,
        count:0
      }
    },
    mounted() {
      this.getAddressList()
      this.getCartList()
    },
    methods:{
      getAddressList(){
        request({
          url:'/shippings'
        }).then(res => {
          this.list = res.list
        })
      },
      getCartList(){
        request({
          url: "/carts"
        }).then(res => {
          let cartL = res.cartProductVoList || []
          this.cartTotalPrice = res.cartTotalPrice
          this.cartList = cartL.filter(item => item.productSelected)
          console.log(this.cartTotalPrice)
          cartL.map(item => {
            this.count += item.quantity
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #order-confirm{
    .wrapper{
      background-color: #f5f5f5;
      padding-top: 30px;
      padding-bottom: 84px;
      .order-box{
        background-color: #ffffff;
        padding-left: 40px;
        padding-bottom: 40px;
        .addr-title{
          font-size: 20px;
          color: #333333;
          font-weight: 200;
          margin-bottom: 21px;
        }
        .item-address{
          padding-top: 38px;
          .addr-list{
            .addr-info,.addr-add{
              box-sizing: border-box;
              float: left;
              width: 271px;
              height: 180px;
              border: 1px solid #e5e5e5;
              margin-right: 15px;
              padding: 15px 24px;
              font-size: 14px;
              color: #757575;
            }
            .addr-info{
              cursor: pointer;
              h2{
                height: 27px;
                font-size: 18px;
                font-weight: 300;
                color: #333;
                margin-bottom: 10px;
              }
              .street{
                height: 50px;
              }
              .action{
                height: 50px;
                line-height: 50px;
                padding-top: 20px;
                .icon{
                  width: 20px;
                  height: 20px;
                  vertical-align: middle;
                }
                .icon-del{
                  background: url("~assets/icon-del.png") no-repeat center;
                  background-size: contain;
                  &:hover{
                    background: url("~assets/icon-del-hover.png") no-repeat center;
                    background-size: contain;
                  }
                }
                .icon-edit{
                  background: url("~assets/icon-edit.png") no-repeat center;
                  background-size: contain;
                  &:hover{
                    background: url("~assets/icon-edit-hover.png") no-repeat center;
                    background-size: contain;
                  }
                }
              }
              &.checked{
                border: 1px solid #ff6700;
              }
            }
            .addr-add{
              text-align: center;
              color: #999999;
              cursor: pointer;
              .icon-add{
                width: 30px;
                height: 30px;
                background: url("~assets/icon-add.png") #E0E0E0 no-repeat center;
                background-size: 14px;
                margin: 45px auto 10px;
                /*margin-top: 45px;*/
                /*margin-bottom: 10px;*/
              }
            }
          }
        }
        .item-good{
          margin-top: 34px;
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 12px;
          h2{
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 5px;
          }
          li{
            display: flex;
            align-items: center;
            height: 40px;
            line-height: 40px;
            margin-top: 10px;
            font-size: 16px;
            color: #333333;
            .good-name{
              flex: 5;
              img{
                vertical-align: middle;
                width: 40px;
                height: 40px;
              }
              span{
                margin-left: 15px;
                font-weight: 500;
              }
            }
            .good-price{
              flex: 2;
              font-weight: bold;
            }
            .good-total{
              flex: 0.5;
              color: #ff6700;
              font-weight: bold;
            }
          }
        }
        .item-shipping{
          height: 80px;
          line-height: 80px;
          h2{
            width: 150px;
            float: left;
          }
          span{
            font-size: 14px;
            color: #ff6700;
          }
        }
        .item-invoice{
          height: 40px;
          line-height: 40px;
          h2{
            width: 150px;
            float: left;
          }
          a{
            margin-right: 30px;
            font-size: 14px;
            color: #ff6700;
          }
        }
        .pos-box{
          position: relative;
          height: 260px;
          .detail{
            position: relative;
            height: 180px;
            border-bottom: 1px solid #cccccc;
            .detail-box{
              position: absolute;
              right: 30px;
              .item{
                position: relative;
                right: 0;
                height: 30px;
                width: 250px;
                line-height: 30px;
                font-size: 16px;
                .item-name{
                  float: left;
                  color: #333333;
                }
                .item-val{
                  float: right;
                  font-weight: bold;
                  color: #ff6700;
                }
              }
              .item-total{
                height: 30px;
                width: 250px;
                line-height: 30px;
                font-size: 16px;
                margin-top: 15px;
                .item-name{
                  float: left;
                  color: #333333;
                }
                .item-val{
                  float: right;
                  font-size: 28px;
                  font-weight: 400;
                  color: #ff6700;
                }
              }
            }
          }
          .btn-group{
            position: absolute;
            right: 0;
            margin-top: 30px;
            .btn-default{
              background-color: #a8a7a9;
            }
          }
        }
      }
    }

  }
</style>
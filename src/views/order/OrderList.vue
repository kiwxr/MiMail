<template>
  <div id="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        所有的订单都在这里
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(item,index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{item.createTime}}
                <span>|</span>
                {{item.reciverName}}
                <span>|</span>
                {{item.orderNo}}
                <span>|</span>
                {{item.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{item.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(good,i) in item.orderItemVoList" :key="i">
                  <div class="good-img">
                    <img v-lazy="good.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{good.productName}}</div>
                    <div class="p-money">{{good.totalPrice + ' x ' +good.quantity}}</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="item.status == 10">
                <a href="javascript:;" @click="goPay(item.orderNo)">{{item.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else="good.status == 10">
                <a href="javascript:;">{{item.statusDesc}}</a>
              </div>
            </div>
          </div>
          <no-data v-if="!loading && list.length==0"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import OrderHeader from "../../components/order/OrderHeader";
  import Loading from "../../components/Loading";
  import {request} from "../../api";
  import NoData from "../../components/NoData";

  export default {
    name: "OrderList",
    components: {NoData, Loading, OrderHeader},
    data(){
      return{
        list:[],
        loading:true
      }
    },
    mounted() {
      this.getOrderList()
    },
    methods:{
      getOrderList(){
        request({
          url:'/orders'
        }).then(res => {
          // this.list = res.list
          this.loading = false
        })
      },
      goPay(orderNo){
        this.$router.push({
          path:'/order/pay',
          query:{
            orderNo
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "~assets/css/minixs.less";
  @import "~assets/css/config.less";
  #order-list{
    .wrapper{
      background-color: @colorJ;
      padding-top: 33px;
      padding-bottom: 110px;
      .order-box{
        .order{
          border: 1px #e5e5e5 solid;
          background-color: @colorG;
          margin-bottom: 31px;
          &:last-child{
            margin-bottom: 0;
          }
          .order-title{
            //height()
            height: 74px;
            line-height: 74px;
            background-color: @colorK;
            padding: 0 43px;
            font-size: 16px;
            color: @colorC;
            .item-info{
              span{
                margin: 0 9px;
              }
            }
            .money{
              font-size: 26px;
              color: @colorB;
            }
          }
          .order-content{
            padding: 0 43px;
            .good-box{
              width: 88%;
              .good-list{
                display: flex;
                align-items: center;
                height: 145px;
                .good-img{
                  width: 112px;
                  img{
                    width: 100%;
                    width: 100%;
                  }
                }
                .good-name{
                  font-size: 20px;
                  color: @colorB;
                }
              }
            }
            .good-state{
              height: 145px;
              line-height: 145px;
              font-size: 20px;
              color: @colorA;
              a{
                color: @colorA;
              }
            }
          }
        }
      }
    }
  }
</style>
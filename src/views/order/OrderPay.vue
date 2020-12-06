<template>
  <div id="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
        希望你钱够
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！请及时付款~</h2>
              <p>请在<span>30分</span>内完成支付，超时后将自动取消订单</p>
              <p>收货信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>应付金额：<span>{{payment}}</span>元</p>
              <p>订单详情 <em class="icon-down" :class="{'up':showDetail}" @click="showDetail=!showDetail"></em></p>
            </div>
          </div>
          <div class="item-total" v-show="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderNo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item, index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" alt="">
                    <div>{{item.productName}}</div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ail" :class="{'checked':payCheeck=='ail'}" @click="paySubmit('ail')"></div>
            <div class="pay pay-wechat" :class="{'checked':payCheeck=='wechat'}" @click="paySubmit('wechat')"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-if="showPay" :img="payImg" @close="closePayModel"/>
    <model title="支付确认" btn-type="3"
           :show-model="showPayModel"
           sure-text="查看订单"
           cancel-text="未支付"
           @cancel="showPayModel=false" @submit="goOrderList">
      <template v-slot:body>
        <p>确认是否完成支付？</p>
      </template>
    </model>
  </div>
</template>

<script>
  import {request} from "../../api";
  import QRCode from 'qrcode'
  import ScanPayCode from "../../components/ScanPayCode";
  import {Message} from "element-ui";
  import Model from "../../components/Model";
  import OrderHeader from "../../components/order/OrderHeader";

  export default {
    name: "OrderPay",
    components: {OrderHeader, Model, ScanPayCode},
    data(){
      return{
        orderNo:this.$route.query.orderNo,
        addressInfo: '',
        orderDetail: [],
        showDetail: false,
        payCheeck: '',
        showPay: false,
        showPayModel:false, //是否显示二次支付弹框
        payImg: '', //微信二维码地址
        payment: 0,  //订单总金额
        time: null //轮询计时器
      }
    },
    mounted() {
      this.getOrderDetail()
    },
    methods:{
      getOrderDetail(){
        request({
          url:`orders/${this.orderNo}`
        }).then(res => {
          let shippingVo = res.shippingVo
          this.addressInfo = `${shippingVo.receiverName} ${shippingVo.receiverMobile} ${shippingVo.receiverProvince} ${shippingVo.receiverCity} ${shippingVo.receiverDistrict} ${shippingVo.receiverAddress} ${shippingVo.receiverZip}`
          this.orderDetail = res.orderItemVoList
          this.payment = res.payment
        })
      },
      //支付
      paySubmit(type){
        if(type == 'ail'){
          this.payCheeck = 'ail'
          window.open('/#/order/alipay?orderId='+this.orderNo,'_blank')
        }else if(type == 'wechat'){
          this.payCheeck = 'wechat'
          request({
            url:'/pay',
            method:'post',
            data:{
              orderId: this.orderNo,
              orderName: 'vue高仿',
              amount:0.01, //支付金额
              payType: 2   //支付类型 1支付宝 2微信
            }
          }).then(res => {
            QRCode.toDataURL(res.content).
            then(url => {
              this.showPay = true
              this.payImg = url
              this.loopOrderState()
            }).catch(error => {Message.error('二维码生产失败')})
          })
        }
      },
      //关闭微信弹框
      closePayModel(){
        clearInterval(this.time)
        this.time = null
        this.showPay = false
        this.showPayModel = true
      },
      //轮询订单状态
      loopOrderState(){
        this.time = setInterval(() => {
          request({
            url:`/orders/${this.orderNo}`
          }).then(res => {
            if(res.status == 20){
              this.goOrderList()
            }
          })
        },2000)
      },
      goOrderList(){
        clearInterval(this.time)
        this.time = null
        this.$router.push('/order/list')
      }
    }
  }
</script>

<style scoped lang="less">
  #order-pay{
    .wrapper{
      background-color: #f5f5f5;
      padding-top: 30px;
      padding-bottom: 61px;
      .order-wrap{
        padding: 62px 50px;
        background-color: #ffffff;
        font-size: 14px;
        margin-bottom: 30px;
        .item-order{
          display: flex;
          align-items: center;
          .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background: url("~assets/icon-succ.png") #80c58a no-repeat center;
            background-size: 60px;
            margin-right: 40px;
          }
          .order-info{
            margin-right: 248px;
            h2{
              font-size: 24px;
              color: #333333;
              margin-bottom: 20px;
            }
            p{
              height: 20px;
              line-height: 20px;
              span{
                color: #ff6700;
              }
            }
          }
          .order-total{
            p{
              height: 50px;
              line-height: 50px;
              span{
                font-size: 28px;
                color: #ff6700;
              }
              .icon-down{
                display: inline-block;
                width: 15px;
                height: 15px;
                vertical-align: middle;
                margin-left: 15px;
                background: url("~assets/arrow_down.png") no-repeat center;
                background-size: contain;
                cursor: pointer;
                transition: all .5s;
                &.up{
                  transform: rotate(180deg);
                }
              }
              .icon-up{
                transform: rotate(180deg);
              }
            }
          }
        }
        .item-total{
          margin-top: 30px;
          padding-top: 30px;
          border-top: 1px solid #e5e5e5;
          .item{
            line-height: 40px;
            .detail-title{
              display: inline-block;
              width: 100px;
            }
            .detail-info{
              display: inline-block;
              vertical-align: middle;
              overflow: hidden;
              li{
                box-sizing: border-box;
                height: 40px;
                vertical-align: middle;
                img{
                  width: 25px;
                  height: 25px;
                }
                div{
                  line-height: 1.6;
                  margin-left: 30px;
                }
              }
            }
          }
        }
      }
      .item-pay{
        padding: 62px 50px;
        background-color: #ffffff;
        font-size: 14px;
        margin-bottom: 30px;
        .pay-way{
          border-top: 1px solid #e5e5e5;
          margin-top: 30px;
          padding-top: 30px;
          .pay{
            margin-top: 30px;
            margin-right: 20px;
            display: inline-block;
            width: 180px;
            height: 60px;
            border: 1px solid #e5e5e5;
          }
          .pay-ail{
            background: url("~assets/alipay.png") no-repeat center;
            background-size: contain;
          }
          .pay-wechat{
            background: url("~assets/wechat.png") no-repeat center;
            background-size: contain;
          }
          .checked{
            border: 1px solid #ff6700;
          }
        }
      }
    }
  }

</style>
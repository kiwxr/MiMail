<template>
  <div id="order-confirm">
    <order-header title="订单确认">
      <template v-slot:tip>
        买买买！！！
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收获地址</h2>
            <div class="addr-list clearfix">
              <div class="addr-info" :class="{'checked':addressCheck == index}" @click="addressCheck=index" v-for="(item, index) in list" :key="index">
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverMobile}}</div>
                <div class="street">{{item.receiverProvince+' '+item.receiverCity+' '+item.receiverDistrict+' '+item.receiverAddress}}</div>
                <div class="action">
                  <a href="javascript:;"class="fl" @click="delAddress(item)">
                    <div class="icon icon-del"></div>
                  </a>
                  <a href="javascript:;" class="fr" @click="openAddressModel(item)">
                    <div class="icon icon-edit"></div>
                  </a>
                </div>
              </div>
              <div class="addr-add" @click="openAddressModel()">
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
              <a href="javascript:;" class="btn btn-large" @click="submitOrder">去结算</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <model title="删除确认"
           btn-type="3"
           :show-model="showDelModel"
           @cancel="showDelModel=false"
           @submit="submitAddress">
      <template v-slot:body>
        <p>确认删除该地址妈？</p>
      </template>
    </model>
    <model title="添加收货地址"
           btn-type="3"
           :show-model="showEditModel"
           @cancel="showEditModel=false"
           @submit="submitAddress">
      <template v-slot:body>
       <div class="edit-wrap">
         <div class="item">
           <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName">
           <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile">
         </div>
         <div class="item">
           <select name="province" v-model="checkedItem.receiverProvince">
             <option value="北京">北京</option>
             <option value="河北">河北</option>
           </select>
           <select name="city" v-model="checkedItem.receiverCity">
             <option value="北京">北京</option>
             <option value="河北">河北</option>
           </select>
           <select name="district" v-model="checkedItem.receiverDistrict">
             <option value="北京">北京</option>
             <option value="河北">河北</option>
           </select>
         </div>
         <div class="item">
           <textarea name="street" v-model="checkedItem.receiverAddress"></textarea>
         </div>
         <div class="item">
           <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip">
         </div>
       </div>
      </template>
    </model>
  </div>
</template>

<script>
  import {request} from "../../api";
  import {Message} from "element-ui";
  import Model from "../../components/Model";
  import OrderHeader from "../../components/order/OrderHeader";

  export default {
    name: "OrderConfirm",
    components: {OrderHeader, Model},
    data(){
      return{
        list:[],
        cartList:[],
        cartTotalPrice: 0,
        count:0,
        checkedItem:{  //选中的商品对象

        },
        userAction: '-1',  //用户行为 0：新增 1：编辑 2：删除,
        showDelModel: false,
        showEditModel: false,
        addressCheck: 0
      }
    },
    mounted() {
      this.getAddressList()
      this.getCartList()
    },
    methods:{
      //获取购物车列表
      getCartList(){
        request({
          url: "/carts"
        }).then(res => {
          let cartL = res.cartProductVoList || []
          this.cartTotalPrice = res.cartTotalPrice
          this.cartList = cartL.filter(item => item.productSelected)
          cartL.map(item => {
            this.count += item.quantity
          })
        })
      },
      //获取收货地址
      getAddressList(){
        request({
          url:'/shippings'
        }).then(res => {
          this.list = res.list
        })
      },
      //打开弹窗
      openAddressModel(item){
        this.checkedItem = item || {}
        this.userAction = item?1:0
        this.showEditModel = true
      },
      //删除地址
      delAddress(item){
        this.checkedItem = item
        this.userAction = 2
        this.showDelModel = true
      },
      //关闭弹窗
      closeModel(){
        this.checkedItem = {}
        this.userAction = '-1'
        this.showDelModel = false
        this.showEditModel = false
      },
      //地址删除、编辑、新增 提交
      submitAddress(){
        let {checkedItem,userAction} = this
        let method,url= '',data = {}
        if(userAction == 0){
          method = 'post'
          url = '/shippings'
        }else if(userAction == 1){
          method = 'put'
          url = `/shippings/${checkedItem.id}`
        }else {
          method = 'delete'
          url = `/shippings/${checkedItem.id}`
        }
        if(userAction == 0 || userAction == 1){
          let {receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip} = checkedItem
          let errMsg = ''

          if(!receiverName){errMsg = "请输入收货人名称"}
          else if(!receiverMobile || !/\d{11}/.test(receiverMobile)){errMsg = "请输入正确格式的手机号"}
          else if(!receiverProvince){errMsg = "请省份"}
          else if (!receiverCity){errMsg = "请城市"}
          else if(!receiverDistrict){errMsg = "请区县"}
          else if(!receiverAddress){errMsg = "请输入详细地址"}
          else if(!receiverZip || !/\d{6}/.test(receiverZip)){errMsg = "请输入正确的邮编"}
          if(errMsg != ''){
            Message.error(errMsg)
            return
          }
          data={receiverName, receiverMobile,receiverPhone:receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip}
          console.log(receiverName)
          console.log(data)
        }
        request({
          url,
          method,
          data
        }).then(res => {
          this.closeModel()
          this.getAddressList()
          Message.success('操作成功')
        })
      },
      //生产订单
      submitOrder(){
        let item = this.list[this.addressCheck]
        if(!item){
          Message.error('请选择收获地址')
          return
        }
        request({
          url:'/orders',
          method: 'post',
          data:{
            shippingId:item.id
          }
        }).then(res => {
          this.$router.push({
            path:'/order/pay',
            query:{
              orderNo:res.orderNo
            }
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
              margin-bottom: 15px;
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
    .edit-wrap{
      font-size: 14px;
      color: #999999;
      .item{
        margin-bottom: 15px;
        .input{
          display: inline-block;
          box-sizing: border-box;
          width: 283px;
          height: 40px;
          line-height: 40px;
          padding-left: 15px;
          border: 1px solid #e5e5e5;
          &+.input{
            margin-left: 14px;
          }
        }
        select{
          box-sizing: border-box;
          width: 100px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #e5e5e5;
          margin-right: 15px;
        }
        textarea{
          box-sizing: border-box;
          height: 62px;
          width: 100%;
          padding: 13px 15px;
          border: 1px solid #e5e5e5;

        }
      }
    }
  }
</style>
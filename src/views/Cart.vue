<template>
  <div id="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        温馨提醒：！！！
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1 select"><span class="checkbox" :class="{'checked':allChecked}" @click="toggleAll"></span>全选</li>
            <li class="col-3"><span class="product-name">商品名称</span></li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item,index) in list" :key="index">
              <div class="item-check">
                <span class="checkbox" :class="{'checked':item.productSelected}" @click="upDataCart(item)"></span>
              </div>
              <div class="item-name clearfix">
                <img v-lazy="item.productMainImage" alt="">
                <div class="product-info">
                  <span>{{item.productName + ','+item.productSubtitle}}</span>
                </div>
              </div>
              <div class="item-price">999元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="upDataCart(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;"  @click="upDataCart(item,'+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del">
                <div class="del" @click="delProduct(item)"></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共 <span>{{list.length}}</span>件商品，已选择 <span>{{this.checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计： <span>{{cartTotalPrice}}</span>元
            <a href="javascript:; "class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar/>
    <nav-footer/>
  </div>
</template>

<script>
  import OrderHeader from "../components/order/OrderHeader";
  import NavFooter from "../components/nav/NavFooter";
  import ServiceBar from "../components/nav/ServiceBar";

  import {request} from "../api";
  import {Message} from "element-ui";

  export default {
    name: "Cart",
    components: {ServiceBar, NavFooter, OrderHeader},
    data(){
      return{
        list:[], //商品列表，
        allChecked: false, //是否全选
        cartTotalPrice: 0, //商品总金额
        checkedNum:0, //选中商品数量
      }
    },
    mounted() {
      this.getCartList()
    },
    methods:{
      //更新数据
      renderData(res){
        this.list = res.cartProductVoList || []
        this.allChecked = res.selectedAll
        this.cartTotalPrice = res.cartTotalPrice
        this.checkedNum = this.list.filter(item => item.productSelected).length
      },
      getCartList(){
        request({
          url:'carts',
        }).then(res => {
          this.renderData(res)
        })
      },
      //更新状态
      upDataCart(item,type){
        let quantity = item.quantity,
                selected = item.productSelected
        if(type == '-'){
          if(quantity == 1){
            Message.warning('商品至少保留一件')
            return
          }
          quantity--
        }else if(type == '+'){
          if(quantity >= item.productStock){
            Message.warning('商品库存不足')
            return
          }
          quantity++
        }else{
          selected = !item.productSelected
        }
        request({
          url:`/carts/${item.productId}`,
          method: 'put',
          data:{
            quantity,
            selected
          }
        }).then(res => this.renderData(res))
      },
      //全选
      toggleAll(){
        let url = this.allChecked?'/carts/unSelectAll':'/carts/selectAll'
        request({
          url,
          method:'put',
        }).then(res => this.renderData(res))
      },
      //删除商品
      delProduct(item){
        request({url:`/carts/${item.productId}`,method:'delete'}).
        then(res => {
          Message.success('删除成功')
          this.renderData(res)
        })
      },
      //购物车下单
      order(){
        let ieCheck = this.list.every(item => !item.productSelected)
        if(ieCheck){
          Message.warning('请选择一件商品')
        }else {
          this.$router.push('/order/confirm')
        }
      }
    },

  }
</script>

<style scoped lang="less">
  #cart{
    background-color: #f5f4f6;
    .wrapper{
      .container{
        .cart-box{
          margin-top: 30px;
          background-color: white;
          border: 2px solid #ececec;
          padding: 0 40px;
          .checkbox{
            float: left;
            display: inline-block;
            /*box-sizing: border-box;*/
            width: 15px;
            height: 15px;
            margin-top: 28px;
            margin-left: 15px;
            border: 2px solid #ececec;
            cursor: pointer;
            z-index: 10;
          }
          .checked{
            background: url("~assets/icon-checked.png") no-repeat center;
            background-size: contain;
          }
          .cart-item-head{
            display: flex;
            box-sizing: border-box;
            width: 100%;
            height: 70px;
            line-height: 70px;
            font-size: 14px;
            text-align: center;
            .product-name{
              float: left;
              margin-left: 100px;
            }
            .col-1{
              flex: 1;
            }
            .col-2{
              flex: 2;
            }
            .col-3{
              flex: 3;
            }
          }
          .cart-item-list{
            .cart-item{
              display: flex;
              box-sizing: border-box;
              width: 100%;
              height: 100px;
              text-align: center;
              line-height: 100px;
              font-size: 16px;
              border-top: 1px solid #ececec;
              .item-check{
                flex: 1;
                .checkbox{
                  margin-top: 40px;
                }
              }
              .item-name{
                flex: 3;
                img{
                  float: left;
                  width: 60px;
                  height: 80px;
                  margin-top: 10px;
                }
                .product-info{
                  height: 100px;
                  text-align: center;
                  line-height: 17px;
                  padding-top: 35px;
                }
              }
              .item-price{
                flex: 1;
              }
              .item-num{
                flex: 2;
                .num-box{
                  display: flex;
                  justify-content: space-between;
                  width: 140px;
                  height: 35px;
                  line-height: 35px;
                  margin: 32px auto;
                  border: 1px solid #ececec;
                  a{
                    display: inline-block;
                    width: 35px;
                  }
                  span{
                    display: inline-block;
                  }
                }
              }
              .item-total{
                flex: 1;
              }
              .item-del{
                flex: 1;
                .del{
                  width: 15px;
                  height: 15px;
                  margin: 40px auto;
                  background: url("~assets/icon-close.png") no-repeat center;
                  background-size: contain;
                }
              }
            }
          }
        }
        .order-wrap{
          height: 80px;
          text-align: center;
          line-height: 80px;
          .cart-tip{
            a{
              margin-right: 30px;
            }
            span{
              color: #ff6600;
              margin: 0 2px;
            }
          }
          .total{
            font-size: 14px;
            color: #ff6600;
            span{
              font-size: 18px;
              font-weight: bold;
            }
            a{
              display: inline-block;
              width: 150px;
              font-size: 12px;
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
</style>
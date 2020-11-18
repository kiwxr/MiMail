import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/index',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/product/:id',
        name: 'product',
        component: () => import('../views/Product.vue')
      },
      {
        path: '/detail/:id',
        name: 'detail',
        component: () => import('../views/Detail.vue')
      },
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/order/Order.vue'),
    children: [
      {
        path: '/order/list',
        name: 'order-list',
        component: () => import('../views/order/OrderList')
      },
      {
        path: '/order/pay',
        name: 'order-pay',
        component: () => import('../views/order/OrderPay')
      },
      {
        path: '/order/confirm',
        name: 'order-confirm',
        component: () => import('../views/order/OrderConfirm')
      },
      {
        path: '/order/alipay',
        name: 'alipay',
        component: () => import('../views/order/AliPay.vue')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router

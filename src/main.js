import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

const mock = false
if(mock){
  require('../src/mock/api.js')
}

Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/img/loading.svg',
  // attempt: 1
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// import Vue from 'vue'
import axios from  'axios'
// import VueAxios from "vue-axios";

// Vue.use(VueAxios)

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://152.136.185.210:8000/api/n3',
    // baseURL: 'http://www.baidu.com',
    // baseURL: 'http://39.101.167.59:5000/',
    // baseURL: 'http://192.168.11.4:8848/',
    // baseURL: 'http://127.0.0.1:8080/',
    baseURL : '/api', //跨域使用
    timeout: 5000
  })

  //请求拦截
  instance.interceptors.request.use(config => {
    return config
  },error => {

  })

  //响应拦截
  instance.interceptors.response.use(response => {
    let res = response.data
    if(res.status == 0) {
      return res.data
    }else if(res.status == 10){
      window.location.href = '/#/login'
    }else {
      alert(res.msg)
    }
  },error => {

  })

  return instance(config)
}


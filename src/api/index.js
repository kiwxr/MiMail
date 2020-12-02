// import Vue from 'vue'
// import VueAxios from "vue-axios";
import axios from  'axios'
import qs from 'querystring'

// Vue.use(VueAxios,axios)

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://152.136.185.210:8000/api/n3',
    // baseURL: 'http://www.baidu.com',
    // baseURL: 'http://39.101.167.59:5000/',
    // baseURL: 'http://192.168.11.4:8848/',
    // baseURL: 'http://127.0.0.1:8080/',
    baseURL : '/api', //跨域使用
    timeout: 5000,

    // transformRequest: [function (data, headers) {
    //   // `transformRequest` 允许在向服务器发送前，修改请求数据
    //   // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    //   console.log(headers["Content-Type"])
    //   // {Content-Type: "application/x-www-form-urlencoded"}
    //   if(headers["Content-Type"] == "application/json;charset=UTF-8") {
    //     console.log(data)
    //     return data
    //   }else {
    //     return qs.stringify(data)

    //   }
    // }],
  })

  //请求拦截
  instance.interceptors.request.use(config => {
    return config
  },error => {

  })

  //响应拦截
  instance.interceptors.response.use(response => {
    let res = response.data
    let path = location.hash
    if(res.status == 0) {
      return res.data
    }else if(res.status == 10){
      if(path != '#/index'){
        window.location.href = '/#/login'
        return Promise.reject(res)
      }
    }else {
      alert(res.msg)
      return Promise.reject(res)
    }
  },error => {

  })

  return instance(config)
}


// import Vue from 'vue'
// import VueAxios from "vue-axios";
import axios from  'axios'
import qs from 'querystring'
import {Message} from "element-ui";

// Vue.use(VueAxios,axios)

export function request(config) {
  const instance = axios.create({
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
      Message.warning(res.msg)
      return Promise.reject(res)
    }
  },error => {
    let res = error.response
    Message.error(res.data.message?res.data.message:res.message)
    return Promise.reject(error)
  })

  return instance(config)
}


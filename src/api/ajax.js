import axios from 'axios'
import store from '../store'
import qs from 'qs'
// 1创建axios实例
const service = axios.create({
  baseURL: '', // 接口地址
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 300 * 1000,
  
})

// 2 axios的请求拦截
service.interceptors.request.use(function(config) {
  if(config.data){
    if(typeof(config.data)=='string'){
      config.headers = {
        'content-type': 'application/x-www-form-urlencoded' // 配置请求头
      }
    }else{
      config.headers = {
        'Content-Type': "application/json; charset=utf-8"// 配置请求头
       }
    }
  }

  // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
  // config.data = JSON.stringify(config.data) // 数据转化,也可以使用qs转换
  // config.headers = {
  //   'content-type': 'application/x-www-form-urlencoded' // 配置请求头
  // }
  // 一般在这个位置判断token是否存在
  let tokens = store.state.user.token
  const token = tokens// 这里取token之前，你肯定需要先拿到token,存一下
  if (token) {
    // config.params = {'token':token} //如果要求携带在参数中
    config.headers.token = token // 如果要求携带在请求头中
  } 
  config.headers.lang='lang'
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 3 响应的拦截
service.interceptors.response.use(function(response) {
  return response
}, function(error) {
  // 处理响应失败
  return Promise.resolve(error.response)
})

// 4 封装方法
export default function ajax(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    // 执行异步ajax请求
    if (method === 'GET') {
        promise = service.get(url, { params: data }) // params配置, 指定的是query参数
    } else {
      if(data.index === 1){
        let params = qs.stringify(data.params)
        promise = service.post(url, params)
      }else{
        // debugger
        promise = service.post(url, data)
      }

      
    }  
    promise.then(
      response => { // 如果成功了, 调用resolve()
      // debugger
      // console.log(response)
        // if(response.status&&response.status===200){
            resolve(response.data)
        // }else{
          // console.log(response)
        // }
      },
      error => { // 如果失败了, 不调用reject(), 而是提示错误信息
        alert('请求异常: ' + error.message)
      }
    )
    // promise.catch(err => {
    //   reject(err.data)
    // })
  })
}

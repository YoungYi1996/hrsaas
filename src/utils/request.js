import axios from 'axios'
import store from '@/store/index'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const Timeout = 3600 // 定义超时时间

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 注入token
  if (store.getters.token) {
    // 只有在token的情况下，才有必要去检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 如果它为true表示过期了
      // token没用了，执行登出操作
      store.dispatch('user/logout')
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const { success, message, data } = response.data
  // 根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  // error信息里面response的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候表示后端告诉我token超时了
    store.dispatch('user/logout') // 登出操作,删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error) // 返回执行错误 当当前的执行链跳出成功 直接进入catch
})

// 是否超时
// 超时逻辑 （当前时间 - 缓存中的时间）是否大于时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > Timeout
}

export default service

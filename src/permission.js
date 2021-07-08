// 权限拦截在路由跳转 导航守卫

import router from '@/router/index'
import store from '@/store/index'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 定义白名单
const whiteList = ['/login', '/404']
// 前置守卫
router.beforeEach(async(to, from, next) => {
  nprogress.start() // 开启进度条
  if (store.getters.token) {
    // 如果有token
    if (to.path === '/login') {
      // 如果访问的是登录页
      next('/') // 跳到主页
    } else {
      // 如果当前vuex中有用户资料的id表示已有资料，不需获取，没有id才需要获取
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token的情况下
    if (whiteList.indexOf(to.path) > -1) {
      // 表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 解决手动切换地址进度条不关闭问题
})

// 后置守卫
router.afterEach(() => {
  // 关闭进度条
  nprogress.done()
})

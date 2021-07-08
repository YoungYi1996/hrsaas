import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
  token: getToken(), // 设置token为共享状态
  userInfo: {} // 定义一个空对象
}
const mutations = {
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex置空
    removeToken() // 同步到缓存
  },
  // 设置用户信息
  setUserInfo(state, result) {
    // 更新一个对象
    state.userInfo = result
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    // 调用api接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
    setTimeStamp() // 设置当前时间戳
  },
  // 获取用户资料的action
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 获取用户详情
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo } // 将两个接口结果合并
    context.commit('setUserInfo', baseResult)
    return baseResult
  },
  // 登出操作
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

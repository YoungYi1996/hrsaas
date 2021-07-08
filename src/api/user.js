import request from '@/utils/request'

// 登录接口封装
export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户资料接口
export function getUserInfo() {
  // 返回一个promise对象
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function logout() {

}

// 获取头像接口 为了显示头像 根据用户id获取用户详情
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

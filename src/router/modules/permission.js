// 导出员工的路由规则
import Layout from '@/layout'

export default {
  // 路由规则
  path: '/permission', // 路由地址
  name: 'permission', // 给模块一级路由加name属性
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/permission'),
    // 路由元信息 其实就是一个存储数据的地方，可以放任何内容
    meta: {
      title: '权限管理', // 左侧导航读取了这里的title属性
      icon: 'lock'
    }
  }]
}

// 导出员工的路由规则
import Layout from '@/layout'

export default {
  // 路由规则
  path: '/social', // 路由地址
  name: 'social', // 给模块一级路由加name属性
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/social'),
    // 路由元信息 其实就是一个存储数据的地方，可以放任何内容
    meta: {
      title: '社保', // 左侧导航读取了这里的title属性
      icon: 'table'
    }
  }]
}

// 导出员工的路由规则
import Layout from '@/layout'

export default {
  // 路由规则
  path: '/attendances', // 路由地址
  name: 'attendances', // 给模块一级路由加name属性
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/attendances'),
    // 路由元信息 其实就是一个存储数据的地方，可以放任何内容
    meta: {
      title: '考勤', // 左侧导航读取了这里的title属性
      icon: 'skill'
    }
  }]
}

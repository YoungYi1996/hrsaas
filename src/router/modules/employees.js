// 导出员工的路由规则
import Layout from '@/layout'

export default {
  // 路由规则
  path: '/employees', // 路由地址
  name: 'employees', // 给模块一级路由加name属性
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      // 路由元信息 其实就是一个存储数据的地方，可以放任何内容
      meta: {
        title: '员工管理', // 左侧导航读取了这里的title属性
        icon: 'people'
      }
    },
    {
      path: 'detail/:id?', // 动态路由参数
      component: () => import('@/views/employees/detail'),
      hidden: true, // 不在左侧菜单显示
      meta: {
        title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      }
    }
  ]
}

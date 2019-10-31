/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const jyycglRouter = {
  path: '/jyycgl',
  component: Layout,
  redirect: '/jyycgl/details',
  name: 'jyycgl',
  meta: {
    title: '经营异常管理',
    icon: 'tree'
  },
  children: [
    {
      path: 'details',
      component: () => import('@/views/jyycgl/details'),
      name: 'details',
      meta: { title: '经营异常录入', menuCodes: '100010' }
    },
    {
      path: 'abnormalSee',
      hidden: true,
      component: () => import('@/views/jyycgl/abnormal'),
      name: 'abnormalSee',
      meta: { title: '经营异常查看详情' }
    },
    {
      path: 'abnormalAdd',
      hidden: true,
      component: () => import('@/views/jyycgl/abnormal'),
      name: 'abnormalAdd',
      meta: { title: '经营异常新增' }
    },
    {
      path: 'abnormalUpd',
      hidden: true,
      component: () => import('@/views/jyycgl/abnormal'),
      name: 'abnormalUpd',
      meta: { title: '经营异常修改' }
    }
  ]
}

export default jyycglRouter

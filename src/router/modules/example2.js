/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const example2Router = {
  path: '/example2',
  component: Layout,
  redirect: '/example2/leftTree',
  name: 'example2',
  meta: {
    title: '开发例子',
    icon: 'tree'
  },
  children: [
    {
      path: 'leftTree',
      component: () => import('@/views/example2/leftTree'),
      name: 'leftTree',
      meta: { title: '左侧菜单树布局' }
    },
    {
      path: 'detailLayout',
      component: () => import('@/views/example2/detail-layout/index'),
      name: 'detailLayout',
      meta: { title: '详情页布局' }
    },
    {
      path: 'input-list',
      component: () => import('@/views/example2/input-list'),
      name: 'InputList',
      meta: { title: '各种input', noCache: true }
    }
  ]
}

export default example2Router

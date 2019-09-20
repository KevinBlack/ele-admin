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
      meta: { title: '左侧菜单树布局', menuCodes: '200010' }
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
    },
    {
      path: 'verify',
      component: () => import('@/views/example2/verify'),
      name: 'verify',
      meta: { title: '各类校验' }
    },
    {
      path: 'details-tab',
      component: () => import('@/views/example2/details-tab'),
      name: 'details-tab',
      meta: { title: '详情页切换' }
    },
    {
      path: 'details-table',
      component: () => import('@/views/example2/details-table'),
      name: 'details-table',
      meta: {
        title: '详情页表格'
      }
    },
    {
      path: 'transfer-dialog',
      component: () => import('@/views/example2/transfer-dialog'),
      name: 'transfer-dialog',
      meta: {
        title: '模态框'
      }
    },
    {
      path: 'dynamic-table',
      component: () => import('@/views/example2/dynamic-table'),
      name: 'dynamic-table',
      meta: {
        title: '动态表格'
      }
    }
  ]
}

export default example2Router

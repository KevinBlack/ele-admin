/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const membershipfeemangeRouter = {
  path: '/membership-fee-mange',
  component: Layout,
  redirect: '/membership-fee-mange/dj_list',
  name: 'membership-fee-mange',
  meta: {
    title: '会费管理',
    icon: 'hfgl',
    roles: ['admin', 'editor']
  },
  children: [
    {
      path: 'dj_list',
      component: () => import('@/views/membership-fee-mange/dj_list'),
      name: 'dj_list',
      meta: {
        title: '会费登记'
      }
    },
    {
      path: 'add',
      hidden: true,
      component: () => import('@/views/membership-fee-mange/add'),
      name: 'add',
      meta: { title: '新增登记' }
    },
    {
      path: 'sp_list',
      component: () => import('@/views/membership-fee-mange/sp_list'),
      name: 'sp_list',
      meta: {
        title: '会费查询'
      }
    }
  ]
}

export default membershipfeemangeRouter

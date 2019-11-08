/** 会费管理**/

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
      path: 'dj_Info',
      hidden: true,
      component: () => import('@/views/membership-fee-mange/dj_Info'),
      name: 'dj_Info',
      meta: { title: '查看详情' }
    },
    {
      path: 'sp_list',
      component: () => import('@/views/membership-fee-mange/sp_list'),
      name: 'sp_list',
      meta: {
        title: '会费查询'
      }
    },
    {
      path: 'dues-count',
      component: () => import('@/views/membership-fee-mange/dues-count'),
      name: 'DuesCount',
      meta: {
        title: '会费统计'
      }
    },
    {
      path: 'feeCollectionRulesManage',
      component: () => import('@/views/membership-fee-mange/feeCollectionRulesManage'),
      name: 'feeCollectionRulesManage',
      meta: {
        title: '会费收取规则'
      }
    },
    {
      path: 'addFeeCollectionRules',
      hidden: true,
      component: () => import('@/views/membership-fee-mange/addFeeCollectionRules'),
      name: 'addFeeCollectionRules',
      meta: {
        title: '会费收取规则添加'
      }
    },
    {
      path: 'updateFeeCollectionRules',
      hidden: true,
      component: () => import('@/views/membership-fee-mange/updateFeeCollectionRules'),
      name: 'updateFeeCollectionRules',
      meta: {
        title: '会费收取规则修改'
      }
    }
  ]
}

export default membershipfeemangeRouter

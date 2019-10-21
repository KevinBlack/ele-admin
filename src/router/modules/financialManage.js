/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const financialManageRouter = {
  path: '/hxxd',
  component: Layout,
  redirect: '',
  name: 'Hxxd',
  meta: {
    title: '财务管理',
    icon: 'tree'
  },
  children: [
    {
      path: 'selectFinancialManage',
      component: () => import('@/views/hxxd/financialManage'),
      name: 'financialManage',
      meta: { title: '财务管理信息' }
    },
    {
      path: 'importFinancialManage',
      component: () => import('@/views/hxxd/importFinancialManage'),
      name: 'importFinancialManage',
      meta: { title: '财务收款信息导入' }
    }
  ]
}

export default financialManageRouter

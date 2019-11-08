/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const financialManageRouter = {
  path: '/financialManage',
  component: Layout,
  redirect: '',
  name: 'FinancialManage',
  meta: {
    title: '财务管理',
    icon: 'moneymanage'
  },
  children: [
    {
      path: 'importFinancialManage',
      component: () => import('@/views/financialManage/importFinancialManage'),
      name: 'importFinancialManage',
      meta: { title: '财务收款信息导入' }
    }
  ]
}

export default financialManageRouter

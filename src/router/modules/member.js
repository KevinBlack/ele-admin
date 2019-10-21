/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const hxxdMemberRouter = {
  path: '/hxxdMemberManage',
  component: Layout,
  name: 'hxxdMemberManage',
  meta: {
    title: '会籍管理',
    icon: 'tree'
  },
  children: [
    {
      path: 'member-apply',
      component: () => import('@/views/hxxd/member/apply'),
      name: 'MemberApply',
      meta: { title: '会员申请' }
    },
    {
      path: 'member-apply-check',
      component: () => import('@/views/hxxd/member/apply-check'),
      name: 'MemberApplyCheck',
      meta: { title: '会员申请审批' }
    },
    {
      path: 'member-exit',
      component: () => import('@/views/hxxd/member/exit'),
      name: 'MemberExit',
      meta: { title: '退会申请' }
    },
    {
      path: 'member-exit-check',
      component: () => import('@/views/hxxd/member/exit-check'),
      name: 'MemberExitCheck',
      meta: { title: '退会申请审批' }
    },
    {
      path: 'member-statistics',
      component: () => import('@/views/hxxd/member/statistics'),
      name: 'MemberStatistics',
      meta: { title: '会员统计' }
    }
  ]
}

export default hxxdMemberRouter

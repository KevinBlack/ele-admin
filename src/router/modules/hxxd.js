/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const hxxdRouter = {
  path: '/agent',
  component: Layout,
  redirect: '/agent/info',
  name: 'hxxd',
  meta: {
    title: '航协销代',
    icon: 'guide'
  },
  children: [
    {
      path: 'info',
      hidden: true,
      component: () => import('@/views/agent/info'),
      name: 'info',
      meta: { title: '代理人信息录入', menuCodes: '100010' }
    },
    {
      path: 'agentquery',
      component: () => import('@/views/agent/agentquery'),
      name: 'agentquery',
      meta: { title: '代理人信息查询' }
    },
    {
      path: 'info-detail',
      hidden: true,
      component: () => import('@/views/agent/info-detail'),
      name: 'info-detail',
      meta: { title: '代理人信息查看详情' }
    },
    // {
    //   path: 'report-edit',
    //   component: () => import('@/views/report/report-edit'),
    //   name: 'report-edit',
    //   meta: { title: '年报信息录入' }
    // },
    {
      path: 'report-query',
      component: () => import('@/views/report/report-query'),
      name: 'report-query',
      meta: { title: '年报信息查询' }
    },
    {
      path: 'report-detail',
      hidden: true,
      component: () => import('@/views/report/report-detail'),
      name: 'ReportDetail',
      meta: { title: '年报信息详情查看' }
    },
    {
      path: 'sign-query',
      component: () => import('@/views/agent/sign-query'),
      name: 'sign-query',
      meta: { title: '签约信息查询' }
    },
    {
      path: 'company-register-edit',
      component: () => import('@/views/agent/company-register-edit'),
      name: 'company-register-edit',
      meta: { title: '企业注册信息录入' }
    },
    {
      path: 'company-register-audit',
      component: () => import('@/views/agent/company-register-edit'),
      name: 'company-register-audit',
      meta: { title: '企业注册审核' }
    },
    {
      path: 'sys-message-query',
      component: () => import('@/views/agent/sys-message-query'),
      name: 'SysMessageQuery',
      meta: {
        title: '系统消息查询'
      }
    },
    {
      path: 'sys-message-edit',
      hidden: true,
      component: () => import('@/views/agent/sys-message-edit'),
      name: 'sys-message-edit',
      meta: { title: '系统消息录入' }
    },
    {
      path: 'sys-message-detail',
      hidden: true,
      component: () => import('@/views/agent/sys-message-detail'),
      name: 'sys-message-detail',
      meta: { title: '系统消息详情查看' }
    },
    {
      path: 'sys-notice-query',
      component: () => import('@/views/agent/sys-notice-query'),
      name: 'SysNoticeQuery',
      meta: { title: '系统通知查询' }
    },
    {
      path: 'sys-notice-edit',
      hidden: true,
      component: () => import('@/views/agent/sys-notice-edit'),
      name: 'sys-notice-edit',
      meta: {
        title: '系统通知录入'
      }
    },
    {
      path: 'sys-notice-detail',
      hidden: true,
      component: () => import('@/views/agent/sys-notice-detail'),
      name: 'sys-notice-detail',
      meta: { title: '系统通知详情查看' }
    },
    {
      path: 'sys-leaveword-query',
      component: () => import('@/views/agent/sys-leaveword-query'),
      name: 'SysLeavewordQuery',
      meta: {
        title: '留言消息查询'
      }
    },
    {
      path: 'sys-leaveword-edit',
      hidden: true,
      component: () => import('@/views/agent/sys-leaveword-edit'),
      name: 'sys-leaveword-edit',
      meta: { title: '留言消息录入' }
    },
    {
      path: 'sys-leaveword-detail',
      hidden: true,
      component: () => import('@/views/agent/sys-leaveword-detail'),
      name: 'sys-leaveword-detail',
      meta: { title: '留言消息详情查看' }
    },
    {
      path: 'call-info-manage',
      component: () => import('@/views/agent/call-info-manage'),
      name: 'CallInfoManage',
      meta: { title: '催缴信息管理' }
    },
    {
      path: 'call-info-edit',
      hidden: true,
      component: () => import('@/views/agent/call-info-edit'),
      name: 'call-info-edit',
      meta: { title: '催缴信息新增' }
    },
    {
      path: 'call-info-detail',
      hidden: true,
      component: () => import('@/views/agent/call-info-detail'),
      name: 'call-info-detail',
      meta: {
        title: '系催缴信息详情查看'
      }
    }
  ]
}

export default hxxdRouter

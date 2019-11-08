/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const complaintManageRouter = {
  path: '/hxxd',
  component: Layout,
  redirect: '',
  name: 'Hxxd',
  meta: {
    title: '投诉管理',
    icon: 'form'
  },
  children: [
    {
      path: 'complaintInfo',
      component: () => import('@/views/hxxd/complaintInfo'),
      name: 'ComplaintInfo',
      meta: { title: '投诉管理信息' }
    },
    {
      path: '/complaintInfo/saveComplainProcessing',
      hidden: true,
      component: () => import('@/views/hxxd/complaintInfo/saveComplainProcessing'),
      name: 'saveComplainProcessing',
      meta: { title: '投诉处理信息填写' }
    },
    {
      path: 'securityIncidents',
      component: () => import('@/views/hxxd/securityIncidents'),
      name: 'SecurityIncidents',
      meta: { title: '安全事件管理' }
    },
    {
      path: 'securityIncidentAdd',
      hidden: true,
      component: () => import('@/views/hxxd/securityIncidentAdd'),
      name: 'SecurityIncidentAdd',
      meta: { title: '安全事件新增' }
    },
    {
      path: 'security-query',
      hidden: true,
      component: () => import('@/views/hxxd/security-query'),
      name: 'SecurityQuery',
      meta: {
        title: '销代人弹框'
      }
    },
    {
      path: 'dictair-query',
      hidden: true,
      component: () => import('@/views/hxxd/dictair-query'),
      name: 'DictAirQuery',
      meta: {
        title: '航空公司弹框'
      }
    },
    {
      path: 'saveComplainInfo',
      hidden: true,
      component: () => import('@/views/hxxd/complaintInfo/saveComplainInfo'),
      name: 'saveComplainInfo',
      meta: { title: '投诉信息新增' }
    },
    {
      path: 'complainDetails',
      hidden: true,
      component: () => import('@/views/hxxd/complainDetails'),
      name: 'complainDetails',
      meta: { title: '投诉详情查看' }
    },
    {
      path: 'complainQuery',
      hidden: true,
      component: () => import('@/views/complain/company-query'),
      name: 'ComplainQuery',
      meta: {
        title: '投诉详情查看'
      }
    }
  ]
}

export default complaintManageRouter

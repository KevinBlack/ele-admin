/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const complaintManageRouter = {
  path: '/hxxd',
  component: Layout,
  redirect: '',
  name: 'Hxxd',
  meta: {
    title: '投诉管理',
    icon: 'tree'
  },
  children: [
    {
      path: 'complaintInfo',
      component: () => import('@/views/hxxd/complaintInfo'),
      name: 'complaintInfo',
      meta: { title: '投诉管理信息' }
    },
    {
      path: '/complaintInfo/saveComplainProcessing',
      hidden: true,
      component: () => import('@/views/hxxd/complaintInfo/saveComplainProcessing'),
      name: 'saveComplainProcessing',
      meta: { title: '新增' }
    },
    {
      path: 'securityIncidents',
      component: () => import('@/views/hxxd/securityIncidents'),
      name: 'securityIncidents',
      meta: { title: '安全事件管理' }
    },
    {
      path: 'securityIncidentAdd',
      hidden: true,
      component: () => import('@/views/hxxd/securityIncidentAdd'),
      name: 'securityIncidentAdd',
      meta: { title: '安全事件新增' }
    },
    {
      path: 'saveComplainInfo',
      hidden: true,
      component: () => import('@/views/hxxd/complaintInfo/saveComplainInfo'),
      name: 'saveComplainInfo',
      meta: { title: '投诉信息新增' }
    }
  ]
}

export default complaintManageRouter

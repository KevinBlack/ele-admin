/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const hxxdRouter = {
  path: '/agent',
  component: Layout,
  redirect: '/agent/info',
  name: 'hxxd',
  meta: {
    title: '航协销代',
    icon: 'tree'
  },
  children: [
    {
      path: 'info',
      component: () => import('@/views/agent/info'),
      name: 'info',
      meta: { title: '代理人信息录入', menuCodes: '100010' }
    },
    {
      path: 'agentquery',
      component: () => import('@/views/agent/agentquery'),
      name: 'agentquery',
      meta: { title: '代理人信息查询' }
    }
  ]
}

export default hxxdRouter

/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const industryInfoPublishRouter = {
  path: '/infoPublish',
  component: Layout,
  redirect: '',
  name: 'InfoPublish',
  meta: {
    title: '行业信息管理',
    icon: 'tree'
  },
  children: [
    {
      path: 'selectIndustryInfo',
      component: () => import('@/views/infoPublish/selectIndustryInfo'),
      name: 'selectIndustryInfo',
      meta: { title: '信息发布' }
    },
    {
      path: 'updateIndustryInfo',
      hidden:true,
      component: () => import('@/views/infoPublish/updateIndustryInfo'),
      name: 'updateIndustryInfo',
      meta: { title: '行业信息修改' }
    }
  ]
}

export default industryInfoPublishRouter

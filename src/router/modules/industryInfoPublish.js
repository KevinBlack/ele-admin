/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const industryInfoPublishRouter = {
  path: '/infoPublish',
  component: Layout,
  redirect: '',
  name: 'InfoPublish',
  meta: {
    title: '行业信息管理',
    icon: 'international'
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
      name: 'UpdateIndustryInfo',
      meta: { title: '行业信息修改' }
    },
    {
      path: 'industryInfoEdit',
      hidden: true,
      component: () => import('@/views/infoPublish/industryInfoEdit'),
      name: 'IndustryInfoEdit',
      meta: {
        title: '新增行业信息'
      }
    },
    {
      path: 'industryInfoDetail',
      hidden: true,
      component: () => import('@/views/infoPublish/industryInfoDetail'),
      name: 'IndustryInfoDetail',
      meta: {
        title: '查看行业信息'
      }
    }
  ]
}

export default industryInfoPublishRouter

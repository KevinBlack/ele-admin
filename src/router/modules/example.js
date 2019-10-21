/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const exampleRouter = {
  path: '/example',
  component: Layout,
  // redirect: '/example/leftTree',
  name: 'Example',
  meta: {
    title: '开发例子',
    icon: 'tree'
  },
  children: [
    {
      path: 'leftTree',
      component: () => import('@/views/example/leftTree'),
      name: 'leftTree',
      meta: { title: '左侧菜单树布局', menuCodes: '200010' }
    },
    {
      path: 'demo-echarts',
      component: () => import('@/views/example/demo-echarts'),
      name: 'demo-echarts',
      meta: {
        title: '图标样例'
      }
    },
    {
      path: 'detailLayout',
      component: () => import('@/views/example/detail-layout/index'),
      name: 'DetailLayout',
      meta: { title: '详情页布局' }
    },
    {
      path: 'input-list',
      component: () => import('@/views/example/input-list'),
      name: 'InputList',
      meta: { title: '各种input', noCache: true }
    },
    {
      path: 'verify',
      component: () => import('@/views/example/verify'),
      name: 'verify',
      meta: { title: '各类校验' }
    },
    {
      path: 'details-tab',
      component: () => import('@/views/example/details-tab'),
      name: 'DetailsTab',
      meta: {
        title: '详情页切换',
        noCache: false
      }
    },
    {
      path: 'company-detail',
      hidden: true,
      component: () => import('@/views/system/company-detail'),
      name: 'CompanyDetail',
      // meta: { title: '公司详情', menuCodes: '100010' }
      meta: {
        title: '公司详情'
      }
    },
    {
      path: 'details-table',
      component: () => import('@/views/example/details-table'),
      name: 'details-table',
      meta: {
        title: '详情页表格'
      }
    },
    {
      path: 'details-tab-gang',
      component: () => import('@/views/example/details-tab-gang'),
      name: 'details-tab',
      meta: {
        title: '郝版切换页'
      }
    },
    {
      path: 'details-table-gang',
      component: () => import('@/views/example/details-table-gang'),
      name: 'details-table-gang',
      meta: {
        title: '郝版详情页'
      }
    },
    {
      path: 'transfer-dialog',
      component: () => import('@/views/example/transfer-dialog'),
      name: 'transfer-dialog',
      meta: {
        title: '表格弹框'
      }
    },
    {
      path: 'new-dialog',
      component: () => import('@/views/example/new-dialog'),
      name: 'MoDialog',
      meta: {
        title: '模态框'
      }
    },
    {
      path: 'dynamic-table',
      component: () => import('@/views/example/dynamic-table'),
      name: 'dynamic-table',
      meta: {
        title: '动态表格'
      }
    },
    {
      path: 'likejian-table',
      component: () => import('@/views/example/likejian-table'),
      name: 'likejian-table',
      meta: {
        title: '李科建测试'
      }
    },
    {
      path: 'likejian-table-detail',
      hidden: true,
      component: () => import('@/views/example/dynamic-table'),
      name: 'likejian-table-detail',
      meta: {
        title: '李科建测试详情页'
      }
    },
    {
      path: 'file-download-upload',
      component: () => import('@/views/example/file-download-upload'),
      name: 'file-download-upload',
      meta: {
        title: '文件上传下载'
      }
    },
    {
      path: 'show-pdf',
      component: () => import('@/views/example/show-pdf'),
      name: 'ShowPdf',
      meta: {
        title: 'PDF预览'
      }
    }
  ]
}

export default exampleRouter

/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/role',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'tree'
  },
  children: [
    {
      path: 'office',
      component: () => import('@/views/system/office'),
      name: 'OfficeManage',
      meta: { title: '机构管理' }
    },
    {
      path: 'office-detail',
      hidden: true,
      component: () => import('@/views/system/office-detail'),
      name: 'OfficeDetail',
      meta: { title: '机构详情' }
    },
    {
      path: 'user',
      component: () => import('@/views/system/user'),
      name: 'UserManage',
      meta: { title: '用户管理' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role'),
      name: 'RoleManage',
      meta: { title: '角色管理' }
    },
    {
      path: 'menu',
      component: () => import('@/views/system/menu'),
      name: 'MenuManage',
      meta: { title: '菜单管理' }
    },
    {
      path: 'menu-detail',
      hidden: true,
      component: () => import('@/views/system/menu-detail'),
      name: 'MenuDetail',
      meta: { title: '菜单详情' }
    }

  ]
}

export default systemRouter

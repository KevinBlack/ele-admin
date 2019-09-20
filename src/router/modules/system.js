/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/role',
  name: 'System',
  meta: {
    title: '系统管理',
    icon: 'tree',
    menuCodes: [ "100010", "100020", "10001010", "10001020", "100030", "100040"]
  },
  children: [
    {
      path: 'company',
      component: () => import('@/views/system/company'),
      name: 'CompanyManage',
      meta: { title: '公司管理', menuCodes: '100010' },
      props: { pageCode: '10001020' }
    },
    {
      path: 'company-detail',
      hidden: true,
      component: () => import('@/views/system/company-detail'),
      name: 'CompanyDetail',
      meta: { title: '公司详情', menuCodes: '100010' }
    },
    {
      path: 'office',
      component: () => import('@/views/system/office'),
      name: 'OfficeManage',
      meta: { title: '机构管理', menuCodes: '100020' }
    },
    {
      path: 'office-detail',
      hidden: true,
      component: () => import('@/views/system/office-detail'),
      name: 'OfficeDetail',
      meta: { title: '机构详情', menuCodes: '100020' }
    },
    {
      path: 'user',
      component: () => import('@/views/system/user'),
      name: 'UserManage',
      meta: { title: '用户管理', menuCodes: '100030' }
    },
    {
      path: 'user-detail',
      component: () => import('@/views/system/user-detail'),
      name: 'UserDetail',
      hidden: true,
      meta: { title: '用户详情', menuCodes: '100030' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role'),
      name: 'RoleManage',
      meta: { title: '角色管理', menuCodes: '100040' }
    },
    {
      path: 'role-detail',
      hidden: true,
      component: () => import('@/views/system/role-detail'),
      name: 'roleDetail',
      meta: { title: '角色详情', menuCodes: '100040' }
    },
    {
      path: 'menu',
      component: () => import('@/views/system/menu'),
      name: 'MenuManage',
      meta: { title: '菜单管理', menuCodes: '100050' }
    },
    {
      path: 'menu-detail',
      hidden: true,
      component: () => import('@/views/system/menu-detail'),
      name: 'MenuDetail',
      meta: { title: '菜单详情', menuCodes: '100050	' }
    }

  ]
}

export default systemRouter

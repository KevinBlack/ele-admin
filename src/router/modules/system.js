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
    //, menuCodes: [ "100010"]
  },
  children: [
    {
      path: 'company',
      component: () => import('@/views/system/company'),
      name: 'Company',
      // meta: { title: '公司管理', menuCodes: '100010' },
      meta: { title: '公司管理' },
      props: { pageCode: '10001020' }
    },
    {
      path: 'company-detail',
      hidden: true,
      component: () => import('@/views/system/company-detail'),
      name: 'CompanyDetail',
      // meta: { title: '公司详情', menuCodes: '100010' }
      meta: { title: '公司详情' }
    },
    {
      path: 'office',
      component: () => import('@/views/system/office'),
      name: 'Office',
      // meta: { title: '机构管理', menuCodes: '100020' }
      meta: { title: '机构管理' }
    },
    {
      path: 'office-detail',
      hidden: true,
      component: () => import('@/views/system/office-detail'),
      name: 'OfficeDetail',
      // meta: { title: '机构详情', menuCodes: '100020' }
      meta: { title: '机构详情' }
    },
    {
      path: 'user',
      component: () => import('@/views/system/user'),
      name: 'User',
      // meta: { title: '用户管理', menuCodes: '100030' }
      meta: { title: '用户管理' }
    },
    {
      path: 'user-detail',
      component: () => import('@/views/system/user-detail'),
      name: 'UserDetail',
      hidden: true,
      // meta: { title: '用户详情', menuCodes: '100030' }
      meta: { title: '用户详情' }
    },
    {
      path: 'role',
      component: () => import('@/views/system/role'),
      name: 'Role',
      // meta: { title: '角色管理', menuCodes: '100040' }
      meta: { title: '角色管理' }
    },
    {
      path: 'role-detail',
      hidden: true,
      component: () => import('@/views/system/role-detail'),
      name: 'RoleDetail',
      // meta: { title: '角色详情', menuCodes: '100040' }
      meta: { title: '角色详情' }
    },
    {
      path: 'role-datascope',
      hidden: true,
      component: () => import('@/views/system/role-datascope'),
      name: 'RoleDataScope',
      // meta: { title: '数据权限', menuCodes: '100040' }
      meta: { title: '数据权限' }
    },
    {
      path: 'menu',
      component: () => import('@/views/system/menu'),
      name: 'Menu',
      // meta: { title: '菜单管理', menuCodes: '100050' }
      meta: { title: '菜单管理' }
    },
    {
      path: 'menu-detail',
      hidden: true,
      component: () => import('@/views/system/menu-detail'),
      name: 'MenuDetail',
      // meta: { title: '菜单详情', menuCodes: '100050	' }
      meta: { title: '菜单详情' }
    },
    {
      path: 'dict',
      component: () => import('@/views/system/dict'),
      name: 'DictManage',
      // meta: { title: '字典管理', menuCodes: '100050' }
      meta: { title: '字典管理' }
    },
    {
      path: 'dict-detail',
      hidden: true,
      component: () => import('@/views/system/dict-detail'),
      name: 'DictDetail',
      // meta: { title: '菜单详情', menuCodes: '100050	' }
      meta: { title: '字典详情' }
    },
    {
      path: 'dict-data',
      hidden: true,
      component: () => import('@/views/system/dict-data'),
      name: 'DictData',
      // meta: { title: '菜单详情', menuCodes: '100050	' }
      meta: { title: '字典项列表' }
    },
    {
      path: 'dict-data-detail',
      hidden: true,
      component: () => import('@/views/system/dict-data-detail'),
      name: 'DictDataDetail',
      // meta: { title: '菜单详情', menuCodes: '100050	' }
      meta: { title: '字典项详情' }
    },
    {
      path: 'exception',
      component: () => import('@/views/system/exception'),
      name: 'Exception',
      // meta: { title: '异常日志', menuCodes: '100050	' }
      meta: { title: '异常日志' }
    }
  ]
}

export default systemRouter

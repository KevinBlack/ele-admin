import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
import systemRouter from './modules/system'
import exampleRouter from './modules/example'
import membershipfeemangeRouter from './modules/membership-fee-mange'
import hxxdRouter from './modules/hxxd'
import jyycglRouter from './modules/jyycgl'
import msgManageRouter from './modules/msgManage'
import complaintManageRouter from './modules/complaintManage'
import hxxdMemberRouter from './modules/member'
import industryInfoPublishRouter from './modules/industryInfoPublish'
import financialManageRouter from './modules/financialManage'
// import nestedRouter from './modules/nested'
// 系统基础路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    // name: 'register',
    hidden: true
  },
  {
    path: '/successPage',
    component: () => import('@/views/successPage'),
    name: 'SuccessPage',
    hidden: true
  },
  {
    path: '/newlogin',
    component: () => import('@/views/login/newlogin'),
    hidden: true
  },
  {
    path: '/resetPwd',
    component: () => import('@/views/resetPwd/index'),
    name: 'ResetPwd',
    hidden: true
  },
  {
    path: '/forgetPwd',
    component: () => import('@/views/forgetPwd/index'),
    name: 'ForgetPwd',
    hidden: true
  },
  {
    path: '/checkPwd',
    component: () => import('@/views/forgetPwd/checkPwd'),
    name: 'CheckPwd',
    hidden: true
  },
  {
    path: '/newsInfo',
    component: () => import('@/views/newsInfo/index'),
    name: 'NewsInfo',
    hidden: true
  },
  {
    path: '/news',
    component: () => import('@/views/newsInfo/news'),
    name: 'News',
    hidden: true
  },
  {
    path: '/newslist',
    component: () => import('@/views/newsInfo/newslist'),
    name: 'NewsList',
    hidden: true
  },
  {
    path: '/firmInfo-search',
    component: () => import('@/views/example/firmInfo-search'),
    hidden: true
  },
  {
    path: '/firmInfo-list',
    component: () => import('@/views/example/firmInfo-list'),
    hidden: true
  },
  {
    path: '/firmInfo',
    component: () => import('@/views/example/firmInfo'),
    hidden: true
  },
  {
    path: '/online-complaints',
    component: () => import('@/views/example/online-complaints'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user menuCodes
 * 业务相关所有路由。具体用户登录时，会根据一定规则规律此处路由
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // nestedRouter,
  systemRouter,
  exampleRouter,
  membershipfeemangeRouter,
  hxxdMemberRouter,
  hxxdRouter,
  jyycglRouter,
  msgManageRouter,
  complaintManageRouter,
  industryInfoPublishRouter,
  financialManageRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  base: '/hkysxh/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

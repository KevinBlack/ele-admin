// /** 会费管理**/

// import Layout from '@/layout'

// const membershipfeemangeRouter = {
//   path: '/membership-fee-mange',
//   component: Layout,
//   redirect: '/membership-fee-mange/register-list',
//   name: 'membership-fee-mange',
//   meta: {
//     title: '会费管理',
//     icon: 'hfgl',
//     roles: ['admin', 'editor']
//   },
//   children: [
//     {
//       path: 'register-list',
//       component: () => import('@/views/membership-fee-mange/register-list'),
//       name: 'RegisterList',
//       meta: {
//         title: '会费登记'
//       }
//     },
//     {
//       path: 'add',
//       hidden: true,
//       component: () => import('@/views/membership-fee-mange/add'),
//       name: 'Add',
//       meta: { title: '新增登记' }
//     },
//     {
//       path: 'modify-register',
//       hidden: true,
//       component: () => import('@/views/membership-fee-mange/modify-register'),
//       name: 'ModifyRegister',
//       meta: { title: '登记信息修改' }
//     },
//     {
//       path: 'register-info',
//       hidden: true,
//       component: () => import('@/views/membership-fee-mange/register-info'),
//       name: 'RegisterInfo',
//       meta: { title: '查看详情' }
//     },
//     {
//       path: 'approval-register-list',
//       component: () => import('@/views/membership-fee-mange/approval-register-list'),
//       name: 'ApprovalRegisterList',
//       meta: {
//         title: '会费查询'
//       }
//     },
//     {
//       path: 'dues-count',
//       component: () => import('@/views/membership-fee-mange/dues-count'),
//       name: 'DuesCount',
//       meta: {
//         title: '会费统计'
//       }
//     }
//     // {
//     //   path: 'feeCollectionRulesManage',
//     //   component: () => import('@/views/membership-fee-mange/feeCollectionRulesManage'),
//     //   name: 'feeCollectionRulesManage',
//     //   meta: {
//     //     title: '会费收取规则'
//     //   }
//     // },
//     // {
//     //   path: 'addFeeCollectionRules',
//     //   hidden: true,
//     //   component: () => import('@/views/membership-fee-mange/addFeeCollectionRules'),
//     //   name: 'addFeeCollectionRules',
//     //   meta: {
//     //     title: '会费收取规则添加'
//     //   }
//     // },
//     // {
//     //   path: 'updateFeeCollectionRules',
//     //   hidden: true,
//     //   component: () => import('@/views/membership-fee-mange/updateFeeCollectionRules'),
//     //   name: 'updateFeeCollectionRules',
//     //   meta: {
//     //     title: '会费收取规则修改'
//     //   }
//     // }
//   ]
// }

// export default membershipfeemangeRouter

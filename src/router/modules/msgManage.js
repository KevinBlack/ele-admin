/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const msgManage = {
  path: '/msgManage',
  component: Layout,
  redirect: '/msgManage/email',
  name: 'hxxd',
  meta: {
    title: '消息管理',
    icon: 'message'
  },
  children: [
    {
      path: 'note',
      component: () => import('@/views/msgManage/noteSend'),
      name: 'NoteSend',
      meta: {
        title: '手机短信发送'
      }
    },
    {
      path: 'noteAdd',
      hidden: true,
      component: () => import('@/views/msgManage/noteDetails'),
      name: 'noteAdd',
      meta: {
        title: '短信新增'
      }
    }, {
      path: 'noteUpd',
      hidden: true,
      component: () => import('@/views/msgManage/noteDetails'),
      name: 'noteUpd',
      meta: {
        title: '短信修改'
      }
    }, {
      path: 'noteSee',
      hidden: true,
      component: () => import('@/views/msgManage/noteDetails'),
      name: 'noteSee',
      meta: {
        title: '短信查看详情'
      }
    },
    {
      path: 'email',
      component: () => import('@/views/msgManage/emailList'),
      name: 'email',
      meta: { title: '消息邮件发送', menuCodes: '100010' }
    },
    {
      path: 'emailAdd',
      hidden: true,
      component: () => import('@/views/msgManage/emailDetails'),
      name: 'emailAdd',
      meta: { title: '消息邮件新增' }
    },
    {
      path: 'emailUpd',
      hidden: true,
      component: () => import('@/views/msgManage/emailDetails'),
      name: 'emailUpd',
      meta: { title: '消息邮件修改' }
    },
    {
      path: 'emailSee',
      hidden: true,
      component: () => import('@/views/msgManage/emailDetails'),
      name: 'emailSee',
      meta: { title: '消息邮件查看详情' }
    }
  ]
}

export default msgManage

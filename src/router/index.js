import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
import systemRouter from './modules/system'
import exampleRouter from './modules/example'
// import membershipfeemangeRouter from './modules/membership-fee-mange'
// import hxxdRouter from './modules/hxxd'
// import msgManageRouter from './modules/msgManage'
// import complaintManageRouter from './modules/complaintManage'
// import industryInfoPublishRouter from './modules/industryInfoPublish'
// import financialManageRouter from './modules/financialManage'
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
    path: '/headerReload',
    component: () => import('@/components/HeaderReload'),
    // name: 'HeaderReload',
    hidden: true
  },
  {
    path: '/FooterReload',
    component: () => import('@/components/FooterReload'),
    // name: 'FooterReload',
    hidden: true
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
    component: () => import('@/views/publicPage/firmInfo-search'),
    hidden: true
  },
  {
    path: '/firmInfo-list',
    component: () => import('@/views/publicPage/firmInfo-list'),
    hidden: true
  },
  {
    path: '/firmInfo',
    component: () => import('@/views/publicPage/firmInfo'),
    hidden: true
  },
  {
    path: '/anonw/firmReaport',
    component: () => import('@/views/publicPage/firmReaport'),
    hidden: true
  },
  {
    path: '/anonw/firstComplaintDetails',
    hidden: true,
    component: () => import('@/views/hxxd/first-complaint-details'),
    name: 'firstComplaintDetails',
    meta: { title: '投诉详情查看' }
  },
  {
    path: '/online-complaints',
    component: () => import('@/views/complain/online-complaints'),
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
  {
    path: '/sales-agent-manage',
    component: Layout,
    redirect: '',
    name: 'SalesAgentManage',
    meta: {
      title: '销代企业管理',
      icon: 'tree', menuCodes: '10002010'
    },
    children: [
      {
        path: 'comp-info-maintain',
        component: () => import('@/views/agent/info'),
        name: 'compInfoMaintain',
        meta: { title: '企业信息维护', menuCodes: '1000201090' }
      },
      {
        path: 'comp-registration-info',
        component: () => import('@/views/agent/company-register-edit'),
        name: 'compRegistrationInfo',
        meta: { title: '企业注册信息', menuCodes: '1000201020' }
      },
      {
        path: 'company-register-audit',
        component: () => import('@/views/agent/company-register-audit'),
        name: 'company-register-audit',
        meta: { title: '企业注册信息审核', menuCodes: '1000201020' }
      },
      {
        path: 'sales-agent-info-query',
        component: () => import('@/views/agent/agentquery'),
        name: 'salesAgentInfoQuery',
        meta: { title: '销售企业信息查询', menuCodes: '1000201030' }
      },
      {
        path: 'sales-agent-info-detail',
        hidden: true,
        component: () => import('@/views/agent/info-detail'),
        name: 'salesAgentIinfDetail',
        meta: { title: '代理人信息查看修改', menuCodes: '1000201100' }
      }
    ]
  },
  {
    path: '/abnormal-operation-manage',
    component: Layout,
    redirect: '',
    name: 'AbnormalOperationManage',
    meta: {
      title: '经营异常管理',
      icon: 'tree', menuCodes: '10002020'
    },
    children: [
      {
        path: 'abnormal-operation-query',
        component: () => import('@/views/jyycgl/list'),
        name: 'AbnormalOperationQuery',
        meta: { title: '经营异常管理', menuCodes: '1000202010' }
      },
      {
        path: 'abnormal-see',
        hidden: true,
        component: () => import('@/views/jyycgl/detail'),
        name: 'AbnormalSee',
        meta: { title: '经营异常查看详情', menuCodes: '100020201080' }
      },
      {
        path: 'abnormal-add',
        hidden: true,
        component: () => import('@/views/jyycgl/detail'),
        name: 'AbnormalAdd',
        meta: { title: '经营异常新增', menuCodes: '100020201080' }
      },
      {
        path: 'abnormal-upd',
        hidden: true,
        component: () => import('@/views/jyycgl/detail'),
        name: 'AbnormalUpd',
        meta: { title: '经营异常修改', menuCodes: '100020201080' }
      }
    ]
  },
  {
    path: '/security-incidents-manage',
    component: Layout,
    redirect: '',
    name: 'SecurityIncidentsManage',
    meta: {
      title: '安全事件管理',
      icon: 'tree', menuCodes: '10002110'
    },
    children: [
      {
        path: 'security-incidents-query',
        component: () => import('@/views/hxxd/securityIncidents'),
        name: 'SecurityIncidentsQuery',
        meta: { title: '安全事件管理', menuCodes: '1000211010' }
      },
      {
        path: 'security-incident-add',
        hidden: true,
        component: () => import('@/views/hxxd/securityIncidentAdd'),
        name: 'SecurityIncidentAdd',
        meta: { title: '安全事件新增', menuCodes: '100021101070' }
      },
      {
        path: 'security-incident-edit',
        hidden: true,
        component: () => import('@/views/hxxd/securityIncidentEdit'),
        name: 'SecurityIncidentEdit',
        meta: { title: '安全事件修改', menuCodes: '100021101080' }
      },
      {
        path: 'security-incident-check',
        hidden: true,
        component: () => import('@/views/hxxd/securityIncidentCheck'),
        name: 'SecurityIncidentCheck',
        meta: { title: '安全事件详情', menuCodes: '100021101100' }
      }
    ]
  },
  {
    path: '/annual-report',
    component: Layout,
    redirect: '',
    name: 'AnnualReport',
    meta: {
      title: '年报信息管理',
      icon: 'tree', menuCodes: '10002070'
    },
    children: [
      {
        path: 'annual-report-add',
        component: () => import('@/views/report/report-edit'),
        name: 'AnnualReportAdd',
        meta: { title: '年报信息填报', menuCodes: '100020702060' }
      },
      {
        path: 'annual-report-query',
        component: () => import('@/views/report/report-query'),
        name: 'AnnualReportQuery',
        meta: { title: '年报信息查询', menuCodes: '1000207020' }
      },
      {
        path: 'annual-report-detail',
        hidden: true,
        component: () => import('@/views/report/report-detail'),
        name: 'annualReportDetail',
        meta: { title: '年报信息详情', menuCodes: '100020702070' }
      }
    ]
  },
  {
    path: '/signing-info-manage',
    component: Layout,
    redirect: '',
    name: 'SigningInfoImport',
    meta: {
      title: '签约信息管理',
      icon: 'tree', menuCodes: '10002080'
    },
    children: [
      {
        path: 'signing-info-import',
        component: () => import('@/views/agent/sign-query'),
        name: 'SigningInfoImport',
        meta: { title: '签约信息导入', menuCodes: '10002080' }
      }
    ]
  },
  {
    path: '/membership-manage',
    component: Layout,
    redirect: '',
    name: 'MembershipManage',
    meta: {
      title: '会籍管理',
      icon: 'tree',
      menuCodes: '10002060'
    },
    children: [
      {
        path: 'membership-apply',
        component: () => import('@/views/hxxd/member/membership-apply'),
        name: 'MembershipApply',
        meta: { title: '会员申请', menuCodes: '1000206010' }
      },
      {
        path: 'membership-apply-detail',
        component: () => import('@/views/hxxd/member/membership-apply-detail'),
        name: 'MembershipApplyDetail',
        hidden: true,
        meta: { title: '会员申请详情', menuCodes: '100020601050' }
      },
      {
        path: 'membership-apply-audit',
        component: () => import('@/views/hxxd/member/membership-apply-audit'),
        name: 'MembershipApplyAudit',
        meta: { title: '会员申请审批', menuCodes: '1000206020' }
      },
      {
        path: 'membership-apply-audit-detail',
        component: () => import('@/views/hxxd/member/membership-apply-audit-detail'),
        name: 'MembershipApplyAuditDetail',
        hidden: true,
        meta: { title: '会员申请审批详情', menuCodes: '100020602050' }
      },
      {
        path: 'membership-exit-apply',
        component: () => import('@/views/hxxd/member/membership-exit-apply'),
        name: 'MembershipExitApply',
        meta: { title: '退会申请', menuCodes: '1000206030' }
      },
      {
        path: 'membership-exit-apply-detail',
        component: () => import('@/views/hxxd/member/membership-exit-apply-detail'),
        name: 'MembershipExitApplyDetail',
        hidden: true,
        meta: { title: '退会申请详情', menuCodes: '100020603050' }
      },
      {
        path: 'membership-exit-apply-audit',
        component: () => import('@/views/hxxd/member/membership-exit-apply-audit'),
        name: 'MembershipExitApplyAudit',
        meta: { title: '退会申请审核', menuCodes: '1000206040' }
      },
      {
        path: 'member-list',
        component: () => import('@/views/hx/member/member-list'),
        name: 'MemberList',
        meta: { title: '会员查询', menuCodes: '1000206050' }
      },
      {
        path: 'member-detail',
        component: () => import('@/views/hx/member/member-detail'),
        name: 'MemberDetail',
        hidden: true,
        meta: { title: '会员详情', menuCodes: '100020605060' }
      },
      {
        path: 'member-statistics',
        component: () => import('@/views/hx/member/member-statistics'),
        name: 'MemberStatistics',
        meta: { title: '会员统计', menuCodes: '1000206060' }
      }
    ]
  },
  {
    path: '/membership-fee-manage',
    component: Layout,
    redirect: '',
    name: 'MembershipFeeManage',
    meta: {
      title: '会费管理',
      icon: 'tree', menuCodes: '10002150'
    },
    children: [
      {
        path: 'register-list',
        component: () => import('@/views/membership-fee-mange/register-list'),
        name: 'RegisterList',
        meta: {
          title: '会费查询', menuCodes: '1000215010'
        }
      },
      {
        path: 'add',
        hidden: true,
        component: () => import('@/views/membership-fee-mange/add'),
        name: 'Add',
        meta: { title: '新建登记', menuCodes: '100021501070' }
      },
      {
        path: 'modify-register',
        hidden: true,
        component: () => import('@/views/membership-fee-mange/add'),
        name: 'ModifyRegister',
        meta: { title: '登记信息修改', menuCodes: '100021501070' }
      },
      // {
      //   path: 'modify-register',
      //   hidden: true,
      //   component: () => import('@/views/membership-fee-mange/modify-register'),
      //   name: 'ModifyRegister',
      //   meta: { title: '登记信息修改', menuCodes: '1000215070' }
      // },
      {
        path: 'register-info',
        hidden: true,
        component: () => import('@/views/membership-fee-mange/register-info'),
        name: 'RegisterInfo',
        meta: { title: '查看详情', menuCodes: '100021501080' }
      },
      {
        path: 'approval-register-list',
        component: () => import('@/views/membership-fee-mange/approval-register-list'),
        name: 'ApprovalRegisterList',
        meta: {
          title: '会费审批', menuCodes: '1000215020'
        }
      },
      {
        path: 'fee-collection-rules-manage',
        component: () => import('@/views/membership-fee-mange/feeCollectionRulesManage'),
        name: 'feeCollectionRulesManage',
        meta: {
          title: '会费收取规则', menuCodes: '1000215030'
        }
      },
      {
        path: 'addFeeCollectionRules',
        hidden: true,
        component: () => import('@/views/membership-fee-mange/addFeeCollectionRules'),
        name: 'addFeeCollectionRules',
        meta: {
          title: '会费收取规则添加', menuCodes: '100021503040'
        }
      },
      {
        path: 'updateFeeCollectionRules',
        hidden: true,
        component: () => import('@/views/membership-fee-mange/updateFeeCollectionRules'),
        name: 'updateFeeCollectionRules',
        meta: {
          title: '会费收取规则更新', menuCodes: '100021503050'
        }
      },
      {
        path: 'dues-count',
        component: () => import('@/views/membership-fee-mange/dues-count'),
        name: 'DuesCount',
        meta: {
          title: '会费统计', menuCodes: '1000215040'
        }
      }
      // {
      //   path: 'membership-statistics',
      //   component: () => import('@/views/dashboard/index'),
      //   name: 'MembershipStatistics',
      //   meta: { title: '会费统计' }
      // }
    ]
  },
  {
    path: '/financial-manage',
    component: Layout,
    redirect: '',
    name: 'FinancialManage',
    meta: {
      title: '财务管理',
      icon: 'tree', menuCodes: '10002120'
    },
    children: [
      {
        path: 'financial-receipt-import',
        component: () => import('@/views/financialManage/importFinancialManage'),
        name: 'FinancialReceiptImport',
        meta: { title: '财务收款导入', menuCodes: '1000212040' }
      }
    ]
  },
  {
    path: '/message-manage',
    component: Layout,
    redirect: '',
    name: 'MessageManage',
    meta: {
      title: '消息管理',
      icon: 'tree', menuCodes: '10002090'
    },
    children: [
      {
        path: 'sms-notice',
        component: () => import('@/views/msgManage/noteSend'),
        name: 'SmsNotice',
        meta: { title: '短信通知', menuCodes: '1000209010' }
      },
      {
        path: 'note-add',
        hidden: true,
        component: () => import('@/views/msgManage/noteDetails'),
        name: 'NoteAdd',
        meta: {
          title: '短信新增', menuCodes: '100020901060'
        }
      },
      {
        path: 'note-upd',
        hidden: true,
        component: () => import('@/views/msgManage/noteDetails'),
        name: 'NoteUpd',
        meta: {
          title: '短信修改', menuCodes: '100020901060'
        }
      },
      {
        path: 'note-see',
        hidden: true,
        component: () => import('@/views/msgManage/noteDetails'),
        name: 'NoteSee',
        meta: {
          title: '短信查看详情', menuCodes: '100020901060'
        }
      },
      {
        path: 'mail-notice',
        component: () => import('@/views/msgManage/emailList'),
        name: 'MailNotice',
        meta: { title: '邮件通知', menuCodes: '1000209020' }
      },
      {
        path: 'email-add',
        hidden: true,
        component: () => import('@/views/msgManage/emailDetails'),
        name: 'EmailAdd',
        meta: { title: '消息邮件新增', menuCodes: '100020902050' }
      },
      {
        path: 'email-upd',
        hidden: true,
        component: () => import('@/views/msgManage/emailDetails'),
        name: 'EmailUpd',
        meta: { title: '消息邮件修改', menuCodes: '100020902050' }
      },
      {
        path: 'email-see',
        hidden: true,
        component: () => import('@/views/msgManage/emailDetails'),
        name: 'EmailSee',
        meta: { title: '消息邮件查看详情', menuCodes: '100020902050' }
      },
      {
        path: 'notice-announcement',
        component: () => import('@/views/agent/sys-notice-query'),
        name: 'noticeAnnouncement',
        meta: { title: '通知公告', menuCodes: '1000209030' }
      },
      {
        path: 'notice-announcement-edit',
        hidden: true,
        component: () => import('@/views/agent/sys-notice-edit'),
        name: 'noticeAnnouncementEdit',
        meta: {
          title: '系统通知录入', menuCodes: '100020903050'
        }
      },
      {
        path: 'notice-announcement-detail',
        hidden: true,
        component: () => import('@/views/agent/sys-notice-detail'),
        name: 'noticeAnnouncementDetail',
        meta: { title: '系统通知修改', menuCodes: '100020903060' }
      },
      {
        path: 'leaving-message',
        component: () => import('@/views/agent/sys-leaveword-query'),
        name: 'LeavingMessage',
        meta: { title: '会员之声', menuCodes: '1000209040' }
      },
      {
        path: 'leaving-message-edit',
        hidden: true,
        component: () => import('@/views/agent/sys-leaveword-edit'),
        name: 'leavingMessageEdit',
        meta: { title: '会员之声录入', menuCodes: '100020904060' }
      },
      {
        path: 'leaving-message-detail',
        hidden: true,
        component: () => import('@/views/agent/sys-leaveword-detail'),
        name: 'leavingMessageDetail',
        meta: { title: '会员之声修改', menuCodes: '100020904070' }
      },
      {
        path: 'system-message',
        component: () => import('@/views/agent/sys-message-query'),
        name: 'SystemMessage',
        meta: { title: '系统消息', menuCodes: '1000209050' }
      },
      {
        path: 'system-message-edit',
        hidden: true,
        component: () => import('@/views/agent/sys-message-edit'),
        name: 'systemMessageEdit',
        meta: { title: '新增', menuCodes: '100020905060' }
      },
      {
        path: 'system-message-detail',
        hidden: true,
        component: () => import('@/views/agent/sys-message-detail'),
        name: 'systemMessageDetail',
        meta: { title: '系统消息修改', menuCodes: '100020905070' }
      }
    ]
  },
  {
    path: '/urge-pay-manage',
    component: Layout,
    redirect: '',
    name: 'urgePayManage',
    meta: {
      title: '催缴管理',
      icon: 'tree', menuCodes: '10002100'
    },
    children: [
      {
        path: 'urge-pay-setting',
        component: () => import('@/views/agent/call-info-edit'),
        name: 'UrgePaySetting',
        meta: { title: '催缴消息设置', menuCodes: '1000210090' }
      },
      {
        path: 'urge-pay-query',
        component: () => import('@/views/agent/call-info-manage'),
        name: 'FinancialReceiptQuery',
        meta: { title: '催缴消息查询', menuCodes: '1000210020' }
      },
      {
        path: 'urge-pay-detail',
        hidden: true,
        component: () => import('@/views/agent/call-info-detail'),
        name: 'urgePayDetail',
        meta: {
          title: '催缴信息修改', menuCodes: '1000210110'
        }
      }
    ]
  },
  {
    path: '/complaint-manage',
    component: Layout,
    redirect: '',
    name: 'ComplaintManage',
    meta: {
      title: '投诉管理',
      icon: 'tree', menuCodes: '10002130'
    },
    children: [
      {
        path: 'complaint-query',
        component: () => import('@/views/hxxd/complaintInfo'),
        name: 'complaintQuery',
        meta: { title: '投诉查询', menuCodes: '1000213010' }
      },
      {
        path: 'securityQuery',
        hidden: true,
        component: () => import('@/views/hxxd/security-query'),
        name: 'SecurityQuery',
        meta: {
          title: '销代人弹框'
        }
      },
      {
        path: 'dictairQuery',
        hidden: true,
        component: () => import('@/views/hxxd/dictair-query'),
        name: 'DictAirQuery',
        meta: {
          title: '航空公司弹框'
        }
      },
      {
        path: 'saveComplainProcessing',
        hidden: true,
        component: () => import('@/views/hxxd/complaintInfo/saveComplainProcessing'),
        name: 'saveComplainProcessing',
        meta: { title: '投诉处理信息填写', menuCodes: '100021301050' }
      },
      {
        path: 'complainDetails',
        hidden: true,
        component: () => import('@/views/hxxd/complainDetails'),
        name: 'complainDetails',
        meta: { title: '投诉详情查看', menuCodes: '100021301060' }
      },
      {
        path: 'complainExamine',
        hidden: true,
        component: () => import('@/views/hxxd/complainExamine'),
        name: 'complainExamine',
        meta: {
          title: '投诉复审', menuCodes: '100021301070'
        }
      }
    ]
  },
  {
    path: '/infoPublish',
    component: Layout,
    redirect: '',
    name: 'AccountManage',
    meta: {
      title: '信息',
      icon: 'tree', menuCodes: '10002140'
    },
    children: [
      {
        path: 'selectIndustryInfo',
        component: () => import('@/views/infoPublish/selectIndustryInfo'),
        name: 'selectIndustryInfo',
        meta: { title: '行业信息查询', menuCodes: '1000214010' }
      },
      {
        path: 'updateIndustryInfo',
        hidden: true,
        component: () => import('@/views/infoPublish/updateIndustryInfo'),
        name: 'UpdateIndustryInfo',
        meta: { title: '行业信息修改', menuCodes: '100021401080' }
      },
      {
        path: 'industryInfoEdit',
        hidden: true,
        component: () => import('@/views/infoPublish/industryInfoEdit'),
        name: 'IndustryInfoEdit',
        meta: {
          title: '新增行业信息', menuCodes: '100021401070' }
      },
      {
        path: 'rich-components',
        component: () => import('@/views/infoPublish/rich-components'),
        name: 'RichComponents',
        hidden: true,
        meta: {
          title: '富文本组件'
        }
      },
      {
        path: 'industryInfoDetail',
        hidden: true,
        component: () => import('@/views/infoPublish/industryInfoDetail'),
        name: 'IndustryInfoDetail',
        meta: {
          title: '查看行业信息', menuCodes: '100021401090'
        }
      }
    ]
  },
  {
    path: '/account-manage',
    component: Layout,
    redirect: '',
    name: 'AccountManage',
    meta: {
      title: '账号管理',
      icon: 'tree'
    },
    children: [
      {
        path: 'persion-info',
        component: () => import('@/views/dashboard/index'),
        name: 'PersionInfo',
        meta: { title: '个人信息' }
      },
      {
        path: 'modify-persion-info',
        component: () => import('@/views/dashboard/index'),
        name: 'ModifyPersionInfo',
        meta: { title: '修改信息' }
      },
      {
        path: 'corpse-account-query',
        component: () => import('@/views/dashboard/index'),
        name: 'CorpseAccountQuery',
        meta: { title: '僵尸账号查询' }
      }
    ]
  },
  systemRouter,
  exampleRouter,
  // membershipfeemangeRouter,
  // hxxdRouter,
  // msgManageRouter,
  // complaintManageRouter,
  // industryInfoPublishRouter,
  // financialManageRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  base: '/hkysxh/',
  scrollBehavior: () => ({ y: 0 }),
  mode: 'hash',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

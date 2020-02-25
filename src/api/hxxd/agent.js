import request from '@/utils/request'

export function companySave(formData) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/save',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function deleteBatch(data) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/deleteBatch',
    method: 'post',
    data
  })
}

export function deleteBatchCheck(data) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/deleteBatchCheck',
    method: 'post',
    data
  })
}

export function initCompanyRegister(data) {
  return request({
    url: '/hxxd/hxxd-company-register/initCompanyRegister',
    method: 'post',
    data
  })
}

export function initCompanyInfo(data) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/initCompanyInfo',
    method: 'post',
    data
  })
}

export function companyUpdate(formData) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/update',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function commonSave(data) {
  return request({
    url: '/hxxd/hxXdCompanyCommonInfo/save',
    method: 'post',
    data
  })
}

export function commonUpdate(data) {
  return request({
    url: '/hxxd/hxXdCompanyCommonInfo/update',
    method: 'post',
    data
  })
}

export function getCompanyInfoList(data) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/anonw/list',
    method: 'post',
    data
  })
}

export function getCompanyInfoById(data) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/anonw/query',
    method: 'post',
    data
  })
}

export function getCommonById(data) {
  return request({
    url: '/hxxd/hxXdCompanyCommonInfo/anonw/query',
    method: 'post',
    data
  })
}

export function reportSave(data) {
  return request({
    url: '/hxxd/hxXdAnnualReport/insert',
    method: 'post',
    data
  })
}

export function reportSubmit(data) {
  return request({
    url: '/hxxd/hxXdAnnualReport/submit',
    method: 'post',
    data
  })
}

export function pubOrCancelAnnualReport(data) {
  return request({
    url: '/hxxd/hxXdAnnualReport/pubOrCancelAnnualReport',
    method: 'post',
    data
  })
}
/**
 * 会员审核
 * @param {*} ids 操作数据id集合
 * @param {*} auditType 审核类型 1：审核通过 2：审核不通过
 * @param {*} auditReason 审核原因
 */
export function auditReport(ids, auditType, auditReason) {
  return request({
    url: '/hxxd/hxXdAnnualReport/audit',
    method: 'post',
    data: {
      ids,
      auditType,
      auditReason
    }
  })
}

export function annualReportDeleteBatch(data) {
  return request({
    url: '/hxxd/hxXdAnnualReport/deleteBatch',
    method: 'post',
    data
  })
}

export function getReportInfoList(data) {
  return request({
    url: '/hxxd/hxXdAnnualReport/list',
    method: 'post',
    data
  })
}

export function getReportInfoById(data) {
  return request({
    url: '/hxxd/hxXdAnnualReport/anonw/query',
    method: 'post',
    data
  })
}

export function initReportInfo() {
  return request({
    url: '/hxxd/hxXdAnnualReport/initReportInfo',
    method: 'post'
  })
}

export function getSignInfoList(data) {
  return request({
    url: '/hxxd/hxXdSignContract/list',
    method: 'post',
    data
  })
}

export function pubOrCancelSign(data) {
  return request({
    url: '/hxxd/hxXdSignContract/pubOrCancelSign',
    method: 'post',
    data
  })
}

export function signInfoDeleteBatch(data) {
  return request({
    url: '/hxxd/hxXdSignContract/deleteBatch',
    method: 'post',
    data
  })
}

export function companyRegisterSave(data) {
  return request({
    url: '/hxxd/hxxd-company-register/anonw/save',
    method: 'post',
    data
  })
}

export function registerCheckSocialCode(socialCode) {
  return request({
    url: '/hxxd/hxxd-company-register/anonw/registerCheckSocialCode',
    method: 'post',
    params: {
      socialCode
    }
  })
}

export function companyRegisterSaveOrUpdate(data) {
  return request({
    url: '/hxxd/hxxd-company-register/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getSysNoticeList(data) {
  return request({
    url: '/hxxd/hx-xd-sys-notice/list',
    method: 'post',
    data
  })
}

export function sysNoticeDeleteBatch(data) {
  return request({
    url: '/hxxd/hx-xd-sys-notice/deleteBatch',
    method: 'post',
    data
  })
}

export function pubOrCancelNotice(data) {
  return request({
    url: '/hxxd/hx-xd-sys-notice/pubOrCancelNotice',
    method: 'post',
    data
  })
}

export function sendMessage(data) {
  return request({
    url: '/hxxd/hx-xd-sys-notice/sendMessage',
    method: 'post',
    data
  })
}

export function getSysNoticeById(data) {
  return request({
    url: '/hxxd/hx-xd-sys-notice/query',
    method: 'post',
    data
  })
}

export function sysNoticeSave(data) {
  return request({
    url: '/hxxd/hx-xd-sys-notice/save',
    method: 'post',
    data
  })
}

export function sysNoticeUpdate(data) {
  return request({
    url: '/hxxd/hx-xd-sys-notice/update',
    method: 'post',
    data
  })
}

export function sysMessageDeleteBatch(data) {
  return request({
    url: '/hxxd/hx-xd-sys-message/deleteBatch',
    method: 'post',
    data
  })
}

export function msgMarksRead(data) {
  return request({
    url: '/hxxd/hx-xd-sys-message/msgMarksRead',
    method: 'post',
    data
  })
}

export function sysMessageSave(data) {
  return request({
    url: '/hxxd/hx-xd-sys-message/save',
    method: 'post',
    data
  })
}

export function sysMessageUpdate(data) {
  return request({
    url: '/hxxd/hx-xd-sys-message/update',
    method: 'post',
    data
  })
}

export function getSysMessageById(data) {
  return request({
    url: '/hxxd/hx-xd-sys-message/query',
    method: 'post',
    data
  })
}

export function getSysMessageList(data) {
  return request({
    url: '/hxxd/hx-xd-sys-message/list',
    method: 'post',
    data
  })
}

export function sysLeaveWordDeleteBatch(data) {
  return request({
    url: '/hxxd/hx-xd-sys-leave-word/deleteBatch',
    method: 'post',
    data
  })
}

export function sysLeaveWordSave(data) {
  return request({
    url: '/hxxd/hx-xd-sys-leave-word/save',
    method: 'post',
    data
  })
}

export function sysLeaveWordUpdate(data) {
  return request({
    url: '/hxxd/hx-xd-sys-leave-word/update',
    method: 'post',
    data
  })
}

export function getSysLeaveWordById(data) {
  return request({
    url: '/hxxd/hx-xd-sys-leave-word/query',
    method: 'post',
    data
  })
}

export function getSysLeaveWordList(data) {
  return request({
    url: '/hxxd/hx-xd-sys-leave-word/list',
    method: 'post',
    data
  })
}

export function callInfoDeleteBatch(data) {
  return request({
    url: '/hxxd/hx-xd-call-info/deleteBatch',
    method: 'post',
    data
  })
}

export function getCallInfoById(data) {
  return request({
    url: '/hxxd/hx-xd-call-info/getById',
    method: 'post',
    data
  })
}

export function callInfoSaveOrUpdate(data) {
  return request({
    url: '/hxxd/hx-xd-call-info/saveOrUpdate',
    method: 'post',
    data
  })
}

export function sendCallInfo(id) {
  return request({
    url: '/hxxd/hx-xd-call-info/addJob',
    method: 'post',
    data: { id }
  })
}

export function getCallInfoList(data) {
  return request({
    url: '/hxxd/hx-xd-call-info/list',
    method: 'post',
    data
  })
}

export function componyQueryList(data) {
  return request({
    url: '/system/jqSysDict/anonw/getDictComponyByName',
    method: 'post',
    data
  })
}

export function getDictAirCompony(data) {
  return request({
    url: '/system/jqSysDict/anonw/getDictAirCompony',
    method: 'post',
    data
  })
}

export function selectComponyByParam(data) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/anonw/selectComponyByParam',
    method: 'post',
    data
  })
}

// 首页-企业查询
export function selectComponyRelevent(socialCreditCode) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/anonw/selectComponyRelevent',
    method: 'post',
    data: {
      socialCreditCode
    }
  })
}
// 首页-企业查询
export function confirmMembershipBySocialCreditCode(socialCreditCode) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/anonw/confirmMembershipBySocialCreditCode',
    method: 'post',
    data: {
      socialCreditCode
    }
  })
}

// 首页-企业查询-年报
export function query(id) {
  return request({
    url: '/hxxd/hxXdAnnualReport/anonw/query',
    method: 'post',
    params: {
      id
    }
  })
}
// 根据企业注册信息初始化会员申请信息
export function getCompanyRegister(data) {
  return request({
    url: '/hxxd/hxxd-company-register/getCompanyRegister',
    method: 'post',
    data
  })
}

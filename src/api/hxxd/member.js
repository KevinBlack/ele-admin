import request from '@/utils/request'
/** 会员管理 **/

/**
 * 会员申请
 * @param {*} data
 */
export function memberApply(data) {
  return request({
    url: '/hxxd/hxXdMember/save',
    method: 'post',
    data
  })
}
/**
 * 会员提交
 * @param {*} id
 */
export function submitMember(id) {
  return request({
    url: '/hxxd/hxXdMember/submit',
    method: 'post',
    data: { id }
  })
}

/**
 * 会员查询（单条）
 * @param {*} id
 */
export function getMember(id) {
  return request({
    url: '/hxxd/hxXdMember/get',
    method: 'post',
    data: { id }
  })
}

/**
 * 会员查询（单条）
 * @param {*} id
 */
export function getMemberByCertNo(certificateNo) {
  return request({
    url: '/hxxd/hxXdMember/getByCertNo',
    method: 'post',
    data: { certificateNo }
  })
}

/**
 * 会员查询（多条）
 * @param {*} id
 */
export function getMemberList(data) {
  return request({
    url: '/hxxd/hxXdMember/list',
    method: 'post',
    data
  })
}

/**
 * 会员修改
 * @param {*} id
 */
export function modifyMember(data) {
  return request({
    url: '/hxxd/hxXdMember/modify',
    method: 'post',
    data
  })
}

/**
 * 会员删除
 * @param {*} ids
 */
export function deleteMember(ids) {
  return request({
    url: '/hxxd/hxXdMember/delete',
    method: 'post',
    data: { ids }
  })
}

/**
 * 会员审核
 * @param {*} ids          操作数据id集合
 * @param {*} auditType    审核类型 1：审核通过 2：审核不通过
 * @param {*} auditReason  审核原因
 * @param {*} identityMark 身份标记
 */
export function auditMember(ids, auditType, auditReason, identityMark) {
  return request({
    url: '/hxxd/hxXdMember/audit',
    method: 'post',
    data: { ids, auditType, auditReason, identityMark }
  })
}

/**
 * 发送手机验证码
 * @param {*} mobileNum 手机号
 */
export function sendCode(mobileNum) {
  return request({
    url: `/hxxd/hxXdSysSms/anonw/sendCode`,
    method: 'post',
    data: { mobileNum }
  })
}
/**
 * 发送邮箱验证码
 * @param {*} email 邮箱号
 */
export function sendEmailCode(email) {
  return request({
    url: `/hxxd/hxXdSysEmail/anonw/sendEmailCode`,
    method: 'post',
    data: { email }
  })
}
/**
 * 通过手机进行校验验证码
 * @param {*} mobileNum 手机号
 */
export function checkCode(mobileNum, code) {
  return request({
    url: `/hxxd/hxXdSysSms/anonw/checkCode`,
    method: 'post',
    data: { mobileNum, code }
  })
}
/**
 * 通过邮箱进行校验验证码
 * @param {*} email 邮箱号
 */
export function checkEmailCode(email, code) {
  return request({
    url: `/hxxd/hxXdSysEmail/anonw/checkEmailCode`,
    method: 'post',
    data: { email, code }
  })
}

/**
 * 注册账号发送手机验证码
 * @param {*} mobileNum 手机号
 */
export function registerSendCode(mobileNum) {
  return request({
    url: `/hxxd/hxXdSysSms/anonw/registerSendCode`,
    method: 'post',
    data: { mobileNum }
  })
}

/**
 * 注册账号校验验证码
 * @param {*} mobileNum 手机号
 */
export function registerCheckCode(mobileNum, code) {
  return request({
    url: `/hxxd/hxXdSysSms/anonw/registerCheckCode`,
    method: 'post',
    data: { mobileNum, code }
  })
}
/**
 * 缴费会员查询（多条）
 * @param {*} id
 */
export function getMembers(data) {
  return request({
    url: '/hxxd/hxXdMember/getMemberList',
    method: 'post',
    data
  })
}
/**
 * 按地区查询无欠费会员
 * @param {*} id
 */
export function getMemberByRegion(data) {
  return request({
    url: '/hxxd/hxXdMember/getMemberByRegion',
    method: 'post',
    data
  })
}

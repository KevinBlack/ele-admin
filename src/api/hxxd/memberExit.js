import request from '@/utils/request'
/** 退会管理 **/

/**
 * 退出会员申请
 * @param {*} data
 */
export function memberExitApply(data) {
  return request({
    url: '/hxxd/hxXdMemberExit/add',
    method: 'post',
    data
  })
}
/**
 * 会员提交
 * @param {*} id
 */
export function submitMemberExit(id) {
  return request({
    url: '/hxxd/hxXdMemberExit/submit',
    method: 'post',
    data: { id }
  })
}

/**
 * 会员查询（单条）
 * @param {*} id
 */
export function getMemberExitByType() {
  return request({
    url: '/hxxd/hxXdMemberExit/getByType',
    method: 'post',
    data: { type: 'hxExitMember' }
  })
}

/**
 * 会员查询（单条）
 * @param {*} id
 */
export function getMemberExit(id) {
  return request({
    url: '/hxxd/hxXdMemberExit/get',
    method: 'post',
    data: { id }
  })
}

/**
 * 会员查询（多条）
 * @param {*} id
 */
export function getMemberExitList(data) {
  return request({
    url: '/hxxd/hxXdMemberExit/list',
    method: 'post',
    data
  })
}

/**
 * 会员修改
 * @param {*} id
 */
export function modifyMemberExit(data) {
  return request({
    url: '/hxxd/hxXdMemberExit/modify',
    method: 'post',
    data
  })
}

/**
 * 会员删除
 * @param {*} ids
 */
export function deleteMemberExit(ids) {
  return request({
    url: '/hxxd/hxXdMemberExit/delete',
    method: 'post',
    data: { ids }
  })
}

/**
 * 会员审核
 * @param {*} ids 操作数据id集合
 * @param {*} auditType 审核类型 1：审核通过 2：审核不通过
 * @param {*} auditReason 审核原因
 */
export function auditMemberExit(ids, auditType, auditReason) {
  return request({
    url: '/hxxd/hxXdMemberExit/audit',
    method: 'post',
    data: { ids, auditType, auditReason }
  })
}

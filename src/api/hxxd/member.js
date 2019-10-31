import request from '@/utils/request'
/** 会员管理 **/

/**
 * 会员申请
 * @param {*} data
 */
export function memberApply(data) {
  return request({
    url: '/hxxd/hxXdMember/add',
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
export function getMemberByType() {
  return request({
    url: '/hxxd/hxXdMember/getByType',
    method: 'post',
    data: { type: 'hxMember' }
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
    url: '/hxxd/hxXdMember/deleteMember',
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
export function auditMember(ids, auditType, auditReason) {
  return request({
    url: '/hxxd/hxXdMember/audit',
    method: 'post',
    data: { ids, auditType, auditReason }
  })
}

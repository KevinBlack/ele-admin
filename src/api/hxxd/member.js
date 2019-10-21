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
    url: '/hxxd/hxXdMember/delete',
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
    url: '/hxxd/hxXdMember/delete',
    method: 'post',
    data: { ids, auditType, auditReason }
  })
}

/**
 * 会员退会申请(直接提交的，没在此处)
 * @param {*} data
 */
// export function memberExitApply(data) {
//   return request({
//     url: '/hxxd/hxXdMember/exitApply',
//     method: 'post',
//     data
//   })
// }

/**
 * 会员退会查询
 * @param {*} data
 */
export function getMemberExit(id) {
  return request({
    url: '/hxxd/hxXdMember/getExit',
    method: 'post',
    data: { id }
  })
}

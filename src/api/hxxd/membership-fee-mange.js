import request from '@/utils/request'
/** 会费管理 请求控制器**/
/**
 * 获取会费登记列表信息
 * @param {*} data
 */
export function getDjInfoList(data) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/list',
    method: 'post',
    data
  })
}
/**
 * 批量删除会费登记信息
 * @param {*} ids 需要操作数据id集合信息描述
 */
export function deleteMember(ids) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/delete',
    method: 'post',
    data: { ids }
  })
}
/**
 * 更新审批状态
 * @param {*} ids 需要操作数据id集合信息描述
 * @param {*} state 需要更改的状态信息
 */
export function saveSp(ids, state) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/saveSp',
    method: 'post',
    data: { ids, state }
  })
}
/**
 * 获取会费规则列表信息
 * @param {*} data
 */
export function selectMemberFeeInfo(data) {
  return request({
    url: '/hxxd/memberFeeInfo/selectMemberFeeInfo',
    method: 'post',
    data
  })
}
/**
 * 根据人员类型编码获取会费规则信息
 * @param {*} code 人员类型编码
 */
export function getFeeInfoByCode(code) {
  return request({
    url: '/hxxd/memberFeeInfo/getFeeInfoByCode',
    method: 'post',
    data: { code }
  })
}
export function insertMemberFeeInfo(data) {
  return request({
    url: '/hxxd/memberFeeInfo/insertMemberFeeInfo',
    method: 'post',
    data
  })
}
export function deleteMemberFeeInfo(ids) {
  return request({
    url: '/hxxd/memberFeeInfo/deleteMemberFeeInfo',
    method: 'post',
    data: { ids }
  })
}
export function updateMemberFeeInfo(data) {
  return request({
    url: '/hxxd/memberFeeInfo/updateMemberFeeInfo',
    method: 'post',
    data
  })
}
export function getFeeInfoById(id) {
  return request({
    url: '/hxxd/memberFeeInfo/getFeeInfoById',
    method: 'post',
    data: { id }
  })
}
/**
 * 保存会费登记信息
 * @param {*} data
 */
export function saveMemberPay(saveData) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/saveMemberPay',
    method: 'post',
    data: saveData
  })
}
/**
 * 根据人员id获取会员登记信息
 * @param {*} id 人员id
 */
export function getAdminHfInfoById(id) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/getAdminHfInfoById',
    method: 'post',
    data: { id }
  })
}
/**
 * 按大区查询会费统计信息
 */
export function statisticalList(data) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/statisticalList',
    method: 'post',
    data
  })
}
/**
 * 按会费登记单id和流水号查询会费缴纳信息
 */
export function getMemberPaysByAdminIdAndPipLine(data) {
  return request({
    url: '/hxxd/memberPay/getMemberPaysByAdminIdAndPipLine',
    method: 'post',
    data
  })
}

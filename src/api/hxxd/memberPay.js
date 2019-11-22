import request from '@/utils/request'
/** 会员缴费管理 请求控制器**/
/**
 * 获取会员缴费记录信息列表信息HxxdadminHfInfo
 * @param {*} data
 */
export function getMemberPayInfoList(id, status) {
  return request({
    url: '/hxxd/memberPay/getMemberPayInfoList',
    method: 'post',
    data: { id, status }
  })
}
/** 会员缴费管理 请求控制器**/
/**
 * 根据HxxdadminHfInfoId获取会员缴费记录信息列表信息
 * @param {*} data
 */
export function getMemberPaysByAdminId(id, status) {
  return request({
    url: '/hxxd/memberPay/getMemberPaysByAdminId',
    method: 'post',
    data: { id, status }
  })
}
export function getAdminHfInfo(data) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/getAdminHfInfo',
    method: 'post',
    data
  })
}
/**
 * 会员缴费记录信息删除
 * @param {*} ids
 */
export function deleteMemberPay(ids) {
  return request({
    url: '/hxxd/memberPay/deleteMemberPay',
    method: 'post',
    data: { ids }
  })
}
